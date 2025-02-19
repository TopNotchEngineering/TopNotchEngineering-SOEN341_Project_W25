const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
  methods: ['GET', 'POST', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  origin: '*', // Specify origin
}));

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


// Route to handle signup data to database
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


// Route to handle login data by comparing incoming username and password to existing data in the database
app.post('/login', (req, res) => {
  const { username, logInPassword, isAdmin } = req.body;

  const sql = `SELECT * FROM members WHERE username = ? AND logInPassword = ? AND isAdmin = ?`;
  const values = [username, logInPassword, isAdmin];

  connection.query(sql, values, (err, results) => {
      if (err) {
          console.error('Error logging in:', err);
          res.status(500).json({ error: 'Database error', details: err });
      } else {
        console.log("results: ", results);
          if (results.length > 0) {
              res.status(200).json({ message: 'Valid credentials and clearance' });
          } else {
              res.status(401).json({ message: 'Invalid credentials or clearance' });
          }
      }
  });
});

// Route to handle creating teams and saving data into the database
app.post('/teams', (req, res) => {
  const { teamName, teamDescription } = req.body;
  console.log(req.body);

  const sql = 'INSERT INTO teams (teamName, teamDescription) VALUES (?, ?)';
  connection.query(sql, [teamName, teamDescription], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ success: false, error: 'Failed to create team' });
    } else {
      console.log('Team created:', result);
      res.status(201).json({ success: true, message: 'Team created successfully!' });
    }
  });
});

/** GET endpoint that accepts a username as a query parameter
 * Returns the profile details from the database
 */
app.get('/getUser', (req, res) => {
  const username = req.query.username;
  
  if (!username) {
    return res.status(400).json({ error: 'No username provided' });
  }

  // Query the database for the user
  const sql = "SELECT username, firstName, lastName, logInEmail AS email FROM members WHERE username = ?";
  connection.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Return the first matching user record
    return res.status(200).json(results[0]);
  }); 
});

// Endpoint to get all the team data from the database
app.get('/getTeams', (req, res) => {

  const sql = 'SELECT teamName, teamDescription FROM teams';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching teams:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('Teams:', results);
      res.status(200).json({ teams: results});
    }
  });
});

// Endpoint to delete a team from the database
app.post('/deleteTeam', (req, res) => {
  const { teamName } = req.body;

  const sql = 'DELETE FROM teams WHERE teamName = ?';
  connection.query(sql, [teamName], (err, result) => {
    if (err) {
      console.error('Error deleting team:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('Team deleted:', result);
      res.status(200).json({ message: 'Team deleted successfully' });
    }
  });
});

/**Endpoint that accepts the username, current password and new password
 * Verifies that the provided current password is correct
 * Updates the password in the database 
 */
app.post('/changePassword', (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  if (!username || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // First, verify that the current password is correct.
  const checkSql = 'SELECT * FROM members WHERE username = ? AND logInPassword = ?';
  connection.query(checkSql, [username, currentPassword], (err, results) => {
    if (err) {
      console.error('Error during password verification:', err);
      return res.status(500).json({ error: 'Database error during verification' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    // If verification passes, update the password.
    const updateSql = 'UPDATE members SET logInPassword = ? WHERE username = ?';
    connection.query(updateSql, [newPassword, username], (err, updateResults) => {
      if (err) {
        console.error('Error updating password:', err);
        return res.status(500).json({ error: 'Database error updating password' });
      }
      res.status(200).json({ message: 'Password updated successfully' });
    });
  });
});

/**
 * Endpoint to update user profile data
 * User can change their username, firstName, lastName, email 
 * Added a orginalUsername hidden field to keep track of the user in the databse being updated
 */
app.post('/updateUser', (req, res) => {
  console.log('Received data:', req.body);
  const { originalUsername, username, firstName, lastName, email } = req.body;
  
  // Validate the request data
  if (!originalUsername || !username || !firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Construct the SQL query to update the user
  const sql = `
    UPDATE members 
    SET username = ?, firstName = ?, lastName = ?, logInEmail = ? 
    WHERE username = ?
  `;
  
  // Execute the update query
  connection.query(sql, [username, firstName, lastName, email, originalUsername], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    // If no rows were affected, the user was not found
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Respond with the updated user data
    res.status(200).json({ 
      message: 'Profile updated successfully', 
      updatedUser: { username, firstName, lastName, email } 
    });
  });
});

// Route to handle creating channels and saving data into the database
app.post('/createChannel', (req, res) => {
  const { channelName, teamName } = req.body;
  console.log(req.body);

  const sql = 'INSERT INTO channels (channelName, teamName) VALUES (?, ?)';
  connection.query(sql, [channelName, teamName], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ success: false, error: 'Failed to create channel' });
    } else {
      console.log('Channel created:', result);
      // Instead of redirecting:
      res.status(200).json({ success: true, message: 'Channel created successfully' });
    }
  });
});

/**
 * Enpoint to fetch the channel data
 */
app.get('/getChannels', (req, res) => {
  const teamName = req.query.teamName;
  if (!teamName) {
    return res.status(400).json({ error: 'Team name is required' });
  }

  const sql = 'SELECT channelName FROM channels WHERE teamName = ?';
  connection.query(sql, [teamName], (err, results) => {
    if (err) {
      console.error('Error fetching channels:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    // results is an array of objects like [{ channelName: 'general' }, { channelName: 'random' }]
    res.status(200).json({ channels: results });
  });
});

/**
 * Enpoint to delete a channel
 */
app.post('/deleteChannel', (req, res) => {
  const { channelName, teamName } = req.body;
  if (!channelName || !teamName) {
    return res.status(400).json({ error: 'channelName and teamName are required' });
  }

  const sql = 'DELETE FROM channels WHERE channelName = ? AND teamName = ?';
  connection.query(sql, [channelName, teamName], (err, result) => {
    if (err) {
      console.error('Error deleting channel:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Channel deleted successfully' });
  });
});


// Start server
const PORT = 5008;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
