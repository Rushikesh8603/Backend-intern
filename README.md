Clone the Repository:

In the terminal, use the following command to clone the repository:

git clone https://github.com/Rushikesh8603/Backend-intern.git

Navigate to the Cloned Directory:

Once the repository is cloned, navigate into the folder:

	cd Backend-intern

change db.js in config according to your postgressql


	const { Pool } = require('pg');
	
	const pool = new Pool({
	    user: 'postgres',
	    host: 'localhost',
	    database: 'rushi',
	    password: '8603@Rushi',
	    port: 5432,
	});
	
	pool.connect()
	    .then(() => console.log('Connected to PostgreSQL'))
	    .catch((err) => console.error('Database connection error:', err));
	
	module.exports = pool;


<!-- install Dependencies (if not already done): If you haven't installed the dependencies yet (or if you're not sure), run the following command to install all required packages listed in the package.json file: -->

	npm install


<!-- Run the Server: Once all dependencies are installed, you can run the application. Assuming the main server file is server.js or app.js, you can run the app with one of these commands:

If you have nodemon installed (locally or globally): -->



	npx nodemon server.js



<!-- API Endpoints -->

<!-- 

This endpoint allows users to register by providing their name, email, password, role and lined_student_id -->


	/auth/signup
 

	ex - http://localhost:5000/auth/signup
		{
		  "name": "Rushi Patare",
		  "email": "student@slate.com",
		  "password": "11111",
		  "role": "Student",
		  "linked_student_id": "202"
		}



# this is for adding  student achievement


	/student/add


ex- http://localhost:5000/student/add
	{
	    "student_id": 202,
	    "name": "Rushi Patare",
	    "school_name": "ABC School",
	    "grade": "10th",
	    "achievements": "Science Olympiad Winner"
	}


for login 

	/auth/login

ex  -
    http://localhost:5000/auth/login

    {
    "email": "student@slate.com",
    "password": "11111",
    "role": "Student"
    }


#  now fetch students achievement  using api


<!--
 Using Postman for Token Validation:
Log in to get a new token (using your POST /auth/login route).
Copy the Bearer Token returned by the login response.
In Postman:
Set the request type to GET and the URL to http://localhost:5000/student/achievements/202.
Go to the Authorization tab.
Set Type to Bearer Token.
Paste the token you got from login in the Token field.
Send the request. -->

api end point 
	
	student/achievements/{student_id}
	
    
ex - http://localhost:5000/student/achievements/202







=======
# Backend-intern

