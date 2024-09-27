import { call, put, takeLatest } from "redux-saga/effects";
import {
  postUSRDTLSSuccess, postUSRDTLSError,
  postUSRSDATASuccess, postUSRSDATAError,
  postUSRAUTHSuccess, postUSRAUTHError
} from "../Action/UserConfigDetails";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";


function* fetchUserDtls(action) {
  try {
    const response = yield call(axiosCall, "POST", API.USRDTLS, action.payload);
    if (response?.status == 200) {
      yield put(postUSRDTLSSuccess({ usrDtls: response?.data }));
    } else {
      yield put(postUSRDTLSError(response?.data?.message));
    }
  } catch (e) {
    yield put(postUSRDTLSError(e.message));
  }
}

export function* RtvUsrDtls() {
  yield takeLatest(actions.POST_USRDTLS_REQUEST, fetchUserDtls);
}

function* fetchUsersData(action) {
  try {
    const response = yield call(axiosCall, "POST", API.USRSDATA, action.payload);
    if (response?.status == 200) {
      yield put(postUSRSDATASuccess({ usrsData: response?.data }));
    } else {
      yield put(postUSRSDATAError(response?.data?.message));
    }
  } catch (e) {
    yield put(postUSRSDATAError(e.message));
  }
}

export function* RtvUsrsData() {
  yield takeLatest(actions.POST_USRSDATA_REQUEST, fetchUsersData);
}

function* validateUsersAuth(action) {
  try {
    const response = yield call(axiosCall, "POST", API.AUTHUSER, action.payload);
    if (response?.status == 200) {
      yield put(postUSRAUTHSuccess({ usrAuthn: response?.data }));
    } else {
      yield put(postUSRAUTHError(response?.data?.message));
    }
  } catch (e) {
    yield put(postUSRAUTHError(e.message));
  }
}

export function* ValUSRAUTH() {
  yield takeLatest(actions.POST_USRAUTH_REQUEST, validateUsersAuth);
}