const hier1Headers = [
  "HIER1",
  "HIER1_DESC",
  "ACC_METHOD",
  "PURCHASE_TYPE",
  "CREATE_ID",
  "CREATE_DATETIME"
];
const hier2_headers = [
  "HIER1",
  "HIER2",
  "HIER2_DESC",
  "CREATE_ID",
  "CREATE_DATETIME"
];
const hier3_headers = [
  "HIER1",
  "HIER2",
  "HIER3",
  "HIER3_DESC",
  "CREATE_ID",
  "CREATE_DATETIME"
];
const item_dtl_headers = [
  "ITEM",
  "ITEM_PARENT",
  "ITEM_GRANDPARENT",
  "PACK_IND",
  "SIMPLE_PACK_IND",
  "PACK_TYPE",
  "ITEM_LEVEL",
  "TRAN_LEVEL",
  "ITEM_AGGREGATE_IND",
  "DIFF1",
  "DIFF2",
  "DIFF3",
  "DIFF4",
  "AGGR_DIFF_ID",
  "AGGR_DIFF_TYPE",
  "AGGR_DIFF_COLUMN",
  "HIER1",
  "HIER2",
  "HIER3",
  "STATUS",
  "ITEM_DESC",
  "SELLING_UOM",
  "STORE_ORD_MULT",
  "SELLABLE_IND",
  "ORDERABLE_IND",
  "ORIGINAL_COST",
  "ORIGINAL_RETAIL",
  "COST_ZONE_GROUP_ID",
  "RETAIL_ZONE_GROUP_ID",
  "ORDER_AS_TYPE",
  "CONTAINS_INNER_IND",
  "USER_ATTR_1",
  "USER_ATTR_VAL_1",
  "USER_ATTR_2",
  "USER_ATTR_VAL_2",
  "USER_ATTR_3",
  "USER_ATTR_VAL_3",
  "CREATE_ID",
  "CREATE_DATETIME",
  "LAST_UPDATE_ID",
  "UPDATE_DATETIME",
  "UOM_CONV_FACTOR"
];
export const header_list = {
  HIER1: hier1Headers,
  HIER2: hier2_headers,
  HIER3: hier3_headers,
  ITEM_DTL: item_dtl_headers
}
export function isHeadersEqual(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}
