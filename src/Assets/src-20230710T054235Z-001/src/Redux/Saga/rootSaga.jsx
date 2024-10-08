import { all, fork } from "redux-saga/effects";
import StagingProcessing from "./stagingProcessingSaga";
import { ErrorProcessing, updateErrorProcessing, getClassData, getLocationData } from "./errorProcessingSaga";
import { updateSystemConfig, SystemConfig } from "./systemConfigSaga";
import { DailyCountData, StageCountData, ErrorCountData } from "./dashBoardSaga";
import { DailySkuRollupData, getLocationRecData, getDeptRecData } from "./reconciliationSaga";
import { InquiryData } from "./inquirySaga";
import { TransactionReversal, updateTransactionReversal, cancelTransactionReversal, getClassDataTrans, getLocationDataTrans } from "./transactionReversalSaga";
import { CostChange, updateCostChange } from "./CostChangeSaga";
import { GlAccount, updateGlAccount, GLcurrency } from "./glaccountSaga";
import { GlAccountcreation } from "./glaccountSagacreation";
import { FinanceInterface } from "./FinanceInterfaceSaga";
import { DailyView } from "./DailyViewSaga";
import { SubLedgerCost } from "./subLedgerCostSaga";
import { SysConfigcreation, GlPrimary } from "./SysConfigCreationSaga";
import {
  WarehouseData, SupplierData, SuppliersSiteData, PackNoData, PO_TYPEData,
  DIFFData, SkuData, ItemListHead, VPNData, UDAData, POData, HIERData, EXCLUDEUDAData,
  ALLOC_LEVELData, ALLOC_TYPEData, CONTEXT_TYPEData, PROMOTIONData, STATUSData, ALLOCRESULTData,
  ALLOC_CRITERIAData, ALLOCINSERTData, ITEMPARENTData, HIER2Data, HIER3Data, ALLOCRESULTCWHData,
  ASNData, ALLOCRESULTCASNData, TSFData, ALLOCRESULTCTSFData, ALLOCNOData, ALLOC_AVAIL_QTYData,
  ALLOC_AVAIL_SEARCHData, UPDATESELINDCREATEData, switchTabData, DELETECREATEGRIDData,
  CREATEREFRESHGRIDData, SPLITCREATEFUNCTIONData, calcfuncData, ALLOCDTLVALData, ALLOCDTLRTVData,
  ErrorReportData, APPROVEFUNCTIONtData, APPROVEVALIDFUNCTIONtData, CREATEGRIDDFfuncData, RESERVEFUNCTIONtData, WORKSHEETFUNCTIONtData,
  SpreadAllocData, SizeProData, SchdlSvData, SchdlRtvData, AllocQty, COMMITDATAData,
  CopyAD, fetchNN, MULTIPOCREATEData, VALIDRLCHECKDATAData, ADSaveCall, SDSaveCall
} from "./CreateAllocationSaga";
import {
  ALLOCHEADDETAILSData, QTYLIMITSData, ALLOCNODETAILSData,
  UPDATEQTYLIMITSData, OKQTYLIMITSSRNData
} from "./quantityLimitsSaga";
import {
  likeItemTableData, insertLikeItemData, LIKEALLOCHEADDETAILSData,
  LIKEALLOCNODETAILSData, DelMappedData, MappingItems, NoOfskus
} from "./LikeItemMapSaga";
import {
  RULESTYPEData, NEEDTYPEData, ALLOCATETOTYPEData, HIERARCHYTYPEData,
  FETCHLOCATIONDATAData, LOCATIONRLData, LOCATIONLISTRLData,
  LOCATIONTRAITSRLData, CLEARANCERLData, STATUSRLData, UPDATERULESRLRLData,
  UPDATELOCATIONRLData, DELETELOCATIONRLData, LOADWEIGHTCHANGERLData,
  LOADRULEDATERLData, RETRIEVERULEDATERLData, UPDATECHANGEWEIGHTSRLData, FETCHLOCGRIDData,
  UPDATEWHINDRLData, UPDATESIZEPROFILEINDRLData, INSLOCRLData, RTVRLDATA
} from "./RulesLocationSaga";
import {
  SIZEDETAILSfuncData, SIZEHEADERDETAILSfuncData, SIZEUPDATEDETAILSfuncData,
} from "./sizeDetailsSaga";
import {
  RETRIEVEWHATIFfuncData, POTYPEWHATIFfuncData, SUPPLIERWHATIFfuncData,
  SUBMITWHATIFfuncData, ORIGINCRTYWHATIFfuncData, RETRIEVEWHATIFPOfuncData, SUBMITWHATIFPOfuncData,
  RtvPoPrvData, CrtPOData, UpdatePOData
} from "./WhatIFSaga";
import { AllStsData, AllocIdsData, SearchASYData, SwitchASYData, CopyASYData, ValidASYData } from "./AllocationSummarySaga";
import { AllocDPkData, grid1ADPk, grid2ADPk, ADValidation, updateAdpk, restoreAdpk } from "./AllocDPkSaga";
import { AllocDashUserAlloc, AllocDashReleaseCount, AllocDashAllocCount, } from "./AllocDashboardSaga";

export function* rootSaga() {
  yield all([
    fork(StagingProcessing),
    fork(ErrorProcessing),
    fork(updateErrorProcessing),
    fork(getClassData),
    fork(getLocationData),
    fork(SystemConfig),
    fork(updateSystemConfig),
    fork(DailyCountData),
    fork(StageCountData),
    fork(ErrorCountData),
    fork(DailySkuRollupData),
    fork(getDeptRecData),
    fork(getLocationRecData),
    fork(InquiryData),
    fork(TransactionReversal),
    fork(updateTransactionReversal),
    fork(getClassDataTrans),
    fork(getLocationDataTrans),
    fork(cancelTransactionReversal),
    fork(CostChange),
    fork(updateCostChange),
    fork(updateGlAccount),
    fork(GlAccount),
    fork(GLcurrency),
    fork(GlAccountcreation),
    fork(FinanceInterface),
    fork(DailyView),
    fork(SubLedgerCost),
    fork(SysConfigcreation),
    fork(GlPrimary),
    fork(WarehouseData),
    fork(SupplierData),
    fork(SuppliersSiteData),
    fork(PackNoData),
    fork(DIFFData),
    fork(SkuData),
    fork(ItemListHead),
    fork(VPNData),
    fork(UDAData),
    fork(POData),
    fork(PO_TYPEData),
    fork(HIERData),
    fork(EXCLUDEUDAData),
    fork(ALLOC_LEVELData),
    fork(ALLOC_TYPEData),
    fork(CONTEXT_TYPEData),
    fork(PROMOTIONData),
    fork(STATUSData),
    fork(ALLOCRESULTData),
    fork(ALLOC_CRITERIAData),
    fork(ALLOCINSERTData),
    fork(ITEMPARENTData),
    fork(HIER2Data),
    fork(HIER3Data),
    fork(ALLOCRESULTCWHData),
    fork(ASNData),
    fork(ALLOCRESULTCASNData),
    fork(TSFData),
    fork(ALLOCRESULTCTSFData),
    fork(ALLOCNOData),
    fork(ALLOCHEADDETAILSData),
    fork(QTYLIMITSData),
    fork(ALLOCNODETAILSData),
    fork(UPDATEQTYLIMITSData),
    fork(likeItemTableData),
    fork(insertLikeItemData),
    fork(LIKEALLOCHEADDETAILSData),
    fork(LIKEALLOCNODETAILSData),
    fork(ALLOC_AVAIL_QTYData),
    fork(ALLOC_AVAIL_SEARCHData),
    fork(RULESTYPEData),
    fork(NEEDTYPEData),
    fork(HIERARCHYTYPEData),
    fork(ALLOCATETOTYPEData),
    fork(FETCHLOCATIONDATAData),
    fork(LOCATIONRLData),
    fork(LOCATIONLISTRLData),
    fork(LOCATIONTRAITSRLData),
    fork(CLEARANCERLData),
    fork(STATUSRLData),
    fork(UPDATERULESRLRLData),
    fork(UPDATELOCATIONRLData),
    fork(DELETELOCATIONRLData),
    fork(LOADWEIGHTCHANGERLData),
    fork(LOADRULEDATERLData),
    fork(RETRIEVERULEDATERLData),
    fork(UPDATECHANGEWEIGHTSRLData),
    fork(UPDATESELINDCREATEData),
    fork(FETCHLOCGRIDData),
    fork(switchTabData),
    fork(DELETECREATEGRIDData),
    fork(OKQTYLIMITSSRNData),
    fork(CREATEREFRESHGRIDData),
    fork(SPLITCREATEFUNCTIONData),
    fork(UPDATEWHINDRLData),
    fork(UPDATESIZEPROFILEINDRLData),
    fork(INSLOCRLData),
    fork(RTVRLDATA),
    fork(DelMappedData),
    fork(MappingItems),
    fork(calcfuncData),
    fork(SIZEDETAILSfuncData),
    fork(SIZEHEADERDETAILSfuncData),
    fork(SIZEUPDATEDETAILSfuncData),
    fork(ALLOCDTLVALData),
    fork(ALLOCDTLRTVData),
    fork(RETRIEVEWHATIFfuncData),
    fork(SUBMITWHATIFfuncData),
    fork(POTYPEWHATIFfuncData),
    fork(SUPPLIERWHATIFfuncData),
    fork(ORIGINCRTYWHATIFfuncData),
    fork(ErrorReportData),
    fork(RETRIEVEWHATIFPOfuncData),
    fork(SUBMITWHATIFPOfuncData),
    // Allocation summary
    fork(AllStsData),
    fork(AllocIdsData),
    fork(APPROVEFUNCTIONtData),
    fork(APPROVEVALIDFUNCTIONtData),
    fork(CREATEGRIDDFfuncData),
    fork(SearchASYData),
    fork(SwitchASYData),
    fork(CopyASYData),
    fork(ValidASYData),
    fork(RESERVEFUNCTIONtData),
    fork(WORKSHEETFUNCTIONtData),
    fork(SpreadAllocData),
    fork(SizeProData),
    fork(SchdlSvData),
    fork(SchdlRtvData),
    fork(AllocQty),
    fork(COMMITDATAData),
    fork(CopyAD),
    fork(fetchNN),
    fork(AllocDPkData),
    fork(grid1ADPk),
    fork(grid2ADPk),
    fork(ADValidation),
    fork(updateAdpk),
    fork(restoreAdpk),
    fork(NoOfskus),
    fork(MULTIPOCREATEData),
    fork(VALIDRLCHECKDATAData),
    fork(ADSaveCall),
    fork(SDSaveCall),
    fork(RtvPoPrvData),
    fork(CrtPOData),
    fork(UpdatePOData),
    fork(AllocDashUserAlloc),
    fork(AllocDashReleaseCount),
    fork(AllocDashAllocCount),
  ]);
}
