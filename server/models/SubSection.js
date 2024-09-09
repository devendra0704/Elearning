import mongoose from "mongoose";
const subsectionSchema=new mongoose.Schema({
    title:{
        type:String,
    },
   timeduration:{type:String,
},
description:{
    type:String,
    trim:true,
},
vidioUrl:{
    type:Number,
    
}

})
const SubSection=mongoose.model("SubSection",subsectionSchema);
export default SubSection;