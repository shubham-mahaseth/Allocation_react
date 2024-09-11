import { combineReducers } from "redux";
import CostChangeReducers from "./CostChangeReducers";
import StagingProcessingReducers from "./stagingProcessingReducers";
import ErrorProcessingReducers from "./errorProcessingReducers";
import SystemConfigReducers from "./systemConfigReducers";
import DashboardReducers from "./dashBoardReducers";
import ReconciliationReducers from "./reconciliationReducers";
import InquiryReducers from "./inquiryReducers";
import TransactionReversalReducers from "./transactionReversalReducers";
import glaccountReducers from "./glaccountReducers";
import glcreationReducers from "./glcreationReducers";
import FinanceInterfaceReducers from "./financeInterfaceReducer";
import DailyViewReducers from "./DailyViewReducers";
import SubLedgerCostReducers from "./subLedgerCostReducers";
import sysconfigcreationReducers from "./SysConfigCreationReducers";
import CreateAllocationReducers from "./CreateAllocationReducers";
import QuantityLimitsReducers from "./quantityLimitsReducers";
import RulesLocationReducers from "./rules&LocationReducers";
import sizeDetailsReducers from "./SizeDetailsReducers";
import WhatIFReducers from "./whatIFReducers";
import AllocationSummaryReducers from "./AllocationSummaryReducers";
import AllocDPkReducers from "./AllocDPkReducers";
import allocDashboardReducers from "./AllocDashboardReducers";
import allocationBatchReducers from "./AllocationBatchReducers";
import seedDataInsertReducers from "./SeedDataInsertReducers";
import ReportsReducers from "./ReportsReducers";

const rootReducer = combineReducers({
  StagingProcessingReducers,
  ErrorProcessingReducers,
  SystemConfigReducers,
  DashboardReducers,
  ReconciliationReducers,
  InquiryReducers,
  TransactionReversalReducers,
  CostChangeReducers,
  glaccountReducers,
  glcreationReducers,
  FinanceInterfaceReducers,
  DailyViewReducers,
  SubLedgerCostReducers,
  sysconfigcreationReducers,
  CreateAllocationReducers,
  QuantityLimitsReducers,
  RulesLocationReducers,
  sizeDetailsReducers,
  WhatIFReducers,
  AllocationSummaryReducers,
  AllocDPkReducers,
  allocDashboardReducers,
  allocationBatchReducers,
  seedDataInsertReducers,
  ReportsReducers,
});

export default rootReducer;
