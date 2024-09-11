import { createAction } from "redux-actions";
import * as actions from "../constant";


export const getAllocItemsRequest = createAction(
actions.GET_ALLOC_ITEMS_REQUEST
);
export const getAllocItemsSuccess = createAction(
actions.GET_ALLOC_ITEMS_SUCCESS
);
export const getAllocItemsError = createAction(
actions.GET_ALLOC_ITEMS_ERROR
);

export const postLIkeInsertRequest = createAction(
    actions.POST_LIKE_INSERT_REQUEST
);
export const postLIkeInsertSuccess = createAction(
    actions.POST_LIKE_INSERT_SUCCESS
);
export const postLIkeInsertError = createAction(
    actions.POST_LIKE_INSERT_ERROR
);

export const postDelMappedRequest = createAction(
    actions.POST_DEL_MAPPED_REQUEST
);
export const postDelMappedSuccess = createAction(
    actions.POST_DEL_MAPPED_SUCCESS
);
export const postDelMappedError = createAction(
    actions.POST_DEL_MAPPED_ERROR
);

export const postMapItemsRequest = createAction(
    actions.POST_MAP_ITEMS_REQUEST
);
export const postMapItemsSuccess = createAction(
    actions.POST_MAP_ITEMS_SUCCESS
);
export const postMapItemsError = createAction(
    actions.POST_MAP_ITEMS_ERROR
);


export const postNOOFSKUSRequest = createAction(
    actions.POST_NOOFSKUS_REQUEST
);
export const postNOOFSKUSSuccess = createAction(
    actions.POST_NOOFSKUS_SUCCESS
);
export const postNOOFSKUSError = createAction(
    actions.POST_NOOFSKUS_ERROR
);