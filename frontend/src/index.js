// index.js or App.js

import React from 'react';
import ReactDOM from 'react-dom';
import { UserContextProvider } from './context/UserContext'; // Adjust path to UserContext
import App from './App';
import reportWebVitals from './reportWebVitals';


export const server = 'http://localhost:5000'; // Replace with your actual server URL


ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
