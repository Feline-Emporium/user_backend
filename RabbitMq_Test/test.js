import express from "express";
import rabbitMQHandler from './connection/connection.js';

const router = express.Router();

router.post("/test", async (req, res) => {
  rabbitMQHandler((connection) => {
    connection.createChannel((err, channel) => {
      if (err) {
        throw new Error(err)
      }
      var ex = 'hello'
      var msg = JSON.stringify({ task: req.body });

      channel.publish(ex, '', new Buffer(msg), { persistent: false })

      channel.close(() => { connection.close() })
    })
  })
});

export default router;