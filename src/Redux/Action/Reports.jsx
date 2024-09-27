import { createAction } from "redux-actions";
import * as actions from "../constant";

/*GENERATE REPORT */
export const getREPORTRequest = createAction(
  actions.GET_REPORT_REQUEST
);
export const getREPORTSuccess = createAction(
  actions.GET_REPORT_SUCCESS
);
export const getREPORTError = createAction(
  actions.GET_REPORT_ERROR
);