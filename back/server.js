const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;
const cors = require('cors');

const db = mysql.createConnection({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6682998',
  password: '4KnBlDpBVQ',
  database: 'sql6682998',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  // Create 'users' table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      age INT,
      dob DATE,
      contact VARCHAR(20)
    )
  `;

  db.query(createTableQuery, (createTableErr) => {
    if (createTableErr) {
      console.error('Error creating users table:', createTableErr);
    } else {
      console.log('Users table created or already exists');
    }
  });
});


const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
// Signup API
// Signup API
app.post('/signup', (req, res) => {
  const { name, password } = req.body;
  const query = 'INSERT INTO users (name, password, age, dob, contact) VALUES (?, ?, DEFAULT, DEFAULT, DEFAULT)';
  // Or set default values as empty strings if you prefer: VALUES (?, ?, '', '', '')
  
  db.query(query, [name, password], (err, result) => {
    if (err) throw err;

    // Get the ID of the newly inserted user
    const userId = result.insertId;

    res.json({ userId, message: 'User registered successfully' });
  });
});

// Login API
app.post('/login', (req, res) => {
  const { name, password } = req.body;
  const query = 'SELECT id FROM users WHERE name = ? AND password = ?';
  db.query(query, [name, password], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      const userId = result[0].id;
      res.json({ userId, message: 'Login successful' });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});


// getAllUserDetails API
app.get('/getUserDetails', (req, res) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      const userDetailsArray = result.map(user => ({
        name: user.name,
        age: user.age,
        dob: user.dob,
        contact: user.contact,
      }));

      res.json(userDetailsArray);
    } else {
      res.status(404).send('No users found');
    }
  });
});

// editUserDetails API
app.put('/editUserDetails/:userId', (req, res) => {
  const userId = req.params.userId;
  const { age, dob, contact } = req.body;

  const query = 'UPDATE users SET age = ?, dob = ?, contact = ? WHERE id = ?';

  db.query(query, [age, dob, contact, userId], (err, result) => {
    if (err) {
      console.error('Error updating user details:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Update result:', result);

      if (result.affectedRows > 0) {
        res.json({ message: 'User details updated successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  });
});


// getNameById API
app.get('/getNameById/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT name FROM users WHERE id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error retrieving user name:', err);
      throw err;
    }

    if (result.length > 0) {
      const userName = result[0].name;
      res.json({ userName });
    } else {
      res.status(404).send('User not found');
    }
  });
});


// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL');
// });

// db.on('error', (err) => {
//   if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//     console.error('MySQL connection lost. Reconnecting...');
//     db.connect();
//   } else {
//     throw err;
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
