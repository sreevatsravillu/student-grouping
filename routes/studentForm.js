const express = require('express');
const router = express.Router();
const { readJSONFile, writeJSONFile } = require('../utils/fileHandler');

router.get('/', (req, res) => {
  const forms = readJSONFile('forms.json');
  const form = forms[forms.length - 1]; // Get the latest form
  res.render('studentForm', { form });
});

router.post('/submit', (req, res) => {
  const students = readJSONFile('students.json');
  let skillsObj = readJSONFile('skills.json');
  console.log("===+++++++====",Object.entries(req.body))
  console.log(Object.entries(req.body)
  .filter(([key]) => key !== 'name' && key !== 'email' 
  && key !== 'major' && key !=='uid' && key !== 'ethnicity' && key !== 'gender'))
  const skills = Object.entries(req.body)
    .filter(([key]) => key !== 'name' && key !== 'email' 
    && key !== 'major' && key !=='uid' && key !== "ethnicity"
     && key !== 'gender' && key !=='nuin')
    .map(([skillName,value]) => ({
      skillName: `${skillName}-${value}`,
      value: value,  // This will now capture the numeric value from the request
      hasSkill: value && value !== '0'
    }));
    skills.push({
      "skillName": req.body.major,
      "hasSkill": true
    });
    skills.push({
      "skillName": req.body.nuin,
      "hasSkill": true
    });
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
        uid: [],    
        name: []      
      };
    }
    skillsObj[skill.skillName].count += 1;  
    skillsObj[skill.skillName].uid.push(req.body.uid);  
    skillsObj[skill.skillName].name.push(req.body.name);
  }
});
writeJSONFile('skills.json', skillsObj);

  writeJSONFile('students.json', students);
  res.redirect('/');
});

module.exports = router;