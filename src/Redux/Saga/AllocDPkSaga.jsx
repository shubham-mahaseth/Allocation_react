import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";
import {
    postRTVADPACKError,
    postRTVADPACKSuccess,
    postADVALIDNError,
    postADVALIDNSuccess,
    postG1ADPKError,
    postG1ADPKSuccess,
    postG2ADPKError,
    postG2ADPKSuccess,
    postRESTOREADPKError,
    postRESTOREADPKSuccess,
    postUPDATEADPKError,
    postUPDATEADPKSuccess
} from "../Action/AllocDPk";

function* fetchAllocDPk(action) {
    try {
        const response = yield call(axiosCall, "POST", API.RTVADPACK, action.payload);
        if (response?.status == 200) {
            console.log("validate 200 ", response)
            yield put(postRTVADPACKSuccess({ aDPkData: response?.data }));
        } else {
            yield put(postRTVADPACKError(response?.data?.message));
        }
    } catch (e) {
        yield put(postRTVADPACKError(e.message));
    }
}

export function* AllocDPkData() {
    yield takeLatest(actions.POST_RTVADPACK_REQUEST, fetchAllocDPk);
}

function* fetchADValid(action) {
    try {
        const response = yield call(axiosCall, "POST", API.ADVALIDN, action.payload);
        if (response?.status == 200) {
            yield put(postADVALIDNSuccess({ adCheck: response?.data }));
        } else {
            yield put(postADVALIDNError(response?.data?.message));
        }
    } catch (e) {
        yield put(postADVALIDNError(e.message));
    }
}

export function* ADValidation() {
    yield takeLatest(actions.POST_ADVALIDN_REQUEST, fetchADValid);
}



function* fetchGrid1ADPk(action) {
    try {
        const response = yield call(axiosCall, "POST", API.G1ADPK, action.payload);
        if (response?.status == 200) {
            yield put(postG1ADPKSuccess({ grid1Data: response?.data }));
        } else {
            yield put(postG1ADPKError(response?.data?.message));
        }
    } catch (e) {
        yield put(postG1ADPKError(e.message));
    }
}

export function* grid1ADPk() {
    yield takeLatest(actions.POST_G1ADPK_REQUEST, fetchGrid1ADPk);
}

function* fetchGrid2ADPk(action) {
    try {
        const response = yield call(axiosCall, "POST", API.G2ADPK, action.payload);
        if (response?.status == 200) {
            yield put(postG2ADPKSuccess({ grid2Data: response?.data }));
        } else {
            yield put(postG2ADPKError(response?.data?.message));
        }
    } catch (e) {
        yield put(postG2ADPKError(e.message));
    }
}

export function* grid2ADPk() {
    yield takeLatest(actions.POST_G2ADPK_REQUEST, fetchGrid2ADPk);
}


function* fetchUpdateADPk(action) {
    try {
        const response = yield call(axiosCall, "POST", API.UPDATEADPK, action.payload);
        if (response?.status == 200) {
            yield put(postUPDATEADPKSuccess({ updateChk: response?.data }));
        } else {
            yield put(postUPDATEADPKError(response?.data?.message));
        }
    } catch (e) {
        yield put(postUPDATEADPKError(e.message));
    }
}

export function* updateAdpk() {
    yield takeLatest(actions.POST_UPDATEADPK_REQUEST, fetchUpdateADPk);
}


function* fetchRestoreADPk(action) {
    try {
        const response = yield call(axiosCall, "POST", API.RESTOREADPK, action.payload);
        if (response?.status == 200) {
            yield put(postRESTOREADPKSuccess({ restoreChk: response?.data }));
        } else {
            yield put(postRESTOREADPKError(response?.data?.message));
        }
    } catch (e) {
        yield put(postRESTOREADPKError(e.message));
    }
}

export function* restoreAdpk() {
    yield takeLatest(actions.POST_RESTOREADPK_REQUEST, fetchRestoreADPk);
}