const cron = require('node-cron');
const {sendBasicEmail, fetchPendingEmails, UpdateStatus} = require('../services/email-service');
const sender = require('../config/emailConfig');
/**
 * every 5 minutes,
 * we will check are their any pending emails which are expected to be sent by now and is pending 
 */

const setupjobs = () => {
    cron.schedule('*/2 * * * *', async () => {
        //now we want to add some logic to get the pending emails, we can write this logic in services/email-service.js
        const response = await fetchPendingEmails();
        console.log(response);
        response.forEach((email) => {
           sender.sendMail({ 
                from:"maharajbaahubali123@gmail.com",
                to: email.recepientEmail, 
                subject: email.subject,
                text:email.content
            }, async (err, data) => { //once the email is sent, we can update the status from "PENDING" to "SUCCESS"
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                    await UpdateStatus(email.id, {status:"SUCCESS"});
                }
            });
        });
        console.log(response);

    });
}
module.exports = {setupjobs};