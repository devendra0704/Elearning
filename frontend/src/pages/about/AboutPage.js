// components/AboutPage.js

import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import backgroundImage from '../../assets/online-learning.jpg';

const AboutPage = () => {
  return (
    <MDBContainer fluid className='bg-dark text-white py-5' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <MDBContainer className='py-5'>
        <MDBRow className='justify-content-center'>
          <MDBCol md='8'>
            <MDBCard className='bg-light text-dark border-0'>
              <MDBCardBody className='p-4'>
                <MDBCardTitle className='text-center display-4'>About Us</MDBCardTitle>
                <MDBCardText className='lead mt-4'>
                  Welcome to LearningAdd, your go-to E-learning platform! Our mission is to empower learners around the world by providing top-quality educational content, anytime and anywhere. Whether you're looking to pick up a new skill, advance your career, or simply explore a new hobby, LearningAdd has something for you.
                </MDBCardText>
                <MDBCardText className='lead mt-4'>
                  At LearningAdd, we believe that education should be accessible to everyone. Our diverse range of courses is designed to cater to all levels, from beginners to advanced learners. Our platform is user-friendly, and our courses are created by industry experts to ensure you get the best learning experience.
                </MDBCardText>
                <MDBCardText className='lead mt-4'>
                  Join our community of learners today and start your journey towards achieving your educational goals. With LearningAdd, learning has never been more enjoyable or convenient.
                </MDBCardText>
                <div className='text-center mt-4'>
                  
                  <MDBBtn color="secondary" href="/all-courses" className="ms-3">
                    <MDBIcon icon="laptop" className="me-2" /> Browse Courses
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default AboutPage;
