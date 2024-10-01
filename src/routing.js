import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import StageProcessing from "./Pages/StageProcessing";
import AdminLayout from "./Pages/Dashboard/AdminLayout";
import ErrorProcessing from "./Components/ErrorProcessing";
import SystemConfig from "./Pages/systemConfig";
import Reconciliation from "./Pages/Reconciliation";
import InquryScreen from "./Pages/inquiry";
import NonInventory from "./Pages/Noninventory";
import Download from "./Pages/StageProcessing/download";
import EditTransaction from "./Pages/editTransaction";
import TransactionReversal from "./Pages/TransactionReversal";
import CostChange from "./Components/CostChange";
import GlAccount from "./Components/GLAccount";
import GLCreation from "./Components/GLCreation";
import FinanceInterface from "./Components/FinanaceInterface";
import DailyView from "./Pages/Daily_view";
import SubLedgerCost from "./Pages/Subledger_cost";
import SystemConfigCreation from "./Pages/systemConfig_Creation";
import CreateAllocation from "./Allocation/CreateScreen";
import AllocSummary from "./Allocation/AllocSummary/AllocSummary";
import AllocDashboard from "./Allocation/Dashboard";
import TemplateDownload from "./Allocation/SeedData/Template";
import DataProcessing from "./Allocation/SeedData/Upload";
import ShowReport from "./Allocation/Reports";
import AdminLayoutPage from "./Admin"
import UserSignup from "./Pages/Auth/UsrRegist";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/stage-processing" element={<StageProcessing />} />
        <Route path="/download" element={<Download />} />
        <Route path="/error-processing" element={<ErrorProcessing />} />
        <Route path="/system-config-maintenance" element={<SystemConfig />} />
        <Route path="/reconciliation" element={<Reconciliation />} />
        <Route path="/inquiry" element={<InquryScreen />} />
        <Route path="/noninventory/" element={<NonInventory />} />
        <Route path="/edit-transaction" element={<EditTransaction />} />
        <Route path="/transaction-reversal" element={<TransactionReversal />} />
        <Route path="/Cost-Maintenance" element={<CostChange />} />
        <Route path="/Account-maintenance" element={<GlAccount />} />
        <Route path="/ACCOUNT-CREATION" element={<GLCreation />} />
        <Route path="/Finance-Interface" element={<FinanceInterface />} />
        <Route path="/Stock-Ledger-View" element={<DailyView />} />
        <Route path="/sub_Ledger_Cost" element={<SubLedgerCost />} />
        <Route path="/system-config-creation" element={<SystemConfigCreation />} /> */}
        <Route path="/CreateAllocation" element={<CreateAllocation screenName={"CreateAllocation"} />} />
        <Route path="/ScheduleAllocation" element={<CreateAllocation screenName={"ScheduleAllocation"} />} />
        <Route path="/AllocSummary" element={<AllocSummary  />} />
        <Route path="/AllocSummary/ACTIVE_ALLOCATION" element={<AllocSummary  DashSearch={"ACTIVE_ALLOCATION"}/>} />
        <Route path="/AllocSummary/SCHEDULED" element={<AllocSummary  DashSearch={"SCHEDULED"}/>} />
        <Route path="/AllocSummary/PO_CREATE" element={<AllocSummary  DashSearch={"PO_CREATE"}/>} />
        <Route path="/AllocDashboard" element={<AllocDashboard />} />
        <Route path="/download_template" element={<TemplateDownload/>}/>
        <Route path="/upload" element={<DataProcessing/>}/>
        <Route path="/report" element={<ShowReport/>}/>
        <Route path="/AdminLayoutPage" element={<AdminLayoutPage />} />

      </Route>
    </Routes>
  );
}

export default Routing;
