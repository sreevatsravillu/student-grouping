const express = require('express');
const router = express.Router();
const { readJSONFile,FileHandler} = require('../utils/fileHandler');
const GroupingAlgorithm = require('../utils/groupingAlgorithm');
let selecedForm=''

router.get('/', (req, res) => {
  const students = readJSONFile('students.json');
  const forms = readJSONFile('forms.json');

  let groupSize  = 0
  let skillsObj = readJSONFile('skills.json');
  let fetchSkillObj={};
  let fetchStudentObj=[];
  console.log(selecedForm," ---------------- ",Object.keys(forms)[0])
  if(selecedForm){
    groupSize = forms[selecedForm]['groupSize'] 
    fetchSkillObj = skillsObj[selecedForm] 
    fetchStudentObj = students[selecedForm] 
  }
  else if(Object.keys(forms).length > 0){
    groupSize = forms[Object.keys(forms)[0]]['groupSize']
    fetchSkillObj = skillsObj[Object.keys(forms)[0]] || {}
    fetchStudentObj = students[Object.keys(forms)[0]] || []
  }
  console.log("dash.js, groupSize",fetchSkillObj,fetchStudentObj,"====",groupSize)
  
  const groups = GroupingAlgorithm.groupingPreparation(fetchSkillObj,groupSize,fetchStudentObj);
console.log("dash.js, groups",groups,"selecedForm ====",selecedForm)



  // Construct the base URL
  const baseUrl = `${req.protocol}://${req.get('host')}/student-form`;
  console.log("ONE--",{ groups, formKeys: Object.keys(forms), baseUrl, selectedForm:(selecedForm || Object.keys(forms)[0] ||'') })
  res.render('dashboard', { groups, formKeys: Object.keys(forms), baseUrl, selectedForm:(selecedForm || Object.keys(forms)[0] ||'') });
});
router.post('/fetchFormGrouing', async(req, res) => {
  try {
     console.log("dash.js -----, key", req.body);
     selecedForm = req.body.key
  } catch (error) {
     console.error('Error routing for grouping table data:', error);
     res.status(500).json({ error: 'Grouping failed' });
  }
});



router.post('/clear-all', async(req, res) => {
    try {
      // Clear students data
      await FileHandler.clearFile('forms.json',{});
      await FileHandler.clearFile('students.json',{});
      await FileHandler.clearFile('groupingAlgorithm.json',[]);
      await FileHandler.clearFile('skills.json',{});
      
      selecedForm=''
      // await res.redirect('/');
      res.json(res.status = "ok")
    } catch (error) {
      console.error('Error clearing data:', error);
      res.redirect('/?error=clear-failed');
    }
  });

module.exports = router;
