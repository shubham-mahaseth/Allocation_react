import { createAction } from "redux-actions";
import * as actions from "../constant";

/*RETIREVE CURRENT USRDTLS */
export const postUSRDTLSRequest = createAction(
  actions.POST_USRDTLS_REQUEST
);
export const postUSRDTLSSuccess = createAction(
  actions.POST_USRDTLS_SUCCESS
);
export const postUSRDTLSError = createAction(
  actions.POST_USRDTLS_ERROR
);
/*RETIREVE ALL USERS DETAILS */
export const postUSRSDATARequest = createAction(
  actions.POST_USRSDATA_REQUEST
);
export const postUSRSDATASuccess = createAction(
  actions.POST_USRSDATA_SUCCESS
);
export const postUSRSDATAError = createAction(
  actions.POST_USRSDATA_ERROR
);