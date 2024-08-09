// utils/logout.js

import axios from "../api/api.js";

const logout = async (setUser, setIsAuth) => {
  try {
    // Clear local storage and reset authentication state
    localStorage.removeItem("token");
    axios.defaults.headers.common['Authorization'] = null;
    setUser(null);
    setIsAuth(false);
    // Optionally, force a refresh of the page to ensure state reset
    window.location.href = '/';
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export default logout;
