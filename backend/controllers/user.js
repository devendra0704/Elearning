// Import necessary modules and models
import { User } from "../models/User.js";
import sendMail from "../middleware/sendMail.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import TryCatch from "../middleware/TryCatch.js";

export const register = TryCatch(async (req, res) => {
    const { email, name, password } = req.body;
    let user = await User.findOne({ email });

    if (user)
        return res.status(400).json({
            message: "User Already Exists"
        });

    const hashPassword = await bcrypt.hash(password, 10);

    user = {
        name,
        email,
        password: hashPassword
    };

    const otp = Math.floor(Math.random() * 100000);

    const activationToken = jwt.sign({
        user,
        otp
    },
        process.env.Activation_Secret || 'rishi@123',
        {
            expiresIn: "5m",
        });

    await sendMail({
        email,
        subject: "E Learning",
        name,
        otp
    });

    res.status(200).json({
        message: "OTP sent to your email.",
        activationToken,
    });
});



export const verifyUser = TryCatch(async (req, res) => {
    const { otp, activationToken } = req.body;
  
    try {
      const verify = jwt.verify(activationToken, process.env.Activation_Secret || 'rishi@123');
  
      if (!verify) {
        return res.status(400).json({
          message: "Activation token expired or invalid.",
        });
      }
  
      // Ensure correct type for OTP comparison
      const otpFromToken = verify.otp.toString(); // Convert to string if necessary
  
      if (otp !== otpFromToken) {
        return res.status(400).json({
          message: "Wrong OTP entered.",
        });
      }
  
      // Create user using data from token payload
      const { name, email, password } = verify.user;
      await User.create({
        name,
        email,
        password,
      });
  
      res.json({
        message: "User registered successfully.",
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({
        message: "Internal server error during OTP verification.",
      });
    }
  });


export const loginUser = TryCatch(async(req,res) =>{
    const  { email , password} = req.body ;

    const user = await User.findOne({email});

    if(!user)
        return res.status(400).json({
        message : "No User with this email ."
    });
    
    const matchPassowrd =  await bcrypt.compare(password,user.password)

    if(!matchPassowrd)
        return res.status(400).json({
            message : "Wrong Password ."
    });

    const token = jwt.sign({_id : user._id}, process.env.Jwt_Secret || 'rishi@123', {
        expiresIn : "15d"
    });

    res.json({
        message: `Welcome Back ${user.name}`,
        token,
        user,
    });
    
})


export const myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({
            message: "Internal server error during profile fetch."
        });
    }
};