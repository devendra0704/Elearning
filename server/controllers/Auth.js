import User from "../models/User.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import OTP from "../models/OTP.js";
import Profile from "../models/Profile.js";
import toast from "react-hot-toast";
import mailSender from "../utils/mailSender.js";
import passwordUpdated  from "../mail/templates/passwordUpdate.js";
dotenv.config();

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        const checkUserPresent = await User.findOne({ email });
        
        if (checkUserPresent) {
            return res.status(401).json({
                success: true,
                message: `user already exist `,
            })
        }
        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("otp generated", otp);
        //check unique otp or not 
        const result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }
        const otpPayload = { email, otp };
        //creat an entry for otp
        const otpBody = await OTP.create(otpPayload);
        console.log("otpbody...",otpBody);
        //return response successfully
        res.status(200).json({
            success: true,
            message: "otp sent successfully",
            otp,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }
};
export const signUp = async (req, res) => {
    try {
        //fetch data from request body
        const { firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            conctNumber,
            otp } = req.body;
            // console.log(req.body);
            // console.log(!firstname || !lastname || !email || !password || !otp || !confirmpassword);
            if (!firstName || !lastName || !email || !password || !otp || !confirmPassword) {
                return res.status(403).json({
                    success: false,
                    message: "all fields are required",
                })
            }
        //match password
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'password and confirmpassword value does not match,please try again'
            })
        }
        //check user already exist or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'user is  already registered',
            })
        }
        //find most recent otp stored for the user
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOtp);
        //validate otp
        if (recentOtp.length === 0) {//otp not found
            return res.status(400).json({
                success: false,
                message: 'otp not found'
            })
        } else if (otp !== recentOtp[0].otp) {
            toast.error("otp is wrong")
            return res.status(400).json({
                success: false,
                message: "invalid otp",
            })
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //entry create in db
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactnumber: null
        });
        const user = await User.create({
            firstName,
            lastName,
            email,
            conctNumber,
            password: hashedPassword, accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}${lastName}`
        })
        // return response
        return res.status(200).json({
            success: true,
            message: 'user is registered successfully',
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: 'all fields are required ,please try again',

            })
        }
        //user check exist or not
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not registered,please signup first",
            })
        }
        //generate jwt,after passsword matching
        // console.log("password.....",await bcrypt.compare(password, user.password));
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role,
            }

            // console.log("payload....",payload);
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            // console.log("token....", token);

            user.token = token;
            user.password = undefined;


            // console.log("user.....",user);
            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'logged in successfullty',
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: 'password is incorrect',
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'login fail,please try again'
        });

    }
}
//change password
export const changePassword = async (req, res) => {

    try {
        const userDetails = await User.findById(req.user.id);                       
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        // console.log("pass..",req.body);

        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password); 

        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "The password is incorrect" });
        }

        // if (newPassword !== confirmNewPassword) {                           
        //     return res.status(401).json({ success: false, message: "The password and confirm password does not match" });
        // }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);             // Update password
        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id, { password: encryptedPassword }, { new: true });
        // find user by id and then update password = encryptedPassword , here if you "const updatedUserDetails =" does not wirte this then also it not affect;

        console.log("updatedUserDetails ",updatedUserDetails);

        try {
            const emailResponse = await mailSender(updatedUserDetails.email,"Password updated" ,passwordUpdated(updatedUserDetails.email, `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`));
            console.log("Email sent successfully:", emailResponse.response);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        return res.status(200).json({ success: true, message: "Password updated successfully" });         // Return success response 	 
    }
    catch (error) {
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
};

