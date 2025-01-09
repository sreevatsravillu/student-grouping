const express = require('express');
const router = express.Router();
const { readJSONFile, writeJSONFile } = require('../utils/fileHandler');

// router.get('/*', (req, res) => {
//   const forms = readJSONFile('forms.json');
//   const form = forms[forms.length - 1]; // Get the latest form
//   res.render('studentForm', { form });
// });
router.get('/:value', (req, res) => { // Capture the value after /student-form/
  const forms = readJSONFile('forms.json');
  const value = req.params.value; // Access the captured value
  console.log("student form",value, forms[value])
  res.render('studentForm', {form:forms[value]} ); // Pass the value to the template if needed
});

router.post('/submit', (req, res) => {
  const studentsDetails = readJSONFile('students.json');
  const students = studentsDetails[req.body.pageUri] || [];
  const skillsDetails = readJSONFile('skills.json');
  let skillsObj = skillsDetails[req.body.pageUri] || {};

  console.log("===+++++++====",Object.entries(req.body),req.body)
  console.log("URL of the page that hit the POST call:", req.originalUrl);

  console.log(Object.entries(req.body)
  .filter(([key]) => key !== 'name' && key !== 'email' && key !== 'pageUri'
  && key !== 'major' && key !=='uid' && key !== 'ethnicity' && key !== 'gender'))
  const skills = Object.entries(req.body)
    .filter(([key]) => key !== 'name' && key !== 'email' && key !== 'email' && key !== 'pageUri'
    && key !== 'major' && key !=='uid' && key !== "ethnicity"
     && key !== 'gender' && key !=='nuin')
    .map(([skillName,value]) => ({
      skillName: `${skillName}-${value}`,
      value: value,  // This will now capture the numeric value from the request
      hasSkill: value || value === '0'
    }));
    skills.push({
      "skillName": req.body.major,
      "hasSkill": true
    });
    if(req.body.nuin){
      skills.push({
        "skillName": req.body.nuin,
        "hasSkill": true,
        "priority":1
      });
    }
    skills.push({
      "skillName": req.body.ethnicity,
      "hasSkill": true
    });

  students.push({
    name: req.body.name,
    uid:req.body.uid,
    email: req.body.email,
    gender: req.body.gender,
    pursuingYr:req.body.pursuingYr,
    // majors:req.body.major,
    skillArr:skills.filter(skill => skill.hasSkill)
    .map(skill => skill.skillName),
    skills
  });


skills.forEach(skill => {
  if (skill.hasSkill) {
    if (!skillsObj[skill.skillName]) {
      skillsObj[skill.skillName] = {
        count: 0, 
        priority:0,   
        uid: [],    
        name: []      
      };
    }
    skillsObj[skill.skillName].count += 1; 
    if(skill.priority){
      skillsObj[skill.skillName].priority = 1;
    }   
    skillsObj[skill.skillName].uid.push(req.body.uid);  
    skillsObj[skill.skillName].name.push(req.body.name);
  }
});
skillsDetails[req.body.pageUri] = skillsObj;
writeJSONFile('skills.json', skillsDetails);

writeJSONFile('students.json', {})
console.log("studentsDetails",students, studentsDetails)
studentsDetails[req.body.pageUri] = students;
writeJSONFile('students.json', studentsDetails);
  // res.redirect('/');
  res.redirect('/student-form-submit');
  


});


module.exports = router;