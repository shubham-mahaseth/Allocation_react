import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getRULESTYPERequest = createAction(
  actions.GET_RULESTYPE_REQUEST
);
export const getRULESTYPESuccess = createAction(
  actions.GET_RULESTYPE_SUCCESS
);
export const getRULESTYPEError = createAction(
  actions.GET_RULESTYPE_ERROR
);
export const getNEEDTYPERequest = createAction(
  actions.GET_NEEDTYPE_REQUEST
);
export const getNEEDTYPESuccess = createAction(
  actions.GET_NEEDTYPE_SUCCESS
);
export const getNEEDTYPEError = createAction(
  actions.GET_NEEDTYPE_ERROR
);
export const getALLOCATETOTYPERequest = createAction(
  actions.GET_ALLOCATETOTYPE_REQUEST
);
export const getALLOCATETOTYPESuccess = createAction(
  actions.GET_ALLOCATETOTYPE_SUCCESS
);
export const getALLOCATETOTYPEError = createAction(
  actions.GET_ALLOCATETOTYPE_ERROR
);
export const getHIERARCHYTYPERequest = createAction(
  actions.GET_HIERARCHYTYPE_REQUEST
);
export const getHIERARCHYTYPESuccess = createAction(
  actions.GET_HIERARCHYTYPE_SUCCESS
);
export const getHIERARCHYTYPEError = createAction(
  actions.GET_HIERARCHYTYPE_ERROR
);
export const getFETCHLOCATIONDATARequest = createAction(
  actions.GET_FETCHLOCATIONDATA_REQUEST
);
export const getFETCHLOCATIONDATASuccess = createAction(
  actions.GET_FETCHLOCATIONDATA_SUCCESS
);
export const getFETCHLOCATIONDATAError = createAction(
  actions.GET_FETCHLOCATIONDATA_ERROR
);
export const getLOCATIONRLRequest = createAction(
  actions.GET_LOCATIONRL_REQUEST
);
export const getLOCATIONRLSuccess = createAction(
  actions.GET_LOCATIONRL_SUCCESS
);
export const getLOCATIONRLError = createAction(
  actions.GET_LOCATIONRL_ERROR
);
export const getLOCATIONLISTRLRequest = createAction(
  actions.GET_LOCATIONLISTRL_REQUEST
);
export const getLOCATIONLISTRLSuccess = createAction(
  actions.GET_LOCATIONLISTRL_SUCCESS
);
export const getLOCATIONLISTRLError = createAction(
  actions.GET_LOCATIONLISTRL_ERROR
);
export const getLOCATIONTRAITSRLRequest = createAction(
  actions.GET_LOCATIONTRAITSRL_REQUEST
);
export const getLOCATIONTRAITSRLSuccess = createAction(
  actions.GET_LOCATIONTRAITSRL_SUCCESS
);
export const getLOCATIONTRAITSRLError = createAction(
  actions.GET_LOCATIONTRAITSRL_ERROR
);
export const getCLEARANCERLRequest = createAction(
  actions.GET_CLEARANCERL_REQUEST
);
export const getCLEARANCERLSuccess = createAction(
  actions.GET_CLEARANCERL_SUCCESS
);
export const getCLEARANCERLError = createAction(
  actions.GET_CLEARANCERL_ERROR
);
export const getSTATUSRLRequest = createAction(
  actions.GET_STATUSRL_REQUEST
);
export const getSTATUSRLSuccess = createAction(
  actions.GET_STATUSRL_SUCCESS
);
export const getSTATUSRLError = createAction(
  actions.GET_STATUSRL_ERROR
);
export const getUPDATERULESRLRLRequest = createAction(
  actions.GET_UPDATERULESRLRL_REQUEST
);
export const getUPDATERULESRLRLSuccess = createAction(
  actions.GET_UPDATERULESRLRL_SUCCESS
);
export const getUPDATERULESRLRLError = createAction(
  actions.GET_UPDATERULESRLRL_ERROR
);

export const getUPDATELOCATIONRLRequest = createAction(
  actions.GET_UPDATELOCATIONRL_REQUEST
);
export const getUPDATELOCATIONRLSuccess = createAction(
  actions.GET_UPDATELOCATIONRL_SUCCESS
);
export const getUPDATELOCATIONRLError = createAction(
  actions.GET_UPDATELOCATIONRL_ERROR
);
export const getDELETELOCATIONRLRequest = createAction(
  actions.GET_DELETELOCATIONRL_REQUEST
);
export const getDELETELOCATIONRLSuccess = createAction(
  actions.GET_DELETELOCATIONRL_SUCCESS
);
export const getDELETELOCATIONRLError = createAction(
  actions.GET_DELETELOCATIONRL_ERROR
);
export const getLOADWEIGHTCHANGERLRequest = createAction(
  actions.GET_LOADWEIGHTCHANGERL_REQUEST
);
export const getLOADWEIGHTCHANGERLSuccess = createAction(
  actions.GET_LOADWEIGHTCHANGERL_SUCCESS
);
export const getLOADWEIGHTCHANGERLError = createAction(
  actions.GET_LOADWEIGHTCHANGERL_ERROR
);
export const getLOADRULEDATERLRequest = createAction(
  actions.GET_LOADRULEDATERL_REQUEST
);
export const getLOADRULEDATERLSuccess = createAction(
  actions.GET_LOADRULEDATERL_SUCCESS
);
export const getLOADRULEDATERLError = createAction(
  actions.GET_LOADRULEDATERL_ERROR
);
export const getRETRIEVERULEDATERLRequest = createAction(
  actions.GET_RETRIEVERULEDATERL_REQUEST
);
export const getRETRIEVERULEDATERLSuccess = createAction(
  actions.GET_RETRIEVERULEDATERL_SUCCESS
);
export const getRETRIEVERULEDATERLError = createAction(
  actions.GET_RETRIEVERULEDATERL_ERROR
);
export const getUPDATECHANGEWEIGHTSRLRequest = createAction(
  actions.GET_UPDATECHANGEWEIGHTSRL_REQUEST
);
export const getUPDATECHANGEWEIGHTSRLSuccess = createAction(
  actions.GET_UPDATECHANGEWEIGHTSRL_SUCCESS
);
export const getUPDATECHANGEWEIGHTSRLError = createAction(
  actions.GET_UPDATECHANGEWEIGHTSRL_ERROR
);


export const getFETCHLOCGRIDRequest = createAction(
  actions.GET_FETCHLOCGRID_REQUEST
);
export const getFETCHLOCGRIDSuccess = createAction(
  actions.GET_FETCHLOCGRID_SUCCESS
);
export const getFETCHLOCGRIDError = createAction(
  actions.GET_FETCHLOCGRID_ERROR
);
export const getUPDATESIZEPROFILEINDRLRequest = createAction(
  actions.GET_UPDATESIZEPROFILEINDRL_REQUEST
);
export const getUPDATESIZEPROFILEINDRLSuccess = createAction(
  actions.GET_UPDATESIZEPROFILEINDRL_SUCCESS
);
export const getUPDATESIZEPROFILEINDRLError = createAction(
  actions.GET_UPDATESIZEPROFILEINDRL_ERROR
); 


export const getUPDATEWHINDRLRequest = createAction(
  actions.GET_UPDATESIZEPROFILEINDRL_REQUEST
);
export const getUPDATEWHINDRLSuccess = createAction(
  actions.GET_UPDATESIZEPROFILEINDRL_SUCCESS
);
export const getUPDATEWHINDRLError = createAction(
  actions.GET_UPDATESIZEPROFILEINDRL_ERROR
);


export const getINSLOCRLRequest = createAction(
  actions.GET_INSLOCRL_REQUEST
);
export const getINSLOCRLSuccess = createAction(
  actions.GET_INSLOCRL_SUCCESS
);
export const getINSLOCRLError = createAction(
  actions.GET_INSLOCRL_ERROR
);
//////////////////******RL**********//////////////////////

export const getRTVRLDATARequest = createAction(
  actions.GET_RTVRLDATA_REQUEST
);
export const getRTVRLDATASuccess = createAction(
  actions.GET_RTVRLDATA_SUCCESS
);
export const getRTVRLDATAError = createAction(
  actions.GET_RTVRLDATA_ERROR
);


/* RL TEMPLATE STARTS */
export const postRULESAVETEMPLATERequest = createAction(
  actions.POST_RULESAVETEMPLATE_REQUEST
);
export const postRULESAVETEMPLATESuccess = createAction(
  actions.POST_RULESAVETEMPLATE_SUCCESS
);
export const postRULESAVETEMPLATEError = createAction(
  actions.POST_RULESAVETEMPLATE_ERROR
);

export const postRLLOCSAVETEMPLATERequest = createAction(
  actions.POST_RLLOCSAVETEMPLATE_REQUEST
);
export const postRLLOCSAVETEMPLATESuccess = createAction(
  actions.POST_RLLOCSAVETEMPLATE_SUCCESS
);
export const postRLLOCSAVETEMPLATEError = createAction(
  actions.POST_RLLOCSAVETEMPLATE_ERROR
);

export const getRULETEMPLATENAMERequest = createAction(
  actions.GET_RULETEMPLATENAME_REQUEST
);
export const getRULETEMPLATENAMESuccess = createAction(
  actions.GET_RULETEMPLATENAME_SUCCESS
);
export const getRULETEMPLATENAMEError = createAction(
  actions.GET_RULETEMPLATENAME_ERROR
);

export const getRLLOCTEMPLATENAMERequest = createAction(
  actions.GET_RLLOCTEMPLATENAME_REQUEST
);
export const getRLLOCTEMPLATENAMESuccess = createAction(
  actions.GET_RLLOCTEMPLATENAME_SUCCESS
);
export const getRLLOCTEMPLATENAMEError = createAction(
  actions.GET_RLLOCTEMPLATENAME_ERROR
);

export const postFETCHRULETEMPLATERequest = createAction(
  actions.POST_FETCHRULETEMPLATE_REQUEST
);
export const postFETCHRULETEMPLATESuccess = createAction(
  actions.POST_FETCHRULETEMPLATE_SUCCESS
);
export const postFETCHRULETEMPLATEError = createAction(
  actions.POST_FETCHRULETEMPLATE_ERROR
);

export const postFETCHRLLOCTEMPLATERequest = createAction(
  actions.POST_FETCHRLLOCTEMPLATE_REQUEST
);
export const postFETCHRLLOCTEMPLATESuccess = createAction(
  actions.POST_FETCHRLLOCTEMPLATE_SUCCESS
);
export const postFETCHRLLOCTEMPLATEError = createAction(
  actions.POST_FETCHRLLOCTEMPLATE_ERROR
);
/* RL TEMPLATE ENDS */