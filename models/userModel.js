const pool = require('../config/db');


// Function to create the students table if not exists
const createStudentTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS students (
        student_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        school_name VARCHAR(255) NOT NULL,
        grade VARCHAR(50),
        achievements TEXT
    );
    `;
    await pool.query(query);
};


const createUserTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,             -- Unique ID for each user
        name VARCHAR(255) NOT NULL,         -- User's full name
        email VARCHAR(255) UNIQUE NOT NULL, -- User's email (must be unique)
        password VARCHAR(255) NOT NULL,     -- User's password
        role VARCHAR(50) NOT NULL CHECK (role IN ('School', 'Parent', 'Student')), -- User's role
        linked_student_id INT             -- Optional field: ID of the student linked to the user
    );
    `;
    
    try {
        await pool.query(query);
        console.log("Users table created successfully.");
    } catch (error) {
        console.error("Error creating users table:", error);
    }
};

module.exports = { createStudentTable, createUserTable  ,createStudentTable};
