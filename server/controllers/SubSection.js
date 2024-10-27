import SubSection from  "../models/SubSection.js";
import Section from "../models/Section.js";
import uploadImageToCloudinary from "../utils/imageUploader.js";


// Create a new sub-section for a given section
export const createSubSection = async (req, res) => {
    try {
      const { sectionId, title, description } = req.body
      const video = req.files.video

      // console.log("subsection....",req.body);
       
      if(!sectionId || !title || !description || !video){
        return res.status(404).json({ success: false, message: "All Fields are Required" })  
      }
      
      // console.log("testing1111.......");
      
      // Upload the video file to Cloudinary
      const uploadDetails = await uploadImageToCloudinary(video,  process.env.FOLDER_NAME )
      
      // console.log("testing22222.......",uploadDetails.secure_url);

      // Create a new sub-section with the necessary information in DB;
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
      })

      // console.log("testing.......",SubSectionDetails);
  
      // Update the corresponding section with the newly created sub-section
      const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId },  {$push: { subSection: SubSectionDetails._id }}, {new: true}).populate("subSection")

      return res.status(200).json({ success: true, data: updatedSection })
    }
     catch (error){                                                   
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
  

  export const updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if(!subSection){
        return res.status(404).json({success: false,  message: "SubSection not found", })
      }
  
      if(title !== undefined){
        subSection.title = title
      }
  
      if(description !== undefined){
        subSection.description = description
      }

      if(req.files && req.files.video !== undefined){
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary( video, process.env.FOLDER_NAME )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
      const updatedSection = await Section.findById(sectionId).populate("subSection")

      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    }
     catch(error){
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  

  export const deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate( { _id: sectionId },  {$pull: {subSection: subSectionId,},} )
      
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if(!subSection){
        return res.status(404).json({ success: false, message: "SubSection not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate("subSection")
  
      return res.json({
        success: true,
        data:updatedSection,
        message: "SubSection deleted successfully",
      })
    }
     catch(error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }