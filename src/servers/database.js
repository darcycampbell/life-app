const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

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
    const result = await pool.query('SELECT * FROM test');
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});