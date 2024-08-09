// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import VerifyPage from './pages/auth/VerifyPage';
import { UserContextProvider } from './context/UserContext'; // Ensure correct import
import { CourseProvider } from './context/CourseContext';
import AboutPage from './pages/about/AboutPage.js';
import CourseDetail from './pages/courses/CourseDetail.js';
import CoursesList from './pages/courses/CoursesList.js';
import CreateCourse from './pages/courses/CreateCourse.js';

const App = () => {
  return (
    <CourseProvider>
      <UserContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path='/all-courses' element={<CoursesList />} />
            <Route path='/course/:courseId' element={<CourseDetail />} />
            <Route path='/create-course' element={<CreateCourse />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </CourseProvider>
  );
};

export default App;
