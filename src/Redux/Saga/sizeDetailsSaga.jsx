import { call, put, takeLatest } from "redux-saga/effects";
import {
  postSIZEDETAILSError,
  postSIZEDETAILSSuccess,
  postSIZEHEADERDETAILSError,
  postSIZEHEADERDETAILSSuccess,
  postSIZEUPDATEDETAILSError,
  postSIZEUPDATEDETAILSSuccess,
} from "../Action/sizeDetails";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchSIZEDETAILSSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.SIZEDETAILS, action.payload);
    if (response?.status == 200) {
      yield put(postSIZEDETAILSSuccess({ sizeDetailsData: response?.data }));
    } else {
      yield put(postSIZEDETAILSError(response?.data?.message));
    }
  } catch (e) {
    yield put(postSIZEDETAILSError(e.message));
  }
}

export function* SIZEDETAILSfuncData() {
  yield takeLatest(actions.POST_SIZEDETAILS_REQUEST, fetchSIZEDETAILSSaga);
}


function* fetchSIZEHEADERDETAILSSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.SIZEHEADERDETAILS, action.payload);
    if (response?.status == 200) {
      yield put(postSIZEHEADERDETAILSSuccess({ sizeHeaderDetailsData: response?.data }));
    } else {
      yield put(postSIZEHEADERDETAILSError(response?.data?.message));
    }
  } catch (e) {
    yield put(postSIZEHEADERDETAILSError(e.message));
  }
}

export function* SIZEHEADERDETAILSfuncData() {
  yield takeLatest(actions.POST_SIZEHEADERDETAILS_REQUEST, fetchSIZEHEADERDETAILSSaga);
}

function* fetchSIZEUPDATEDETAILSSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.SIZEUPDATEDETAILS, action.payload);
    if (response?.status == 200) {
      yield put(postSIZEUPDATEDETAILSSuccess({ sizeTempDataUpdate: response?.data }));
    } else {
      yield put(postSIZEUPDATEDETAILSError(response?.data?.message));
    }
  } catch (e) {
    yield put(postSIZEUPDATEDETAILSError(e.message));
  }
}

export function* SIZEUPDATEDETAILSfuncData() {
  yield takeLatest(actions.POST_SIZEUPDATEDETAILS_REQUEST, fetchSIZEUPDATEDETAILSSaga);
}