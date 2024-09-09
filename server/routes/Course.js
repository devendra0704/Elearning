import express from "express"
const router = express.Router()

//Route for :- createCourse , Section(add, update, delete) , Subsection(add, update, delete), getAllCourses, getCoursesDetails;
//Route for :- createCategory , showAllCategories , getCategoryPageDetails
//Route for :-  createRating , getAverageRating , getReviews
//Route for :- updateCourseProgress


import { createCourse, getAllCourses, getCourseDetails, getFullCourseDetails, editCourse, getInstructorCourses, deleteCourse, } from "../controllers/Course.js"              // Course Controllers Import
import { showAllCategories, createCategory, categoryPageDetails, } from "../controllers/Category.js"     // Categories Controllers Import
import { createSection, updateSection, deleteSection, } from "../controllers/Section.js"               // Sections Controllers Import
import { createSubSection, updateSubSection, deleteSubSection, } from "../controllers/SubSection.js"    // Sub-Sections Controllers Import
import { createRating, getAverageRating, getAllRating, } from "../controllers/RatingAndReview.js"       // Rating Controllers Import
import { auth, isInstructor, isStudent, isAdmin } from "../middlewares/auth.js"                         // Importing Middlewares
import { updateCourseProgress } from "../controllers/CourseProgress.js";


// ********************************************************************************************************
//                                      Course routes (only by Instructors )                             *
// ********************************************************************************************************
router.post("/createCourse", auth, isInstructor, createCourse)                            // Courses can Only be Created by Instructors
router.post("/addSection", auth, isInstructor, createSection)                            //Add a Section to a Course
router.post("/updateSection", auth, isInstructor, updateSection)                         // Update a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)                         // Delete a Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)                   // Edit Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
router.post("/addSubSection", auth, isInstructor, createSubSection)
router.get("/getAllCourses", getAllCourses)                                               // Get all Registered Courses
router.post("/getCourseDetails", getCourseDetails)                                        // Get Details for a Specific Courses

router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.post("/editCourse", auth, isInstructor, editCourse)                       
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)           
router.delete("/deleteCourse", deleteCourse)                                            // Delete a Course
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);



// ********************************************************************************************************
//                                      Category routes (Only by Admin)                                   *
// ********************************************************************************************************
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)


// ********************************************************************************************************
//                                      Rating and Review (only by Student)                               *
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

export default router;


