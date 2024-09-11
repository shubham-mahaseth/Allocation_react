import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import Table from "../../Components/Table/index";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
// import InfoIcon from '@mui/icons-material/Info';
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import Drawer from "@mui/material/Drawer";
import { makeStyles, withStyles } from "@mui/styles";
import {
  getWarehouseRequest,
  getSUPPLIERRequest,
  getSUPPLIERSITERequest,
  getPACKNORequest,
  getDIFFRequest,
  getSKURequest,
  getITEM_LIST_HEADRequest,
  getVPNRequest,
  getUDARequest,
  getPORequest,
  getHIERRequest,
  getEXCLUDEUDARequest,
  getALLOC_LEVELRequest,
  getALLOC_TYPERequest,
  getCONTEXT_TYPERequest,
  getPROMOTIONRequest,
  getSTATUSRequest,
  postALLOCRESULTRequest,
  getALLOC_CRITERIARequest,
  postALLOCINSERTRequest,
  getITEMPARENTRequest,
  getHIER2Request,
  getHIER3Request,
  postALLOCRESULTCWHRequest,
  getASNRequest,
  postALLOCRESULTCASNRequest,
  getTSFRequest,
  postALLOCRESULTCTSFRequest,
  getALLOCNORequest,
  getALLOC_AVAIL_SEARCHRequest,
  getALLOC_AVAIL_QTYRequest,
  getUPDATESELINDCREATERequest,
  getSWITCHTABFUNCRequest,
  getDELETECREATEGRIDRequest,
  getCREATEREFRESHGRIDRequest,
  postCALCRequest,
} from "../../Redux/Action/createAllocation";
import { getRTVRLDATARequest } from "../../Redux/Action/rules&location";
import CircularProgress from "@mui/material/CircularProgress";
// import { headCells } from "./tableHead";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";
//import { trnType } from "./transType.js";
// import { errorList } from "./errorType.js";
// import _ from "lodash";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import swal from '@sweetalert/with-react';
// import TrnTypeList from "../TRNTYPE";
import Select, { components } from 'react-select';
import makeAnimated, { Input } from 'react-select/animated';
import { ConstructionOutlined } from "@mui/icons-material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { headCells } from "./tableHead";
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import Toolbar from "@mui/material/Toolbar";
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from "@mui/material/Tab";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from '@mui/icons-material/Info';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DataGrid } from '@mui/x-data-grid';
import ForwardIcon from '@mui/icons-material/Forward';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Card, CardContent, ListItemIcon } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
// import SearchIcon from '@mui/icons-material/Search';
import CachedIcon from '@mui/icons-material/Cached';
import RefreshIcon from '@mui/icons-material/Refresh';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { height } from "@mui/system";
//import "./index.css";
import QuantityLimits from "../QuantityLimits/index";
import LikeItemMap from "../LikeItem/index";
import RulesAndLocation from "../Rules/index";
import ScheduleAlloc from "../ScheduleAlloc";
import AllocDetails from "../AllocDetails/AllocDetails";
import AllocDetailsPack from "../AllocDetails/AllocDetailPack"
import WhatIFSummary from "../WhatIFSummary/index";
import SizeDetails from "../SizeDetails"
import AllocSummary from "../AllocSummary/AllocSummary"
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import TabScrollButton from '@material-ui/core/TabScrollButton';
// import { GET_SWITCHTABFUNC_REQUEST } from "../../Redux/constant";
// import { set } from "immer/dist/internal";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const animatedComponents = makeAnimated();

const styleSelect = {
  control: base => ({
    ...base,
    width: "180px",
    fontSize: "13px",
    // height:"25px",
    minHeight: "30px",
    border: "1px solid rgb(170, 170, 170)",
    // This line disable the blue border
    // borderRadius: "0",
    // backgroundColor:"#f0f0f0",
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    // borderColor: state.isFocused ?
    //       '#ddd' : isValid ?
    //       '#ddd' : 'red',
    // '&:hover': {
    //   borderColor: state.isFocused ?
    //     '#ddd' : isValid ?
    //     '#ddd' : 'red'
    // }
    // border:"1px solid red"
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 1,
    // border:"1px solid black"
  }),
  clearIndicator: (base) => ({
    ...base,
    // paddingTop: 0,
    padding: 0,
    color: 'rgb(90,90,90)',
    // border:"1px solid orange"
  }),
  valueContainer: (provided) => ({
    ...provided,
    minHeight: '30px',
    // maxHeight: '30px',
    height: '30px',
    paddingTop: '0px',
    paddingBottom: '0px',
    // border:"1px solid green"
  }),
  singleValue: (provided) => ({
    ...provided,
    // minHeight: '1px',
    // paddingBottom: '0px',
    // border:"1px solid blue"
  }),
  input: (provided) => ({
    ...provided,
    width: "100%",
    // border:"1px solid violet"
  }),
  option: provided => ({
    ...provided,
    // color: 'blue',
    fontSize: "12px",
    // border:"1px solid lightgreen"
  }),
  menu: base => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // border:"1px solid lightblue",
    // backgroundColor: 'black',
    // kill the gap
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    // border:"1px solid pink"
  })
};

const tabStyle = { border: "solid 1px", borderRadius: '12px 12px 0px 0px', marginRight: '5px' }

const theme = createTheme({
  palette: {
    // Change the indicator color to red
    indicator: {
      main: "red",
    },
  },
});

const tabStyleCalc = {
  border: "solid 1px", borderRadius: '12px 12px 0px 0px', marginRight: '5px',//borderColor:"1px solid grey",color:"grey",
  // Set the background color to white by default
  //backgroundColor: "red",
  // Add padding to the tab to create some space around the label
  padding: "10px",
  // Set the cursor to pointer to indicate that the tab is clickable
  cursor: "pointer",
  '&.Mui-selected': {
    outline: '1px',
    color: "grey", borderColor: "grey",
    //borderBottom:"1px solid red"
  },

}


const activeTabStyle = {
  // Set the background color to a different color when the tab is active
  ackgroundColor: "lightblue",
  border: "1px solid grey",
};


const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    // backgroundColor:"yellow",
    // width:"100%",
    width: "calc(95vw - 0px)",
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
    // backgroundColor:"yellow"
  },
  uploaddiv: {
    display: "flex",
    alignItems: "center",
    marginTop: "50px",
    textAlign: "start",
    gap: 20,
    // backgroundColor:"lightgreen"
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
  input: {
    // width: "250px",
    height: "30px",
    // background: "rgb(255, 255, 255)",
    '& input + fieldset': {
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
      // borderColor: 'gray',
    },
  },
  formRadio: {
    "& .MuiSvgIcon-root": {
      height: 18,
      width: 18,
    }
  },
  inputField: {
    width: "100%",
    height: 37.8,
    // margin:"10px 0px 0px 0px",
    // height: 30,

    backgroundColor: "#f0f0f0",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  },
  inputFieldTable: {
    width: "100%",
    height: 37.8,
    // margin:"10px 0px 0px 0px",
    // height: 30,
    backgroundColor: "#f0f0f0",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  },
  inputFielddate: {
    width: "180px",
    // margin: "1px 0px 0px 0px",
    height: "30px",
    // border: 0,
    // backgroundColor:"#f0f0f0",
    '& input + fieldset': {
      // backgroundColor:"white",
      // borderColor: 'gray',
      // borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    },
  },
  float_container: {
    display: "inline-block",
    // margin: "0.3rem",
    // padding: "1rem 1rem",
    // text-align: center;
  },
  float_child: {
    display: "inline-block",
    // border: "1px solid red",
    margin: "0px 0px 0px 8px",
    padding: "0rem 0rem",
    verticalAlign: "middle",
  },
  container: {
    display: "flex",
    float: "left"
  },
  container_child: {
    float: "left"
  },
  container_button: {
    // margin:"0.5rem"
  },
  grid_child: {
    display: "inline-block",
    // border: "1px solid red",
    padding: "0rem 0.2rem",
    // verticalAlign: "middle",
  },
  course_box: {
    width: "100%",
    // margin:"0 auto",
    // display: "block",
    // flexWrap:"wrap",
  },
  course_list: {
    // backgroundColor:"lightgreen",
    // position: "relative"
  },
  listdropdown: {
    padding: "0"
  },
  hoverdropdown: {
    display: "inline-block",
    fontSize: "20px",
  },
  grid_block: {
    display: "inline-block",
    // border: "1px solid red",
    padding: "0rem 0rem",
    verticalAlign: "middle",
  },
  grid_container: {
    display: "inline-block",
    // margin: "0.3rem",
  },
  header_container: {
    display: "inline-block",
    // marginTop: "0.2rem",
    // padding: "1rem 1rem",
    // text-align: center;
  },
  header_child: {
    display: "inline-block",
    // border: "1px solid red",
    padding: "0rem 0.2rem",
    verticalAlign: "middle",
  },
  grid_child1: {
    display: "inline-block",
    // border: "1px solid red",
    padding: "0rem 0rem",
    // verticalAlign: "middle",
  },
  TableCell: {
    color: "#fff",
    padding: "6px 6px !important",
    lineHeight: "1.2rem !important",
  },
  TitleHead: {
    // height: "20px",
    position: "sticky",
    top: -1,
  },
  multiselectfield: {
    display: "inline-block",
    // border: "1px solid red",
    margin: "0rem",
    padding: "0rem 0rem",
    verticalAlign: "middle",
  },
  root: {
    "& .MuiFilledInput-root": {
      background: "rgb(232, 241, 250)"
    }
  },
  TitleRow: {
    height: 20
  },
  Desc_column: {
    // border: "2px solid red",
    fontSize: "13px",
    // fontFamily: "system-ui",
    color: "black",
    padding: "0px"
  },
});


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      width: "100%",
      maxWidth: "1000px",  // Set your width here
    },
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}


const initialDataCCommon = {
  HIER1: [],
  HIER2: [],
  HIER3: [],
  WH: [],
  SUPPLIER: [],
  SUPPLIER_SITE: [],
  PACK_NO: [],
  ITEM_PARENT: [],
  DIFF_ID: [],
  SKU: [],
  ITEM_LIST_NO: [],
  VPN: [],
  UDA: [],
  UDA_VALUE: [],
  EXCLUDE_UDA: [],
  EXCLUDE_UDA_VALUE: [],
}

const initialDataPO = {
  PO: [],
  PO_TYPE: [],
  ESID_FROM: [],
  ESID_TO: [],
  NOT_BEFORE_DATE_FROM: [],
  NOT_BEFORE_DATE_TO: [],
}

const initialDataWH = {
  WHATIF_SOURCE_TYPE_IND: 0,
  WH_SOURCE_TYPE_IND: 1,
  MIN_AVAIL_QTY: "",
  MAX_AVAIL_QTY: "",
  ITEM_GRANDPARENT: [],
  CLEARANCE_IND: "NULL",
  RECALC_IND: "NULL"
}

const initialDataASN = {
  ASN: [],
}

const initialDataTSF = {
  TSF: [],
}

const initialHeaderData = {
  ALLOC_CRITERIA: "",
  CONTEXT: "",
  ALLOC_LEVEL: "",
  ALLOC_TYPE: "",
  STATUS: "",
  PROMOTION: "",
  CREATE_ID: JSON.parse(localStorage.getItem("userData"))?.username,
  ALLOC_DESC: "",
  RELEASE_DATE: new Date().toISOString().slice(0, 10),
  ALLOC_NO: "",
  ALLOC_LEVEL_CODE: "",
  ALLOC_TYPE_CODE: "",
  STATUS_CODE: "",
  PROMOTION_CODE: "",
  CONTEXT_CODE: "",
}

const options = [
  // { value: "None" },
  { value: "PURCHASE_ORDER" },
  { value: "WAREHOUSE" },
  { value: "ASN" },
  { value: "TRANSFER" },
  { value: "WHAT_IF" },
];




const CreateAllocation = () => {
  const [searchDataCCommon, setSearchDataCCommon] = useState(initialDataCCommon);
  const [searchDataCPO, setSearchDataCPO] = useState(initialDataPO);
  const [searchDataCWH, setSearchDataCWH] = useState(initialDataWH);
  const [searchDataCASN, setSearchDataCASN] = useState(initialDataASN);
  const [searchDataCTSF, setSearchDataCTSF] = useState(initialDataTSF);
  const [isSearch, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [tabledata, setTabledata] = useState("");
  const [totalData, setTotalData] = useState([]);
  const [allData, setAllData] = useState("");
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [searchHeaderData, setSearchHeaderData] = useState(initialHeaderData);
  const [headerDis, setHeaderDis] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [tab, setTab] = React.useState('1');

  const [isValidCTEDF, setIsValidCTEDF] = useState(false);
  const [isValidCTNDF, setIsValidCTNDF] = useState(false);
  const [isValidCTEDT, setIsValidCTEDT] = useState(false);
  const [isValidCTNDT, setIsValidCTNDT] = useState(false);
  const [isGreatCTEDF, setIsGreatCTEDF] = useState(false);
  const [isGreatCTNDF, setIsGreatCTNDF] = useState(false);
  const [isGreatCTEDT, setIsGreatCTEDT] = useState(false);
  const [isGreatCTNDT, setIsGreatCTNDT] = useState(false);


  ///////////////////////////////////////////
  ///API WEB SERVICE DATA //
  ////////////////////////////////////

  const [warehouseData, setWarehouseData] = useState([{}]);
  const [supplierData, setSupplierData] = useState([{}]);
  const [supplerSiteData, setSupplerSiteData] = useState([{}]);
  const [packNoData, setPackNoData] = useState([{}]);
  const [diffData, setDIffData] = useState([{}]);
  const [skuData, setSkuData] = useState([{}]);
  const [itemListHeadData, setItemListHeadData] = useState([{}]);
  const [vpnData, setVpnData] = useState([{}]);
  const [udaData, setUdaData] = useState([{}]);
  const [poData, setPoData] = useState([{}]);
  const [hierData, setHierData] = useState([{}]);
  const [hier2Data, setHier2Data] = useState([{}]);
  const [hier3Data, setHier3Data] = useState([{}]);
  const [excludeUdaData, setExcludeUdaData] = useState([{}]);
  const [allocLevelData, setAllocLevelData] = useState([{}]);
  const [allocTypeData, setAllocTypeData] = useState([{}]);
  const [contextTypeData, setContextTypeData] = useState([{}]);
  const [promotionData, setPromotionData] = useState([{}]);
  const [statusData, setStatusData] = useState([{}]);
  const [asnData, setAsnData] = useState([{}]);
  const [tsfData, setTsfData] = useState([{}]);
  const [criteriaData, setCriteriaData] = useState([{}]);
  const [itemParentData, setItemParentData] = useState([{}]);
  const [allocNoData, setAllocNoData] = useState([]);
  const [statusCreateData, setStatusCreateData] = useState([{}]);
  const [availQty, setAvailQty] = useState([]);
  const [availSearch, setAvailSearch] = useState([]);
  const [valAvailQty, setValAvailQty] = useState([]);

  const [openAvailDialog, setOpenAvailDialog] = React.useState(false);
  const [availCheck, setAvailCheck] = useState(false);
  const [totalAvailQty, setTotalAvailQty] = useState(0)
  const [valueSelIndCreate, setValueSelIndCreate] = useState([]);
  const [UpdateSelIndCreate, setUpdateSelIndCreate] = useState([{}]);
  const [deleteCreateGrid, setDeleteCreateGrid] = useState([]);
  const [CreateRefreshGridGrid, setCreateRefreshGridGrid] = useState([]);
  const [isValidQtyLimits, setIsValidQtyLimits] = useState(false);
  const [splitCreateFunction, setSplitCreateFunction] = useState([]);


  ///////////////////////////////////////////
  ///CRITERIA PURCHASE ORDER//
  ////////////////////////////////////

  const [inputHIER1CCommon, setInputHIER1CCommon] = useState("");
  const [inputHIER2CCommon, setInputHIER2CCommon] = useState("");
  const [inputHIER3CCommon, setInputHIER3CCommon] = useState("");
  const [inputITEM_PARENTCCommon, setInputITEM_PARENTCCommon] = useState("");
  const [valHIER1CCommon, setValHIER1CCommon] = useState([]);
  const [valHIER2CCommon, setValHIER2CCommon] = useState([]);
  const [valHIER3CCommon, setValHIER3CCommon] = useState([]);
  const [valITEM_PARENTCCommon, setValITEM_PARENTCCommon] = useState([]);
  const [inputWHCCommon, setInputWHCCommon] = useState("");
  const [valWHCCommon, setValWHCCommon] = useState([]);
  const [inputSUPPLIERCCommon, setInputSUPPLIERCCommon] = useState("");
  const [valSUPPLIERCCommon, setValSUPPLIERCCommon] = useState([]);
  const [inputSUPPLIER_SITECCommon, setInputSUPPLIER_SITECCommon] = useState("");
  const [valSUPPLIER_SITECCommon, setValSUPPLIER_SITECCommon] = useState([]);
  const [inputPACK_NOCCommon, setInputPACK_NOCCommon] = useState("");
  const [valPACK_NOCCommon, setValPACK_NOCCommon] = useState([]);
  const [inputDIFF_IDCCommon, setInputDIFF_IDCCommon] = useState("");
  const [valDIFF_IDCCommon, setValDIFF_IDCCommon] = useState([]);
  const [inputSKUCCommon, setInputSKUCCommon] = useState("");
  const [valSKUCCommon, setValSKUCCommon] = useState([]);
  const [inputITEM_LIST_NOCCommon, setInputITEM_LIST_NOCCommon] = useState("");
  const [valITEM_LIST_NOCCommon, setValITEM_LIST_NOCCommon] = useState([]);
  const [inputVPNCCommon, setInputVPNCCommon] = useState("");
  const [valVPNCCommon, setValVPNCCommon] = useState([]);
  const [inputUDACCommon, setInputUDACCommon] = useState("");
  const [valUDACCommon, setValUDACCommon] = useState([]);
  const [inputUDA_VALUECCommon, setInputUDA_VALUECCommon] = useState("");
  const [valUDA_VALUECCommon, setValUDA_VALUECCommon] = useState([]);
  const [filterUDAValueCCommon, setFilterUDAValueCCommon] = useState([]);
  const [inputEXCLUDE_UDACCommon, setInputEXCLUDE_UDACCommon] = useState("");
  const [valEXCLUDE_UDACCommon, setValEXCLUDE_UDACCommon] = useState([]);
  const [filterEXCLUDE_UDAValueCCommon, setFilterEXCLUDE_UDAValueCCommon] = useState([]);
  const [inputEXCLUDE_UDA_VALUECCommon, setInputEXCLUDE_UDA_VALUECCommon] = useState("");
  const [valEXCLUDE_UDA_VALUECCommon, setValEXCLUDE_UDA_VALUECCommon] = useState([]);


  const [inputPOCPO, setInputPOCPO] = useState("");
  const [valPOCPO, setValPOCPO] = useState([]);
  const [inputPO_TYPECPO, setInputPO_TYPECPO] = useState("");
  const [valPO_TYPECPO, setValPO_TYPECPO] = useState([]);

  const [inputASNCASN, setInputASNCASN] = useState("");
  const [valASNCASN, setValASNCASN] = useState([]);

  const [inputTSFCTSF, setInputTSFCTSF] = useState("");
  const [valTSFCTSF, setValTSFCTSF] = useState([]);

  const [tabCond, setTabCond] = useState(false);
  const [rTabCond, setRTabCond] = useState(false);
  const [disCond, setDisCond] = useState(0);
  const [switchVal, setSwitchVal] = useState(0);
  const [rtvCond, setRtvCond] = useState(false);
  const [switchTab, setswitchTab] = useState([]);
  const [limData, setLIMData] = useState([]);
  const [rtvrldata, setrtvrldata] = useState([])
  const [qtyCheckData, setqtyCheckData] = useState([]);
  const [OkRulesLocationCheck, setOkRulesLocationCheck] = useState(false);


  ///////////////////////////////////////////
  ///CRITERIA WAREHOUSE//
  ////////////////////////////////////

  // **** Selected Data ****
  const [selData, setSelData] = useState([]);
  var check = false;

  const theme = useTheme();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const CreateAllocationClasses = useStyles();

  const CreateAllocationData = useSelector(
    (state) => state.CreateAllocationReducers
  );

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Create Allocation';
  }, []);


  var valPost = [];

  useEffect(() => {
    setLoading(true);
    if (!check) {
      dispatch(getALLOCNORequest([{}]));
      dispatch(getHIERRequest([{}]));
      dispatch(getALLOC_LEVELRequest([{}]));
      dispatch(getALLOC_TYPERequest([{}]));
      dispatch(getCONTEXT_TYPERequest([{}]));
      dispatch(getPROMOTIONRequest([{}]));
      dispatch(getSTATUSRequest([{}]));
      check = true
    }
    else {
      dispatch(getWarehouseRequest([{}]));
      dispatch(getSUPPLIERRequest([{}]));
      dispatch(getSUPPLIERSITERequest([{}]));
      dispatch(getITEM_LIST_HEADRequest([{}]));
      dispatch(getPORequest([{}]));
      dispatch(getASNRequest([{}]));
      dispatch(getTSFRequest([{}]));
      dispatch(getALLOC_CRITERIARequest([{}]));
    }
    setTotalData([]);
  }, [""]);


  useEffect(() => {
    // setLoading(true);

  }, [""]);



  const serializedata = (datatable) => {
    let newTabledata = [];
    let count = 1;
    if (datatable.length > 0) {
      datatable.map(item => {
        item['SR_NO'] = count;
        const reorder = {
          'ALLOC_NO': [],
          'ALLOC_CRITERIA': [],
          'SPLIT_IND': [],
          'ALLOC_TYPE': [],
          'CREATE_ID': [],
          'CREATE_DATETIME': [],
          'ITEM': [],
          'ITEM_DESC': [],
          'DIFF_ID': [],
          'HIER1': [],
          'HIER2': [],
          'HIER3': [],
          'LOC': [],
          'AVAIL_QTY': [],
          'CLEARANCE_IND': [],
          'REF_1': [],
          'VPN': [],
          'INACTIVE_QTY': [],
          'HOLDBACK_QTY': [],
          // 'HOLDBACK_TYPE': [],
        }
        count++;

        let test = Object.assign(reorder, item);
        newTabledata.push(test);
      })
      // setTabledataclone(newTabledata)
      return newTabledata;
    }
  }

  useEffect(() => {
    if (CreateAllocationData?.data?.totalData && Array.isArray(CreateAllocationData?.data?.totalData)) {
      setTotalData([]);
      setTabledata(serializedata(CreateAllocationData?.data?.totalData));
      setAllData(serializedata(CreateAllocationData?.data?.totalData));
      setTotalData(serializedata(CreateAllocationData?.data?.totalData));
      setLoading(false);
      setSubmit(false);
      setSearch(false);
    }
    else if (CreateAllocationData?.data?.warehouseData && Array.isArray(CreateAllocationData?.data?.warehouseData)
    ) {
      setWarehouseData(CreateAllocationData?.data?.warehouseData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.supplierData &&
      Array.isArray(CreateAllocationData?.data?.supplierData)
    ) {
      setSupplierData(CreateAllocationData?.data?.supplierData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.supplerSiteData &&
      Array.isArray(CreateAllocationData?.data?.supplerSiteData)
    ) {
      setSupplerSiteData(CreateAllocationData?.data?.supplerSiteData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.packNoData &&
      Array.isArray(CreateAllocationData?.data?.packNoData)
    ) {
      setPackNoData(CreateAllocationData?.data?.packNoData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.diffData &&
      Array.isArray(CreateAllocationData?.data?.diffData)
    ) {
      ////////console.log("CreateAllocationData?.data?.diffData:",CreateAllocationData?.data)
      setDIffData(CreateAllocationData?.data?.diffData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.skuData &&
      Array.isArray(CreateAllocationData?.data?.skuData)
    ) {
      setSkuData(CreateAllocationData?.data?.skuData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.itemListHeadData &&
      Array.isArray(CreateAllocationData?.data?.itemListHeadData)
    ) {
      setItemListHeadData(CreateAllocationData?.data?.itemListHeadData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.vpnData &&
      Array.isArray(CreateAllocationData?.data?.vpnData)
    ) {
      setVpnData(CreateAllocationData?.data?.vpnData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.udaData &&
      Array.isArray(CreateAllocationData?.data?.udaData)
    ) {
      setUdaData(CreateAllocationData?.data?.udaData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.poData &&
      Array.isArray(CreateAllocationData?.data?.poData)
    ) {
      setPoData(CreateAllocationData?.data?.poData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.hierData &&
      Array.isArray(CreateAllocationData?.data?.hierData)
    ) {
      setHierData(CreateAllocationData?.data?.hierData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.hier2Data &&
      Array.isArray(CreateAllocationData?.data?.hier2Data)
    ) {
      setHier2Data(CreateAllocationData?.data?.hier2Data);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.hier3Data &&
      Array.isArray(CreateAllocationData?.data?.hier3Data)
    ) {
      setHier3Data(CreateAllocationData?.data?.hier3Data);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.excludeUdaData &&
      Array.isArray(CreateAllocationData?.data?.excludeUdaData)
    ) {
      setExcludeUdaData(CreateAllocationData?.data?.excludeUdaData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.allocLevelData &&
      Array.isArray(CreateAllocationData?.data?.allocLevelData)
    ) {
      setAllocLevelData(CreateAllocationData?.data?.allocLevelData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.allocTypeData &&
      Array.isArray(CreateAllocationData?.data?.allocTypeData)
    ) {
      setAllocTypeData(CreateAllocationData?.data?.allocTypeData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.contextTypeData &&
      Array.isArray(CreateAllocationData?.data?.contextTypeData)
    ) {
      setContextTypeData(CreateAllocationData?.data?.contextTypeData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.promotionData &&
      Array.isArray(CreateAllocationData?.data?.promotionData)
    ) {
      setPromotionData(CreateAllocationData?.data?.promotionData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.statusData &&
      Array.isArray(CreateAllocationData?.data?.statusData)
    ) {
      setStatusData(CreateAllocationData?.data?.statusData);
      CreateAllocationData?.data?.statusData.map((option) => { if (option.STATUS === "Worksheet") { setStatusCreateData(option) } })
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.criteriaData &&
      Array.isArray(CreateAllocationData?.data?.criteriaData)
    ) {
      setCriteriaData(CreateAllocationData?.data?.criteriaData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.itemParentData &&
      Array.isArray(CreateAllocationData?.data?.itemParentData)
    ) {
      setItemParentData(CreateAllocationData?.data?.itemParentData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.asnData &&
      Array.isArray(CreateAllocationData?.data?.asnData)
    ) {
      setAsnData(CreateAllocationData?.data?.asnData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.tsfData &&
      Array.isArray(CreateAllocationData?.data?.tsfData)
    ) {
      setTsfData(CreateAllocationData?.data?.tsfData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.allocNoData
    ) {
      setAllocNoData(CreateAllocationData?.data?.allocNoData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.availQty &&
      Array.isArray(CreateAllocationData?.data?.availQty)
    ) {
      setAvailQty(CreateAllocationData?.data?.availQty);
      setLoading(false);
      setAvailCheck(true);
    } else if (
      CreateAllocationData?.data?.availSearch &&
      Array.isArray(CreateAllocationData?.data?.availSearch)
    ) {
      setAvailSearch(CreateAllocationData?.data?.availSearch);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.switchTab
      && Array.isArray(CreateAllocationData?.data?.switchTab)
    ) {
      setLIMData(CreateAllocationData?.data?.switchTab);
      // setUpdateRulesRL(CreateAllocationData?.data?.switchTab);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.switchTab
      && disCond === 3
    ) {
      setqtyCheckData(CreateAllocationData?.data?.switchTab);
      // setUpdateRulesRL(CreateAllocationData?.data?.switchTab);
      setLoading(false);
    } else {
      setSearch(false);
    }
  }, [CreateAllocationData?.data]);

  // console.log(":",);

  useEffect(() => {
    if (CreateAllocationData.isError) {
      setIsError(true)
      if (totalData.length === 0) {
        swal(
          <div>
            <p>{CreateAllocationData["message"]}</p>
          </div>
        )
      }
      CreateAllocationData.isError = false;
    } else if (CreateAllocationData.isSuccess) {
      setIsSuccess(true);
      if (CreateAllocationData?.data?.totalData) {
        if (CreateAllocationData?.data?.totalData?.message) {
          setHeaderDis(false);
          swal(
            <div>
              <p>{CreateAllocationData?.data?.totalData["message"]}</p>
            </div>
          )
        }
        setLoading(true);
      }

    } else {
      setIsError(false)
      setTabledata("")
    }
  }, [CreateAllocationData])

  ///////////////////////////////////////////
  /////////CSS functions////////////////////
  ///////////////////////////////////////////

  const styleSelect1 = {
    control: base => ({
      ...base,
      width: "180px",
      fontSize: "12px",
      margin: "0px 0px 2px 0px",
      // height: "25px",
      minHeight: "30px",
      border: "1px solid rgb(180, 180, 180)",
      // This line disable the blue border
      // borderRadius: "0",
      // backgroundColor:"#f0f0f0",
      //border:"1px solid red",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
      // (isValid && searchHeaderData.CONTEXT.length===0)
      // '& input + fieldset': {
      //   // borderColor: 'gray',
      //   // borderRadius:"0",
      //   // boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
      // },
    })
    ,
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    valueContainer: (provided) => ({
      ...provided,
      // minHeight: '1px',
      // height: '40px',
      paddingTop: '0',
      paddingBottom: '0',
    }),
    singleValue: (provided) => ({
      ...provided,
      // minHeight: '1px',
      // paddingBottom: '0px',

    }),
    input: (provided) => ({
      ...provided,
      width: "100%",
      height: '20px',
    }),
    option: provided => ({
      ...provided,
      // color: 'blue',
      fontSize: "12px",
    }),
  };

  const styleSelect2 = {
    control: base => ({
      ...base,
      width: "180px",
      fontSize: "12px",
      margin: "0px 0px 2px 0px",
      // height: "25px",
      minHeight: "30px",
      // This line disable the blue border
      // borderRadius: "0",
      // backgroundColor:"#f0f0f0",
      border: "1px solid #b22222",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
      // (isValid && searchHeaderData.CONTEXT.length===0)
      // '& input + fieldset': {
      //   // borderColor: 'gray',
      //   // borderRadius:"0",
      //   // boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
      // },
    })
    ,
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    valueContainer: (provided) => ({
      ...provided,
      // minHeight: '1px',
      // height: '40px',
      paddingTop: '0',
      paddingBottom: '0',
    }),
    singleValue: (provided) => ({
      ...provided,
      // minHeight: '1px',
      // paddingBottom: '0px',

    }),
    input: (provided) => ({
      ...provided,
      width: "100%",
      height: '20px',
    }),
    option: provided => ({
      ...provided,
      // color: 'blue',
      fontSize: "12px",
    }),
  };

  ///////////////////////////////////////////
  /////////Submit functions////////////////////
  ///////////////////////////////////////////
  const [submitListCount, setSubmitListCount] = useState(0)
  const [submitListCheck, setSubmitListCheck] = useState(false)

  const SubmitList = () => {
    setLoading(true);
    setHeaderDis(true);
    setIsValid(false);
    if (searchHeaderData["CONTEXT"] === "PROM") {
      if (searchHeaderData["ALLOC_DESC"].length === 0 || searchHeaderData["ALLOC_LEVEL"].length === 0 || searchHeaderData["RELEASE_DATE"].length === 0 || searchHeaderData["CONTEXT"].length === 0 || searchHeaderData["ALLOC_TYPE"].length === 0 || String(searchHeaderData["PROMOTION"]).length === 0) {
        setIsError(true)
        swal(
          <div>
            <p>All fields are required in Header*</p>
          </div>
        )
        setHeaderDis(false);
        setLoading(true);
        setIsValid(true);
      }
      else {
        if (searchHeaderData.ALLOC_CRITERIA === "PURCHASE_ORDER") {
          if (
            searchDataCCommon["HIER1"].length === 0 &&
            searchDataCCommon["HIER2"].length === 0 &&
            searchDataCCommon["HIER3"].length === 0 &&
            searchDataCCommon["WH"].length === 0 &&
            searchDataCCommon["SUPPLIER"].length === 0 &&
            searchDataCCommon["SUPPLIER_SITE"].length === 0 &&
            searchDataCCommon["PACK_NO"].length === 0 &&
            searchDataCCommon["ITEM_PARENT"].length === 0 &&
            searchDataCCommon["DIFF_ID"].length === 0 &&
            searchDataCCommon["SKU"].length === 0 &&
            searchDataCCommon["ITEM_LIST_NO"].length === 0 &&
            searchDataCCommon["VPN"].length === 0 &&
            searchDataCPO["PO"].length === 0 &&
            searchDataCPO["PO_TYPE"].length === 0 &&
            searchDataCPO["ESID_FROM"].length === 0 &&
            searchDataCPO["ESID_TO"].length === 0 &&
            searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0 &&
            searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0 &&
            searchDataCCommon["UDA"].length === 0 &&
            searchDataCCommon["UDA_VALUE"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCPO["PO"].length > 0 ||
            searchDataCPO["PO_TYPE"].length > 0 ||
            searchDataCPO["ESID_FROM"].length > 0 ||
            searchDataCPO["ESID_TO"].length > 0 ||
            searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 ||
            searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0) {
            if (searchDataCPO["ESID_FROM"].length > 0 && searchDataCPO["ESID_TO"].length === 0) {
              swal(
                <div>
                  <p>"ESID To is required"</p>
                </div>
              )
              setIsValidCTEDF(true);
            }
            else if (searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length === 0) {
              swal(
                <div>
                  <p>"ESID From is required"</p>
                </div>
              )
              setIsValidCTEDT(true);
            }
            else if (searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0) {
              swal(
                <div>
                  <p>"Not Before Date To is required"</p>
                </div>
              )
              setIsValidCTNDF(true);
            }
            else if (searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0) {
              swal(
                <div>
                  <p>"Not Before Date From is required"</p>
                </div>
              )
              setIsValidCTNDT(true);
            }
            else if ((searchDataCPO.ESID_FROM.length) > 0 && (searchDataCPO.ESID_TO.length) > 0 &&
              searchDataCPO.ESID_TO.toString().slice(8, 10) < searchDataCPO.ESID_FROM.toString().slice(8, 10)) {
              var Date_From = searchDataCPO.ESID_FROM.toString().slice(8, 10)
              var Date_To = searchDataCPO.ESID_TO.toString().slice(8, 10)
              if (Date_To < Date_From) {
                swal(
                  <div>
                    <p>ESID From is not greater than ESID To</p>
                  </div>
                )
                setIsGreatCTEDF(true);
                setIsGreatCTEDT(true);
              }
            }
            else if ((searchDataCPO.NOT_BEFORE_DATE_FROM.length) > 0 && (searchDataCPO.NOT_BEFORE_DATE_TO.length) > 0
              && searchDataCPO.NOT_BEFORE_DATE_TO.toString().slice(8, 10) < searchDataCPO.NOT_BEFORE_DATE_FROM.toString().slice(8, 10)) {
              var Date_From = searchDataCPO.NOT_BEFORE_DATE_FROM.toString().slice(8, 10)
              var Date_To = searchDataCPO.NOT_BEFORE_DATE_TO.toString().slice(8, 10)
              if (Date_To < Date_From) {
                swal(
                  <div>
                    <p>Not Before Date From is not greater than Not Before Date To</p>
                  </div>
                )
                setIsGreatCTNDF(true);
                setIsGreatCTNDT(true);
              }
            }
            else {
              if (searchHeaderData["CONTEXT"] === "PROM") {
                if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                  && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                  && searchHeaderData["ALLOC_TYPE"].length && String(searchHeaderData["PROMOTION"]).length) > 0) {
                  let merged = { ...searchHeaderData, ...searchDataCPO, ...searchDataCCommon }
                  dispatch(postALLOCRESULTRequest([merged]));
                  setIsValid(false);
                  setTotalData([]);
                  setSelected([])
                  setSubmitListCount(1);
                  if (submitListCount === 1) {
                    setSubmitListCheck(true)
                  }
                }
              }
              else {
                if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                  && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                  && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                  let merged = { ...searchHeaderData, ...searchDataCPO, ...searchDataCCommon }
                  dispatch(postALLOCRESULTRequest([merged]));
                  setIsValid(false);
                  setTotalData([]);
                  setSelected([])
                  setSubmitListCount(1);
                  if (submitListCount === 1) {
                    setSubmitListCheck(true)
                  }
                }
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "WAREHOUSE") {
          if (
            searchDataCCommon["HIER1"].length === 0 &&
            searchDataCCommon["HIER2"].length === 0 &&
            searchDataCCommon["HIER3"].length === 0 &&
            searchDataCCommon["WH"].length === 0 &&
            searchDataCCommon["SUPPLIER"].length === 0 &&
            searchDataCCommon["SUPPLIER_SITE"].length === 0 &&
            searchDataCCommon["PACK_NO"].length === 0 &&
            searchDataCCommon["ITEM_PARENT"].length === 0 &&
            searchDataCCommon["DIFF_ID"].length === 0 &&
            searchDataCCommon["SKU"].length === 0 &&
            searchDataCCommon["ITEM_LIST_NO"].length === 0 &&
            searchDataCCommon["VPN"].length === 0 &&
            searchDataCWH["MIN_AVAIL_QTY"].length === 0 &&
            searchDataCWH["MAX_AVAIL_QTY"].length === 0 &&
            searchDataCCommon["UDA"].length === 0 &&
            searchDataCCommon["UDA_VALUE"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCWH["MIN_AVAIL_QTY"].length > 0 ||
            searchDataCWH["MAX_AVAIL_QTY"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                && searchHeaderData["ALLOC_TYPE"].length && String(searchHeaderData["PROMOTION"]).length) > 0) {
                let merged = { ...searchDataCWH, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCWHRequest([merged, ...selData]));
                setIsValid(false);
                setTotalData([]);
                setSelected([])
                setSubmitListCount(1);
                if (submitListCount === 1) {
                  setSubmitListCheck(true)
                }
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCWH, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCWHRequest([merged, ...selData]));
                setIsValid(false);
                setTotalData([]);
                setSelected([])
                setSubmitListCount(1);
                if (submitListCount === 1) {
                  setSubmitListCheck(true)
                }
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "ASN") {
          if (
            searchDataCCommon["HIER1"].length === 0 &&
            searchDataCCommon["HIER2"].length === 0 &&
            searchDataCCommon["HIER3"].length === 0 &&
            searchDataCCommon["WH"].length === 0 &&
            searchDataCCommon["SUPPLIER"].length === 0 &&
            searchDataCCommon["SUPPLIER_SITE"].length === 0 &&
            searchDataCCommon["PACK_NO"].length === 0 &&
            searchDataCCommon["ITEM_PARENT"].length === 0 &&
            searchDataCCommon["DIFF_ID"].length === 0 &&
            searchDataCCommon["SKU"].length === 0 &&
            searchDataCCommon["ITEM_LIST_NO"].length === 0 &&
            searchDataCCommon["VPN"].length === 0 &&
            searchDataCASN["ASN"].length === 0 &&
            searchDataCCommon["UDA"].length === 0 &&
            searchDataCCommon["UDA_VALUE"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCASN["ASN"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                && searchHeaderData["ALLOC_TYPE"].length && String(searchHeaderData["PROMOTION"]).length) > 0) {
                let merged = { ...searchDataCASN, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCASNRequest([merged]));
                setIsValid(false);
                setTotalData([]);
                setSelected([])
                setSubmitListCount(1);
                if (submitListCount === 1) {
                  setSubmitListCheck(true)
                }
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCASN, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCASNRequest([merged]));
                setIsValid(false);
                setTotalData([]);
                setSelected([])
                setSubmitListCount(1);
                if (submitListCount === 1) {
                  setSubmitListCheck(true)
                }
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "TRANSFER") {
          if (
            searchDataCTSF["HIER1"].length === 0 &&
            searchDataCTSF["HIER2"].length === 0 &&
            searchDataCTSF["HIER3"].length === 0 &&
            searchDataCTSF["WH"].length === 0 &&
            searchDataCTSF["SUPPLIER"].length === 0 &&
            searchDataCTSF["SUPPLIER_SITE"].length === 0 &&
            searchDataCTSF["PACK_NO"].length === 0 &&
            searchDataCTSF["ITEM_PARENT"].length === 0 &&
            searchDataCTSF["DIFF_ID"].length === 0 &&
            searchDataCTSF["SKU"].length === 0 &&
            searchDataCTSF["ITEM_LIST_NO"].length === 0 &&
            searchDataCTSF["VPN"].length === 0 &&
            searchDataCTSF["UDA"].length === 0 &&
            searchDataCTSF["TSF"].length === 0 &&
            searchDataCTSF["UDA"].length === 0 &&
            searchDataCTSF["UDA_VALUE"].length === 0 &&
            searchDataCTSF["EXCLUDE_UDA"].length === 0 &&
            searchDataCTSF["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCTSF["TSF"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                && searchHeaderData["ALLOC_TYPE"].length && String(searchHeaderData["PROMOTION"]).length) > 0) {
                let merged = { ...searchDataCTSF, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCTSFRequest([merged]));
                setIsValid(false);
                setTotalData([]);
                setSelected([])
                setSubmitListCount(1);
                if (submitListCount === 1) {
                  setSubmitListCheck(true)
                }
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCTSF, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCTSFRequest([merged]));
                setIsValid(false);
                setTotalData([]);
                setSelected([])
                setSubmitListCount(1);
                if (submitListCount === 1) {
                  setSubmitListCheck(true)
                }
              }
            }
          }
        }
      }
    }
    else {
      if (searchHeaderData["ALLOC_DESC"].length === 0 || searchHeaderData["ALLOC_LEVEL"].length === 0 ||
        searchHeaderData["RELEASE_DATE"].length === 0 || searchHeaderData["CONTEXT"].length === 0 || searchHeaderData["ALLOC_TYPE"].length === 0) {
        setIsError(true)
        swal(
          <div>
            <p>All fields are required in Header*</p>
          </div>
        )
        setHeaderDis(false);
        setLoading(true);
        setIsValid(true);
      }
      else {
        if (searchHeaderData.ALLOC_CRITERIA === "PURCHASE_ORDER") {
          if (
            searchDataCCommon["HIER1"].length === 0 &&
            searchDataCCommon["HIER2"].length === 0 &&
            searchDataCCommon["HIER3"].length === 0 &&
            searchDataCCommon["WH"].length === 0 &&
            searchDataCCommon["SUPPLIER"].length === 0 &&
            searchDataCCommon["SUPPLIER_SITE"].length === 0 &&
            searchDataCCommon["PACK_NO"].length === 0 &&
            searchDataCCommon["ITEM_PARENT"].length === 0 &&
            searchDataCCommon["DIFF_ID"].length === 0 &&
            searchDataCCommon["SKU"].length === 0 &&
            searchDataCCommon["ITEM_LIST_NO"].length === 0 &&
            searchDataCCommon["VPN"].length === 0 &&
            searchDataCPO["PO"].length === 0 &&
            searchDataCPO["PO_TYPE"].length === 0 &&
            searchDataCPO["ESID_FROM"].length === 0 &&
            searchDataCPO["ESID_TO"].length === 0 &&
            searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0 &&
            searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0 &&
            searchDataCCommon["UDA"].length === 0 &&
            searchDataCCommon["UDA_VALUE"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCPO["PO"].length > 0 ||
            searchDataCPO["PO_TYPE"].length > 0 ||
            searchDataCPO["ESID_FROM"].length > 0 ||
            searchDataCPO["ESID_TO"].length > 0 ||
            searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 ||
            searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0) {
            if (searchDataCPO["ESID_FROM"].length > 0 && searchDataCPO["ESID_TO"].length === 0) {
              swal(
                <div>
                  <p>ESID To is required</p>
                </div>
              )
              setIsValidCTEDF(true);
            }
            else if (searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length === 0) {
              swal(
                <div>
                  <p>ESID From is required</p>
                </div>
              )
              setIsValidCTEDT(true);
            }
            else if (searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0) {
              swal(
                <div>
                  <p>Not Before Date To is required</p>
                </div>
              )
              setIsValidCTNDF(true);
            }
            else if (searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0) {
              swal(
                <div>
                  <p>Not Before Date From is required</p>
                </div>
              )
              setIsValidCTNDT(true);
            }
            else if ((searchDataCPO.ESID_FROM.length) > 0 && (searchDataCPO.ESID_TO.length) > 0 &&
              searchDataCPO.ESID_TO.toString().slice(8, 10) < searchDataCPO.ESID_FROM.toString().slice(8, 10)) {
              var Date_From = searchDataCPO.ESID_FROM.toString().slice(8, 10)
              var Date_To = searchDataCPO.ESID_TO.toString().slice(8, 10)
              if (Date_To < Date_From) {
                swal(
                  <div>
                    <p>ESID From is not greater than ESID To</p>
                  </div>
                )
                setIsGreatCTEDF(true);
                setIsGreatCTEDT(true);
              }
            }
            else if ((searchDataCPO.NOT_BEFORE_DATE_FROM.length) > 0 && (searchDataCPO.NOT_BEFORE_DATE_TO.length) > 0
              && searchDataCPO.NOT_BEFORE_DATE_TO.toString().slice(8, 10) < searchDataCPO.NOT_BEFORE_DATE_FROM.toString().slice(8, 10)) {
              var Date_From = searchDataCPO.NOT_BEFORE_DATE_FROM.toString().slice(8, 10)
              var Date_To = searchDataCPO.NOT_BEFORE_DATE_TO.toString().slice(8, 10)
              if (Date_To < Date_From) {
                swal(
                  <div>
                    <p>Not Before Date From is not greater than Not Before Date To</p>
                  </div>
                )
                setIsGreatCTNDF(true);
                setIsGreatCTNDT(true);
              }
            }
            else {
              if (searchHeaderData["CONTEXT"] === "PROM") {
                if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                  && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                  && searchHeaderData["ALLOC_TYPE"].length && String(searchHeaderData["PROMOTION"]).length) > 0) {
                  let merged = { ...searchDataCPO, ...searchHeaderData, ...searchDataCCommon }
                  dispatch(postALLOCRESULTRequest([merged]));
                  setIsValid(false);
                  setTotalData([]);
                  setSelected([]);
                  setSubmitListCount(1);
                  if (submitListCount === 1) {
                    setSubmitListCheck(true)
                  }
                }
              }
              else {
                if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                  && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                  && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                  let merged = { ...searchDataCPO, ...searchHeaderData, ...searchDataCCommon }
                  dispatch(postALLOCRESULTRequest([merged]));
                  setIsValid(false);
                  setTotalData([]);
                  setSelected([]);
                  setSubmitListCount(1);
                  if (submitListCount === 1) {
                    setSubmitListCheck(true)
                  }
                }
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "WAREHOUSE") {
          if (
            searchDataCCommon["HIER1"].length === 0 &&
            searchDataCCommon["HIER2"].length === 0 &&
            searchDataCCommon["HIER3"].length === 0 &&
            searchDataCCommon["WH"].length === 0 &&
            searchDataCCommon["SUPPLIER"].length === 0 &&
            searchDataCCommon["SUPPLIER_SITE"].length === 0 &&
            searchDataCCommon["PACK_NO"].length === 0 &&
            searchDataCCommon["ITEM_PARENT"].length === 0 &&
            searchDataCCommon["DIFF_ID"].length === 0 &&
            searchDataCCommon["SKU"].length === 0 &&
            searchDataCCommon["ITEM_LIST_NO"].length === 0 &&
            searchDataCCommon["VPN"].length === 0 &&
            searchDataCWH["MIN_AVAIL_QTY"].length === 0 &&
            searchDataCWH["MAX_AVAIL_QTY"].length === 0 &&
            searchDataCCommon["UDA"].length === 0 &&
            searchDataCCommon["UDA_VALUE"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCWH["MIN_AVAIL_QTY"].length > 0 ||
            searchDataCWH["MAX_AVAIL_QTY"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                && searchHeaderData["ALLOC_TYPE"].length && String(searchHeaderData["PROMOTION"]).length) > 0) {
                let merged = { ...searchDataCWH, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCWHRequest([merged, ...selData]));
                setIsValid(false);
                setTotalData([]);
                setSelected([]);
                setSubmitListCount(1);
                if (submitListCount === 1) {
                  setSubmitListCheck(true)
                }
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCWH, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCWHRequest([merged, ...selData]));
                setIsValid(false);
                setTotalData([]);
                setSelected([]);
                setSubmitListCount(1);
                if (submitListCount === 1) {
                  setSubmitListCheck(true)
                }
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "ASN") {
          if (
            searchDataCCommon["HIER1"].length === 0 &&
            searchDataCCommon["HIER2"].length === 0 &&
            searchDataCCommon["HIER3"].length === 0 &&
            searchDataCCommon["WH"].length === 0 &&
            searchDataCCommon["SUPPLIER"].length === 0 &&
            searchDataCCommon["SUPPLIER_SITE"].length === 0 &&
            searchDataCCommon["PACK_NO"].length === 0 &&
            searchDataCCommon["ITEM_PARENT"].length === 0 &&
            searchDataCCommon["DIFF_ID"].length === 0 &&
            searchDataCCommon["SKU"].length === 0 &&
            searchDataCCommon["ITEM_LIST_NO"].length === 0 &&
            searchDataCCommon["VPN"].length === 0 &&
            searchDataCASN["ASN"].length === 0 &&
            searchDataCCommon["UDA"].length === 0 &&
            searchDataCCommon["UDA_VALUE"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA"].length === 0 &&
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCASN["ASN"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                && searchHeaderData["ALLOC_TYPE"].length && String(searchHeaderData["PROMOTION"]).length) > 0) {
                let merged = { ...searchDataCASN, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCASNRequest([merged]));
                setIsValid(false);
                setTotalData([]);
                setSelected([]);
                setSubmitListCount(1);
                if (submitListCount === 1) {
                  setSubmitListCheck(true)
                }
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCASN, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCASNRequest([merged]));
                setIsValid(false);
                setTotalData([]);
                setSelected([]);
                setSubmitListCount(1);
                if (submitListCount === 1) {
                  setSubmitListCheck(true)
                }
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "TRANSFER") {
          if (
            searchDataCTSF["HIER1"].length === 0 &&
            searchDataCTSF["HIER2"].length === 0 &&
            searchDataCTSF["HIER3"].length === 0 &&
            searchDataCTSF["WH"].length === 0 &&
            searchDataCTSF["SUPPLIER"].length === 0 &&
            searchDataCTSF["SUPPLIER_SITE"].length === 0 &&
            searchDataCTSF["PACK_NO"].length === 0 &&
            searchDataCTSF["ITEM_PARENT"].length === 0 &&
            searchDataCTSF["DIFF_ID"].length === 0 &&
            searchDataCTSF["SKU"].length === 0 &&
            searchDataCTSF["ITEM_LIST_NO"].length === 0 &&
            searchDataCTSF["VPN"].length === 0 &&
            searchDataCTSF["UDA"].length === 0 &&
            searchDataCTSF["TSF"].length === 0 &&
            searchDataCTSF["UDA"].length === 0 &&
            searchDataCTSF["UDA_VALUE"].length === 0 &&
            searchDataCTSF["EXCLUDE_UDA"].length === 0 &&
            searchDataCTSF["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCCommon["HIER1"].length > 0 ||
            searchDataCCommon["HIER2"].length > 0 ||
            searchDataCCommon["HIER3"].length > 0 ||
            searchDataCCommon["WH"].length > 0 ||
            searchDataCCommon["SUPPLIER"].length > 0 ||
            searchDataCCommon["SUPPLIER_SITE"].length > 0 ||
            searchDataCCommon["PACK_NO"].length > 0 ||
            searchDataCCommon["ITEM_PARENT"].length > 0 ||
            searchDataCCommon["DIFF_ID"].length > 0 ||
            searchDataCCommon["SKU"].length > 0 ||
            searchDataCCommon["ITEM_LIST_NO"].length > 0 ||
            searchDataCCommon["VPN"].length > 0 ||
            searchDataCTSF["TSF"].length > 0 ||
            searchDataCCommon["UDA"].length > 0 ||
            searchDataCCommon["UDA_VALUE"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA"].length > 0 ||
            searchDataCCommon["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                && searchHeaderData["ALLOC_TYPE"].length && String(searchHeaderData["PROMOTION"]).length) > 0) {
                let merged = { ...searchDataCTSF, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCTSFRequest([merged]));
                setIsValid(false);
                setTotalData([]);
                setSelected([]);
                setSubmitListCount(1);
                if (submitListCount === 1) {
                  setSubmitListCheck(true)
                }
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length
                && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length
                && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCTSF, ...searchHeaderData, ...searchDataCCommon }
                dispatch(postALLOCRESULTCTSFRequest([merged]));
                setIsValid(false);
                setTotalData([]);
                setSelected([]);
                setSubmitListCount(1);
                if (submitListCount === 1) {
                  setSubmitListCheck(true)
                }
              }
            }
          }
        }
      }
    }
  }

  console.log("submitListCheck22:", selData, selected, submitListCount);
  if (submitListCheck && totalData.length > 0) {
    console.log("submitListCheck1");
    setSelData([])
    const temp1 = []
    const temp = totalData.filter(item => item["SEL_IND"] === "Y" ? item : null)
    totalData.filter(item => item["SEL_IND"] === "Y" ? temp1.push(item["SR_NO"]) : null)
    setSelData(temp)
    setSelected(temp1)
    setSubmitListCheck(false)
  }

  if (searchHeaderData.ALLOC_TYPE_CODE === "Child") {
    swal(
      <div>
        <p>Cannot select the Child*</p>
      </div>
    )
    setSearchHeaderData((prev) => {
      return {
        ...prev,
        ALLOC_TYPE_CODE: "Ad-Hoc",
        ALLOC_TYPE: "A",
      };
    })
  }

  ///////////////////////////////////////////
  /////////Menu functions////////////////////
  ///////////////////////////////////////////

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setLoading(true);
    setSearchHeaderData((prev) => {
      return {
        ...prev,
        ALLOC_CRITERIA: options[selectedIndex].value,
      };
    })
  }, [""]);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    if (index || index === 0) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_CRITERIA: options[index].value,
        };
      })
    }
    else if (event.target.value) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_CRITERIA: event.target.value,
        };
      });
    }
    setSelectedIndex(index);
    setAnchorEl(null);
    setTotalData([]);

    setInputHIER1CCommon("");
    setInputHIER2CCommon("");
    setInputHIER3CCommon("");
    setInputITEM_PARENTCCommon("");
    setInputWHCCommon("");
    setInputSUPPLIERCCommon("");
    setInputSUPPLIER_SITECCommon("");
    setInputPACK_NOCCommon("");
    setInputDIFF_IDCCommon("");
    setInputSKUCCommon("");
    setInputITEM_LIST_NOCCommon("");
    setInputVPNCCommon("");
    setInputUDACCommon("");
    setInputUDA_VALUECCommon("");
    setInputEXCLUDE_UDACCommon("");
    setInputEXCLUDE_UDA_VALUECCommon("");
    setValHIER1CCommon([]);
    setValHIER2CCommon([]);
    setValHIER3CCommon([]);
    setValITEM_PARENTCCommon([]);
    setValWHCCommon([]);
    setValSUPPLIERCCommon([]);
    setValSUPPLIER_SITECCommon([]);
    setValPACK_NOCCommon([]);
    setValDIFF_IDCCommon([]);
    setValSKUCCommon([]);
    setValITEM_LIST_NOCCommon([]);
    setValVPNCCommon([]);
    setValUDACCommon([]);
    setValUDA_VALUECCommon([]);
    setFilterUDAValueCCommon([]);
    setValEXCLUDE_UDACCommon([]);
    setFilterEXCLUDE_UDAValueCCommon([]);
    setValEXCLUDE_UDA_VALUECCommon([]);


    setIsValidCTEDF(false);
    setIsValidCTNDF(false);
    setIsValidCTEDT(false);
    setIsValidCTNDT(false);
    setIsGreatCTEDF(false);
    setIsGreatCTNDF(false);
    setIsGreatCTEDT(false);
    setIsGreatCTNDT(false);

    setInputPOCPO("");
    setInputPO_TYPECPO("");
    setValPOCPO([]);
    setValPO_TYPECPO([]);

    setInputASNCASN("");
    setValASNCASN([]);

    setInputTSFCTSF("");
    setValTSFCTSF([]);

    setSearchDataCTSF(initialDataTSF)
    setSearchDataCASN(initialDataASN)
    setSearchDataCPO(initialDataPO)
    setSearchDataCWH(initialDataWH)
    setSearchDataCCommon(initialDataCCommon)
  };


  const handleClose = () => {
    setAnchorEl(null);
  };


  ///////////////////////////////////////////////////////////////////////////////
  /////////Tablecell and Table Row Customization functions////////////////////
  ///////////////////////////////////////////////////////////////////////////

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
      height: "10px",
      padding: "0px",
    },
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "DodgerBlue",
      color: theme.palette.common.black,
      fontSize: "12px",
      textAlign: "left",
      // minHeight: "10px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "11px",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    root: {
      height: "10px",
    },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  //////////////////////////////////////////////////
  /////////TextField Functions////////////////////
  //////////////////////////////////////////////


  const onChange = (e) => {
    setSearchHeaderData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onChangeCPO = (e) => {
    setSearchDataCPO((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onChangeCWH = (e) => {
    setSearchDataCWH((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };


  //////////////////////////////////////
  ////////REFRESH CRITERIA INPUTS SCREEN/////////
  //////////////////////////////////////

  const RefreshGrid = () => {
    setAvailCheck(false);

    setIsValidCTEDF(false);
    setIsValidCTNDF(false);
    setIsValidCTEDT(false);
    setIsValidCTNDT(false);

    setIsGreatCTEDF(false);
    setIsGreatCTNDF(false);
    setIsGreatCTEDT(false);
    setIsGreatCTNDT(false);

    setInputHIER1CCommon("");
    setInputHIER2CCommon("");
    setInputHIER3CCommon("");
    setInputITEM_PARENTCCommon("");
    setInputWHCCommon("");
    setInputSUPPLIERCCommon("");
    setInputSUPPLIER_SITECCommon("");
    setInputPACK_NOCCommon("");
    setInputDIFF_IDCCommon("");
    setInputSKUCCommon("");
    setInputITEM_LIST_NOCCommon("");
    setInputVPNCCommon("");
    setInputUDACCommon("");
    setInputPOCPO("");
    setInputPO_TYPECPO("");
    setInputUDA_VALUECCommon("");
    setInputEXCLUDE_UDACCommon("");
    setInputEXCLUDE_UDA_VALUECCommon("");
    setValHIER1CCommon([]);
    setValHIER2CCommon([]);
    setValHIER3CCommon([]);
    setValITEM_PARENTCCommon([]);
    setValWHCCommon([]);
    setValSUPPLIERCCommon([]);
    setValSUPPLIER_SITECCommon([]);
    setValPACK_NOCCommon([]);
    setValDIFF_IDCCommon([]);
    setValSKUCCommon([]);
    setValITEM_LIST_NOCCommon([]);
    setValVPNCCommon([]);
    setValUDACCommon([]);
    setValPOCPO([]);
    setValPO_TYPECPO([]);
    setValUDA_VALUECCommon([]);
    setFilterUDAValueCCommon([]);
    setValEXCLUDE_UDACCommon([]);
    setFilterEXCLUDE_UDAValueCCommon([]);
    setValEXCLUDE_UDA_VALUECCommon([]);
    setSearchDataCPO(initialDataPO)

    setSearchDataCWH(initialDataWH)

    setInputASNCASN("");
    setValASNCASN([]);
    setSearchDataCASN(initialDataASN)


    setInputTSFCTSF("");
    setValTSFCTSF([]);
    setSearchDataCTSF(initialDataTSF)
    setSearchDataCCommon(initialDataCCommon)
  }


  //////////////////////////////////////
  ////////REFRESH ENTIRE SCREEN/////////
  //////////////////////////////////////
  const RefreshTableGrid = () => {
    setSelData([]);
    setTotalData([]);

    setSelected([])

    setInputHIER1CCommon("");
    setInputHIER2CCommon("");
    setInputHIER3CCommon("");
    setInputITEM_PARENTCCommon("");
    setInputWHCCommon("");
    setInputSUPPLIERCCommon("");
    setInputSUPPLIER_SITECCommon("");
    setInputPACK_NOCCommon("");
    setInputDIFF_IDCCommon("");
    setInputSKUCCommon("");
    setInputITEM_LIST_NOCCommon("");
    setInputVPNCCommon("");
    setInputUDACCommon("");
    setInputPOCPO("");
    setInputPO_TYPECPO("");
    setInputUDA_VALUECCommon("");
    setInputEXCLUDE_UDACCommon("");
    setInputEXCLUDE_UDA_VALUECCommon("");
    setValHIER1CCommon([]);
    setValHIER2CCommon([]);
    setValHIER3CCommon([]);
    setValITEM_PARENTCCommon([]);
    setValWHCCommon([]);
    setValSUPPLIERCCommon([]);
    setValSUPPLIER_SITECCommon([]);
    setValPACK_NOCCommon([]);
    setValDIFF_IDCCommon([]);
    setValSKUCCommon([]);
    setValITEM_LIST_NOCCommon([]);
    setValVPNCCommon([]);
    setValUDACCommon([]);
    setValPOCPO([]);
    setValPO_TYPECPO([]);
    setValUDA_VALUECCommon([]);
    setFilterUDAValueCCommon([]);
    setValEXCLUDE_UDACCommon([]);
    setFilterEXCLUDE_UDAValueCCommon([]);
    setValEXCLUDE_UDA_VALUECCommon([]);

    setSearchDataCCommon(initialDataCCommon)
    setSearchDataCPO(initialDataPO)
    setSearchDataCWH(initialDataWH)

    setInputASNCASN("");
    setValASNCASN([]);
    setSearchDataCASN(initialDataASN)

    setInputTSFCTSF("");
    setValTSFCTSF([]);
    setSearchDataCTSF(initialDataTSF)

    setSearchHeaderData((prev) => {
      return {
        ...prev,
        RELEASE_DATE: new Date().toISOString().slice(0, 10),
      };
    });
    dispatch(getCREATEREFRESHGRIDRequest(allocNoData));

    setIsValid(false);
    setAvailCheck(false);

    setIsValidCTEDF(false);
    setIsValidCTNDF(false);
    setIsValidCTEDT(false);
    setIsValidCTNDT(false);

    setIsGreatCTEDF(false);
    setIsGreatCTNDF(false);
    setIsGreatCTEDT(false);
    setIsGreatCTNDT(false);
    setHeaderDis(false);

    setTabCond(false);
    setRTabCond(false);
    setDisCond([]);
    setSwitchVal([]);
    setLIMData([]);
    setqtyCheckData([])
    setrtvrldata([])
    setOkRulesLocationCheck(false)

    setSubmitListCount(0)
    setSubmitListCheck(false)
  }

  //////////////////////////////////////////////////
  const handleDelete = () => {
    const id = selected;
    const data = [...totalData];
    const updatedTable = data.filter((val) => {
      return !id.includes(val.SR_NO);
    });
    setTabledata(updatedTable)
    setTotalData(updatedTable)
    dispatch(getDELETECREATEGRIDRequest(selData));
    setSelected([]);
    setSelData([]);
  };


  ////////////////////////////////////////////////


  ///////////////////////////////////////////
  ///SINGLE SELECT CODE FOR HEADER//
  ////////////////////////////////////


  const selectALLOC_LEVEL = (val) => {
    ////////console.log("value,e",val)
    if (val) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_LEVEL: val.CODE,
          ALLOC_LEVEL_CODE: val.ALLOC_LEVEL
        };
      });
    }
    else {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_LEVEL: "",
          ALLOC_LEVEL_CODE: "",
        };
      });
    }
  }

  const selectALLOC_TYPE = (val) => {
    // ////////console.log("value,e",val)
    if (val) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_TYPE: val.CODE,
          ALLOC_TYPE_CODE: val.ALLOC_TYPE
        };
      });
    }
    else {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_TYPE: "",
          ALLOC_TYPE_CODE: "",
        };
      });
    }
  }

  const selectCONTEXT_TYPE = (val) => {
    // ////////console.log("value,e",val)
    if (val) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          CONTEXT: val.CODE,
          CONTEXT_CODE: val.CONTEXT
        };
      });
    }
    else {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          CONTEXT: "",
          CONTEXT_CODE: "",
        };
      });
    }
  }

  const selectPROMOTION = (val) => {
    ////////console.log("value,e",val)
    if (val) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          PROMOTION: val.PROMOTION,
          PROMOTION_CODE: val.PROMOTION
        };
      });
    }
    else {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          PROMOTION: "",
          PROMOTION_CODE: "",
        };
      });
    }
  }



  /////////////////////////////////
  //search data unique functions///
  /////////////////////////////////

  let UniqTableCPO =
    totalData.length > 0
      ? [...new Map(totalData.map((item) => [item["ITEM"], item])).values()]
      : [];

  let UniqDept =
    hierData.length > 0
      ? [...new Map(hierData.map((item) => [item["HIER1"], item])).values()]
      : [];


  let UniqClass =
    hier2Data.length > 0
      ? [...new Map(hier2Data.map((item) => [item["HIER2"], item])).values()]
      : [];


  let UniqSubClass =
    hier3Data.length > 0
      ? [...new Map(hier3Data.map((item) => [item["HIER3"], item])).values()]
      : [];


  let UniqItemParent =
    itemParentData.length > 0
      ? [...new Map(itemParentData.map((item) => [item["ITEM_PARENT"], item])).values()]
      : [];


  let UniqPOType =
    poData.length > 0
      ? [...new Map(poData.map((item) => [item["PO_TYPE"], item])).values()]
      : [];


  let UniqUDA =
    udaData.length > 0
      ? [...new Map(udaData.map((item) => [item["UDA"], item])).values()]
      : [];

  let UniqExcludeUDA =
    excludeUdaData.length > 0
      ? [...new Map(excludeUdaData.map((item) => [item["EXCLUDE_UDA"], item])).values()]
      : [];

  let UniqVPN =
    vpnData.length > 0
      ? [...new Map(vpnData.map((item) => [item["VPN"], item])).values()]
      : [];

  let UniqSKU =
    skuData.length > 0
      ? [...new Map(skuData.map((item) => [item["SKU"], item])).values()]
      : [];

  let UniqDiff_id =
    diffData.length > 0
      ? [...new Map(diffData.map((item) => [item["DIFF_ID"], item])).values()]
      : [];


  ///////////////////////////////////////////
  ///MULTI SELECT CODE FOR PURSCHASE ORDER///
  ////////////////////////////////////

  /* 
          #######################################
          ##### Filtering Data Hooks ######
          #######################################
*/
  const [fltrH3, setFltrH3] = useState([]);
  const [fltrPACK, setFltrPACK] = useState([]);
  const [fltrITP, setFltrITP] = useState([]);
  const [fltrDiff, setFltrDiff] = useState([]);
  const [fltrSku, setFltrSku] = useState([]);
  const [fltrVPN, setFltrVPN] = useState([]);
  const [fltrUDA, setFltrUDA] = useState([]);
  const [udaVCheck, setUDAVCheck] = useState(false);

  useEffect(() => {
    if (searchDataCCommon.UDA.length > 0 && udaVCheck) {
      var temp = {}
      if (searchDataCCommon.HIER3.length > 0) {
        temp["HIER3"] = [...searchDataCCommon.HIER3]
      } else if (searchDataCCommon.HIER2.length > 0) {
        temp["HIER2"] = [...searchDataCCommon.HIER2]
      } else if (searchDataCCommon.HIER1.length > 0) {
        temp["HIER1"] = [...searchDataCCommon.HIER1]
      }
      if (Object.keys(temp).length > 0) {
        filteringData(udaData, temp, "UDAV"); // Filtering UDA
      }
      setUDAVCheck(false);

    }
  });

  /* 
              #######################################
              ##### FILTERING DATA IN CRITERIA ######
              #######################################
  */
  //FILTERING ON SELECT
  const filteringData = (data, f_key, name) => {
    if (name === "UDAV") {

      const temp_d = udaData.filter(row => (f_key[Object.keys(f_key)[0]].includes(row[Object.keys(f_key)[0]])));
      const uda_v = temp_d.filter(row => (searchDataCCommon.UDA.includes(row.UDA)))
      console.log("use flt", temp_d, f_key[Object.keys(f_key)[0]], uda_v)

      const filterUDAValue = temp_d.filter((item) => {
        return (searchDataCCommon.UDA).some((val) => {
          return item.UDA === val;
        });
      });
      setFilterUDAValueCCommon(fltrSort(filterUDAValue, "UDA_VALUE"));
      return
    }
    console.log("FIlter killer  Data", data, f_key, name)
    var fltrd_data = [];
    f_key[Object.keys(f_key)[0]].map((key) => {
      const temp_fdata = data.filter((row => row[Object.keys(f_key)[0]] === key))
      fltrd_data.push(...temp_fdata)
    });
    console.log("ftlr check", fltrd_data)
    //UPDATE FILTERED DATA 
    if (name == "HIER3") {
      setFltrH3(fltrSort(fltrd_data, "HIER3"));
    } else if (name == "PACK_NO") {
      setFltrPACK(fltrSort(fltrd_data, "PACK_NO"));
      if (searchDataCCommon.PACK_NO.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });
        } else {
          setSearchDataCCommon((prev) => {
            return {
              ...prev,
              PACK_NO: [],
            };
          });
        }
      }
    } else if (name == "ITEM_PARENT") {
      setFltrITP(fltrSort(fltrd_data, "ITEM_PARENT"));
      if (searchDataCCommon.ITEM_PARENT.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });
        } else {
          setSearchDataCCommon((prev) => {
            return {
              ...prev,
              ITEM_PARENT: [],
            };
          });
        }
      }
    } else if (name == "DIFF_ID") {
      setFltrDiff(fltrSort(fltrd_data, "DIFF_ID"));
      if (searchDataCCommon.DIFF_ID.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });
        } else {
          setSearchDataCCommon((prev) => {
            return {
              ...prev,
              DIFF_ID: [],
            };
          });
        }
      }
    } else if (name == "SKU") {
      setFltrSku(fltrSort(fltrd_data, "SKU"));
      if (searchDataCCommon.SKU.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });
        } else {
          setSearchDataCCommon((prev) => {
            return {
              ...prev,
              SKU: [],
            };
          });
        }
      }
    } else if (name == "VPN") {
      setFltrVPN(fltrSort(fltrd_data, "VPN"));
      if (searchDataCCommon.VPN.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });
        } else {
          setSearchDataCCommon((prev) => {
            return {
              ...prev,
              VPN: [],
            };
          });
        }
      }
    } else if (name == "UDA") {
      //Filtering UDA_VALUE
      console.log("valUDACCommon", valUDACCommon)
      const filterUDAValue = fltrd_data.filter((item) => {
        return (searchDataCCommon.UDA).some((val) => {
          return item.UDA === val;
        });
      });
      if (searchDataCCommon.UDA_VALUE.length > 0) {
        const temp_UDAV = [...searchDataCCommon.UDA_VALUE];
        [...Array(temp_UDAV.length).keys()].map(val => {
          const temp_check = filterUDAValue.filter(row => (row.UDA_VALUE === temp_UDAV[val]));
          if (temp_check.length === 0) {
            const index = searchDataCCommon.UDA_VALUE.indexOf(temp_UDAV[val]);
            if (index > -1) {
              searchDataCCommon.UDA_VALUE.splice(index, 1);
            }
          }
        });
      }
      setFilterUDAValueCCommon(fltrSort(filterUDAValue, "UDA_VALUE"));
      setFltrUDA(fltrSort(fltrd_data, "UDA"));
      if (searchDataCCommon.UDA.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });
        } else {
          console.log("killer", fltrUDA, udaData)
          const filterUDAValue = (fltrUDA.length > 0 ? fltrUDA : udaData).filter((item) => {
            return (searchDataCCommon.UDA).some((val) => {
              return item.UDA === val;
            });
          });
          setFilterUDAValueCCommon(fltrSort(filterUDAValue, "UDA_VALUE"));
          setSearchDataCCommon((prev) => {
            return {
              ...prev,
              UDA: [],
            };
          });
        }
      }
    }
  }

  //REVERSE FILTERING ON UNSELECT
  const Rev_fltr = (key, data, name, fltr_name, selectData) => {
    console.log("Rev_fltr", data, key, name, "sdfghgred", selectData)
    var temp_name = ""
    if (name == "PACK_NO") {
      temp_name = name;
      name = "SKU"
    }
    const temp_data = data.filter((row => row[name] === key))
    var data_list = []
    temp_data.map(row => data_list.push(row[fltr_name]))
    const temp_UDAVal = [...searchDataCCommon.UDA_VALUE];
    if (fltr_name === "UDA") {

      var udaV_list = [];
      temp_data.map(row => udaV_list.push(row["UDA_VALUE"]));
      console.log("uda val ist", udaV_list);

      [...Array(temp_UDAVal.length).keys()].map(ind => {
        console.log("priya", ind, searchDataCCommon.UDA_VALUE, udaV_list[ind], temp_UDAVal)
        if (udaV_list.includes(temp_UDAVal[ind])) {
          const index = searchDataCCommon.UDA_VALUE.indexOf(temp_UDAVal[ind]);
          if (index > -1) {
            searchDataCCommon.UDA_VALUE.splice(index, 1);
          }
        }
      });
      // [...Array(temp_UDAVal.length).keys()].map(ind=>{
      //   valUDA_VALUECCommon.filter(row=>row.UDA_VALUE)
      //   temp_UDAVal[ind]
      // })
      const fltredUDAVal = valUDA_VALUECCommon.filter(row => (!temp_UDAVal.includes(row.UDA_VALUE)))
      setValUDA_VALUECCommon(fltredUDAVal)
      console.log("killer0000", fltrUDA, searchDataCCommon.UDA_VALUE, temp_UDAVal, "ghjhg", fltredUDAVal)
    }
    console.log("akhil", searchDataCCommon[name], data_list, name)
    if (temp_name != "") { name = temp_name }
    if (searchDataCCommon[fltr_name].length > 0 && searchDataCCommon[name].length > 1) {
      console.log("2345000", searchDataCCommon[fltr_name])
      var index_list = []
      searchDataCCommon[fltr_name].map(
        val => {

          if (data_list.includes(val)) {
            const index = searchDataCCommon[fltr_name].indexOf(val);
            index_list.push(searchDataCCommon[fltr_name][index])
          }
        }
      )
      console.log("2345", index_list, data_list)
      if (index_list.length > 0) {
        for (let ind = 0; ind < index_list.length; ind++) {
          const index = searchDataCCommon[fltr_name].indexOf(index_list[ind]);
          console.log(searchDataCCommon[fltr_name][index], ind)

          if (index > -1) {
            //if(!(fltr_name==="UDA" && data_list.length>1)){
            searchDataCCommon[fltr_name].splice(index, 1);//}
          }
        }
      }
      console.log("2345", searchDataCCommon[fltr_name])
      const fltr_select = selectData.filter((row => !data_list.includes(row[fltr_name])))
      if (fltr_name === "HIER2") {
        setValHIER2CCommon(fltr_select);
      } else if (fltr_name === "HIER3") {
        setValHIER3CCommon(fltr_select);
      } else if (fltr_name === "PACK_NO") {
        setValPACK_NOCCommon(fltr_select);
      } else if (fltr_name === "ITEM_PARENT") {
        setValITEM_PARENTCCommon(fltr_select);
      } else if (fltr_name === "DIFF_ID") {
        setValDIFF_IDCCommon(fltr_select);
      } else if (fltr_name === "SKU") {
        setValSKUCCommon(fltr_select);
      } else if (fltr_name === "VPN") {
        setValVPNCCommon(fltr_select);
      } else if (fltr_name === "UDA") {
        setValUDACCommon(fltr_select);
        // if(valUDACCommon.length>0){
        //   const udaVals=fltr_select.map(row=>row.)
        // }


      }
      console.log("fltr_select", fltr_select);
    } else {
      if (fltr_name === "HIER3") {
        setFltrH3([])
      } else if (fltr_name === "PACK_NO") {
        setFltrPACK([]);
      } else if (fltr_name === "ITEM_PARENT") {
        setFltrITP([]);
      } else if (fltr_name === "SKU") {
        setFltrSku([]);
      } else if (fltr_name === "VPN") {
        setFltrVPN([]);
      } else if (fltr_name === "UDA") {
        setFltrUDA([]);
      } else if (fltr_name === "DIFF_ID") {
        setFltrDiff([]);
      }
    }
  }

  //SORTING FILTERED DATA
  const fltrSort = (data, name) => {
    data.sort((a, b) => {

      if (!isNaN(a[name]) && !isNaN(b[name])) {
        return a[name] - b[name];
      }
      else {
        let fa = String(a[name]).toLowerCase(),
          fb = String(b[name]).toLowerCase();


        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      }
    });
    return data;
    //console.log("sort Data", data)
  }

  /* 
          ##################################################
          ##### MULTI SELECT CODE FOR PURSCHASE ORDER ######
          ##################################################
*/

  const selectHIER1 = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.HIER1)
    })
    updatedData = hierData.filter((res) => !selectedDataOptions.includes(res.HIER1))
    updatedData = [...event, ...updatedData];
    setHierData(updatedData)

    let selectedHIER1 = [];
    if (value.option) {
      valHIER1CCommon.push(value.option);
      if (String(value.option.HIER1).includes(inputHIER1CCommon)) {
        setInputHIER1CCommon("");
      }
      if (String(value.option.HIER1).substring(inputHIER1CCommon)) {
        setInputHIER1CCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER1CCommon.length; i++) {
        if (valHIER1CCommon[i]["HIER1"] === value.removedValue.HIER1) {
          index = i;
          break;
        }
      }
      // Reverse Filtering
      console.log("before rev fil", valHIER2CCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, hier2Data, "HIER1", "HIER2", valHIER2CCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrH3.length > 0 ? fltrH3 : hier3Data, "HIER1", "HIER3", valHIER3CCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrITP.length > 0 ? fltrITP : itemParentData, "HIER1", "ITEM_PARENT", valITEM_PARENTCCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrPACK.length > 0 ? fltrPACK : packNoData, "HIER1", "PACK_NO", valPACK_NOCCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrDiff.length > 0 ? fltrDiff : diffData, "HIER1", "DIFF_ID", valDIFF_IDCCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrSku.length > 0 ? fltrSku : skuData, "HIER1", "SKU", valSKUCCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrVPN.length > 0 ? fltrVPN : vpnData, "HIER1", "VPN", valVPNCCommon);
      Rev_fltr(valHIER1CCommon[index].HIER1, fltrUDA.length > 0 ? fltrUDA : udaData, "HIER1", "UDA", valUDACCommon);
      valHIER1CCommon.splice(index, 1);

    } else if (value.action === "clear") {
      valHIER1CCommon.splice(0, valHIER1CCommon.length);
    }
    // if (value.action === "deselect-option") {
    //   valHIER1CCommon.splice(0, valHIER1CCommon.length);
    //   valHIER1CCommon.push(...event);
    // }
    //SELECTION
    if (valHIER1CCommon.length > 0 && typeof valHIER1CCommon[0]['HIER1'] !== "undefined") {
      valHIER1CCommon.map(
        (item) => {
          selectedHIER1.push(item.HIER1);
        }
      )
      // if(searchDataCCommon.UDA.length>0){
      //   var temp={}
      //   if(searchDataCCommon.HIER3.length>0){
      //     temp["HIER3"]=[...searchDataCCommon.HIER3]
      //   }else if(searchDataCCommon.HIER2.length>0){
      //     temp["HIER2"]=[...searchDataCCommon.HIER2]
      //   }else if(searchDataCCommon.HIER1.length>0){
      //     temp["HIER1"]=[...selectedHIER1]
      //   }
      //   console.log("use gh",temp)
      //   if(Object.keys(temp).length>0){
      //   filteringData(udaData,temp,"UDAV"); // Filtering UDA
      //   console.log("useEffect",valUDACCommon)
      //   }
      // }
      // setUDAVCheck(true);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER1: selectedHIER1,
        };
      });
      // dISPATCH CALL ON SELECTED HIER1 VALUES
      var temp = {};
      temp["HIER1"] = selectedHIER1;
      dispatch(getHIER2Request([temp]));
      dispatch(getHIER3Request([temp]));
      dispatch(getITEMPARENTRequest([temp]));
      dispatch(getPACKNORequest([temp]));
      dispatch(getSKURequest([temp]));
      dispatch(getDIFFRequest([temp]));
      dispatch(getVPNRequest([temp]));
      dispatch(getUDARequest([temp]));
      // dispatch(getASNRequest([temp]));
      // dispatch(getTSFRequest([temp]));

    } else {
      initialDataPO.HIER1 = "";
      //CLEARING DATA WHEN HIER1 IS EMPTY
      setHier2Data([]);
      setHier3Data([]);
      setItemParentData([]);
      setPackNoData([]);
      setUdaData([]);
      setVpnData([]);
      setSkuData([]);
      setDIffData([]);
      //filter variables data
      setFltrH3([]);
      setFltrITP([]);
      setFltrPACK([]);
      setFltrVPN([]);
      setFltrDiff([]);
      setFltrUDA([]);

      setValSKUCCommon([])
      setValVPNCCommon([]);
      setValUDACCommon([]);
      setValUDA_VALUECCommon([]);
      setValPACK_NOCCommon([]);
      setValITEM_PARENTCCommon([]);
      setValHIER3CCommon([]);
      setValHIER2CCommon([]);
      setValDIFF_IDCCommon([]);

      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER1: [],
          HIER2: [],
          HIER3: [],
          PACK_NO: [],
          ITEM_PARENT: [],
          DIFF_ID: [],
          SKU: [],
          VPN: [],
          UDA: [],
          UDA_VALUE: [],
          EXCLUDE_UDA: [],
          EXCLUDE_UDA_VALUE: [],
        };
      });

    }
  }

  const selectHIER2 = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.HIER2)
    })
    updatedData = hier2Data.filter((res) => !selectedDataOptions.includes(res.HIER2))
    updatedData = [...event, ...updatedData];
    setHier2Data(updatedData)

    let selectedHIER2 = [];
    let temp_Arr = []
    if (value.option) {
      valHIER2CCommon.push(value.option);
      if (String(value.option.HIER2).includes(inputHIER2CCommon)) {
        setInputHIER2CCommon("");
      }
      if (String(value.option.HIER2).substring(inputHIER2CCommon)) {
        setInputHIER2CCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER2CCommon.length; i++) {
        if (valHIER2CCommon[i]["HIER2"] === value.removedValue.HIER2) {
          index = i;
          break;
        }
      }
      // Reverse Filtering

      Rev_fltr(valHIER2CCommon[index].HIER2, fltrH3, "HIER2", "HIER3", valHIER3CCommon);
      Rev_fltr(valHIER2CCommon[index].HIER2, fltrITP, "HIER2", "ITEM_PARENT", valITEM_PARENTCCommon);
      Rev_fltr(valHIER2CCommon[index].HIER2, fltrDiff, "HIER2", "DIFF_ID", valDIFF_IDCCommon);
      Rev_fltr(valHIER2CCommon[index].HIER2, fltrSku, "HIER2", "SKU", valSKUCCommon);
      Rev_fltr(valHIER2CCommon[index].HIER2, fltrVPN, "HIER2", "VPN", valVPNCCommon);
      Rev_fltr(valHIER2CCommon[index].HIER2, fltrUDA, "HIER2", "UDA", valUDACCommon);
      Rev_fltr(valHIER2CCommon[index].HIER2, fltrPACK, "HIER2", "PACK_NO", valPACK_NOCCommon);
      valHIER2CCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER2CCommon.splice(0, valHIER2CCommon.length);
    }
    // SELECTING AND FILTERING
    if (valHIER2CCommon.length > 0 && typeof valHIER2CCommon[0]['HIER2'] !== "undefined") {
      valHIER2CCommon.map(
        (item) => {
          selectedHIER2.push(item.HIER2);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER2: selectedHIER2,
        };
      });
      //FILTERING BASED ON HIER2 SELECTION
      var temp = {}
      temp["HIER2"] = selectedHIER2;
      filteringData(UniqSubClass, temp, "HIER3"); // Filtering Subclass
      if (searchDataCCommon.HIER3.length === 0) {
        filteringData(packNoData, temp, "PACK_NO"); // Filtering Pack no
        filteringData(itemParentData, temp, "ITEM_PARENT"); // Filtering ITEM_PARENT
        filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
        filteringData(skuData, temp, "SKU"); // Filtering SKU
        filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
        filteringData(udaData, temp, "UDA"); // Filtering UDA
      }
    } else {
      initialDataPO.HIER2 = "";
      setFltrH3([]);
      setFltrUDA([]);
      setFltrDiff([]);
      setFltrSku([]);
      setFltrITP([]);
      setFltrPACK([]);
      setFltrVPN([]);
      setValHIER3CCommon([])
      setUDAVCheck(true);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER2: [],
          HIER3: [],
        };
      });

    }
  }

  const selectHIER3 = (event, value) => {

    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.HIER3)
    })
    updatedData = UniqSubClass.filter((res) => !selectedDataOptions.includes(res.HIER3))
    updatedData = [...event, ...updatedData];
    setHier3Data(updatedData)
    setFltrH3(updatedData)

    let selectedHIER3 = [];
    if (value.option) {
      valHIER3CCommon.push(value.option);
      if (String(value.option.HIER3).includes(inputHIER3CCommon)) {
        setInputHIER3CCommon("");
      }
      if (String(value.option.HIER3).substring(inputHIER3CCommon)) {
        setInputHIER3CCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER3CCommon.length; i++) {
        if (valHIER3CCommon[i]["HIER3"] === value.removedValue.HIER3) {
          index = i;
          break;
        }
      }
      // Reverse Filtering
      if (valHIER3CCommon.length > 1) {
        Rev_fltr(valHIER3CCommon[index].HIER3, fltrPACK, "HIER3", "PACK_NO", valPACK_NOCCommon);
        Rev_fltr(valHIER3CCommon[index].HIER3, fltrITP, "HIER3", "ITEM_PARENT", valITEM_PARENTCCommon);
        Rev_fltr(valHIER3CCommon[index].HIER3, fltrDiff, "HIER3", "DIFF_ID", valDIFF_IDCCommon);
        Rev_fltr(valHIER3CCommon[index].HIER3, fltrSku, "HIER3", "SKU", valSKUCCommon);
        Rev_fltr(valHIER3CCommon[index].HIER3, fltrVPN, "HIER3", "VPN", valVPNCCommon);
        Rev_fltr(valHIER3CCommon[index].HIER3, fltrUDA, "HIER3", "UDA", valUDACCommon);
      }
      valHIER3CCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER3CCommon.splice(0, valHIER3CCommon.length);
    }

    if (valHIER3CCommon.length > 0 && typeof valHIER3CCommon[0]['HIER3'] !== "undefined") {
      valHIER3CCommon.map(
        (item) => {
          selectedHIER3.push(item.HIER3);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER3: selectedHIER3,
        };
      });
      var temp = {}
      temp["HIER3"] = selectedHIER3;
      filteringData(packNoData, temp, "PACK_NO"); // Filtering Pack no
      filteringData(itemParentData, temp, "ITEM_PARENT"); // Filtering ITEM_PARENT
      filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
      filteringData(skuData, temp, "SKU"); // Filtering SKU
      filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
      filteringData(udaData, temp, "UDA"); // Filtering UDA
    } else {
      ////console.log(234,searchDataCCommon)
      initialDataPO.HIER3 = "";
      var temp = {}
      if (searchDataCCommon.HIER2.length > 0) {
        ////console.log(234)
        temp["HIER2"] = searchDataCCommon.HIER2;
        // //console.log("temp",temp)
        filteringData(packNoData, temp, "PACK_NO");
        filteringData(UniqItemParent, temp, "ITEM_PARENT"); // Filtering ITEM_PARENT
        filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
        filteringData(skuData, temp, "SKU"); // Filtering SKU
        filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
        filteringData(udaData, temp, "UDA"); // Filtering UDA
      }
      setUDAVCheck(true);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          HIER3: [],
        };
      });
    }
  }

  const selectITEM_LIST_NO = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.ITEM_LIST_NO)
    })
    updatedData = itemListHeadData.filter((res) => !selectedDataOptions.includes(res.ITEM_LIST_NO))
    updatedData = [...event, ...updatedData];
    setItemListHeadData(updatedData)

    let selectedITEM_LIST_NO = [];
    if (value.option) {
      valITEM_LIST_NOCCommon.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////////console.log(1234)
      //   setInputWHCCommon("");
      // }
      if (String(value.option.ITEM_LIST_NO).includes(inputITEM_LIST_NOCCommon)) {
        setInputITEM_LIST_NOCCommon("");
      }
      if (String(value.option.ITEM_LIST_NO).substring(inputITEM_LIST_NOCCommon)) {
        setInputITEM_LIST_NOCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valITEM_LIST_NOCCommon.length; i++) {
        if (valITEM_LIST_NOCCommon[i]["ITEM_LIST_NO"] === value.removedValue.ITEM_LIST_NO) {
          index = i;
          break;
        }
      }
      valITEM_LIST_NOCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valITEM_LIST_NOCCommon.splice(0, valITEM_LIST_NOCCommon.length);
    }
    if (event === 0) {
      valITEM_LIST_NOCCommon.push(value)
    }
    if (valITEM_LIST_NOCCommon.length > 0 && typeof valITEM_LIST_NOCCommon[0]['ITEM_LIST_NO'] !== "undefined") {
      valITEM_LIST_NOCCommon.map(
        (item) => {
          selectedITEM_LIST_NO.push(item.ITEM_LIST_NO);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: selectedITEM_LIST_NO,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ITEM_LIST_NO"}</p>
        </div>
      )
    } else {
      initialDataPO.ITEM_LIST_NO = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: [],
        };
      });
    }
  }

  const selectWH = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.WH)
    })
    updatedData = warehouseData.filter((res) => !selectedDataOptions.includes(res.WH))
    updatedData = [...event, ...updatedData];
    setWarehouseData(updatedData)

    let selectedWH = [];
    if (value.option) {
      valWHCCommon.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////////console.log(1234)
      //   setInputWHCCommon("");
      // }
      if (String(value.option.WH).includes(inputWHCCommon)) {
        setInputWHCCommon("");
      }
      if (String(value.option.WH).substring(inputWHCCommon)) {
        setInputWHCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valWHCCommon.length; i++) {
        if (valWHCCommon[i]["WH"] === value.removedValue.WH) {
          index = i;
          break;
        }
      }
      valWHCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valWHCCommon.splice(0, valWHCCommon.length);
    }
    if (event === 0) {
      valWHCCommon.push(value)
    }
    if (valWHCCommon.length > 0 && typeof valWHCCommon[0]['WH'] !== "undefined") {
      valWHCCommon.map(
        (item) => {
          selectedWH.push(item.WH);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          WH: selectedWH,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid WH"}</p>
        </div>
      )
    } else {
      initialDataPO.WH = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          WH: [],
        };
      });
    }
  }

  const selectSUPPLIER = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.SUPPLIER)
    })
    updatedData = supplierData.filter((res) => !selectedDataOptions.includes(res.SUPPLIER))
    updatedData = [...event, ...updatedData];
    setSupplierData(updatedData)

    let selectedSUPPLIER = [];
    if (value.option) {
      valSUPPLIERCCommon.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////////console.log(1234)
      //   setInputWHCCommon("");
      // }
      if (String(value.option.SUPPLIER).includes(inputSUPPLIERCCommon)) {
        setInputSUPPLIERCCommon("");
      }
      if (String(value.option.SUPPLIER).substring(inputSUPPLIERCCommon)) {
        setInputSUPPLIERCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSUPPLIERCCommon.length; i++) {
        if (valSUPPLIERCCommon[i]["SUPPLIER"] === value.removedValue.SUPPLIER) {
          index = i;
          break;
        }
      }
      valSUPPLIERCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valSUPPLIERCCommon.splice(0, valSUPPLIERCCommon.length);
    }
    if (event === 0) {
      valSUPPLIERCCommon.push(value)
    }
    if (valSUPPLIERCCommon.length > 0 && typeof valSUPPLIERCCommon[0]['SUPPLIER'] !== "undefined") {
      valSUPPLIERCCommon.map(
        (item) => {
          selectedSUPPLIER.push(item.SUPPLIER);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SUPPLIER: selectedSUPPLIER,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SUPPLIER"}</p>
        </div>
      )
    } else {
      initialDataPO.SUPPLIER = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SUPPLIER: [],
        };
      });
    }
  }

  const selectSUPPLIER_SITE = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.SUPPLIER_SITE)
    })
    updatedData = supplerSiteData.filter((res) => !selectedDataOptions.includes(res.SUPPLIER_SITE))
    updatedData = [...event, ...updatedData];
    setSupplerSiteData(updatedData)

    let selectedSUPPLIER_SITE = [];
    if (value.option) {
      valSUPPLIER_SITECCommon.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////////console.log(1234)
      //   setInputWHCCommon("");
      // }
      if (String(value.option.SUPPLIER_SITE).includes(inputSUPPLIER_SITECCommon)) {
        setInputSUPPLIER_SITECCommon("");
      }
      if (String(value.option.SUPPLIER_SITE).substring(inputSUPPLIER_SITECCommon)) {
        setInputSUPPLIER_SITECCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSUPPLIER_SITECCommon.length; i++) {
        if (valSUPPLIER_SITECCommon[i]["SUPPLIER_SITE"] === value.removedValue.SUPPLIER_SITE) {
          index = i;
          break;
        }
      }
      valSUPPLIER_SITECCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valSUPPLIER_SITECCommon.splice(0, valSUPPLIER_SITECCommon.length);
    }
    if (event === 0) {
      valSUPPLIER_SITECCommon.push(value)
    }
    if (valSUPPLIER_SITECCommon.length > 0 && typeof valSUPPLIER_SITECCommon[0]['SUPPLIER_SITE'] !== "undefined") {
      valSUPPLIER_SITECCommon.map(
        (item) => {
          selectedSUPPLIER_SITE.push(item.SUPPLIER_SITE);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SUPPLIER_SITE: selectedSUPPLIER_SITE,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SUPPLIER_SITE"}</p>
        </div>
      )
    } else {
      initialDataPO.SUPPLIER_SITE = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SUPPLIER_SITE: [],
        };
      });
    }
  }

  const selectPACK_NO = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.PACK_NO)
    })
    updatedData = packNoData.filter((res) => !selectedDataOptions.includes(res.PACK_NO))
    updatedData = [...event, ...updatedData];
    setPackNoData(updatedData)

    let selectedPACK_NO = [];
    if (value.option) {
      valPACK_NOCCommon.push(value.option);
      if (String(value.option.PACK_NO).includes(inputPACK_NOCCommon)) {
        setInputPACK_NOCCommon("");
      }
      if (String(value.option.PACK_NO).substring(inputPACK_NOCCommon)) {
        setInputPACK_NOCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valPACK_NOCCommon.length; i++) {
        if (valPACK_NOCCommon[i]["PACK_NO"] === value.removedValue.PACK_NO) {
          index = i;
          break;
        }
      }
      // Reverse filtering
      Rev_fltr(valPACK_NOCCommon[index].PACK_NO, fltrDiff, "PACK_NO", "DIFF_ID", valDIFF_IDCCommon);
      Rev_fltr(valPACK_NOCCommon[index].PACK_NO, fltrVPN, "PACK_NO", "VPN", valVPNCCommon);
      Rev_fltr(valPACK_NOCCommon[index].PACK_NO, fltrUDA, "PACK_NO", "UDA", valUDACCommon);

      valPACK_NOCCommon.splice(index, 1);
    } else if (value.action === "clear") {

      valPACK_NOCCommon.splice(0, valPACK_NOCCommon.length);
    }
    if (valPACK_NOCCommon.length > 0 && typeof valPACK_NOCCommon[0]['PACK_NO'] !== "undefined") {
      valPACK_NOCCommon.map(
        (item) => {
          selectedPACK_NO.push(item.PACK_NO);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          PACK_NO: selectedPACK_NO,
        };
      });
      var temp = {}
      temp["SKU"] = selectedPACK_NO;
      // Filtering on select 
      filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
      filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
      filteringData(udaData, temp, "UDA"); // Filtering UDA
    } else {
      //console.log(1234)
      initialDataPO.PACK_NO = "";
      // Re-filtering when PACK_NO is empty
      var temp = {}
      if (searchDataCCommon.SKU.length > 0) {
        temp["SKU"] = searchDataCCommon.SKU
      } else if (searchDataCCommon.ITEM_PARENT.length > 0) {
        temp["ITEM_PARENT"] = searchDataCCommon.ITEM_PARENT
      } else if (searchDataCCommon.HIER3.length > 0) {
        temp["HIER3"] = searchDataCCommon.HIER3
      } else if (searchDataCCommon.HIER2.length > 0) {
        temp["HIER2"] = searchDataCCommon.HIER2
      }
      if (Object.keys(temp).length > 0) {
        filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
        filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
        filteringData(udaData, temp, "UDA"); // Filtering UDA
      } else {
        setFltrDiff([]);
        setFltrVPN([]);
        setFltrUDA([]);
      }

      //setFltrPACK([]);

      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PACK_NO: [],
        };
      });
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          PACK_NO: [],
        };
      });
    }
  }

  const selectITEM_PARENT = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.ITEM_PARENT)
    })
    updatedData = itemParentData.filter((res) => !selectedDataOptions.includes(res.ITEM_PARENT))
    updatedData = [...event, ...updatedData];
    setItemParentData(updatedData)

    let selectedITEM_PARENT = [];
    if (value.option) {
      valITEM_PARENTCCommon.push(value.option);
      if (String(value.option.ITEM_PARENT).includes(inputITEM_PARENTCCommon)) {
        setInputITEM_PARENTCCommon("");
      }
      if (String(value.option.ITEM_PARENT).substring(inputITEM_PARENTCCommon)) {
        setInputITEM_PARENTCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valITEM_PARENTCCommon.length; i++) {
        if (valITEM_PARENTCCommon[i]["ITEM_PARENT"] === value.removedValue.ITEM_PARENT) {
          index = i;
          break;
        }
      }

      // Reverse filtering
      Rev_fltr(valITEM_PARENTCCommon[index].ITEM_PARENT, fltrPACK, "ITEM_PARENT", "PACK_NO", valPACK_NOCCommon);
      Rev_fltr(valITEM_PARENTCCommon[index].ITEM_PARENT, fltrDiff, "ITEM_PARENT", "DIFF_ID", valDIFF_IDCCommon);
      Rev_fltr(valITEM_PARENTCCommon[index].ITEM_PARENT, fltrVPN, "ITEM_PARENT", "VPN", valVPNCCommon);
      Rev_fltr(valITEM_PARENTCCommon[index].ITEM_PARENT, fltrUDA, "ITEM_PARENT", "UDA", valUDACCommon);
      Rev_fltr(valITEM_PARENTCCommon[index].ITEM_PARENT, fltrSku, "ITEM_PARENT", "SKU", valSKUCCommon); //Reverse filtering SKU
      valITEM_PARENTCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      console.log("itp", valITEM_PARENTCCommon)
      valITEM_PARENTCCommon.splice(0, valITEM_PARENTCCommon.length);
    }
    if (valITEM_PARENTCCommon.length > 0 && typeof valITEM_PARENTCCommon[0]['ITEM_PARENT'] !== "undefined") {
      valITEM_PARENTCCommon.map(
        (item) => {
          selectedITEM_PARENT.push(item.ITEM_PARENT);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          ITEM_PARENT: selectedITEM_PARENT,
        };
      });
      var temp = {};
      temp["ITEM_PARENT"] = selectedITEM_PARENT;
      filteringData(packNoData, temp, "PACK_NO"); // Filtering Pack no
      filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
      filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
      filteringData(udaData, temp, "UDA"); // Filtering UDA
      filteringData(skuData, temp, "SKU"); // Filtering SKU
    } else {
      console.log(123456, "kill order")
      initialDataPO.ITEM_PARENT = "";
      // Re-filtering when ITEM_PARENT is empty
      var temp = {}
      if (searchDataCCommon.SKU.length > 0) {
        temp["SKU"] = searchDataCCommon.SKU
      } else if (searchDataCCommon.PACK_NO.length > 0) {
        temp["PACK_NO"] = searchDataCCommon.PACK_NO
      } else if (searchDataCCommon.HIER3.length > 0) {
        temp["HIER3"] = searchDataCCommon.HIER3
      } else if (searchDataCCommon.HIER2.length > 0) {
        temp["HIER2"] = searchDataCCommon.HIER2
      }
      if (Object.keys(temp).length > 0) {
        if (Object.keys(temp).includes("HIER2") || Object.keys(temp).includes("HIER3")) {
          filteringData(packNoData, temp, "PACK_NO"); // Filtering Pack no
          filteringData(skuData, temp, "SKU"); // Filtering SKU
        } else {
          setFltrSku([]);
          setFltrPACK([]);
        }
        filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
        filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
        filteringData(udaData, temp, "UDA"); // Filtering UDA

      } else {
        setFltrSku([]);
        setFltrDiff([]);
        setFltrVPN([]);
        setFltrUDA([]);
        setFltrPACK([])
      }
      //setFltrITP([]);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          ITEM_PARENT: [],
        };
      });

    }
  }

  const selectDIFF_ID = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.DIFF_ID)
    })
    updatedData = diffData.filter((res) => !selectedDataOptions.includes(res.DIFF_ID))
    updatedData = [...event, ...updatedData];
    setDIffData(updatedData)

    let selectedDIFF_ID = [];
    if (value.option) {
      valDIFF_IDCCommon.push(value.option);
      if (String(value.option.DIFF_ID).substring(inputDIFF_IDCCommon)) {
        setInputDIFF_IDCCommon("");
      }
      if (String(value.option.DIFF_ID).includes(inputDIFF_IDCCommon)) {
        setInputDIFF_IDCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valDIFF_IDCCommon.length; i++) {
        if (valDIFF_IDCCommon[i]["DIFF_ID"] === value.removedValue.DIFF_ID) {
          index = i;
          break;
        }
      }
      // Reverse filtering SKU when unselect
      Rev_fltr(valDIFF_IDCCommon[index].DIFF_ID, fltrSku, "DIFF_ID", "SKU", valSKUCCommon); //Reverse filtering SKU
      valDIFF_IDCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valDIFF_IDCCommon.splice(0, valDIFF_IDCCommon.length);
    }

    if (valDIFF_IDCCommon.length > 0 && typeof valDIFF_IDCCommon[0]['DIFF_ID'] !== "undefined") {
      valDIFF_IDCCommon.map(
        (item) => {
          selectedDIFF_ID.push(item.DIFF_ID);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          DIFF_ID: selectedDIFF_ID,
        };
      });
      // Filtering on select
      var temp = {};
      //var data=[];
      temp["DIFF_ID"] = selectedDIFF_ID;

      filteringData(fltrSku.length > 0 ? fltrSku : skuData, temp, "SKU"); // Filtering SKU

    } else {
      initialDataPO.DIFF_ID = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          DIFF_ID: [],
        };
      });
      // Re-filtering when diff is empty
      var temp = {}
      // if(searchDataCCommon.SKU.length>0){
      //   temp["SKU"]=searchDataCCommon.SKU
      // }else 
      if (searchDataCCommon.ITEM_PARENT.length > 0) {
        temp["ITEM_PARENT"] = searchDataCCommon.ITEM_PARENT
      } else if (searchDataCCommon.HIER3.length > 0) {
        temp["HIER3"] = searchDataCCommon.HIER3
      } else if (searchDataCCommon.HIER2.length > 0) {
        temp["HIER2"] = searchDataCCommon.HIER2
      }
      if (Object.keys(temp).length > 0) {
        filteringData(skuData, temp, "SKU"); // Filtering SKU

      } else {
        setFltrSku([]);
      }
    }
  }

  const selectSKU = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.SKU)
    })
    updatedData = skuData.filter((res) => !selectedDataOptions.includes(res.SKU))
    updatedData = [...event, ...updatedData];
    setSkuData(updatedData)

    let selectedSKU = [];
    if (value.option) {
      valSKUCCommon.push(value.option);
      if (String(value.option.SKU).includes(inputSKUCCommon)) {
        setInputSKUCCommon("");
      }
      if (String(value.option.SKU).substring(inputSKUCCommon)) {
        setInputSKUCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSKUCCommon.length; i++) {
        if (valSKUCCommon[i]["SKU"] === value.removedValue.SKU) {
          index = i;
          break;
        }
      }
      // Reverse filtering
      Rev_fltr(valSKUCCommon[index].SKU, fltrDiff, "SKU", "DIFF_ID", valDIFF_IDCCommon);
      Rev_fltr(valSKUCCommon[index].SKU, fltrVPN, "SKU", "VPN", valVPNCCommon);
      Rev_fltr(valSKUCCommon[index].SKU, fltrUDA, "SKU", "UDA", valUDACCommon);

      valSKUCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valSKUCCommon.splice(0, valSKUCCommon.length);
    }
    if (valSKUCCommon.length > 0 && typeof valSKUCCommon[0]['SKU'] !== "undefined") {
      valSKUCCommon.map(
        (item) => {
          selectedSKU.push(item.SKU);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SKU: selectedSKU,
        };
      });
      var temp = {};
      temp["SKU"] = selectedSKU;
      filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
      filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
      filteringData(udaData, temp, "UDA"); // Filtering UDA

    } else {
      initialDataPO.SKU = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          SKU: [],
        };
      });
      // Re-filtering when SKU is empty
      var temp = {}
      if (searchDataCCommon.ITEM_PARENT.length > 0) {
        temp["ITEM_PARENT"] = searchDataCCommon.ITEM_PARENT
      } else if (searchDataCCommon.PACK_NO.length > 0) {
        temp["PACK_NO"] = searchDataCCommon.PACK_NO
      } else if (searchDataCCommon.HIER3.length > 0) {
        temp["HIER3"] = searchDataCCommon.HIER3
      } else if (searchDataCCommon.HIER2.length > 0) {
        temp["HIER2"] = searchDataCCommon.HIER2
      }
      if (Object.keys(temp).length > 0) {
        filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
        filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
        filteringData(udaData, temp, "UDA"); // Filtering UDA
      } else {
        setFltrDiff([]);
        setFltrVPN([]);
        setFltrUDA([]);
      }
      //setFltrSku([]);
    }
  }

  const selectVPN = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.VPN)
    })
    updatedData = vpnData.filter((res) => !selectedDataOptions.includes(res.VPN))
    updatedData = [...event, ...updatedData];
    setVpnData(updatedData)

    let selectedVPN = [];
    if (value.option) {
      valVPNCCommon.push(value.option);
      if (String(value.option.VPN).substring(inputVPNCCommon)) {
        setInputVPNCCommon("");
      }
      if (String(value.option.VPN).includes(inputVPNCCommon)) {
        setInputVPNCCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valVPNCCommon.length; i++) {
        if (valVPNCCommon[i]["VPN"] === value.removedValue.VPN) {
          index = i;
          break;
        }
      }
      valVPNCCommon.splice(index, 1);
    } else if (value.action === "clear") {
      valVPNCCommon.splice(0, valVPNCCommon.length);
    }

    if (valVPNCCommon.length > 0 && typeof valVPNCCommon[0]['VPN'] !== "undefined") {
      valVPNCCommon.map(
        (item) => {
          selectedVPN.push(item.VPN);
        }
      )
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          VPN: selectedVPN,
        };
      });
    } else {
      initialDataPO.VPN = "";
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          VPN: [],
        };
      });
    }
  }

  const selectPO = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.PO)
    })
    updatedData = poData.filter((res) => !selectedDataOptions.includes(res.PO))
    updatedData = [...event, ...updatedData];
    setPoData(updatedData)

    let selectedPO = [];
    if (value.option) {
      valPOCPO.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////////console.log(1234)
      //   setInputWHCCommon("");
      // }
      if (String(value.option.PO).includes(inputPOCPO)) {
        setInputPOCPO("");
      }
      if (String(value.option.PO).substring(inputPOCPO)) {
        setInputPOCPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valPOCPO.length; i++) {
        if (valPOCPO[i]["PO"] === value.removedValue.PO) {
          index = i;
          break;
        }
      }
      valPOCPO.splice(index, 1);
    } else if (value.action === "clear") {
      valPOCPO.splice(0, valPOCPO.length);
    }
    if (event === 0) {
      valPOCPO.push(value)
    }
    if (valPOCPO.length > 0 && typeof valPOCPO[0]['PO'] !== "undefined") {
      valPOCPO.map(
        (item) => {
          selectedPO.push(item.PO);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PO: selectedPO,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid PO"}</p>
        </div>
      )
    } else {
      initialDataPO.PO = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PO: [],
        };
      });
    }
  }

  const selectPO_TYPE = (event, value) => {
    let updatedData = []
    let selectedDataOptions = []
    event.map((res) => {
      selectedDataOptions.push(res.PO_TYPE)
    })
    updatedData = poData.filter((res) => !selectedDataOptions.includes(res.PO_TYPE))
    updatedData = [...event, ...updatedData];
    setPoData(updatedData)

    let selectedPO_TYPE = [];
    if (value.option) {
      valPO_TYPECPO.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////////console.log(1234)
      //   setInputWHCCommon("");
      // }
      if (String(value.option.PO_TYPE).substring(inputPO_TYPECPO)) {
        setInputPO_TYPECPO("");
      }
      if (String(value.option.PO_TYPE).includes(inputPO_TYPECPO)) {
        setInputPO_TYPECPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valPO_TYPECPO.length; i++) {
        if (valPO_TYPECPO[i]["PO_TYPE"] === value.removedValue.PO_TYPE) {
          index = i;
          break;
        }
      }
      valPO_TYPECPO.splice(index, 1);
    } else if (value.action === "clear") {
      valPO_TYPECPO.splice(0, valPO_TYPECPO.length);
    }
    if (event === 0) {
      valPO_TYPECPO.push(value)
    }
    if (valPO_TYPECPO.length > 0 && typeof valPO_TYPECPO[0]['PO_TYPE'] !== "undefined") {
      valPO_TYPECPO.map(
        (item) => {
          selectedPO_TYPE.push(item.PO_TYPE);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PO_TYPE: selectedPO_TYPE,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid PO_TYPE"}</p>
        </div>
      )
    } else {
      initialDataPO.PO_TYPE = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PO_TYPE: [],
        };
      });
    }
  }

  const selectUDA = (e, value) => {
    let updatedData = []
    let selectedDataOptions = []
    e.map((res) => {
      selectedDataOptions.push(res.UDA)
    })
    updatedData = udaData.filter((res) => !selectedDataOptions.includes(res.UDA))
    updatedData = [...e, ...updatedData];
    setUdaData(updatedData)

    if (e === "Filter") {
      valUDACCommon.splice(0, valUDACCommon.length);
      valUDACCommon.push(...value);
    }

    let selectedUDA = [];
    if (value.option) {
      valUDACCommon.push(value.option)
      if (String(value.option.UDA).includes(inputUDACCommon)) {
        setInputUDACCommon("");
      }
      if (String(value.option.UDA).substring(inputUDACCommon)) {
        setInputUDACCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDACCommon.length; i++) {
        if (valUDACCommon[i]["UDA"] === value.removedValue.UDA) {
          index = i;
          break;
        }
      }
      valUDACCommon.splice(index, 1);

    } else if (value.action === "clear") {
      valUDACCommon.splice(0, valUDACCommon.length);
      valUDA_VALUECCommon.splice(0, valUDA_VALUECCommon.length);
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          UDA_VALUE: [],
        };

      });
    }
    //manual input handle input and filter itemdata
    //Filtering UDA_VALUE based on UDA
    if (valUDACCommon.length > 0) {
      //////////console.log("valUDACCommon",valUDACCommon)
      const filterUDAValueCCommon = (fltrUDA.length > 0 ? fltrUDA : udaData).filter((item) => {
        return (valUDACCommon).some((val) => {
          return item.UDA === val.UDA;
        });
      });
      //////////console.log("filterUDAValueCCommon",filterUDAValueCCommon)
      setFilterUDAValueCCommon(fltrSort(filterUDAValueCCommon, "UDA_VALUE"));
      valUDACCommon.map((item) => {
        selectedUDA.push(item.UDA);
      });

      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          UDA: selectedUDA,
        };
      });

      // var filter_rem1 = selectedUDA.filter(function (i) {
      //   return this.indexOf(i) < 0;
      // },
      //   searchDataCCommon.UDA)

      // var filter_rem2 = searchDataCCommon.UDA.filter(function (i) {
      //   return this.indexOf(i) < 0;
      // },
      //   selectedUDA)
      // //////////////console.log("wew",elmts)
      // if (filter_rem1.length > 0 || filter_rem2.length > 0) {
      //   var temp = [];
      //   filter_rem1.length > 0 ? temp = [...filter_rem1] : temp = [...filter_rem2]
      //   ////////////console.log("wew",temp)
      //   for (var i = 0; i < temp.length; i++) {////////////console.log("Afvsd")
      //     const index = searchDataCCommon.UDA.indexOf(temp[i]);
      //     if (index > -1) {
      //       searchDataCCommon.UDA.splice(index, 1);
      //     }
      //     ////////////console.log("searchDataCPO.UDA",searchDataCPO.UDA)
      //   }
      // }
    } else {
      setFilterUDAValueCCommon([]);
      // setValUDA_VALUECCommon([])
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          UDA: [],
          UDA_VALUE: []
        };
      });
    }
  }

  const selectUDA_VALUE = (e, value) => {
    let updatedData = []
    let selectedDataOptions = []
    e.map((res) => {
      selectedDataOptions.push(res.UDA_VALUE)
    })
    updatedData = filterUDAValueCCommon.filter((res) => !selectedDataOptions.includes(res.UDA_VALUE))
    updatedData = [...e, ...updatedData];
    setFilterUDAValueCCommon(updatedData)

    let selectedUDA_VALUE = [];
    if (value.option) {
      valUDA_VALUECCommon.push(value.option)
      if (String(value.option.UDA_VALUE).includes(inputUDA_VALUECCommon)) {
        setInputUDA_VALUECCommon("");
      }
      if (String(value.option.UDA_VALUE).substring(inputUDA_VALUECCommon)) {
        setInputUDA_VALUECCommon("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDA_VALUECCommon.length; i++) {
        if (valUDA_VALUECCommon[i]["UDA_VALUE"] === value.removedValue.UDA_VALUE) {
          index = i;
          break;
        }
      }
      valUDA_VALUECCommon.splice(index, 1);

    } else if (value.action === "clear") {
      valUDA_VALUECCommon.splice(0, valUDA_VALUECCommon.length);
    }
    //manual input handle input and filter itemdata

    //Filtering UDA_VALUE based on UDA
    if (valUDA_VALUECCommon.length > 0) {

      valUDA_VALUECCommon.map((item) => {
        selectedUDA_VALUE.push(item.UDA_VALUE);
      });
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });
    } else {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });
    }
  }

  const selectEXCLUDE_UDA = (e, value) => {
    let updatedData = []
    let selectedDataOptions = []

    if (value.action === "select-option") {
      Object.keys(e).map((res) => {
        selectedDataOptions.push(e["EXCLUDE_UDA"])
      })
      updatedData = excludeUdaData.filter((res) => !selectedDataOptions.includes(res.EXCLUDE_UDA))
      updatedData = [e, ...updatedData];
      setExcludeUdaData(updatedData)

      let var1 = [e]

      const filterEXCLUDE_UDAValueCCommon = excludeUdaData.filter((item) => {
        return (var1).some((val) => {
          return item.EXCLUDE_UDA === val.EXCLUDE_UDA;
        });
      });
      setFilterEXCLUDE_UDAValueCCommon(filterEXCLUDE_UDAValueCCommon);
    }

    if (e) {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          // CONTEXT: val.CODE,
          EXCLUDE_UDA: e.EXCLUDE_UDA
        };
      });
    }
    // if (value.action === "clear") {
    else {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA: [],
          EXCLUDE_UDA_VALUE: [],
          // CONTEXT_CODE: "",
        };
      });
    }
  }

  const selectEXCLUDE_UDA_VALUE = (e, value) => {
    let updatedData = []
    let selectedDataOptions = []
    if (value.action === "select-option") {
      Object.keys(e).map((res) => {
        selectedDataOptions.push(e["EXCLUDE_UDA_VALUE"])
      })
      updatedData = filterEXCLUDE_UDAValueCCommon.filter((res) => !selectedDataOptions.includes(res.EXCLUDE_UDA_VALUE))
      updatedData = [e, ...updatedData];
      setFilterEXCLUDE_UDAValueCCommon(updatedData)
    }

    if (e) {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          // CONTEXT: val.CODE,
          EXCLUDE_UDA_VALUE: e.EXCLUDE_UDA_VALUE
        };
      });
    }
    // if (value.action === "clear") {
    else {
      setSearchDataCCommon((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: [],
          // CONTEXT_CODE: "",
        };
      });
    }
  }

  const selectASNCASN = (event, value) => {
    let selectedASN = [];
    if (value.option) {
      valASNCASN.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////////console.log(1234)
      //   setInputWHCASN("");
      // }
      if (String(value.option.ASN).substring(inputASNCASN)) {
        setInputASNCASN("");
      }
      if (String(value.option.ASN).includes(inputASNCASN)) {
        setInputASNCASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valASNCASN.length; i++) {
        if (valASNCASN[i]["ASN"] === value.removedValue.ASN) {
          index = i;
          break;
        }
      }
      valASNCASN.splice(index, 1);
    } else if (value.action === "clear") {
      valASNCASN.splice(0, valASNCASN.length);
    }
    if (event === 0) {
      valASNCASN.push(value)
    }
    if (valASNCASN.length > 0 && typeof valASNCASN[0]['ASN'] !== "undefined") {
      valASNCASN.map(
        (item) => {
          selectedASN.push(item.ASN);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          ASN: selectedASN,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ASN"}</p>
        </div>
      )
    } else {
      initialDataASN.ASN = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          ASN: [],
        };
      });
    }
  }

  const selectTSFCTSF = (event, value) => {
    let selectedTSF = [];
    if (value.option) {
      valTSFCTSF.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////////console.log(1234)
      //   setInputWHCTSF("");
      // }
      if (String(value.option.TSF).substring(inputTSFCTSF)) {
        setInputTSFCTSF("");
      }
      if (String(value.option.TSF).includes(inputTSFCTSF)) {
        setInputTSFCTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valTSFCTSF.length; i++) {
        if (valTSFCTSF[i]["TSF"] === value.removedValue.TSF) {
          index = i;
          break;
        }
      }
      valTSFCTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valTSFCTSF.splice(0, valTSFCTSF.length);
    }
    if (event === 0) {
      valTSFCTSF.push(value)
    }
    if (valTSFCTSF.length > 0 && typeof valTSFCTSF[0]['TSF'] !== "undefined") {
      valTSFCTSF.map(
        (item) => {
          selectedTSF.push(item.TSF);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          TSF: selectedTSF,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid TSF"}</p>
        </div>
      )
    } else {
      initialDataTSF.TSF = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          TSF: [],
        };
      });
    }
  }

  ///////////////////////////////////////////
  const [openItem, setOpenItem] = React.useState(false);
  const [openDept, setOpenDept] = React.useState(false);
  const [openClass, setOpenClass] = React.useState(false);
  const [openSubclass, setOpenSubclass] = React.useState(false);
  const [openDiffID, setOpenDiffID] = React.useState(false);
  const [openWH, setOpenWH] = React.useState(false);

  /////////////////////////////////////////
  ////////////
  /////////////////////////////////////////
  const handleClickOpenItem = () => {
    setOpenItem(true);
  };
  const handleCloseItem = () => {
    setOpenItem(false);
  };

  const SearchGridAvailITEM = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenItem} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )

  /////////////////////////////////////////
  ////////////
  /////////////////////////////////////////
  const handleClickOpenDept = () => {
    setOpenDept(true);
  };
  const handleCloseDept = () => {
    setOpenDept(false);
  };

  const SearchGridAvailDept = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenDept} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )


  /////////////////////////////////////////
  ////////////
  /////////////////////////////////////////
  const handleClickOpenClass = () => {
    setOpenClass(true);
  };
  const handleCloseClass = () => {
    setOpenClass(false);
  };

  const SearchGridAvailClass = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenClass} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )

  /////////////////////////////////////////
  ////////////
  /////////////////////////////////////////
  const handleClickOpenSubclass = () => {
    setOpenSubclass(true);
  };
  const handleCloseSubclass = () => {
    setOpenSubclass(false);
  };

  const SearchGridAvailSubclass = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenSubclass} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )


  /////////////////////////////////////////
  ////////////
  /////////////////////////////////////////
  const handleClickOpenDiffID = () => {
    setOpenDiffID(true);
  };
  const handleCloseDiffID = () => {
    setOpenDiffID(false);
  };

  const SearchGridAvailDiffID = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenDiffID} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )


  /////////////////////////////////////////
  ////////////
  /////////////////////////////////////////
  const handleClickOpenWH = () => {
    setOpenWH(true);
  };
  const handleCloseWH = () => {
    setOpenWH(false);
  };

  const SearchGridAvailWH = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenWH} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )

  // console.log("UniqDept:1:", searchDataCCommon.HIER1[0]);
  ///////////////////////////////////////
  //HTML CRITERIA//////////////////////
  ///////////////
  // const ValueComponent = ({ children, ...props }) => {
  //   const { getValue, hasValue } = props;
  //   const length = getValue().length;
  //   if (!hasValue) {
  //     return (
  //       <components.ValueContainer {...props}>
  //         {children}
  //       </components.ValueContainer>
  //     );
  //   }
  //   return (
  //     <components.ValueContainer {...props}>
  //       {`${length} options`}
  //     </components.ValueContainer>
  //   );
  // };

  const ValueContainer = ({ children, getValue, ...props }) => {
    let maxToShow = 1;
    var length = getValue().length;
    let displayChips = React.Children.toArray(children).slice(0, maxToShow);
    let shouldBadgeShow = length > maxToShow;
    let displayLength = length - maxToShow;

    return (
      <components.ValueContainer {...props}>
        {!props.selectProps.inputValue && displayChips}
        <div className="root">
          {shouldBadgeShow &&
            `+ ${displayLength} item${length != 1 ? "s" : ""} selected`}
        </div>
      </components.ValueContainer>
    );
  };

  const Control = ({ children, ...props }) => (
    <components.Control {...props}>
      {children}
      <Button size="small" sx={{ margin: "0px", padding: "0px", minWidth: "0px" }} startIcon={<SearchIcon sx={{ padding: 0 }} />}>{console.log("cancel")}</Button>
    </components.Control>
  )


  const SearchCriteria = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        // marginLeft: "5px",
        padding: "0rem 0rem",
        width: "100%",
        // border:"1px solid gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Dept</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
              getOptionValue={option => option.HIER1}
              options={UniqDept.length > 0 ? UniqDept : []}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER1CCommon(value); // <---
              }}
              inputValue={inputHIER1CCommon}
              onChange={selectHIER1}
              maxMenuHeight={180}
              // placeholder={"Choose a Dept"}
              hideSelectedOptions={false}
              styles={styleSelect}
              menuPlacement="auto"
              isSearchable={true}
              components={animatedComponents}
              isMulti
              // defaultValue={searchDataCCommon.HIER1.length>0 ? searchDataCCommon.HIER1[0]:[]}
              // components={{ ValueContainer }}
              // components={{ Control }}
              isClearable={true}
              value={UniqDept.filter(obj => searchDataCCommon?.HIER1.includes(obj.HIER1))}
              closeMenuOnSelect={false}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Class</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={false}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
              getOptionValue={option => option.HIER2}
              options={(UniqClass.length > 0) ? UniqClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER2CCommon(value);
              }}
              inputValue={inputHIER2CCommon}
              onChange={selectHIER2}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Class"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqClass.filter(obj => searchDataCCommon?.HIER2.includes(obj.HIER2))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Subclass</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={false}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
              getOptionValue={option => option.HIER3}
              options={fltrH3.length > 0 || searchDataCCommon.HIER2.length > 0 ? fltrH3 : (UniqSubClass.length > 0) ? UniqSubClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER3CCommon(value);
              }}
              inputValue={inputHIER3CCommon}
              onChange={selectHIER3}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Subclass"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              // value={searchDataCPO.HIER3}
              value={fltrH3.length > 0 ? fltrH3.filter(obj => searchDataCCommon?.HIER3.includes(obj.HIER3))
                : UniqSubClass.filter(obj => searchDataCCommon?.HIER3.includes(obj.HIER3))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  && searchDataCCommon["HIER2"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    && searchDataCCommon["HIER2"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              WH</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.WH.toString()}-(${option.WH_DESC.toString()})`}
              getOptionValue={option => option.WH}
              options={warehouseData.length > 0 ? warehouseData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputWHCCommon(value);
              }}
              inputValue={inputWHCCommon}
              onChange={selectWH}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={warehouseData.filter(obj => searchDataCCommon?.WH.includes(obj.WH))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER}
              options={supplierData.length > 0 ? supplierData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIERCCommon(value);
              }}
              inputValue={inputSUPPLIERCCommon}
              onChange={selectSUPPLIER}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplierData.filter(obj => searchDataCCommon?.SUPPLIER.includes(obj.SUPPLIER))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier Site</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER_SITE.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER_SITE}
              options={supplerSiteData.length > 0 ? supplerSiteData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIER_SITECCommon(value);
              }}
              inputValue={inputSUPPLIER_SITECCommon}
              onChange={selectSUPPLIER_SITE}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // isClearable={true}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplerSiteData.filter(obj => searchDataCCommon?.SUPPLIER_SITE.includes(obj.SUPPLIER_SITE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Pack No</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.PACK_NO.toString()}`}
              getOptionValue={option => option.PACK_NO}
              options={fltrPACK.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrPACK.length > 0
                  ? [...new Map(fltrPACK.map((item) => [item["PACK_NO"], item])).values()]
                  : []
                : packNoData.length > 0 ? packNoData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputPACK_NOCCommon(value);
              }}
              inputValue={inputPACK_NOCCommon}
              onChange={selectPACK_NO}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={packNoData.filter(obj => searchDataCCommon?.PACK_NO.includes(obj.PACK_NO))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Item Parent</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              //disabled={filterItem.length > 0 ?false:true}
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_PARENT.toString()}`}
              getOptionValue={option => option.ITEM_PARENT}
              options={fltrITP.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrITP.length > 0
                  ? [...new Map(fltrITP.map((item) => [item["ITEM_PARENT"], item])).values()]
                  : []
                : UniqItemParent.length > 0 ? UniqItemParent : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_PARENTCCommon(value);
              }}
              inputValue={inputITEM_PARENTCCommon}
              onChange={selectITEM_PARENT}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a ITEM"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqItemParent.filter(obj => searchDataCCommon?.ITEM_PARENT.includes(obj.ITEM_PARENT))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Diff ID</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.DIFF_ID.toString()}`}
              getOptionValue={option => option.DIFF_ID}
              options={fltrDiff.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrDiff.length > 0
                  ? [...new Map(fltrDiff.map((item) => [item["DIFF_ID"], item])).values()]
                  : []
                : diffData.length > 0 ? UniqDiff_id : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputDIFF_IDCCommon(value);
              }}
              inputValue={inputDIFF_IDCCommon}
              onChange={selectDIFF_ID}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={diffData.filter(obj => searchDataCCommon?.DIFF_ID.includes(obj.DIFF_ID))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Sku</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SKU.toString()}`}
              getOptionValue={option => option.SKU}
              options={fltrSku.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrSku.length > 0
                  ? [...new Map(fltrSku.map((item) => [item["SKU"], item])).values()]
                  : []
                : UniqSKU.length > 0 ? UniqSKU : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSKUCCommon(value);
              }}
              inputValue={inputSKUCCommon}
              onChange={selectSKU}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={skuData.filter(obj => searchDataCCommon?.SKU.includes(obj.SKU))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Item List</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_LIST_NO.toString()}-${option.ITEM_LIST_DESC.toString()}`}
              getOptionValue={option => option.ITEM_LIST_NO}
              options={itemListHeadData.length > 0 ? itemListHeadData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_LIST_NOCCommon(value);
              }}
              inputValue={inputITEM_LIST_NOCCommon}
              onChange={selectITEM_LIST_NO}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={itemListHeadData.filter(obj => searchDataCCommon?.ITEM_LIST_NO.includes(obj.ITEM_LIST_NO))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              VPN</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.VPN.toString()}`}
              getOptionValue={option => option.VPN}
              options={fltrVPN.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrVPN.length > 0
                  ? [...new Map(fltrVPN.map((item) => [item["VPN"], item])).values()]
                  : []
                : UniqVPN.length > 0 ? UniqVPN : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputVPNCCommon(value);
              }}
              inputValue={inputVPNCCommon}
              onChange={selectVPN}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqVPN.filter(obj => searchDataCCommon?.VPN.includes(obj.VPN))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>


        {searchHeaderData.ALLOC_CRITERIA === "PURCHASE_ORDER" ? [
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                PO</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.PO.toString()}`}
                getOptionValue={option => option.PO}
                options={poData.length > 0 ? poData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputPOCPO(value);
                }}
                inputValue={inputPOCPO}
                onChange={selectPO}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={poData.filter(obj => searchDataCPO?.PO.includes(obj.PO))}
                isMulti
                isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length === 0) ||
                (isGreatCTEDF && isGreatCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  EISD From*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  EISD From</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                variant="outlined"
                type="date"
                name="ESID_FROM"
                autoComplete='off'
                helperText=""
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCPO.ESID_FROM}
                id="outlined-disabled"
                // label="EISD From"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                error={
                  (isValidCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length === 0) ||
                  (isGreatCTEDF && isGreatCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length > 0)
                }
                disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCPO["PO"].length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCPO["PO"].length > 0
                      ? false : true)
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTEDF && searchDataCPO["ESID_FROM"].length > 0 && searchDataCPO["ESID_TO"].length === 0) ||
                (isGreatCTEDF && isGreatCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  EISD To*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  EISD To</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                type="date"
                name="ESID_TO"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCPO.ESID_TO}
                autoComplete='off'
                id="outlined-disabled"
                // label="EISD To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                error={(isValidCTEDF && searchDataCPO["ESID_FROM"].length > 0 && searchDataCPO["ESID_TO"].length === 0) ||
                  (isGreatCTEDF && isGreatCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length > 0)
                }
                disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCPO["PO"].length > 0
                    // && searchDataCPO["ESID_FROM"].length
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCPO["PO"].length > 0
                      // && searchDataCPO["ESID_FROM"].length
                      ? false : true)
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTNDT && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0) ||
                (isGreatCTNDT && isGreatCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Not Before Date From*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  Not Before Date From</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                type="date"
                name="NOT_BEFORE_DATE_FROM"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCPO.NOT_BEFORE_DATE_FROM}
                id="outlined-disabled"
                autoComplete='off'
                // label="Not Before Date From"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                error={
                  (isValidCTNDT && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0) ||
                  (isGreatCTNDT && isGreatCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0)
                }
                disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCPO["PO"].length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCPO["PO"].length > 0
                      ? false : true)
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              {(isValidCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0) ||
                (isGreatCTNDT && isGreatCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0) ?
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                  Not Before Date To*</InputLabel> :
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                  Not Before Date To</InputLabel>}
            </div>
            <div>
              <TextField
                size="small"
                type="date"
                name="NOT_BEFORE_DATE_TO"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0"
                  }
                }}
                onChange={onChangeCPO}
                value={searchDataCPO.NOT_BEFORE_DATE_TO}
                id="outlined-disabled"
                autoComplete='off'
                // label="Not Before Date To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                error={
                  (isValidCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0) ||
                  (isGreatCTNDT && isGreatCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0)
                }
                disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCPO["PO"].length > 0
                    // && searchDataCPO["NOT_BEFORE_DATE_FROM"].length
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCPO["PO"].length > 0
                      // && searchDataCPO["NOT_BEFORE_DATE_FROM"].length
                      ? false : true)
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                PO Type</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.PO_TYPE.toString()}`}
                getOptionValue={option => option.PO_TYPE}
                options={UniqPOType.length > 0 ? UniqPOType : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputPO_TYPECPO(value);
                }}
                inputValue={inputPO_TYPECPO}
                onChange={selectPO_TYPE}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={UniqPOType.filter(obj => searchDataCPO?.PO_TYPE.includes(obj.PO_TYPE))}
                isMulti
                isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      ? false : true)
                }
              />
            </div>
          </div>
        ] : null}

        {searchHeaderData.ALLOC_CRITERIA === "WAREHOUSE" ? [
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Avail Qty &gt;=</InputLabel>
            </div>
            <div>
              <TextField
                size="small"
                name="MIN_AVAIL_QTY"
                sx={{
                  // backgroundColor:"green",
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    // height: "15px",
                  }
                }}
                onChange={onChangeCWH}
                value={searchDataCWH.MIN_AVAIL_QTY}
                id="outlined-disabled"
                autoComplete='off'
                // label="Avail Qty &gt;="
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  className: CreateAllocationClasses.inputFielddate,
                  style: { fontSize: 12, height: "32px", backgroundColor: "white" },
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                // style={{
                //   backgroundColor: "red"
                // }}
                // variant="outlined" 
                disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCCommon["HIER1"].length
                      ? false : true)
                }
              />
            </div>
          </div>,

          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Avail Qty &lt;=</InputLabel>
            </div>
            <div>
              <TextField
                size="small"
                name="MAX_AVAIL_QTY"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",
                  }
                }}
                onChange={onChangeCWH}
                value={searchDataCWH.MAX_AVAIL_QTY}
                id="outlined-disabled"
                autoComplete='off'
                // label="Not Before Date To"
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "32px" },
                  className: CreateAllocationClasses.inputFielddate,
                }}
                inputProps={{ sx: { backgroundColor: '#fff' } }}
                disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCCommon["HIER1"].length
                      ? false : true)
                }
              />
            </div>
          </div>
        ] : null}

        {searchHeaderData.ALLOC_CRITERIA === "ASN" ?
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                ASN</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.ASN.toString()}`}
                getOptionValue={option => option.ASN}
                options={asnData.length > 0 ? asnData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputASNCASN(value);
                }}
                inputValue={inputASNCASN}
                onChange={selectASNCASN}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={asnData.filter(obj => searchDataCASN?.ASN.includes(obj.ASN))}
                isMulti
                isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCCommon["HIER1"].length
                      ? false : true)
                }
              />
            </div>
          </div>
          : null}

        {searchHeaderData.ALLOC_CRITERIA === "TRANSFER" ?
          <div className={CreateAllocationClasses.float_child}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Transfer</InputLabel>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.TSF.toString()}`}
                getOptionValue={option => option.TSF}
                options={tsfData.length > 0 ? tsfData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputTSFCTSF(value);
                }}
                inputValue={inputTSFCTSF}
                onChange={selectTSFCTSF}
                hideSelectedOptions={false}
                menuPlacement="auto"
                maxMenuHeight={180}
                // placeholder={"Choose a Warehouse"}
                styles={styleSelect}
                components={animatedComponents}
                value={tsfData.filter(obj => searchDataCTSF?.TSF.includes(obj.TSF))}
                isMulti
                isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchHeaderData["PROMOTION"].toString().length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
                  :
                  (
                    searchHeaderData["ALLOC_DESC"].length > 0
                      && searchHeaderData["ALLOC_LEVEL"].length > 0
                      && searchHeaderData["CONTEXT"].length > 0
                      && searchHeaderData["ALLOC_TYPE"].length > 0
                      && searchHeaderData["RELEASE_DATE"].length > 0
                      && searchDataCCommon["HIER1"].length
                      ? false : true)
                }
              />
            </div>
          </div>
          : null}

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              UDA</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.UDA}
              options={fltrUDA.length > 0 || (searchDataCCommon.HIER2.length > 0 || searchDataCCommon.HIER3.length > 0) ?
                fltrUDA.length > 0
                  ? [...new Map(fltrUDA.map((item) => [item["UDA"], item])).values()]
                  : []
                : UniqUDA.length > 0 ? UniqUDA : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDACCommon(value);
              }}
              inputValue={inputUDACCommon}
              onChange={selectUDA}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              isOptionDisabled={() => valUDACCommon.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqUDA.filter(obj => searchDataCCommon?.UDA.includes(obj.UDA))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              UDA Value</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={false}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA_VALUE.toString()} (${option.USER_ATTR_VALUE_DESC.toString()})`}
              getOptionValue={option => option.UDA_VALUE}
              options={filterUDAValueCCommon.length > 0 ? filterUDAValueCCommon : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDA_VALUECCommon(value);
              }}
              inputValue={inputUDA_VALUECCommon}
              onChange={selectUDA_VALUE}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={filterUDAValueCCommon.filter(obj => searchDataCCommon?.UDA_VALUE.includes(obj.UDA_VALUE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  && searchDataCCommon["UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    && searchDataCCommon["UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA}
              options={UniqExcludeUDA.length > 0 ? UniqExcludeUDA : []}
              isSearchable={true}
              // onInputChange={(value, action) => {
              //   if (action.action === "input-change") setInputEXCLUDE_UDACCommon(value);
              // }}
              // inputValue={inputEXCLUDE_UDACCommon}
              onChange={selectEXCLUDE_UDA}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              isClearable={true}
              // isOptionDisabled={() => valEXCLUDE_UDACCommon.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              // value={UniqExcludeUDA.filter(obj => searchDataCCommon?.EXCLUDE_UDA.includes(obj.EXCLUDE_UDA))}
              value={UniqExcludeUDA.filter(obj => searchDataCCommon?.EXCLUDE_UDA === (obj.EXCLUDE_UDA))}
              // isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  && searchDataCCommon["UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    && searchDataCCommon["UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA Value</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA_VALUE.toString()}-${option.USER_ATTR_VALUE_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA_VALUE}
              options={filterEXCLUDE_UDAValueCCommon.length > 0 ? filterEXCLUDE_UDAValueCCommon : []}
              isSearchable={true}
              // onInputChange={(value, action) => {
              //   if (action.action === "input-change") setInputEXCLUDE_UDA_VALUECCommon(value);
              // }}
              // inputValue={inputEXCLUDE_UDA_VALUECCommon}
              onChange={selectEXCLUDE_UDA_VALUE}
              hideSelectedOptions={false}
              menuPlacement="auto"
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              isClearable={true}
              components={animatedComponents}
              // value={filterEXCLUDE_UDAValueCCommon.filter(obj => searchDataCCommon?.EXCLUDE_UDA_VALUE.includes(obj.EXCLUDE_UDA_VALUE))}
              value={filterEXCLUDE_UDAValueCCommon.filter(obj => searchDataCCommon?.EXCLUDE_UDA_VALUE === (obj.EXCLUDE_UDA_VALUE))}
              // isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCCommon["HIER1"].length
                  && searchDataCCommon["EXCLUDE_UDA"].toString().length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCCommon["HIER1"].length
                    && searchDataCCommon["EXCLUDE_UDA"].toString().length
                    ? false : true)
              }
            />
          </div>
        </div>

      </div>
    </Box>
  )


  const SearchWhatIf = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        margin: "0rem",
        padding: "0rem 0rem",
        width: "100%",
        // border:"1px solid gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Dept:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Dept"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Class:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Class"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Subclass:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Subclass"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          WH:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="WH"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Supplier"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier Site:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Supplier Site"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Pack No:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Pack No"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item Parent:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Item Parent"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Diff ID:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Diff ID"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Sku:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Sku"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item List:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Item List"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          VPN:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="VPN"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Avail Qty &gt;=:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Avail Qty &gt;="
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
        Avail Qty &lt;=:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Avail Qty &lt;="
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA1:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="UDA1"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA1 Value:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="UDA1 Value"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA2:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="UDA2"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA2 Value:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="UDA2 Value"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA3:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="UDA3"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA3 Value:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="UDA3 Value"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Exclude UDA"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA Value:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Exclude UDA Value"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

      </div>
    </Box>
  )

  const SearchButtonGrid = () => (
    <Box
      display="flex"
      sx={{
        backgroundColor: "",
        height: "auto",
        width: "100%",
        padding: "0px 0px 0px 0px",
        justifyContent: "space-between",
        marginTop: "2px",
      }}
    >
      <div className={CreateAllocationClasses.grid_container}>
        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px",
              marginLeft: "5px", paddingLeft: "0px", marginTop: "2px",
            }}
            variant="contained"
            // className={CreateAllocationClasses.textField}
            type="submit"
            onClick={SubmitList}
          >
            Add</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            variant="contained"
            onClick={handleDelete}
          >Delete</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            variant="contained">Split</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={RefreshGrid}
          >Refresh</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            variant="contained"
            // startIcon={<CachedIcon  />}
            onClick={RefreshTableGrid}
          >Refresh Grid</Button>
        </div>

        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            variant="contained">Errors</Button>
        </div>

      </div>

      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              fontSize: "12px",
              backgroundColor: "#228B22",
              padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            startIcon={<DoneAllIcon />}
            variant="contained">
            Ok</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child1}>
          <Button
            sx={{
              backgroundColor: "maroon",
              fontSize: "12px", padding: "5px", fontFamily: "system-ui",
              width: "100px", marginLeft: "5px", marginTop: "2px",
            }}
            startIcon={<CancelIcon />}
            variant="contained">Cancel</Button>
        </div>

      </div>
    </Box>
  )

  const SearchButton = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        margin: "0rem",
        padding: "5px 0px 10px 0px",
        width: "100%",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.grid_child}>
          <Button
            sx={{
              fontSize: "12px",
              backgroundColor: "MediumSeaGreen",
            }}
            variant="contained">
            Submit</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{ backgroundColor: "rgb(255, 0, 9)", fontSize: "12px" }} variant="contained">Cancel</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px"
            }}
            variant="contained"
            onClick={RefreshGrid}
          >Refresh</Button>
        </div>
      </div>
    </Box>
  )

  const SearchButtonHeaderDesc = () => (
    <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
      <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
        onClick={() => {
          swal(
            <div
              className={CreateAllocationClasses.Desc_column}
            >
              {searchHeaderData.ALLOC_DESC}
            </div>
            // {
            //   //title:"Description",
            //   text: searchHeaderData.ALLOC_DESC,
            //   style: {border:"1px solid red"},
            //   border :"1px solid red",
            //   className:CreateAllocationClasses.Desc_column
            // }
          )
        }}
      />
    </IconButton>

  )

  const SearchHeader = () => (
    <Box
      component="fieldset"
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        width: "100%",
        // backgroundColor: "rgb(250, 250, 250)",
        borderRadius: 1,

        boxShadow: 2, border: 0,
        borderBottom: 3,
        border: "1px solid lightgrey",
        // border:"1px dotted gray",
        // borderRadius:"5px",
      }}
    >
      <legend style={{ fontWeight: "bold", }}>Header</legend>
      {/* <div>
      <InputLabel sx={{ fontWeight: "bold", fontSize: "16px", margin: "2px 0px 5px 5px", float: 'left', color: "black" }}>
        Header</InputLabel>
        </div> */}

      <div className={CreateAllocationClasses.header_container}>
        <div className={CreateAllocationClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Allocation ID</InputLabel>
          </div>
          <div>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 2px", width: "180px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "15px",
                }
              }}
              disabled
              name="ALLOC_NO"
              value={searchHeaderData.ALLOC_NO = allocNoData["ALLOC_NO"]}
              // onChange={onChange}
              id="outlined-disabled"
              defaultValue={allocNoData["ALLOC_NO"]}
              InputProps={{
                style: { fontSize: 12, height: "30px" },
                className: CreateAllocationClasses.input,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            {(isValid && searchHeaderData.ALLOC_DESC.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Desc*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Desc</InputLabel>}
          </div>
          <div>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 2px", width: "180px"
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
              value={searchHeaderData.ALLOC_DESC}
              defaultValue=""
              onChange={onChange}
              inputProps={{
                maxLength: 100,
              }}
              required
              InputProps={{
                endAdornment: <SearchButtonHeaderDesc />,
                className: CreateAllocationClasses.input,
                style: { fontSize: 12, height: "30px" },
              }}
              disabled={!searchHeaderData.ALLOC_NO}
              error={searchHeaderData.ALLOC_DESC.length === 0 && isValid}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            {(isValid && searchHeaderData.CONTEXT.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Context Type*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Context Type</InputLabel>}
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.CONTEXT.toString()}`}
              getOptionValue={option => option.CONTEXT}
              options={contextTypeData.length > 0 ? contextTypeData : []}
              isSearchable={true}
              onChange={selectCONTEXT_TYPE}
              maxMenuHeight={180}
              // placeholder={"Choose a Dept"}
              styles={(isValid && searchHeaderData.CONTEXT.length === 0) ? styleSelect2 : styleSelect1}
              components={animatedComponents}
              // isClearable={true}
              value={contextTypeData.filter(obj => searchHeaderData?.CONTEXT_CODE === (obj.CONTEXT))}
              closeMenuOnSelect={true}
              isDisabled={!searchHeaderData.ALLOC_NO}
              theme={(isValid && searchHeaderData.CONTEXT.length === 0) ? theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: '#b22222',  // Placeholder color //slategrey
                },
              }) : false}
            />
          </div>
        </div>

        {searchHeaderData.CONTEXT_CODE === "Promotion" ?
          [
            <div className={CreateAllocationClasses.header_child}>
              <div>
                {(isValid && searchHeaderData.PROMOTION.length === 0) ?
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                    Promotion*</InputLabel> :
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                    Promotion</InputLabel>}
              </div>
              <div className={CreateAllocationClasses.multiselectfield}>
                <Select
                  // className= {CreateAllocationClasses.inputField}
                  classNamePrefix="mySelect"
                  getOptionLabel={option =>
                    `${option.PROMOTION.toString()} -${option.DESCRIPTION.toString()} (${option.START_DATE.toString()})-(${option.END_DATE.toString()})`}
                  getOptionValue={option => option.PROMOTION}
                  options={promotionData.length > 0 ? promotionData : []}
                  isSearchable={true}
                  onChange={selectPROMOTION}
                  maxMenuHeight={180}
                  // placeholder={"Choose a Dept"}
                  styles={(isValid && searchHeaderData.PROMOTION.length === 0) ? styleSelect2 : styleSelect1}
                  components={animatedComponents}
                  // isClearable={true}
                  value={promotionData.filter(obj => searchHeaderData?.PROMOTION_CODE === obj.PROMOTION)}
                  closeMenuOnSelect={true}
                  isDisabled={headerDis}
                  theme={(isValid && searchHeaderData.PROMOTION.length === 0) ? theme => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      neutral50: '#b22222',  // Placeholder color //slategrey
                    },
                  }) : false}
                />
              </div>
            </div>
          ] : null}


        <div className={CreateAllocationClasses.header_child}>
          <div >
            {(isValid && searchHeaderData.ALLOC_LEVEL.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Alloc Level*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Alloc Level</InputLabel>}
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.ALLOC_LEVEL.toString()}`}
              getOptionValue={option => option.ALLOC_LEVEL}
              options={allocLevelData.length > 0 ? allocLevelData : []}
              isSearchable={true}
              onChange={selectALLOC_LEVEL}
              maxMenuHeight={180}
              // placeholder={"Choose a Dept"}
              styles={(isValid && searchHeaderData.ALLOC_LEVEL.length === 0) ? styleSelect2 : styleSelect1}
              components={animatedComponents}
              // isClearable={true}
              value={allocLevelData.filter(obj => searchHeaderData?.ALLOC_LEVEL_CODE === (obj.ALLOC_LEVEL))}
              closeMenuOnSelect={true}
              isDisabled={headerDis || !searchHeaderData.ALLOC_NO}
              theme={(isValid && searchHeaderData.ALLOC_LEVEL.length === 0) ? theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: '#b22222',  // Placeholder color //slategrey
                },
              }) : false}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            {(isValid && searchHeaderData.RELEASE_DATE.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Release Date*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Release Date</InputLabel>}
          </div>
          <div>
            <TextField
              variant="outlined"
              type="date"
              size="small"
              name="RELEASE_DATE"
              format="yyyy/MM/dd"
              autoComplete='off'
              inputProps={{ min: new Date().toISOString().slice(0, 10) }}
              sx={{
                margin: "0px 0px 2px 2px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "15px",
                },
                input: {
                  background: "white"
                }
              }}
              id="outlined-disabled"
              disabled={!searchHeaderData.ALLOC_NO}
              label=""
              value={searchHeaderData.RELEASE_DATE}
              onChange={onChange}
              error={searchHeaderData.RELEASE_DATE.length === 0 && isValid}
              // helperText={(searchHeaderData.RELEASE_DATE.length===0 && isValid)=== true ? null : null}
              InputProps={{
                style: { fontSize: 12, height: "30px" },
                shrink: true,
                className: CreateAllocationClasses.input,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Status</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 2px 2px", width: "180px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "15px",
                }
              }}
              disabled
              name="STATUS"
              value={(searchHeaderData.STATUS = statusCreateData.CODE) && (searchHeaderData.STATUS_CODE = statusCreateData.STATUS)}
              // onChange={onChange}
              id="outlined-disabled"
              autoComplete='off'
              defaultValue={statusCreateData.STATUS}
              InputProps={{
                style: { fontSize: 12, height: "30px" },
                className: CreateAllocationClasses.input,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            {(isValid && searchHeaderData.ALLOC_TYPE.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Alloc Type*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Alloc Type</InputLabel>}
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ALLOC_TYPE.toString()}`}
              getOptionValue={option => option.ALLOC_TYPE}
              options={allocTypeData.length > 0 ? allocTypeData : []}
              isSearchable={true}
              onChange={selectALLOC_TYPE}
              maxMenuHeight={180}
              // isClearable={true}
              // placeholder={"Choose a Warehouse"}
              styles={(isValid && searchHeaderData.ALLOC_TYPE.length === 0) ? styleSelect2 : styleSelect1}
              components={animatedComponents}
              value={allocTypeData.filter(obj => searchHeaderData?.ALLOC_TYPE_CODE === (obj.ALLOC_TYPE))}
              // isMulti 
              isDisabled={headerDis || !searchHeaderData.ALLOC_NO}
              theme={(isValid && searchHeaderData.ALLOC_TYPE.length === 0) ? theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: '#b22222',  // Placeholder color //slategrey
                },
              }) : false}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Allocator</InputLabel>
          </div>
          <div>
            <TextField
              variant="outlined"
              size="small"
              sx={{
                margin: "0px 0px 2px 2px", width: "180px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "15px",
                }
              }}
              disabled
              name="CREATE_ID"
              id="outlined-disabled"
              autoComplete='off'
              value={searchHeaderData.CREATE_ID}
              onChange={onChange}
              InputProps={{
                style: { fontSize: 12, height: "30px" },
                className: CreateAllocationClasses.input,
              }}
            />
          </div>
        </div>
      </div>
    </Box>
  )


  const SearchAvailQty = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        width: "100%",
        // border:"1px dotted gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Dept</InputLabel>
          </div>
          <div>
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].HIER1_DESC : null} placement="top"> */}
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].HIER1) + (" - ") + (
                String(availSearch[0].HIER1_DESC).length > 0 && String(availSearch[0].HIER1_DESC).length < 8 ?
                  availSearch[0].HIER1_DESC === "NULL" ? null : availSearch[0].HIER1_DESC
                  : String(availSearch[0].HIER1_DESC).substring(0, 8) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailDept />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
            {/* </Tooltip> */}

          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Class</InputLabel>
          </div>
          <div>
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].HIER2_DESC : null} placement="top"> */}
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].HIER2) + (" - ") + (
                String(availSearch[0].HIER2_DESC).length > 0 && String(availSearch[0].HIER2_DESC).length < 8 ?
                  availSearch[0].HIER2_DESC === "NULL" ? null : availSearch[0].HIER2_DESC
                  : String(availSearch[0].HIER2_DESC).substring(0, 8) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailClass />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
            {/* </Tooltip> */}
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Subclass</InputLabel>
          </div>
          <div>
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].HIER3_DESC : null} placement="top"> */}
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].HIER3) + (" - ") + (
                String(availSearch[0].HIER3_DESC).length > 0 && String(availSearch[0].HIER3_DESC).length < 8 ?
                  availSearch[0].HIER3_DESC === "NULL" ? null : availSearch[0].HIER3_DESC
                  : String(availSearch[0].HIER3_DESC).substring(0, 8) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailSubclass />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
            {/* </Tooltip> */}
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Item Parent</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].ITEM) + (" - ") + (
                String(availSearch[0].ITEM_DESC).length > 0 && String(availSearch[0].ITEM_DESC).length < 8 ?
                  availSearch[0].ITEM_DESC === "NULL" ? null : availSearch[0].ITEM_DESC
                  : String(availSearch[0].ITEM_DESC).substring(0, 12) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailITEM />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            // sx={{
            //   ".MuiOutlinedInput-input-1708": {
            //     padding: 0,
            //   }
            // }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Diff ID</InputLabel>
          </div>
          <div>
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].DIFF_DESC : null} placement="top"> */}
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].DIFF_ID) + (" - ") + (
                String(availSearch[0].DIFF_DESC).length > 0 && String(availSearch[0].DIFF_DESC).length < 8 ?
                  availSearch[0].DIFF_DESC === "NULL" ? null : availSearch[0].DIFF_DESC
                  : String(availSearch[0].DIFF_DESC).substring(0, 12) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailDiffID />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
            {/* </Tooltip> */}
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Doc No</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputField,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Doc Type</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputField,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              WH</InputLabel>
          </div>
          <div>
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].WH_DESC : null} placement="top"> */}
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].LOC) + (" - ") + (
                String(availSearch[0].WH_DESC).length > 0 && String(availSearch[0].WH_DESC).length < 8 ?
                  availSearch[0].WH_DESC === "NULL" ? null : availSearch[0].WH_DESC
                  : String(availSearch[0].WH_DESC).substring(0, 12) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailWH />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
            {/* </Tooltip> */}
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Avail Qty</InputLabel>
          </div>
          <div>
            <TextField value={totalAvailQty} id="filled-disabled" size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputField,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Inactive Qty</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputField,
              }}
            />
          </div>
        </div>
      </div>
    </Box>
  )


  if (searchHeaderData.ALLOC_LEVEL_CODE === "Style Diff") {
    headCells.map((option) => { if (option.label === "Item") { option.label = "Item parent" } })
  } else if (searchHeaderData.ALLOC_LEVEL_CODE === "Sku") {
    headCells.map((option) => { if (option.label === "Item parent") { option.label = "Item" } })
  }


  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead className={CreateAllocationClasses.TitleHead}>
        <TableRow className={CreateAllocationClasses.TitleRow}>
          <StyledTableCell padding="checkbox" style={{
            whiteSpace: "nowrap", padding: "0px", margin: "0px", width: "10px"
            // border: "1px solid red"
          }}
          >
            <Checkbox
              color="primary"
              size="small"
              indeterminate={selected.length > 0 && selected.length < totalData.length}
              checked={totalData.length > 0 && selected.length === totalData.length}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all data',
              }}
              style={{
                color: "#fff",
                padding: "3px 0px 3px 0px",
                textAlign: "center"
                // margin: "0px 0px 0px 5px",
              }}
            />
          </StyledTableCell >
          {headCells.map((headCell) => (
            <StyledTableCell
              // className={CreateAllocationClasses.TableCell}
              size="small"
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{
                whiteSpace: "nowrap", paddingLeft: "3px"
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
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
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell >
          ))}
        </TableRow>
      </TableHead>
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

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(totalData.length > 0 && {
            minHeight: {
              minHeight: "25px !important",
            },
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
          padding: "0px"
        }}
      >
        {totalData.length > 0 && (
          <Typography
            sx={{
              flex: "1 1 100%",
              display: "flex",
              justifyContent: "flex-end",
              padding: "0px 10px 0px 0px",
              fontSize: "14px",
              fontFamily: "system-ui",
            }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Rows {selected.length} of {totalData.length}
          </Typography>
        )}
      </Toolbar>
    );
  }

  function descendingComparator(a, b, orderBy) {
    let c, d;
    if (orderBy == "SR_NO") {
      c = (b[orderBy]);
      d = (a[orderBy]);
    } else {
      c = isNaN(b[orderBy]) ? b[orderBy] : parseInt(b[orderBy]);
      d = isNaN(a[orderBy]) ? a[orderBy] : parseInt(a[orderBy]);
    }
    if (c === "NULL" || d === "NULL") {
      if (c === "NULL" && d !== "NULL") {
        return -1
      }
      else if (d === "NULL" && c !== "NULL") {
        return 1
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


  // const [page, setPage] = React.useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = (orderBy === property && order === 'asc');
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked && selected.length === 0) {
      const newSelected = totalData.map((n) => n.SR_NO);
      setSelected(newSelected);
      if (newSelected.length > 0) {
        var temp = [];
        newSelected.map((val) => {
          temp.push(totalData[val - 1]);
        });
        setSelData(temp);
      }
      return;
    }
    setSelected([]);
    setSelData([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    if (newSelected.length > 0) {
      var temp = [];
      newSelected.map((val) => {
        temp.push(totalData[val - 1]);
      });
      setSelData(temp);
    }
    else {
      setSelData([]);
    }
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const RulesLocationData = useSelector(
    (state) => state.RulesLocationReducers
  );

  useEffect(() => {

    if (RulesLocationData?.data?.rtvrldata
      && Array.isArray(RulesLocationData?.data?.rtvrldata)
    ) {
      setrtvrldata(RulesLocationData?.data?.rtvrldata);
      setLoading(false);
    }
  }, [RulesLocationData?.data]);


  // const [tabCheck, setTabCheck] = useState(false);

  const handleSelectInd = (val) => {
    // console.log("limData:", val);
    setTabCond(true);
    setRTabCond(true);
    setDisCond(val);
    setSwitchVal(val);
    // setLIMData([]);
    limData.splice(0, limData.length);
    setqtyCheckData([])
    // dispatch(getUPDATESELINDCREATERequest(selData));
    dispatch(getSWITCHTABFUNCRequest([{ "ALLOC_NO": allocNoData.ALLOC_NO, "UPDATE": selData, "TAB": val }]));
    if (val === 1) {
      setrtvrldata([])
      dispatch(getRTVRLDATARequest([allocNoData]));
    }
  }
  const switchTFunc = (val) => {
    setRTabCond(true);
    setDisCond(val);
    dispatch(getSWITCHTABFUNCRequest([allocNoData]));
  }

  console.log("Call third: ", OkRulesLocationCheck, rtvrldata.length, rtvrldata);

  const handleTabChange = (event, newValue) => {
    setValueSelIndCreate(selected)
    if (newValue !== "2") {
      setTab(newValue);
    }
    if (!OkRulesLocationCheck) {
      console.log("Call First Time", newValue, OkRulesLocationCheck);
      setTab(newValue);
    }
  }

  if (OkRulesLocationCheck && rtvrldata.length > 0 && disCond === 1) {
    setTab("2");
    setOkRulesLocationCheck(false);
  }

  const handleCloseAvailDialog = () => {
    setOpenAvailDialog(false);
  };


  const showAvailDialog = (e, values) => {
    setOpenAvailDialog(true);
    if (values) {
      dispatch(getALLOC_AVAIL_QTYRequest([{ DIFF_ID: values.DIFF_ID, ITEM: values.ITEM }]));
      dispatch(getALLOC_AVAIL_SEARCHRequest([{ DIFF_ID: values.DIFF_ID, ITEM: values.ITEM }]));
    }
  }

  if (availCheck) {
    let availQtyVal = 0;
    availQty.map((data) => {
      availQtyVal = availQtyVal + data.AVAILABLE_QTY;
    })
    setTotalAvailQty(availQtyVal);
    setAvailCheck(false);
  }

  // console.log("limData:1::: ", limData);
  const [calc_Tab, setCalc_Tab] = useState("6");
  const [calc_cond, setCalc_Cond] = useState(true);

  useEffect(() => {

    if ((CreateAllocationData?.data?.calcRes?.status) && calc_cond) {
      swal(
        CreateAllocationData?.data?.calcRes?.message
      );
      setCalc_Cond(false);
    }
  }, [CreateAllocationData?.data?.calcRes]);

  const Calc_func = () => {
    setCalc_Cond(true);
    dispatch(postCALCRequest([allocNoData]));
  }

  const MyTabScrollButton = withStyles(theme => ({
    root: {
      width: 50,
      overflow: 'hidden',
      transition: 'width 0.5s',
      '&.Mui-disabled': {
        width: 0,
      },
    },
  }))(TabScrollButton);

  return (
    <Box className={CreateAllocationClasses.maindiv}>
      <Box sx={{ paddingTop: "70px" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example"
              sx={{
                margin: "0px 0px 0px 10px",

              }}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              ScrollButtonComponent={MyTabScrollButton}
            // scrollButtons="auto"
            // scrollButtons={false}
            >

              <Tab label="CREATE ALLOCATION" value="1" sx={tabStyle} disabled={rTabCond}
              />
              <Tab label="RULES AND LOCATION" value="2" sx={tabStyle} disabled={selected.length > 0 ? disCond == 0 ? false : disCond == 1 ? false : true : true}
                onClick={() => {
                  handleSelectInd(1)
                }}
              />
              <Tab label="LIKE ITEM MAP" value="3" sx={tabStyle} disabled={selected.length > 0 ? disCond == 0 ? false : disCond == 2 ? false : true : true}
                onClick={() => {
                  handleSelectInd(2)
                }}
              />
              <Tab label="QUANITITY LIMITS" value="4" sx={tabStyle} disabled={isValidQtyLimits ? selected.length > 0 ? disCond == 0 ? false : disCond == 3 ? false : true : true : true}
                // onClick={() => { switchTFunc(3) }} />
                onClick={() => { handleSelectInd(3) }} />
              {/* <Tab label="SCHEDULE" value="5" sx={tabStyle} disabled={false} /> */}
              <Tab label="CALCULATE" value="1" sx={tabStyleCalc} activeSx={activeTabStyle} disabled={(selected.length === 0 && disCond == 0)}//theme={theme}
                onClick={() => {
                  // calc_Tab="1"
                  Calc_func()
                }}
              />
              {/* <Tab label="CALCULATE" value="5" sx={tabStyle} /> */}
              <Tab label="ALLOCATION DETAILS" value="5" sx={tabStyle} />
              <Tab label="WHAT IF SUMMARY" value="6" sx={tabStyle} />
              <Tab label="SIZE DETAILS" value="7" sx={tabStyle} />
              <Tab label="ALLOC DETAIL FOR PACK" value="8" sx={tabStyle} />
              <Tab label="ALLOC SUMMARY" value="9" sx={tabStyle} />
              {/* <Tab label="WHAT IF SUMMARY2" value="8" sx={tabStyle} /> */}
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ padding: '2px 20px 0px 10px' }}>
            <Grid >
              <Box
                display="inline-block"
                sx={{
                  backgroundColor: "",
                  width: "100%",
                  height: "auto",
                }}
              >
                <div sx={{ display: "flex", flexDirection: "column" }}>
                  <Grid id="top-row" container spacing={0} >
                    <div className={CreateAllocationClasses.course_box}>
                      {SearchHeader()}
                    </div>
                  </Grid>
                </div>
              </Box>
            </Grid>

            <Grid>
              <Box
                component="fieldset"
                display="inline-block"
                sx={{
                  backgroundColor: "",
                  width: "100%",
                  height: "auto",
                  marginTop: "5px",
                  borderRadius: 1,

                  boxShadow: 2, border: 0,
                  borderBottom: 3,
                  border: "1px solid lightgrey",
                }}
              >
                <div sx={{ display: "flex", flexDirection: "row" }}>
                  <Grid id="top-row" container spacing={0}>
                    <div className={CreateAllocationClasses.course_box}>
                      <Box
                        display="inline-block"
                        sx={{
                          backgroundColor: "",
                          width: "100%",
                          height: "auto"
                        }}
                      >
                        <div className={CreateAllocationClasses.grid_block}>
                          <Box
                            sx={{
                              backgroundColor: "",
                              height: "auto",
                              margin: "0rem 0rem",
                              width: "100%",
                              marginLeft: "",
                            }}
                          >
                            <List
                              component="nav"
                              size="small"
                              aria-label="comment"
                              sx={{
                                bgcolor: '',
                                width: "100%",
                                padding: "0px",
                                margin: "0px",
                              }}
                              MenuListProps={{
                                disablePadding: "true",
                              }}
                            >
                              <ListItem
                                button
                                id="lock-button"
                                aria-label="Criteria"
                                onClick={handleClickListItem}
                                onMouseOver={handleClickListItem}
                                onMouseDown={handleClose}
                                sx={{
                                  padding: "0px"
                                }}
                              >
                                <ListItemText
                                  primary={<Typography type="body2"
                                    style={{
                                      bgcolor: '',
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      position: "static",
                                      padding: "0px"
                                    }}
                                  >
                                    CRITERIA: {options[selectedIndex].value}</Typography>}

                                />
                              </ListItem>
                            </List>

                            <Menu
                              id="simple-menu"
                              className={CreateAllocationClasses.listdropdown}
                              anchorEl={anchorEl}
                              keepMounted
                              open={open}
                              onClose={handleClose}
                              onMouseLeave={handleClose}
                              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                              disableScrollLock={true}
                              PaperProps={{
                                style: {
                                  width: "auto",
                                  height: "auto",
                                  margin: "0rem 0.2rem",
                                  padding: "0px",
                                  marginTop: "-1px",
                                  // marginBottom:"0px"
                                  // border: "2px solid yellow",
                                }
                              }}
                              MenuListProps={{
                                disablePadding: "true",
                                'aria-labelledby': 'lock-button',
                                role: 'li  stbox',
                              }}

                            >
                              {options.map((option, index) => (
                                <MenuItem
                                  dense="true"
                                  sx={{
                                    backgroundColor: "",
                                    display: "inline-block",
                                    padding: "0px 0px 0px 0px",
                                    // border: "1px solid red",
                                    whiteSpace: "nowrap"
                                  }}
                                  value={option.value}
                                  key={option.value}
                                  selected={index === selectedIndex}
                                  onClick={(event) => handleMenuItemClick(event, index)}
                                  disabled={totalData.length > 0}
                                >
                                  <RadioGroup
                                    size="small"
                                    value={option.value}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    defaultValue={option.value}
                                    name="row-radio-buttons-group"
                                    sx={{
                                      backgroundColor: "white",
                                      padding: "0px",
                                      // border: "2px solid blue",
                                      whiteSpace: "nowrap"
                                    }}
                                  >
                                    <FormControlLabel
                                      value={searchHeaderData.ALLOC_CRITERIA}
                                      onClick={handleClickListItem}
                                      sx={{
                                        // border: "2px solid black",
                                        padding: "0px",
                                        paddingLeft: "5px",
                                        whiteSpace: "nowrap"
                                      }}
                                      control={
                                        <Radio size="small"
                                          sx={{
                                            // border:"1px solid orange",
                                            padding: "5px 0px 0px 10px"
                                          }}
                                          onClick={handleClickListItem}
                                          className={CreateAllocationClasses.formRadio} />
                                      }
                                      label={<Typography
                                        sx={{
                                          fontSize: "12px",
                                          //  padding: "0px",
                                          marginTop: "5px",
                                          fontWeight: "bold",
                                          // border: "2px solid green",
                                        }}
                                      >
                                        {option.value}
                                      </Typography>} />

                                  </RadioGroup>
                                </MenuItem>
                              ))}
                            </Menu>
                          </Box>
                        </div>

                        <div className={CreateAllocationClasses.course_list}>
                          {SearchCriteria()}
                        </div>
                      </Box>
                      <div className={CreateAllocationClasses.course_list}>
                        {SearchButtonGrid()}
                      </div>
                    </div>
                  </Grid>
                </div>
              </Box>
            </Grid>

            <Grid>
              <Box
                display="inline-block"
                sx={{
                  backgroundColor: "",
                  marginTop: "5px",
                  width: "100%",
                  height: "auto",
                  borderRadius: 1,

                  boxShadow: 2, border: 0,
                  borderBottom: 3,
                  border: "1px solid lightgrey",
                }}
              >
                <div sx={{ display: "flex", flexDirection: "row" }}>
                  <Grid id="top-row" container spacing={0}>
                    <Box
                      sx={{
                        backgroundColor: "",
                        width: "100%",
                        height: "auto",
                        margin: "0px 0px 5px 0px"
                      }}
                    >
                      <Paper sx={{ width: '100%', mb: 0 }}>
                        <TableContainer style={{ maxHeight: 380, borderRadius: '7px' }} className={CreateAllocationClasses.TitleHead}>
                          <Table
                            aria-labelledby="tableTitle"
                          >
                            <EnhancedTableHead
                              numSelected={selected.length}
                              order={order}
                              orderBy={orderBy}
                              onSelectAllClick={handleSelectAllClick}
                              onRequestSort={handleRequestSort}
                              rowCount={totalData.length}
                            />
                            <TableBody >
                              {totalData.length > 0 ?
                                stableSort(totalData, getComparator(order, orderBy))
                                  .map((row, index) => {
                                    const isItemSelected = isSelected(row?.SR_NO);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                      <StyledTableRow
                                        align="left"
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row?.SR_NO}
                                        selected={isItemSelected}
                                      >
                                        <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                          <Checkbox
                                            color="primary"
                                            size="small"
                                            onClick={(event) => [handleClick(event, row?.SR_NO)]}
                                            checked={isItemSelected}
                                            // inputProps={{
                                            //   'aria-labelledby': labelId,
                                            // }}
                                            sx={{ padding: "0px", textAlign: "center", }}
                                          />
                                        </TableCell>

                                        <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.LOC === "NULL" ? null : row.LOC}
                                        </TableCell>

                                        <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onClick={(event) => showAvailDialog(event, row)}>
                                          {row.ITEM === "NULL" ? null : row.ITEM}
                                        </TableCell>

                                        <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }} >
                                          <Box
                                            display="flex"
                                            justifyContent="space-around"
                                          >
                                            <InputLabel
                                              sx={{
                                                paddingTop: "3px",
                                                fontSize: "12px",
                                                fontFamily: "system-ui",
                                                color: "rgb(10, 10, 10)",
                                                paddingLeft: "0px",
                                                paddingRight: "0px",
                                              }}
                                            >
                                              {String(row.ITEM_DESC).length > 0 && String(row.ITEM_DESC).length < 5 ?
                                                row.ITEM_DESC === "NULL" ? null : row.ITEM_DESC
                                                : String(row.ITEM_DESC).substring(0, 10) + "..."}
                                            </InputLabel>

                                            <Button sx={{
                                              backgroundColor: "",
                                              '&:hover': {
                                                backgroundColor: "",
                                              },
                                              border: 0,
                                              color: "CadetBlue",
                                            }}
                                              style={{
                                                maxWidth: '0px', minWidth: '4px', justifyContent: "flex-start", paddingLeft: "0px", paddingRight: "0px"
                                              }}
                                              size='small'
                                              className={CreateAllocationClasses.textField}
                                              onClick={() => {
                                                swal(
                                                  <div
                                                    className={CreateAllocationClasses.Desc_column}
                                                  >
                                                    {row.ITEM_DESC}
                                                  </div>
                                                )
                                              }}
                                              startIcon={<InfoIcon size="small" sx={{ padding: "0px" }} />}
                                            >
                                            </Button>
                                          </Box>
                                        </TableCell>

                                        <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.DIFF_ID === "NULL" ? null : row.DIFF_ID}
                                        </TableCell>

                                        <TableCell
                                          align="left"
                                          sx={{ padding: "0px", textAlign: "left", align: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.VPN === "NULL" ? null : row.VPN}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HIER1 === "NULL" ? null : row.HIER1}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HIER2 === "NULL" ? null : row.HIER2}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HIER3 === "NULL" ? null : row.HIER3}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {(row.AVAIL_QTY === "NULL" || row.AVAIL_QTY < 0) ? "0" : row.AVAIL_QTY}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {(row.INACTIVE_QTY === "NULL" || row.INACTIVE_QTY < 0) ? "0" : row.INACTIVE_QTY}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.REF_1 === "NULL" ? null : row.REF_1}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.ALLOC_CRITERIA === "NULL" ? null : row.ALLOC_CRITERIA}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.PO_TYPE === "NULL" ? null : row.PO_TYPE}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.INVENT_IND === "NULL" ? null : row.INVENT_IND}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.SOM_TYPE === "NULL" ? null : row.SOM_TYPE}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.SOM_QTY === "NULL" ? null : row.SOM_QTY}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HOLDBACK_QTY === "NULL" ? null : row.HOLDBACK_QTY}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.ERR_IND === "NULL" ? null : row.ERR_IND}
                                        </TableCell>

                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                          onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.ERR_MESSAGE === "NULL" ? null : row.ERR_MESSAGE}
                                        </TableCell>

                                      </StyledTableRow >
                                    );
                                  })
                                : null}

                              {totalData.length < 12 ?
                                [...Array(12 - (totalData.length)).keys()].map(val => (
                                  <StyledTableRow >
                                    <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                      <Checkbox sx={{ padding: "3px 0px 3px 0px" }} color="primary" size="small" disabled={true} />
                                    </TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                  </StyledTableRow>
                                )) : false}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                      {totalData.length > 0 ? <EnhancedTableToolbar numSelected={totalData.length} /> : null}
                    </Box>
                  </Grid>
                </div>
              </Box>
            </Grid>
          </TabPanel>

          <TabPanel value="2" sx={{ padding: '2px 20px 0px 5px' }} >
            <RulesAndLocation
              allocNoData={allocNoData}
              tab={tab}
              setTab={setTab}
              setIsValidQtyLimits={setIsValidQtyLimits}
              setRtvCond={setRtvCond}
              setRTabCond={setRTabCond}
              setDisCond={setDisCond}
              rtvrldata={rtvrldata}
              setrtvrldata={setrtvrldata}
              setOkRulesLocationCheck={setOkRulesLocationCheck}
            />
          </TabPanel>

          <TabPanel value="3" sx={{ padding: '2px 20px 0px 5px' }}>
            {limData.length > 0 ?
              <LikeItemMap
                allocNoData={allocNoData}
                tab={tab}
                setTab={setTab}
                setRTabCond={setRTabCond}
                setDisCond={setDisCond}
                limData={limData}
              /> : null}
          </TabPanel>

          <TabPanel value="4" sx={{ padding: '2px 20px 0px 10px' }}>
            {qtyCheckData.status === 201 ?
              <QuantityLimits
                allocNoData={allocNoData}
                tab={tab}
                setTab={setTab}
                setRTabCond={setRTabCond}
                setDisCond={setDisCond}
                limData={limData}
              />
              : null}
          </TabPanel>

          <TabPanel value="5" sx={{ padding: '12px 20px 0px 10px' }}>
            <AllocDetails
            />
          </TabPanel>

          <TabPanel value="6" sx={{ padding: '12px 20px 0px 10px' }}>
            <WhatIFSummary
            />
          </TabPanel>

          <TabPanel value="7" sx={{ padding: '12px 20px 0px 10px' }}>
            <SizeDetails
            />
          </TabPanel>

          <TabPanel value="8" sx={{ padding: '12px 20px 0px 10px' }}>
            <AllocDetailsPack
            />
          </TabPanel>

          <TabPanel value="9" sx={{ padding: '12px 20px 0px 10px' }}>
            <AllocSummary
            />
          </TabPanel>
        </TabContext>
      </Box>


      <div>
        <BootstrapDialog
          onClose={handleCloseAvailDialog}
          aria-labelledby="customized-dialog-title"
          open={openAvailDialog}
          fullWidth={true}
          maxWidth="md"
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseAvailDialog}>
            Available quantity details by size
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Card >
              <CardContent>
                <Grid container spacing={1}>
                  <div>{SearchAvailQty()}</div>
                </Grid>
              </CardContent>
            </Card>

            <br></br>

            <Card >
              <CardContent sx={{ maxHeight: '200px', overflowY: 'scroll' }}>
                <TableContainer style={{ maxHeight: 300 }} className={CreateAllocationClasses.TitleHead}>
                  <Table
                    aria-labelledby="tableTitle"
                  >
                    <TableHead className={CreateAllocationClasses.TitleHead}>
                      <StyledTableRow >
                        <StyledTableCell align="right">Item</StyledTableCell>
                        <StyledTableCell align="right">Diff1 ID</StyledTableCell>
                        <StyledTableCell align="right">Diff2 ID</StyledTableCell>
                        <StyledTableCell align="right">Diff3 ID</StyledTableCell>
                        <StyledTableCell align="right">Diff4 ID</StyledTableCell>
                        <StyledTableCell align="right">Avail Qty</StyledTableCell>
                        <StyledTableCell align="right">Inactive Qty</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody >
                      <StyledTableRow>
                        {availQty.map((row) => (
                          <>
                            <StyledTableCell align="right">{row.ITEM === "NULL" ? null : row.ITEM}</StyledTableCell>
                            <StyledTableCell align="right">{row.DIFF1 === "NULL" ? null : row.DIFF1}</StyledTableCell>
                            <StyledTableCell align="right">{row.DIFF2 === "NULL" ? null : row.DIFF2}</StyledTableCell>
                            <StyledTableCell align="right">{row.DIFF3 === "NULL" ? null : row.DIFF3}</StyledTableCell>
                            <StyledTableCell align="right">{row.DIFF4 === "NULL" ? null : row.DIFF4}</StyledTableCell>
                            <StyledTableCell align="right">{row.AVAILABLE_QTY === "NULL" ? null : row.AVAILABLE_QTY}</StyledTableCell>
                            <StyledTableCell align="right">{row.INACTIVE_QTY === "NULL" ? null : row.INACTIVE_QTY}</StyledTableCell>
                          </>
                        ))}
                      </StyledTableRow>
                      {availQty.length < 3 ?
                        [...Array(3 - (availQty.length)).keys()].map(val => (
                          <StyledTableRow >
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                          </StyledTableRow>
                        )) : false}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseAvailDialog}>
              Ok
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>

      <div>
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openItem}
          onClose={handleCloseItem}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].ITEM_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseItem} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openDept}
          onClose={handleCloseDept}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].HIER1_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDept} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openClass}
          onClose={handleCloseClass}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].HIER2_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseClass} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openSubclass}
          onClose={handleCloseSubclass}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].HIER3_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseSubclass} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openDiffID}
          onClose={handleCloseDiffID}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].DIFF_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDiffID} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openWH}
          onClose={handleCloseWH}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].WH_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseWH} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default CreateAllocation;