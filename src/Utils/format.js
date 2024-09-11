import { stageHeaders } from "../Constants/headers";
import { exceltoJsdate } from "./exceltojsdate";

export const formattedExcelData = (data,headers) => {  
const updateDate = (array, index, newValue) => {
  array[index] = newValue;
}
  const excelData = [...data];
  excelData.shift();
  console.log("excelData::",excelData);
  
  const mappedData = excelData.map((value, i) => {
    console.log("value, i", value, i,value[i])
    updateDate(value, 3, exceltoJsdate(value[3]));
    
    return headers.reduce((previousValue, currentValue, index) => {
      return {
        ...previousValue,
        [currentValue]: value[index] != "NULL" ? value[index] : "",
      };
    }, {});
  });
  return mappedData;
};
