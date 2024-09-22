import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import User from "../models/User.js";

dotenv.config();

export const auth = async (req, res, next) => {
    try{
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        if(!token){  //if token missing, then return response
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        try{  //verify the token
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {                       
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

//isStudent
export const isStudent = async (req, res, next) => {
 try{
        const user =await User.findById(req.user.id);

        if(user.accountType !== "Student"){ 
            return res.status(401).json({ 
                success:false,
                message:'This is a protected route for Students only',
            });
        }
        next();
 }
 catch(error) {
    return res.status(500).json({
        success:false,
        message:'User role cannot be verified, please try again'
    })
 }
}

//isInstructor
export const isInstructor = async (req, res, next) => {
    // console.log("check...........",req.user.id);
    try{ 
        const user =await User.findById(req.user.id);

        // console.log("userInfo.... ",user)

        if(user.accountType !== "Instructor") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Instructor only',
            });
        }
        next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }

//isAdmin
export const isAdmin = async (req, res, next) => {
    try{
        const user =await User.findById(req.user.id);

           if(user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
}    