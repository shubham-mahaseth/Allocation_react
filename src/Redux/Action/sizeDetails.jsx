import { createAction } from "redux-actions";
import * as actions from "../constant";

export const postSIZEDETAILSRequest = createAction(
    actions.POST_SIZEDETAILS_REQUEST
);
export const postSIZEDETAILSSuccess = createAction(
    actions.POST_SIZEDETAILS_SUCCESS
);
export const postSIZEDETAILSError = createAction(
    actions.POST_SIZEDETAILS_ERROR
);
export const postSIZEHEADERDETAILSRequest = createAction(
    actions.POST_SIZEHEADERDETAILS_REQUEST
);
export const postSIZEHEADERDETAILSSuccess = createAction(
    actions.POST_SIZEHEADERDETAILS_SUCCESS
);
export const postSIZEHEADERDETAILSError = createAction(
    actions.POST_SIZEHEADERDETAILS_ERROR
);
export const postSIZEUPDATEDETAILSRequest = createAction(
    actions.POST_SIZEUPDATEDETAILS_REQUEST
);
export const postSIZEUPDATEDETAILSSuccess = createAction(
    actions.POST_SIZEUPDATEDETAILS_SUCCESS
);
export const postSIZEUPDATEDETAILSError = createAction(
    actions.POST_SIZEUPDATEDETAILS_ERROR
);