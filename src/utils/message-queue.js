const amqplib = require('amqplib');
const {EXCHANGE_NAME, MESSAGE_BROKER_URL, } = require('../config/serverConfig');
const createChannel = async() => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        //MESSAGE_BROKER_URL we will take this from env variable, this is the setup of rabbitMQ
    
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    
        //what is this assertExchange?, once we have created a channel   
    } catch (error) {
        throw error;
    }
}

const subscribeMessage = async (channel, service, binding_key) => {
    try {
        const applicationQueue = await channel.assertQueue('REMINDER_QUEUE');
        channel.bindQueue(applicationQueue.queue,EXCHANGE_NAME, binding_key);
        channel.consume(applicationQueue.queue, msg => {
            console.log('received data');
            const payload = JSON.parse(msg.content.toString());
            service(payload);
            channel.ack(msg);
        });
    } catch (error) {
        throw error;
    }
}
const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.assertQueue('REMINDER_QUEUE');
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error;
    }
}
module.exports = {
     subscribeMessage,
     createChannel
}