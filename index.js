

const express = require('express');
const app = express();
const port = 3000;
const events = require('events');
const eventEmitter = new events.EventEmitter();
const cors = require('cors')
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/stream', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  eventEmitter.on('message', (message) => {
    res.write(`data: ${message}\n\n`);
  });
});

app.post('/message', (req, res) => {
  const { username, message } = req.body;
  eventEmitter.emit('message', `${username}: ${message}`);
  res.status(201).send({ message: 'Message created successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});