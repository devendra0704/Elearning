import express from "express"
const router = express.Router()


import { createCourse, getAllCourses, getCourseDetails, getFullCourseDetails, editCourse, getInstructorCourses, deleteCourse, } from "../controllers/Course.js"
import { showAllCategories, createCategory, categoryPageDetails, } from "../controllers/Category.js" 
import { createSection, updateSection, deleteSection, } from "../controllers/Section.js"
import { createSubSection, updateSubSection, deleteSubSection, } from "../controllers/SubSection.js"
import { createRating, getAverageRating, getAllRating, } from "../controllers/RatingAndReview.js"
import { auth, isInstructor, isStudent, isAdmin } from "../middlewares/auth.js"
import { updateCourseProgress } from "../controllers/CourseProgress.js";

//                                      Course routes (only by Instructors )                             

router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/addSection", auth, isInstructor, createSection)           
router.post("/updateSection", auth, isInstructor, updateSection)                   
router.post("/deleteSection", auth, isInstructor, deleteSection)                     
router.post("/updateSubSection", auth, isInstructor, updateSubSection)                
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
router.post("/addSubSection", auth, isInstructor, createSubSection)
router.get("/getAllCourses", getAllCourses)   // Get all Registered Courses
router.post("/getCourseDetails", getCourseDetails)

router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.post("/editCourse", auth, isInstructor, editCourse)                       
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)           
router.delete("/deleteCourse", deleteCourse)                           
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);


//                                      Category routes (Only by Admin)                                   

router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)


//                                      Rating and Review (only by Student)                               
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

export default router;


