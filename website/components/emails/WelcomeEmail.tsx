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

import fs from "fs";

interface WelcomeEmailProps {
    name: string;
    phone: string;
    email: string;
    message: string;
  }
  
  export const WelcomeEmail = ({
    name,phone,email,message 
  }: WelcomeEmailProps) => (
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
            alt="eurasia-logo"
            style={logo}
          />
          <Text style={paragraph}>Hi <b>{name}</b>,</Text>

          <Text style={paragraph}>
            Thank you for reaching out to Eurasia! We have received your inquiry and are thrilled that you&apos;re considering us for your travel needs.
          </Text>

          <Text style={paragraph}>
            Our team is currently reviewing your message and will get back to you as soon as possible. We understand the importance of your inquiry and strive to provide prompt and comprehensive responses to all our valued customers.
          </Text>

          <Text style={paragraph}>
            Should you require urgent assistance, please feel free to call our Customer care no. at +91-8542951004. <br/> <br/>
            Thank you once again for choosing Eurasia. We look forward to assisting you in planning your dream journey!
          </Text>

          <Text style={paragraph}>
            Your inquiry details:
              <br /><br />
              Name: <b>{name}</b>
              <br /><br />
              Email: <b>{email}</b>
              <br /><br />
              Phone: <b>{phone}</b>
              <br /><br />
              Message: <b>{message}</b>
              <br /><br />
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
  
  export default WelcomeEmail;
  
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
  