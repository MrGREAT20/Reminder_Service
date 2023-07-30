const sender = require('../config/emailConfig');

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

module.exports = {
    sendBasicEmail
}