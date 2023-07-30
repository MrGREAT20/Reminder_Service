const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const app = express();
const {sendBasicEmail} = require('./services/email-service');
const cron = require('node-cron');

const SetupAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.listen(PORT, ()=>{
        console.log('Server is running at', PORT);
        // sendBasicEmail(
        //     'support@admin.com',
        //     'vu1f1920082@pvppcoe.ac.in',
        //     'This is a test Subject',
        //     'Hey, how r you? hope you like the support'

        //     );
        // cron.schedule('*/2 * * * *', () => {
        //     console.log('running a task every two minutes');
        //   });
    });
}
SetupAndStartServer();