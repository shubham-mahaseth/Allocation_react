export const stageHeaders = [
"ITEM",
"LOC_TYPE", 
"LOC",
"TRN_DATE",
"TRN_TYPE",
"QTY",
"UNIT_COST",
"UNIT_RETAIL",
"REF_NO1",
"REF_NO2",
"REF_NO3",
"REF_NO4",
];

export const hier1Headers = [
"HIER1",
"HIER1_DESC",
"ACC_METHOD",
"PURCHASE_TYPE",
"CREATE_ID",
"CREATE_DATETIME"
]
export function isHeadersEqual(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}
