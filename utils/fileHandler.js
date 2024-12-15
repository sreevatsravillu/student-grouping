const fs = require('fs');
const path = require('path');

const readJSONFile = (filePath) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '..', 'data', filePath), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`);
    return [];
  }
};

const writeJSONFile = (filePath, data) => {
  try {
    fs.writeFileSync(path.join(__dirname, '..', 'data', filePath), JSON.stringify(data, null, 2));
  } catch (err) {
    const fs = require('fs');
    const path = require('path');
    console.error(`Error writing file to disk: ${err}`);
  }
};
class FileHandler {
  static getFilePath(fileName) {
    return path.join(__dirname, '..', 'data', fileName);
  }

  static readJSONFile(fileName) {
    try {
      const filePath = this.getFilePath(fileName);
      if (!fs.existsSync(filePath)) {
        return null;
      }
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${fileName}:`, error);
      // Return appropriate default values based on the file
      // if (fileName === 'forms.json') {
      //   return { currentForm: { skills: [], groupSize: 3 }, history: [] };
      // }
      return [];
    }
  }

  static writeJSONFile(fileName, data) {
    try {
      const filePath = this.getFilePath(fileName);
      // Ensure the data directory exists
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error(`Error writing ${fileName}:`, error);
      return false;
    }
  }

  static appendToJSONFile(fileName, newData) {
    try {
      const existingData = this.readJSONFile(fileName) || [];
      existingData.push(newData);
      return this.writeJSONFile(fileName, existingData);
    } catch (error) {
      console.error(`Error appending to ${fileName}:`, error);
      return false;
    }
  }

  static clearFile(fileName,data) {
    try {
      // const filePath = this.getFilePath(fileName);
      // if (fileName === 'forms.json') {
      //   return this.writeJSONFile(fileName, { currentForm: { skills: [], groupSize: 0 }, history: [] });
      // }
      return this.writeJSONFile(fileName, data);
    } catch (error) {
      console.error(`Error clearing ${fileName}:`, error);
      return false;
    }
  }
}

module.exports = FileHandler;

module.exports = { readJSONFile, writeJSONFile, FileHandler};