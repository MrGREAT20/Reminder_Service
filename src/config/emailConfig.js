const nodemailer = require('nodemailer');
const {EMAIL_ID, EMAIL_PASS} = require('./serverConfig');

const sender = nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:EMAIL_ID,
        pass: EMAIL_PASS
    }
});

module.exports = sender;

/**
 * THIS IS THE TEMPLATE FOR SETTING UP NODEMAILER, HERE THE SENDER OBJECT IS THE IMP ONE WHICH SENDS MAIL
 */