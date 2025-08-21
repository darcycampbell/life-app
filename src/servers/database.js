const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { Pool } = require("pg");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
//What is this for?
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config({ path: __dirname + `/../../.env` });
//import dataTables from "../content/dataTables";

const app = express();
const upload = multer({ 
  storage: multer.memoryStorage() // Important for handling blobs
});
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

const dataTables = {
  lifestyle: "habits",
  interpersonal: "contacts",
  financial: "goals",
  external: "tasks",
};

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "life",
  password: "taganeve",
  port: 5432,
});

app.post("/database", async (req, res) => {
  try {
    const result = await pool.query(req.body.query);
    if (result.rows) {
      res.json(result.rows);
    } else if (Array.isArray(result)) {
      const queryResults = result.map((r) => r.rows || []);
      res.json(queryResults);
    } else {
      res.json({ success: true });
    }
  } catch (error) {
    console.error("Error updating habit scores:", error);
    throw error;
  }
});

app.post("/upload", upload.single("image"), async (req, res) => {
  console.log('req.file:', req.file);
  console.log('req.body:', req.body);
  const { category, title, target, id } = req.body;
  const file = req.file;
  const isUpdate = Boolean(id);

  if (!isUpdate) {
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    if (!category || !title || !target) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  }

  if (file) {
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type" });
    }
  }

  if (!dataTables[category]) {
    return res.status(400).json({ error: "Invalid category" });
  }

  const table = dataTables[category];
  let imageUrl;

  try {
    if (file) {
      const filename = `${Date.now()}-${file.originalname}`;
      const s3StartTime = Date.now();
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype,
      });
      await s3Client.send(command);
      console.log("S3 upload took:", Date.now() - s3StartTime, "ms");
      imageUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${filename}`;
    }

    // Database operation
    const dbStartTime = Date.now();
    let query, params;

    if (isUpdate) {
      const updateFields = [];
      const updateValues = [];
      let paramCount = 1;

      if (title) {
        updateFields.push(`title = $${paramCount++}`);
        updateValues.push(title);
      }

      if (target) {
        updateFields.push(`target = $${paramCount++}`);
        updateValues.push(target);
      }

      if (imageUrl) {
        updateFields.push(`image = $${paramCount++}`);
        updateValues.push(imageUrl);
      }

      updateValues.push(id);
      query = `UPDATE "${table}" SET ${updateFields.join(
        ", "
      )} WHERE id = $${paramCount}`;
      params = updateValues;
    } else {
      query = `INSERT INTO "${table}" (title, image, target) VALUES ($1, $2, $3)`;
      params = [title, imageUrl, target];
    }

    await pool.query(query, params);
    console.log(
      `DB ${isUpdate ? "update" : "insert"} took:`,
      Date.now() - dbStartTime,
      "ms"
    );

    res.json({
      success: true,
      ...(imageUrl && { image: imageUrl }),
      action: isUpdate ? "updated" : "created",
    });
  } catch (error) {
    console.error(`${isUpdate ? "Update" : "Upload"} failed:`, error);
    res
      .status(500)
      .json({
        error: `${isUpdate ? "Update" : "Upload"} failed`,
        details: error.message,
      });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
