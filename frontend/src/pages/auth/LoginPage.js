import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap'; // Import Alert from react-bootstrap
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; // Import MDB CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import backgroundImage from '../../assets/online-learning.jpg';
import { useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, () => {});
  };

  return (
    <MDBContainer fluid className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <MDBCard className='my-4' style={{ maxWidth: '600px', width: '100%' }}>
        <MDBCardBody className='text-black'>
          <h3 className="mb-5 text-uppercase fw-bold text-center">Login</h3>
          <form onSubmit={submitHandler}>
            <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='formEmail' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='formPassword' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="d-flex justify-content-end pt-3">
              <MDBBtn type="submit" style={{ backgroundColor: '#A0DEFF', borderColor: '#5AB2FF' }}  size='lg'>{btnLoading ? "Please Wait..." : "Login"}</MDBBtn>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default LoginPage;
