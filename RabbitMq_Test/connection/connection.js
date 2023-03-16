import { connect } from 'amqplib/callback_api.js';
export default (callback) => {
  connect('amqp://localhost',
    (error, conection) => {
      if (error) {
        throw new Error(error);
      }

      callback(conection);
    })
}