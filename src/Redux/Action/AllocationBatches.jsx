import { createAction } from "redux-actions";
import * as actions from "../constant";

/* ALLOC DASHBOARD */
export const postALCSCHLBTHRequest = createAction(
    actions.POST_ALCSCHLBTH_REQUEST
);
export const postALCSCHLBTHSuccess = createAction(
    actions.POST_ALCSCHLBTH_SUCCESS
);
export const postALCSCHLBTHError = createAction(
    actions.POST_ALCSCHLBTH_ERROR
);

export const postUPDBTHDATERequest = createAction(
    actions.POST_UPDBTHDATE_REQUEST
);
export const postUPDBTHDATESuccess = createAction(
    actions.POST_UPDBTHDATE_SUCCESS
);
export const postUPDBTHDATEError = createAction(
    actions.POST_UPDBTHDATE_ERROR
);