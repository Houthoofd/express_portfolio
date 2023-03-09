const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'dpg-cg501f82qv287crnd5g0-a',
  user: 'db_benoit_user',
  password: 's3cBbgWKibozM0yUdLt95vi7Gy1GBaEu',
  database: 'db_benoit'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database with ID ' + connection.threadId);
});

// Create a new record
function createRecord(name, email, phone) {
    const query = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
    connection.query(query, [name, email, phone], (error, results) => {
      if (error) throw error;
      console.log('New record added with ID ' + results.insertId);
    });
  }
  
  // Read all records
  function readAllRecords() {
    const query = 'SELECT * FROM users';
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
      console.log('All records:', results);
    });
  }
  
  // Read a single record
  function readRecord(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [id], (error, results, fields) => {
      if (error) throw error;
      console.log('Record with ID ' + id + ':', results[0]);
    });
  }
  
  // Update a record
  function updateRecord(id, name, email, phone) {
    const query = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?';
    connection.query(query, [name, email, phone, id], (error, results) => {
      if (error) throw error;
      console.log('Record with ID ' + id + ' updated');
    });
  }
  
  // Delete a record
  function deleteRecord(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) throw error;
      console.log('Record with ID ' + id + ' deleted');
    });
  }
  