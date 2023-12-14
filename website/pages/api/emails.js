import WelcomeEmail from "../../components/emails/WelcomeEmail";
import { render } from '@react-email/render';
import sendEmail from './../../utils/sendEmail';

export default async function POST(req,res) {
    try {
        const {name, email,phone,message } = req.body;
        const emailHtml = render(<WelcomeEmail name={name} email={email} phone={phone} message={message} />);

        const result = sendEmail(email,emailHtml);
    
        return res.json({
            status: "ok",
            data: result
        })
    }catch (error){
        console.error('Error:', error);
        return res.json(error);
    }
    
}
