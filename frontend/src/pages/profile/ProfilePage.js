// components/ProfilePage.js

import React, { useEffect } from 'react';
import { UserData } from '../../context/UserContext.js';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/online-learning.jpg';

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

const ProfilePage = () => {
  const { isAuth, user, fetchUser } = UserData();

  useEffect(() => {
    fetchUser(); // Fetch user data on component mount
  }, [fetchUser]);

  return (
    <MDBContainer
      fluid
      className='bg-dark d-flex justify-content-center align-items-center'
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover'
      }}
    >
      {isAuth ? (
        <MDBCard className="w-50">
          <MDBCardBody className="text-center">
            <MDBCardTitle>Welcome, {user.name}!</MDBCardTitle>
            <MDBCardText>
              We're thrilled to have you back! Dive into your courses and keep learning. Remember, every step you take brings you closer to your goals. Happy learning!
            </MDBCardText>
            <Link to="/all-courses">
              <MDBBtn color="" className="mt-3">
                <MDBIcon icon="sign-out-alt" className="me-2" />
                Explore Courses
              </MDBBtn>
            </Link>
          </MDBCardBody>
        </MDBCard>
      ) : (
        <MDBCard className="w-50">
          <MDBCardBody className="text-center">
            <MDBCardTitle>Profile Page</MDBCardTitle>
            <MDBCardText>
              Please log in to view your profile and access your courses.
            </MDBCardText>
            <Link to="/login">
              <MDBBtn color="primary" className="mt-3">
                <MDBIcon icon="sign-in-alt" className="me-2" />
                Login
              </MDBBtn>
            </Link>
          </MDBCardBody>
        </MDBCard>
      )}
    </MDBContainer>
  );
};

export default ProfilePage;
