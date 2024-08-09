import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBRow, MDBCol, MDBCardImage } from 'mdb-react-ui-kit';
import { CSSTransition } from 'react-transition-group';
import courseImage1 from '../../assets/machine-learning.webp'; // Add appropriate course images
import courseImage2 from '../../assets/web-development.jpg';
import courseImage3 from '../../assets/data-science.jpg';
import './HomePage.css';

const HomePage = () => {
  const courses = [
    {
      title: 'Machine Learning',
      description: 'Learn the basics of Machine Learning and build models.',
      image: courseImage1,
    },
    {
      title: 'Web Development',
      description: 'Become a full-stack web developer with our comprehensive course.',
      image: courseImage2,
    },
    {
      title: 'Data Science',
      description: 'Master data analysis and visualization techniques.',
      image: courseImage3,
    },
    {
      title: 'Data Science',
      description: 'Master data analysis and visualization techniques.',
      image: courseImage3,
    },
    {
      title: 'Data Science',
      description: 'Master data analysis and visualization techniques.',
      image: courseImage3,
    },
    {
      title: 'Data Science',
      description: 'Master data analysis and visualization techniques.',
      image: courseImage3,
    },
  ];

  return (
    <div className="home-page">
      <MDBContainer className="mt-5">
        <CSSTransition
          in={true}
          appear={true}
          timeout={1000}
          classNames="fade"
        >
          <MDBCard className="shadow-lg no-bg welcome-card">
            <MDBCardBody>
              <MDBCardTitle className="text-center display-4 mt-4 mb-4">
                Welcome to LearningAdda Platform
              </MDBCardTitle>
              <MDBCardText className="text-center lead mb-5">
                Explore and enhance your knowledge with our extensive courses.
              </MDBCardText>
              <div className="d-flex justify-content-center mb-4">
                <Link to="/login">
                  <MDBBtn color="primary" size="lg">
                    Explore Courses
                  </MDBBtn>
                </Link>
              </div>
            </MDBCardBody>
          </MDBCard>
        </CSSTransition>

        <MDBRow className="mt-5">
          {courses.map((course, index) => (
            <MDBCol md="4" key={index} className="mb-4">
              <MDBCard className="h-100 shadow-sm course-card">
                <MDBCardImage src={course.image} position="top" alt={course.title} />
                <MDBCardBody>
                  <MDBCardTitle>{course.title}</MDBCardTitle>
                  <MDBCardText>{course.description}</MDBCardText>
                  <div className="d-flex justify-content-center">
                    <Link to="/courses">
                      <MDBBtn color="primary">Learn More</MDBBtn>
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default HomePage;
