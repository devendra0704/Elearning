import mailSender from "../utils/mailSender.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";


//resetPasswordToken :- it generate token and send URL with Token to the user;
export const resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ success: false, message: 'Your Email is not registered' });
        }

        const token = crypto.randomBytes(20).toString("hex");

        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 60,
            },
            { new: true });

        const url = `http://localhost:3000/update-password/${token}`
        await mailSender(email, "Password Reset Link", `Your Link for email verification is ${url}. Please click this url to reset your password.`);

        return res.json({
            success: true,
            message: 'Email sent successfully, please check email and change pwd',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while sending reset pwd mail'
        })
    }
};


//resetPassword/
export const resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;                   //data fetch
        if (password !== confirmPassword) {                                    //validation
            return res.json({ success: false, message: 'Password not matching', });
        }

        const userDetails = await User.findOne({ token: token });             //get userdetails from db using token
        if (!userDetails) {                                                 //if no entry - invalid token
            return res.json({ success: false, message: 'Token is invalid', });
        }

        if (!(userDetails.resetPasswordExpires > Date.now())) {                 //token time check 
            return res.json({ success: false, message: 'Token is expired, please regenerate your token', });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);           //hash password

        //password update IN DB;
        await User.findOneAndUpdate({ token: token }, { password: encryptedPassword }, { new: true },);

        return res.status(200).json({                             //return response
            success: true,
            message: 'Password reset successful',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while sending reset pwd mail'
        })
    }
};