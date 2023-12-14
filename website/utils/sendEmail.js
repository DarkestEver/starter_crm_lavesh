import nodemailer from "nodemailer"

export default function sendEmail(email,emailHtml){

    const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, 
    auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS
    }
    });
    const mailOptions = {
        from: 'support@eurasiaglobal.net',
        to: email, 
        cc: 'sales@eurasiaglobal.net',  
        bcc: 'keshav.singh4@gmail.com',
        subject: 'Thank You for Contacting Eurasia',
        html: emailHtml,
        attachments: [{
            filename: "eurasia-global-logo.png",
            path: `${process.env.BASE_URL}/img/general/eurasia-global-logo.png`,
            cid: "unique@logoImage.info"
        }]    
    };


    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        return info;
    }
    });

}