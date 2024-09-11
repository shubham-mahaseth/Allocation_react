import { call, put, takeLatest } from "redux-saga/effects";
import {
    getALLOCHEADDETAILSSuccess,
    getALLOCHEADDETAILSError,
    getQTYLIMITSSuccess,
    getQTYLIMITSError,
    getALLOCNODETAILSSuccess,
    getALLOCNODETAILSError,
    getUPDATEQTYLIMITSSuccess,
    getUPDATEQTYLIMITSError,
    getOKQTYLIMITSSRNSuccess,
    getOKQTYLIMITSSRNError,
} from "../Action/quantityLimits";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";



function* fetchALLOCHEADDETAILSSaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.FETCHALLOCHEADDETAILS,action.payload);
      // console.log("responsealloc_no",response);
      if (response?.status == 200) {
        yield put(getALLOCHEADDETAILSSuccess({ allocDetails: response?.data }));
      } else {
        yield put(getALLOCHEADDETAILSError(response?.data?.message));
      }
    } catch (e) {
      yield put(getALLOCHEADDETAILSError(e.message));
    }
  }
  
  export function* ALLOCHEADDETAILSData() {
    yield takeLatest(actions.GET_ALLOCHEADDETAILS_REQUEST, fetchALLOCHEADDETAILSSaga);
  }


  function* fetchQTYLIMITSSaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.FETCHQTYLIMITS,action.payload);
      if (response?.status == 200) {
        yield put(getQTYLIMITSSuccess({ qtyLimitsData: response?.data }));
      } else {
        yield put(getQTYLIMITSError(response?.data?.message));
      }
    } catch (e) {
      yield put(getQTYLIMITSError(e.message));
    }
  }
  
  export function* QTYLIMITSData() {
    yield takeLatest(actions.GET_QTYLIMITS_REQUEST, fetchQTYLIMITSSaga);
  }


  function* fetchALLOCNODETAILSSaga(action) {
    try {
      const response = yield call(axiosCall, "GET", API.FETCHALLOCNODTLS,action.payload);
      // console.log("responsealloc_no",response);
      if (response?.status == 200) {
        yield put(getALLOCNODETAILSSuccess({ allocNoDtl: response?.data }));
      } else {
        yield put(getALLOCNODETAILSError(response?.data?.message));
      }
    } catch (e) {
      yield put(getALLOCNODETAILSError(e.message));
    }
  }
  
  export function* ALLOCNODETAILSData() {
    yield takeLatest(actions.GET_ALLOCNODETAILS_REQUEST, fetchALLOCNODETAILSSaga);
  }


  function* fetchUPDATEQTYLIMITSSaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.UPDATEQTYLIMITS,action.payload);
      if (response?.status == 200) {
        yield put(getUPDATEQTYLIMITSSuccess({ updateQtyLimitsData: response?.data }));
      } else {
        yield put(getUPDATEQTYLIMITSError(response?.data?.message));
      }
    } catch (e) {
      yield put(getUPDATEQTYLIMITSError(e.message));
    }
  }
  
  export function* UPDATEQTYLIMITSData() {
    yield takeLatest(actions.GET_UPDATEQTYLIMITS_REQUEST, fetchUPDATEQTYLIMITSSaga);
  }


  function* fetchOKQTYLIMITSSRNSaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.OKQTYLIMITSSRN,action.payload);
      if (response?.status == 200) {
        yield put(getOKQTYLIMITSSRNSuccess({ OkQtyLimitsData: response?.data }));
      } else {
        yield put(getOKQTYLIMITSSRNError(response?.data?.message));
      }
    } catch (e) {
      yield put(getOKQTYLIMITSSRNError(e.message));
    }
  }
  
  export function* OKQTYLIMITSSRNData() {
    yield takeLatest(actions.GET_OKQTYLIMITSSRN_REQUEST, fetchOKQTYLIMITSSRNSaga);
  }