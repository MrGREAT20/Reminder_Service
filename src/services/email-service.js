const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticketrepository');
const repo = new TicketRepository();
const sendBasicEmail = async (Mailfrom, Mailto, MailSubject, MailBody) => {
    try {
        const response = await sender.sendMail({
            from: Mailfrom,
            to: Mailto,
            subject: MailSubject,
            text: MailBody
        });
    } catch (error) {
        console.log(error);
    }
    /**
     * Above is one of the feature of sender (transporter) Object we created to construct a mail and send 
     */

    /**
     * Since sendMail is a promise so we will use async and await
     */
    
}
const fetchPendingEmails = async (timestamp) => {
    /**
     * timestamp parameter is used to to send the noti before this timestamp
     */
    try {
        const response = await repo.get({status:"PENDING"});
        return response;  
    } catch (error) {
        console.log(error);
    }
}

const CreateNotification = async(data) => {
    try {
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}
const UpdateStatus = async(updateId, data) => {
    try {
        const response = await repo.update(updateId, data);
        return response;
    } catch (error) {
        
    }
}
const subscribeEvents = async(payload) => {
    let service = payload.service;
    let data = payload.data;
    switch(service){
        case 'CREATE_TICKET':
            await CreateNotification(data);
            break;
        case 'SEND_BASIC_MAIL':
            await sendBasicEmail("",data.recepientEmail,data.subject, data.content);
            break;
        default:
            console.log('No valid Event recieved');
            break;

    }
}
module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    CreateNotification,
    UpdateStatus,
    subscribeEvents
}