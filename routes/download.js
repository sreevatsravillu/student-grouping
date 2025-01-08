const express = require('express');
const router = express.Router();
const { readJSONFile, writeJSONFile } = require('../utils/fileHandler');

router.get('/', (req, res) => {
  res.render('download');
});

router.post('/clear-all', async(req, res) => {
  try {
    // Clear students data
    await FileHandler.clearFile('forms.json',{});
    await FileHandler.clearFile('students.json',{});
    await FileHandler.clearFile('groupingAlgorithm.json',[]);
    await FileHandler.clearFile('skills.json',{});
    
    // selecedForm=''
    // await res.redirect('/');
    res.json(res.status = "ok")
  } catch (error) {
    console.error('Error clearing data:', error);
    res.redirect('/?error=clear-failed');
  }
});

module.exports = router;