import express, { Router } from 'express';
import serverless from 'serverless-http';
const path = require('path');
const fs = require('fs');

const api = express();

const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));

router.get('/new', (req, res) => {
  res.end(req.query.name ? 'Hello ' + req.query.name : 'Hello you');
});

router.get('/', (req, res) => {
  res.end('default response. go to new route');
});

router.get('/image', (req, res) => {
  const filePath = path.join(__dirname, 'res.png');
  console.dir(__dirname);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.sendFile(filePath);
  });
});

api.use('/api/', router);

export const handler = serverless(api);
