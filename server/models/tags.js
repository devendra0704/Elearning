import mongoose from "mongoose";
const tagsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{type:String,
},
course:{ type:mongoose.Schema.Types.ObjectId,
    ref:"User",}


})
const Tag=mongoose.model("Tag",tagsSchema);
export default Tag;