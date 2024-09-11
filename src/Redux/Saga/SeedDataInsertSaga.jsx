import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";
import {
    postSEEDHIER1Success, postSEEDHIER1Error,
    postSEEDHIER2Success, postSEEDHIER2Error,
    postSEEDHIER3Success, postSEEDHIER3Error,
    postSEEDITMDTLSuccess, postSEEDITMDTLError,
} from "../Action/SeedDataInsert";

function* postSeedHier1(action) {
    try {
        const response = yield call(axiosCall, "POST", API.SEEDHIER1, action.payload);
        if (response?.status == 200) {
            yield put(postSEEDHIER1Success({ insH1Status: response?.data }));
        } else {
            yield put(postSEEDHIER1Error(response?.data?.message));
        }
    } catch (e) {
        yield put(postSEEDHIER1Error(e.message));
    }
}

export function* postSeedH1() {
    yield takeLatest(actions.POST_SEEDHIER1_REQUEST, postSeedHier1);
}



function* postSeedHier2(action) {
    try {
        const response = yield call(axiosCall, "POST", API.SEEDHIER2, action.payload);
        if (response?.status == 200) {
            yield put(postSEEDHIER2Success({ insH2Status: response?.data }));
        } else {
            yield put(postSEEDHIER2Error(response?.data?.message));
        }
    } catch (e) {
        yield put(postSEEDHIER2Error(e.message));
    }
}

export function* postSeedH2() {
    yield takeLatest(actions.POST_SEEDHIER2_REQUEST, postSeedHier2);
}


function* postSeedHier3(action) {
    try {
        const response = yield call(axiosCall, "POST", API.SEEDHIER3, action.payload);
        if (response?.status == 200) {
            yield put(postSEEDHIER3Success({ insH3Status: response?.data }));
        } else {
            yield put(postSEEDHIER3Error(response?.data?.message));
        }
    } catch (e) {
        yield put(postSEEDHIER3Error(e.message));
    }
}

export function* postSeedH3() {
    yield takeLatest(actions.POST_SEEDHIER3_REQUEST, postSeedHier3);
}


function* postSeedItmDtlCall(action) {
    try {
        const response = yield call(axiosCall, "POST", API.SEEDITMDTL, action.payload);
        if (response?.status == 200) {
            yield put(postSEEDITMDTLSuccess({ insTtmDtlStatus: response?.data }));
        } else {
            yield put(postSEEDITMDTLError(response?.data?.message));
        }
    } catch (e) {
        yield put(postSEEDITMDTLError(e.message));
    }
}

export function* postSeedItmDtl() {
    yield takeLatest(actions.POST_SEEDITMDTL_REQUEST, postSeedItmDtlCall);
}
