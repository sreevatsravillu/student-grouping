const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const dashboardRoutes = require('./routes/dashboard');
app.use('/dashboard', dashboardRoutes);

// Default route
app.get('/', (req, res) => {
  res.render('index'); // Render index.ejs from the views directory
});

// Catch-all route for 404
app.use((req, res) => {
  res.status(404).render('404'); // Ensure you have a 404.ejs template
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
