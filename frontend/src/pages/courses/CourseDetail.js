import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCourseContext } from '../../context/CourseContext.js';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardImage
} from 'mdb-react-ui-kit';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { selectedCourse, fetchCourseById, lectures, fetchLecturesByCourseId } = useCourseContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCourseById(courseId);
      await fetchLecturesByCourseId(courseId);
      setLoading(false);
    };
    fetchData();
  }, [courseId, fetchCourseById, fetchLecturesByCourseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MDBContainer className='py-5'>
      {selectedCourse && (
        <MDBCard className='mb-4'>
          {selectedCourse.image && (
            <MDBCardImage
              src={`http://localhost:5000/${selectedCourse.image}`} // Replace with your backend URL
              alt={selectedCourse.title}
              fluid
            />
          )}
          <MDBCardBody>
            <MDBCardTitle>{selectedCourse.title}</MDBCardTitle>
            {selectedCourse.price && (
              <MDBCardText>
                <strong>Price: </strong>${selectedCourse.price}
              </MDBCardText>
            )}
            <MDBCardText>{selectedCourse.description}</MDBCardText>
          </MDBCardBody>
        </MDBCard>
      )}
      <MDBRow>
        {lectures.map(lecture => (
          <MDBCol key={lecture._id} md='4' className='mb-4'>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>{lecture.title}</MDBCardTitle>
                <MDBCardText>{lecture.description}</MDBCardText>
                <MDBBtn color='secondary'>Watch Lecture</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default CourseDetail;
