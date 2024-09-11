import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";
import {
    postALCSCHLBTHError, postALCSCHLBTHSuccess,
    postUPDBTHDATEError, postUPDBTHDATESuccess
} from "../Action/AllocationBatches";

function* runAllocScdlBatch(action) {
    try {
        const response = yield call(axiosCall, "POST", API.ALLOCSCHDLBTH, action.payload);
        if (response?.status == 200) {
            yield put(postALCSCHLBTHSuccess({ schlBthStatus: response?.data }));
        } else {
            yield put(postALCSCHLBTHError(response?.data?.message));
        }
    } catch (e) {
        yield put(postALCSCHLBTHError(e.message));
    }
}

export function* alcScdlBatch() {
    yield takeLatest(actions.POST_ALCSCHLBTH_REQUEST, runAllocScdlBatch);
}


function* updBthDate(action) {
    try {
        const response = yield call(axiosCall, "POST", API.UPDATEBTHDATE, action.payload);
        if (response?.status == 200) {
            yield put(postUPDBTHDATESuccess({ updBthDtStatus: response?.data }));
        } else {
            yield put(postUPDBTHDATEError(response?.data?.message));
        }
    } catch (e) {
        yield put(postUPDBTHDATEError(e.message));
    }
}

export function* updBthDt() {
    yield takeLatest(actions.POST_UPDBTHDATE_REQUEST, updBthDate);
}
