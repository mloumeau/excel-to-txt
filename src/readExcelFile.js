const XLSX = require('xlsx');
const { CONSTS } = require('./consts/consts');

const xlsxFilePath = process.argv[2];

if (!xlsxFilePath) {
    console.error('Please provide the path to the XLSX file as a command-line argument.');
    process.exit(1);
  }  

  const workbook = XLSX.readFile(xlsxFilePath);

const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const jsonData = XLSX.utils.sheet_to_json(worksheet);

function extractFields(jsonData) {
    const extractedData = {};
  
    jsonData.forEach((entry, index) => {
      if (entry.__EMPTY === CONSTS.NAME) {
        extractedData.Name = entry.__EMPTY_1;
        if (entry.__EMPTY_3 === CONSTS.PHONE) {
            extractedData.Phone = entry.__EMPTY_4;
          } 
        if (entry.__EMPTY_6 === CONSTS.EMAIL) {
            extractedData.Email = entry.__EMPTY_7;
        }
      } 
      else if (entry.__EMPTY === CONSTS.QUOTE) {
        extractedData.Quote = entry.__EMPTY_1;
      } 
      else if (entry.__EMPTY === CONSTS.SCOPE_OF_WORK) {
        extractedData.ScopeOfWork = jsonData[index+1][CONSTS.EMPTY];
      } 
      else if (entry.__EMPTY === CONSTS.ADDITIONAL_INFORMATION) {
        extractedData.AdditionalInformation = jsonData[index+1][CONSTS.EMPTY];
      }
      else if (entry.__EMPTY_3 === CONSTS.TOTALS) {
        extractedData.JobHours = entry.__EMPTY_5;
        extractedData.Amount = entry.__EMPTY_7;
      }
    });
  
    return extractedData;
  }
  
  const extractedData = extractFields(jsonData);

  module.exports = { extractedData };

