const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); // <-- Import HTTP module

const app = express();
app.use(cors({
  methods: ['GET', 'POST', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  origin: '*', // Specify origin
}));

app.use(bodyParser.json());

const dotenv = require('dotenv');
dotenv.config();

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

// ----- REST API Endpoints -----

// Register a new user
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

// Login endpoint
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

// Create a team
app.post('/teams', (req, res) => {
  const { teamName, teamDescription } = req.body;
  console.log(req.body);
  const sql = 'INSERT INTO teams (teamName, teamDescription) VALUES (?, ?)';
  connection.query(sql, [teamName, teamDescription], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ success: false, error: 'Failed to create team' });
    } else {
      res.status(201).json({ success: true, message: 'Team created successfully!' });
    }
  });
});

// Get user profile
app.get('/getUser', (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ error: 'No username provided' });
  }
  const sql = "SELECT username, firstName, lastName, logInEmail AS email FROM members WHERE username = ?";
  connection.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(results[0]);
  });
});

// Get all users
app.get('/getUsers', (req, res) => {
  const sql = 'SELECT username, firstName, lastName, logInEmail AS email FROM members';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json({ users: results });
    }
  });
});

// Get all teams for admins
app.get('/getTeams', (req, res) => {
  const sql = 'SELECT teamName, teamDescription FROM teams';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching teams:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('Teams:', results);
      res.status(200).json({ teams: results });
    }
  });
});
// only get the users teams
app.get('/getTeamsUser', (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const sql = `
    SELECT DISTINCT t.teamName, t.teamDescription
    FROM teams t
    INNER JOIN channels c ON t.teamName = c.teamName
    WHERE c.channelMember = ?
  `;
  connection.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error fetching teams:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('Teams for channel member:', results);
    res.status(200).json({ teams: results });
  });
});

// Get channels for a team for admins
app.get('/getChannels', (req, res) => {
  const teamName = req.query.teamName;

  if (!teamName) {
    return res.status(400).json({ error: 'Team name is required' });
  }
  const sql = 'SELECT DISTINCT channelName FROM channels WHERE teamName = ?';
  connection.query(sql, [teamName], (err, results) => {
    if (err) {
      console.error('Error fetching channels:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ channels: results });
  });
});

// Get channels for users only
app.get('/getChannelUser', (req, res) => {
  const teamName = req.query.teamName;
  const username = req.query.username;

  if (!teamName || !username) {
    return res.status(400).json({ error: 'Team name is required' });
  }
  const sql = 'SELECT DISTINCT channelName FROM channels WHERE teamName = ? AND channelMember = ?';
  connection.query(sql, [teamName, username], (err, results) => {
    if (err) {
      console.error('Error fetching channels:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ channels: results });
  });
});

// Delete a team
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

// Change password
app.post('/changePassword', (req, res) => {
  const { username, currentPassword, newPassword } = req.body;
  if (!username || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const checkSql = 'SELECT * FROM members WHERE username = ? AND logInPassword = ?';
  connection.query(checkSql, [username, currentPassword], (err, results) => {
    if (err) {
      console.error('Error during password verification:', err);
      return res.status(500).json({ error: 'Database error during verification' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid current password' });
    }
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

// Update user profile
app.post('/updateUser', (req, res) => {
  console.log('Received data:', req.body);
  const { originalUsername, username, firstName, lastName, email } = req.body;
  if (!originalUsername || !username || !firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const sql = `
    UPDATE members 
    SET username = ?, firstName = ?, lastName = ?, logInEmail = ? 
    WHERE username = ?
  `;
  connection.query(sql, [username, firstName, lastName, email, originalUsername], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ 
      message: 'Profile updated successfully', 
      updatedUser: { username, firstName, lastName, email } 
    });
  });
});

// Create a channel
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
      res.status(200).json({ success: true, message: 'Channel created successfully' });
    }
  });
});

// Get channels for a team
app.get('/getChannels', (req, res) => {
  const teamName = req.query.teamName;
  const username = req.query.username;

  if (!teamName || !username) {
    return res.status(400).json({ error: 'Team name is required' });
  }
  const sql = 'SELECT DISTINCT channelName FROM channels WHERE teamName = ? AND channelMember = ?';
  connection.query(sql, [teamName, username], (err, results) => {
    if (err) {
      console.error('Error fetching channels:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ channels: results });
  });
});

// Delete a channel
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

// Get all non admin users
app.get('/getNonAdminUsers', (req, res) => {
  const sql = 'SELECT username FROM members WHERE isAdmin = 0';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching non-admin users:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Add a user to a channel
app.post('/addUserToChannel', (req, res) => {
  const { channelName, teamName, channelMember } = req.body;
  if (!channelName || !teamName || !channelMember) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const roomName = `${teamName}-${channelName}`;
  const sql = 'INSERT INTO channels (channelName, teamName, channelMember) VALUES (?, ?, ?)';
  connection.query(sql, [channelName, teamName, channelMember], (err, result) => {
    if (err) {
      console.error('Error adding user to channel:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    const autoMessage = `${channelMember} was added to the channel.`;
    const insertMessageSql = 'INSERT INTO chatMessages (channelName, teamName, sender, message) VALUES (?, ?, ?, ?)';
    connection.query(insertMessageSql, [channelName, teamName, 'System', autoMessage], (err2, result2) => {
      if (err2) {
        console.error('Error inserting system message:', err2);
        return res.status(500).json({ error: 'Database error inserting system message' });
      }
      console.log(`Broadcasting system message to room: ${roomName}`);
      io.to(roomName).emit('message', {
        sender: 'System',
        message: autoMessage,
        id: result2.insertId
      });
      res.status(200).json({
        message: 'User added to channel successfully'
      });
    });
  });
});

// Add a chat message
app.post('/addMessage', (req, res) => {
  const { channelName, teamName, sender, message } = req.body;
  if (!channelName || !teamName || !sender || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const sql = 'INSERT INTO chatMessages (channelName, teamName, sender, message) VALUES (?, ?, ?, ?)';
  connection.query(sql, [channelName, teamName, sender, message], (err, result) => {
    if (err) {
      console.error('Error inserting message:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Message stored successfully' });
  });
});

// Get chat messages
app.get('/getMessages', (req, res) => {
  const { channelName, teamName } = req.query;
  if (!channelName || !teamName) {
    return res.status(400).json({ error: 'channelName and teamName are required' });
  }
  const sql = `SELECT * FROM chatMessages WHERE channelName = ? AND teamName = ? ORDER BY idchatMessages ASC`;
  connection.query(sql, [channelName, teamName], (err, results) => {
    if (err) {
      console.error('Error fetching messages:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    return res.status(200).json({ messages: results });
  });
});

// Get private messages
app.get('/getPrivateMessages', (req, res) => {
  const senderParam = req.query.sender; 
  const receiverParam = req.query.receiver
  console.log('sender:', senderParam);
  console.log('receiver:', receiverParam);
  if (!senderParam || !receiverParam) {
    return res.status(400).json({ error: 'sender and receiver required' });
  }
  const senderValues = senderParam.split(',');
  const receiverValues = receiverParam.split(',');
  const sql = `SELECT * FROM privateMessages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)  ORDER BY idPrivateMessages ASC`;
  connection.query(sql, [senderValues[0], receiverValues[1], senderValues[1], receiverValues[0]], (err, results) => {
    console.log('results:', results);
    if (err) {
      console.error('Error fetching private messages:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    return res.status(200).json({ messages: results });
  });
});

// Endpoint for admins to delete a chat message via HTTP request 
app.post('/deleteMessage', (req, res) => {
  const { messageId, channelName, teamName, username } = req.body;
  
  if (!messageId || !channelName || !teamName || !username) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const adminCheckSql = 'SELECT isAdmin FROM members WHERE username = ?';
  connection.query(adminCheckSql, [username], (err, results) => {
    if (err) {
      console.error('Error checking admin status:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0 || results[0].isAdmin !== 1) {
      return res.status(403).json({ error: 'Only admins can delete messages' });
    }
    
    const deleteSql = 'DELETE FROM chatMessages WHERE idchatMessages = ? AND channelName = ? AND teamName = ?';
    connection.query(deleteSql, [messageId, channelName, teamName], (err, result) => {
      if (err) {
        console.error('Error deleting message:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      const roomName = `${teamName}-${channelName}`;
      io.to(roomName).emit('deleteMessage', { messageId });
      res.status(200).json({ message: 'Message deleted successfully' });
    });
  });
});

// ----- Socket.IO Setup -----
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // Joining a private message room
  socket.on('joinPrivateRoom', ({ username }) => {
    socket.join(username);
    console.log(`Socket ${socket.id} joined private room: ${username}`);
  });

  // Joining a channel room
  socket.on('joinChannel', ({ channelName, teamName }) => {
    const roomName = `${teamName}-${channelName}`;
    socket.join(roomName);
    console.log(`Socket ${socket.id} joined room ${roomName}`);
  });

  // Handle new messages
  socket.on('newMessage', (data) => {
    const { channelName, teamName, sender, message } = data;
    const sql = 'INSERT INTO chatMessages (channelName, teamName, sender, message) VALUES (?, ?, ?, ?)';
    connection.query(sql, [channelName, teamName, sender, message], (err, result) => {
      if (err) {
        console.error('Error inserting message:', err);
        socket.emit('errorMessage', { error: 'Database error' });
        return;
      }
      const roomName = `${teamName}-${channelName}`;
      io.to(roomName).emit('message', { sender, message, id: result.insertId });
    });
  });

  // Handle new private messages
  socket.on('newPrivateMessage', (data) => {
    const { sender, receiver, message } = data;
    console.log('Received private message:', data);
    const sql = 'INSERT INTO privateMessages (sender, receiver, message) VALUES (?, ?, ?)';
    connection.query(sql, [sender, receiver, message], (err, result) => {
      if (err) {
        console.error('Error inserting private message:', err);
        socket.emit('errorMessage', { error: 'Database error' });
        return;
      }
      io.to(sender).emit('privateMessage', { sender, receiver, message, id: result.insertId });
      io.to(receiver).emit('privateMessage', { sender, receiver, message, id: result.insertId });
    });
  });

  socket.on('deleteMessage', (data) => {
    const { messageId, channelName, teamName, username } = data;
    console.log('Received delete message:', data);
    if (!messageId || !channelName || !teamName || !username) {
      return socket.emit('errorMessage', { error: 'Missing required fields' });
    }

  
    // Check if the user is an admin
    const adminCheckSql = 'SELECT isAdmin FROM members WHERE username = ?';
    connection.query(adminCheckSql, [username], (err, results) => {
      if (err) {
        console.error('Error checking admin status:', err);
        return socket.emit('errorMessage', { error: 'Database error' });
      }
      if (results.length === 0 || results[0].isAdmin !== 1) {
        return socket.emit('errorMessage', { error: 'Only admins can delete messages' });
      }
  
      // Delete the message function only for isAdmin = 1
      const deleteSql = 'DELETE FROM chatMessages WHERE idchatMessages = ? AND channelName = ? AND teamName = ?';
      connection.query(deleteSql, [messageId, channelName, teamName], (err, result) => {
        if (err) {
          console.error('Error deleting message:', err);
          return socket.emit('errorMessage', { error: 'Database error' });
        }
        const roomName = `${teamName}-${channelName}`;
        io.to(roomName).emit('deleteMessage', { messageId });
  
        const systemMessage = 'This message was deleted due to code violations';
        const insertMessageSql = 'INSERT INTO chatMessages (channelName, teamName, sender, message) VALUES (?, ?, ?, ?)';
        connection.query(insertMessageSql, [channelName, teamName, 'System', systemMessage], (err2, result2) => {
          if (err2) {
            console.error('Error inserting system message:', err2);
            return socket.emit('errorMessage', { error: 'Database error inserting system message' });
          }
          io.to(roomName).emit('message', { sender: 'System', message: systemMessage, id: result2.insertId });
        });
      });
    });
  });
  
  // delete private message
  socket.on('deletePrivateMessage', (data) => {
    const { messageId, sender, receiver } = data;
    console.log('Received delete private message:', data);
    if (!messageId || !sender || !receiver) {
      return socket.emit('errorMessage', { error: 'Missing required fields' });
    }
    const deleteSql = 'DELETE FROM privateMessages WHERE idPrivateMessages = ? AND sender = ? AND receiver = ?';
    connection.query(deleteSql, [messageId, sender, receiver], (err, result) => {
      if (err) {
        console.error('Error deleting private message:', err);
        return socket.emit('errorMessage', { error: 'Database error' });
      }
      io.to(sender).emit('deletePrivateMessage', { messageId });
      io.to(receiver).emit('deletePrivateMessage', { messageId });

      const systemMessage = 'This message was deleted by sender';
      const insertMessageSql = 'INSERT INTO privateMessages (sender, receiver, message) VALUES (?, ?, ?)';
      connection.query(insertMessageSql, ['System', receiver, systemMessage], (err2, result2) => {
        if (err2) {
          console.error('Error inserting system message:', err2);
          return socket.emit('errorMessage', { error: 'Database error inserting system message' });
        }
        io.to(receiver).emit('privateMessage', { sender: 'System', receiver, message: systemMessage, id: result2.insertId });
      });
    });
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server using the HTTP server instance
const PORT = 5008;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
