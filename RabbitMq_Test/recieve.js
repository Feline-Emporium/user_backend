import amqp from 'amqplib/callback_api.js';

function test() {
  amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      var queue = 'hello';

      channel.assertQueue(queue, {
        durable: false
      });

      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

      channel.consume(queue, function (msg) {
        const data = JSON.parse(msg.content.toString())
        console.log(" [x] Received", data);
      }, {
        noAck: true
      });
    });
  });
}
export default test;