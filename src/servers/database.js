const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { Pool } = require("pg");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
//What is this for?
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config({ path: __dirname + `/../../.env` });

const app = express();
const upload = multer();
app.use(cors());
app.use(express.json());

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

//Move these to another file
const tables = {
  lifestyle: "habits",
  interpersonal: "contacts",
  financial: "goals",
  external: "tasks",
};

const queries = {
  lifestyle: `
    UPDATE habits h
    SET score = (
      WITH metrics AS (
        SELECT 
          AVG(entry_count)::float as record_avg
        FROM habit_records hr
        WHERE hr.habit_id = h.id
      )
      SELECT metrics.record_avg / h.target
      FROM metrics
    )
    RETURNING *;
  `,
  interpersonal: `
    UPDATE contacts c
    SET score = (
      WITH metrics AS (
        SELECT 
          COUNT(*) as record_count,
          MIN(entry_date) as start_date
        FROM contact_records cr
        WHERE cr.contact_id = c.id
      )
      SELECT c.target / ((CURRENT_DATE - metrics.start_date) / metrics.record_count) 
      FROM metrics
    )
    RETURNING *;
  `,
  financial: `
    UPDATE goals g
    SET score = (
      WITH metrics AS (
        SELECT 
          SUM(entry_amount) as record_total
        FROM goal_records gr
        WHERE gr.goal_id = g.id
      )
      SELECT metrics.record_total / g.target
      FROM metrics
    )
    RETURNING *;
  `,
  external: `
    UPDATE tasks t
    SET score = (
      WITH metrics AS (
        SELECT
          task_id,
          PERCENT_RANK() OVER ( ORDER BY urgency_score ) as urgency_percentile
        FROM task_records
      )
      SELECT metrics.urgency_percentile * 100 / (100 - t.target)
      FROM metrics
      WHERE metrics.task_id = t.id
    )
    RETURNING *;
  `,
};

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "life",
  password: "taganeve",
  port: 5432,
});

app.post("/database", async (req, res) => {
  const query = queries[req.body.buttonPressed];
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error updating habit scores:", error);
    throw error;
  }
});

app.post("/upload", upload.single("image"), async (req, res) => {
  const { category, title, target } = req.body;
  console.log(req.file);
  const file = req.file;

  //Find a better way to resolve these issues
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  if (!category || !title || !target) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!["image/jpeg", "image/png", "image/gif"].includes(file.mimetype)) {
    return res.status(400).json({ error: "Invalid file type" });
  }

  if (!tables[category]) {
    return res.status(400).json({ error: "Invalid category" });
  }

  const table = tables[category];
  const filename = `${Date.now()}-${file.originalname}`;

  try {
    try {
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype,
      });
      await s3Client.send(command);
    } catch (s3Error) {
      console.error("S3 upload failed:", s3Error);
      return res.status(500).json({ error: "File upload to S3 failed" });
    }

    //Does this need to be here (not earlier)?
    const image = `https://${BUCKET_NAME}.s3.amazonaws.com/${filename}`; 
    
    try {
      const query = `INSERT INTO "${table}" (title, image, target) VALUES ($1, $2, $3)`;
      await pool.query(query, [title, image, target]);
    } catch (dbError) {
      console.error("Database insert failed:", dbError);
      // You might want to delete the S3 file here since the DB insert failed
      return res.status(500).json({ error: "Database update failed" });
    }

    //Do I need this?
    res.json({ success: true, image });
    
  } catch (error) {
    console.error("General error:", error);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
