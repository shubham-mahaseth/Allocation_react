import { call, put, takeLatest } from "redux-saga/effects";
import {
    postRETRIEVEWHATIFSuccess,
    postRETRIEVEWHATIFError,
    postSUBMITWHATIFSuccess,
    postSUBMITWHATIFError,
    postPOTYPEWHATIFSuccess,
    postPOTYPEWHATIFError,
    postSUPPLIERWHATIFSuccess,
    postSUPPLIERWHATIFError,
    postORIGINCRTYWHATIFSuccess,
    postORIGINCRTYWHATIFError,
    //WHATIF PO 
    postRETRIEVEWHATIFPOSuccess,
    postRETRIEVEWHATIFPOError,
    postSUBMITWHATIFPOSuccess,
    postSUBMITWHATIFPOError,
    //PO PREVIEW
    postRtvPoPrvPOSuccess, postRtvPoPrvError,
    postCrtPoSuccess, postCrtPoError,
    postUpdatePOSuccess, postUpdatePOError
} from "../Action/whatIF";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";
import { postRTVADPACKSuccess } from "../Action/AllocDPk";

function* fetchRETRIEVEWHATIFSaga(action) {
    try {
        const response = yield call(axiosCall, "POST", API.RETRIEVEWHATIF, action.payload);
        if (response?.status == 200) {
            yield put(postRETRIEVEWHATIFSuccess({ ItemWHDetailsData: response?.data }));
        } else {
            yield put(postRETRIEVEWHATIFError(response?.data?.message));
        }
    } catch (e) {
        yield put(postRETRIEVEWHATIFError(e.message));
    }
}

export function* RETRIEVEWHATIFfuncData() {
    yield takeLatest(actions.POST_RETRIEVEWHATIF_REQUEST, fetchRETRIEVEWHATIFSaga);
}


function* fetchSUBMITWHATIFSaga(action) {
    try {
        const response = yield call(axiosCall, "POST", API.SUBMITWHATIF, action.payload);
        if (response?.status == 200) {
            yield put(postSUBMITWHATIFSuccess({ SubmitItemWHDetailsData: response?.data }));
        } else {
            yield put(postSUBMITWHATIFError(response?.data?.message));
        }
    } catch (e) {
        yield put(postSUBMITWHATIFError(e.message));
    }
}

export function* SUBMITWHATIFfuncData() {
    yield takeLatest(actions.POST_SUBMITWHATIF_REQUEST, fetchSUBMITWHATIFSaga);
}

function* fetchPOTYPEWHATIFSaga(action) {
    try {
        const response = yield call(axiosCall, "GET", API.POTYPEWHATIF, action.payload);
        if (response?.status == 200) {
            yield put(postPOTYPEWHATIFSuccess({ POTypeWhatIFData: response?.data }));
        } else {
            yield put(postPOTYPEWHATIFError(response?.data?.message));
        }
    } catch (e) {
        yield put(postPOTYPEWHATIFError(e.message));
    }
}

export function* POTYPEWHATIFfuncData() {
    yield takeLatest(actions.POST_POTYPEWHATIF_REQUEST, fetchPOTYPEWHATIFSaga);
}

function* fetchSUPPLIERWHATIFSaga(action) {
    try {
        const response = yield call(axiosCall, "POST", API.SUPPLIERWHATIF, action.payload);
        if (response?.status == 200) {
            yield put(postSUPPLIERWHATIFSuccess({ SupplierWhatIFData: response?.data }));
        } else {
            yield put(postSUPPLIERWHATIFError(response?.data?.message));
        }
    } catch (e) {
        yield put(postSUPPLIERWHATIFError(e.message));
    }
}

export function* SUPPLIERWHATIFfuncData() {
    yield takeLatest(actions.POST_SUPPLIERWHATIF_REQUEST, fetchSUPPLIERWHATIFSaga);
}

function* fetchORIGINCRTYWHATIFSaga(action) {
    try {
        const response = yield call(axiosCall, "POST", API.ORIGINCRTYWHATIF, action.payload);
        if (response?.status == 200) {
            yield put(postORIGINCRTYWHATIFSuccess({ OriginCrtyWhatIFData: response?.data }));
        } else {
            yield put(postORIGINCRTYWHATIFError(response?.data?.message));
        }
    } catch (e) {
        yield put(postORIGINCRTYWHATIFError(e.message));
    }
}

export function* ORIGINCRTYWHATIFfuncData() {
    yield takeLatest(actions.POST_ORIGINCRTYWHATIF_REQUEST, fetchORIGINCRTYWHATIFSaga);
}
///WHATIF PO
function* fetchRETRIEVEWHATIFPOSaga(action) {
    try {
        const response = yield call(axiosCall, "POST", API.RETRIEVEWHATIFPO, action.payload);
        if (response?.status == 200) {
            yield put(postRETRIEVEWHATIFPOSuccess({ WhatIFPOdata: response?.data }));
        } else {
            yield put(postRETRIEVEWHATIFPOError(response?.data?.message));
        }
    } catch (e) {
        yield put(postRETRIEVEWHATIFPOError(e.message));
    }
}

export function* RETRIEVEWHATIFPOfuncData() {
    yield takeLatest(actions.POST_RETRIEVEWHATIFPO_REQUEST, fetchRETRIEVEWHATIFPOSaga);
}


function* fetchSUBMITWHATIFPOSaga(action) {
    try {
        const response = yield call(axiosCall, "POST", API.SUBMITWHATIFPO, action.payload);
        if (response?.status == 200) {
            yield put(postSUBMITWHATIFPOSuccess({ WhatIFPOdata: response?.data }));
        } else {
            yield put(postSUBMITWHATIFPOError(response?.data?.message));
        }
    } catch (e) {
        yield put(postSUBMITWHATIFPOError(e.message));
    }
}

export function* SUBMITWHATIFPOfuncData() {
    yield takeLatest(actions.POST_SUBMITWHATIFPO_REQUEST, fetchSUBMITWHATIFPOSaga);
}

/* PO PREVIEW */

function* fetchRtvPoPrvSaga(action) {
    try {
        const response = yield call(axiosCall, "POST", API.RTVPOPRV, action.payload);
        if (response?.status == 200) {
            yield put(postRtvPoPrvPOSuccess({ poPrvData: response?.data }));
        } else {
            yield put(postRtvPoPrvError(response?.data?.message));
        }
    } catch (e) {
        yield put(postRtvPoPrvError(e.message));
    }
}

export function* RtvPoPrvData() {
    yield takeLatest(actions.POST_RTVPOPRV_REQUEST, fetchRtvPoPrvSaga);
}

function* fetchCreatePOSaga(action) {
    try {
        const response = yield call(axiosCall, "POST", API.CRTPO, action.payload);
        if (response?.status == 200) {
            yield put(postCrtPoSuccess({ CreatePO: response?.data }));
        } else {
            yield put(postCrtPoError(response?.data?.message));
        }
    } catch (e) {
        yield put(postCrtPoError(e.message));
    }
}

export function* CrtPOData() {
    yield takeLatest(actions.POST_CRTPO_REQUEST, fetchCreatePOSaga);
}

function* fetchUpdatePOSaga(action) {
    try {
        const response = yield call(axiosCall, "POST", API.UPDATEPO, action.payload);
        if (response?.status == 200) {
            yield put(postUpdatePOSuccess({ updatePO: response?.data }));
        } else {
            yield put(postUpdatePOError(response?.data?.message));
        }
    } catch (e) {
        yield put(postUpdatePOError(e.message));
    }
}

export function* UpdatePOData() {
    yield takeLatest(actions.POST_UPDATEPO_REQUEST, fetchUpdatePOSaga);
}