// Importing the necessary packages
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Initializing express
const app = express();

// Loading environment variables from .env file
dotenv.config();

// Configure the database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Testing the database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Endpoint 1: Retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth, gender, language FROM patients';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving patients');
    }
    res.json(results);
  });
});

// Endpoint 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT * FROM providers';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving providers');
    }
    res.json(results);
  });
});

// Endpoint 3: Filter patients by First Name
app.get('/patients/filter', (req, res) => {
  const firstName = req.query.first_name;  
  const query = 'SELECT * FROM patients WHERE first_name = ?';
  db.query(query, [firstName], (err, results) => {
    if (err) {
      return res.status(500).send('Error filtering patients by first name');
    }
    res.json(results);
  });
});

// Endpoint 4: Retrieve all providers by their specialty
app.get('/providers/specialty', (req, res) => {
  const specialty = req.query.specialty;  
  const query = 'SELECT * FROM providers WHERE provider_specialty = ?';
  db.query(query, [specialty], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving providers by specialty');
    }
    res.json(results);
  });
});

// Listen to the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
