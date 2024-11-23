const express = require('express');
const path = require('path');
const fs = require('fs');
const serverless = require('serverless-http');
const router = express.Router();

const app = express();
// app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server Listening on PORT:', PORT);
});

app.get('/image', (req, res) => {
  const filePath = path.join(__dirname, 'res.png');
  console.dir(__dirname);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.sendFile(filePath);
  });
});

app.get('/', (req, res) => {
  res.end(req.query.name ? 'Hello ' + req.query.name : 'Hello you');
});

app.use('/.netlify/functions/app', router);
module.exports.handler = serverless(app);
