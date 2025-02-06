const express = require('express')
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dotenv = require('dotenv')
dotenv.config()

// Create a connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
  });

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Route to handle signup data to databse
app.post('/register', (req, res) => {
  const { username, firstName, lastName, country, logInEmail, logInPassword, isAdmin } = req.body;
  const isAdminValue = parseInt(isAdmin, 10) || 0; // Ensure it's always 0 or 1

  const sql = `INSERT INTO members (username, firstName, lastName, country, logInEmail, logInPassword, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [username, firstName, lastName, country, logInEmail, logInPassword, isAdminValue];

  connection.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error inserting user:', err);
          res.status(500).json({ error: 'Database error' });
      } else {
          res.status(201).json({ message: 'You have been registered successfully' });
      }
  });
});

// Start server
const PORT = 5004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
