import { call, put, takeLatest } from "redux-saga/effects";
import {
  getAllStsError,
  getAllStsSuccess,
  postAllocIdsError,
  postAllocIdsSuccess,
  postSwitchASYSuccess, postSwitchASYError,
  postSearchASYSuccess, postSearchASYError,
  postCopyASYSuccess, postCopyASYError,
  postValidASYSuccess, postValidASYError,
} from "../Action/allocSummary";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";


function* fetchAllSts(action) {
  try {
    const response = yield call(axiosCall, "GET", API.ALLTRSTS, action.payload);
    if (response?.status == 200) {
      yield put(getAllStsSuccess({ alltrSts: response?.data }));
    } else {
      yield put(getAllStsError(response?.data?.message));
    }
  } catch (e) {
    yield put(getAllStsError(e.message));
  }
}

export function* AllStsData() {
  yield takeLatest(actions.GET_AllTRSTS_REQUEST, fetchAllSts);
}




function* fetchAllocIds(action) {
  try {
    const response = yield call(axiosCall, "POST", API.ALLOCIDS, action.payload);
    if (response?.status == 200) {
      yield put(postAllocIdsSuccess({ allocIdsData: response?.data }));
    } else {
      yield put(postAllocIdsError(response?.data?.message));
    }
  } catch (e) {
    yield put(postAllocIdsError(e.message));
  }
}

export function* AllocIdsData() {
  yield takeLatest(actions.POST_ALLOCIDS_REQUEST, fetchAllocIds);
}

function* fetchSearchASY(action) {
  try {
    const response = yield call(axiosCall, "POST", API.SEARCHASY, action.payload);
    if (response?.status == 200) {
      yield put(postSearchASYSuccess({ srcData: response?.data }));
    } else {
      yield put(postSearchASYError(response?.data?.message));
    }
  } catch (e) {
    yield put(postSearchASYError(e.message));
  }
}

export function* SearchASYData() {
  yield takeLatest(actions.POST_SEARCHASY_REQUEST, fetchSearchASY);
}

function* fetchSwitchASY(action) {
  try {
    const response = yield call(axiosCall, "POST", API.SWITCHASY, action.payload);
    if (response?.status == 200) {
      yield put(postSwitchASYSuccess({ switchAsyData: response?.data }));
    } else {
      yield put(postSwitchASYError(response?.data?.message));
    }
  } catch (e) {
    yield put(postSwitchASYError(e.message));
  }
}

export function* SwitchASYData() {
  yield takeLatest(actions.POST_SWITCHASY_REQUEST, fetchSwitchASY);
}

function* fetchCopyASY(action) {
  try {
    const response = yield call(axiosCall, "POST", API.COPYASY, action.payload);
    if (response?.status == 200) {
      yield put(postCopyASYSuccess({ copyAsyData: response?.data }));
    } else {
      yield put(postCopyASYError(response?.data?.message));
    }
  } catch (e) {
    yield put(postCopyASYError(e.message));
  }
}

export function* CopyASYData() {
  yield takeLatest(actions.POST_COPYASY_REQUEST, fetchCopyASY);
}

function* fetchValidASY(action) {
  try {
    const response = yield call(axiosCall, "POST", API.VALIDASY, action.payload);
    if (response?.status == 200) {
      yield put(postValidASYSuccess({ validCheck: response?.data }));
    } else {
      yield put(postValidASYError(response?.data?.message));
    }
  } catch (e) {
    yield put(postValidASYError(e.message));
  }
}

export function* ValidASYData() {
  yield takeLatest(actions.POST_VALIDASY_REQUEST, fetchValidASY);
}