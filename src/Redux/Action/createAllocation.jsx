import { createAction } from "redux-actions";
import * as actions from "../constant";


export const getWarehouseRequest = createAction(
  actions.GET_WAREHOUSE_REQUEST
);
export const getWarehouseSuccess = createAction(
  actions.GET_WAREHOUSE_SUCCESS
);
export const getWarehouseError = createAction(
  actions.GET_WAREHOUSE_ERROR
);
export const getSUPPLIERRequest = createAction(
  actions.GET_SUPPLIER_REQUEST
);
export const getSUPPLIERSuccess = createAction(
  actions.GET_SUPPLIER_SUCCESS
);
export const getSUPPLIERError = createAction(
  actions.GET_SUPPLIER_ERROR
);
export const getSUPPLIERSITERequest = createAction(
  actions.GET_SUPPLIERSITE_REQUEST
);
export const getSUPPLIERSITESuccess = createAction(
  actions.GET_SUPPLIERSITE_SUCCESS
);
export const getSUPPLIERSITEError = createAction(
  actions.GET_SUPPLIERSITE_ERROR
);
export const getPACKNORequest = createAction(
  actions.GET_PACKNO_REQUEST
);
export const getPACKNOSuccess = createAction(
  actions.GET_PACKNO_SUCCESS
);
export const getPACKNOError = createAction(
  actions.GET_PACKNO_ERROR
);
export const getDIFFRequest = createAction(
  actions.GET_DIFF_REQUEST
);
export const getDIFFSuccess = createAction(
  actions.GET_DIFF_SUCCESS
);
export const getDIFFError = createAction(
  actions.GET_DIFF_ERROR
);
export const getSKURequest = createAction(
  actions.GET_SKU_REQUEST
);
export const getSKUSuccess = createAction(
  actions.GET_SKU_SUCCESS
);
export const getSKUError = createAction(
  actions.GET_SKU_ERROR
);
export const getITEM_LIST_HEADRequest = createAction(
  actions.GET_ITEM_LIST_HEAD_REQUEST
);
export const getITEM_LIST_HEADSuccess = createAction(
  actions.GET_ITEM_LIST_HEAD_SUCCESS
);
export const getITEM_LIST_HEADError = createAction(
  actions.GET_ITEM_LIST_HEAD_ERROR
);
export const getVPNRequest = createAction(
  actions.GET_VPN_REQUEST
);
export const getVPNSuccess = createAction(
  actions.GET_VPN_SUCCESS
);
export const getVPNError = createAction(
  actions.GET_VPN_ERROR
);
export const getUDARequest = createAction(
  actions.GET_UDA_REQUEST
);
export const getUDASuccess = createAction(
  actions.GET_UDA_SUCCESS
);
export const getUDAError = createAction(
  actions.GET_UDA_ERROR
);
export const getPORequest = createAction(
  actions.GET_PO_REQUEST
);
export const getPOSuccess = createAction(
  actions.GET_PO_SUCCESS
);
export const getPOError = createAction(
  actions.GET_PO_ERROR
);
export const getPO_TYPERequest = createAction(
  actions.GET_PO_TYPE_REQUEST
);
export const getPO_TYPESuccess = createAction(
  actions.GET_PO_TYPE_SUCCESS
);
export const getPO_TYPEError = createAction(
  actions.GET_PO_TYPE_ERROR
);
export const getHIERRequest = createAction(
  actions.GET_HIER_REQUEST
);
export const getHIERSuccess = createAction(
  actions.GET_HIER_SUCCESS
);
export const getHIERError = createAction(
  actions.GET_HIER_ERROR
);
export const getEXCLUDEUDARequest = createAction(
  actions.GET_EXCLUDEUDA_REQUEST
);
export const getEXCLUDEUDASuccess = createAction(
  actions.GET_EXCLUDEUDA_SUCCESS
);
export const getEXCLUDEUDAError = createAction(
  actions.GET_EXCLUDEUDA_ERROR
);
export const getITEMPARENTRequest = createAction(
  actions.GET_ITEMPARENT_REQUEST
);
export const getITEMPARENTSuccess = createAction(
  actions.GET_ITEMPARENT_SUCCESS
);
export const getITEMPARENTError = createAction(
  actions.GET_ITEMPARENT_ERROR
);
export const getHIER2Request = createAction(
  actions.GET_HIER2_REQUEST
);
export const getHIER2Success = createAction(
  actions.GET_HIER2_SUCCESS
);
export const getHIER2Error = createAction(
  actions.GET_HIER2_ERROR
);
export const getHIER3Request = createAction(
  actions.GET_HIER3_REQUEST
);
export const getHIER3Success = createAction(
  actions.GET_HIER3_SUCCESS
);
export const getHIER3Error = createAction(
  actions.GET_HIER3_ERROR
);
export const getASNRequest = createAction(
  actions.GET_ASN_REQUEST
);
export const getASNSuccess = createAction(
  actions.GET_ASN_SUCCESS
);
export const getASNError = createAction(
  actions.GET_ASN_ERROR
);
export const getTSFRequest = createAction(
  actions.GET_TSF_REQUEST
);
export const getTSFSuccess = createAction(
  actions.GET_TSF_SUCCESS
);
export const getTSFError = createAction(
  actions.GET_TSF_ERROR
);

export const getALLOC_LEVELRequest = createAction(
  actions.GET_ALLOC_LEVEL_REQUEST
);
export const getALLOC_LEVELSuccess = createAction(
  actions.GET_ALLOC_LEVEL_SUCCESS
);
export const getALLOC_LEVELError = createAction(
  actions.GET_ALLOC_LEVEL_ERROR
);
export const getALLOC_TYPERequest = createAction(
  actions.GET_ALLOC_TYPE_REQUEST
);
export const getALLOC_TYPESuccess = createAction(
  actions.GET_ALLOC_TYPE_SUCCESS
);
export const getALLOC_TYPEError = createAction(
  actions.GET_ALLOC_TYPE_ERROR
);
export const getCONTEXT_TYPERequest = createAction(
  actions.GET_CONTEXT_TYPE_REQUEST
);
export const getCONTEXT_TYPESuccess = createAction(
  actions.GET_CONTEXT_TYPE_SUCCESS
);
export const getCONTEXT_TYPEError = createAction(
  actions.GET_CONTEXT_TYPE_ERROR
);
export const getSTATUSRequest = createAction(
  actions.GET_STATUS_REQUEST
);
export const getSTATUSSuccess = createAction(
  actions.GET_STATUS_SUCCESS
);
export const getSTATUSError = createAction(
  actions.GET_STATUS_ERROR
);
export const getPROMOTIONRequest = createAction(
  actions.GET_PROMOTION_REQUEST
);
export const getPROMOTIONSuccess = createAction(
  actions.GET_PROMOTION_SUCCESS
);
export const getPROMOTIONError = createAction(
  actions.GET_PROMOTION_ERROR
);
export const postALLOCRESULTRequest = createAction(
  actions.POST_ALLOCRESULT_REQUEST
);
export const postALLOCRESULTSuccess = createAction(
  actions.POST_ALLOCRESULT_SUCCESS
);
export const postALLOCRESULTError = createAction(
  actions.POST_ALLOCRESULT_ERROR
);
export const getALLOC_CRITERIARequest = createAction(
  actions.GET_ALLOC_CRITERIA_REQUEST
);
export const getALLOC_CRITERIASuccess = createAction(
  actions.GET_ALLOC_CRITERIA_SUCCESS
);
export const getALLOC_CRITERIAError = createAction(
  actions.GET_ALLOC_CRITERIA_ERROR
);
export const postALLOCINSERTRequest = createAction(
  actions.POST_ALLOCINSERT_REQUEST
);
export const postALLOCINSERTSuccess = createAction(
  actions.POST_ALLOCINSERT_SUCCESS
);
export const postALLOCINSERTError = createAction(
  actions.POST_ALLOCINSERT_ERROR
);
export const postALLOCRESULTCWHRequest = createAction(
  actions.POST_ALLOCRESULTCWH_REQUEST
);
export const postALLOCRESULTCWHSuccess = createAction(
  actions.POST_ALLOCRESULTCWH_SUCCESS
);
export const postALLOCRESULTCWHError = createAction(
  actions.POST_ALLOCRESULTCWH_ERROR
)
export const postALLOCRESULTCASNRequest = createAction(
  actions.POST_ALLOCRESULTCASN_REQUEST
);
export const postALLOCRESULTCASNSuccess = createAction(
  actions.POST_ALLOCRESULTCASN_SUCCESS
);
export const postALLOCRESULTCASNError = createAction(
  actions.POST_ALLOCRESULTCASN_ERROR
)
export const postALLOCRESULTCTSFRequest = createAction(
  actions.POST_ALLOCRESULTCTSF_REQUEST
);
export const postALLOCRESULTCTSFSuccess = createAction(
  actions.POST_ALLOCRESULTCTSF_SUCCESS
);
export const postALLOCRESULTCTSFError = createAction(
  actions.POST_ALLOCRESULTCTSF_ERROR
)
export const getALLOCNORequest = createAction(
  actions.GET_ALLOCNO_REQUEST
);
export const getALLOCNOSuccess = createAction(
  actions.GET_ALLOCNO_SUCCESS
);
export const getALLOCNOError = createAction(
  actions.GET_ALLOCNO_ERROR
);
export const getALLOC_AVAIL_SEARCHRequest = createAction(
  actions.GET_ALLOC_AVAIL_SEARCH_REQUEST
);
export const getALLOC_AVAIL_SEARCHSuccess = createAction(
  actions.GET_ALLOC_AVAIL_SEARCH_SUCCESS
);
export const getALLOC_AVAIL_SEARCHError = createAction(
  actions.GET_ALLOC_AVAIL_SEARCH_ERROR
);

export const getALLOC_AVAIL_QTYRequest = createAction(
  actions.GET_ALLOC_AVAIL_QTY_REQUEST
);
export const getALLOC_AVAIL_QTYSuccess = createAction(
  actions.GET_ALLOC_AVAIL_QTY_SUCCESS
);
export const getALLOC_AVAIL_QTYError = createAction(
  actions.GET_ALLOC_AVAIL_QTY_ERROR
);
export const getUPDATESELINDCREATERequest = createAction(
  actions.GET_UPDATESELINDCREATE_REQUEST
);
export const getUPDATESELINDCREATESuccess = createAction(
  actions.GET_UPDATESELINDCREATE_SUCCESS
);
export const getUPDATESELINDCREATEError = createAction(
  actions.GET_UPDATESELINDCREATE_ERROR
);
export const getDELETECREATEGRIDRequest = createAction(
  actions.GET_DELETECREATEGRID_REQUEST
);
export const getDELETECREATEGRIDSuccess = createAction(
  actions.GET_DELETECREATEGRID_SUCCESS
);
export const getDELETECREATEGRIDError = createAction(
  actions.GET_DELETECREATEGRID_ERROR
); 
export const getSWITCHTABFUNCRequest = createAction(
  actions.GET_SWITCHTABFUNC_REQUEST
);
export const getSWITCHTABFUNCSuccess = createAction(
  actions.GET_SWITCHTABFUNC_SUCCESS
);
export const getSWITCHTABFUNCError = createAction(
  actions.GET_SWITCHTABFUNC_ERROR
);
export const getCREATEREFRESHGRIDRequest = createAction(
  actions.GET_CREATEREFRESHGRID_REQUEST
);
export const getCREATEREFRESHGRIDSuccess = createAction(
  actions.GET_CREATEREFRESHGRID_SUCCESS
);
export const getCREATEREFRESHGRIDError = createAction(
  actions.GET_CREATEREFRESHGRID_ERROR
);
export const getSPLITCREATEFUNCTIONRequest = createAction(
  actions.GET_SPLITCREATEFUNCTION_REQUEST
);
export const getSPLITCREATEFUNCTIONSuccess = createAction(
  actions.GET_SPLITCREATEFUNCTION_SUCCESS
);
export const getSPLITCREATEFUNCTIONError = createAction(
  actions.GET_SPLITCREATEFUNCTION_ERROR
);

export const postCALCRequest = createAction(
  actions.POST_CALC_REQUEST
);
export const postCALCSuccess = createAction(
  actions.POST_CALC_SUCCESS
);
export const postCALCError = createAction(
  actions.POST_CALC_ERROR
);

export const postALLOCDTLTABRequest = createAction(
  actions.POST_ALLOCDTLTAB_REQUEST
);
export const postALLOCDTLTABSuccess = createAction(
  actions.POST_ALLOCDTLTAB_SUCCESS
);
export const postALLOCDTLTABError = createAction(
  actions.POST_ALLOCDTLTAB_ERROR
);

export const postALLOCDTLRTVRequest = createAction(
  actions.POST_ALLOCDTLRTV_REQUEST
);
export const postALLOCDTLRTVSuccess = createAction(
  actions.POST_ALLOCDTLRTV_SUCCESS
);
export const postALLOCDTLRTVError = createAction(
  actions.POST_ALLOCDTLRTV_ERROR
);
//ERROR REPORT
export const postErrReportRequest = createAction(
  actions.POST_ERRREPORT_REQUEST
);
export const postErrReportSuccess = createAction(
  actions.POST_ERRREPORT_SUCCESS
);
export const postErrReportError = createAction(
  actions.POST_ERRREPORT_ERROR
);

//APPROVEFUNCTION
export const postAPPROVEFUNCTIONRequest = createAction(
  actions.POST_APPROVEFUNCTION_REQUEST
);
export const postAPPROVEFUNCTIONSuccess = createAction(
  actions.POST_APPROVEFUNCTION_SUCCESS
);
export const postAPPROVEFUNCTIONError = createAction(
  actions.POST_APPROVEFUNCTION_ERROR
);
export const postAPPROVEVALIDFUNCTIONRequest = createAction(
  actions.POST_APPROVEVALIDFUNCTION_REQUEST
);
export const postAPPROVEVALIDFUNCTIONSuccess = createAction(
  actions.POST_APPROVEVALIDFUNCTION_SUCCESS
);
export const postAPPROVEVALIDFUNCTIONError = createAction(
  actions.POST_APPROVEVALIDFUNCTION_ERROR
);

export const postCREATEGRIDDFRequest = createAction(
  actions.POST_CREATEGRIDDF_REQUEST
);
export const postCREATEGRIDDFSuccess = createAction(
  actions.POST_CREATEGRIDDF_SUCCESS
);
export const postCREATEGRIDDFError = createAction(
  actions.POST_CREATEGRIDDF_ERROR
);

//RESERVEFUNCTION
export const postRESERVEFUNCTIONRequest = createAction(
  actions.POST_RESERVEFUNCTION_REQUEST
);
export const postRESERVEFUNCTIONSuccess = createAction(
  actions.POST_RESERVEFUNCTION_SUCCESS
);
export const postRESERVEFUNCTIONError = createAction(
  actions.POST_RESERVEFUNCTION_ERROR
);
//WORKSHEETFUNCTION
export const postWORKSHEETFUNCTIONRequest = createAction(
  actions.POST_WORKSHEETFUNCTION_REQUEST
);
export const postWORKSHEETFUNCTIONSuccess = createAction(
  actions.POST_WORKSHEETFUNCTION_SUCCESS
);
export const postWORKSHEETFUNCTIONError = createAction(
  actions.POST_WORKSHEETFUNCTION_ERROR
);

/* ALLOC DETAILS*/
export const postSpreadAllocRequest = createAction(
  actions.POST_SPREADALLOC_REQUEST
);
export const postSpreadAllocSuccess = createAction(
  actions.POST_SPREADALLOC_SUCCESS
);
export const postSpreadAllocError = createAction(
  actions.POST_SPREADALLOC_ERROR
);

export const postSizeProfRequest = createAction(
  actions.POST_SIZEPROF_REQUEST
);
export const postSizeProfSuccess = createAction(
  actions.POST_SIZEPROF_SUCCESS
);
export const postSizeProfError = createAction(
  actions.POST_SIZEPROF_ERROR
);

export const postAllocQtyRequest = createAction(
  actions.POST_ALLOCQTY_REQUEST
);
export const postAllocQtySuccess = createAction(
  actions.POST_ALLOCQTY_SUCCESS
);
export const postAllocQtyError = createAction(
  actions.POST_ALLOCQTY_ERROR
);

export const postCOPYADRequest = createAction(
  actions.POST_COPYAD_REQUEST
);
export const postCOPYADSuccess = createAction(
  actions.POST_COPYAD_SUCCESS
);
export const postCOPYADError = createAction(
  actions.POST_COPYAD_ERROR
);

export const postFETCHNNRequest = createAction(
  actions.POST_FETCHNN_REQUEST
);
export const postFETCHNNSuccess = createAction(
  actions.POST_FETCHNN_SUCCESS
);
export const postFETCHNNError = createAction(
  actions.POST_FETCHNN_ERROR
);

/*SCHDEULE SCREEN */
export const postSchdlsvRequest = createAction(
  actions.POST_SCHDLSV_REQUEST
);
export const postSchdlsvSuccess = createAction(
  actions.POST_SCHDLSV_SUCCESS
);
export const postSchdlsvError = createAction(
  actions.POST_SCHDLSV_ERROR
);

export const postSchdlrtvRequest = createAction(
  actions.POST_SCHDLRTV_REQUEST
);
export const postSchdlrtvSuccess = createAction(
  actions.POST_SCHDLRTV_SUCCESS
);
export const postSchdlrtvError = createAction(
  actions.POST_SCHDLRTV_ERROR
);
/* COMMIT DATA */
export const postCOMMITDATARequest = createAction(
  actions.POST_COMMITDATA_REQUEST
);
export const postCOMMITDATASuccess = createAction(
  actions.POST_COMMITDATA_SUCCESS
);
export const postCOMMITDATAError = createAction(
  actions.POST_COMMITDATA_ERROR
);

/* Multi PO Create Screen*/
export const postMULTIPOCREATERequest = createAction(
  actions.POST_MULTIPOCREATE_REQUEST
);
export const postMULTIPOCREATESuccess = createAction(
  actions.POST_MULTIPOCREATE_SUCCESS
);
export const postMULTIPOCREATEError = createAction(
  actions.POST_MULTIPOCREATE_ERROR
);
/* RL Validation in Create Screen*/
export const postVALIDRLCHECKDATARequest = createAction(
  actions.POST_VALIDRLCHECKDATA_REQUEST
);
export const postVALIDRLCHECKDATASuccess = createAction(
  actions.POST_VALIDRLCHECKDATA_SUCCESS
);
export const postVALIDRLCHECKDATAError = createAction(
  actions.POST_VALIDRLCHECKDATA_ERROR
);


  /*COMMIT/CLOSE ALLOC DETAILS & SIZE DETAILS */

  export const postADSaveRequest = createAction(
    actions.POST_ADSAVE_REQUEST
  );
  export const postADSaveSuccess = createAction(
    actions.POST_ADSAVE_SUCCESS
  );
  export const postADSaveError = createAction(
    actions.POST_ADSAVE_ERROR
  );
  
  export const postSDSaveRequest = createAction(
    actions.POST_SDSAVE_REQUEST
  );
  export const postSDSaveSuccess = createAction(
    actions.POST_SDSAVE_SUCCESS
  );
  export const postSDSaveError = createAction(
    actions.POST_SDSAVE_ERROR
  );

//COLLAB COMMENTS

export const postRtvCommRequest = createAction(
  actions.POST_RTVCOMM_REQUEST
);
export const postRtvCommSuccess = createAction(
  actions.POST_RTVCOMM_SUCCESS
);
export const postRtvCommError = createAction(
  actions.POST_RTVCOMM_ERROR
);
  
export const postInsCommRequest = createAction(
  actions.POST_INSCOMM_REQUEST
);
export const postInsCommSuccess = createAction(
  actions.POST_INSCOMM_SUCCESS
);
export const postInsCommError = createAction(
  actions.POST_INSCOMM_ERROR
);

