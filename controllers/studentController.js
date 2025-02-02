const pool = require('../config/db');

const jwt = require('jsonwebtoken');


const { createStudentTable } = require('../models/userModel');

// Ensure database is initialized before inserting data
const initializeDatabase = async () => {
    try {
        await createStudentTable();
        console.log("✅ Student table initialized");
    } catch (err) {
        console.error("❌ Error initializing database:", err);
    }
};

// Function to add a student
const addStudent = async (req, res) => {
    await initializeDatabase();  // Ensure the table exists

    const { student_id, name, school_name, grade, achievements } = req.body;

    if (!student_id || !name || !school_name) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const query = `
            INSERT INTO students (student_id, name, school_name, grade, achievements)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [student_id, name, school_name, grade || null, achievements || null];
        const result = await pool.query(query, values);

        res.status(201).json({ message: "Student added successfully", student: result.rows[0] });
    } catch (err) {
        console.error("❌ Error adding student:", err);
        res.status(500).json({ message: "Server error" });
    }
};


const getStudentAchievements = async (req, res) => {
  try {
    const { student_id } = req.params;
    console.log('HELLOOOOOOOO')
    // Extract the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('rushi',token)
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Decode the token and extract the user role and student_id from the token payload
    const decoded = jwt.decode(token);
    if (decoded) {
      console.log('Decoded JWT:', decoded);
      
      // Extract the 'role' from the decoded payload
      const role = decoded.role;
      console.log('Role:', role);
    } else {
        console.log('Failed to decode the token.');
    }
    const role = decoded.role;
    
    if (decoded.role === 'School') {
      // If the role is School, return all student data
      const result = await pool.query('SELECT * FROM students');
      return res.status(200).json(result.rows); // Send all student data
    } 

    if (role === 'Parent' || role === 'Student') {

      // Query to get student achievements by student_id
      const result = await pool.query('SELECT * FROM students WHERE student_id = $1', [student_id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }

      return res.status(200).json(result.rows[0]); // Return the student's specific data
    }

    // If the role is neither 'School', 'Parent', nor 'Student', return an error
    return res.status(403).json({ message: 'Forbidden: Invalid role' });
    
  } catch (err) {
    console.error('Error fetching student achievements:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = { addStudent, getStudentAchievements };

