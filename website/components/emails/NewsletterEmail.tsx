import * as React from 'react';

import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Text,
} from '@react-email/components';

interface NewsletterEmailProps {
  email: string;
}

export const NewsletterEmail = ({ email }: NewsletterEmailProps) => (
  <Html>
    <Head />
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
          Thank you for subscribing to the Eurasia newsletter! You&apos;re now part of our travel community.
        </Text>

        <Text style={paragraph}>
          As a subscriber, you&apos;ll receive the latest travel deals, tips, and exciting destinations directly in your inbox.
        </Text>

        <Text style={paragraph}>
          If you have any questions or need assistance, please feel free to reach out to us.
        </Text>

        <Text style={paragraph}>
          Best,
          <br />
          The Eurasia Team
        </Text>

        <Text style={footer}>
          647/2A, Vashishtpuram, Jankipuram Extension, Lucknow, 226021, India.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default NewsletterEmail;

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

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};
