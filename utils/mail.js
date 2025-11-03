import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/*
const transport = nodemaailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    //secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});
*/

// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b132eceeb3d570",
    pass: "619f49d20a8360"
  }
});

const mail = async (to, subject, text) => {
    try{
        const mailOptions = {
            from: "noreply@proyectobackendnucba.com", //process.env.MAIL_FROM,
            to,
            subject,
            text
        };
        await transport.sendMail(mailOptions);
        console.log("Email sent successfully.");
        
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default mail;