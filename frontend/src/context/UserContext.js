import { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../api/api.js";

// Configure Axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to login user
  async function loginUser(email, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post('/api/login', { email, password });
      toast.success(data.message);
      localStorage.setItem("token", data.token); // Store token in localStorage
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; // Set default header for Authorization
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/profile");
      fetchMyCourse();
    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  }

  // Function to register user
  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post('/api/register', { name, email, password });
      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      setBtnLoading(false);
      navigate("/verify");
    } catch (error) {
      setBtnLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  }

  // Function to verify OTP
  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post('/api/verify', { otp, activationToken });
      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
      setBtnLoading(false);
    } catch (error) {
      setBtnLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Verification failed. Please try again.");
      }
    }
  }

  // Function to fetch user profile
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { data } = await axios.get('/api/profile');
        setUser(data.user);
        setIsAuth(true);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setIsAuth(false);
      }
    }
    setLoading(false);
  }, []);

  // Function to logout user
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    axios.defaults.headers.common['Authorization'] = null; // Remove Authorization header
    setUser(null);
    setIsAuth(false);
  };

  // Fetch user on mount
  useEffect(() => {
    fetchUser(); // Fetch user data when the component mounts
  }, [fetchUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        registerUser,
        verifyOtp,
        logout,
        fetchUser, // Include fetchUser in the context value
        btnLoading,
        loading,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
