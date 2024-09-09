 
import express from "express";
const  app = express();

import userRoutes from "./routes/User.js";
import profileRoutes from "./routes/Profile.js";
import paymentRoutes from "./routes/Payments.js";
import courseRoutes from "./routes/Course.js";
import contactUsRoute from "./routes/Contact.js";
import dbconnect from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinaryConnect  from "./config/cloudinary.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
dbconnect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(
	//jo bhi request apko is origin se aari h means frontend se aari h apko usko entertain krna h
	{
		origin:"http://localhost:3000",
		credentials:true, 
	}
)); 

app.use(
	fileUpload({ 
		useTempFiles:true,                     //this middeare is for fileupload in local media;
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);


//def route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})