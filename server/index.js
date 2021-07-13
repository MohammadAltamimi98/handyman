// ---------- require dependencies ----------//
require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const server = http.createServer(app);
const io = require('socket.io')(http);
const adminsRoom = 'admins'; // this room have all the admins
const { v4: uuidv4 } = require('uuid');
const loginRoute = require('./src/routes/user');
const ticketRoute = require('./src/routes/ticket');
app.use(cors());
app.use(express.json());
io.listen(server); // io listening to the server


app.get('/', (req, res) => {
  res.send('The backend of the Handyman application.')
}); // testing route 

app.use(loginRoute);
app.use(ticketRoute);

io.on('connection', (socket) => {
  console.log('client is connected', socket.id);




  socket.on('join', (payload) => {
    socket.join(adminsRoom);
    socket.to(adminsRoom).emit('onlineAdmins', { name: payload.name, id: socket.id })
  });

  socket.on('createTicket', (payload) => {
    socket.in(adminsRoom).emit('newTicket', { ...payload, id: uuidv4(), socketId: socket.id })
    console.log(payload);
  });

  // notify the customer when the admin claims the ticket
  socket.on('claim', payload => {
    socket.to(payload.customerId).emit('claimed', { name: payload.name }) // which admin claimed your ticket
  })



  socket.on('disconnect', () => {
    socket.to(adminsRoom).emit('offlineAdmins', { id: socket.id });
  });
});



server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});


