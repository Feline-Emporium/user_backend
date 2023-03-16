import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

import rabbitMQHandler from './connection/connection.js';

rabbitMQHandler((connection) => {
  connection.createChannel((err, channel) => {
    if (err) {
      throw new Error(err);
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      const mainQueue = 'hello'

      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", mainQueue);

      channel.consume(mainQueue, (msg) => {
        const data = msg.content.toString()
        console.log(" [x] Received", data);
      })
    }, { noAck: true })
  })
})


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
});