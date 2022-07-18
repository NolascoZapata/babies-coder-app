
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
            subject:`New ${notification} registered!`,
            html:
            `
            <body>
                <style>
                main, header, footer{
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    font-family: sans-serif;
                }
                .card-img-top{
                    width: 100px;
                }
                .card-text{
                    color: salmon;
                }
                .copyright{
                    color:gray;
                }
                </style>
                <header>
                <img width="150px" src="https://i.ibb.co/5284vPr/paginainicio.jpg" alt="logo">
                </header>
                <main>
                <h2>New ${notification} registered!</h2>
                <div class="card">
                    <div>
            
                    </div>
                    <img width="50px"src="https://cdn2.iconfinder.com/data/icons/funtime-objects-part-2/60/005_056_okay_approve_check_test_good_vote-256.png" class="card-img-top" alt="reason">
                    <div class="card-body">
                    <h3 class="card-title">${notification}</h3>
                    </div>
                </div>
                </main>
                <footer>
                <p class="copyright"> Copyright RopaBabies©</p>
                </footer>
            </body>
            `
    }

        const mail = await transporter.sendMail(mailOptions)
    } catch (error) {
        logger.log('error',error.message)
    } 
}
module.exports = notifMailAdmin