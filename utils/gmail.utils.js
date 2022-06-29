
const {createTransport}= require('nodemailer');
const password = process.env.ADMIN_EMAIL_PASSWORD;
const { logger } = require('./../log/logger')
const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: password
    },
    tls: {rejectUnauthorized: false}    
});




const notifMailAdmin = async(notification,reason)=>{
    try {
        const mailOptions = {
            to: process.env.ADMIN_EMAIL,
            subject:notification,
            html: `<h1>Se registro ${notification} : <span style="color:green;">${reason}</span></h1>`,
        
        };

        const mail = await transporter.sendMail(mailOptions)
    } catch (error) {
        logger.log('error',error.message)
    } 
}
module.exports = notifMailAdmin