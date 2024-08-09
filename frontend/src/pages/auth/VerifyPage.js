import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';
import { UserData } from "../../context/UserContext.js";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../../assets/online-learning.jpg';

const VerifyPage = () => {
  const navigate = useNavigate();
  const { verifyOtp, btnLoading } = UserData();
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 5) {
      setErrorMessage('Please enter all 5 digits of the OTP.');
      return;
    }
    try {
      await verifyOtp(otpValue, navigate);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Verification failed. Please try again.');
    }
  };

  return (
    <MDBContainer fluid className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <MDBCard className="my-5" style={{ maxWidth: '400px', width: '100%' }}>
        <MDBCardBody className="text-center">
          <h3 className="mb-5 text-uppercase fw-bold text-center">Verify Account</h3>
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center mb-4">
              {otp.map((data, index) => (
                <MDBInput
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onFocus={e => e.target.select()}
                  className="mx-1 text-center"
                  style={{ width: '2rem', height: '3rem' }}
                />
              ))}
            </div>
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            <MDBBtn type="submit" style={{ backgroundColor: '#A0DEFF', borderColor: '#5AB2FF' }} size='lg' disabled={btnLoading}>{btnLoading ? "Please Wait..." : "Verify"}</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default VerifyPage;
