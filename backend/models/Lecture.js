import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
    title : {
        type : String ,
        required : true ,
    },
    description : {
        type : String ,
        required : true ,
        unique : true
    },
    video : {
        type : String ,
        required : true ,
    },
    course : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Courses" ,
    },
    duration : {
        type : Number ,
        required : true ,
    },
    
    createdAt : {
        type : Date ,
        default : Date.now(),
    },
    

},

) ;

export const Lecture = mongoose.model("Lecture" ,schema)