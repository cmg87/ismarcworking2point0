import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import QRCode from "react-qr-code";
import { StaticImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShare,
  faPhone,
  faLink,
  faDownload,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import {
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const file = "https://video.chrisgoerler.com/contact.vcf";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  text-align: center;
  background-color: #f1f1f0;
  //bigger screen flow
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f1f1f0;
    border-radius: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 40vw;
    height: auto;
    margin: 2rem;
    padding: 2rem;
  }
`;

const Container = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: auto;
    background: linear-gradient(to bottom left, #626263, #26292d);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #404343;
  padding-bottom: 1rem;
  margin-top: 1rem;
`;

const Bio = styled.p`
  font-size: 18px;
  //   margin-bottom: 1rem;
  //   padding: 2rem;
  color: #333;
  text-align: center;
  @media (min-width: 1024px) {
    width: 80%;
  }
`;

const Location = styled.p`
  font-size: 16px;
  margin-bottom: 1rem;
  //   padding: 2rem;
  color: #444;
  text-align: center;
  @media (min-width: 1024px) {
    width: 80%;
  }
`;

const ContactButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #404343;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #333;
  border: 2px solid #333;
  border-radius: 5px;
  cursor: pointer;
  margin: 0.3rem;
  width: 170px;
`;

const Line = styled.div`
  border-top: 2px solid #c8c8c7;
  width: 80%;
  margin: 20px 0;
`;

const QRCodeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QRCodePopup = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
`;

const iconStyle = {
  marginLeft: "10px",
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  /* Add additional styling as needed */
`;

const Index = () => {
  //QR code code
  const [showQRCode, setShowQRCode] = useState(false);

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };

  return (
    <Container>
      <Helmet>
        <title>Marc Habbouche</title>
        <meta name="description" content="Marc Habbouche contact info" />
        <meta name="keywords" content="Marc Habbouche contact info" />
        <link rel="canonical" href="https://www.ismarcworking.com" />
      </Helmet>
      <CardContainer>
        <Title>Marc Habbouche</Title>
        {/* <ProfileImage src={profile} alt="Profile" /> */}
        <StaticImage
          src="../images/marcprofile.png"
          alt="profile picture"
          placeholder="blurred"
          layout="fixed"
          width={350}
          height={350}
        />
        <Bio>I was born at a very young age</Bio>
        <Location>Charlotte NC</Location>
        <ContactButton onClick={toggleQRCode}>
          Share <FontAwesomeIcon icon={faShare} style={iconStyle} />
        </ContactButton>
        {showQRCode && (
          <QRCodeContainer onClick={toggleQRCode}>
            <QRCodePopup>
              <QRCode value={window.location.href} />
            </QRCodePopup>
          </QRCodeContainer>
        )}
        <Line />
        <Row>
          <Button>
            <a href="tel:2164049099">216-404-9099</a>
            <FontAwesomeIcon icon={faPhone} style={iconStyle} />
          </Button>
          <Button>
            <a href={file} target="blank" download>
              Save Contact
            </a>
            <FontAwesomeIcon icon={faDownload} style={iconStyle} />
          </Button>
        </Row>
        <Row>
          <Button>
            <a
              href="https://curatedevents.com/charlotte/?gclid=CjwKCAiAyp-sBhBSEiwAWWzTnh9a7dU3uaiiKB1jsvw7gHtVb-eOLBdzTktfTToAur8WOuy5W2fWKBoCzKcQAvD_BwE"
              target="blank"
            >
              Events
            </a>
            <FontAwesomeIcon icon={faLink} style={iconStyle} />
          </Button>
          <Button>
            <a href="https://www.starboyz.us" target="blank">
              StarBoyz
            </a>
            <FontAwesomeIcon icon={faLink} style={iconStyle} />
          </Button>
        </Row>
        <Row>
          <Button>
            <a href="mailto:Mhabbouche@curatedevents.com" target="blank">
              Work Email
            </a>
            <FontAwesomeIcon icon={faEnvelope} style={iconStyle} />
          </Button>
          <Button>
            <a href="https://www.instagram.com/Habb0uche/" target="blank">
              Instagram
            </a>
            <FontAwesomeIcon icon={faInstagram} style={iconStyle} />
          </Button>
        </Row>
        <Row>
          <Button>
            <a href="https://www.facebook.com/habboucher" target="blank">
              Facebook
            </a>
            <FontAwesomeIcon icon={faFacebook} style={iconStyle} />
          </Button>
          <Button>
            <a href="https://www.linkedin.com/in/mhabbouche" target="blank">
              Linkedin
            </a>
            <FontAwesomeIcon icon={faLinkedin} style={iconStyle} />
          </Button>
        </Row>
      </CardContainer>
    </Container>
  );
};

export default Index;
