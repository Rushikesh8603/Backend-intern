const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT authentication
const pool = require('../config/db'); // PostgreSQL connection
const { createUserTable } = require('../models/userModel'); // Import createUserTable from userModel
require('dotenv').config(); // Load environment variables

// Call createUserTable before processing requests
const initializeDatabase = async () => {
    try {
        await createUserTable(); // Ensure the 'users' table exists
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1); // Exit if table creation fails
    }
};

// 📝 User Signup
const signup = async (req, res) => {
    const { name, email, password, role, linked_student_id } = req.body;

    try {
        // Check if user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user into the database
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password, role, linked_student_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, hashedPassword, role, linked_student_id || null]
        );

        res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 📝 User Login
const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Check if user exists with given email & role
        const userQuery = 'SELECT * FROM users WHERE email = $1 AND role = $2';
        const userResult = await pool.query(userQuery, [email, role]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials or role' });
        }

        const user = userResult.rows[0];

        // Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '5h' }
        );
        console.log(token)

        res.json({ token, role: user.role });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Ensure the table is created at app start
initializeDatabase();

module.exports = { signup, login };

// module.exports: This exports the signup and login functions so that they
//  can be used in the route handling (authRoutes.js) for the /signup and /login endpoints.
