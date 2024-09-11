import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";
import {
    postDASHBOARDUSERALLOCSuccess,
    postDASHBOARDUSERALLOCError,
    postDASHBOARDRELEASECOUNTSuccess,
    postDASHBOARDRELEASECOUNTError,
    postDASHBOARDALLOCCOUNTSuccess,
    postDASHBOARDALLOCCOUNTError,
    getDALLOCError,
    getDALLOCSuccess
} from "../Action/AllocDashboard";

function* fetchDashUserAlloc(action) {
    try {
        const response = yield call(axiosCall, "POST", API.DASHBOARDUSERALLOC, action.payload);
        if (response?.status == 200) {
            yield put(postDASHBOARDUSERALLOCSuccess({ DashUserAlloc: response?.data }));
        } else {
            yield put(postDASHBOARDUSERALLOCError(response?.data?.message));
        }
    } catch (e) {
        yield put(postDASHBOARDUSERALLOCError(e.message));
    }
}

export function* AllocDashUserAlloc() {
    yield takeLatest(actions.POST_DASHBOARDUSERALLOC_REQUEST, fetchDashUserAlloc);
}

function* fetchDashReleaseCount(action) {
    try {
        const response = yield call(axiosCall, "POST", API.DASHBOARDRELEASECOUNT, action.payload);
        if (response?.status == 200) {
            yield put(postDASHBOARDRELEASECOUNTSuccess({ DashReleaseCount: response?.data }));
        } else {
            yield put(postDASHBOARDRELEASECOUNTError(response?.data?.message));
        }
    } catch (e) {
        yield put(postDASHBOARDRELEASECOUNTError(e.message));
    }
}

export function* AllocDashReleaseCount() {
    yield takeLatest(actions.POST_DASHBOARDRELEASECOUNT_REQUEST, fetchDashReleaseCount);
}

function* fetchDashAllocCount(action) {
    try {
        const response = yield call(axiosCall, "POST", API.DASHBOARDALLOCCOUNT, action.payload);
        if (response?.status == 200) {
            yield put(postDASHBOARDALLOCCOUNTSuccess({ DashAllocCount: response?.data }));
        } else {
            yield put(postDASHBOARDALLOCCOUNTError(response?.data?.message));
        }
    } catch (e) {
        yield put(postDASHBOARDALLOCCOUNTError(e.message));
    }
}

export function* AllocDashAllocCount() {
    yield takeLatest(actions.POST_DASHBOARDALLOCCOUNT_REQUEST, fetchDashAllocCount);
}


function* fetchDAlloc(action) {
    try {
        const response = yield call(axiosCall, "GET", API.DALLOC, action.payload);
        if (response?.status == 200) {
            yield put(getDALLOCSuccess({ DAlloc: response?.data }));
        } else {
            yield put(getDALLOCError(response?.data?.message));
        }
    } catch (e) {
        yield put(getDALLOCError(e.message));
    }
}

export function* DAllocCall() {
    yield takeLatest(actions.GET_DALLOC_REQUEST, fetchDAlloc);
}
