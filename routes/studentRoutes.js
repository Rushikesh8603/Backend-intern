const express = require('express');
const { addStudent, getStudentAchievements } = require('../controllers/studentController');  // Ensure correct import

const router = express.Router();

// Route for adding a student
router.post('/add', addStudent);

// Route for getting student achievements (authenticated)
router.get('/achievements/:student_id', getStudentAchievements);

module.exports = router;
