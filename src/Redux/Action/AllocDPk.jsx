import { createAction } from "redux-actions";
import * as actions from "../constant";

/* ALLOC DETAILS PACK */
  export const postRTVADPACKRequest = createAction(
    actions.POST_RTVADPACK_REQUEST
  );
  export const postRTVADPACKSuccess = createAction(
    actions.POST_RTVADPACK_SUCCESS
  );
  export const postRTVADPACKError = createAction(
    actions.POST_RTVADPACK_ERROR
  );
  

  export const postADVALIDNRequest = createAction(
    actions.POST_ADVALIDN_REQUEST
  );
  export const postADVALIDNSuccess = createAction(
    actions.POST_ADVALIDN_SUCCESS
  );
  export const postADVALIDNError = createAction(
    actions.POST_ADVALIDN_ERROR
  );

  export const postG1ADPKRequest = createAction(
    actions.POST_G1ADPK_REQUEST
  );
  export const postG1ADPKSuccess = createAction(
    actions.POST_G1ADPK_SUCCESS
  );
  export const postG1ADPKError = createAction(
    actions.POST_G1ADPK_ERROR
  );

  
  export const postG2ADPKRequest = createAction(
    actions.POST_G2ADPK_REQUEST
  );
  export const postG2ADPKSuccess = createAction(
    actions.POST_G2ADPK_SUCCESS
  );
  export const postG2ADPKError = createAction(
    actions.POST_G2ADPK_ERROR
  );

  export const postUPDATEADPKRequest = createAction(
    actions.POST_UPDATEADPK_REQUEST
  );
  export const postUPDATEADPKSuccess = createAction(
    actions.POST_UPDATEADPK_SUCCESS
  );
  export const postUPDATEADPKError = createAction(
    actions.POST_UPDATEADPK_ERROR
  );

  export const postRESTOREADPKRequest = createAction(
    actions.POST_RESTOREADPK_REQUEST
  );
  export const postRESTOREADPKSuccess = createAction(
    actions.POST_RESTOREADPK_SUCCESS
  );
  export const postRESTOREADPKError = createAction(
    actions.POST_RESTOREADPK_ERROR
  );