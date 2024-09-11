import { call, put, takeLatest } from "redux-saga/effects";
import {
  getRULESTYPESuccess,
  getRULESTYPEError,
  getNEEDTYPESuccess,
  getNEEDTYPEError,
  getHIERARCHYTYPESuccess,
  getHIERARCHYTYPEError,
  getALLOCATETOTYPESuccess,
  getALLOCATETOTYPEError,
  getFETCHLOCATIONDATASuccess,
  getFETCHLOCATIONDATAError,
  getLOCATIONRLSuccess,
  getLOCATIONRLError,
  getLOCATIONLISTRLSuccess,
  getLOCATIONLISTRLError,
  getLOCATIONTRAITSRLSuccess,
  getLOCATIONTRAITSRLError,
  getCLEARANCERLSuccess,
  getCLEARANCERLError,
  getSTATUSRLSuccess,
  getSTATUSRLError,
  getUPDATERULESRLRLSuccess,
  getUPDATERULESRLRLError,
  getUPDATELOCATIONRLSuccess,
  getUPDATELOCATIONRLError,
  getDELETELOCATIONRLSuccess,
  getDELETELOCATIONRLError,
  getLOADWEIGHTCHANGERLSuccess,
  getLOADWEIGHTCHANGERLError,
  getLOADRULEDATERLSuccess,
  getLOADRULEDATERLError,
  getRETRIEVERULEDATERLSuccess,
  getRETRIEVERULEDATERLError,
  getUPDATECHANGEWEIGHTSRLSuccess,
  getUPDATECHANGEWEIGHTSRLError,
  getFETCHLOCGRIDSuccess,
  getFETCHLOCGRIDError,
  getUPDATEWHINDRLSuccess,
  getUPDATEWHINDRLError,
  getUPDATESIZEPROFILEINDRLSuccess,
  getUPDATESIZEPROFILEINDRLError,
  getINSLOCRLSuccess,
  getINSLOCRLError,
  getRTVRLDATASuccess,
  getRTVRLDATAError,
  postRULESAVETEMPLATESuccess,
  postRULESAVETEMPLATEError,
  postRLLOCSAVETEMPLATESuccess,
  postRLLOCSAVETEMPLATEError,
  getRULETEMPLATENAMESuccess,
  getRULETEMPLATENAMEError,
  getRLLOCTEMPLATENAMESuccess,
  getRLLOCTEMPLATENAMEError,
  postFETCHRULETEMPLATESuccess,
  postFETCHRULETEMPLATEError,
  postFETCHRLLOCTEMPLATESuccess,
  postFETCHRLLOCTEMPLATEError,
} from "../Action/rules&location";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";


function* fetchRULESTYPESaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHRULETYPE, action.payload);
    if (response?.status == 200) {
      yield put(getRULESTYPESuccess({ ruleType: response?.data }));
    } else {
      yield put(getRULESTYPEError(response?.data?.message));
    }
  } catch (e) {
    yield put(getRULESTYPEError(e.message));
  }
}

export function* RULESTYPEData() {
  yield takeLatest(actions.GET_RULESTYPE_REQUEST, fetchRULESTYPESaga);
}

function* fetchNEEDTYPESaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHNEED, action.payload);
    if (response?.status == 200) {
      yield put(getNEEDTYPESuccess({ Need: response?.data }));
    } else {
      yield put(getNEEDTYPEError(response?.data?.message));
    }
  } catch (e) {
    yield put(getNEEDTYPEError(e.message));
  }
}

export function* NEEDTYPEData() {
  yield takeLatest(actions.GET_NEEDTYPE_REQUEST, fetchNEEDTYPESaga);
}


function* fetchHIERARCHYTYPESaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHHIERARCHY, action.payload);
    // console.log("responsealloc_no",response);
    if (response?.status == 200) {
      yield put(getHIERARCHYTYPESuccess({ Hierarchy: response?.data }));
    } else {
      yield put(getHIERARCHYTYPEError(response?.data?.message));
    }
  } catch (e) {
    yield put(getHIERARCHYTYPEError(e.message));
  }
}

export function* HIERARCHYTYPEData() {
  yield takeLatest(actions.GET_HIERARCHYTYPE_REQUEST, fetchHIERARCHYTYPESaga);
}


function* fetchALLOCATETOTYPESaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHALLOCATETO, action.payload);
    // console.log("responsealloc_no",response);
    if (response?.status == 200) {
      yield put(getALLOCATETOTYPESuccess({ Allocateto: response?.data }));
    } else {
      yield put(getALLOCATETOTYPEError(response?.data?.message));
    }
  } catch (e) {
    yield put(getALLOCATETOTYPEError(e.message));
  }
}

export function* ALLOCATETOTYPEData() {
  yield takeLatest(actions.GET_ALLOCATETOTYPE_REQUEST, fetchALLOCATETOTYPESaga);
}

function* fetchFETCHLOCATIONDATASaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHLOCATIONDATA, action.payload);
    // console.log("responsealloc_no",response);
    if (response?.status == 200) {
      yield put(getFETCHLOCATIONDATASuccess({ tableLocData: response?.data }));
    } else {
      yield put(getFETCHLOCATIONDATAError(response?.data?.message));
    }
  } catch (e) {
    yield put(getFETCHLOCATIONDATAError(e.message));
  }
}

export function* FETCHLOCATIONDATAData() {
  yield takeLatest(actions.GET_FETCHLOCATIONDATA_REQUEST, fetchFETCHLOCATIONDATASaga);
}


function* fetchLOCATIONRLSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHLOCATIONRL, action.payload);
    if (response?.status == 200) {
      yield put(getLOCATIONRLSuccess({ locationRL: response?.data }));
    } else {
      yield put(getLOCATIONRLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getLOCATIONRLError(e.message));
  }
}

export function* LOCATIONRLData() {
  yield takeLatest(actions.GET_LOCATIONRL_REQUEST, fetchLOCATIONRLSaga);
}

function* fetchLOCATIONLISTRLSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHLOCATIONLISTRL, action.payload);
    if (response?.status == 200) {
      yield put(getLOCATIONLISTRLSuccess({ locationListRL: response?.data }));
    } else {
      yield put(getLOCATIONLISTRLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getLOCATIONLISTRLError(e.message));
  }
}

export function* LOCATIONLISTRLData() {
  yield takeLatest(actions.GET_LOCATIONLISTRL_REQUEST, fetchLOCATIONLISTRLSaga);
}

function* fetchLOCATIONTRAITSRLSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHLOCATIONTRAITSRL, action.payload);
    if (response?.status == 200) {
      yield put(getLOCATIONTRAITSRLSuccess({ locationTraitRL: response?.data }));
    } else {
      yield put(getLOCATIONTRAITSRLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getLOCATIONTRAITSRLError(e.message));
  }
}

export function* LOCATIONTRAITSRLData() {
  yield takeLatest(actions.GET_LOCATIONTRAITSRL_REQUEST, fetchLOCATIONTRAITSRLSaga);
}

function* fetchCLEARANCERLSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHCLEARANCERL, action.payload);
    if (response?.status == 200) {
      yield put(getCLEARANCERLSuccess({ clearanceRL: response?.data }));
    } else {
      yield put(getCLEARANCERLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getCLEARANCERLError(e.message));
  }
}

export function* CLEARANCERLData() {
  yield takeLatest(actions.GET_CLEARANCERL_REQUEST, fetchCLEARANCERLSaga);
}

function* fetchSTATUSRLSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHSTATUSRL, action.payload);
    if (response?.status == 200) {
      yield put(getSTATUSRLSuccess({ statusRL: response?.data }));
    } else {
      yield put(getSTATUSRLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getSTATUSRLError(e.message));
  }
}

export function* STATUSRLData() {
  yield takeLatest(actions.GET_STATUSRL_REQUEST, fetchSTATUSRLSaga);
}

function* fetchUPDATERULESRLRLSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATERULESRL, action.payload);
    console.log("updateRulesRL222111::", response);
    if (response?.status == 200) {
      yield put(getUPDATERULESRLRLSuccess({ RetrieveChangeWeightsRL: response?.data }));
    } else {
      yield put(getUPDATERULESRLRLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getUPDATERULESRLRLError(e.message));
  }
}

export function* UPDATERULESRLRLData() {
  yield takeLatest(actions.GET_UPDATERULESRLRL_REQUEST, fetchUPDATERULESRLRLSaga);
}


function* fetchUPDATELOCATIONRLSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATELOCATIONRL, action.payload);
    if (response?.status == 200) {
      yield put(getUPDATELOCATIONRLSuccess({ updateLocationRL: response?.data }));
    } else {
      yield put(getUPDATELOCATIONRLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getUPDATELOCATIONRLError(e.message));
  }
}

export function* UPDATELOCATIONRLData() {
  yield takeLatest(actions.GET_UPDATELOCATIONRL_REQUEST, fetchUPDATELOCATIONRLSaga);
}


function* fetchDELETELOCATIONRLSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.DELETELOCATIONRL, action.payload);
    if (response?.status == 200) {
      yield put(getDELETELOCATIONRLSuccess({ deleteLocationRL: response?.data }));
    } else {
      yield put(getDELETELOCATIONRLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getDELETELOCATIONRLError(e.message));
  }
}

export function* DELETELOCATIONRLData() {
  yield takeLatest(actions.GET_DELETELOCATIONRL_REQUEST, fetchDELETELOCATIONRLSaga);
}


function* fetchLOADWEIGHTCHANGERLSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.LOADWEIGHTCHANGERL, action.payload);
    if (response?.status == 200) {
      yield put(getLOADWEIGHTCHANGERLSuccess({ loadWeightChangeRL: response?.data }));
    } else {
      yield put(getLOADWEIGHTCHANGERLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getLOADWEIGHTCHANGERLError(e.message));
  }
}

export function* LOADWEIGHTCHANGERLData() {
  yield takeLatest(actions.GET_LOADWEIGHTCHANGERL_REQUEST, fetchLOADWEIGHTCHANGERLSaga);
}


function* fetchLOADRULEDATERLSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.LOADRULEDATERL, action.payload);
    if (response?.status == 200) {
      yield put(getLOADRULEDATERLSuccess({ loadRuledateRL: response?.data }));
    } else {
      yield put(getLOADRULEDATERLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getLOADRULEDATERLError(e.message));
  }
}

export function* LOADRULEDATERLData() {
  yield takeLatest(actions.GET_LOADRULEDATERL_REQUEST, fetchLOADRULEDATERLSaga);
}


function* fetchRETRIEVERULEDATERLSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.RETRIEVERULEDATERL, action.payload);
    if (response?.status == 200) {
      yield put(getRETRIEVERULEDATERLSuccess({ retrieveRuleDateRL: response?.data }));
    } else {
      yield put(getRETRIEVERULEDATERLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getRETRIEVERULEDATERLError(e.message));
  }
}

export function* RETRIEVERULEDATERLData() {
  yield takeLatest(actions.GET_RETRIEVERULEDATERL_REQUEST, fetchRETRIEVERULEDATERLSaga);
}



function* fetchUPDATECHANGEWEIGHTSRLSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATECHANGEWEIGHTSRL, action.payload);
    if (response?.status == 200) {
      yield put(getUPDATECHANGEWEIGHTSRLSuccess({ updateChangeWeightsRL: response?.data }));
    } else {
      yield put(getUPDATECHANGEWEIGHTSRLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getUPDATECHANGEWEIGHTSRLError(e.message));
  }
}

export function* UPDATECHANGEWEIGHTSRLData() {
  yield takeLatest(actions.GET_UPDATECHANGEWEIGHTSRL_REQUEST, fetchUPDATECHANGEWEIGHTSRLSaga);
}


function* fetchFETCHLOCGRIDSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHLOCGRID, action.payload);
    if (response?.status == 200) {
      yield put(getFETCHLOCGRIDSuccess({ locGrid: response?.data }));
    } else {
      yield put(getFETCHLOCGRIDError(response?.data?.message));
    }
  } catch (e) {
    yield put(getFETCHLOCGRIDError(e.message));
  }
}

export function* FETCHLOCGRIDData() {
  yield takeLatest(actions.GET_FETCHLOCGRID_REQUEST, fetchFETCHLOCGRIDSaga);
}

function* fetchUPDATESIZEPROFILEINDRLSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATESIZEPROFILEINDRL, action.payload);
    if (response?.status == 200) {
      yield put(getUPDATESIZEPROFILEINDRLSuccess({ updatesizeprofileindrl: response?.data }));
    } else {
      yield put(getUPDATESIZEPROFILEINDRLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getUPDATESIZEPROFILEINDRLError(e.message));
  }
}

export function* UPDATESIZEPROFILEINDRLData() {
  yield takeLatest(actions.GET_UPDATESIZEPROFILEINDRL_REQUEST, fetchUPDATESIZEPROFILEINDRLSaga);
}


function* fetchUPDATEWHINDRLSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATEWHINDRL, action.payload);
    if (response?.status == 200) {
      yield put(getUPDATEWHINDRLSuccess({ updatewhindrl: response?.data }));
    } else {
      yield put(getUPDATEWHINDRLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getUPDATEWHINDRLError(e.message));
  }
}
export function* UPDATEWHINDRLData() {
  yield takeLatest(actions.GET_UPDATEWHINDRL_REQUEST, fetchUPDATEWHINDRLSaga);
}


function* fetchINSLOCRLSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.INSLOCRL, action.payload);
    console.log("ertyuio", response);
    if (response?.status == 200) {
      yield put(getINSLOCRLSuccess({ inslocrl: response?.data }));
    } else {
      yield put(getINSLOCRLError(response?.data?.message));
    }
  } catch (e) {
    yield put(getINSLOCRLError(e.message));
  }
}


export function* INSLOCRLData() {
  yield takeLatest(actions.GET_INSLOCRL_REQUEST, fetchINSLOCRLSaga);
}

function* fetchRTVRLDATASaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.RTVRLDATA, action.payload);
    if (response?.status == 200) {
      yield put(getRTVRLDATASuccess({ rtvrldata: response?.data }));
    } else {
      yield put(getRTVRLDATAError(response?.data?.message));
    }
  } catch (e) {
    yield put(getRTVRLDATAError(e.message));
  }
}

export function* RTVRLDATA() {
  yield takeLatest(actions.GET_RTVRLDATA_REQUEST, fetchRTVRLDATASaga);
}

/* RL TEMPLATE STARTS */
function* fetchRuleTemplateSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.RULESAVETEMPLATE, action.payload);
    if (response?.status == 200) {
      yield put(postRULESAVETEMPLATESuccess({ ruleTemplateData: response?.data }));
    } else {
      yield put(postRULESAVETEMPLATEError(response?.data?.message));
    }
  } catch (e) {
    yield put(postRULESAVETEMPLATEError(e.message));
  }
}

export function* funcRuleTemplate() {
  yield takeLatest(actions.POST_RULESAVETEMPLATE_REQUEST, fetchRuleTemplateSaga);
}

function* fetchLocTemplateSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.RLLOCSAVETEMPLATE, action.payload);
    if (response?.status == 200) {
      yield put(postRLLOCSAVETEMPLATESuccess({ locTemplateData: response?.data }));
    } else {
      yield put(postRLLOCSAVETEMPLATEError(response?.data?.message));
    }
  } catch (e) {
    yield put(postRLLOCSAVETEMPLATEError(e.message));
  }
}

export function* funcLocTemplate() {
  yield takeLatest(actions.POST_RLLOCSAVETEMPLATE_REQUEST, fetchLocTemplateSaga);
}

function* ruleTemplateNameSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.RULETEMPLATENAME, action.payload);
    if (response?.status == 200) {
      yield put(getRULETEMPLATENAMESuccess({ ruleTemplateNameData: response?.data }));
    } else {
      yield put(getRULETEMPLATENAMEError(response?.data?.message));
    }
  } catch (e) {
    yield put(getRULETEMPLATENAMEError(e.message));
  }
}

export function* FetchRuleTempNameData() {
  yield takeLatest(actions.GET_RULETEMPLATENAME_REQUEST, ruleTemplateNameSaga);
}

function* locTemplateNameSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.RLLOCTEMPLATENAME, action.payload);
    if (response?.status == 200) {
      yield put(getRLLOCTEMPLATENAMESuccess({ locTemplateNameData: response?.data }));
    } else {
      yield put(getRLLOCTEMPLATENAMEError(response?.data?.message));
    }
  } catch (e) {
    yield put(getRLLOCTEMPLATENAMEError(e.message));
  }
}

export function* FetchLocTempNameData() {
  yield takeLatest(actions.GET_RLLOCTEMPLATENAME_REQUEST, locTemplateNameSaga);
}

function* fetchRuleTemplateDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHRULETEMPLATE, action.payload);
    if (response?.status == 200) {
      yield put(postFETCHRULETEMPLATESuccess({ fetchRuleTemplateData: response?.data }));
    } else {
      yield put(postFETCHRULETEMPLATEError(response?.data?.message));
    }
  } catch (e) {
    yield put(postFETCHRULETEMPLATEError(e.message));
  }
}

export function* funcRuleTemplateData() {
  yield takeLatest(actions.POST_FETCHRULETEMPLATE_REQUEST, fetchRuleTemplateDataSaga);
}

function* fetchLocTemplateDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHRLLOCTEMPLATE, action.payload);
    if (response?.status == 200) {
      yield put(postFETCHRLLOCTEMPLATESuccess({ fetchLocTemplateData: response?.data }));
    } else {
      yield put(postFETCHRLLOCTEMPLATEError(response?.data?.message));
    }
  } catch (e) {
    yield put(postFETCHRLLOCTEMPLATEError(e.message));
  }
}

export function* funcLocTemplateData() {
  yield takeLatest(actions.POST_FETCHRLLOCTEMPLATE_REQUEST, fetchLocTemplateDataSaga);
}

/* RL TEMPLATE ENDS */