const express = require('express');
const bodyParser = require('body-parser');
const {PORT, REMINDER_BINDING_KEY} = require('./config/serverConfig');
const app = express();
const {sendBasicEmail, subscribeEvents} = require('./services/email-service');
const {setupjobs} = require('./utils/jobs');
const {Create} = require('./controllers/ticket-controller');
const {createChannel, subscribeMessage}= require('./utils/message-queue');

const SetupAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    const channel = await createChannel();
    subscribeMessage(channel, subscribeEvents, REMINDER_BINDING_KEY);
    app.post('/api/v1/tickets', Create);
    app.listen(PORT, ()=>{
        console.log('Server is running at', PORT);
        //setupjobs();
        // sendBasicEmail(
        //     'support@admin.com',
        //     'vu1f1920082@pvppcoe.ac.in',
        //     'This is a test Subject',
        //     'Hey, how r you? hope you like the support'

        //     );
    });
}
SetupAndStartServer();