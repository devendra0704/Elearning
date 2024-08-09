import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { isAdmin } from '../middleware/isAuth.js';
import { addLectures, createCourse, deleteCourse, deleteLecture, getAllStats } from '../controllers/admin.js';
import { uploadFiles } from '../middleware/multer.js';


const router = express.Router();

router.post('/create-course',isAuth,isAdmin,uploadFiles,createCourse)
router.post('/course/:id',isAuth,isAdmin,uploadFiles,addLectures)
router.delete('/delete-lecture/:id', isAuth,isAdmin,deleteLecture)
router.delete('/delete-course/:id', isAuth,isAdmin,deleteCourse)
router.get('/stats/', isAuth,isAdmin,getAllStats)
export default router;
