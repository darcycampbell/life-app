const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

// Database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'life',
  password: 'taganeve',
  port: 5432,
});

// Test endpoint
app.get('/api/test', async (req, res) => {
  try {
    const query = `
      UPDATE habits h
      SET score = (
        SELECT COALESCE(AVG(hr.entry_count)::float / NULLIF(h.target, 0), 0)
        FROM habit_records hr
        WHERE hr.habit_id = h.id
      )
      RETURNING *;
    `;
    const result = await pool.query(query);
    res.json(result.rows)
  } catch (error) {
    console.error('Error updating habit scores:', error);
    throw error;
  }
});

app.post('/api/post', async (req, res) => {
  const body = req.body;
  try {
    const query = `
      INSERT INTO habits (title, target)
      VALUES ($1, $2);
    `;
    const values = [body.name, body.checkbox ? body.target : body.target / 7]
    await pool.query(query, values);
  } catch (error) {
    console.error('Error updating habit scores:', error);
    throw error;
  }
})

app.listen(3001, () => {
  console.log('Server running on port 3001');
});