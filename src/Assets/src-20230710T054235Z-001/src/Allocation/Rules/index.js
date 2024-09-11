import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';

import {
  getALLOCHEADDETAILSRequest,
} from "../../Redux/Action/quantityLimits";
import {
  getINSLOCRLRequest,
  getRULESTYPERequest,
  getNEEDTYPERequest,
  getHIERARCHYTYPERequest,
  getALLOCATETOTYPERequest,
  getUPDATELOCATIONRLRequest,
  getLOADWEIGHTCHANGERLRequest,
  getLOADRULEDATERLRequest,
  getRETRIEVERULEDATERLRequest,
  getUPDATECHANGEWEIGHTSRLRequest,
  getUPDATERULESRLRLRequest,

  getFETCHLOCATIONDATARequest,
  getLOCATIONRLRequest,
  getLOCATIONLISTRLRequest,
  getLOCATIONTRAITSRLRequest,
  getCLEARANCERLRequest,
  getSTATUSRLRequest,
  getFETCHLOCGRIDRequest,
  getDELETELOCATIONRLRequest,
} from "../../Redux/Action/rules&location";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridCellParams, GridCellModes, GridCellModesModel } from "@mui/x-data-grid";
// import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import { makeStyles, withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import { visuallyHidden } from '@mui/utils';
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
// import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControlLabel } from '@material-ui/core';
import makeAnimated from 'react-select/animated';
import Checkbox from '@mui/material/Checkbox';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import swal from "sweetalert";
import { RowingOutlined } from "@mui/icons-material";
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { BsFillEraserFill } from 'react-icons/bs';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import LockIcon from '@mui/icons-material/Lock';
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AnimationIcon from '@mui/icons-material/Animation';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ScaleIcon from '@mui/icons-material/Scale';
import SaveIcon from '@mui/icons-material/Save';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Draggable from 'react-draggable';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DatePicker from 'react-datepicker'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { styled } from '@mui/material/styles';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      bounds="body"
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    width: "calc(95vw - 0px)",
    border: "1px solid red",
    "& table": {
      "& tr": {
        "& td:nth-child(29)": {
          display: "none",
        },
        "& td:nth-child(30)": {
          display: "none",
        },
        "& td:nth-child(31)": {
          display: "none",
        },
      },
    },
  },
  boxDiv: {
    textAlign: "initial",
    position: "relative",
    maxWidth: "1400px",
  },
  uploaddiv: {
    display: "flex",
    alignItems: "center",
    marginTop: "50px",
    textAlign: "start",
    gap: 20,
  },
  TitleHead: {
    position: "sticky",
    top: -1,
  },
  GobackDiv: {
    cursor: "pointer",
  },
  textField: {
    marginRight: "10px !important",
  },
  dateField: {
    "& .MuiInput-input": {
      color: "rgba(102,102,102,1)",
    },
  },
  popUp: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "20px 20px 20px 20px",
  },
  header_container: {
    display: "inline-block",
  },
  float_container: {
    display: "inline-block",
    margin: "0rem 0.3rem",
  },
  header_child: {
    display: "inline-block",
    padding: "0rem 0.2rem",
    verticalAlign: "middle",
  },
  input: {
    height: "30px",
    '& input + fieldset': {
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  },
  inputField: {
    width: "200px",
    height: 25,
    '& input + fieldset': {
      borderRadius: "5px",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  },
  multiselectfield: {
    display: "inline-block",
    margin: "0rem",
    padding: "0rem 0rem",
    verticalAlign: "middle",
  },
  Bottom_container: {
    display: "flex",
    flexWrap: "wrap",
  },
  Bottom_child: {
    display: "inline-block",
    padding: "0rem 0.2rem",
    verticalAlign: "top",
    flex: 1,
    alignItems: "stretch",
  },
  header_child1: {
    display: "inline-block",
    padding: "0px 0px 0px 0px",
    verticalAlign: "middle",
    // marginLeft:"5px",
  },
  divHeight: {
    // flex: 1,
    padding: "0.2em",
    float: "left",
    minHeight: "100%",
  },
  divHeightMain: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-around"
  },
  input: {
    height: "30px",
    '& input + fieldset': { boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px" },
  },
})

const styleSelect6 = {
  control: base => ({
    ...base, width: "180px", fontSize: "12px", margin: "0px 0px 0px 0px",
    minHeight: "30px", border: "1px solid rgb(180, 180, 180)",
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
  }),
  dropdownIndicator: (base) => ({ ...base, paddingTop: 0, paddingBottom: 0, }),
  clearIndicator: (base) => ({ ...base, paddingTop: 0, paddingBottom: 0, }),
  valueContainer: (provided) => ({ ...provided, height: '30px', paddingTop: '0', paddingBottom: '0', }),
  singleValue: (provided) => ({ ...provided, }),
  input: (provided) => ({ ...provided, width: "100%", height: '20px', }),
  option: provided => ({ ...provided, fontSize: "12px", }),
  menu: base => ({ ...base, borderRadius: 0, marginTop: 0 }),
  menuList: base => ({ ...base, padding: 0 }),
};

const styleSelect2 = {
  control: base => ({
    ...base, width: "160px", fontSize: "12px", margin: "0px 0px 0px 0px",
    minHeight: "30px", border: "1px solid rgb(180, 180, 180)",
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
  }),
  dropdownIndicator: (base) => ({ ...base, paddingTop: 0, paddingBottom: 0, }),
  clearIndicator: (base) => ({ ...base, paddingTop: 0, paddingBottom: 0, }),
  valueContainer: (provided) => ({ ...provided, height: '30px', paddingTop: '0', paddingBottom: '0', }),
  singleValue: (provided) => ({ ...provided, }),
  input: (provided) => ({ ...provided, width: "100%", height: '20px', }),
  option: provided => ({ ...provided, fontSize: "12px", }),
  menu: base => ({ ...base, borderRadius: 0, marginTop: 0 }),
  menuList: base => ({ ...base, padding: 0 }),
};

const styleSelect3 = {
  control: base => ({ ...base, fontSize: "12px", minHeight: "20px", textAlign: "center", borderRadius: "0px", border: 0, borderBottom: "1px solid gray" }),
  dropdownIndicator: (base) => ({ ...base, padding: 0, }),
  clearIndicator: (base) => ({ ...base, paddingTop: 0, paddingBottom: 0, }),
  valueContainer: (provided) => ({ ...provided, height: '20px', paddingTop: '0', paddingBottom: '0', }),
  singleValue: (provided) => ({ ...provided, }),
  input: (provided) => ({ ...provided, width: "100%", justifyContent: "left" }),
  option: provided => ({ ...provided, fontSize: "12px", }),
  menu: base => ({ ...base, borderRadius: 0, marginTop: 0, textAlign: "center", }),
  menuList: base => ({ ...base, padding: 0, textAlign: "center", })
};

const styleSelect5 = {
  control: base => ({ ...base, fontSize: "12px", minHeight: "20px", textAlign: "center", borderRadius: "3px", }),
  dropdownIndicator: (base) => ({ ...base, padding: 0, }),
  clearIndicator: (base) => ({ ...base, paddingTop: 0, paddingBottom: 0, }),
  valueContainer: (provided) => ({ ...provided, height: '20px', paddingTop: '0', paddingBottom: '0', }),
  singleValue: (provided) => ({ ...provided, }),
  input: (provided) => ({ ...provided, width: "100%", justifyContent: "left" }),
  option: provided => ({ ...provided, fontSize: "12px", }),
  menu: base => ({ ...base, borderRadius: 0, marginTop: 0, textAlign: "center", }),
  menuList: base => ({ ...base, padding: 0, textAlign: "center", })
};

const animatedComponents = makeAnimated();

// Define a CSS class for the shared styles
const sharedInputClass = {
  fontSize: '12px', height: '22px', backgroundColor: "#fff",
  // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
};
const sharedInputClassDis = {
  fontSize: '12px', height: '22px', backgroundColor: "#f0f0f0",
  // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
};

const sharedInputClass1 = {
  fontSize: '12px', height: '30px', backgroundColor: "#fff", width: "120px", margin: "0px 0px 8px 0px",
  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
};
const sharedInputClassDis1 = {
  fontSize: '12px', height: '30px', backgroundColor: "#f0f0f0", width: "120px", margin: "0px 0px 8px 0px",
  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
};

const dumpData = [
  { LOC: "10", LOC_DESC: "Test store10", DEFAULT_WH: "1001", GROUP_ID: "", GROUP_DESC: "", LIKE_LOC: "", LIKE_LOC_DESC: "", WEIGHT_PCT: "", CLEARANCE_IND: "", ITEM_LOC_STATUS: "", RELEASE_DATE: "" },
  { LOC: "35", LOC_DESC: "Test store35", DEFAULT_WH: "1001", GROUP_ID: "", GROUP_DESC: "", LIKE_LOC: "", LIKE_LOC_DESC: "", WEIGHT_PCT: "", CLEARANCE_IND: "", ITEM_LOC_STATUS: "", RELEASE_DATE: "" },
  { LOC: "45", LOC_DESC: "Test store45", DEFAULT_WH: "1001", GROUP_ID: "", GROUP_DESC: "", LIKE_LOC: "", LIKE_LOC_DESC: "", WEIGHT_PCT: "", CLEARANCE_IND: "", ITEM_LOC_STATUS: "", RELEASE_DATE: "" },
  { LOC: "100", LOC_DESC: "Test store100", DEFAULT_WH: "1001", GROUP_ID: "", GROUP_DESC: "", LIKE_LOC: "", LIKE_LOC_DESC: "", WEIGHT_PCT: "", CLEARANCE_IND: "", ITEM_LOC_STATUS: "", RELEASE_DATE: "" }
]

const initialCopyValues = {
  LIKE_LOC: "",
  LIKE_LOC_DESC: "",
  WEIGHT_PCT: "",
  CLEARANCE_IND: "",
  CLEARANCE_IND_DESC: "",
  ITEM_LOC_STATUS: "",
  ITEM_LOC_STATUS_DESC: "",
}

const LocationHeader = [
  { id: "LOC", label: "Location", width: 80, maxWidth: 80, },
  { id: "LOC_DESC", label: "Location Description", width: 170, maxWidth: 170, },
  // { id: "LOC_TYPE", label: "Loc Type" , width: 100, maxWidth: 100,  },
  { id: "DEFAULT_WH", label: "Default WH", width: 100, maxWidth: 100, },
  { id: "GROUP_ID", label: "Group ID", width: 100, maxWidth: 100, },
  { id: "GROUP_DESC", label: "Group Desc", width: 170, maxWidth: 170, },
  { id: "LIKE_LOC", label: "Allied Loc", width: 120, maxWidth: 120, },
  { id: "LIKE_LOC_DESC", label: "Allied Loc Desc", width: 150, maxWidth: 150, },
  { id: "WEIGHT_PCT", label: "Weight", width: 100, maxWidth: 100, },
  { id: "CLEARANCE_IND", label: "Clearance Flag", width: 120, maxWidth: 120, },
  { id: "ITEM_LOC_STATUS", label: "Status", width: 120, maxWidth: 120, },
  { id: "RELEASE_DATE", label: "Release Date", width: 100, maxWidth: 100, },
]

const WeightsHeader = [
  { id: "EOW", label: "EOW" },
  { id: "WEIGHT", label: "Weight %" },
]


const RulesAndLocation = ({ allocNoData, tab, setTab, setIsValidQtyLimits, setRTabCond, setDisCond,
  rtvrldata, setrtvrldata, setIsLoading, ApproveFreeseCheck, setHeaderCheck,
  setOpenDialog, setDialogData
}) => {
  // const leftContRef = useRef();
  const [submit, setSubmit] = useState([]);
  const [new_table, setNew_table] = useState([])
  const [allocNo, setAllocNo] = useState([]);
  const [allocLevel, setAllocLevel] = useState('');
  const [totalData, setTotalData] = useState([]);
  const [updateRulesRL, setUpdateRulesRL] = useState([]);
  const [tableLocData, setTableLocData] = useState([]);

  const [allocDetails, setAllocDetails] = useState([{}])
  const [LoadCheck, setLoadCheck] = useState(false);
  const [rules, setRules] = useState({});
  const [tableData, settableData] = useState([]);

  const [RetrieveChangeWeightsRL, setRetrieveChangeWeightsRL] = useState([]);

  //Pagniation
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [page, setPage] = React.useState(0);
  const [currentPageData, setcurrentPageData] = useState([]);
  const [currentPageRows, setcurrentPageRows] = useState([]);
  const [allPageSelected, setAllPageSelected] = useState([]);

  const startIndex = page * rowsPerPage;

  const initialLeftRules = {
    RULE_TYPE: "H",  // Rule Definition
    EXACT_IND: "Y",  // Calc Need Type
    RULE_LEVEL: "S", // Hierarchy
    NET_NEED_IND: "Y", // Allocate On

    RULE_TYPE_VAL: "History", // Rule Definition Value
    EXACT_IND_VAL: "Exact", // Calc Need Type Value
    RULE_LEVEL_VAL: "Sku", // Hierarchy Value
    NET_NEED_IND_VAL: "Net Need", // Allocate On Value


    REGULAR_SALES_IND: "Y", // Regular
    PROMO_SALES_IND: "Y", // Promotional
    CLEARANCE_SALES_IND: "N", // Clearance
    SIZE_PROFILE_IND: "N", // Use Size Profile
    ENFORCE_PRES_MIN_IND: "N", // Default Auto prezi. Min & Qty Limits
    ENFORCE_WH_RL: "Y",  // Allocate From Def WH

    START_DATE1: "",
    END_DATE1: "",
    START_DATE2: "",
    END_DATE2: "",
    WEEKS_THIS_YEAR: "",
    WEEKS_LAST_YEAR: "",
    ON_ORDER_COMMIT_WEEKS: "",
    ON_ORDER_COMMIT_DATE: "",

    ALLOC_NO: allocNoData.ALLOC_NO,
    CHANGEWEIGHTSCHECK: "N",
    TEMPLATE_NO: "",
    CASCADE_IND: "",
    USE_RULE_LEVEL_ON_HAND_IND: "",
    INCLUDE_CLEARANCE_STOCK_IND: "",
    INCLUDE_INV_IN_MIN_IND: "",
    INCLUDE_INV_IN_MAX_IND: "",
    IWOS_WEEKS: "",
    WEEKS_FUTURE: "",
    CORPORATE_RULE_ID: "",
    INCLUDE_MID_TIER_ON_HAND_IND: "",
    LEAD_TIME_NEED_IND: "",
    LEAD_TIME_NEED_RULE_TYPE: "",
    LEAD_TIME_NEED_START_DATE: "",
    LEAD_TIME_NEED_END_DATE: "",
    CONVERT_TO_PACK: "",
  }

  const [leftContData, setLeftContData] = useState(initialLeftRules);
  const [selected, setSelected] = useState([{}]);

  const [loading, setLoading] = useState(false);

  const [retreieveRLdataCheck, setRetreieveRLdataCheck] = useState(true);

  const [AllRetreiverRLdataCheck, setAllRetreieveRLdataCheck] = useState(false);
  const [updateLocationRL, setUpdateLocationRL] = React.useState([]);


  useEffect(() => {
    if (retreieveRLdataCheck && rtvrldata.length > 0) {
      var temp1 = convertDateFormat3(rtvrldata[1])
      setInputValue([]);
      setLockCheck(false);
      setInputValue1({});

      var temp2 = convertDateFormat4(rtvrldata[0][0])

      setTotalData(temp1);
      setTableLocData(temp1)
      setUpdateRulesRL([temp2])
      setRetreieveRLdataCheck(false);
      setAllRetreieveRLdataCheck(true);
      const temp = temp1.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
      setcurrentPageData(temp);
      setcurrentPageRows(temp);
      return;
    }

  }, []);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [isExpanded1, setExpanded1] = useState(true);
  const [isExpanded3, setExpanded3] = useState(true);
  const [isExpanded4, setExpanded4] = useState(true);

  /*
         ################################
         ###   BOTTOM   ###
         ################################ 
 */
  const initialsearch = {
    LOCATION: [],
    LOCATION_LIST: [],
    LOCATION_TRAIT: [],
    EXCLUDE_LOCATION: [],
    ALL_STORE: "N",
    ALLOC_NO: allocNoData.ALLOC_NO
  }

  const [searchData, setSearchData] = useState(initialsearch);

  const [check1, setCheck1] = React.useState(true);
  const [check2, setCheck2] = React.useState(true);
  const [check3, setCheck3] = React.useState(false);
  const [check4, setCheck4] = React.useState(false);
  const [check5, setCheck5] = React.useState(false);
  const [check6, setCheck6] = React.useState(false);
  const [check7, setCheck7] = React.useState(false);
  const [check8, setCheck8] = React.useState(false);
  const [check9, setCheck9] = React.useState(false);

  const [AllStoresCheck, setAllStoresCheck] = useState(false);
  const [AllocateDefWH, setAllocateDefWH] = useState(true);

  const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
  const [ManageHeaderData, setManageHeaderData] = useState([]);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [inputValue, setInputValue] = useState({});
  const [inputValue1, setInputValue1] = useState({});
  const [sampleVal, setSampleVal] = useState([]);
  const [sampleVal1, setSampleVal1] = useState([]);
  const [copyValue, setCopyValue] = useState(initialCopyValues);

  const [LockCheck, setLockCheck] = useState(false);

  const [ruleType, setRuleType] = useState([]);
  const [Hierarchy, setHierarchy] = useState([]);
  const [Need, setNeed] = useState([]);
  const [Allocateto, setAllocateto] = useState([]);

  const [countAddCheck, setCountAddCheck] = useState(0);
  const [allData, setAllData] = useState([]);
  const [allDataCheck, setAllDataCheck] = useState(false);

  const [locationRL, setLocationRl] = useState([]);
  const [locationListRL, setLocationListRl] = useState([]);
  const [locationTraitRL, setLocationTraitRl] = useState([]);
  const [locationExculdeRL, setLocationExculdeRl] = useState([]);
  const [likeLocData, setLikeLocData] = useState([]);
  const [clearanceRL, setClearanceRl] = useState([]);
  const [statusRL, setStatusRl] = useState([]);

  const [deleteLocationRL, setDeleteLocationRL] = React.useState([]);
  const [loadWeightChangeRL, setLoadWeightChangeRL] = React.useState([]);
  const [updateChangeWeightsRL, setUpdateChangeWeightsRL] = React.useState([]);

  const [valLoc, setValLoc] = useState([]);
  const [valLoc1, setValLoc1] = useState([]);
  const [valLoc2, setValLoc2] = useState([]);
  const [valLoc3, setValLoc3] = useState([]);
  const [inputLoc, setInputLoc] = useState("");
  const [inputLoc1, setInputLoc1] = useState("");
  const [inputLoc2, setInputLoc2] = useState("");
  const [inputLoc3, setInputLoc3] = useState("");

  const [TotalDataCheck, setTotalDataCheck] = useState(false);

  const [AllocRuleData, setAllocRuleData] = useState({})
  const [AllocRuleDataCheck, setAllocRuleDataCheck] = useState(true)
  const [RetrieveDataCheck, setRetrieveDataCheck] = useState(false);

  const [ChangeWeightsDialog, setChangeWeightsDialog] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  // const [openCalendar, setOpenCalendar] = useState(false);

  // const handleCalendarClick = () => {
  //   setOpenCalendar(!openCalendar);
  // };


  // Manage columns popup in Table Grid
  const [openDialogManage, setOpenDialogManage] = useState(false);

  /*
          ################################
          ###   TOP   ###
          ################################ 
  */
  const [inslocrl, setinslocrl] = useState([]);
  const [InsertLocCheck, setInsertLocCheck] = useState(false);

  // Error popup message
  const [openDialogRL, setOpenDialogRL] = useState(false);
  const [DialogDataRL, setDialogDataRL] = useState("");

  useEffect(() => {
    document.title = 'Rule And Location';
  }, []);

  const RulesLocationData = useSelector(
    (state) => state.RulesLocationReducers
  );

  const dispatch = useDispatch();

  const RulesLocationHeaderClasses = useStyles();

  useEffect(() => {
    setLoading(true);
    setIsLoading(false);
    dispatch(getALLOCHEADDETAILSRequest([allocNoData]));
    setLoadCheck(true);
  }, [""]);

  useEffect(() => {
    if (
      RulesLocationData?.data?.allocDetails
      && Array.isArray(RulesLocationData?.data?.allocDetails)
    ) {
      setAllocDetails(RulesLocationData?.data?.allocDetails);
      if (RulesLocationData?.data?.allocDetails.length > 0) {
        if (RulesLocationData?.data?.allocDetails[0].ALLOC_CRITERIA === "F") {
          setLeftContData((prev) => {
            return {
              ...prev,
              ENFORCE_WH_RL: "N"
            };
          })
        }
      }
      setLoadCheck(false);
      setLoading(false);
    } else if (
      RulesLocationData?.data?.inslocrl
    ) {
      setinslocrl(RulesLocationData?.data?.inslocrl);
      setLoading(false);
      setLoadCheck(false)
    } else {
      setLoading(false);
    }
  }, [RulesLocationData?.data]);

  const handleCancel = () => {
    setTab('1');
    setRTabCond(false);
    setDisCond(0);
    setHeaderCheck(true);
  }

  const ViewModeFunction = () => {
    setTab('1');
    setRTabCond(false);
    setDisCond(0);
  }

  const handlesubmitRules = () => {
    if (totalData.length > 0) {
      if (String(leftContData.RULE_TYPE) === "Manual") {
        setLoading(true);
        setinslocrl([]);
        const temp = totalData.map(obj => ({ ...obj })); // Create a deep copy of each object in totalData

        temp.forEach(obj => { if (String(obj.RELEASE_DATE).length > 0) { obj.RELEASE_DATE = convertDateFormat2(obj.RELEASE_DATE); } });
        const val = convertDateFormat5(leftContData)
        dispatch(getINSLOCRLRequest([[val], temp]));
        setLoadCheck(true);
        setInsertLocCheck(true);
        setrtvrldata([]);
        setHeaderCheck(true);
        setLeftContData((prev) => {
          return {
            ...prev,
            CHANGEWEIGHTSCHECK: "Y"
          };
        })
      } else {
        if (String(leftContData.RULE_TYPE).length > 0 && String(leftContData.EXACT_IND_VAL).length > 0 && String(leftContData.RULE_LEVEL).length > 0 && String(leftContData.NET_NEED_IND_VAL).length > 0) {

          if (String(leftContData.ON_ORDER_COMMIT_WEEKS).length > 0 || String(leftContData.ON_ORDER_COMMIT_DATE).length > 0 ||
            String(leftContData.WEEKS_LAST_YEAR).length > 0 || String(leftContData.WEEKS_THIS_YEAR).length > 0 ||
            String(leftContData.START_DATE1).length > 0 || String(leftContData.END_DATE1).length > 0 ||
            String(leftContData.START_DATE2).length > 0 || String(leftContData.END_DATE2).length > 0) {
            if (String(leftContData.START_DATE1).length > 0 && String(leftContData.END_DATE1).length === 0) {
              setOpenDialogRL(true);
              setDialogDataRL("Start/End Date is required");
            }
            else if (String(leftContData.START_DATE2).length > 0 && String(leftContData.END_DATE2).length === 0) {
              setOpenDialogRL(true);
              setDialogDataRL("Start/End Date is required");
            }
            else if (String(leftContData.END_DATE1).length > 0 && String(leftContData.START_DATE1).length === 0) {
              setOpenDialogRL(true);
              setDialogDataRL("Start/End Date is required");
            }
            else if (String(leftContData.END_DATE2).length > 0 && String(leftContData.START_DATE2).length === 0) {
              setOpenDialogRL(true);
              setDialogDataRL("Start/End Date is required");
            }
            else {
              setLoading(true);
              setinslocrl([]);
              const temp = totalData.map(obj => ({ ...obj })); // Create a deep copy of each object in totalData

              temp.forEach(obj => { if (String(obj.RELEASE_DATE).length > 0) { obj.RELEASE_DATE = convertDateFormat2(obj.RELEASE_DATE); } });
              const val = convertDateFormat5(leftContData)
              dispatch(getINSLOCRLRequest([[val], temp]));
              setLoadCheck(true);
              setInsertLocCheck(true);
              setrtvrldata([]);
              setHeaderCheck(true);
              setLeftContData((prev) => {
                return {
                  ...prev,
                  CHANGEWEIGHTSCHECK: "Y"
                };
              })
            }
          }
          else {
            setOpenDialogRL(true);
            setDialogDataRL("Please give inputs*");
          }

        }
        else {
          setOpenDialogRL(true);
          setDialogDataRL("Please give inputs*");
        }
      }
    }
    else {
      setOpenDialogRL(true);
      setDialogDataRL("Please give inputs*");
    }
  }

  if (InsertLocCheck) {
    if (RulesLocationData?.data?.inslocrl) {
      setOpenDialog(true);
      setDialogData("Rules & Locations: " + String(RulesLocationData?.data?.inslocrl?.message));
      setInsertLocCheck(false);
      setDisCond(0);
      setIsValidQtyLimits(true);
      setTab('1');
    }
  }

  const SearchButtonHeaderDesc = () => (
    <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
      <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
        onClick={() => {
          setOpenDialogRL(true);
          setDialogDataRL(String(allocDetails[0].ALLOC_DESC));
        }}
      />
    </IconButton>
  )
  const [isSHovered, setIsHovered] = useState(false);
  const [isSHovered1, setIsHovered1] = useState(false);

  const handleSEnter = () => { setIsHovered(true); };
  const handleSEnter1 = () => { setIsHovered1(true); };

  const handleSLeave = () => { setIsHovered(false); };
  const handleSLeave1 = () => { setIsHovered1(false); };

  const SearchHeader = () => (
    // <Box
    //   component="fieldset"
    //   display="flex"
    //   sx={{
    //     backgroundColor: "",
    //     height: "auto",
    //     width: "100%",
    //     borderRadius: 1,

    //     boxShadow: 2, border: 0,
    //     borderBottom: 3,
    //     border: "1px solid lightgrey",
    //     // width: "100%",
    //   }}
    // >

    // <legend style={{ fontWeight: "bold" }}>Header</legend>
    <div style={{ display: "flex", }}>
      <div className={RulesLocationHeaderClasses.header_container} style={{ flex: "1 1 auto" }}>
        <div className={RulesLocationHeaderClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Allocation ID</InputLabel>
          </div>
          <div>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 2px",
                width: "100px",
                "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "14px",
                },
                borderRadius: "5px",
                // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              id="outlined-disabled"
              name="ALLOC_NO"

              //   value={searchHeaderData.ALLOC_DESC}
              value={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
              defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
              inputProps={{
                maxLength: 100, //sx: { border: "1px solid red", }
              }}
              InputProps={{
                style: { fontSize: 12 },
                className: RulesLocationHeaderClasses.input,
              }}
              disabled
            />
          </div>
        </div>

        <div className={RulesLocationHeaderClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
              Description</InputLabel>
          </div>
          <div>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 0px", width: "25vh"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "14px",
                },
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
              }}
              id="outlined-disabled"
              name="ALLOC_DESC"
              autoComplete='off'
              value={allocDetails[0].ALLOC_DESC}
              defaultValue={allocDetails[0].ALLOC_DESC}
              // onChange={onChange}
              inputProps={{
                maxLength: 100,
              }}
              InputProps={{
                endAdornment: <SearchButtonHeaderDesc />,
                className: RulesLocationHeaderClasses.input,
                style: { fontSize: 12, height: "30px", backgroundColor: "#f0f0f0", },
              }}
              disabled
            />
          </div>
        </div>

        <div className={RulesLocationHeaderClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
              Alloc Context</InputLabel>
          </div>
          <div className={RulesLocationHeaderClasses.multiselectfield}>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 0px", width: "20vh"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "15px",
                }
              }}
              id="outlined-disabled"
              name="CONTEXT_TYPE"

              value={allocDetails[0].CONTEXT}
              defaultValue={allocDetails[0].CONTEXT}
              // inputProps={{
              //      maxLength: 100, sx: { backgroundColor: '#fff' },
              //  }}
              // InputProps={{
              //      style: { fontSize: 12 },
              //      className: RulesLocationHeaderClasses.input,
              // }}
              inputProps={{
                maxLength: 100, sx: { backgroundColor: '#f0f0f0' },
              }}
              InputProps={{
                // endAdornment: <SearchButtonHeaderDesc />,
                style: { fontSize: 12, backgroundColor: "#f0f0f0", },
                className: RulesLocationHeaderClasses.input,
              }}
              disabled
            />
          </div>
        </div>

        {allocDetails[0].CONTEXT === "Promotion" ?
          [
            <div className={RulesLocationHeaderClasses.header_child}>
              <div>
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                  Promotion</InputLabel>
              </div>
              <div className={RulesLocationHeaderClasses.multiselectfield}>
                <TextField
                  size="small"
                  sx={{
                    margin: "0px 0px 2px 0px", width: "20vh"
                    , "& .MuiInputBase-input.Mui-disabled": {
                      backgroundColor: "#f0f0f0",
                      borderRadius: "5px",
                      height: "15px",
                    }
                  }}
                  id="outlined-disabled"
                  name="PROMOTION"

                  value={allocDetails[0].PROMOTION}
                  defaultValue={allocDetails[0].PROMOTION}
                  inputProps={{
                    maxLength: 100,
                  }}
                  InputProps={{
                    style: { fontSize: 12 },
                    className: RulesLocationHeaderClasses.input,
                  }}
                  disabled
                />
              </div>
            </div>
          ] : null}


        <div className={RulesLocationHeaderClasses.header_child}>
          <div >
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
              Alloc Level</InputLabel>
          </div>
          <div className={RulesLocationHeaderClasses.multiselectfield}>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 0px", width: "20vh"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "15px",
                }
              }}
              id="outlined-disabled"
              name="ALLOC_LEVEL"

              value={allocDetails[0].ALLOC_LEVEL}
              defaultValue={allocDetails[0].ALLOC_LEVEL}
              inputProps={{
                maxLength: 100,
              }}
              InputProps={{
                style: { fontSize: 12 },
                className: RulesLocationHeaderClasses.input,
              }}
              disabled
            />
          </div>
        </div>

        <div className={RulesLocationHeaderClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
              Release Date</InputLabel>
          </div>
          <div>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 0px", width: "140px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "15px",
                }
              }}
              id="outlined-disabled"
              name="RELEASE_DATE"

              value={allocDetails[0].RELEASE_DATE}
              defaultValue={allocDetails[0].RELEASE_DATE}
              inputProps={{
                maxLength: 100,
              }}
              InputProps={{
                style: { fontSize: 12 },
                className: RulesLocationHeaderClasses.input,
              }}
              disabled
            />
          </div>
        </div>

        <div className={RulesLocationHeaderClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
              Status</InputLabel>
          </div>
          <div className={RulesLocationHeaderClasses.multiselectfield}>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 0px", width: "20vh"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "15px",
                }
              }}
              disabled
              name="STATUS"
              value={allocDetails[0].STATUS}
              defaultValue={allocDetails[0].STATUS}
              id="outlined-disabled"
              InputProps={{
                style: { fontSize: 12 },
                className: RulesLocationHeaderClasses.input,
              }}
            />
          </div>
        </div>

        <div className={RulesLocationHeaderClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
              Alloc Type</InputLabel>
          </div>
          <div className={RulesLocationHeaderClasses.multiselectfield}>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 0px", width: "20vh"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "15px",
                }
              }}
              id="outlined-disabled"
              name="ALLOC_TYPE"

              value={allocDetails[0].ALLOC_TYPE}
              defaultValue={allocDetails[0].ALLOC_TYPE}
              inputProps={{
                maxLength: 100,
              }}
              InputProps={{
                style: { fontSize: 12 },
                className: RulesLocationHeaderClasses.input,
              }}
              disabled
            />
          </div>
        </div>

        <div className={RulesLocationHeaderClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
              Allocator</InputLabel>
          </div>
          <div>
            <TextField
              variant="outlined"
              size="small"
              sx={{
                margin: "0px 0px 2px 0px", width: "140px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "15px",
                }
              }}
              disabled
              name="CREATE_ID"
              id="outlined-disabled"
              value={allocDetails[0].ALLOCATOR}
              defaultValue={allocDetails[0].ALLOCATOR}
              InputProps={{
                style: { fontSize: 12 },
                className: RulesLocationHeaderClasses.input,
              }}
            />
          </div>
        </div>
      </div>
      {/* <div style={{
        flex: "0 0 5%",
        overflow: "hidden"
      }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              backgroundColor: isSHovered ? '#f5f5f5' : 'white',
              borderRadius: '50%',
              padding: "10px"
            }}
            title="Search"
            onMouseEnter={handleSEnter}
            onMouseLeave={handleSLeave}
            onClick={toggleDrawer("right", true)}
          >
            <ManageSearchIcon
              variant="contained"
              style={{
                backgroundColor: isSHovered ? '#f5f5f5' : 'white',
              }}
              title="Search"
            />
          </div>
        </div>
      </div> */}
    </div>
    // </Box >
  )


  /*
          ################################
          ###   END TOP   ###
          ################################ 
  */

  /*
        #################################################
        ############ ERROR POP-UP MESSAGE ###############
        #################################################
  */

  const handleCloseDialog = (e) => {
    setOpenDialogRL(false);
    setDialogDataRL("")
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const searchPanel = () => (
    <Box
      sx={{ width: 430, marginTop: "80px", padding: "0px 0px 0px 10px", }}>
      <div>
        {RulesAndLocationsDrawer()}
      </div>
    </Box >
  )

  const RulesAndLocationsDrawer = () => (
    <Box
      sx={{
        width: "435px",
        // border: "1px solid red"
      }}
    >
      <div>
        <Typography
          variant="body1"
          style={{
            cursor: 'pointer', fontSize: "14px", fontWeight: "bold", position: "static", margin: "10px 0px 0px 10px", padding: "0px", width: "410px",
            backgroundColor: "transparent", // Apply background color when expanded 
            color: '#191970',
            borderRadius: '0', // Add border radius when expanded
          }}
        >
          LOCATIONS
        </Typography>

        <div >
          {DrawerLocation()}
        </div>

      </div>

      <div>
        <div className={RulesLocationHeaderClasses.header_child1}>
          <Button
            sx={{
              fontSize: "12px",
              backgroundColor: "",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "13px", marginTop: "10px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            startIcon={<AddCircleOutlineIcon />}
            onClick={HandleAddButton}
            disabled={ApproveFreeseCheck}
            variant="contained">
            Add
          </Button>
        </div>

        <div className={RulesLocationHeaderClasses.header_child1}>
          <Button
            sx={{
              fontSize: "12px",
              backgroundColor: "",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "10px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            startIcon={<RefreshIcon />}
            disabled={ApproveFreeseCheck}
            onClick={handleRefreshRules}
            variant="contained">
            Refresh
          </Button>
        </div>
      </div>
    </Box>
  )

  const handleExpandClickRules = () => {
    setExpanded1(!isExpanded1);
  };

  const handleExpandClickIncludeInv = () => {
    setExpanded3(!isExpanded3);
  };

  const handleExpandClickDateRange = () => {
    setExpanded4(!isExpanded4);
  };

  const DrawerRules = () => (
    <Box sx={{ margin: "0px 0px 5px 10px" }}>
      <div >
        <div >
          <div className={RulesLocationHeaderClasses.header_child} >
            <div >
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
                Rule Definition</InputLabel>
            </div>
            <div >
              <Select
                maxMenuHeight={180}
                classNamePrefix="mySelect"
                getOptionLabel={option =>
                  `${option.CODE_DESC.toString()}`}
                getOptionValue={option => option.CODE_DESC}
                options={ruleType.length > 0 ? ruleType : []}
                isSearchable={true}
                onChange={selectRuleType}
                menuPlacement="auto"
                isDisabled={ApproveFreeseCheck}
                isClearable={true}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                value={ruleType.filter(obj => leftContData?.RULE_TYPE === (obj.CODE))}
                styles={styleSelect2}
                components={animatedComponents}
              />
            </div>
          </div>

          <div className={RulesLocationHeaderClasses.header_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
                Calc Need Type</InputLabel>
            </div>
            <div>
              <Select
                isDisabled={leftContData.RULE_TYPE === "M" || ApproveFreeseCheck}
                maxMenuHeight={180}
                classNamePrefix="mySelect"
                getOptionLabel={option =>
                  `${option.CODE_DESC.toString()}`}
                getOptionValue={option => option.CODE_DESC}
                options={Need.length > 0 ? Need : []}
                isSearchable={true}
                onChange={selectNEEDType}
                menuPlacement="auto"
                isClearable={true}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                value={Need.filter(obj => leftContData?.EXACT_IND === (obj.CODE))}
                styles={styleSelect2}
                components={animatedComponents}
              />
            </div>
          </div>

          <div className={RulesLocationHeaderClasses.header_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
                Hierarchy</InputLabel>
            </div>
            <div>
              <Select
                isDisabled={leftContData.RULE_TYPE === "M" || ApproveFreeseCheck}
                maxMenuHeight={180}
                classNamePrefix="mySelect"
                getOptionLabel={option =>
                  `${option.CODE_DESC.toString()}`}
                getOptionValue={option => option.CODE_DESC}
                options={Hierarchy.length > 0 ? Hierarchy : []}
                isSearchable={true}
                onChange={selectHierarchy}
                menuPlacement="auto"
                isClearable={true}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                styles={styleSelect2}
                components={animatedComponents}
                value={Hierarchy.filter(obj => leftContData?.RULE_LEVEL === (obj.CODE))}
              />
            </div>
          </div>

          <div className={RulesLocationHeaderClasses.header_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
                Allocate On</InputLabel>
            </div>
            <div>
              <Select
                maxMenuHeight={180}
                classNamePrefix="mySelect"
                getOptionLabel={option =>
                  `${option.CODE_DESC.toString()}`}
                getOptionValue={option => option.CODE_DESC}
                options={Allocateto.length > 0 ? Allocateto : []}
                isSearchable={true}
                onChange={selectAllocateTo}
                menuPlacement="auto"
                isClearable={true}
                isDisabled={ApproveFreeseCheck}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                styles={styleSelect2}
                components={animatedComponents}
                value={Allocateto.filter(obj => leftContData?.NET_NEED_IND === (obj.CODE))}
              />
            </div>
          </div>


          <div className={RulesLocationHeaderClasses.header_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 0px", display: 'flex', float: 'left' }}>
                Rules Template:</InputLabel>
            </div>
            <div>

              <Select
                maxMenuHeight={180}
                classNamePrefix="mySelect"
                // getOptionLabel={option =>
                //   `${option.label.toString()}`}
                // getOptionValue={option => option.label}
                // options={optionsTemplates.length > 0 ? optionsTemplates : []}
                isSearchable={true}
                menuPlacement="auto"
                isMulti
                isClearable={true}
                // isDisabled={ApproveFreeseCheck}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                styles={styleSelect2}
                components={animatedComponents}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: "5px", }}>
            <div className={RulesLocationHeaderClasses.header_child}>

              <Button
                sx={{
                  backgroundColor: "",
                  fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                  width: "100px", marginLeft: "0px", marginTop: "0px",
                  '&.Mui-disabled': { opacity: 0.5, backgroundColor: 'DodgerBlue', color: '#fff', },
                }}
                disabled={ApproveFreeseCheck}
                startIcon={<OfflinePinIcon sx={{ padding: 0 }} />}
                variant="contained">
                Apply
              </Button>

            </div>

            <div className={RulesLocationHeaderClasses.header_child}>
              <Button
                sx={{
                  backgroundColor: "",
                  fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                  width: "130px", marginLeft: "0px", marginTop: "0px",
                  '&.Mui-disabled': { opacity: 0.5, backgroundColor: 'DodgerBlue', color: '#fff', },
                }}
                disabled={ApproveFreeseCheck}
                startIcon={<SaveIcon />}
                variant="contained">
                Save Template
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )

  const DrawerLocation = () => (
    <Box sx={{ margin: "0px 0px 0px 10px" }}>
      <div className={RulesLocationHeaderClasses.header_container}>
        <div className={RulesLocationHeaderClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
              Location</InputLabel>
          </div>
          <div>
            <Select
              isDisabled={AllStoresCheck || ApproveFreeseCheck}
              maxMenuHeight={180}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.STORE.toString()} - ${option.STORE_DESC.toString()}`}
              getOptionValue={option => option.STORE}
              options={locationRL.length > 0 ? locationRL : []}
              isSearchable={true}
              onChange={selectLocation}
              menuPlacement="auto"
              isMulti
              isClearable={true}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              styles={styleSelect6}
              value={locationRL.filter(obj => searchData?.LOCATION.includes(obj.STORE))}
              components={animatedComponents}
            />
          </div>
        </div>

        <div className={RulesLocationHeaderClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
              Location List</InputLabel>
          </div>
          <div>
            <Select
              isDisabled={AllStoresCheck || ApproveFreeseCheck}
              maxMenuHeight={180}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.LOC_LIST.toString()} - ${option.LOC_LIST_DESC.toString()}`}
              getOptionValue={option => option.LOC_LIST}
              options={locationListRL.length > 0 ? locationListRL : []}
              isSearchable={true}
              onChange={selectLocationlist}
              menuPlacement="auto"
              isMulti
              isClearable={true}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              styles={styleSelect6}
              value={locationListRL.filter(obj => searchData?.LOCATION_LIST.includes(obj.LOC_LIST))}
              components={animatedComponents}
            />
          </div>
        </div>

        <div className={RulesLocationHeaderClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
              Location Attribute</InputLabel>
          </div>
          <div>
            <Select
              isDisabled={AllStoresCheck || ApproveFreeseCheck}
              maxMenuHeight={180}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.LOC_TRAIT.toString()} - ${option.TRAIT_DESC.toString()}`}
              getOptionValue={option => option.LOC_TRAIT}
              options={locationTraitRL.length > 0 ? locationTraitRL : []}
              isSearchable={true}
              onChange={selectLocationtraits}
              menuPlacement="auto"
              isMulti
              isClearable={true}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              value={locationTraitRL.filter(obj => searchData?.LOCATION_TRAIT.includes(obj.LOC_TRAIT))}
              styles={styleSelect6}
              components={animatedComponents}
            />
          </div>
        </div>


        <div className={RulesLocationHeaderClasses.header_child}>
          <div >
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
                Exclude Location</InputLabel>
            </div>
            <div>
              <Select
                maxMenuHeight={180}
                classNamePrefix="mySelect"
                getOptionLabel={option =>
                  `${option.STORE.toString()} - ${option.STORE_DESC.toString()}`}
                getOptionValue={option => option.STORE}
                options={locationRL.length > 0 ? locationRL : []}
                isSearchable={true}
                onChange={selectExcludedlocation}
                menuPlacement="auto"
                isMulti
                isClearable={true}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                isDisabled={ApproveFreeseCheck}
                value={locationRL.filter(obj => searchData?.EXCLUDE_LOCATION.includes(obj.STORE))}
                styles={styleSelect6}
                components={animatedComponents}
              />

            </div>
          </div>
        </div>

        <div className={RulesLocationHeaderClasses.header_child} >
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
              Location Template :</InputLabel>
          </div>
          <div>
            <Select
              maxMenuHeight={180}
              classNamePrefix="mySelect"
              // getOptionLabel={option =>
              //   `${option.label.toString()}`}
              // getOptionValue={option => option.label}
              // options={optionsTemplates.length > 0 ? optionsTemplates : []}
              isSearchable={true}
              menuPlacement="auto"
              isMulti
              isClearable={true}
              closeMenuOnSelect={true}
              hideSelectedOptions={false}
              // isDisabled={ApproveFreeseCheck}
              styles={styleSelect6}
              components={animatedComponents}
            />
          </div>
        </div>

        <div className={RulesLocationHeaderClasses.header_child} >
          <FormControlLabel
            size="small"
            sx={{ padding: "0px 0px 2px 0px", margin: "0px 0px 0px 3px", }}
            control={
              <Checkbox
                size="small" name="AllStoresCheck"
                style={{ margin: "5px 0px 0px 8px", padding: "2px", }}
                checked={AllStoresCheck}
                onChange={handleswitchRulecheck}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={AllStoresCheck ? { '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', }, } : null}
              />}
            label={<InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left' }}>
              All stores</InputLabel>} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: "5px", }}>
          <div className={RulesLocationHeaderClasses.header_child1}>

            <Button
              sx={{
                backgroundColor: "",
                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                width: "100px", marginLeft: "3px", marginTop: "0px",
                '&.Mui-disabled': { opacity: 0.5, backgroundColor: 'DodgerBlue', color: '#fff', },
              }}
              disabled={ApproveFreeseCheck}
              startIcon={<OfflinePinIcon sx={{ padding: 0 }} />}
              variant="contained">
              Apply
            </Button>

          </div>

          <div className={RulesLocationHeaderClasses.header_child1}>
            <Button
              sx={{
                backgroundColor: "",
                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                width: "130px", marginLeft: "5px", marginTop: "0px",
                '&.Mui-disabled': { opacity: 0.5, backgroundColor: 'DodgerBlue', color: '#fff', },
              }}
              disabled={ApproveFreeseCheck}
              startIcon={<SaveIcon />}
              variant="contained">
              Save Template
            </Button>
          </div>
        </div>
      </div>
    </Box>
  )

  const DrawerDateRange = () => (
    <Box sx={{ margin: "0px 0px 0px 15px", width: "350px", }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div className={RulesLocationHeaderClasses.HeightDiv}>
            <FormControlLabel control={
              <Checkbox
                checked={check6}
                name="check6"
                disabled={ApproveFreeseCheck || leftContData.RULE_TYPE === "M"}
                style={{ transform: "scale(0.8)", padding: "0px", margin: "0px 0px 0px 10px" }}
                sx={check6 ? { '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', }, } : null}
                onChange={(event) => {
                  setCheck9(false); setCheck6(event.target.checked);
                  if (event.target.checked) { setLeftContData((prev) => { return { ...prev, END_DATE1: "", END_DATE2: "", START_DATE1: "", START_DATE2: "" } }) }
                }}
              />
            }
              label={<InputLabel
                sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px", padding: "0px", display: 'inline', float: 'left' }}>
                Weeks from Today</InputLabel>}
            />
          </div>
          {check6 ?
            <div>
              <div className={RulesLocationHeaderClasses.header_child}>
                <InputLabel sx={{ fontWeight: "", fontSize: "12px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                  TY: </InputLabel>
                <TextField
                  type="number"
                  name="WEEKS_THIS_YEAR"
                  disabled={ApproveFreeseCheck}
                  value={leftContData.WEEKS_THIS_YEAR}
                  onChange={handleswitchRulecheck}
                  sx={{ width: "50px" }}
                  id="formatted-numberformat-input"
                  InputProps={{
                    style: { fontSize: 12, height: "20px" },
                    inputProps: { min: 0, maxLength: 2 },
                  }}
                  variant="standard"
                />
              </div>

              <div className={RulesLocationHeaderClasses.header_child}>
                <InputLabel sx={{ fontWeight: "", fontSize: "12px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                  LY: </InputLabel>
                <TextField
                  type="number"
                  sx={{ width: "50px" }}
                  name="WEEKS_LAST_YEAR"
                  disabled={ApproveFreeseCheck}
                  value={leftContData.WEEKS_LAST_YEAR}
                  onChange={handleswitchRulecheck}
                  id="formatted-numberformat-input"
                  InputProps={{
                    style: { fontSize: 12, height: "20px" },
                    inputProps: { min: 0, maxLength: 2 },
                  }}
                  variant="standard"
                />

              </div>
            </div>
            : null}
        </div>

        <div style={{ marginTop: "auto" }}>
          <Button
            sx={{
              fontSize: "10px",
              '&.Mui-disabled': { opacity: 0.5, backgroundColor: 'DodgerBlue', color: '#fff', },
            }}
            startIcon={<DisplaySettingsIcon />}
            onClick={handleClickOpen}
            variant="contained">
            Change Weights
          </Button>
        </div>
      </Box>


      <div>
        <FormControlLabel control={
          <Checkbox
            checked={check9}
            name="check9"
            disabled={ApproveFreeseCheck || leftContData.RULE_TYPE === "M"}
            style={{ transform: "scale(0.8)", padding: "0px", margin: "0px 0px 0px 10px", }}
            sx={check9 ? { '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', }, } : null}
            onChange={(event) => {
              setCheck6(false); setCheck9(event.target.checked);
              if (event.target.checked) { setLeftContData((prev) => { return { ...prev, WEEKS_THIS_YEAR: "", WEEKS_LAST_YEAR: "", } }) }
            }}
          />
        }
          label={<InputLabel
            sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px", padding: "0px", display: 'inline', float: 'left' }}>
            Start/End Dates</InputLabel>}
        />
      </div>

      {check9 ?
        <div>
          <div className={RulesLocationHeaderClasses.header_child}>
            <div>
              <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                Start: </InputLabel>
            </div>

            <div >
              {/* <TextField
                variant="outlined"
                type="date"
                size="small"
                name="START_DATE1"
                format="yyyy/MM/dd"
                sx={{
                  margin: "0px 0px 10px 2px", width: "120px"
                  , "& .MuiInputBase-input.Mui-disabled": { backgroundColor: "#f0f0f0" }
                }}
                id="outlined-disabled"
                label=""
                inputProps={{ max: leftContData.END_DATE1, sx: { backgroundColor: '#fff', borderRadius: "5px" } }}
                disabled={ApproveFreeseCheck}
                value={leftContData.START_DATE1}
                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  shrink: true,
                  className: RulesLocationHeaderClasses.input,
                }}
                onChange={handleswitchRulecheck}
              /> */}
              <DatePicker
                autoComplete="off"
                placeholderText="MM-DD-YY"
                selected={leftContData.START_DATE1}
                onChange={(date) => HandleStartEndDates("START_DATE1", date)}
                maxDate={leftContData.END_DATE1}
                onChangeRaw={(event) => {
                  if (validateDateInput(event.target.value)) {
                  } else {
                    setOpenDialog(true);
                    setDialogData("Invalid Start Date Input");
                    setLeftContData((prev) => { return { ...prev, START_DATE1: "", }; });
                  }
                }}
                dateFormat="MM-dd-yy"
                disabled={ApproveFreeseCheck}
                customInput={

                  <TextField
                    size="small"
                    variant="outlined"
                    type="text"
                    name="START_DATE1"
                    autoComplete='off'
                    helperText=""
                    sx={{ width: "100%" }}
                    id="outlined-disabled"
                    InputLabelProps={{
                      style: { fontSize: 12, height: "22px" },
                      shrink: true,
                    }}
                    InputProps={{
                      style: (ApproveFreeseCheck) ? sharedInputClassDis1 : sharedInputClass1,
                      endAdornment: (<CalendarTodayIcon style={{ fontSize: "11px", }} />)
                    }}
                    inputProps={{
                      // min: new Date().toISOString().slice(0, 10),
                      sx: { backgroundColor: '#fff', padding: "0px", height: "20px", textAlign: "center", width: "100%" }
                    }}
                    disabled={ApproveFreeseCheck}

                  />
                }
              />
            </div>

            <div >
              {/* <TextField
                value={leftContData.START_DATE2}
                disabled={ApproveFreeseCheck}
                variant="outlined"
                type="date"
                size="small"
                name="START_DATE2"
                format="yyyy/MM/dd"
                sx={{
                  margin: "0px 0px 10px 2px", width: "120px"
                  , "& .MuiInputBase-input.Mui-disabled": { backgroundColor: "#f0f0f0" }
                }}
                id="outlined-disabled"
                label=""
                inputProps={{ max: leftContData.END_DATE2, sx: { backgroundColor: '#fff', borderRadius: "5px" } }}
                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  shrink: true,
                  className: RulesLocationHeaderClasses.input,
                }}
                onChange={handleswitchRulecheck}
              /> */}
              <DatePicker
                autoComplete="off"
                placeholderText="MM-DD-YY"
                selected={leftContData.START_DATE2}
                onChange={(date) => HandleStartEndDates("START_DATE2", date)}
                onChangeRaw={(event) => {
                  if (validateDateInput(event.target.value)) {
                  } else {
                    setOpenDialog(true);
                    setDialogData("Invalid Start Date Input");
                    setLeftContData((prev) => { return { ...prev, START_DATE2: "", }; });
                  }
                }}
                maxDate={leftContData.END_DATE2}
                dateFormat="MM-dd-yy"
                disabled={ApproveFreeseCheck}
                customInput={

                  <TextField
                    size="small"
                    variant="outlined"
                    type="text"
                    name="START_DATE2"
                    autoComplete='off'
                    helperText=""
                    sx={{ width: "100%" }}
                    id="outlined-disabled"
                    InputLabelProps={{
                      style: { fontSize: 12, height: "22px" },
                      shrink: true,
                    }}
                    InputProps={{
                      style: (ApproveFreeseCheck) ? sharedInputClassDis1 : sharedInputClass1,
                      endAdornment: (<CalendarTodayIcon style={{ fontSize: "11px", }} />)
                    }}
                    inputProps={{
                      // min: new Date().toISOString().slice(0, 10),
                      sx: { backgroundColor: '#fff', padding: "0px", height: "20px", textAlign: "center", width: "100%" }
                    }}
                    disabled={ApproveFreeseCheck}
                  />
                }
              />
            </div>
          </div>


          <div className={RulesLocationHeaderClasses.header_child}>
            <div>
              <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                End: </InputLabel>
            </div>

            <div>
              {/* <TextField
                disabled={ApproveFreeseCheck}
                variant="outlined"
                type="date"
                size="small"
                name="END_DATE1"
                format="yyyy/MM/dd"
                inputProps={{
                  min: leftContData.START_DATE1,
                  sx: { backgroundColor: '#fff', borderRadius: "5px" }
                }}

                sx={{
                  margin: "0px 0px 10px 2px", width: "120px"
                  , "& .MuiInputBase-input.Mui-disabled": { backgroundColor: "#f0f0f0" }
                }}
                id="outlined-disabled"
                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  shrink: true,
                  className: RulesLocationHeaderClasses.input,
                }}
                onChange={handleswitchRulecheck}
                value={leftContData.END_DATE1}
              /> */}
              <DatePicker
                autoComplete="off"
                placeholderText="MM-DD-YY"
                selected={leftContData.END_DATE1}
                onChange={(date) => HandleStartEndDates("END_DATE1", date)}
                onChangeRaw={(event) => {
                  if (validateDateInput(event.target.value)) {
                  } else {
                    setOpenDialog(true);
                    setDialogData("Invalid End Date Input");
                    setLeftContData((prev) => { return { ...prev, END_DATE1: "", }; });
                  }
                }}
                minDate={leftContData.START_DATE1}
                dateFormat="MM-dd-yy"
                disabled={ApproveFreeseCheck}
                customInput={

                  <TextField
                    size="small"
                    variant="outlined"
                    type="text"
                    name="END_DATE1"
                    autoComplete='off'
                    helperText=""
                    sx={{ width: "100%" }}
                    id="outlined-disabled"
                    InputLabelProps={{
                      style: { fontSize: 12, height: "22px" },
                      shrink: true,
                    }}
                    InputProps={{
                      style: (ApproveFreeseCheck) ? sharedInputClassDis1 : sharedInputClass1,
                      endAdornment: (<CalendarTodayIcon style={{ fontSize: "11px", }} />)
                    }}
                    inputProps={{
                      // min: new Date().toISOString().slice(0, 10),
                      sx: { backgroundColor: '#fff', padding: "0px", height: "20px", textAlign: "center", width: "100%" }
                    }}
                    disabled={ApproveFreeseCheck}
                  />
                }
              />
            </div>

            <div >
              {/* <TextField
                disabled={ApproveFreeseCheck}
                variant="outlined"
                type="date"
                size="small"
                name="END_DATE2"
                format="yyyy/MM/dd"
                inputProps={{
                  min: leftContData.START_DATE2,
                  sx: { backgroundColor: '#fff', borderRadius: "5px" }
                }}
                sx={{
                  margin: "0px 0px 10px 2px", width: "120px"
                  , "& .MuiInputBase-input.Mui-disabled": { backgroundColor: "#f0f0f0" }
                }}
                id="outlined-disabled"
                label=""
                value={leftContData.END_DATE2}
                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  shrink: true,
                  className: RulesLocationHeaderClasses.input,
                }}
                onChange={handleswitchRulecheck}
              /> */}
              <DatePicker
                autoComplete="off"
                placeholderText="MM-DD-YY"
                selected={leftContData.END_DATE2}
                onChange={(date) => HandleStartEndDates("END_DATE2", date)}
                onChangeRaw={(event) => {
                  if (validateDateInput(event.target.value)) {
                  } else {
                    setOpenDialog(true);
                    setDialogData("Invalid End Date Input");
                    setLeftContData((prev) => { return { ...prev, END_DATE2: "", }; });
                  }
                }}
                minDate={leftContData.START_DATE2}
                dateFormat="MM-dd-yy"
                disabled={ApproveFreeseCheck}
                customInput={

                  <TextField
                    size="small"
                    variant="outlined"
                    type="text"
                    name="END_DATE2"
                    autoComplete='off'
                    helperText=""
                    sx={{ width: "100%" }}
                    id="outlined-disabled"
                    InputLabelProps={{
                      style: { fontSize: 12, height: "22px" },
                      shrink: true,
                    }}
                    InputProps={{
                      style: (ApproveFreeseCheck) ? sharedInputClassDis1 : sharedInputClass1,
                      endAdornment: (<CalendarTodayIcon style={{ fontSize: "11px", }} />)
                    }}
                    inputProps={{
                      // min: new Date().toISOString().slice(0, 10),
                      sx: { backgroundColor: '#fff', padding: "0px", height: "20px", textAlign: "center", width: "100%" }
                    }}
                    disabled={ApproveFreeseCheck}
                  />
                }
              />
            </div>
          </div>
        </div>
        : null}
    </Box>
  )

  const DrawerIncludeInventory = () => (
    <Box sx={{ margin: "0px 0px 0px 15px", width: "390px", }}>
      <div>
        <FormControlLabel control={
          <Checkbox
            checked={check7}
            name="check7"
            disabled={ApproveFreeseCheck}
            sx={check7 ? {
              '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', },
            } : null}
            style={{ transform: "scale(0.8)", padding: "0px", margin: "0px 0px 0px 10px" }}
            onChange={(event) => {
              setCheck8(false); setCheck7(event.target.checked);
              if (event.target.checked) { setLeftContData((prev) => { return { ...prev, ON_ORDER_COMMIT_DATE: "", } }) }
            }}
          />
        }
          label={<InputLabel
            sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px", padding: "0px", display: 'inline', float: 'left' }}>
            Weeks from Today</InputLabel>}
        />
      </div>

      {check7 ?
        <div>
          <InputLabel sx={{ fontWeight: "", fontSize: "12px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
            WEEKS NO: </InputLabel>
          <TextField
            type="number"
            disabled={ApproveFreeseCheck}
            value={leftContData.ON_ORDER_COMMIT_WEEKS}
            name="ON_ORDER_COMMIT_WEEKS"
            sx={{ width: "50px" }}
            id="formatted-numberformat-input"
            InputProps={{
              style: { fontSize: 12, height: "20px" },
              inputProps: { min: 0, maxLength: 2 },
            }}
            variant="standard"
            onChange={handleswitchRulecheck}
          />
        </div>
        : null}

      <div>
        <FormControlLabel control={
          <Checkbox
            checked={check8}
            disabled={ApproveFreeseCheck}
            name="check8"
            style={{ transform: "scale(0.8)", padding: "0px", margin: "0px 0px 0px 10px" }}
            onChange={(event) => {
              setCheck7(false); setCheck8(event.target.checked);
              if (event.target.checked) { setLeftContData((prev) => { return { ...prev, ON_ORDER_COMMIT_WEEKS: "", } }) }
            }}
            sx={check8 ? {
              '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', },
            } : null}
          />
        }
          label={<InputLabel
            sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px", padding: "0px", display: 'inline', float: 'left' }}>
            On order Commit Date</InputLabel>}
        />
      </div>

      {check8 ?
        <div>
          <div>
            <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
              Final Date: </InputLabel>
          </div>

          <div>
            {/* <TextField
              disabled={ApproveFreeseCheck}
              variant="outlined"
              type="date"
              size="small"
              format="yyyy/MM/dd"
              name="ON_ORDER_COMMIT_DATE"
              sx={{
                margin: "0px 0px 10px 2px", width: "120px", borderRadius: "5px",
                "& .MuiInputBase-input.Mui-disabled": { backgroundColor: "#f0f0f0", height: "15px", }
              }}
              id="outlined-disabled"
              label=""
              value={leftContData.ON_ORDER_COMMIT_DATE}
              inputProps={{ sx: { backgroundColor: '#fff', borderRadius: "5px" } }}
              InputProps={{
                style: { fontSize: 12, height: "30px" },
                shrink: true,
                className: RulesLocationHeaderClasses.input,
              }}
              onChange={handleswitchRulecheck}
            /> */}
            <DatePicker
              autoComplete="off"
              placeholderText="MM-DD-YY"
              selected={leftContData.ON_ORDER_COMMIT_DATE}
              onChange={(date) => HandleStartEndDates("ON_ORDER_COMMIT_DATE", date)}
              onChangeRaw={(event) => {
                if (validateDateInput(event.target.value)) {
                } else {
                  setOpenDialog(true);
                  setDialogData("Invalid Date Input");
                  setLeftContData((prev) => { return { ...prev, ON_ORDER_COMMIT_DATE: "", }; });
                }
              }}
              dateFormat="MM-dd-yy"
              disabled={ApproveFreeseCheck}
              customInput={

                <TextField
                  size="small"
                  variant="outlined"
                  type="text"
                  name="ON_ORDER_COMMIT_DATE"
                  autoComplete='off'
                  helperText=""
                  sx={{ width: "100%" }}
                  id="outlined-disabled"
                  InputLabelProps={{
                    style: { fontSize: 12, height: "22px" },
                    shrink: true,
                  }}
                  InputProps={{
                    style: (ApproveFreeseCheck) ? sharedInputClassDis1 : sharedInputClass1,
                    endAdornment: (<CalendarTodayIcon style={{ fontSize: "11px", }} />)
                  }}
                  inputProps={{
                    // min: new Date().toISOString().slice(0, 10),
                    sx: { backgroundColor: '#fff', padding: "0px", height: "20px", textAlign: "center", width: "100%" }
                  }}
                  disabled={ApproveFreeseCheck}

                />
              }
            />
          </div>
        </div> : null}
    </Box>
  )

  /*
          ################################
          ###   BOTTOM   ###
          ################################ 
  */

  useEffect(() => {
    setLoading(true);
    dispatch(getRULESTYPERequest([{}]));
    dispatch(getNEEDTYPERequest([{}]));
    dispatch(getHIERARCHYTYPERequest([{}]));
    dispatch(getALLOCATETOTYPERequest([{}]));
    dispatch(getLOCATIONRLRequest([{}]));
    dispatch(getLOCATIONLISTRLRequest([{}]));
    dispatch(getLOCATIONTRAITSRLRequest([{}]));
    dispatch(getCLEARANCERLRequest([{}]));
    dispatch(getSTATUSRLRequest([{}]));
  }, [""]);

  useEffect(() => {
    if (
      RulesLocationData?.data?.ruleType
      && Array.isArray(RulesLocationData?.data?.ruleType)
    ) {
      setRuleType(RulesLocationData?.data?.ruleType);
      setLoading(false);
    } else if (
      RulesLocationData?.data?.Need
      && Array.isArray(RulesLocationData?.data?.Need)
    ) {
      setNeed(RulesLocationData?.data?.Need);
      setLoading(false);
    } else if (
      RulesLocationData?.data?.Hierarchy
      && Array.isArray(RulesLocationData?.data?.Hierarchy)
    ) {
      setHierarchy(RulesLocationData?.data?.Hierarchy);
      setLoading(false);
    } else if (
      RulesLocationData?.data?.Allocateto
      && Array.isArray(RulesLocationData?.data?.Allocateto)
    ) {
      setAllocateto(RulesLocationData?.data?.Allocateto);
      setLoading(false);
    } else if (
      RulesLocationData?.data?.deleteLocationRL
    ) {
      setDeleteLocationRL(RulesLocationData?.data?.deleteLocationRL);
      setLoading(false);
      setLoadCheck(false);
      setState({ ...state, right: false });
    } else if (
      RulesLocationData?.data?.updateLocationRL
      && Array.isArray(RulesLocationData?.data?.updateLocationRL)
    ) {
      setUpdateLocationRL(RulesLocationData?.data?.updateLocationRL);
      setLoading(false);
    } else if (
      RulesLocationData?.data?.updateChangeWeightsRL
    ) {
      setUpdateChangeWeightsRL(RulesLocationData?.data?.updateChangeWeightsRL);
      setLoading(false);
    } else if (
      RulesLocationData?.data?.tableLocData
      && Array.isArray(RulesLocationData?.data?.tableLocData)
    ) {
      if (RulesLocationData?.data?.tableLocData.length > 0) {
        for (let i = 0; i < RulesLocationData?.data?.tableLocData.length; i++) {
          let rec = RulesLocationData?.data?.tableLocData[i];
          for (let col in rec) {
            if (rec[col] == null || rec[col] == "NULL" || rec[col] === undefined) {
              rec[col] = "";
            }
          }
        }
      }
      if (countAddCheck === 0) {
        var temp1 = convertDateFormat3(RulesLocationData?.data?.tableLocData)
        setTotalData(temp1);
        setTableLocData(temp1);
        const temp = temp1.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        setLoadCheck(false)
        if (temp1.length > 0) {
          setCountAddCheck(1)
        }
      } else {
        var temp1 = convertDateFormat3(RulesLocationData?.data?.tableLocData)
        setAllData(temp1);
        setAllDataCheck(true);
      }
      setState({ ...state, right: false });
      setLoading(false);
    } else if (
      RulesLocationData?.data?.locationRL
      && Array.isArray(RulesLocationData?.data?.locationRL)
    ) {
      setLocationRl(RulesLocationData?.data?.locationRL);
      setLikeLocData(RulesLocationData?.data?.locationRL)
      setLoading(false);
    } else if (
      RulesLocationData?.data?.locationListRL
      && Array.isArray(RulesLocationData?.data?.locationListRL)
    ) {
      setLocationListRl(RulesLocationData?.data?.locationListRL);
      setLoading(false);
    } else if (
      RulesLocationData?.data?.locationTraitRL
      && Array.isArray(RulesLocationData?.data?.locationTraitRL)
    ) {
      setLocationTraitRl(RulesLocationData?.data?.locationTraitRL);
      setLoading(false);
    } else if (
      RulesLocationData?.data?.clearanceRL
      && Array.isArray(RulesLocationData?.data?.clearanceRL)
    ) {
      setClearanceRl(RulesLocationData?.data?.clearanceRL);
      setLoading(false);
    } else if (
      RulesLocationData?.data?.statusRL
      && Array.isArray(RulesLocationData?.data?.statusRL)
    ) {
      setStatusRl(RulesLocationData?.data?.statusRL);
      setLoading(false);
    } else if (
      RulesLocationData?.data?.tableLocData) {
      if (RulesLocationData?.data?.tableLocData.status === 500) {
        setOpenDialogRL(true);
        setDialogDataRL(String(RulesLocationData?.data?.tableLocData["message"]));
      }
      setLoadCheck(false);
    } else if (
      RulesLocationData?.data?.RetrieveChangeWeightsRL
      && Array.isArray(RulesLocationData?.data?.RetrieveChangeWeightsRL)
    ) {
      RulesLocationData?.data?.RetrieveChangeWeightsRL.map(obj => {
        if (String(obj.EOW_DATE).length > 0) {
          obj.EOW_DATE = convertDateFormat(obj.EOW_DATE)
        }
      })
      setRetrieveChangeWeightsRL(RulesLocationData?.data?.RetrieveChangeWeightsRL);

      setLoading(false);
    } else if (
      RulesLocationData?.data?.deleteLocationRL
    ) {
      setDeleteLocationRL(RulesLocationData?.data?.deleteLocationRL);
      setLoading(false);
      setLoadCheck(false)
    } else {
      setLoading(false);
    }
    if (allocDetails.length > 0) {
      if (allocDetails[0].ALLOC_CRITERIA === "F") {
        setAllocateDefWH(false);
        setLeftContData((prev) => {
          return {
            ...prev,
            ENFORCE_WH_RL: "N"
          };
        })
      }
    }
  }, [RulesLocationData?.data]);

  if (allDataCheck && allData.length > 0) {
    const tempLoc1 = []
    totalData.map((obj) => { tempLoc1.push(obj.LOC) });
    const temp1 = allData.filter(item => !tempLoc1.includes(item.LOC));
    const temp2 = stableSort([...temp1, ...totalData], getComparator("asc", "LOC"));
    setTotalData(temp2);
    setTableLocData(temp2);
    setAllDataCheck(false);
    setLoadCheck(false);
    const temp = temp2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
    setcurrentPageData(temp);
    setcurrentPageRows(temp);
  }

  const HandleAddButton = () => {
    if (AllStoresCheck) {
      setLoading(true);
      setLoadCheck(true);
      dispatch(getFETCHLOCATIONDATARequest([searchData]));
    }
    else if (searchData.LOCATION.length > 0 || searchData.LOCATION_LIST.length > 0 || searchData.LOCATION_TRAIT.length > 0) {
      setLoading(true);
      setLoadCheck(true)
      dispatch(getFETCHLOCATIONDATARequest([searchData]));
    }
    else {
      setOpenDialogRL(true);
      setDialogDataRL("Give any input field*");
    }
    setTotalDataCheck(true);
  }

  if (TotalDataCheck && totalData.length > 0) {
    if (totalData.length > 0) {
      setAllStoresCheck(false)
      setSearchData((prev) => {
        return {
          ...prev,
          ALL_STORE: "N",
        };
      });
    } else if (totalData.length === 0) {
      setOpenDialogRL(true);
      setDialogDataRL(String(RulesLocationData?.data?.totalData?.message));
    }
    setTotalDataCheck(false);
    setSearchData(initialsearch);
    setValLoc([]);
    setValLoc1([]);
    setValLoc2([]);
    setValLoc3([]);
    setInputLoc("");
    setInputLoc1("");
    setInputLoc2("");
    setInputLoc3("");

    setLocationRl(stableSort(locationRL, getComparator("asc", "STORE")))
    setLocationListRl(stableSort(locationListRL, getComparator("asc", "LOC_LIST")))
    setLocationTraitRl(stableSort(locationTraitRL, getComparator("asc", "LOC_TRAIT")))
    setLocationExculdeRl(stableSort(locationRL, getComparator("asc", "STORE")))
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
      height: "30px",
      padding: 0,
    },
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "DodgerBlue",
      color: theme.palette.common.black,
      fontSize: 14,
      textAlign: "left"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      textAlign: "left"
    },
  }));

  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <>

        <TableHead className={RulesLocationHeaderClasses.TitleHead}>
          <TableRow >
            <StyledTableCell padding="checkbox" style={{
              whiteSpace: "nowrap", padding: "0px",
            }}
            >
              <Checkbox
                color="primary"
                size="small"
                disabled={ApproveFreeseCheck}
                // indeterminate={selected.length > 0 && selected.length < totalData.length}
                // checked={totalData.length > 0 && selected.length === totalData.length}
                indeterminate={Object.keys(selected[0]).length > 0
                  && Object.keys(selected[0]).includes(String(page))
                  && selected[0][page].length < currentPageData.length}
                checked={currentPageData.length > 0 && Object.keys(selected[0]).length > 0
                  && Object.keys(selected[0]).includes(String(page))
                  && selected[0][page].length === currentPageData.length}
                onChange={onSelectAllClick}
                inputProps={{
                  'aria-label': 'select all data',
                }}
                style={{
                  // transform: "scale(0.8)",
                  padding: "3px",
                  color: "#fff",
                }}
              />
            </StyledTableCell>


            {LocationHeader.map((headCell) => (ManageHeaderData.includes(headCell.id) &&
              <StyledTableCell
                key={headCell.id}
                // className={RulesLocationHeaderClasses.TableCell}
                size="small"
                sortDirection={orderBy === headCell.id ? order : false}
                style={{
                  whiteSpace: "nowrap", paddingLeft: "0px",
                  width: headCell.width,
                  maxWidth: headCell.maxWidth,
                }}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                  sx={{
                    "&.MuiTableSortLabel-root": {
                      color: "white",
                      fontSize: "0.775rem",
                      padding: "0px 0px 0px 5px"
                    },
                    "&.MuiTableSortLabel-root:hover": {
                      color: "#fff",
                    },
                    "&.Mui-active": {
                      color: "#fff",
                    },
                    "& .MuiTableSortLabel-icon": {
                      color: "#fff !important",
                    },
                  }}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

      </>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };


  function descendingComparator(a, b, orderBy) {
    //////console.log("sort:2112:", a, b, orderBy);
    let c, d;
    if (orderBy == "LOC_DESC" || orderBy == "LIKE_LOC_DESC") {
      c = b[orderBy].slice(b[orderBy].indexOf("-") + 1);
      d = a[orderBy].slice(a[orderBy].indexOf("-") + 1);
      c = isNaN(c) ? c : parseInt(c);
      d = isNaN(d) ? d : parseInt(d);
      c = isNaN(c) ? 0 : parseInt(c);
      d = isNaN(d) ? 0 : parseInt(d);
    }
    else if (orderBy == "LOC") {
      c = parseInt(b[orderBy]);
      d = parseInt(a[orderBy]);
    }
    else if (orderBy == "WEIGHT_PCT" || orderBy == "LIKE_LOC" || orderBy == "GROUP_ID") {
      c = parseInt(b[orderBy]);
      d = parseInt(a[orderBy]);
      c = isNaN(c) ? 0 : parseInt(c);
      d = isNaN(d) ? 0 : parseInt(d);
    }
    else if (orderBy == "RELEASE_DATE" || orderBy == "CLEARANCE_IND" || orderBy == "ITEM_LOC_STATUS" || orderBy == "EOW") {

      c = (b[orderBy]);
      d = (a[orderBy]);
      // c = isNaN(c) ? 0 : parseInt(c);
      // d = isNaN(d) ? 0 : parseInt(d);
      //////console.log("krishnasort123", c, d)
    }
    else {
      c = isNaN(b[orderBy]) ? b[orderBy] : parseInt(b[orderBy]);
      d = isNaN(a[orderBy]) ? a[orderBy] : parseInt(a[orderBy]);
    }
    //////console.log("sort heck", typeof (c), d)
    if (c === "NULL" || d === "NULL") {
      if (c === "NULL" && d !== "NULL") {
        return -1
      }
      else if (d === "NULL" && c !== "NULL") {
        return 1
      }
      else if (d !== "" && c === "") {
        return -1
      }
      else {
        return 1
      }
    }
    else {
      if (c < d) {
        return -1;
      }
      if (c > d) {
        return 1;
      }
    }
    return 0;
  }


  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const [sortCheck, setSortCheck] = useState(false)
  const [sortValue, setSortValue] = useState("")

  useEffect(() => {
    if (sortCheck) {
      if (order === "asc") {
        const sortedData = stableSort(currentPageData, getComparator("asc", sortValue));
        sortedData.forEach((item, index) => { totalData[startIndex + index] = item; });
        setcurrentPageData(sortedData);
      }
      if (order === "desc") {
        const sortedData = stableSort(currentPageData, getComparator("desc", sortValue));
        sortedData.forEach((item, index) => { totalData[startIndex + index] = item; });
        setcurrentPageData(sortedData);
      }
      setTotalData(totalData);
      setTableLocData(totalData);
      setSortCheck(false);
    }
  }, [totalData, order, orderBy]);

  const handleRequestSort = (event, property) => {
    if (event) {
      setSortCheck(true)
      setSortValue(String(property))
    }
    const isAsc = (orderBy === property && order === 'asc');
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   //////////console.log("event::",event)
  //   if (event.target.checked && selected.length === 0) {
  //     const newSelected = totalData.map((n) => n.LOC);
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleSingleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const handleSelectAllClick = (event) => {
    const lastPage = Math.ceil((totalData.length) / rowsPerPage);
    // const filteredArray = totalData.slice((page * rowsPerPage),
    //   ((page * rowsPerPage) +
    //     (page === lastPage - 1 ? (totalData.length - (page * rowsPerPage)) : rowsPerPage)
    //   ));
    const filteredArray = currentPageData
    const newSelected = filteredArray.map((n) => n.LOC);
    const pageselected = { [page]: newSelected };

    if ((Object.keys(selected[0]).length > 0 && !Object.keys(selected[0]).includes(String(page)))
    ) {

      const sortedArray = ((selected && Object.keys(selected[0]).length > 0) ? [{ ...selected[0], ...pageselected }] : [pageselected]).sort((a, b) => {
        const keyA = Object.keys(a)[0];
        const keyB = Object.keys(b)[0];
        return keyA - keyB;
      });
      setSelected(sortedArray);
      const combinedList = Object.values(sortedArray[0]).flat()
      setAllPageSelected(combinedList);
      return;
    } else if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
      const updatedArray = selected.map((obj) => {
        if (obj.hasOwnProperty(page)) {
          delete obj[page];
        }
        return obj;
      });
      updatedArray.sort((a, b) => {
        const keyA = Object.keys(a)[0];
        const keyB = Object.keys(b)[0];
        return keyA - keyB;
      });
      setSelected(updatedArray);
      const combinedList = Object.values(updatedArray[0]).flat()
      setAllPageSelected(combinedList);
      return;
    } else if ((Object.keys(selected[0]).length === 0)) {

      setSelected([pageselected]);
      const combinedList = Object.values(pageselected[0]).flat()
      setAllPageSelected(combinedList);
      return;
    }
    setSelected([{}]);
    setAllPageSelected([]);
  };

  const handleSingleClick = (event, name) => {
    const selectedIndex = Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))
      ? selected[0][page].indexOf(name)
      : -1;
    let newSelected = [];

    if (selectedIndex === -1) {
      if (Object.keys(selected[0]).length > 0 && !Object.keys(selected[0]).includes(String(page))) {
        newSelected = [{ ...selected[0], [page]: [name] }];
      } else if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
        newSelected = selected;
        newSelected[0][page].push(name);
      } else if (Object.keys(selected[0]).length === 0) {
        const pageselected = { [page]: [name] };
        newSelected.push(pageselected);
      }
    } else {
      if (selected[0][page].length === 1) {
        newSelected = selected.map((obj) => {
          if (obj.hasOwnProperty(String(page))) {
            const newObj = { ...obj };
            delete newObj[String(page)];
            return newObj;
          }
          return obj;
        });

      } else if (selected[0][page].length > 1) {
        selected.forEach((obj) => {
          if (obj.hasOwnProperty(page)) {
            const index = obj[page].indexOf(name);
            obj[page].splice(index, 1);
          }
        });
        newSelected = selected;
      }
    }
    setSelected(newSelected);
    const combinedList = Object.values(newSelected[0]).flat()
    setAllPageSelected(combinedList);
  };

  const isSelected = (name) => (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) ? selected[0][page].indexOf(name) !== -1 : false;

  const handleswitchRulecheck = (e, val) => {
    // //console.log("handleswitchRulecheck: ", e, val, e.target.checked,e.target.name);
    if (e.target.name === "check1") {
      setCheck1(val)
      setLeftContData(prev => ({ ...prev, REGULAR_SALES_IND: val ? "Y" : "N" }));
    }
    if (e.target.name === "check2") {
      setCheck2(val);
      setLeftContData(prev => ({ ...prev, PROMO_SALES_IND: val ? "Y" : "N" }));
    }
    if (e.target.name === "check3") {
      setCheck3(val);
      setLeftContData(prev => ({ ...prev, CLEARANCE_SALES_IND: val ? "Y" : "N" }));
    }
    if (e.target.name === "check4") {
      setCheck4(val);
      setLeftContData(prev => ({ ...prev, SIZE_PROFILE_IND: val ? "Y" : "N" }));
    }
    if (e.target.name === "check5") {
      setCheck5(val);
      setLeftContData(prev => ({ ...prev, ENFORCE_PRES_MIN_IND: val ? "Y" : "N" }));
    }
    if (e.target.name === "AllStoresCheck") {
      setAllStoresCheck(val)
      setSearchData(prev => ({ ...prev, ALL_STORE: val ? "Y" : "N" }));
      if (val) {
        setSearchData(prev => ({ ...prev, LOCATION: [], LOCATION_LIST: [], LOCATION_TRAIT: [], }));
        setValLoc([]); setValLoc1([]); setValLoc2([]); setValLoc3([]); setInputLoc(""); setInputLoc1(""); setInputLoc2(""); setInputLoc3("");
      }
    }
    if (e.target.name === "AllocateDefWH") {
      setAllocateDefWH(val)
      setLeftContData(prev => ({ ...prev, ENFORCE_WH_RL: val ? "Y" : "N" }));
    }
    if (e.target.name === "WEEKS_THIS_YEAR") {
      if (e.target.value < 0) {
        setOpenDialogRL(true);
        setDialogDataRL("Invalid Weeks TY/LY values");
        setLeftContData((prev) => { return { ...prev, WEEKS_THIS_YEAR: 0, END_DATE1: "", END_DATE2: "", START_DATE1: "", START_DATE2: "" } })
      } else {
        setLeftContData((prev) => {
          return {
            ...prev, WEEKS_THIS_YEAR: e.target.value,
            END_DATE1: "", END_DATE2: "", START_DATE1: "", START_DATE2: ""
          };
        })
      }
    }
    if (e.target.name === "WEEKS_LAST_YEAR") {
      if (e.target.value < 0) {
        setOpenDialogRL(true);
        setDialogDataRL("Invalid Weeks TY/LY values");
        setLeftContData((prev) => { return { ...prev, WEEKS_LAST_YEAR: 0, END_DATE1: "", END_DATE2: "", START_DATE1: "", START_DATE2: "" } })
      } else {
        setLeftContData((prev) => {
          return {
            ...prev, WEEKS_LAST_YEAR: e.target.value,
            END_DATE1: "", END_DATE2: "", START_DATE1: "", START_DATE2: ""
          };
        })
      }
    }
    // if (e.target.name === "START_DATE1") {
    //   let dayOfWeek = 6;
    //   let date = new Date(e.target.value);
    //   let diff = date.getDay() - dayOfWeek;
    //   if (diff > 0) {
    //     date.setDate(date.getDate() + 7);
    //   }
    //   else if (diff < 0) {
    //     date.setDate(date.getDate() + ((-1) * diff))
    //   }
    //   if (e.target.value) {
    //     setLeftContData((prev) => {
    //       return {
    //         ...prev,
    //         START_DATE1: date.toISOString().split('T')[0],
    //         WEEKS_THIS_YEAR: "", WEEKS_LAST_YEAR: "",
    //       };
    //     })
    //   }
    //   else {
    //     setLeftContData((prev) => {
    //       return {
    //         ...prev,
    //         START_DATE1: e.target.value,
    //         WEEKS_THIS_YEAR: "", WEEKS_LAST_YEAR: "",
    //       };
    //     })
    //   }
    // }
    // if (e.target.name === "START_DATE2") {
    //   let dayOfWeek = 6;
    //   let date = new Date(e.target.value);
    //   let diff = date.getDay() - dayOfWeek;
    //   if (diff > 0) {
    //     date.setDate(date.getDate() + 7);
    //   }
    //   else if (diff < 0) {
    //     date.setDate(date.getDate() + ((-1) * diff))
    //   }
    //   if (e.target.value) {
    //     setLeftContData((prev) => {
    //       return {
    //         ...prev,
    //         START_DATE2: date.toISOString().split('T')[0],
    //         WEEKS_THIS_YEAR: "",
    //         WEEKS_LAST_YEAR: "",
    //       };
    //     })
    //   }
    //   else {
    //     setLeftContData((prev) => {
    //       return {
    //         ...prev,
    //         START_DATE2: e.target.value,
    //         WEEKS_THIS_YEAR: "",
    //         WEEKS_LAST_YEAR: "",
    //       };
    //     })
    //   }
    // }
    // if (e.target.name === "END_DATE1") {
    //   let dayOfWeek = 6;
    //   let date = new Date(e.target.value);
    //   let diff = date.getDay() - dayOfWeek;
    //   if (diff > 0) {
    //     date.setDate(date.getDate() + 7);
    //   }
    //   else if (diff < 0) {
    //     date.setDate(date.getDate() + ((-1) * diff))
    //   }
    //   if (e.target.value) {
    //     setLeftContData((prev) => {
    //       return {
    //         ...prev,
    //         END_DATE1: date.toISOString().split('T')[0],
    //         WEEKS_THIS_YEAR: "",
    //         WEEKS_LAST_YEAR: "",
    //       };
    //     })
    //   }
    //   else {

    //     setLeftContData((prev) => {
    //       return {
    //         ...prev,
    //         END_DATE1: e.target.value,
    //         WEEKS_THIS_YEAR: "",
    //         WEEKS_LAST_YEAR: "",
    //       };
    //     })
    //   }
    // }
    // if (e.target.name === "END_DATE2") {
    //   let dayOfWeek = 6;
    //   let date = new Date(e.target.value);
    //   let diff = date.getDay() - dayOfWeek;
    //   if (diff > 0) {
    //     date.setDate(date.getDate() + 7);
    //   }
    //   else if (diff < 0) {
    //     date.setDate(date.getDate() + ((-1) * diff))
    //   }
    //   if (e.target.value) {
    //     setLeftContData((prev) => {
    //       return {
    //         ...prev,
    //         END_DATE2: date.toISOString().split('T')[0],
    //         WEEKS_THIS_YEAR: "",
    //         WEEKS_LAST_YEAR: "",
    //       };
    //     })
    //   }
    //   else {

    //     setLeftContData((prev) => {
    //       return {
    //         ...prev,
    //         END_DATE2: e.target.value,
    //         WEEKS_THIS_YEAR: "",
    //         WEEKS_LAST_YEAR: "",
    //       };
    //     })
    //   }
    // }
    if (e.target.name === "ON_ORDER_COMMIT_WEEKS") {
      if (e.target.value < 0) {
        setOpenDialogRL(true);
        setDialogDataRL("Invalid Weeks from Today value");
        setLeftContData((prev) => { return { ...prev, ON_ORDER_COMMIT_WEEKS: 0, ON_ORDER_COMMIT_DATE: "", } })
      } else {
        setLeftContData((prev) => {
          return {
            ...prev,
            ON_ORDER_COMMIT_WEEKS: e.target.value,
            ON_ORDER_COMMIT_DATE: "",
          };
        })
      }
    }
    // if (e.target.name === "ON_ORDER_COMMIT_DATE") {
    //   setLeftContData((prev) => {
    //     return {
    //       ...prev,
    //       ON_ORDER_COMMIT_DATE: e.target.value,
    //       ON_ORDER_COMMIT_WEEKS: "",
    //     };
    //   })
    // }
  }

  const HandleStartEndDates = (name, date) => {
    const selectedDate = new Date(date);
    const saturday = new Date(selectedDate);
    saturday.setDate(selectedDate.getDate() - selectedDate.getDay() + 6);
    switch (name) {
      case "START_DATE1":
        if (Object.is(date, null) === false) { setLeftContData((prev) => { return { ...prev, START_DATE1: saturday, WEEKS_THIS_YEAR: "", WEEKS_LAST_YEAR: "", }; }) }
        else if (Object.is(date, null) === true) { setLeftContData((prev) => { return { ...prev, START_DATE1: "", WEEKS_THIS_YEAR: "", WEEKS_LAST_YEAR: "", }; }) }
        break;
      case "START_DATE2":
        if (Object.is(date, null) === false) { setLeftContData((prev) => { return { ...prev, START_DATE2: saturday, WEEKS_THIS_YEAR: "", WEEKS_LAST_YEAR: "", }; }) }
        else if (Object.is(date, null) === true) { setLeftContData((prev) => { return { ...prev, START_DATE2: "", WEEKS_THIS_YEAR: "", WEEKS_LAST_YEAR: "", }; }) }
        break;
      case "END_DATE1":
        if (Object.is(date, null) === false) { setLeftContData((prev) => { return { ...prev, END_DATE1: saturday, WEEKS_THIS_YEAR: "", WEEKS_LAST_YEAR: "", }; }) }
        else if (Object.is(date, null) === true) { setLeftContData((prev) => { return { ...prev, END_DATE1: "", WEEKS_THIS_YEAR: "", WEEKS_LAST_YEAR: "", }; }) }
        break;
      case "END_DATE2":
        if (Object.is(date, null) === false) { setLeftContData((prev) => { return { ...prev, END_DATE2: saturday, WEEKS_THIS_YEAR: "", WEEKS_LAST_YEAR: "", }; }) }
        else if (Object.is(date, null) === true) { setLeftContData((prev) => { return { ...prev, END_DATE2: "", WEEKS_THIS_YEAR: "", WEEKS_LAST_YEAR: "", }; }) }
        break;
      case "ON_ORDER_COMMIT_DATE":
        if (Object.is(date, null) === false) { setLeftContData((prev) => { return { ...prev, ON_ORDER_COMMIT_DATE: date, ON_ORDER_COMMIT_WEEKS: "", }; }) }
        else if (Object.is(date, null) === true) { setLeftContData((prev) => { return { ...prev, ON_ORDER_COMMIT_DATE: "", ON_ORDER_COMMIT_WEEKS: "", }; }) }
        break;
      default:
        break;
    }
  }

  const selectRuleType = (val) => {
    if (val) {
      if (allocDetails[0].ALLOC_CRITERIA === "F" && val.CODE_DESC === "Manual") {
        setLeftContData((prev) => {
          return {
            ...prev,
            RULE_TYPE: "History",
            REGULAR_SALES_IND: "Y",
            PROMO_SALES_IND: "Y",
            CLEARANCE_SALES_IND: "N",
          };
        });
        setCheck1(true);
        setCheck2(true);
        setOpenDialogRL(true);
        setDialogDataRL("Manual doesn't work for What If Allocation");
      }
      else {
        setLeftContData((prev) => {
          return {
            ...prev,
            RULE_TYPE: val.CODE,
            RULE_TYPE_VAL: val.CODE_DESC
          };
        });
        if (val.CODE_DESC === "Forecast") {
          setLeftContData((prev) => {
            return {
              ...prev,
              REGULAR_SALES_IND: "N",
              PROMO_SALES_IND: "N",
              CLEARANCE_SALES_IND: "N",
            };
          });
        }
        else if (val.CODE_DESC === "Manual") {
          setLeftContData((prev) => {
            return {
              ...prev,
              REGULAR_SALES_IND: "Y",
              PROMO_SALES_IND: "N",
              CLEARANCE_SALES_IND: "N",
              EXACT_IND: "",
              RULE_LEVEL: "",
              START_DATE1: "",
              START_DATE2: "",
              END_DATE1: "",
              END_DATE2: "",
              WEEKS_LAST_YEAR: "",
              WEEKS_THIS_YEAR: "",
              EXACT_IND_VAL: "",
            };
          });
          setCheck6(false);
          setCheck9(false);
        } else if (val.CODE_DESC === "History") {
          setLeftContData((prev) => {
            return {
              ...prev,
              REGULAR_SALES_IND: "Y",
              PROMO_SALES_IND: "Y",
              CLEARANCE_SALES_IND: "N",
            };
          });
          setCheck1(true);
          setCheck2(true);
        }
      }
    }
    else {
      setLeftContData((prev) => {
        return {
          ...prev,
          RULE_TYPE: ""
        };
      });
    }
  }

  const selectNEEDType = (val) => {
    setLeftContData(prev => ({ ...prev, EXACT_IND: val ? val.CODE : "", EXACT_IND_VAL: val ? val.CODE_DESC : "" }));
  }

  const selectHierarchy = (val) => {
    setLeftContData(prev => ({ ...prev, RULE_LEVEL: val ? val.CODE : "", RULE_LEVEL_VAL: val ? val.CODE_DESC : "" }));
  }

  const selectAllocateTo = (val) => {
    setLeftContData(prev => ({ ...prev, NET_NEED_IND: val ? val.CODE : "", NET_NEED_IND_VAL: val ? val.CODE_DESC : "" }));
  }

  const selectLocation = (event, value) => {
    let updatedData = []
    let selectedLocOptions = []
    event.map((res) => {
      selectedLocOptions.push(res.STORE)
    })
    updatedData = locationRL.filter((res) => !selectedLocOptions.includes(res.STORE))
    updatedData = [...event, ...updatedData];
    setLocationRl(updatedData)

    let selectedLocation = [];
    if (value.option) {
      valLoc.push(value.option);
      if (String(value.option.STORE).includes(inputLoc)) {
        setInputLoc("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valLoc.length; i++) {
        if (valLoc[i]["STORE"] === value.removedValue.STORE) {
          index = i;
          break;
        }
      }
      valLoc.splice(index, 1);

    }
    else if (value.action === "clear") {
      valLoc.splice(0, valLoc.length);
    }
    if (event === 0) {
      valLoc.push(event)
    } if (value.action === "deselect-option") {
      valLoc.splice(0, valLoc.length);
      valLoc.push(...event);
    }
    if (valLoc.length > 0 && typeof valLoc[0]['STORE'] !== "undefined") {
      setAllStoresCheck(false);
      valLoc.map(
        (item) => {
          selectedLocation.push(item.STORE);
        }
      )
      setSearchData((prev) => {
        return {
          ...prev,
          ALL_STORE: "N",
          LOCATION: selectedLocation,
        };
      });
    } else {
      initialsearch.LOCATION = "";
      setSearchData((prev) => {
        return {
          ...prev,
          LOCATION: [],
        };
      });
    }
  }

  const selectLocationlist = (event, value) => {
    let updatedLocationlistData = []
    let selectedLocationlistOptions = []
    event.map((res) => {
      selectedLocationlistOptions.push(res.LOC_LIST)
    })
    updatedLocationlistData = locationListRL.filter((res) => !selectedLocationlistOptions.includes(res.LOC_LIST))
    updatedLocationlistData = [...event, ...updatedLocationlistData];
    setLocationListRl(updatedLocationlistData)
    let selectedLocationlist = [];
    if (value.option) {
      valLoc1.push(value.option);
      if (String(value.option.LOC_LIST).includes(inputLoc1)) {
        setInputLoc1("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valLoc.length; i++) {
        if (valLoc1[i]["LOCATIONLIST"] === value.removedValue.LOCATIONLIST) {
          index = i;
          break;
        }
      }
      valLoc1.splice(index, 1);
    } else if (value.action === "clear") {

      valLoc1.splice(0, valLoc1.length);
    }
    if (event === 0) {
      valLoc1.push(event)
    }
    if (value.action === "deselect-option") {
      valLoc1.splice(0, valLoc1.length);
      valLoc1.push(...event);
    }
    if (valLoc1.length > 0 && typeof valLoc1[0]['LOC_LIST'] !== "undefined") {
      setAllStoresCheck(false);
      valLoc1.map(
        (item) => {
          selectedLocationlist.push(item.LOC_LIST);
        }
      )
      setSearchData((prev) => {
        return {
          ...prev,
          ALL_STORE: "N",
          LOCATION_LIST: selectedLocationlist,
        };
      });
    } else {
      initialsearch.LOCATION_LIST = "";
      setSearchData((prev) => {
        return {
          ...prev,
          LOCATION_LIST: [],
        };
      });
    }
  }

  const selectLocationtraits = (event, value) => {
    let updatedLocationtraitsData = []
    let selectedLocationtraitsOptions = []
    event.map((res) => {
      selectedLocationtraitsOptions.push(res.LOC_TRAIT)
    })
    updatedLocationtraitsData = locationTraitRL.filter((res) => !selectedLocationtraitsOptions.includes(res.LOC_TRAIT))
    updatedLocationtraitsData = [...event, ...updatedLocationtraitsData];
    setLocationTraitRl(updatedLocationtraitsData)
    let selectedLocationtraits = [];
    if (value.option) {
      valLoc2.push(value.option);
      if (String(value.option.LOC_TRAIT).includes(inputLoc2)) {
        setInputLoc2("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valLoc2.length; i++) {
        if (valLoc2[i]["LOCATION_TRAITS"] === value.removedValue.LOCATION_TRAIT) {
          index = i;
          break;
        }
      }
      valLoc2.splice(index, 1);
    } else if (value.action === "clear") {

      valLoc2.splice(0, valLoc2.length);
    }
    if (event === 0) {
      valLoc2.push(event)
    } if (value.action === "deselect-option") {
      valLoc2.splice(0, valLoc2.length);
      valLoc2.push(...event);
    }
    if (valLoc2.length > 0 && typeof valLoc2[0]['LOC_TRAIT'] !== "undefined") {
      setAllStoresCheck(false);
      valLoc2.map(
        (item) => {
          selectedLocationtraits.push(item.LOC_TRAIT);
        }
      )
      setSearchData((prev) => {
        return {
          ...prev,
          ALL_STORE: "N",
          LOCATION_TRAIT: selectedLocationtraits,
        };
      });
    } else {
      initialsearch.LOCATION_TRAIT = "";
      setSearchData((prev) => {
        return {
          ...prev,
          LOCATION_TRAIT: [],
        };
      });
    }
  }

  const selectExcludedlocation = (event, value) => {
    let updatedData = []
    let selectedLocOptions = []
    event.map((res) => {
      selectedLocOptions.push(res.STORE)
    })
    updatedData = locationRL.filter((res) => !selectedLocOptions.includes(res.STORE))
    updatedData = [...event, ...updatedData];
    setLocationRl(updatedData)
    let selectedExcluded_list = [];
    if (value.option) {
      valLoc3.push(value.option);
      if (String(value.option.STORE).includes(inputLoc3)) {
        setInputLoc3("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valLoc3.length; i++) {
        if (valLoc3[i]["STORE"] === value.removedValue.STORE) {
          index = i;
          break;
        }
      }
      valLoc3.splice(index, 1);
    } else if (value.action === "clear") {

      valLoc3.splice(0, valLoc3.length);
    }
    if (event === 0) {
      valLoc3.push(event)
    } if (value.action === "deselect-option") {
      valLoc3.splice(0, valLoc3.length);
      valLoc3.push(...event);
    }
    if (valLoc3.length > 0 && typeof valLoc3[0]['STORE'] !== "undefined") {
      valLoc3.map(
        (item) => {
          selectedExcluded_list.push(item.STORE);
        }
      )
      setSearchData((prev) => {
        return {
          ...prev,
          EXCLUDE_LOCATION: selectedExcluded_list,
        };
      });

    } else {
      initialsearch.EXCLUDE_LOCATION = "";
      setSearchData((prev) => {
        return {
          ...prev,
          EXCLUDE_LOCATION: [],
        };
      });
    }
  }

  useEffect(() => {
    if (RetrieveDataCheck) {
      setLoadCheck(true);
    }
  }, [RetrieveDataCheck])

  if (updateRulesRL.length > 0 && AllocRuleDataCheck) {
    updateRulesRL.map(item => setAllocRuleData(item))
    setAllocRuleDataCheck(false);
    setRetrieveDataCheck(true);
    setLoadCheck(false);
    setLoadCheck(true);
  }

  if (Object.keys(AllocRuleData).length > 0 && RetrieveDataCheck && ruleType.length > 0
    && Hierarchy.length > 0 && Need.length > 0 && Allocateto.length > 0) {
    if (AllocRuleData.REGULAR_SALES_IND) {
      setLeftContData((prev) => { return { ...prev, REGULAR_SALES_IND: AllocRuleData.REGULAR_SALES_IND === "N" ? "N" : "Y" }; })
      setCheck1(AllocRuleData.REGULAR_SALES_IND === "N" ? false : true)
    }

    if (AllocRuleData.PROMO_SALES_IND) {
      setLeftContData((prev) => { return { ...prev, PROMO_SALES_IND: AllocRuleData.PROMO_SALES_IND === "N" ? "N" : "Y" }; })
      setCheck2(AllocRuleData.PROMO_SALES_IND === "N" ? false : true)
    }

    if (AllocRuleData.CLEARANCE_SALES_IND) {
      setLeftContData((prev) => { return { ...prev, CLEARANCE_SALES_IND: AllocRuleData.CLEARANCE_SALES_IND === "N" ? "N" : "Y" }; })
      setCheck3(AllocRuleData.CLEARANCE_SALES_IND === "N" ? false : true)
    }

    if (AllocRuleData.SIZE_PROFILE_IND) {
      setLeftContData((prev) => { return { ...prev, SIZE_PROFILE_IND: AllocRuleData.SIZE_PROFILE_IND === "N" ? "N" : "Y" }; })
      setCheck4(AllocRuleData.SIZE_PROFILE_IND === "N" ? false : true)
    }


    if (AllocRuleData.ENFORCE_PRES_MIN_IND) {
      setLeftContData((prev) => { return { ...prev, ENFORCE_PRES_MIN_IND: AllocRuleData.ENFORCE_PRES_MIN_IND === "N" ? "N" : "Y" }; })
      setCheck5(AllocRuleData.ENFORCE_PRES_MIN_IND === "N" ? false : true)
    }

    if (AllocRuleData.WH_STORE_REL_IND) {
      setLeftContData((prev) => { return { ...prev, ENFORCE_WH_RL: AllocRuleData.WH_STORE_REL_IND === "N" ? "N" : "Y" }; });
      setAllocateDefWH(AllocRuleData.WH_STORE_REL_IND === "N" ? false : true);
    }

    if (String(AllocRuleData["WEEKS_LAST_YEAR"])) {
      setLeftContData((prev) => { return { ...prev, WEEKS_LAST_YEAR: String(AllocRuleData["WEEKS_LAST_YEAR"]).length > 0 ? AllocRuleData["WEEKS_LAST_YEAR"] : "" }; });
      setCheck6(String(AllocRuleData["WEEKS_LAST_YEAR"]).length > 0 ? true : false);
    }

    if (String(AllocRuleData["WEEKS_THIS_YEAR"])) {
      setLeftContData((prev) => { return { ...prev, WEEKS_THIS_YEAR: String(AllocRuleData["WEEKS_THIS_YEAR"]).length > 0 ? AllocRuleData["WEEKS_THIS_YEAR"] : "" }; });
      setCheck6(String(AllocRuleData["WEEKS_THIS_YEAR"]).length > 0 ? true : false);
    }

    if (String(AllocRuleData["WEEKS_THIS_YEAR"]).length === 0 && String(AllocRuleData["WEEKS_LAST_YEAR"]).length === 0) {
      setCheck6(false);
      setLeftContData((prev) => { return { ...prev, WEEKS_THIS_YEAR: "", WEEKS_LAST_YEAR: "", }; })
    }

    if (String(AllocRuleData["START_DATE1"]).length > 0 || String(AllocRuleData["END_DATE1"]).length > 0 ||
      String(AllocRuleData["START_DATE2"]).length > 0 || String(AllocRuleData["END_DATE2"]).length > 0) {
      setCheck9(true);
      if (String(AllocRuleData["START_DATE1"])) {
        setLeftContData((prev) => { return { ...prev, START_DATE1: String(AllocRuleData["START_DATE1"]).length > 0 ? AllocRuleData["START_DATE1"] : "" }; })
      }

      if (String(AllocRuleData["END_DATE1"])) {
        setLeftContData((prev) => { return { ...prev, END_DATE1: String(AllocRuleData["END_DATE1"]).length > 0 ? AllocRuleData["END_DATE1"] : "" }; })
      }

      if (String(AllocRuleData["START_DATE2"])) {
        setLeftContData((prev) => { return { ...prev, START_DATE2: String(AllocRuleData["START_DATE2"]).length > 0 ? AllocRuleData["START_DATE2"] : "" }; })
      }

      if (String(AllocRuleData["END_DATE2"])) {
        setLeftContData((prev) => { return { ...prev, END_DATE2: String(AllocRuleData["END_DATE2"]).length > 0 ? AllocRuleData["END_DATE2"] : "" }; })
      }
    }

    if (String(AllocRuleData["START_DATE1"]).length === 0 && String(AllocRuleData["END_DATE1"]).length === 0 &&
      String(AllocRuleData["START_DATE2"]).length === 0 && String(AllocRuleData["END_DATE2"]).length === 0) {
      setCheck9(false);
      setLeftContData((prev) => { return { ...prev, START_DATE1: "", END_DATE1: "", START_DATE2: "", END_DATE2: "", }; })
    }

    if (String(AllocRuleData["ON_ORDER_COMMIT_WEEKS"])) {
      setLeftContData((prev) => { return { ...prev, ON_ORDER_COMMIT_WEEKS: String(AllocRuleData["ON_ORDER_COMMIT_WEEKS"]).length > 0 ? String(AllocRuleData["ON_ORDER_COMMIT_WEEKS"]) : "" }; })
      setCheck7(String(AllocRuleData["ON_ORDER_COMMIT_WEEKS"]).length > 0 ? true : false)
    }

    if (String(AllocRuleData["ON_ORDER_COMMIT_DATE"])) {
      setLeftContData((prev) => { return { ...prev, ON_ORDER_COMMIT_DATE: String(AllocRuleData["ON_ORDER_COMMIT_DATE"]).length > 0 ? AllocRuleData["ON_ORDER_COMMIT_DATE"] : "" }; })
      setCheck8(String(AllocRuleData["ON_ORDER_COMMIT_DATE"]).length > 0 ? true : false)
    }

    if (String(AllocRuleData["RULE_TYPE"]).length > 0) {
      const temp = ruleType.filter(item => item.CODE === String(AllocRuleData["RULE_TYPE"]))
      if (temp.length > 0) {
        setLeftContData((prev) => { return { ...prev, RULE_TYPE: temp[0].CODE, RULE_TYPE_VAL: temp[0].CODE_DESC, }; })
      }
    }

    if (String(AllocRuleData["EXACT_IND"]).length > 0) {
      const temp = Need.filter(item => item.CODE === String(AllocRuleData["EXACT_IND"]))
      if (temp.length > 0) {
        setLeftContData((prev) => { return { ...prev, EXACT_IND_VAL: temp[0].CODE_DESC, EXACT_IND: temp[0].CODE, }; })
      }
    }

    if (String(AllocRuleData["NET_NEED_IND"]).length > 0) {
      const temp = Allocateto.filter(item => item.CODE === String(AllocRuleData["NET_NEED_IND"]))
      if (temp.length > 0) {
        setLeftContData((prev) => { return { ...prev, NET_NEED_IND_VAL: temp[0].CODE_DESC, NET_NEED_IND: temp[0].CODE, }; })
      }
    }

    if (String(AllocRuleData["RULE_LEVEL"]).length > 0) {
      const temp = Hierarchy.filter(item => item.CODE === String(AllocRuleData["RULE_LEVEL"]))
      if (temp.length > 0) {
        setLeftContData((prev) => { return { ...prev, RULE_LEVEL: temp[0].CODE, RULE_LEVEL_VAL: temp[0].CODE_DESC, }; })
      }
    }
    setIsLoading(false);
    setRetrieveDataCheck(false);
    setAllRetreieveRLdataCheck(false);
    setLoadCheck(false);
  }

  const SearchButtonLIKE_LOC = () => (
    [<IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
      {LockCheck ? <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} disabled={ApproveFreeseCheck} />
        : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter} disabled={ApproveFreeseCheck} />}
    </IconButton>,
    <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
      <BsFillEraserFill fontSize="small" onClick={eraseValLikeLoc} disabled={ApproveFreeseCheck} />
    </IconButton>])

  const SearchButtonLIKE_LOC_DESC = () => (
    [<IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
      {LockCheck ? <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} disabled={ApproveFreeseCheck} />
        : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter} disabled={ApproveFreeseCheck} />}
    </IconButton>,
    <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
      <BsFillEraserFill fontSize="small" onClick={eraseValLikeLoc} disabled={ApproveFreeseCheck} />
    </IconButton>])

  const SearchButtonClearance = () => (
    [<IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
      {LockCheck ? <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
        onClick={handleCopyDown} disabled={ApproveFreeseCheck} />
        : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter} disabled={ApproveFreeseCheck} />}
    </IconButton>,
    <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
      <BsFillEraserFill fontSize="small" onClick={eraseValClearance} disabled={ApproveFreeseCheck} />
    </IconButton>])

  const SearchButtonStatus = () => (
    [<IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck ? true : (allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F" ? true : false)}>
      {LockCheck ? <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown}
        disabled={ApproveFreeseCheck ? true : (allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F" ? true : false)} />
        : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
          disabled={ApproveFreeseCheck ? true : (allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F" ? true : false)} />}
    </IconButton>,
    <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck ? true : (allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F" ? true : false)}>
      <BsFillEraserFill fontSize="small" onClick={eraseValStatus}
        disabled={ApproveFreeseCheck ? true : (allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F" ? true : false)} />
    </IconButton>])

  const SearchButtonWeight = () => (
    [<IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
      {LockCheck ? <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} disabled={ApproveFreeseCheck} />
        : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter} disabled={ApproveFreeseCheck} />}
    </IconButton>,
    <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
      <BsFillEraserFill fontSize="small" onClick={eraseValWeight} disabled={ApproveFreeseCheck} />
    </IconButton>])

  const SearchButtonReleaseDate = () => (
    [
      <IconButton sx={{ padding: "0px 0px 0px 3px", margin: "0px" }}>
        <CalendarTodayIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} //style={{ fontSize: "11px", }} 
        />
      </IconButton>,
      <IconButton sx={{ padding: "0px 0px 0px 3px", margin: "0px" }} disabled={ApproveFreeseCheck}>
        {LockCheck ? <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} disabled={ApproveFreeseCheck} />
          : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter} disabled={ApproveFreeseCheck} />}
      </IconButton>,
      <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
        <BsFillEraserFill fontSize="small" onClick={eraseValReleaseDate} disabled={ApproveFreeseCheck} />
      </IconButton>])

  const testChange = (e) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value, }));
    setSampleVal((prev) => ({ ...prev, [e.target.name]: e.target.value, }));
  }

  const testChange1 = (e, name) => {
    if (Object.is(e, null) === false) {
      if (name === "LIKE_LOC" || name === "LIKE_LOC_DESC") {
        if (name === "LIKE_LOC") {
          var temp = "LIKE_LOC_DESC"
          setInputValue1((prev) => ({ ...prev, LIKE_LOC: e.STORE, LIKE_LOC_DESC: e.STORE_DESC }));
          setSampleVal((prev) => ({ ...prev, LIKE_LOC: e.STORE, LIKE_LOC_DESC: e.STORE_DESC }));
        }
        if (name === "LIKE_LOC_DESC") {
          var temp = "LIKE_LOC"
          setInputValue1((prev) => ({ ...prev, [name]: e.STORE_DESC, [temp]: e.STORE }));
          setSampleVal((prev) => ({ ...prev, [name]: e.STORE_DESC, [temp]: e.STORE }));
        }
      }
      if (name === "CLEARANCE_IND") {
        var temp = "CLEARANCE_IND_DESC"
        setInputValue1((prev) => ({ ...prev, [name]: e.CODE, [temp]: e.CODE_DESC }));
        setSampleVal((prev) => ({ ...prev, [name]: e.CODE, [temp]: e.CODE_DESC }));
      }
      if (name === "ITEM_LOC_STATUS") {
        var temp = "ITEM_LOC_STATUS_DESC"
        setInputValue1((prev) => ({ ...prev, [name]: e.CODE, [temp]: e.CODE_DESC }));
        setSampleVal((prev) => ({ ...prev, [name]: e.CODE, [temp]: e.CODE_DESC }));
      }
    }

    if (Object.is(e, null) === true) {
      if (name === "LIKE_LOC" || name === "LIKE_LOC_DESC") {
        if (name === "LIKE_LOC") {
          var temp = "LIKE_LOC_DESC"
          setInputValue1((prev) => ({ ...prev, [name]: "", [temp]: "" }));
          setSampleVal((prev) => ({ ...prev, [name]: "", [temp]: "" }));
        }
        if (name === "LIKE_LOC_DESC") {
          var temp = "LIKE_LOC"
          setInputValue1((prev) => ({ ...prev, [name]: "", [temp]: "" }));
          setSampleVal((prev) => ({ ...prev, [name]: "", [temp]: "" }));
        }
      }
      if (name === "CLEARANCE_IND") {
        var temp = "CLEARANCE_IND_DESC"
        setInputValue1((prev) => ({ ...prev, [name]: "", [temp]: "" }));
        setSampleVal((prev) => ({ ...prev, [name]: "", [temp]: "" }));
      }
      if (name === "ITEM_LOC_STATUS") {
        var temp = "ITEM_LOC_STATUS_DESC"
        setInputValue1((prev) => ({ ...prev, [name]: "", [temp]: "" }));
        setSampleVal((prev) => ({ ...prev, [name]: "", [temp]: "" }));
      }
    }
    setSampleVal1([]);
  }

  useEffect(() => {
    if (inputValue) {
      for (const key in inputValue) {
        if (inputValue[key] === '') {
          delete inputValue[key];
        }
      }
    }
    if (inputValue) {
      for (let i = 0; i < Object.keys(inputValue).length; i++) {
        var temp_dict = {}
        if (inputValue[Object.keys(inputValue)[i]].includes("&") || inputValue[Object.keys(inputValue)[i]].includes("%")) {
          inputValue[Object.keys(inputValue)[i]].slice(1)
          temp_dict[Object.keys(inputValue)[i]] = inputValue[Object.keys(inputValue)[i]].slice(1)
          if (temp_dict) {
            for (const key in temp_dict) {
              if (temp_dict[key] === '') {
                delete temp_dict[key];
              }
            }
          }
          const temp = currentPageRows.filter((props) => String(props[Object.keys(inputValue)[i]]).toLowerCase() === String(temp_dict[Object.keys(inputValue)[i]]).toLowerCase())
          setcurrentPageData(temp);
        }
        else {
          const filteredTable = currentPageRows.filter((props) =>
            Object.entries(inputValue).every(
              ([key, val]) =>
                !val.length ||
                props[key]
                  ?.toString()
                  .toLowerCase()
                  .includes(val?.toString().toLowerCase())
            )
          );
          setcurrentPageData(filteredTable);
        }
      }
    }
    if (Object.keys(inputValue).length === 0) {
      setcurrentPageData(currentPageRows)
    }

  }, [inputValue]);

  useEffect(() => {
    if (inputValue1) {
      for (const key in inputValue1) {
        if (inputValue1[key] === '') { delete inputValue1[key]; }
      }
    }
    if (inputValue1) {
      if (currentPageRows.length > 0) {
        const filteredTable = currentPageRows.filter((props) =>
          Object.entries(inputValue1).every(([key, val]) => props[key]?.toString().toLowerCase().includes(val?.toString().toLowerCase()))
        );
        setcurrentPageData(filteredTable);
      }
    }
    if (Object.keys(inputValue1).length === 0) {
      setcurrentPageData(currentPageRows)
    }
  }, [inputValue1]);

  const handleChangeWeight = (e, name) => {
    if (e) {
      if (e.target.name === "WEIGHT_PCT") { setCopyValue((prev) => ({ ...prev, [e.target.name]: e.target.value })) }
    }
  }

  const handleChangeWeight1 = (e, name) => {
    if (e) {
      if (e.target.name === "WEIGHT_PCT") { setInputValue1((prev) => ({ ...prev, [e.target.name]: e.target.value })) }
    }
  }

  const handleRDCopy = (e, date) => {
    if (e === "RELEASE_DATE") { if (Object.is(date, null) === false) { setCopyValue((prev) => ({ ...prev, ["RELEASE_DATE"]: date })) } }
  }

  const handleRDInline = (e, date) => {
    if (e === "RELEASE_DATE") {
      if (Object.is(date, null) === false) { setInputValue1((prev) => ({ ...prev, ["RELEASE_DATE"]: date })) }
      else if (Object.is(date, null) === true) { setInputValue1((prev) => ({ ...prev, ["RELEASE_DATE"]: "" })) }
    }
  }

  const handleChangeValue = (e, name) => {
    if (Object.is(e, null) === false) {
      if (name.name === "LIKE_LOC" || name.name === "LIKE_LOC_DESC") {
        if (name.name === "LIKE_LOC") {
          var temp = "LIKE_LOC_DESC"
          setCopyValue((prev) => ({ ...prev, [name.name]: e.STORE, [temp]: e.STORE_DESC }))
        }
        if (name.name === "LIKE_LOC_DESC") {
          var temp = "LIKE_LOC"
          setCopyValue((prev) => ({ ...prev, [name.name]: e.STORE_DESC, [temp]: e.STORE }))
        }
      }
      if (name.name === "CLEARANCE_IND") {
        var temp = "CLEARANCE_IND_DESC"
        setCopyValue((prev) => ({ ...prev, [name.name]: e.CODE, [temp]: e.CODE_DESC }))
      }
      if (name.name === "ITEM_LOC_STATUS") {
        var temp = "ITEM_LOC_STATUS_DESC"
        setCopyValue((prev) => ({ ...prev, [name.name]: e.CODE, [temp]: e.CODE_DESC }))
      }
    }

    if (Object.is(e, null) === true) {
      if (name.name === "LIKE_LOC" || name.name === "LIKE_LOC_DESC") {
        if (name.name === "LIKE_LOC") {
          var temp = "LIKE_LOC_DESC"
          setCopyValue((prev) => ({ ...prev, [name.name]: "", [temp]: "" }))
        }
        if (name.name === "LIKE_LOC_DESC") {
          var temp = "LIKE_LOC"
          setCopyValue((prev) => ({ ...prev, [name.name]: "", [temp]: "" }))
        }
      }
      if (name.name === "CLEARANCE_IND") {
        var temp = "CLEARANCE_IND_DESC"
        setCopyValue((prev) => ({ ...prev, [name.name]: "", [temp]: "" }))
      }
      if (name.name === "ITEM_LOC_STATUS") {
        var temp = "ITEM_LOC_STATUS_DESC"
        setCopyValue((prev) => ({ ...prev, [name.name]: "", [temp]: "" }))
      }
    }
  }

  const onTableCellChange = (e, value, name) => {
    if (Object.is(e, null) === false) {
      if (name === "LIKE_LOC" || name === "LIKE_LOC_DESC") {
        totalData.map((row) => {
          if (row.LOC === value) {
            row["LIKE_LOC"] = e.STORE
            row["LIKE_LOC_DESC"] = e.STORE_DESC
          }
        })
      }
      if (name === "CLEARANCE_IND") {
        totalData.map((row) => {
          if (row.LOC === value) {
            row["CLEARANCE_IND"] = e.CODE
            row["CLEARANCE_IND_DESC"] = e.CODE_DESC
          }
        })
      }
      if (name === "ITEM_LOC_STATUS") {
        totalData.map((row) => {
          if (row.LOC === value) {
            row["ITEM_LOC_STATUS"] = e.CODE
            row["ITEM_LOC_STATUS_DESC"] = e.CODE_DESC
          }
        })
      }
      if (name === "WEIGHT_PCT") {
        totalData.map((row) => { if (row.LOC === value) { row["WEIGHT_PCT"] = e.target.value } })
      }
      if (name === "RELEASE_DATE") {
        totalData.map((row) => { if (row.LOC === value) { row["RELEASE_DATE"] = e.target.value } })
      }
    }

    if (Object.is(e, null) === true) {
      if (name === "LIKE_LOC" || name === "LIKE_LOC_DESC") {
        totalData.map((row) => {
          if (row.LOC === value) {
            row["LIKE_LOC"] = ""
            row["LIKE_LOC_DESC"] = ""
          }
        })
      }
      if (name === "CLEARANCE_IND") {
        totalData.map((row) => {
          if (row.LOC === value) {
            row["CLEARANCE_IND"] = ""
            row["CLEARANCE_IND_DESC"] = ""
          }
        })
      }
      if (name === "ITEM_LOC_STATUS") {
        totalData.map((row) => {
          if (row.LOC === value) {
            row["ITEM_LOC_STATUS"] = ""
            row["ITEM_LOC_STATUS_DESC"] = ""
          }
        })
      }
    }
    setTotalData(totalData);
    setSampleVal([])
  };

  /// Release Date:

  function convertDateFormat(dateString) {
    // Create a new Date object using the input date string
    var date = new Date(dateString);

    // Get the date components
    var day = date.getDate();
    var month = date.getMonth() + 1; // Month is zero-based, so add 1
    var year = date.getFullYear() % 100; // Get the last two digits of the year

    // Pad the day and month with leading zeros if necessary
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Create the converted date string in the desired format
    var convertedDateString = month + '-' + day + '-' + year;
    //var convertedDateString = year + '-' + month + '-' + day;
    return convertedDateString;
  }

  function convertDateFormat2(dateString) {
    // Create a new Date object using the input date string
    var date = new Date(dateString);

    // Get the date components
    var day = date.getDate();
    var month = date.getMonth() + 1; // Month is zero-based, so add 1
    var year = date.getFullYear(); // Get the last two digits of the year

    // Pad the day and month with leading zeros if necessary
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Create the converted date string in the desired format
    // var convertedDateString = month + '-' + day + '-' + year;
    var convertedDateString = year + '-' + month + '-' + day;
    return convertedDateString;
  }

  function convertDateFormat3(Values) {
    // Create a new Date object using the input date string
    if (Values.length > 0) {
      Values.map(obj => {
        if (String(obj.RELEASE_DATE).length > 0) {
          var releaseDate = obj.RELEASE_DATE;
          const pattern1 = /^\d{4}-\d{2}-\d{2}$/;
          if (pattern1.test(obj.RELEASE_DATE)) {
            var dateParts = releaseDate.split('-');
            const initialDateR = new Date(
              Number(dateParts[0]), // Year
              Number(dateParts[1] - 1), // Month (0-based index)
              Number(dateParts[2]) // Day
            );
            obj["RELEASE_DATE"] = initialDateR
          }
        } else { obj.RELEASE_DATE = "" }
      })
      return Values;
    } else {
      return [];
    }
  }

  function convertDateFormat4(Values) {
    const dateKeys = ['START_DATE1', 'START_DATE2', 'END_DATE1', 'END_DATE2', 'ON_ORDER_COMMIT_DATE'];
    const convertedValues = {};

    for (const key in Values) {
      if (dateKeys.includes(key) && Values[key]) {
        const releaseDate = Values[key];
        const pattern1 = /^\d{4}-\d{2}-\d{2}$/;
        if (pattern1.test(releaseDate)) {
          const dateParts = releaseDate.split('-');
          const initialDate = new Date(
            Number(dateParts[0]), // Year
            Number(dateParts[1] - 1), // Month (0-based index)
            Number(dateParts[2]) // Day
          );
          convertedValues[key] = initialDate;
        }
      } else {
        convertedValues[key] = Values[key];
      }
    }
    return convertedValues;
  }

  function convertDateFormat5(Values) {
    const dateKeys = ['START_DATE1', 'START_DATE2', 'END_DATE1', 'END_DATE2', 'ON_ORDER_COMMIT_DATE'];
    const convertedValues = {};

    for (const key in Values) {
      if (dateKeys.includes(key) && Values[key]) {
        // const releaseDate = Values[key];
        var date = Values[key];

        // Get the date components
        var day = date.getDate();
        var month = date.getMonth() + 1; // Month is zero-based, so add 1
        var year = date.getFullYear(); // Get the last two digits of the year

        // Pad the day and month with leading zeros if necessary
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        var convertedDateString = year + '-' + month + '-' + day;
        convertedValues[key] = convertedDateString;
      } else {
        convertedValues[key] = Values[key];
      }
    }
    return convertedValues;
  }

  const validateDateInput = (input) => {
    if (typeof input === "undefined" || input === null || input.length === 0) {
      return true;
    }
    if (input.length === 8) {
      if (input.slice(-3, -2) === "-" && input.slice(-6, -5) === "-") {
        return false;
      } else {
        return false;
      }
    } else if (/^\d{2}-\d{2}-\d{2}$/.test(input)) {
      const year = input.split("-")[2];
      if (year.length === 2 && !isNaN(year)) {
        return false;
      } else {
        return false;
      }
    } else {
      const isValid = input.replace(/-/g, "").match(/^\d+$/);
      return isValid ? false : false;
    }
  };
  //console.log(searchHeaderData)

  const handleDatePicker = (name, date, value) => {
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const ReleaseDate = date !== null ? new Date(date.getFullYear(), date.getMonth(), date.getDate()) : ""
    switch (name) {
      case "RELEASE_DATE":
        if (name === "RELEASE_DATE") {
          totalData.map((row) => { if (row.LOC === value) { row["RELEASE_DATE"] = date } })
          currentPageData.map((row) => { if (row.LOC === value) { row["RELEASE_DATE"] = date } })
        }
        setTotalData(totalData);
        setTableLocData(totalData);
        const temp = totalData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        const temp1 = currentPageData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp1);
        setcurrentPageRows(temp);
        break;
      default:
        break;
    }
  }

  const handleCopyDown = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') { delete copyValue[key]; }
    }
    if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
      if (selected[0][page].length > 0) {
        const editData = tableLocData.filter((item) => {
          return selected[0][page].some((val) => { return item.LOC === val; });
        });

        const copyUpdate = editData.map(item => { Object.assign(item, copyValue); return item; })

        const updatedTableData = tableLocData.map(obj1 => {
          const copyObj = copyUpdate.find(obj => obj["LOC"] === obj1["LOC"]);
          return copyObj ? { ...obj1, ...copyObj } : obj1;
        });

        setTotalData(updatedTableData)
        setTableLocData(updatedTableData)
        const temp = updatedTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        const combinedList = Object.values(selected[0]).flat()
      }
    }
    // setTotalData(totalData);
    setLockCheck(false);
    setSampleVal(totalData); setCopyValue(initialCopyValues); setInputValue([]); setInputValue1({});
  }

  const eraseValLikeLoc = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') { delete copyValue[key]; }
    }
    if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
      if (selected[0][page].length > 0) {
        const editData = tableLocData.filter((item) => {
          return selected[0][page].some((val) => { return item.LOC === val; });
        });


        editData.map((row) => {
          if (Object.keys(row).includes("LIKE_LOC")) {
            row["LIKE_LOC"] = ""
            row["LIKE_LOC_DESC"] = ""
          }
        });

        const updatedTableData = tableLocData.map(obj1 => {
          const copyObj = editData.find(obj => obj["LOC"] === obj1["LOC"]);
          return copyObj ? { ...obj1, ...copyObj } : obj1;
        });

        setTotalData(updatedTableData)
        setTableLocData(updatedTableData)
        const temp = updatedTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
      }
    }
    setSampleVal([]);
  }

  const eraseValClearance = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') { delete copyValue[key]; }
    }
    if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
      if (selected[0][page].length > 0) {
        const editData = tableLocData.filter((item) => {
          return selected[0][page].some((val) => { return item.LOC === val; });
        });


        editData.map((row) => {
          if (Object.keys(row).includes("CLEARANCE_IND")) {
            row["CLEARANCE_IND"] = ""
            row["CLEARANCE_IND_DESC"] = ""
          }
        })

        const updatedTableData = tableLocData.map(obj1 => {
          const copyObj = editData.find(obj => obj["LOC"] === obj1["LOC"]);
          return copyObj ? { ...obj1, ...copyObj } : obj1;
        });

        setTotalData(updatedTableData)
        setTableLocData(updatedTableData)
        const temp = updatedTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
      }
    }
    setSampleVal([]);
  }

  const eraseValStatus = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') { delete copyValue[key]; }
    }
    if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
      if (selected[0][page].length > 0) {
        const editData = tableLocData.filter((item) => {
          return selected[0][page].some((val) => { return item.LOC === val; });
        });


        editData.map((row) => {
          if (Object.keys(row).includes("ITEM_LOC_STATUS")) {
            row["ITEM_LOC_STATUS"] = ""
            row["ITEM_LOC_STATUS_DESC"] = ""
          }
        })

        const updatedTableData = tableLocData.map(obj1 => {
          const copyObj = editData.find(obj => obj["LOC"] === obj1["LOC"]);
          return copyObj ? { ...obj1, ...copyObj } : obj1;
        });

        setTotalData(updatedTableData)
        setTableLocData(updatedTableData)
        const temp = updatedTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
      }
    }
    setSampleVal([]);
  }

  const eraseValWeight = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') { delete copyValue[key]; }
    }
    if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
      if (selected[0][page].length > 0) {
        const editData = tableLocData.filter((item) => {
          return selected[0][page].some((val) => { return item.LOC === val; });
        });

        editData.map((row) => { if (Object.keys(row).includes("WEIGHT_PCT")) { row["WEIGHT_PCT"] = "" } })

        const updatedTableData = tableLocData.map(obj1 => {
          const copyObj = editData.find(obj => obj["LOC"] === obj1["LOC"]);
          return copyObj ? { ...obj1, ...copyObj } : obj1;
        });

        setTotalData(updatedTableData)
        setTableLocData(updatedTableData)
        const temp = updatedTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
      }
    }
    setSampleVal([]);
  }

  const eraseValReleaseDate = (e) => {
    for (const key in copyValue) {
      if (copyValue[key] === '') { delete copyValue[key]; }
    }
    if (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
      if (selected[0][page].length > 0) {
        const editData = tableLocData.filter((item) => {
          return selected[0][page].some((val) => { return item.LOC === val; });
        });

        editData.map((row) => { if (Object.keys(row).includes("RELEASE_DATE")) { row["RELEASE_DATE"] = "" } })

        const updatedTableData = tableLocData.map(obj1 => {
          const copyObj = editData.find(obj => obj["LOC"] === obj1["LOC"]);
          return copyObj ? { ...obj1, ...copyObj } : obj1;
        });

        setTotalData(updatedTableData)
        setTableLocData(updatedTableData)
        const temp = updatedTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
      }
    }
    setSampleVal([]);
  }

  const handleLockFilter = (e) => {
    setLockCheck(true);
  }

  const resetFilter = () => {
    setInputValue([]);
    if (inputValue.length === 0) { setTotalData(totalData); setSampleVal(totalData); setCopyValue(initialCopyValues); setInputValue([]); setInputValue1({}); }
    else { setTotalData(totalData); setSampleVal(totalData); setCopyValue(initialCopyValues); setInputValue([]); setInputValue1({}); }
    setLockCheck(false);
  }

  const handleRowClick = (rowId) => {
    setSelectedRow(rowId);
  };

  const handleClickOpen = () => {
    if (String(leftContData.WEEKS_LAST_YEAR).length > 0 ||
      String(leftContData.WEEKS_THIS_YEAR).length > 0 ||
      (String(leftContData.START_DATE1).length > 0 && String(leftContData.END_DATE1).length > 0) ||
      (String(leftContData.START_DATE2).length > 0 && String(leftContData.END_DATE2).length > 0)
    ) {
      setRetrieveChangeWeightsRL([]);
      const val = convertDateFormat5(leftContData)
      dispatch(getUPDATERULESRLRLRequest([val]));
      setChangeWeightsDialog(true);
    }
    else {
      setOpenDialogRL(true);
      setDialogDataRL("TY/LY or START/END DATES Inputs required*");
    }
  };

  const HandleSaveChanges = () => {
    const temp = RetrieveChangeWeightsRL.map(obj => ({ ...obj })); // Create a deep copy of each object in totalData

    temp.forEach(obj => { if (String(obj.EOW_DATE).length > 0) { obj.EOW_DATE = convertDateFormat2(obj.EOW_DATE); } });
    dispatch(getUPDATECHANGEWEIGHTSRLRequest(temp));
    setChangeWeightsDialog(false);
  }

  const onTableChange = (e, value) => {
    RetrieveChangeWeightsRL.map((row) => {
      if (row.EOW_DATE === value) {
        row[e.target.name] = e.target.value
      }
    })
    setRetrieveChangeWeightsRL(RetrieveChangeWeightsRL);

  };

  const handleClose = () => {
    setChangeWeightsDialog(false);
  };

  function EnhancedTableHead1(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <>
        <TableHead className={RulesLocationHeaderClasses.TitleHead}>
          <TableRow >
            {WeightsHeader.map((headCell) => (
              <StyledTableCell
                key={headCell.id}
                className={RulesLocationHeaderClasses.TableCell}
                size="small"
                sortDirection={orderBy === headCell.id ? order : false}
                style={{ whiteSpace: "nowrap", paddingLeft: "2px" }}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                  sx={{
                    "&.MuiTableSortLabel-root": {
                      color: "white",
                      fontSize: "0.775rem",
                    },
                    "&.MuiTableSortLabel-root:hover": {
                      color: "#fff",
                    },
                    "&.Mui-active": {
                      color: "#fff",
                    },
                    "& .MuiTableSortLabel-icon": {
                      color: "#fff !important",
                    },
                  }}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

      </>
    );
  }

  EnhancedTableHead1.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  function EnhancedTableToolbar1(props) {
    const { numSelected } = props;
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(RetrieveChangeWeightsRL.length > 0 &&
          {
            minHeight: {
              minHeight: "20px !important",
            },
            // border:"2px solid black", 
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {RetrieveChangeWeightsRL.length > 0 && (
          <Typography
            sx={{
              flex: "1 1 100%", display: "flex",
              justifyContent: "flex-end",
              padding: "0px 20px 0px 0px"
            }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Rows: {RetrieveChangeWeightsRL.length}
          </Typography>
        )}
      </Toolbar>
    );
  }

  const handleRefreshRules = (e) => {
    setCheck1(true);
    setCheck2(true);
    setCheck3(false);
    setCheck4(false);
    setCheck5(false);
    setCheck6(false);
    setCheck7(false);
    setCheck8(false);
    setCheck9(false);

    if (totalData.length > 0) {
      var Loc_sequence = []
      totalData.map(obj => Loc_sequence.push(obj.LOC));
      dispatch(getDELETELOCATIONRLRequest([{ ...allocNoData, "LOC_LIST": Loc_sequence }]));
    }

    setPage(0);
    setcurrentPageData([]);
    setcurrentPageRows([]);
    setAllPageSelected([]);

    setLoading(false);
    setSearchData(initialsearch);
    setTableLocData([]);
    setSelected([{}]);
    setInputValue([]);
    setSampleVal([]);
    setAllocateDefWH(false);
    setAllStoresCheck(false);
    setValLoc([]);
    setValLoc1([]);
    setValLoc2([]);
    setValLoc3([]);
    setInputLoc("");
    setInputLoc1("");
    setInputLoc2("");
    setInputLoc3("");
    setTotalData([]);
    setSelectedRow(null);

    setLoadCheck(false);
    setAllRetreieveRLdataCheck(false);
    setLeftContData((prev) => {
      return {
        ...prev,
        RULE_TYPE: "H",  // Rule Definition
        EXACT_IND: "Y",  // Calc Need Type
        RULE_LEVEL: "S", // Hierarchy
        NET_NEED_IND: "Y", // Allocate On

        RULE_TYPE_VAL: "History", // Rule Definition Value
        EXACT_IND_VAL: "Exact", // Calc Need Type Value
        RULE_LEVEL_VAL: "Sku", // Hierarchy Value
        NET_NEED_IND_VAL: "Net Need", // Allocate On Value


        REGULAR_SALES_IND: "Y", // Regular
        PROMO_SALES_IND: "Y", // Promotional
        CLEARANCE_SALES_IND: "N", // Clearance
        SIZE_PROFILE_IND: "N", // Use Size Profile
        ENFORCE_PRES_MIN_IND: "N", // Default Auto prezi. Min & Qty Limits
        ENFORCE_WH_RL: "Y",  // Allocate From Def WH

        START_DATE1: "",
        END_DATE1: "",
        START_DATE2: "",
        END_DATE2: "",
        WEEKS_THIS_YEAR: "",
        WEEKS_LAST_YEAR: "",
        ON_ORDER_COMMIT_WEEKS: "",
        ON_ORDER_COMMIT_DATE: "",

        ALLOC_NO: allocNoData.ALLOC_NO,
        CHANGEWEIGHTSCHECK: "N",
        TEMPLATE_NO: "",
        CASCADE_IND: "",
        USE_RULE_LEVEL_ON_HAND_IND: "",
        INCLUDE_CLEARANCE_STOCK_IND: "",
        INCLUDE_INV_IN_MIN_IND: "",
        INCLUDE_INV_IN_MAX_IND: "",
        IWOS_WEEKS: "",
        WEEKS_FUTURE: "",
        CORPORATE_RULE_ID: "",
        INCLUDE_MID_TIER_ON_HAND_IND: "",
        LEAD_TIME_NEED_IND: "",
        LEAD_TIME_NEED_RULE_TYPE: "",
        LEAD_TIME_NEED_START_DATE: "",
        LEAD_TIME_NEED_END_DATE: "",
        CONVERT_TO_PACK: "",
      };
    });
    if (allocDetails.length > 0) {
      if (allocDetails[0].ALLOC_CRITERIA === "F") {
        setAllocateDefWH(false);
        setLeftContData((prev) => {
          return {
            ...prev,
            ENFORCE_WH_RL: "N"
          };
        })
      } else {
        setAllocateDefWH(true);
        setLeftContData((prev) => {
          return {
            ...prev,
            ENFORCE_WH_RL: "Y"
          };
        })
      }
    }
  }

  const deleteRecords = () => {
    if (totalData.length > 0 && allPageSelected.length > 0) {
      const updateRows = totalData.filter((val) => {
        return !allPageSelected.includes(val.LOC);
      });

      var temp = {}
      temp["ALLOC_NO"] = searchData.ALLOC_NO
      temp["LOC_LIST"] = allPageSelected
      dispatch(getDELETELOCATIONRLRequest([temp]));
      setTotalData(updateRows);
      setTableLocData(updateRows);
      setSelected([{}]);
      setLoadCheck(true);
      const temp1 = updateRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
      setcurrentPageData(temp1);
      setcurrentPageRows(temp1);
    }
  };
  /*
           #################################################
           ##########  MANAGE COLUMNS IN TABLE  ############
           #################################################
     */


  if (ManageHeaderCheck) {
    var temp = []
    LocationHeader.map(row => temp.push(row.id));
    const temp1 = ['GROUP_ID', 'GROUP_DESC']
    const temp2 = temp.filter(value => !temp1.includes(value));
    setManageHeaderData(temp2);
    setManageHeaderCheck(false);
  }

  const HandleManageHeader = () => {
    setOpenDialogManage(true);
  }
  const handleCloseDialogManage = (e) => {
    if (ManageHeaderData.length > 0) { setOpenDialogManage(false); }
    else { setOpenDialogRL(true); setDialogDataRL("Table must contain atleast one column."); }
  }

  const handleManageHeaderClick = (e, name) => {
    if (e.target.checked === true) {
      const updatedManageHeaderData = [...ManageHeaderData, name];
      setManageHeaderData(updatedManageHeaderData)
    } else {
      const updatedManageHeaderData = ManageHeaderData.filter(item => item !== name);
      setManageHeaderData(updatedManageHeaderData)
    }
  }

  const handleShowAllManageHeader = () => {
    var temp = []
    LocationHeader.map(row => temp.push(row.id));
    setManageHeaderData(temp);
  }

  const headerManage = () => (
    <Box display="inline-block"
      sx={{ backgroundColor: "", height: "auto", padding: "0rem 0rem", width: "100%", }}>
      <div>
        {LocationHeader.map((key) => (
          <div key={key.id}>
            <FormControlLabel
              size="small"
              sx={{ padding: "0px", margin: "0px 0px 0px 0px", }}
              control={
                <Checkbox
                  sx={{ margin: "0px 0px 0px 0px", padding: "2px", paddingTop: "0px" }}
                  color="primary"
                  size="small"
                  onClick={(event) => [handleManageHeaderClick(event, key?.id)]}
                  checked={ManageHeaderData.includes(key.id)}
                  style={{ padding: "0px", textAlign: "center", }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label={<InputLabel
                sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left', }}>
                {key.label}</InputLabel>}
            /></div>
        ))}
      </div>
    </Box>
  )

  //// Paginations ??:: // 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const temp = totalData.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
    setcurrentPageData(temp);
    setcurrentPageRows(temp);
    setInputValue([]);
    setInputValue1({});
    setSampleVal(totalData);
    setCopyValue(initialCopyValues);
    setLockCheck(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box >
      <div className={RulesLocationHeaderClasses.course_box}>
        <Box
          component="fieldset"
          display="inline-block"
          sx={{
            backgroundColor: "",
            height: "auto",
            width: "100%",
            borderRadius: 1,

            boxShadow: 2, border: 0,
            borderBottom: 3,
            border: "1px solid lightgrey",
            margin: "0px 0px 5px 5px",
          }}
        >
          <legend style={{ fontWeight: "bold" }}>Header</legend>
          <div>
            {SearchHeader()}
          </div>
          <div >
            <Box
              display="flex"
              sx={{
                backgroundColor: "",
                height: "auto",
                width: "100%",
                padding: "0px 0px 0px 0px",
                justifyContent: "flex-end",
                marginTop: "2px",
                marginLeft: "0.2rem"
              }}
            >
              {/* <Button
                variant="contained"
                sx={{
                  backgroundColor: "", fontSize: "12px",
                  padding: "5px", fontFamily: "system-ui",
                  width: "100px", marginLeft: "5px", marginTop: "5px",
                }}
                onClick={toggleDrawer("right", true)}
                startIcon={<SearchIcon />}
              >
                Search</Button> */}

              <Button
                sx={{
                  fontSize: "12px",
                  backgroundColor: "#228B22",
                  padding: "5px", fontFamily: "system-ui",
                  width: "100px", marginLeft: "5px", marginTop: "5px",
                }}
                variant="contained"
                //className={CreateAllocationClasses.textField}
                type="submit"
                onClick={ApproveFreeseCheck ? ViewModeFunction : handlesubmitRules}
                startIcon={<DoneAllIcon />}
              >
                OK</Button>

              <Button
                sx={{
                  backgroundColor: "maroon",
                  fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                  width: "100px", marginLeft: "5px", marginTop: "5px",
                }}
                variant="contained"
                //className={RulesLocationHeaderClasses.textField}
                type="submit"
                onClick={ApproveFreeseCheck ? ViewModeFunction : handleCancel}
                startIcon={<CancelIcon />}
              >
                Cancel</Button>
            </Box>
          </div>
        </Box>
      </div>

      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        transitionDuration={300}
        PaperProps={{
          style: { width: "450px" } // Set the desired width value
        }}
      >
        {searchPanel("right")}
      </Drawer>

      <div >
        <Box display="flex" justifyContent='space-between'
          sx={{ margin: "4px 0px 0px 5px", mb: 0, width: "100%", height: "auto", }}
        >
          <Box sx={{ width: "30%", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
            <div>
              <div >
                <Typography style={{ bgcolor: '', fontSize: "16px", fontWeight: "bold", position: "static", padding: "0px", margin: "5px 0px 0px 5px" }}>
                  Rules & History Range
                </Typography></div>
              <div >
                <Typography style={{ bgcolor: '', fontSize: "14px", fontWeight: "bold", position: "static", padding: "0px", marginLeft: "8px" }}>
                  Sales History Types:
                </Typography></div>
            </div>
            <Box component="fieldset" sx={{ margin: "0px 0px 0px 10px", width: "95%", border: 0 }}>
              <div>
                {/* <div className={RulesLocationHeaderClasses.header_child1}> */}
                <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                  control={
                    <Switch
                      disabled={leftContData.RULE_TYPE != 'H' || ApproveFreeseCheck}
                      size="small" name="check1"
                      checked={leftContData.REGULAR_SALES_IND === "Y" ? true : false && leftContData.RULE_TYPE == 'H'}
                      onChange={handleswitchRulecheck}
                      value={leftContData.REGULAR_SALES_IND}
                      inputProps={{ 'aria-label': 'controlled' }}
                      sx={(check1 && leftContData.RULE_TYPE == 'H') ? {
                        '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', },
                      } : null}
                    />
                  }
                  label={<InputLabel
                    sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px", padding: "0px", display: 'inline', float: 'left' }}>
                    Regular</InputLabel>}
                />
                {/* </div> */}

                {/* <div className={RulesLocationHeaderClasses.header_child1}> */}
                <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                  control={
                    <Switch
                      disabled={leftContData.RULE_TYPE != 'H' || ApproveFreeseCheck}
                      size="small" name="check2"
                      defaultChecked
                      checked={check2 && leftContData.RULE_TYPE == 'H'}
                      onChange={handleswitchRulecheck}
                      inputProps={{ 'aria-label': 'controlled' }}
                      sx={(check2 && leftContData.RULE_TYPE == 'H') ? {
                        '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', },
                      } : null}
                    />
                  }
                  label={<InputLabel
                    sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Promotional</InputLabel>}
                />
                {/* </div> */}

                {/* <div className={RulesLocationHeaderClasses.header_child1}> */}
                <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                  control={
                    <Switch
                      disabled={leftContData.RULE_TYPE != 'H' || ApproveFreeseCheck}
                      size="small" name="check3"
                      checked={check3 && leftContData.RULE_TYPE != 'F'}
                      onChange={handleswitchRulecheck}
                      inputProps={{ 'aria-label': 'controlled' }}
                      sx={(check3 && leftContData.RULE_TYPE != 'F') ? {
                        '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', },
                      } : null}
                    />
                  }
                  label={<InputLabel
                    sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Clearance</InputLabel>}
                />

                {/* </div> */}

                {/* <div className={RulesLocationHeaderClasses.header_child1} > */}
                {/* <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                  control={
                    <Switch
                      disabled={ApproveFreeseCheck}
                      size="small" name="AllStoresCheck"
                      checked={AllStoresCheck}
                      onChange={handleswitchRulecheck}
                      inputProps={{ 'aria-label': 'controlled' }}
                      sx={AllStoresCheck ? {
                        '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', },
                      } : null}
                    />
                  }
                  label={<InputLabel
                    sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    All stores</InputLabel>}
                /> */}
                {/* </div> */}
              </div>

              {(allocDetails.length > 0 && allocDetails[0].ALLOC_LEVEL_CODE == 'D') ?
                <div>
                  {/* <div className={RulesLocationHeaderClasses.header_child1} > */}
                  <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                    control={
                      <Switch
                        size="small" name="check4"
                        checked={check4}
                        disabled={ApproveFreeseCheck}
                        onChange={handleswitchRulecheck}
                        inputProps={{ 'aria-label': 'controlled' }}
                        sx={check4 ? {
                          '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', },
                        } : null}
                      />
                    }
                    label={<InputLabel
                      sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left' }}>
                      Use Size Profile</InputLabel>}
                  />
                  {/* </div> */}
                </div> : null}

              <div>
                <FormControlLabel size="small" style={{ padding: "0px 0px 0px 0px", }}
                  control={
                    <Switch
                      size="small" name="check5"
                      disabled={ApproveFreeseCheck}
                      checked={check5}
                      onChange={handleswitchRulecheck}
                      inputProps={{ 'aria-label': 'controlled' }}
                      sx={check5 ? {
                        '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', },
                      } : null}
                    />
                  }
                  label={<InputLabel
                    sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Default Auto prezi.Min &amp; Qty Limits</InputLabel>}
                />

                <FormControlLabel size="small"  //style={{padding: "0px 0px 0px 5px",}}
                  sx={{ margin: "0px", padding: "0px" }}
                  control={
                    <Switch
                      size="small" name="AllocateDefWH"
                      disabled={ApproveFreeseCheck ? true : allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F" ? true : false}
                      checked={allocDetails.length > 0 ? allocDetails[0].ALLOC_CRITERIA !== "F" && AllocateDefWH : AllocateDefWH}
                      onChange={handleswitchRulecheck}
                      inputProps={{ 'aria-label': 'controlled' }}
                      sx={AllocateDefWH ? {
                        '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', },
                      } : null}
                    />
                  }
                  label={<InputLabel
                    sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Allocate from Def WH</InputLabel>}
                />
              </div>
            </Box>

            <div>
              <Typography
                variant="body1"
                style={{
                  cursor: 'pointer', fontSize: "14px", fontWeight: "bold", position: "static", margin: "10px 0px 0px 10px", padding: "0px", width: "95%",
                  backgroundColor: !isExpanded4 ? "#f5f5f5" : 'transparent', // Apply background color when expanded 
                  color: isExpanded4 ? '#191970' : 'inherit',
                  borderRadius: isExpanded4 ? '5px' : '0', // Add border radius when expanded
                }}
                onClick={handleExpandClickDateRange}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                  {isExpanded4 ? (
                    <>
                      <span> DATE RANGE</span>
                      <ExpandLessRoundedIcon style={{ marginLeft: '5px', }} />
                    </>
                  ) : (
                    <>
                      <span> DATE RANGE</span>
                      <ExpandMoreRoundedIcon style={{ marginLeft: '5px', }} />
                    </>
                  )}
                </div>
              </Typography>
              {isExpanded4 && (
                <div >
                  {DrawerDateRange()}
                </div>
              )}
            </div>

            <div>
              <Typography
                variant="body1"
                style={{
                  cursor: 'pointer', fontSize: "14px", fontWeight: "bold", position: "static", margin: "10px 0px 0px 10px", padding: "0px", width: "95%",
                  backgroundColor: !isExpanded3 ? "#f5f5f5" : 'transparent', // Apply background color when expanded 
                  color: isExpanded3 ? '#191970' : 'inherit',
                  borderRadius: isExpanded3 ? '5px' : '0', // Add border radius when expanded
                }}
                onClick={handleExpandClickIncludeInv}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                  {isExpanded3 ? (
                    <>
                      <span> INCLUDE INVENTORY</span>
                      <ExpandLessRoundedIcon style={{ marginLeft: '5px', }} />
                    </>
                  ) : (
                    <>
                      <span> INCLUDE INVENTORY</span>
                      <ExpandMoreRoundedIcon style={{ marginLeft: '5px', }} />
                    </>
                  )}
                </div>
              </Typography>
              {isExpanded3 && (
                <div >
                  {DrawerIncludeInventory()}
                </div>)}
            </div>

            <div>
              <Typography
                variant="body1"
                style={{
                  cursor: 'pointer', fontSize: "14px", fontWeight: "bold", position: "static", margin: "10px 0px 0px 10px", padding: "0px", width: "95%",
                  backgroundColor: !isExpanded1 ? "#f5f5f5" : 'transparent', // Apply background color when expanded 
                  color: isExpanded1 ? '#191970' : 'inherit',
                  borderRadius: isExpanded1 ? '5px' : '0', // Add border radius when expanded
                }}
                onClick={handleExpandClickRules}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                  {isExpanded1 ? (
                    <>
                      <span> RULES</span>
                      <ExpandLessRoundedIcon style={{ marginLeft: '5px', }} />
                    </>
                  ) : (
                    <>
                      <span> RULES</span>
                      <ExpandMoreRoundedIcon style={{ marginLeft: '5px', }} />
                    </>
                  )}
                </div>
              </Typography>
              {isExpanded1 && (
                <div >
                  {DrawerRules()}
                </div>
              )}
            </div>
          </Box>
          <Box sx={{ width: "69.5%", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
            <Paper sx={{ width: "100%", height: "100%", }} //width: "calc(100% - 0px)", 
            >
              <Box display="flex" justifyContent="flex-end" sx={{ width: "99.4%", margin: "0px 0px 0px 5px", }}>
                {/* <div className={RulesLocationHeaderClasses.header_child1}> */}
                {/* <Button
                  sx={{
                    fontSize: "12px",
                    backgroundColor: "",
                    padding: "5px", fontFamily: "system-ui",
                    width: "100px", margin: "2px 4px 2px 0px",
                    '&.Mui-disabled': {
                      opacity: 0.5,
                      backgroundColor: 'DodgerBlue',
                      color: '#fff',
                    },
                  }}
                  startIcon={<DeleteIcon />}
                  onClick={deleteRecords}
                  disabled={ApproveFreeseCheck}
                  variant="contained">
                  Delete
                </Button> */}
                {/* </div> */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      flex: "1",
                      backgroundColor: isSHovered ? '#f5f5f5' : 'white',
                      borderRadius: '20%',
                      padding: "0px 8px 0px 8px",
                      margin: "2px 0px 0px 2px", height: "30px", minHeight: "30px",
                      //border:"1px solid red"
                    }}
                    title="Search"
                    onMouseEnter={handleSEnter}
                    onMouseLeave={handleSLeave}
                    onClick={toggleDrawer("right", true)}
                  >
                    <ManageSearchIcon
                      variant="contained"
                      style={{
                        backgroundColor: isSHovered ? '#f5f5f5' : 'white',
                        //border:"1px solid blue",
                        marginTop: "2px"
                      }}
                      title="Search"
                    />
                  </div>

                  <Button
                    sx={{
                      fontSize: "12px",
                      backgroundColor: "",
                      padding: "5px", fontFamily: "system-ui",
                      width: "100px", margin: "2px 4px 2px 0px",
                      '&.Mui-disabled': {
                        opacity: 0.5,
                        backgroundColor: 'DodgerBlue',
                        color: '#fff',
                      },
                    }}
                    startIcon={<DeleteIcon />}
                    onClick={deleteRecords}
                    disabled={ApproveFreeseCheck}
                    variant="contained">
                    Delete
                  </Button>

                  <div
                    style={{
                      flex: "1",
                      backgroundColor: isSHovered1 ? '#f5f5f5' : 'white',
                      borderRadius: '20%',
                      padding: "0px 8px 0px 8px",
                      margin: "2px 5px 0px 2px",
                      // border: "1px solid red",
                      height: "30px", minHeight: "30px",
                    }}
                    title="Manage Columns"
                    onMouseEnter={handleSEnter1}
                    onMouseLeave={handleSLeave1}
                  >
                    <ViewColumnIcon style={{ padding: "0px", backgroundColor: isSHovered1 ? '#f5f5f5' : 'white', marginTop: "2px", color: "DodgerBlue" }} onClick={HandleManageHeader} title="Manage Columns" />
                  </div>
                </div>

                {/* <Button
                  autoFocus
                  variant="contained"
                  onClick={HandleManageHeader}
                  sx={{
                    backgroundColor: "",
                    padding: "3.5px",
                    margin: "2px 4px 2px 0px",
                    alignItems: "center",
                    width: "fit-content",
                    // border: "1px solid yellow",
                  }}
                  title="Manage Columns"
                ><ViewColumnIcon style={{ padding: "0px" }} /></Button> */}
              </Box>

              <Box
                // component="fieldset"
                display="inline-block"
                sx={{
                  backgroundColor: "",
                  height: "auto",
                  width: "99.2%",
                  borderRadius: 1,

                  boxShadow: 2, border: 0,
                  borderBottom: 3,
                  border: "1px solid lightgray",
                  margin: "0px 0px 5px 5px",
                }}
              >
                <TableContainer
                  style={{ maxHeight: 550, margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px", width: "100%" }}
                  className={RulesLocationHeaderClasses.TitleHead}
                >
                  <Table aria-label="customized table">
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={totalData.length}
                    />
                    <TableBody sx={{ position: "sticky", top: -1, }}>

                      <TableCell padding="checkbox" className={RulesLocationHeaderClasses.TitleHead} sx={{ padding: "0px" }} >
                        <Grid item xs={1} style={{ padding: "0px", margin: "0px 0px 0px 0px" }}>
                          <IconButton small="small" onClick={resetFilter} sx={{ padding: "0px" }}>
                            <RestartAltIcon small="small" sx={{ padding: "0px" }} />
                          </IconButton>
                        </Grid>
                      </TableCell>

                      {ManageHeaderData.includes('LOC') ?
                        <TableCell sx={{ padding: "0px" }} className={RulesLocationHeaderClasses.TitleHead}>
                          <TextField
                            name="LOC"
                            value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOC") > 0 ? inputValue.LOC : ""}
                            onChange={testChange}
                            placeholder="Location"
                            autoComplete="off"
                            InputProps={{ style: { fontSize: 12, height: "20px" }, }}
                            sx={{ width: "100%" }}
                            variant="standard"
                            inputProps={{ sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, } }}
                            disabled={LockCheck}
                          />
                        </TableCell> : null}

                      {ManageHeaderData.includes('LOC_DESC') ?
                        <TableCell sx={{ padding: "0px" }}>
                          <TextField
                            name="LOC_DESC"
                            onChange={testChange}
                            value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOC_DESC") > 0 ? inputValue.LOC_DESC : ""}
                            placeholder="Location Description"
                            autoComplete="off"
                            InputProps={{ style: { fontSize: 12, height: "20px" }, }}
                            sx={{ width: "100%" }}
                            variant="standard"
                            inputProps={{ sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, } }}
                            disabled={LockCheck}
                          />
                        </TableCell> : null}

                      {ManageHeaderData.includes('DEFAULT_WH') ?
                        <TableCell sx={{ padding: "0px" }}>
                          <TextField
                            name="DEFAULT_WH"
                            onChange={testChange}
                            value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("DEFAULT_WH") > 0 ? inputValue.DEFAULT_WH : ""}
                            autoComplete="off"
                            placeholder="Default WH"
                            InputProps={{ style: { fontSize: 12, height: "20px" }, }}
                            sx={{ width: "100%" }}
                            variant="standard"
                            inputProps={{ sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, } }}
                            disabled={LockCheck}
                          />
                        </TableCell> : null}

                      {ManageHeaderData.includes('GROUP_ID') ?
                        <TableCell sx={{ padding: "0px" }}>
                          <TextField
                            name="GROUP_ID"
                            value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("GROUP_ID") > 0 ? inputValue.GROUP_ID : ""}
                            onChange={testChange}
                            autoComplete="off"
                            placeholder="Group ID"
                            InputProps={{ style: { fontSize: 12, height: "20px" }, }}
                            variant="standard"
                            sx={{ width: "100%" }}
                            inputProps={{ sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, } }}
                            disabled={LockCheck}
                          />
                        </TableCell> : null}

                      {ManageHeaderData.includes('GROUP_DESC') ?
                        <TableCell sx={{ padding: "0px" }}>
                          <TextField
                            name="GROUP_DESC"
                            onChange={testChange}
                            value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("GROUP_DESC") > 0 ? inputValue.GROUP_DESC : ""}
                            autoComplete="off"
                            placeholder="Group Desc"
                            InputProps={{ style: { fontSize: 12, height: "20px" }, }}
                            sx={{ width: "100%" }}
                            variant="standard"
                            inputProps={{ sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, } }}
                            disabled={LockCheck}
                          />
                        </TableCell> : null}

                      {ManageHeaderData.includes('LIKE_LOC') ?
                        <TableCell sx={{ padding: "0px" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto" }}>
                            <Select
                              name="LIKE_LOC"
                              placeholder="Allied.."
                              textAlign='center'
                              maxMenuHeight={150}
                              classNamePrefix="mySelect"
                              getOptionLabel={option =>
                                `${option.STORE.toString()}`}
                              getOptionValue={option => option.STORE}
                              options={likeLocData}
                              isSearchable={true}
                              onChange={LockCheck ? handleChangeValue : (e) => testChange1(e, "LIKE_LOC")}
                              menuPlacement="bottom"
                              isClearable={true}
                              closeMenuOnSelect={true}
                              hideSelectedOptions={false}
                              value={LockCheck ? likeLocData.filter(obj => copyValue?.LIKE_LOC === (obj.STORE)) : likeLocData.filter(obj => inputValue1?.LIKE_LOC === (obj.STORE))}
                              styles={styleSelect3}
                            />
                            <SearchButtonLIKE_LOC />
                          </div>
                        </TableCell> : null}

                      {ManageHeaderData.includes('LIKE_LOC_DESC') ?
                        <TableCell sx={{ padding: "0px" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto" }}>
                            <Select
                              name="LIKE_LOC_DESC"
                              maxMenuHeight={150}
                              placeholder="Desc.."
                              classNamePrefix="mySelect"
                              getOptionLabel={option =>
                                `${option.STORE_DESC.toString()}`}
                              getOptionValue={option => option.STORE_DESC}
                              options={likeLocData}
                              isSearchable={true}
                              onChange={LockCheck ? handleChangeValue : (e) => testChange1(e, "LIKE_LOC_DESC")}
                              menuPlacement="bottom"
                              isClearable={true}
                              closeMenuOnSelect={true}
                              hideSelectedOptions={false}
                              value={LockCheck ?
                                likeLocData.filter(obj => copyValue?.LIKE_LOC_DESC === (obj.STORE_DESC)) :
                                likeLocData.filter(obj => inputValue1?.LIKE_LOC_DESC === (obj.STORE_DESC))
                              }
                              styles={styleSelect3}
                            />
                            <SearchButtonLIKE_LOC_DESC />
                          </div>
                        </TableCell> : null}

                      {ManageHeaderData.includes('WEIGHT_PCT') ?
                        <TableCell sx={{ padding: "0px" }}>
                          <TextField
                            placeholder="Weight"
                            name="WEIGHT_PCT"
                            onChange={LockCheck ? handleChangeWeight : handleChangeWeight1}
                            InputProps={{
                              endAdornment: <SearchButtonWeight />,
                              style: { fontSize: 12, height: "20px" }
                            }}
                            sx={{ width: "100%" }}
                            autoComplete="off"
                            inputProps={{ sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, } }}
                            variant="standard"
                            value={LockCheck ?
                              Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("WEIGHT_PCT") > 0 ? copyValue.WEIGHT_PCT : "" :
                              Object.keys(inputValue1).length > 0 && Object.keys(inputValue1).includes("WEIGHT_PCT") > 0 ? inputValue1.WEIGHT_PCT : ""
                            }
                          />
                        </TableCell> : null}

                      {ManageHeaderData.includes('CLEARANCE_IND') ?
                        <TableCell sx={{ padding: "0px" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto" }}>
                            <Select
                              name="CLEARANCE_IND"
                              placeholder="Clearance"
                              maxMenuHeight={150}
                              classNamePrefix="mySelect"
                              getOptionLabel={option =>
                                `${option.CODE_DESC.toString()}`}
                              getOptionValue={option => option.CODE_DESC}
                              options={clearanceRL}
                              isSearchable={true}
                              onChange={LockCheck ? handleChangeValue : (e) => testChange1(e, "CLEARANCE_IND")}
                              menuPlacement="bottom"
                              isClearable={true}
                              closeMenuOnSelect={true}
                              hideSelectedOptions={false}
                              value={LockCheck ?
                                clearanceRL.filter(obj => copyValue?.CLEARANCE_IND_DESC === (obj.CODE_DESC)) :
                                clearanceRL.filter(obj => inputValue1?.CLEARANCE_IND_DESC === (obj.CODE_DESC))
                              }
                              styles={styleSelect3}
                              style={{ maxWidth: '20px' }}
                            />
                            <SearchButtonClearance />
                          </div>
                        </TableCell> : null}

                      {ManageHeaderData.includes('ITEM_LOC_STATUS') ?
                        <TableCell sx={{ padding: "0px" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto" }}>
                            <Select
                              name="ITEM_LOC_STATUS"
                              placeholder="Status"
                              maxMenuHeight={150}
                              classNamePrefix="mySelect"
                              getOptionLabel={option =>
                                `${option.CODE_DESC.toString()}`}
                              getOptionValue={option => option.CODE_DESC}
                              options={statusRL}
                              isSearchable={true}
                              onChange={LockCheck ? handleChangeValue : (e) => testChange1(e, "ITEM_LOC_STATUS")}
                              menuPlacement="bottom"
                              isClearable={true}
                              closeMenuOnSelect={true}
                              hideSelectedOptions={false}
                              value={LockCheck ?
                                statusRL.filter(obj => copyValue?.ITEM_LOC_STATUS_DESC === (obj.CODE_DESC)) :
                                statusRL.filter(obj => inputValue1?.ITEM_LOC_STATUS_DESC === (obj.CODE_DESC))
                              }
                              styles={styleSelect3}
                              style={{ maxWidth: '20px' }}
                            />
                            <SearchButtonStatus />
                          </div>
                        </TableCell> : null}

                      {ManageHeaderData.includes('RELEASE_DATE') ?
                        <TableCell sx={{ padding: "0px" }}>
                          {/* <TextField
                            variant="standard"
                            type="date"
                            size="small"
                            name="RELEASE_DATE"
                            format="yyyy/MM/dd"
                            autoComplete='off'
                            // inputProps={
                            //   { min: allocDetails.length > 0 && allocDetails[0].RELEASE_DATE ? new Date(new Date(allocDetails[0].RELEASE_DATE).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0] }
                            // }
                            sx={{ width: "100%" }}
                            id="outlined-disabled"
                            label=""
                            value={LockCheck ?
                              Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("RELEASE_DATE") > 0 ? copyValue.RELEASE_DATE : "" :
                              Object.keys(inputValue1).length > 0 && Object.keys(inputValue1).includes("RELEASE_DATE") > 0 ? inputValue1.RELEASE_DATE : ""}
                            onChange={LockCheck ? handleChangeWeight : handleChangeWeight1}
                            InputProps={{
                              endAdornment: <SearchButtonReleaseDate />,
                              style: { fontSize: 12, height: "20px" }
                            }}
                            inputProps={{
                              min: allocDetails.length > 0 && allocDetails[0].RELEASE_DATE ? new Date(new Date(allocDetails[0].RELEASE_DATE).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                              sx: { backgroundColor: '#fff', padding: "0px", height: "20px", textAlign: "center", }
                            }}
                          /> */}
                          <DatePicker
                            autoComplete="off"
                            placeholderText="MM-DD-YY"
                            selected={LockCheck ?
                              Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("RELEASE_DATE") > 0 ? copyValue.RELEASE_DATE : "" :
                              Object.keys(inputValue1).length > 0 && Object.keys(inputValue1).includes("RELEASE_DATE") > 0 ? inputValue1.RELEASE_DATE : ""}
                            minDate={LockCheck ? new Date(new Date().setDate(new Date().getDate() + 1)) : null}
                            onChange={LockCheck ? (date) => handleRDCopy("RELEASE_DATE", date) : (date) => handleRDInline("RELEASE_DATE", date)}
                            onChangeRaw={(event) => {
                              if (validateDateInput(event.target.value)) {
                              } else {
                                setOpenDialog(true);
                                setDialogData("Invalid Release Date Input");
                              }
                            }}
                            dateFormat="MM-dd-yy"
                            disabled={ApproveFreeseCheck}
                            customInput={
                              <TextField
                                size="small"
                                variant="outlined"
                                type="text"
                                name="RELEASE_DATE"
                                autoComplete='off'
                                helperText=""
                                sx={{ width: "100%" }}
                                id="outlined-disabled"
                                InputLabelProps={{
                                  style: { fontSize: 12, height: "22px", },
                                  shrink: true,
                                }}
                                InputProps={{
                                  style: (ApproveFreeseCheck) ? sharedInputClassDis : sharedInputClass,
                                  // endAdornment: <SearchButtonReleaseDate />
                                  endAdornment: <SearchButtonReleaseDate />
                                }}
                                inputProps={{
                                  sx: { backgroundColor: '#fff', padding: "0px 3px 0px 3px", height: "20px", textAlign: "center", width: "100%" }
                                }}
                                disabled={ApproveFreeseCheck}
                              />
                            }
                          />
                        </TableCell> : null}

                      {currentPageData
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.LOC);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.LOC}
                              selected={isItemSelected}
                              onClick={() => handleRowClick(row.LOC)}
                              style={selectedRow === row.LOC ? { backgroundColor: "#CDF0FF" } : null}
                            >
                              <TableCell style={{
                                padding: "0px", textAlign: "center", fontSize: "12px", width: "1%"
                              }}>
                                <Checkbox
                                  size="small"
                                  disabled={ApproveFreeseCheck}
                                  onClick={(event) => handleSingleClick(event, row?.LOC)}
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    'aria-labelledby': labelId,
                                  }}
                                  style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                  sx={{ '&.Mui-disabled': { opacity: 0.5, color: 'DodgerBlue', }, }}
                                />
                              </TableCell>
                              {ManageHeaderData.includes('LOC') ?
                                <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                  {row.LOC}
                                </TableCell> : null}

                              {ManageHeaderData.includes('LOC_DESC') ?
                                <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                  {String(row.LOC_DESC).length > 0 ?
                                    <Box
                                      display="flex"
                                      justifyContent="space-between"
                                      sx={{ paddingRight: "0px", width: "100%", boxSizing: "border-box", }}
                                    >
                                      <InputLabel
                                        sx={{
                                          paddingTop: "2px",
                                          fontSize: "12px",
                                          fontFamily: "system-ui",
                                          color: "rgb(10, 10, 10)",
                                          paddingLeft: "2px",
                                          flexGrow: 1, // Expand the label to take available space
                                          marginRight: "8px", // Add a small margin on the right
                                        }}
                                      >
                                        {String(row.LOC_DESC).length > 0 && String(row.LOC_DESC).length < 5 ?
                                          row.LOC_DESC === "NULL" ? null : row.LOC_DESC
                                          : String(row.LOC_DESC).substring(0, 13)}
                                      </InputLabel>
                                      <Button sx={{
                                        backgroundColor: "",
                                        "&:hover": {
                                          backgroundColor: "",
                                        },
                                        border: 0,
                                        color: "CadetBlue",
                                        padding: "1px",
                                        minWidth: 0, // Remove the minimum width
                                      }}
                                        style={{
                                          maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start",
                                        }}
                                        size='small'
                                        className={RulesLocationHeaderClasses.textField}
                                        onClick={() => {
                                          setOpenDialogRL(true);
                                          setDialogDataRL(String(row.LOC_DESC));
                                        }}
                                        startIcon={<InfoIcon size="small" sx={{ fontSize: 16, padding: "0px" }} />}
                                      >
                                      </Button>
                                    </Box> : null}
                                </TableCell> : null}

                              {ManageHeaderData.includes('DEFAULT_WH') ?
                                <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                  {row.DEFAULT_WH}
                                </TableCell> : null}

                              {ManageHeaderData.includes('GROUP_ID') ?
                                <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                  {row.GROUP_ID}
                                </TableCell> : null}

                              {ManageHeaderData.includes('GROUP_DESC') ?
                                <TableCell sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px" }}>
                                  {/* {row.GROUP_DESC} */}
                                  {String(row.GROUP_DESC).length > 0 ?
                                    <Box
                                      display="flex"
                                      justifyContent="space-around"
                                      sx={{ border: 0, }}
                                    >
                                      <InputLabel
                                        sx={{
                                          paddingTop: "3px",
                                          fontSize: "12px",
                                          fontFamily: "system-ui",
                                          // fontWeight:"bold",
                                          color: "rgb(10, 10, 10)",
                                          paddingLeft: "0px",
                                          paddingRight: "0px",
                                        }}
                                      >
                                        {String(row.GROUP_DESC).length > 0 && String(row.GROUP_DESC).length < 5 ?
                                          row.GROUP_DESC === "NULL" ? null : row.GROUP_DESC
                                          : String(row.GROUP_DESC).substring(0, 10) + "..."}
                                      </InputLabel>
                                      <Button sx={{
                                        backgroundColor: "", '&:hover': {
                                          backgroundColor: "",
                                        }, border: 0, color: "CadetBlue"
                                      }}
                                        style={{
                                          maxWidth: '0px', minWidth: '4px', justifyContent: "flex-start", paddingLeft: "0px", paddingRight: "0px"
                                        }}
                                        size='small'
                                        className={RulesLocationHeaderClasses.textField}
                                        onClick={() => {
                                          setOpenDialogRL(true);
                                          setDialogDataRL(String(row.GROUP_DESC));
                                        }}
                                        startIcon={<InfoIcon size="small" sx={{ padding: "0px" }} />}
                                      >
                                      </Button>
                                    </Box> : null}
                                </TableCell> : null}

                              {ManageHeaderData.includes('LIKE_LOC') ?
                                <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                  <Select
                                    name="LIKE_LOC"
                                    isDisabled={ApproveFreeseCheck}
                                    maxMenuHeight={150}
                                    classNamePrefix="mySelect"
                                    getOptionLabel={option =>
                                      `${option.STORE.toString()}`}
                                    getOptionValue={option => option.STORE}
                                    options={likeLocData}
                                    isSearchable={true}
                                    menuPlacement="bottom"
                                    onChange={(e) =>
                                      onTableCellChange(e, row.LOC, "LIKE_LOC")
                                    }
                                    value={likeLocData.filter(obj => row?.LIKE_LOC === (obj.STORE))}
                                    isClearable={true}
                                    closeMenuOnSelect={true}
                                    hideSelectedOptions={false}
                                    styles={styleSelect5}
                                    style={{ maxWidth: '20px' }}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('LIKE_LOC_DESC') ?
                                <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                  <Select
                                    name="LIKE_LOC_DESC"
                                    isDisabled={ApproveFreeseCheck}
                                    maxMenuHeight={150}
                                    classNamePrefix="mySelect"
                                    getOptionLabel={option =>
                                      `${option.STORE_DESC.toString()}`}
                                    getOptionValue={option => option.STORE_DESC}
                                    options={likeLocData}
                                    isSearchable={true}
                                    onChange={(e) =>
                                      onTableCellChange(e, row.LOC, "LIKE_LOC_DESC")
                                    }
                                    menuPlacement="bottom"
                                    value={likeLocData.filter(obj => row?.LIKE_LOC_DESC === (obj.STORE_DESC))}
                                    isClearable={true}
                                    closeMenuOnSelect={true}
                                    hideSelectedOptions={false}
                                    styles={styleSelect5}
                                    style={{ maxWidth: '20px' }}

                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('WEIGHT_PCT') ?
                                <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                ><TextField
                                    variant="outlined"
                                    InputProps={{
                                      style: { fontSize: 12, height: "22px" },
                                    }}
                                    disabled={ApproveFreeseCheck}
                                    name="WEIGHT_PCT"
                                    onChange={(e) => onTableCellChange(e, row.LOC, "WEIGHT_PCT")}
                                    autoComplete="off"
                                    inputProps={{
                                      maxLength: 20,
                                      sx: { backgroundColor: '#fff', padding: "0px 0px 0px 5px", height: "20px", textAlign: "left", }
                                    }}
                                    sx={{ width: "100%" }}
                                    defaultValue={row.WEIGHT_PCT}
                                    value={row.WEIGHT_PCT}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('CLEARANCE_IND') ?
                                <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                  <Select
                                    name="CLEARANCE_IND"
                                    isDisabled={ApproveFreeseCheck}
                                    maxMenuHeight={150}
                                    classNamePrefix="mySelect"
                                    getOptionLabel={option =>
                                      `${option.CODE_DESC.toString()}`}
                                    getOptionValue={option => option.CODE_DESC}
                                    options={clearanceRL}
                                    isSearchable={true}
                                    onChange={(e) =>
                                      onTableCellChange(e, row.LOC, "CLEARANCE_IND")
                                    }
                                    menuPlacement="bottom"
                                    value={clearanceRL.filter(obj => row?.CLEARANCE_IND === (obj.CODE))}
                                    isClearable={true}
                                    closeMenuOnSelect={true}
                                    hideSelectedOptions={false}
                                    styles={styleSelect5}
                                    style={{ maxWidth: '20px' }}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('ITEM_LOC_STATUS') ?
                                <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                  <Select
                                    name="ITEM_LOC_STATUS"
                                    isDisabled={ApproveFreeseCheck ? true : (allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F" ? true : false)}
                                    maxMenuHeight={150}
                                    classNamePrefix="mySelect"
                                    getOptionLabel={option =>
                                      `${option.CODE_DESC.toString()}`}
                                    getOptionValue={option => option.CODE_DESC}
                                    options={statusRL}
                                    isSearchable={true}
                                    onChange={(e) =>
                                      onTableCellChange(e, row.LOC, "ITEM_LOC_STATUS")
                                    }
                                    menuPlacement="bottom"
                                    value={statusRL.filter(obj => row?.ITEM_LOC_STATUS === (obj.CODE))}
                                    isClearable={true}
                                    closeMenuOnSelect={true}
                                    hideSelectedOptions={false}
                                    styles={styleSelect5}
                                    style={{ maxWidth: '20px' }}
                                  />
                                </TableCell> : null}

                              {ManageHeaderData.includes('RELEASE_DATE') ?
                                <TableCell sx={{ padding: "0px", textAlign: "left", }}>
                                  {/* <TextField
                                    variant="outlined"
                                    type="date"
                                    size="small"
                                    name="RELEASE_DATE"
                                    format="yyyy/MM/dd"
                                    autoComplete='off'
                                    disabled={ApproveFreeseCheck}
                                    InputProps={{
                                      style: { fontSize: 12, height: "22px" },
                                    }}
                                    sx={{ width: "100%" }}
                                    onChange={(e) => onTableCellChange(e, row.LOC, "RELEASE_DATE")}
                                    inputProps={{
                                      // min: new Date(new Date(allocDetails[0].RELEASE_DATE).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                                      maxLength: 20,
                                      sx: { backgroundColor: '#fff', padding: "0px", height: "20px", textAlign: "center", }
                                    }}
                                    defaultValue={row.RELEASE_DATE}
                                    value={row.RELEASE_DATE}
                                  /> */}
                                  <DatePicker
                                    autoComplete="off"
                                    placeholderText="MM-DD-YY"
                                    selected={row.RELEASE_DATE}
                                    minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                                    onChange={(date) => handleDatePicker("RELEASE_DATE", date, row.LOC)}
                                    onChangeRaw={(event) => {
                                      if (validateDateInput(event.target.value)) {
                                      } else {
                                        setOpenDialog(true);
                                        setDialogData("Invalid Release Date Input");
                                      }
                                    }}
                                    dateFormat="MM-dd-yy"
                                    disabled={ApproveFreeseCheck}
                                    customInput={

                                      <TextField
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        name="RELEASE_DATE_FROM"
                                        autoComplete='off'
                                        helperText=""
                                        sx={{ width: "100%" }}
                                        id="outlined-disabled"
                                        InputLabelProps={{
                                          style: { fontSize: 12, height: "22px" },
                                          shrink: true,
                                        }}
                                        InputProps={{
                                          style: (ApproveFreeseCheck) ? sharedInputClassDis : sharedInputClass,
                                          endAdornment: (<CalendarTodayIcon style={{ fontSize: "11px", }} />)
                                        }}
                                        inputProps={{
                                          // min: new Date().toISOString().slice(0, 10),
                                          sx: { backgroundColor: '#fff', padding: "0px", height: "20px", textAlign: "center", width: "100%" }
                                        }}
                                        disabled={ApproveFreeseCheck}

                                      />
                                    }
                                  />
                                </TableCell> : null}
                            </TableRow >
                          );
                        })}

                      {currentPageData.length < 20 ?
                        [...Array(20 - (currentPageData.length)).keys()].map(val => (
                          <TableRow  >
                            <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                              <Checkbox style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }} color="primary" size="small" disabled={true} />
                            </TableCell>
                            {ManageHeaderData.map((row, index) => {
                              return (
                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px", height: "20px" }}></TableCell>)
                            })}
                          </TableRow >
                        )) : false}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div style={{ display: 'flex', alignItems: '', justifyContent: "space-between", }}>
                  <span
                    style={{
                      margin: '13px 0px 0px 15px', fontSize: '14px',
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    {Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))
                      ? "Selected : " + String(selected[0][page].length)
                      : null}
                  </span>
                  <div>
                    <div className={RulesLocationHeaderClasses.header_child}>
                      <span
                        style={{
                          margin: '13px 0px 0px 15px', fontSize: '14px',
                          fontFamily: 'Arial, sans-serif',
                        }}
                      >
                        {"Total Selected: " + String(allPageSelected.length)}
                      </span>
                    </div>
                    <div className={RulesLocationHeaderClasses.header_child}>
                      <TablePagination
                        rowsPerPageOptions={[30]}
                        component="div"
                        count={totalData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ '& .MuiToolbar-root': { minHeight: '20px', }, }}
                      />
                    </div>
                  </div>
                </div>
                {/* <Toolbar
              sx={{
                pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, ...(totalData.length > 0 && {
                  minHeight: { minHeight: "25px !important", },
                  bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }), padding: "0px",
              }}
            >
              {totalData.length > 0 && (
                <Typography
                  sx={{ flex: "1 1 100%", display: "flex", justifyContent: "flex-end", padding: "0px 5px 0px 0px", fontSize: "14px", fontFamily: "system-ui", }}
                  color="inherit" variant="subtitle1" component="div"
                >Rows {selected.length} of {totalData.length}
                </Typography>)}
            </Toolbar> */}
              </Box>
            </Paper>
          </Box>
        </Box >
      </div >

      < div >
        {/* onClose={(event, reason) => {
          //   if (reason !== 'backdropClick') {
          //     setChangeWeightsDialog(false);
          //   }
          // }} */}

        <Dialog open={ChangeWeightsDialog}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          maxWidth="md"
          disableBackdropClick
        >
          <DialogTitle style={{
            fontSize: '16px', // Modify the font size here
            height: '25px', // Adjust the height here
            padding: '2px 0px 0px 10px',// Adjust the paddingTop here
            margin: "0px 0px 0px 0px",
          }}
            id="draggable-dialog-title">
            Change Weights
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: '10px',
                top: '4px',
                padding: "0px",
                color: "default"
              }}
              variant="contained"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            style={{
              padding: "5px 10px 0px 10px", width: "fit-content",
              height: "auto",
            }}
          >
            <DialogContentText>
              <Box sx={{ height: "auto", width: "300px" }}>
                <Paper >
                  <TableContainer style={{ maxHeight: 360, }} component={Paper}>
                    <Table aria-label="customized table">
                      <EnhancedTableHead1
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={RetrieveChangeWeightsRL.length}
                      />
                      <TableBody >
                        {RetrieveChangeWeightsRL
                          .map((row, index) => {
                            return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={row.EOW}>
                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}>
                                  {row.EOW_DATE}
                                </TableCell>

                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                  <TextField
                                    InputProps={{ style: { fontSize: 12, height: "30px", }, }}
                                    sx={{ width: "100%" }}
                                    defaultValue={row.WEIGHT}
                                    name="WEIGHT"
                                    onChange={(e) => onTableChange(e, row.EOW_DATE)}
                                    autoComplete="off"
                                    inputProps={{ maxLength: 3, sx: { backgroundColor: '#fff', padding: "0px 0px 0px 5px", height: "30px", textAlign: "left", } }}
                                    disabled={ApproveFreeseCheck}
                                  />
                                </TableCell>
                              </TableRow >
                            );
                          })}
                        {RetrieveChangeWeightsRL.length < 5 ?
                          [...Array(5 - (RetrieveChangeWeightsRL.length)).keys()].map(val => (
                            <TableRow  >
                              <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 4 }}></StyledTableCell>
                              <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 4 }}></StyledTableCell>
                            </TableRow >
                          )) : false}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {RetrieveChangeWeightsRL.length > 0 ? <EnhancedTableToolbar1 /> : null}
                </Paper>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "", paddingTop: "2px" }}>
            <Button autoFocus onClick={HandleSaveChanges} startIcon={<DoneAllIcon />}
              variant="contained" sx={{
                height: "fit-content", width: "150px", padding: "5px",
                backgroundColor: "green", fontSize: "12px", margin: "0px 0px 0px 5px",
              }}
            >
              Save changes</Button>
          </DialogActions>
        </Dialog>
      </div >

      <div>
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openDialogRL}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          disableBackdropClick
        >
          <DialogTitle sx={{
            margin: "0px", padding: "15px 0px 0px 0px",
          }}>
          </DialogTitle>
          <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", }} >
            {DialogDataRL}
          </DialogContent>
          <DialogActions>
            <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px" }}
              onClick={handleCloseDialog} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          // fullWidth={true}
          maxWidth="xs"
          open={openDialogManage}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          disableBackdropClick
        >
          <DialogTitle sx={{
            fontSize: '18px', // Modify the font size here

            height: '25px', // Adjust the height here
            padding: '2px 0px 2px 12px',// Adjust the paddingTop here
            margin: "0px 0px 0px 0px",
          }}>Manage Columns</DialogTitle>
          <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", height: "240px", margin: "0px 10px 0px 10px" }} >
            {headerManage()}
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "space-between", }}>
            <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "125px" }}
              onClick={handleShowAllManageHeader} autoFocus variant="contained" startIcon={<AnimationIcon />}>
              Show All
            </Button>

            <Box>
              <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 0px 0px 0px", width: "100px" }}
                onClick={handleCloseDialogManage} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                Ok
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </div>

      <Modal open={LoadCheck}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      </Modal>
    </Box >
  )
}

export default RulesAndLocation