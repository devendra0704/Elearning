// routes/user.js

import express from 'express';
import { register, verifyUser, loginUser, myProfile } from '../controllers/user.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

// Registration route
router.post('/register', register);

// Verification route
router.post('/verify', verifyUser);

// Login route
router.post('/login', loginUser);

// Fetching profile route with isAuth middleware
router.get('/profile', isAuth, myProfile);

export default router;
