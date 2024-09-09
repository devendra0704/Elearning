import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbconnect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{

    })
    .then(console.log("db connection is successfull"))
    .catch((err)=>{console.log("there is issue in db connection")
        console.log(err)
        process.exit(1);

    })
        
    
}
export default dbconnect;