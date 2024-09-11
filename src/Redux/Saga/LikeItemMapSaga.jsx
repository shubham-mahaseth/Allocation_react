import { call, put, takeLatest } from "redux-saga/effects";
import {
  getAllocItemsSuccess,
  getAllocItemsError,
  postLIkeInsertSuccess,
  postLIkeInsertError,
  postDelMappedSuccess,
  postDelMappedError,
  postMapItemsError,
  postMapItemsSuccess,
  postNOOFSKUSError,
  postNOOFSKUSSuccess,
} from "../Action/likeItemMap";
import {
  getALLOCHEADDETAILSSuccess,
  getALLOCHEADDETAILSError,
  getALLOCNODETAILSSuccess,
    getALLOCNODETAILSError,
} from "../Action/quantityLimits";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";


function* fetchAllocItemsSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHALLOCITEMS,action.payload);
    if (response?.status == 200) {
      yield put(getAllocItemsSuccess({ likeItemTableData: response?.data }));
    } else {
      yield put(getAllocItemsError(response?.data?.message));
    }
  } catch (e) {
    yield put(getAllocItemsError(e.message));
  }
}

export function* likeItemTableData() {
  yield takeLatest(actions.GET_ALLOC_ITEMS_REQUEST, fetchAllocItemsSaga);
}
function* insertLikeItem(action) {
try {
  const response = yield call(axiosCall, "POST", API.INSERTLIKEITEM, action.payload);
  if (response?.status == 200) {
    yield put(postLIkeInsertSuccess({ insertLikeItemData: response?.data }));
  } else {
    yield put(postLIkeInsertError(response?.data?.message));
  }
} catch (e) {
  yield put(postLIkeInsertError(e.message));
}
}

export function* insertLikeItemData() {
  yield takeLatest(actions.POST_LIKE_INSERT_REQUEST, insertLikeItem);
}

function* fetchALLOCHEADDETAILSSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHALLOCHEADDETAILS,action.payload);
    // console.log("responsealloc_no",response);
    if (response?.status == 200) {
      yield put(getALLOCHEADDETAILSSuccess({ allocHDetails: response?.data }));
    } else {
      yield put(getALLOCHEADDETAILSError(response?.data?.message));
    }
  } catch (e) {
    yield put(getALLOCHEADDETAILSError(e.message));
  }
}

export function* LIKEALLOCHEADDETAILSData() {
  yield takeLatest(actions.GET_ALLOCHEADDETAILS_REQUEST, fetchALLOCHEADDETAILSSaga);
}


function* fetchALLOCNODETAILSSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHALLOCNODTLS,action.payload);
    // console.log("responsealloc_no",response);
    if (response?.status == 200) {
      yield put(getALLOCNODETAILSSuccess({ allocIDs: response?.data }));
    } else {
      yield put(getALLOCNODETAILSError(response?.data?.message));
    }
  } catch (e) {
    yield put(getALLOCNODETAILSError(e.message));
  }
}

export function* LIKEALLOCNODETAILSData() {
  yield takeLatest(actions.GET_ALLOCNODETAILS_REQUEST, fetchALLOCNODETAILSSaga);
}

function* fetchDELMAPPEDITMSSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.DELMAPPEDITMS,action.payload);
    if (response?.status == 200) {
      yield put(postDelMappedSuccess({ Data: response?.data }));
    } else {
      yield put(postDelMappedError(response?.data?.message));
    }
  } catch (e) {
    yield put(postDelMappedError(e.message));
  }
}

export function* DelMappedData() {
  yield takeLatest(actions.POST_DEL_MAPPED_REQUEST, fetchDELMAPPEDITMSSaga);
}

function* fetchMAPITEMSSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.MAPITEMS,action.payload);
    if (response?.status == 200) {
      yield put(postMapItemsSuccess({ Data: response?.data }));
    } else {
      yield put(postMapItemsError(response?.data?.message));
    }
  } catch (e) {
    yield put(postMapItemsError(e.message));
  }
}

export function* MappingItems() {
  yield takeLatest(actions.POST_MAP_ITEMS_REQUEST, fetchMAPITEMSSaga);
}

function* fetchNoofSkusSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.NOOFSKUS,action.payload);
    if (response?.status == 200) {
      yield put(postNOOFSKUSSuccess({ nSkus: response?.data }));
    } else {
      yield put(postNOOFSKUSError(response?.data?.message));
    }
  } catch (e) {
    yield put(postNOOFSKUSError(e.message));
  }
}

export function* NoOfskus() {
  yield takeLatest(actions.POST_NOOFSKUS_REQUEST, fetchNoofSkusSaga);
}