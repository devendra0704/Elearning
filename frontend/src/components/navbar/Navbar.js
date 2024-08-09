import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBIcon,
  MDBBtn,
  MDBInputGroup
} from 'mdb-react-ui-kit';
import { UserData } from '../../context/UserContext.js'; // Adjust the path as per your project structure
import logout from '../../utils/logout'; // Import your logout function

const Navbar = () => {
  const [showNav, setShowNav] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);

  const { isAuth, user, setUser, setIsAuth } = UserData(); // Use custom hook to get authentication status and user data
  const navigate = useNavigate();

  const isAdmin = user && user.role === 'admin'; // Check if user is admin

  const handleLogout = async () => {
    await logout(setUser, setIsAuth);
    navigate('/');
  };

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid className='d-flex align-items-center justify-content-between'>
        <MDBNavbarBrand href='/'>
        StudyNotion
        </MDBNavbarBrand>
        <div className='d-flex align-items-center'>
          {showSearch && (
            <MDBInputGroup tag="form" className='d-flex w-auto me-2'>
              <input className='form-control' placeholder="Search" aria-label="Search" type='Search' />
            </MDBInputGroup>
          )}
          <MDBBtn outline color="primary" onClick={() => setShowSearch(!showSearch)} className='me-2'>
            <MDBIcon icon='search' />
          </MDBBtn>
          <MDBNavbarToggler
            type='button'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNav(!showNav)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
        </div>
        <MDBCollapse navbar show={showNav} className='justify-content-end'>
          <MDBNavbarNav className='mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <NavLink className='nav-link' exact to='/' activeClassName='active'>
                <MDBIcon icon='home' fas /> Home
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink className='nav-link' exact to='/about' activeClassName='active'>
                <MDBIcon icon='info-circle' fas /> About
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                  <NavLink className='nav-link' exact to='/all-courses' activeClassName='active'>
                  <MDBIcon icon='laptop' fas /> Courses
                  </NavLink>
                </MDBNavbarItem>
            {/* Conditionally render links based on authentication and role */}
            {isAuth ? (
              isAdmin ? (
                <>

                  <MDBNavbarItem>
                    <NavLink className='nav-link' to='/create-course' activeClassName='active'>
                      <MDBIcon icon='plus' fas /> Add Course
                    </NavLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <NavLink className='nav-link' to='/stats' activeClassName='active'>
                      <MDBIcon icon='chart-bar' fas /> Stats
                    </NavLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <NavLink className='nav-link' to='/profile' activeClassName='active'>
                      <MDBIcon icon='user' fas /> Profile
                    </NavLink>
                  </MDBNavbarItem>
                </>
              ) : (
                <>
                  <MDBNavbarItem>
                    <NavLink className='nav-link' to='/my-courses' activeClassName='active'>
                      <MDBIcon icon='graduation-cap' fas /> My Courses
                    </NavLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <NavLink className='nav-link' to='/profile' activeClassName='active'>
                      <MDBIcon icon='user' fas /> Profile
                    </NavLink>
                  </MDBNavbarItem>
                </>
              )
            ) : (
              <>

                <MDBNavbarItem>
                  <NavLink className='nav-link' to='/register' activeClassName='active'>
                    <MDBIcon icon='user-plus' fas /> Register
                  </NavLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <NavLink className='nav-link' to='/login' activeClassName='active'>
                    <MDBIcon icon='sign-in-alt' fas /> Login
                  </NavLink>
                </MDBNavbarItem>
              </>
            )}
            {/* Always render logout option if authenticated */}
            {isAuth && (
              <MDBNavbarItem>
                <NavLink className='nav-link' to='/' onClick={handleLogout} activeClassName='active'>
                  <MDBIcon icon='sign-out-alt' fas /> Logout
                </NavLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
