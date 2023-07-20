const fs = require('fs');

function writeToFile (updatedText) {
    const fileName = 'autoPopulatedText.txt';
    fs.writeFile(fileName, updatedText, (err) => {
        if (err) {
        console.error('Error writing the updated content to the file:', err);
        return;
        }

        console.log(`Template successfully updated and written to ${fileName}`);
    });
  };

  module.exports = { writeToFile };