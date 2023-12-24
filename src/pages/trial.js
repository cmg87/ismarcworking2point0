import React, { useState } from "react";
import styled from "styled-components";
import profile from "../images/marcprofile.png";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faPhone, faLink } from "@fortawesome/free-solid-svg-icons";

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

// const Modal = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: auto;
//   text-align: center;
//   background-color: #f1f1f0;
//   //bigger screen flow
//   @media (min-width: 1024px) {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     background-color: #f1f1f0;
//     border-radius: 40px;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     width: 40vw;
//     height: auto;
//     margin: 2rem;
//     padding: 2rem;
//   }
// `;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f1f1f0;
`;

const ProfileImage = styled.img`
  width: 350px;
  margin-bottom: 20px;
  height: auto;
  max-height: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #404343;
  padding-bottom: 1rem;
  margin-top: 1rem;
`;

const Bio = styled.p`
  font-size: 16px;
  margin-bottom: 1rem;
  padding: 2rem;
  color: #333;
  text-align: left;
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
  //   width: 150px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #333;
  border: 2px solid #333;
  border-radius: 5px;
  cursor: pointer;
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

// Styled Column
const Column = styled.div`
  display: flex;
  flex-direction: column;
  /* Add additional styling as needed */
`;

// Styled Row
const Row = styled.div`
  display: flex;
  flex-direction: row;
  /* Add additional styling as needed */
`;

const handleDownload = () => {
  // Create a dummy file URL
  const fileUrl = "../files/contact.vcf";

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "file.pdf";

  // Append the link to the document body
  document.body.appendChild(link);

  // Trigger the click event on the link
  link.click();

  // Remove the link from the document body
  document.body.removeChild(link);
};

//QR button code
const Trial = () => {
  const [showQRCode, setShowQRCode] = useState(false);

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };

  //modal code
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <CardContainer>
        <Title>Marc Habbouce</Title>
        <ProfileImage src={profile} alt="Profile" />
        <Bio>
          As the Head of Operations at a top-notch event planning company, I
          take pride in orchestrating the seamless execution of every event.
          Beyond my professional role, I find joy in golfing, cruising on my
          motorcycle, and savoring the occasional cigar, striking a perfect
          balance between precision in the workplace and leisure in my personal
          pursuits.
        </Bio>
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
          <Button onClick={handleDownload}>Save Contact</Button>
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
        </Row>

        {/* <ModalButton onClick={openModal}>Message</ModalButton> */}

        {showModal && (
          <Modal>
            {/* Modal content */}
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p>
                <label>
                  Your Name: <input type="text" name="name" />
                </label>
              </p>
              <p>
                <label>
                  Your Email: <input type="email" name="email" />
                </label>
              </p>
              <p>
                <label>
                  Your Phone Number: <input type="tel" name="phone" />
                </label>
              </p>
              <p>
                <label>
                  Message: <textarea name="message"></textarea>
                </label>
              </p>
              <p>
                <button type="submit">Send</button>
              </p>
            </form>
            <ModalButton onClick={closeModal}>Close</ModalButton>
          </Modal>
        )}
      </CardContainer>
    </Container>
  );
};

export default Trial;
