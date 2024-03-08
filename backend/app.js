const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
require("./models/db.sync");
const Chat = require('./models/chatmodal');
const router = require('./routes/index');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

app.use(express.json());

// Update CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your actual frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
}));

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your actual frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.post('/send-chat', async (req, res) => {
  const { sender, receiver, message } = req.body;

  try {
    const newChat = await Chat.create({ sender, receiver, message });
    io.emit('message', newChat);
    res.json(newChat);
  } catch (error) {
    console.error('Error sending the message:', error);
    res.status(500).json({ error: 'Failed to send the message' });
  }
});

app.get('/get-chat', async (req, res) => {
  try {
    const allChats = await Chat.findAll();
    res.json(allChats);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ error: 'Failed to fetch chat messages' });
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
