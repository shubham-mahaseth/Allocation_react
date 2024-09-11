import { createAction } from "redux-actions";
import * as actions from "../constant";


export const getAllStsRequest = createAction(
  actions.GET_AllTRSTS_REQUEST
);
export const getAllStsSuccess = createAction(
  actions.GET_AllTRSTS_SUCCESS
);
export const getAllStsError = createAction(
  actions.GET_AllTRSTS_ERROR
);


export const postAllocIdsRequest = createAction(
  actions.POST_ALLOCIDS_REQUEST
);
export const postAllocIdsSuccess = createAction(
  actions.POST_ALLOCIDS_SUCCESS
);
export const postAllocIdsError = createAction(
  actions.POST_ALLOCIDS_ERROR
);

export const postSwitchASYRequest = createAction(
  actions.POST_SWITCHASY_REQUEST
);
export const postSwitchASYSuccess = createAction(
  actions.POST_SWITCHASY_SUCCESS
);
export const postSwitchASYError = createAction(
  actions.POST_SWITCHASY_ERROR
);

export const postSearchASYRequest = createAction(
  actions.POST_SEARCHASY_REQUEST
);
export const postSearchASYSuccess = createAction(
  actions.POST_SEARCHASY_SUCCESS
);
export const postSearchASYError = createAction(
  actions.POST_SEARCHASY_ERROR
);

export const postCopyASYRequest = createAction(
  actions.POST_COPYASY_REQUEST
);
export const postCopyASYSuccess = createAction(
  actions.POST_COPYASY_SUCCESS
);
export const postCopyASYError = createAction(
  actions.POST_COPYASY_ERROR
);

export const postValidASYRequest = createAction(
  actions.POST_VALIDASY_REQUEST
);
export const postValidASYSuccess = createAction(
  actions.POST_VALIDASY_SUCCESS
);
export const postValidASYError = createAction(
  actions.POST_VALIDASY_ERROR
);
