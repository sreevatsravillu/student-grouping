const express = require('express');
const router = express.Router();
const { readJSONFile, writeJSONFile } = require('../utils/fileHandler');

router.get('/', (req, res) => {
  const forms = readJSONFile('forms.json');
  res.render('formBuilder', { forms });
});

router.post('/create', (req, res) => {
  console.log(req.body)
  const { formName, groupSize, skillName } = req.body;
  console.log( formName, skillName, groupSize )
  const forms = readJSONFile('forms.json');
  const newForm = {
    skills: skillName.map(name => ({ skillName: name, required: true })),
    groupSize: parseInt(groupSize, 10),
    genders:['Male','Female','Prefer not to say'],
    pursuingYr:["First Year","Second Year","Third Year","Fourth Year","Fifth Year"],
    majors:['MKTG','FIN','Explore', 'Entrepreneurship', 'Accounting','MIS','Supply Chain','Psychology','MGMT','FINTECH'],
   ethnicity:['African American or Black','Asian - East Asian (e.g., Chinese, Japanese, Korean)',
    'Asian - South Asian (e.g., Indian, Pakistani, Bangladeshi)','Asian - Southeast Asian (e.g., Vietnamese, Filipino, Thai)',
    'Hispanic or Latino/a/x','Middle Eastern or North African (MENA)',
    'Native American or Alaska Native',
    'Native Hawaiian or Other Pacific Islander',
  'White',
  'Multiracial'
   ],
   nuin:["N.U.in Czech Republic – University of New York in Prague",
   "N.U.in France – The American University of Paris",
   "N.U.in Germany – CIEE Berlin",
    "N.U.in Greece – American College of Thessaloniki",
    "N.U.in Ireland – University College Dublin",
    "N.U.in Italy – John Cabot University",
    "N.U.in Northern Ireland – Queens University Belfast",
    "N.U.in Portugal – CIEE Lisbon",
   "N.U.in Scotland – University of Glasgow",
    "N.U.in Spain – Saint Louis University Madrid"]
  };
  forms[formName] = newForm;
  writeJSONFile('forms.json', forms);
  res.redirect('/');
});

module.exports = router;
