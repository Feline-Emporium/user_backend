import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import recieve from './recieve.js';

config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  recieve();
});