import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';
import { UserData } from "../../context/UserContext.js";
import backgroundImage from '../../assets/online-learning.jpg';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser, btnLoading } = UserData();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password, navigate);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <MDBContainer fluid className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <MDBCard className='my-4' style={{ maxWidth: '600px', width: '100%' }}>
        <MDBCardBody className='text-black'>
          <h3 className="mb-5 text-uppercase fw-bold text-center">Register</h3>
          <form onSubmit={handleSubmit}>
            <MDBInput wrapperClass='mb-4' label='Name' size='lg' type='text' value={name} onChange={(e) => setName(e.target.value)} required />
            <MDBInput wrapperClass='mb-4' label='Email' size='lg' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <MDBInput wrapperClass='mb-4' label='Password' size='lg' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="d-flex justify-content-end pt-3">
              <MDBBtn type="submit" className='ms-2' style={{ backgroundColor: '#A0DEFF', borderColor: '#5AB2FF' }} size='lg' disabled={btnLoading}>{btnLoading ? "Please Wait..." : "Register"}</MDBBtn>
            </div>
            {errorMessage && <Alert variant='danger' className='mt-3'>{errorMessage}</Alert>}
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default RegisterPage;
