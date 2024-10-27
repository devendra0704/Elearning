import mongoose from "mongoose";
const subsectionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    timeduration: {
        type: String,
    },
    description: {
        type: String,
        trim: true,
    },
    videoUrl: {
        type: String,
    }

})
const SubSection = mongoose.model("SubSection", subsectionSchema);
export default SubSection;