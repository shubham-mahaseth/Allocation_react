import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getALLOCHEADDETAILSRequest = createAction(
  actions.GET_ALLOCHEADDETAILS_REQUEST
);
export const getALLOCHEADDETAILSSuccess = createAction(
  actions.GET_ALLOCHEADDETAILS_SUCCESS
);
export const getALLOCHEADDETAILSError = createAction(
  actions.GET_ALLOCHEADDETAILS_ERROR
);
export const getQTYLIMITSRequest = createAction(
  actions.GET_QTYLIMITS_REQUEST
);
export const getQTYLIMITSSuccess = createAction(
  actions.GET_QTYLIMITS_SUCCESS
);
export const getQTYLIMITSError = createAction(
  actions.GET_QTYLIMITS_ERROR
);
export const getALLOCNODETAILSRequest = createAction(
  actions.GET_ALLOCNODETAILS_REQUEST
);
export const getALLOCNODETAILSSuccess = createAction(
  actions.GET_ALLOCNODETAILS_SUCCESS
);
export const getALLOCNODETAILSError = createAction(
  actions.GET_ALLOCNODETAILS_ERROR
);
export const getUPDATEQTYLIMITSRequest = createAction(
  actions.GET_UPDATEQTYLIMITS_REQUEST
);
export const getUPDATEQTYLIMITSSuccess = createAction(
  actions.GET_UPDATEQTYLIMITS_SUCCESS
);
export const getUPDATEQTYLIMITSError = createAction(
  actions.GET_UPDATEQTYLIMITS_ERROR
);
export const getOKQTYLIMITSSRNRequest = createAction(
  actions.GET_OKQTYLIMITSSRN_REQUEST
);
export const getOKQTYLIMITSSRNSuccess = createAction(
  actions.GET_OKQTYLIMITSSRN_SUCCESS
);
export const getOKQTYLIMITSSRNError = createAction(
  actions.GET_OKQTYLIMITSSRN_ERROR
);