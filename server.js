const express = require('express');

// This line imports the express library,
//  which is a web framework for Node.js used to build APIs or web applications.
//  It simplifies handling routes, middleware, and HTTP requests/responses.

require('dotenv').config();
// This line loads environment variables from a .env file into process.env.
//  It allows you to securely store configuration data like database credentials,
//  API keys, or the server port.

const authRoutes = require('./routes/authRoutes');

// Imports the authRoutes module, which likely defines API routes related to authentication
//  (e.g., login, signup). The authRoutes file is located in the routes folder.

const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Creates an instance of an Express application.
//  This object (app) is used to define routes, middleware, and settings for the server.

app.use(express.json());

// Adds middleware to the application. This specific middleware parses incoming JSON requests 
// and makes the data available in req.body. Without this, req.body would be undefined.



// Mounts the authRoutes middleware at the /auth path. Any routes defined in authRoutes will now be accessible under /auth.
// For example:
//A route POST /login in authRoutes would be available at POST /auth/login.

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body); // If you're using a body-parser middleware
    console.log('Query:', req.query);
    console.log('Params:', req.params);
    next(); // Pass control to the next middleware/route
});

app.use('/auth', authRoutes);

app.use('/student', studentRoutes);

const PORT = process.env.PORT || 5000;
// his sets the port number for the server to listen on. 
// It tries to use the PORT value from environment variables (process.env.PORT),
//  but defaults to 5000 if no value is provided.

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Starts the server and makes it listen for incoming requests on the specified PORT.
//  The callback function logs a message to confirm the server is running.




// Request Flow: When an API request is made, for example to POST /auth/login, here's the flow:

// The request first hits the express.json() middleware, which parses the body if it's JSON.
// Then, it passes through the authRoutes middleware, as the /auth route is defined using app.use('/auth', authRoutes).
// If the request matches a route in authRoutes, that route handler (like authRoutes.post('/login')) is executed.
// Before and after any of these, the request will pass through the logging middleware you defined, where the request data is logged.


// How the Request is Handled:

// If, for example, you send a POST request to /auth/login, the request will be processed by the relevant route handler inside authRoutes.
// The req.body, which is the parsed request body (e.g., login credentials), will be available inside that route handler.


