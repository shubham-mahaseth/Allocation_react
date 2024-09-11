
export const formattedExcelData= (data, headers) => {
  const excelData = [...data];
  excelData.shift();
  // console.log("excelData::", excelData, data);

  const mappedData = excelData.map((value, i) => {
    return headers.reduce((previousValue, currentValue, index) => {
      return {
        ...previousValue,
        [currentValue]: value[index] != "NULL" ? value[index] : "",
      };
    }, {});
  });
  return mappedData;
};

