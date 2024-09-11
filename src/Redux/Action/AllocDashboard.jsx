import { createAction } from "redux-actions";
import * as actions from "../constant";

/* ALLOC DASHBOARD */
export const postDASHBOARDUSERALLOCRequest = createAction(
    actions.POST_DASHBOARDUSERALLOC_REQUEST
);
export const postDASHBOARDUSERALLOCSuccess = createAction(
    actions.POST_DASHBOARDUSERALLOC_SUCCESS
);
export const postDASHBOARDUSERALLOCError = createAction(
    actions.POST_DASHBOARDUSERALLOC_ERROR
);

export const postDASHBOARDRELEASECOUNTRequest = createAction(
    actions.POST_DASHBOARDRELEASECOUNT_REQUEST
);
export const postDASHBOARDRELEASECOUNTSuccess = createAction(
    actions.POST_DASHBOARDRELEASECOUNT_SUCCESS
);
export const postDASHBOARDRELEASECOUNTError = createAction(
    actions.POST_DASHBOARDRELEASECOUNT_ERROR
);

export const postDASHBOARDALLOCCOUNTRequest = createAction(
    actions.POST_DASHBOARDALLOCCOUNT_REQUEST
);
export const postDASHBOARDALLOCCOUNTSuccess = createAction(
    actions.POST_DASHBOARDALLOCCOUNT_SUCCESS
);
export const postDASHBOARDALLOCCOUNTError = createAction(
    actions.POST_DASHBOARDALLOCCOUNT_ERROR
);
export const getDALLOCRequest = createAction(
    actions.GET_DALLOC_REQUEST
);
export const getDALLOCSuccess = createAction(
    actions.GET_DALLOC_SUCCESS
);
export const getDALLOCError = createAction(
    actions.GET_DALLOC_ERROR
);