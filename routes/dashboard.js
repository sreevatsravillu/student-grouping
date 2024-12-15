const express = require('express');
const router = express.Router();
const { readJSONFile,FileHandler} = require('../utils/fileHandler');
const GroupingAlgorithm = require('../utils/groupingAlgorithm');


router.get('/', (req, res) => {
  const students = readJSONFile('students.json');
  const forms = readJSONFile('forms.json');
  const groupSize = forms[forms.length - 1] ? forms[forms.length - 1]['groupSize'] : 0
  console.log("dash.js, groupSize",forms[forms.length - 1],"====",groupSize)
  const form = forms[forms.length - 1]; // Get the latest form
  let skillsObj = readJSONFile('skills.json');
  const groups = GroupingAlgorithm.groupingPreparation(skillsObj,groupSize,students);
console.log("dash.js, groups",groups)
  res.render('dashboard', { groups });
});

router.post('/clear-all', async(req, res) => {
    try {
      // Clear students data
      await FileHandler.clearFile('forms.json',[]);
      await FileHandler.clearFile('students.json',[]);
      await FileHandler.clearFile('groupingAlgorithm.json',[]);
      await FileHandler.clearFile('skills.json',{});
      
      // Optionally, clear form data or move current form to history
    //   const formsData = readJSONFile('forms.json');
    //   if (formsData.currentForm.skills.length > 0) {
    //     formsData.history.push(formsData.currentForm);
    //     formsData.currentForm = { skills: [], groupSize: 3 };
    //     writeJSONFile('forms.json', formsData);
    //   }
      
      await res.redirect('/');
    } catch (error) {
      console.error('Error clearing data:', error);
      res.redirect('/?error=clear-failed');
    }
  });

module.exports = router;