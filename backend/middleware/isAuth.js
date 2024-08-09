import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization; // Corrected to 'authorization'

        if (!token) {
            return res.status(403).json({
                message: "Please Login"
            });
        }

        const decodeData = jwt.verify(token.split(' ')[1], process.env.Jwt_Secret || 'rishi@123'); // Extract token properly
        req.user = await User.findById(decodeData._id);

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Login First"
        });
    }
};

export const isAdmin = async (req, res, next) => {
    try {


        if (req.user.role != "admin") {
            return res.status(403).json({
                message: "You are not an Admin."
            });
        }


        next();
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
