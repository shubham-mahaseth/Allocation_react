import { createAction } from "redux-actions";
import * as actions from "../constant";


export const postRETRIEVEWHATIFRequest = createAction(
    actions.POST_RETRIEVEWHATIF_REQUEST
);
export const postRETRIEVEWHATIFSuccess = createAction(
    actions.POST_RETRIEVEWHATIF_SUCCESS
);
export const postRETRIEVEWHATIFError = createAction(
    actions.POST_RETRIEVEWHATIF_ERROR
);
export const postSUBMITWHATIFRequest = createAction(
    actions.POST_SUBMITWHATIF_REQUEST
);
export const postSUBMITWHATIFSuccess = createAction(
    actions.POST_SUBMITWHATIF_SUCCESS
);
export const postSUBMITWHATIFError = createAction(
    actions.POST_SUBMITWHATIF_ERROR
);
export const postPOTYPEWHATIFRequest = createAction(
    actions.POST_POTYPEWHATIF_REQUEST
);
export const postPOTYPEWHATIFSuccess = createAction(
    actions.POST_POTYPEWHATIF_SUCCESS
);
export const postPOTYPEWHATIFError = createAction(
    actions.POST_POTYPEWHATIF_ERROR
);
export const postSUPPLIERWHATIFRequest = createAction(
    actions.POST_SUPPLIERWHATIF_REQUEST
);
export const postSUPPLIERWHATIFSuccess = createAction(
    actions.POST_SUPPLIERWHATIF_SUCCESS
);
export const postSUPPLIERWHATIFError = createAction(
    actions.POST_SUPPLIERWHATIF_ERROR
);
export const postORIGINCRTYWHATIFRequest = createAction(
    actions.POST_ORIGINCRTYWHATIF_REQUEST
);
export const postORIGINCRTYWHATIFSuccess = createAction(
    actions.POST_ORIGINCRTYWHATIF_SUCCESS
);
export const postORIGINCRTYWHATIFError = createAction(
    actions.POST_ORIGINCRTYWHATIF_ERROR
);
//WHATIF PO
export const postRETRIEVEWHATIFPORequest = createAction(
    actions.POST_RETRIEVEWHATIFPO_REQUEST
);
export const postRETRIEVEWHATIFPOSuccess = createAction(
    actions.POST_RETRIEVEWHATIFPO_SUCCESS
);
export const postRETRIEVEWHATIFPOError = createAction(
    actions.POST_RETRIEVEWHATIFPO_ERROR
);
export const postSUBMITWHATIFPORequest = createAction(
    actions.POST_SUBMITWHATIFPO_REQUEST
);
export const postSUBMITWHATIFPOSuccess = createAction(
    actions.POST_SUBMITWHATIFPO_SUCCESS
);
export const postSUBMITWHATIFPOError = createAction(
    actions.POST_SUBMITWHATIFPO_ERROR
);

/* PO PREVIEW */
export const postRtvPoPrvRequest = createAction(
    actions.POST_RTVPOPRV_REQUEST
);
export const postRtvPoPrvPOSuccess = createAction(
    actions.POST_RTVPOPRV_SUCCESS
);
export const postRtvPoPrvError = createAction(
    actions.POST_RTVPOPRV_ERROR
);

export const postCrtPoRequest = createAction(
    actions.POST_CRTPO_REQUEST
);
export const postCrtPoSuccess = createAction(
    actions.POST_CRTPO_SUCCESS
);
export const postCrtPoError = createAction(
    actions.POST_CRTPO_ERROR
);


export const postUpdatePORequest = createAction(
    actions.POST_UPDATEPO_REQUEST
);
export const postUpdatePOSuccess = createAction(
    actions.POST_UPDATEPO_SUCCESS
);
export const postUpdatePOError = createAction(
    actions.POST_UPDATEPO_ERROR
);