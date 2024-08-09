// controllers/course.js

import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";

export const getAllCourses = TryCatch(async (req, res) => {
    const courses = await Courses.find();
    res.json({ courses });
});

export const getSingleCourse = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id);
    res.json({ course });
});

export const fetchLectures = TryCatch(async (req, res) => {
    const lectures = await Lecture.find({ course: req.params.id });
    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
        return res.json({ lectures });
    }
    if (!user.subscription || !user.subscription.includes(req.params.id)) {
        return res.status(400).json({ message: 'You are not subscribed to this course.' });
    }

    res.json({ lectures });
});

export const fetchLecture = TryCatch(async (req, res) => {
    const lecture = await Lecture.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
        return res.json({ lecture });
    }
    if (!user.subscription || !user.subscription.includes(req.params.id)) {
        return res.status(400).json({ message: 'You are not subscribed to this course.' });
    }

    res.json({ lecture });
});

export const getMyCourses = TryCatch(async (req, res) => {
    const courses = await Courses.find({ _id: req.user.subscription });
    res.json({ courses });
});

export const checkout = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    const course = await Courses.findById(req.params.id);

    // Check if user is already subscribed to the course
    if (user.subscription.includes(course._id)) {
        return res.status(400).json({ message: "You already have taken this Course." });
    }

    // If not subscribed, enroll the user in the course
    user.subscription.push(course._id);
    await user.save();

    res.json({ message: "Enrolled successfully!", course });
});
