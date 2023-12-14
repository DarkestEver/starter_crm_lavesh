import { QueryEmail } from '../../components/emails/QueryEmail';
import { render } from '@react-email/render';
import sendEmail from "../../utils/sendEmail";

export default async function POST(req,res) {
    try {
        const {location,dates,guests,email,phone} = req.body;

        const emailHtml = render(<QueryEmail location={location} dates={dates} guests={guests} email={email} phone={phone} />);
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

