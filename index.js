// const express = require('express')
// const cors = require('cors')
// const Pusher = require("pusher");



// const pusher = new Pusher({
//   appId: "1551334",
//   key: "2afba1344e7ea513389a",
//   secret: "73460879d9de624350b6",
//   cluster: "ap2",
 
// });


// const app = express();

// // app.use(cors({
// //     origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
// // }))
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });
  
// app.use(express.json())

// app.post('/api/messages', async (req, res) => {
    
//     await pusher.trigger("chat", "message", {
//         username: req.body.username,
//         message: req.body.message
//     });


//     res.json([]);
// })

// console.log('listening to port 8000');
// app.listen(8000)
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
  eventEmitter.emit('message', req.body.message);
  res.status(201).send({ message: 'Message created successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});