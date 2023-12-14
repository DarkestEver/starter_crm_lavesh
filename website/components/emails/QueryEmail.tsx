import * as React from 'react';

import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from '@react-email/components';

interface Guest {
  Adults: number;
  Children: number;
  Infant: number;
  Rooms: number;
}
interface QueryEmailProps {
  location: string;
  dates: string[];
  guests: Guest;
  email: string;
  phone: string;
}

export const QueryEmail = ({
  location, dates, guests, email, phone
}: QueryEmailProps) => (

    <Html>
    <Head />
    <Preview>
    Thank You for Your Inquiry.
    </Preview>
    <Body style={main}>
    <Container style={container}>
        <Img
        src="cid:unique@logoImage.info"
        width="170"
        height="100"
        alt="eurasia"
        style={logo}
        />
        <Text style={paragraph}>Hi {email},</Text>
        <Text style={paragraph}>
            Thank you for reaching out to Eurasia! We have received your inquiry and will get back to you as soon as possible.
        </Text>
    
        <Text style={paragraph}>
            Your Inquiry Details:
        </Text>
        <Text style={paragraph}>
            <ul>
            <li><strong>Location:</strong> {location}</li>
            {dates && dates.length >= 2 && (
              <li><strong>Dates:</strong> {`${dates[0]} - ${dates[1]}`} </li>
            )}
            {guests && typeof guests === 'object' && (
               <li>
                 <strong>Guests:</strong> {guests.Adults} Adults, {guests.Children} Children, {guests.Infant} Infant, {guests.Rooms} Rooms
               </li>
            )}
            <li><strong>Email:</strong> {email}</li>
            <li><strong>Phone:</strong> {phone}</li>
            </ul>
        </Text>

        <Text style={paragraph}>
            Our team is currently reviewing your inquiry and will reach out to you shortly with more information.
        </Text>
        <Text style={paragraph}>
            If you have any urgent questions, feel free to call us at +91-8542951004..
        </Text>

        
        <Section style={btnContainer}>
            <Button pX={12} pY={12} style={button} href={`${process.env.BASE_URL}`}>
            Book a Travel Package now !
            </Button>
        </Section>
            <Text style={paragraph}>
            Best,
            <br />
            The Eurasia Team
            </Text>
        <Hr style={hr} />
                
        <Text style={footer}>
            647/2A, Vashishtpuram, Jankipuram Extension, Lucknow, 226021, India.
        </Text>
    </Container>
    </Body>
    </Html>
);

export default QueryEmail;


const main = {
    backgroundColor: '#ffffff',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
  };
  
  const logo = {
    margin: '0 auto',
  };
  
  const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
  };
  
  const btnContainer = {
    textAlign: 'center' as const,
  };
  
  const button = {
    backgroundColor: '#5F51E8',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
  };
  
  const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
  };
  
  const footer = {
    color: '#8898aa',
    fontSize: '12px',
  };
  