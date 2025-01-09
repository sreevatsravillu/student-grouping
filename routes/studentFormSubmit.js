const express = require('express');
const router = express.Router();

// router.get('/*', (req, res) => {
//   const forms = readJSONFile('forms.json');
//   const form = forms[forms.length - 1]; // Get the latest form
//   res.render('studentForm', { form });
// });
router.get('/', (req, res) => { // Capture the value after /student-form/
  res.render('studentFormSubmit', {message:'Thank you. Your response has been submitted'} ); // Pass the value to the template if needed
});

module.exports = router;