const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/dashboard', (req, res) => {
    const groups = {
        GroupA: { students: ['Alice', 'Bob'], skills: ['JavaScript', 'React'] },
        GroupB: { students: ['Charlie'], skills: ['Python', 'Django'] },
    };
    res.render('dashboard', { groups });
});

app.get('/student-form', (req, res) => {
    const form = {
        genders: ['Male', 'Female', 'Other'],
        pursuingYr: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
        ethnicity: ['Asian', 'Black', 'Hispanic', 'White'],
        majors: ['Computer Science', 'Biology', 'Mathematics'],
        nuin: ['Program A', 'Program B'],
        skills: [{ skillName: 'Problem Solving' }, { skillName: 'Teamwork' }],
    };
    res.render('studentForm', { form });
});

// Default route
app.get('/*', (req, res) => {
  res.render('dashboard'); // Render `dashboard.ejs` as the default page
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404', { message: 'Page Not Found' }); // Ensure `404.ejs` exists
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
