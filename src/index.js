const { processTemplate } = require('./readTxtFile');
const { writeToFile } = require('./writeToTxtOutput');
const { extractedData } = require('./readExcelFile');

processTemplate(extractedData, (err, updatedText) => {
    if (err) {
      console.error('Error processing the template:', err);
      return;
    }
  
    writeToFile(updatedText);
  });