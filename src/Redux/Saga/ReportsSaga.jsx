import { call, put, takeLatest } from "redux-saga/effects";
import {getREPORTSuccess, getREPORTError
  
} from "../Action/Reports";
import * as actions from "../constant";
import axiosCall from "../../services/index"; 
import { API } from "../../services/api";

//GENERATE REPORT   getREPORTSuccess, getREPORTError
function* fetchRPTDATA(action) {
    try {
      const response = yield call(axiosCall, "GET", API.REPORT, action.payload);
      
      if (response?.status == 200) {
        yield put(getREPORTSuccess({ rptData: response?.data }));
      } else {
        yield put(getREPORTError(response?.data?.message));
      }
    } catch (e) {
      yield put(getREPORTError(e.message));
    }
  }
  
  export function* RPTData() {
    yield takeLatest(actions.GET_REPORT_REQUEST, fetchRPTDATA);
  }