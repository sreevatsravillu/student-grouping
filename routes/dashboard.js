const express = require('express');
const router = express.Router();
const { readJSONFile,writeJSONFile, FileHandler} = require('../utils/fileHandler');
const GroupingAlgorithm = require('../utils/groupingAlgorithm');
let selecedForm=''

router.get('/', (req, res) => {
  const students = readJSONFile('students.json');
  const forms = readJSONFile('forms.json');

  let groupSize  = 0
  let skillsObj = readJSONFile('skills.json');
  let fetchSkillObj={};
  let fetchStudentObj=[];
  let formSkills = []
  console.log(selecedForm," ---------------- ",Object.keys(forms)[0])
  if(selecedForm){
    groupSize = forms[selecedForm]['groupSize'] 
    fetchSkillObj = skillsObj[selecedForm] 
    fetchStudentObj = students[selecedForm] 
    formSkills = forms[selecedForm]['skills']
  }
  else if(Object.keys(forms).length > 0){
    groupSize = forms[Object.keys(forms)[0]]['groupSize']
    fetchSkillObj = skillsObj[Object.keys(forms)[0]] || {}
    fetchStudentObj = students[Object.keys(forms)[0]] || []
    formSkills = forms[Object.keys(forms)[0]]['skills']
  }
  console.log("dash.js, groupSize",fetchSkillObj,fetchStudentObj,"====",groupSize)
  
  const groups = GroupingAlgorithm.groupingPreparation(fetchSkillObj,groupSize,fetchStudentObj);
  // const groups = GroupingAlgorithm.geneticAlgorithm(fetchStudentObj,groupSize)
console.log("dash.js, groups",groups,"selecedForm ====",selecedForm)
let formKeys =[]
for(let i=0 ;i< Object.keys(forms).length;i++){
  const formKeysObj={
    fileName:Object.keys(forms)[i],
    studentCount: students[Object.keys(forms)[i]] ? students[Object.keys(forms)[i]].length : 0,
    selectedFormSkills : forms[Object.keys(forms)[i]]['skills']
  }
  formKeys.push(formKeysObj)

}

  // Construct the base URL
  const baseUrl = `${req.protocol}://${req.get('host')}/student-form`;
  console.log("ONE--",{ groups:groups.finalGroup, tableTitle:groups.tableTitle,formKeys, baseUrl, selectedForm:(selecedForm || Object.keys(forms)[0] ||'')  })
  res.render('dashboard', { groups: groups.finalGroup, tableTitle:groups.tableTitle,formKeys, baseUrl, selectedForm:(selecedForm || Object.keys(forms)[0] ||'') });
});

router.post('/fetchFormGrouing', async(req, res) => {
  try {
    const forms = readJSONFile('forms.json');
     console.log("dash.js -----, key", req.body.fileName, req.body.manualGroupSize, req.body.selectedFormSkills);
     selecedForm =  req.body.fileName
     if(req.body.manualGroupSize){
      forms[req.body.fileName]['groupSize'] = JSON.parse(req.body.manualGroupSize);
      console.log("UPDATED SIZE ====",forms[req.body.fileName]['groupSize'])
      writeJSONFile('forms.json', forms);
     }else if(req.body.selectedFormSkills){
      forms[req.body.fileName]['skills'] = req.body.selectedFormSkills;
      console.log("UPDATED skills ====",forms[req.body.fileName]['skills'])
      writeJSONFile('forms.json', forms);
     }
   

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
