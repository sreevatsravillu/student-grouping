const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/dashboard'));
app.use('/form-builder', require('./routes/formBuilder'));
app.use('/student-form', require('./routes/studentForm'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});