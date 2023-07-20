const fs = require('fs');
const { CONSTS } = require('./consts/consts');

function replaceVariables(template, variables) {
  let updatedText = template;

  for (const variableName in variables) {
    const regex = new RegExp(`{\\s*${variableName}\\s*}`, 'g');
    updatedText = updatedText.replace(regex, variables[variableName]);
  }

  return updatedText;
}

function processTemplate(variables, callback) {
  fs.readFile(CONSTS.TXT_TEMPLATE_PATH, 'utf8', (err, templateContent) => {
    if (err) {
      return callback(err);
    }

    const updatedText = replaceVariables(templateContent, variables);
    callback(null, updatedText);
  });
}

module.exports = { processTemplate };