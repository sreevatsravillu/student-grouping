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
// Import and use routes
const dashboardRoutes = require('./routes/dashboard');
const formBuilderRoutes = require('./routes/formBuilder');
const studentFormRoutes = require('./routes/studentForm');
app.use('/', dashboardRoutes)
app.use('/dashboard', dashboardRoutes);
app.use('/form-builder', formBuilderRoutes);
app.use('/student-form', studentFormRoutes);

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
