import { LongQueryEmail } from '../../components/emails/LongQueryEmail';
import { render } from '@react-email/render';
import sendEmail from "../../utils/sendEmail";

export default async function POST(req,res) {
    try {
        const { location, departureCity, name,  dates, guests, phone, email } = req.body;

        const emailHtml = render(<LongQueryEmail location={location} departureCity={departureCity} name={name} dates={dates} guests={guests} email={email} phone={phone} />);
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

