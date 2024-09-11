import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import { makeStyles, withStyles, styled } from "@mui/styles";
import { Table, TableBody, TableContainer, TableCell, Paper, TableRow, TableHead, tableCellClasses } from "@mui/material";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import InputLabel from '@mui/material/InputLabel';
import RefreshIcon from '@mui/icons-material/Refresh';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import InfoIcon from '@mui/icons-material/Info';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import PolylineIcon from '@mui/icons-material/Polyline';
import DetailsIcon from '@mui/icons-material/Details';
import { width } from '@mui/system';
import {
  getHIERRequest,
  getHIER2Request,
  getHIER3Request,
  getUDARequest,
  getITEM_LIST_HEADRequest,
  getITEMPARENTRequest,
  getDIFFRequest,
  getSKURequest,
} from "../../Redux/Action/createAllocation";
import { getALLOCHEADDETAILSRequest, getALLOCNODETAILSRequest } from "../../Redux/Action/quantityLimits"
import { getAllocItemsRequest, postLIkeInsertRequest, postMapItemsRequest, postDelMappedRequest, postNOOFSKUSRequest } from "../../Redux/Action/likeItemMap"
import { useDispatch, useSelector } from "react-redux";
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import CreateAllocation from '../CreateScreen';
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from 'react-draggable';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AnimationIcon from '@mui/icons-material/Animation';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from "@mui/material/Drawer";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import TablePagination from '@mui/material/TablePagination';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import RestartAltIcon from "@mui/icons-material/RestartAlt";

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

const animatedComponents = makeAnimated();

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  root: {
    height: "35px",
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const StyledTableRowMap = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root': {
    height: '25px', // adjust the height to your desired value
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const styleSelect = {
  control: base => ({
    ...base,
    width: "180px",
    fontSize: "13px",
    minHeight: "30px",
    border: "1px solid rgb(170, 170, 170)",
    // This line disable the blue border
    // borderRadius:"0",
    // backgroundColor:"#f0f0f0",
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    // '& input + fieldset': {
    //   // borderColor: 'gray',
    //   // borderRadius:"0",
    //   // boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    // },

  }
  )
  ,
  dropdownIndicator: (base) => ({
    ...base,
    paddingTop: 1,
    //paddingBottom: 0,

  }),
  clearIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    //paddingBottom: 0,
    color: 'rgb(90,90,90)',
  }),
  //inside select
  valueContainer: (provided) => ({
    ...provided,
    minHeight: '30px',
    height: '30px',
    paddingTop: '0px',
    paddingBottom: '0px',

  }),
  singleValue: (provided) => ({
    ...provided,
    // height: '10px',
    // paddingBottom: '0px',

  }),
  input: (provided) => ({
    ...provided,
    width: "100%",
    //height:"30px"

  }),
  option: provided => ({
    ...provided,
    // color: 'blue',
    fontSize: "12px",

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

const useStyles = makeStyles({
  // table: {
  //   minWidth: 650
  // },
  maindiv: {
    position: "relative",
    width: "calc(90vw - 10px)",
    '& table': {
      '& tr': {
        '& td:nth-child(28)': {
          display: 'none'
        },
        '& td:nth-child(29)': {
          display: 'none'
        },
        '& td:nth-child(30)': {
          display: 'none'
        }
      }
    }
  }, boxDiv: {
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

  textField: {
    marginRight: "10px !important",
  },
  float_container: {
    display: "inline-block",
    margin: "0rem 0.3rem",
    // padding: "1rem 1rem",
    // text-align: center;
  },
  container_child: {
    float: "left"
  },
  multiselectfield: {
    display: "inline-block",
    // border: "1px solid red",
    margin: "0rem",
    padding: "0rem 0rem",
    verticalAlign: "middle",
  },
  course_box: {
    width: "100%",
  },
  inputFielddate: {
    width: "200px",
    // margin:"10px 0px 0px 0px",
    height: 38,
    border: 0,
    // backgroundColor:"#f0f0f0",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  }, inputField: {
    // width: "200px",
    // // margin:"10px 0px 0px 0px",
    // height: 38,
    // //backgroundColor:"#f0f0f0",
    // '& input + fieldset': {
    //   // borderColor: 'gray',
    //   borderRadius: "5px",
    //   boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    // },
    // width: "250px",
    height: "30px",
    // background: "rgb(255, 255, 255)",
    '& input + fieldset': {
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
      // borderColor: 'gray',
    },
  },
  textField: {
    marginRight: "10px !important",
  },
  grid_block: {
    display: "inline-block",
    // border: "1px solid red",
    padding: "0rem 0rem",
    verticalAlign: "middle",
  },
  TitleHead: {
    // height: "25px",
    position: "sticky",
    top: -1,
    // '&::-webkit-scrollbar': { width: '8px', height: "8px" },
    // '&::-webkit-scrollbar-thumb': { backgroundColor: '#bdbdbd', borderRadius: '4px', },
    // '&::-webkit-scrollbar-track': { backgroundColor: '#f5f5f5', borderRadius: '4px', },
  },
  TitleRow: {
    height: 20
  },
  grid_container: {
    display: "inline-block",
    margin: "0px 0px 0px 4px",
    padding: "0rem 0rem",
    // margin: "0.3rem",
  },
  grid_child1: {
    display: "inline-block",
    // border: "1px solid red",
    margin: "0px 0px 0px 0px",
    padding: "0rem 0rem",
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
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "lightgray",
    },
  }, header_child: {
    display: "inline-block",
    // border: "1px solid red",
    padding: "0rem 0.2rem",
    verticalAlign: "middle",
  },
});

const initialData = {
  HIER1: [],
  HIER2: [],
  HIER3: [],
  UDA: [],
  UDA_VALUE: [],
  ITEM_LIST_NO: "",
  SIZE_PROFILE: "N",
  ITEM_PARENT: "",
  DIFF_ID: "",
  SKU: "",
  SKU_DESC: "",
  SKU_DIFF_ID: "",
  NO_OF_SKUS: "",
  WEIGHT: 100,
  MAP_SIZE_PROFILE: false,
}
const styleSelect4 = {
  control: base => ({ ...base, fontSize: "12px", width: "70px", minHeight: "20px", textAlign: "center", borderRadius: "0px", border: 0, borderBottom: "1px solid gray" }),
  dropdownIndicator: (base) => ({ ...base, padding: 0, }),
  clearIndicator: (base) => ({ ...base, padding: 0, }),
  valueContainer: (provided) => ({ ...provided, height: '20px', padding: 0, }),
  singleValue: (provided) => ({ ...provided, }),
  input: (provided) => ({ ...provided, width: "100%", justifyContent: "left" }),
  option: provided => ({ ...provided, fontSize: "12px", }),
  menu: base => ({ ...base, borderRadius: 0, marginTop: 0, textAlign: "center", zIndex: 5 }),
  menuList: base => ({ ...base, padding: 0, textAlign: "center", zIndex: 5 }),
  placeholder: (provided) => ({
    ...provided,
    color: '#A9A9A9', // Set the desired color for the placeholder text
    fontWeight: 'normal',
  }),
};
const MapProfile = [
  { id: "Y" },
  { id: "N" },
]
const LikeItemMap = ({ allocNoData, tab, setTab, setRTabCond, setDisCond, limData, setLIMData, ApproveFreeseCheck, setHeaderCheck,
  setOpenDialog, setDialogData, }) => {
  const [alcLoad, setAlcLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  //like item criteria Webservice data
  const [hier1Data, setHier1Data] = useState([]);
  const [hier2Data, setHier2Data] = useState([]);
  const [hier3Data, setHier3Data] = useState([]);
  const [udaData, setUdaData] = useState([]);
  const [itemListHeadData, setItemListHeadData] = useState([]);
  const [itemParentData, setItemParentData] = useState([]);
  const [diffData, setDIffData] = useState([]);
  const [skuData, setSkuData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [allocID, setAllocID] = useState([]);
  //const [allocHDtl, setAllocHDtl] = useState([]);
  const [allocHDetails, setAllocHDtl] = useState([])
  const [mapTableData, setMapTableData] = useState([]);
  const [delTableData, setDelTableData] = useState([]);
  const [allocNo, setAllocNo] = useState({})
  const [dcheck, setDCheck] = useState(false);
  const alloc_Level = "T"
  // const alloc_no="12345678"
  //filtered uda data
  const [filterUDAValue, setFilterUDAValue] = useState([]);

  //Dropdown input
  const [valHIER1, setValHIER1] = useState([]);
  const [valHIER2, setValHIER2] = useState([]);
  const [valHIER3, setValHIER3] = useState([]);
  const [valUDA, setValUDA] = useState([]);
  const [valUDAValue, setValUDAValue] = useState([]);
  const [valItemList, setValItemList] = useState([]);
  const [valSizeProf, setValSP] = useState("")
  const [valItemPar, setValItempar] = useState([]);
  const [valDiff, setValDiff] = useState([]);
  const [valSKU, setValSKU] = useState([]);
  const [mapSizeprof, setMapSP] = useState(false);
  const [mapData, setMapData] = useState(initialData);
  const [] = useState([]);
  // validation
  const [checkAlloc, setCheckAlloc] = useState(false);
  const [checkClass, setCheckClass] = useState(false);
  const [checkSubClass, setCheckSubClass] = useState(false);
  //table CheckBox
  const [selected, setSelected] = useState([{}]);
  const [selectedMap, setSelectedMap] = useState([{}]);
  const AllocationData = useSelector(
    (state) => state.CreateAllocationReducers
  );
  //Filtered Data
  const [fltrH2, setFltrH2] = useState([]);
  const [fltrH3, setFltrH3] = useState([]);
  const [fltrSku, setFltrSku] = useState([]);
  const [fltrDiff, setFltrDiff] = useState([]);
  const [fltrUDA, setFltrUDA] = useState([]);
  const [fltrITP, setFltrITP] = useState([]);
  const [udaVCheck, setUDAVCheck] = useState(false);
  //sort
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [orderM, setOrderM] = React.useState('asc');
  const [orderMBy, setOrderMBy] = React.useState('');
  // Navigate to Create screen condition
  const [navCond, setNavCond] = useState(false);
  const [onOkClose, setOnOkClose] = useState(false);

  const [callCond, setCallCond] = useState(false);
  const [cancelSwitch, setCancelSwitch] = useState(false);

  // Error popup message
  const [openDialogLIM, setOpenDialogLIM] = useState(false);
  const [DialogDataLIM, setDialogDataLIM] = useState("")
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const LikeItem = useStyles();
  // Manage columns popup in Table Grid
  const [openDialogManage, setOpenDialogManage] = useState(false);


  const [isSHovered, setIsHovered] = useState(false);
  const [isSHovered1, setIsHovered1] = useState(false);

  const handleSEnter = () => { setIsHovered(true); };
  const handleSEnter1 = () => { setIsHovered1(true); };

  const handleSLeave = () => { setIsHovered(false); };
  const handleSLeave1 = () => { setIsHovered1(false); };

  const [isScreenBigger, setIsScreenBigger] = useState(window.innerWidth < 1500 ? false : true);
  const [inputVal, setInputVal] = useState({});
  const [inputValMap, setInputValMap] = useState({});
  // ALLOC GRID
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [page, setPage] = React.useState(0);
  const [currentPageData, setcurrentPageData] = useState([]);
  const [currentPageRows, setcurrentPageRows] = useState([]);
  const [allPageSelected, setAllPageSelected] = useState([]);
  const startIndex = page * rowsPerPage;

  //MAPPED GRID
  const [rowsPerPageMap, setRowsPerPageMap] = React.useState(30);
  const [pageMap, setPageMap] = React.useState(0);
  const [currentPageDataMap, setcurrentPageDataMap] = useState([]);
  const [currentPageRowsMap, setcurrentPageRowsMap] = useState([]);
  const [allPageSelectedMap, setAllPageSelectedMap] = useState([]);
  const startIndexMap = pageMap * rowsPerPageMap;
  //  if (!global.crypto && !global.msCrypto) {
  //   global.crypto = require("crypto");
  // }
  // const timers = require('timers');

  const serializedata = (datatable) => {
    let newTabledata = [];
    let count = 1;
    if (datatable.length > 0) {
      datatable.map(item => {
        item['SR_NO'] = count;
        const reorder = {
          'ALLOC_NO': "",
          'ITEM': "",
          'ITEM_DESC': "",
          'DIFF_ID': "",
          'DIFFS': "",
          'NO_OF_SIZES': "",
          'SEL_IND': "",
        }
        count++;

        let test = Object.assign(reorder, item);
        newTabledata.push(test);
      })
      // setTabledataclone(newTabledata)
      return newTabledata;
    }
  }
  const serializedataMap = (datatable) => {
    let newTabledata = [];
    let count = 1;
    if (datatable.length > 0) {
      datatable.map(item => {
        item['SR_NO'] = count;
        const reorder = {
          'ALLOC_NO': "",
          'ITEM': "",
          'ITEM_DESC': "",
          'DIFF_ID': "",
          'DIFFS': "",
          'NO_OF_SIZES': "",
          'SEL_IND': "",
        }
        count++;

        let test = Object.assign(reorder, item);
        newTabledata.push(test);
      })
      // setTabledataclone(newTabledata)
      return newTabledata;
    }
  }


  /* 
                     #######################################
                     ####### UNIQUE DATA CONVERSION ########
                     #######################################
   */
  //useEffect(() => {
  let UniqDept =
    hier1Data.length > 0
      ? [...new Map(hier1Data.map((item) => [item["HIER1"], item])).values()]
      : [];

  let UniqClass =
    hier2Data.length > 0
      ? [...new Map(hier2Data.map((item) => [item["HIER2"], item])).values()]
      : [];
  let UniqSubClass =
    hier3Data.length > 0
      ? [...new Map(hier3Data.map((item) => [item["HIER3"], item])).values()]
      : [];

  let UniqUDA =
    udaData.length > 0
      ? [...new Map(udaData.map((item) => [item["UDA"], item])).values()]
      : [];

  let UniqItemParent =
    itemParentData.length > 0
      ? [...new Map(itemParentData.map((item) => [item["ITEM_PARENT"], item])).values()]
      : [];
  let UniqDiff =
    diffData.length > 0
      ? [...new Map(diffData.map((item) => [item["DIFF_ID"], item])).values()]
      : [];
  let UniqSKU =
    skuData.length > 0
      ? [...new Map(skuData.map((item) => [item["SKU"], item])).values()]
      : [];
  //});


  //Table Header for Grids
  const alloc_head1 = ["ITEM", "ITEM_DESC", "DIFF_ID", "#OF_SKUS"]
  const alloc_head = [
    { id: "ITEM", label: allocHDetails.length > 0 && allocHDetails[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku" },
    { id: "ITEM_DESC", label: "Description" },
    { id: "DIFF_ID", label: "Variant" },
    { id: "NO_OF_SIZES", label: "No" + "\u00A0" + "of" + "\u00A0" + "Sku's" }
  ]
  const map_head1 = ["ITEM", "ITEM_DESC", "DIFF_ID", "LIKE_ITEM", "LIKE_ITEM_DESC", "LIKE_ITEM_DIFF_ID"]
  const map_head =
    [
      { id: "ITEM", label: allocHDetails.length > 0 && allocHDetails[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku" },
      { id: "ITEM_DESC", label: "Description" },
      { id: "DIFF_ID", label: "Variant" },
      { id: "LIKE_ITEM", label: "Like" + "\u00A0" + "Item" },
      { id: "LIKE_ITEM_DESC", label: "Like" + "\u00A0" + "Item" + "\u00A0" + "Desc" },
      { id: "LIKE_ITEM_DIFF_ID", label: "Like" + "\u00A0" + "Item" + "\u00A0" + "Variant" },
      { id: "WEIGHT%", label: "Weight%" },
      allocHDetails.length > 0 && allocHDetails[0].ALLOC_LEVEL_CODE === 'D' ? { id: "MAP_SIZE_PR", label: "Map" + "\u00A0" + "Size" + "\u00A0" + "Pr" } : {}
    ] //:
  // [
  //   { id: "ITEM", label: "Sku" },
  //   { id: "ITEM_DESC", label: "Description" },
  //   { id: "DIFF_ID", label: "Variant" },
  //   { id: "LIKE_ITEM", label: "Like" + "\u00A0" + "Item" },
  //   { id: "LIKE_ITEM_DESC", label: "Like" + "\u00A0" + "Item" + "\u00A0" + "Desc" },
  //   { id: "LIKE_ITEM_DIFF_ID", label: "Like" + "\u00A0" + "Item" + "\u00A0" + "Variant" },
  //   { id: "WEIGHT%", label: "Weight%" },
  // ]

  useEffect(() => {
    document.title = 'Like Item Mapping';
  }, []);

  const dispatch = useDispatch();
  /* 
                      ############################
                      ####  INITIAL API CALL  ####
                      ############################
  */
  useEffect(() => {
    if (limData.length > 0 && !AllocationData?.data?.Data && (tableData.length === 0 && mapTableData.length === 0)) {
      if (limData[0].length > 0) {
        const sortData = stableSort((limData[0]), getComparator('desc', 'ITEM'))
        setTableData(serializedata(sortData));
        setSelected([{}])

        const temp = serializedata(sortData).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        setSelectedRow(1);
      } else {
        setTableData([]);
        setcurrentPageData([]);
        setcurrentPageRows([]);
      }
      if (limData[1].length > 0) {
        const sortData = stableSort((limData[1]), getComparator('desc', 'ITEM'));
        setMapTableData(serializedataMap(sortData));
        const temp = serializedata(sortData).slice(pageMap * rowsPerPageMap, pageMap * rowsPerPageMap + rowsPerPageMap)
          .filter(row => row !== undefined);
        setcurrentPageDataMap(temp);
        setcurrentPageRowsMap(temp);
        setSelectedMap([{}]);
        setSelectedMapRow(1);
      } else {
        setcurrentPageDataMap([]);
        setcurrentPageRowsMap([]);
        setMapTableData([]);
      }
    }
  });

  useEffect(() => {
    dispatch(getALLOCHEADDETAILSRequest([allocNoData]));
    if (!alcLoad && Object.keys(allocNo).length === 0 && limData.length > 0 && !AllocationData?.data?.Data && allocHDetails.length === 0) {
      setLoading(true);

      if (hier1Data.length === 0 && limData.length > 0) {
        dispatch(getHIERRequest([{}]));
      }
      if (itemListHeadData.length === 0 && limData.length > 0) {
        dispatch(getITEM_LIST_HEADRequest([{}]));
      }
    }
  }, []);
  /* 
                     ########################################
                     #### OK BUTTON MESSAGE & TAB CHANGE ####
                     ########################################
 */
  useEffect(() => {
    if (AllocationData?.data?.insertLikeItemData?.status === 200 && onOkClose) {
      setOpenDialog(true);
      setDialogData("Like Item Mapping: " + String(AllocationData?.data?.insertLikeItemData?.message));
      //setTimeout( 2000);
      setTab('1');
      setRTabCond(false);
      setDisCond(0);
      setOnOkClose(false);
      setAlcLoad(false);
      setLoading(false);
    } else if (AllocationData?.data?.insertLikeItemData?.status === 500 && onOkClose) {
      setAlcLoad(false);
      setLoading(false);
      setTab('1');
      setRTabCond(false);
      setDisCond(0);
      setOnOkClose(false);

      setTableData([]);
      setMapTableData([]);
      setSelected([{}]);
      setSelectedMap([{}]);
      setOpenDialog(true);
      setDialogData(String(AllocationData?.data?.insertLikeItemData?.message));
      AllocationData.data.insertLikeItemData.status = 0
      document.title = 'Create Allocation';


      //Data([]);
    }
    if (AllocationData?.data?.nSkus && Array.isArray(AllocationData?.data?.nSkus)) {
      setLoading(false);
      if ((AllocationData?.data?.nSkus).length > 0) {
        setMapData((prev) => {
          return {
            ...prev,
            NO_OF_SKUS: (AllocationData?.data?.nSkus)[1],
          };
        });
      } else {
        setOpenDialogLIM(true);
        setDialogDataLIM("NO OF SKUS : NO DATA FOUND");
      }
      //AllocationData.data.nSkus = ""
    }
    if (AllocationData?.data?.Data?.status === 500) {
      setLoading(false)
      AllocationData.data.Data.status = 0
      setOpenDialogLIM(true);
      if (AllocationData?.data?.Data?.message === "NoneType' object has no attribute 'cursor'") {
        setDialogDataLIM("CONNECTION LOST.");
      } else {
        setDialogDataLIM(AllocationData?.data?.Data?.message);
      }
    }
    if (AllocationData?.data?.nSkus?.status === 500) {
      setLoading(false)
      AllocationData.data.nSkus.status = 0
      setOpenDialogLIM(true);
      if (AllocationData?.data?.nSkus?.message === "NoneType' object has no attribute 'cursor'") {
        setDialogDataLIM("CONNECTION LOST.");
      } else {
        setDialogDataLIM(AllocationData?.data?.nSkus?.message);
      }
    }
    //AllocationData.data.nSkus = ""


  }, [AllocationData?.data]);
  /* 
                     #######################################
                     #### DATA EXTRACTION FROM API CALL ####
                     #######################################
 */
  useEffect(() => {

    if (AllocationData?.data?.hierData && Array.isArray(AllocationData?.data?.hierData)) {
      setHier1Data(AllocationData?.data?.hierData);
      // setLoading(false);
      setCallCond(true);
    } else if (AllocationData?.data?.hier2Data && Array.isArray(AllocationData?.data?.hier2Data)) {
      setHier2Data(AllocationData?.data?.hier2Data);
      // setLoading(false);
    } else if (AllocationData?.data?.hier3Data && Array.isArray(AllocationData?.data?.hier3Data)) {
      setHier3Data(AllocationData?.data?.hier3Data);
      // setLoading(false);
    } else if (AllocationData?.data?.udaData && Array.isArray(AllocationData?.data?.udaData)) {
      setUdaData(AllocationData?.data?.udaData);
      if (mapData.HIER1.length > 1) {
        setUDAVCheck(true);
      }
      // setLoading(false);
    } else if (AllocationData?.data?.itemListHeadData && Array.isArray(AllocationData?.data?.itemListHeadData)) {
      setItemListHeadData(AllocationData?.data?.itemListHeadData);
      setCallCond(true);
      // setLoading(false);
    } else if (AllocationData?.data?.itemParentData && Array.isArray(AllocationData?.data?.itemParentData)) {
      setItemParentData(AllocationData?.data?.itemParentData);
      // setLoading(false);
    } else if (AllocationData?.data?.diffData && Array.isArray(AllocationData?.data?.diffData)) {
      setDIffData(AllocationData?.data?.diffData);
      // setLoading(false);
    } else if (AllocationData?.data?.skuData && Array.isArray(AllocationData?.data?.skuData)) {
      setSkuData(AllocationData?.data?.skuData);
      // setLoading(false);
    } /*
    else if (AllocationData?.data?.likeItemTableData && Array.isArray(AllocationData?.data?.likeItemTableData) && delTableData.length === 0 && tableData.length === 0) {
      setTableData(AllocationData?.data?.likeItemTableData[0]);
      setMapTableData(AllocationData?.data?.likeItemTableData[1])
      setLoading(false);
    }*/
    else if (AllocationData?.data?.likeItemTableData && Array.isArray(AllocationData?.data?.likeItemTableData) && (tableData.length === 0 && mapTableData.length === 0)) {
      if (((AllocationData?.data?.likeItemTableData)[0]).length > 0) {
        const sortData = stableSort(((AllocationData?.data?.likeItemTableData)[0]), getComparator('desc', 'ITEM'))
        setTableData(serializedata(sortData));
        setSelected([{}])

        const temp = serializedata(sortData).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        setSelectedRow(1);

      } else {
        setTableData([]);
        setcurrentPageData([]);
        setcurrentPageRows([]);
      }
      if (((AllocationData?.data?.likeItemTableData)[1]).length > 0) {
        const sortData = stableSort(((AllocationData?.data?.likeItemTableData)[1]), getComparator('desc', 'ITEM'));
        setMapTableData(serializedataMap(sortData));
        const temp = serializedata(sortData).slice(pageMap * rowsPerPageMap, pageMap * rowsPerPageMap + rowsPerPageMap)
          .filter(row => row !== undefined);
        setcurrentPageDataMap(temp);
        setcurrentPageRowsMap(temp);
        setSelectedMap([{}]);
        setSelectedMapRow(1);
      } else {
        setMapTableData([]);
        setcurrentPageDataMap([]);
        setcurrentPageRowsMap([]);
      }
      setLoading(false);
      AllocationData.data.likeItemTableData = ""
    }
    else if (AllocationData?.data?.Data && Array.isArray(AllocationData?.data?.Data)) {
      if (((AllocationData?.data?.Data)[0]).length > 0) {
        const sortData = stableSort(((AllocationData?.data?.Data)[0]), getComparator('desc', 'ITEM'))
        setTableData(serializedata(sortData));
        setSelected([{}])

        const temp = serializedata(sortData).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
        setcurrentPageData(temp);
        setcurrentPageRows(temp);
        setSelectedRow(1);

      } else {
        setTableData([]);
        setcurrentPageData([]);
        setcurrentPageRows([]);
      }
      if (((AllocationData?.data?.Data)[1]).length > 0) {
        const sortData = stableSort(((AllocationData?.data?.Data)[1]), getComparator('desc', 'ITEM'));
        setMapTableData(serializedataMap(sortData));
        const temp = serializedata(sortData).slice(pageMap * rowsPerPageMap, pageMap * rowsPerPageMap + rowsPerPageMap)
          .filter(row => row !== undefined);
        setcurrentPageDataMap(temp);
        setcurrentPageRowsMap(temp);
        setSelectedMap([{}]);
        setSelectedMapRow(1);
      } else {
        setcurrentPageDataMap([]);
        setcurrentPageRowsMap([]);
        setMapTableData([]);
      }
      setLoading(false);
      AllocationData.data.Data = ""
    }
    else if (AllocationData?.data?.allocIDs && Array.isArray(AllocationData?.data?.allocIDs) && delTableData.length === 0 && tableData.length === 0) {
      setAllocID(AllocationData?.data?.allocIDs);
      setLoading(false);
    }
    else if (AllocationData?.data?.allocHDetails && Array.isArray(AllocationData?.data?.allocHDetails) && allocHDetails.length === 0) {
      setAllocHDtl(AllocationData?.data?.allocHDetails);
      setAllocNo({ ALLOCATION_ID: allocNoData.ALLOC_NO })
      setLoading(false);
      setAlcLoad(true);

    }



  });
  /* 
                      #######################################
                      ##### FILTERING DATA IN CRITERIA ######
                      #######################################
  */
  // FILTERING
  const filteringData = (data, f_key, name) => {
    if (name === "UDAV") {
      const temp_d = udaData.filter(row => (f_key[Object.keys(f_key)[0]].includes(row[Object.keys(f_key)[0]])));
      const uda_v = temp_d.filter(row => (mapData.UDA.includes(row.UDA)));

      const filterUDAValue = temp_d.filter((item) => {
        return (mapData.UDA).some((val) => {
          return item.UDA === val;
        });
      });
      setFilterUDAValue(fltrSort(filterUDAValue, "UDA_VALUE"));
      return
    }
    var fltrd_data = [];
    f_key[Object.keys(f_key)[0]].map((key) => {
      const temp_fdata = data.filter((row => row[Object.keys(f_key)[0]] === key))
      fltrd_data.push(...temp_fdata)
    });
    if (name == "HIER3") {

      setFltrH3(fltrSort(fltrd_data, "HIER3"));
    } else if (name == "ITEM_PARENT") {
      setFltrITP(fltrSort(fltrd_data, "ITEM_PARENT"));
      if (mapData.ITEM_PARENT.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });
        } else {
          setMapData((prev) => {
            return {
              ...prev,
              ITEM_PARENT: "",
            };
          });
        }
      }
    } else if (name == "DIFF_ID") {
      setFltrDiff(fltrSort(fltrd_data, "DIFF_ID"));

      if (mapData.DIFF_ID.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          var r_chk = 0
          fltrd_data.map((row) => {
            if (mapData.DIFF_ID === row.DIFF_ID) {
              r_chk = 1
              return
            }
          });
          if (r_chk === 0) {
            setMapData((prev) => {
              return {
                ...prev,
                DIFF_ID: "",
              };
            });
          }
        } else {
          setMapData((prev) => {
            return {
              ...prev,
              DIFF_ID: "",
            };
          });
        }
      }
    } else if (name == "SKU") {
      setFltrSku(fltrSort(fltrd_data, "SKU"));
      if (mapData.SKU.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });

        } else {
          setMapData((prev) => {
            return {
              ...prev,
              SKU: "",
            };
          });
        }
      }
    } else if (name == "UDA") {
      const filterUDAValue = fltrd_data.filter((item) => {
        return (mapData.UDA).some((val) => {
          return item.UDA === val;
        });
      });
      if (mapData.UDA_VALUE.length > 0) {
        const temp_UDAV = [...mapData.UDA_VALUE];
        [...Array(temp_UDAV.length).keys()].map(val => {
          const temp_check = filterUDAValue.filter(row => (row.UDA_VALUE === temp_UDAV[val]));
          if (temp_check.length === 0) {
            const index = mapData.UDA_VALUE.indexOf(temp_UDAV[val]);
            if (index > -1) {
              mapData.UDA_VALUE.splice(index, 1);
            }
          }
        });
      }
      setFilterUDAValue(fltrSort(filterUDAValue, "UDA_VALUE"));
      setFltrUDA(fltrSort(fltrd_data, "UDA"));
      if (mapData.UDA.length > 0) {
        var temp = []
        if (fltrd_data.length > 0) {
          fltrd_data.map((row) => { temp.push(row[name]) });
        } else {
          const filterUDAValue = (fltrUDA.length > 0 ? fltrUDA : udaData).filter((item) => {
            return (mapData.UDA).some((val) => {
              return item.UDA === val;
            });
          });
          setFilterUDAValue(fltrSort(filterUDAValue, "UDA_VALUE"));
          setMapData((prev) => {
            return {
              ...prev,
              UDA: [],
            };
          });
        }
      }
    }

  }
  // REVERSE FILTERING ON UNSELECT
  const Rev_fltr = (key, data, name, fltr_name, selectData) => {
    const temp_data = data.filter((row => row[name] === key))
    var data_list = []
    temp_data.map(row => data_list.push(row[fltr_name]))
    if (fltr_name === "UDA") {
      var udaV_list = [];
      temp_data.map(row => udaV_list.push(row["UDA_VALUE"]));
      const temp_UDAVal = [...mapData.UDA_VALUE];
      [...Array(temp_UDAVal.length).keys()].map(ind => {
        if (udaV_list.includes(temp_UDAVal[ind])) {
          const index = mapData.UDA_VALUE.indexOf(temp_UDAVal[ind]);

          if (index > -1) {
            mapData.UDA_VALUE.splice(index, 1);
          }
        }
      });
      const fltredUDAVal = valUDAValue.filter(row => (!temp_UDAVal.includes(row.UDA_VALUE)))
      setValUDAValue(fltredUDAVal);
    }
    // if (temp_name !=""){ name=temp_name}
    if (mapData[fltr_name].length > 0 && mapData[name].length > 1) {
      var index_list = []
      mapData[fltr_name].map(
        val => {

          if (data_list.includes(val)) {
            const index = mapData[fltr_name].indexOf(val);
            index_list.push(mapData[fltr_name][index])
          }
        }
      )
      if (index_list.length > 0) {
        for (let ind = 0; ind < index_list.length; ind++) {
          const index = mapData[fltr_name].indexOf(index_list[ind]);
          if (index > -1) {
            mapData[fltr_name].splice(index, 1);
          }
        }
      }
      const fltr_select = selectData.filter((row => !data_list.includes(row[fltr_name])))
      if (fltr_name === "HIER2") {
        setValHIER2(fltr_select);
      } else if (fltr_name === "HIER3") {
        setValHIER3(fltr_select);
      } else if (fltr_name === "ITEM_PARENT") {
        setValItempar(fltr_select);
      } else if (fltr_name === "DIFF_ID") {
        setValDiff(fltr_select);
      } else if (fltr_name === "SKU") {
        setValSKU(fltr_select);
      } else if (fltr_name === "UDA") {
        setValUDA(fltr_select);
      }
    } else {
      if (fltr_name === "HIER3") {
        setFltrH3([])
      } else if (fltr_name === "ITEM_PARENT") {
        setFltrITP([]);
      } else if (fltr_name === "SKU") {
        setFltrSku([]);
      } else if (fltr_name === "UDA") {
        setFltrUDA([]);
      } else if (fltr_name === "DIFF_ID") {
        setFltrDiff([]);
      }
    }
  }
  // REVERSE FILTERING FOR SINGLE SELECT 
  const Rev_Sngl_fltr = (key, data, name, fltr_name) => {
    const temp_data = data.filter((row => row[name] === key))
    var data_list = []
    temp_data.map(row => data_list.push(row[fltr_name]))
    //REVERSE FILTERING UDA_VALUE
    if (fltr_name === "UDA") {
      var udaV_list = [];
      temp_data.map(row => udaV_list.push(row["UDA_VALUE"]));
      const temp_UDAVal = mapData.UDA_VALUE;
      [...Array(temp_UDAVal.length).keys()].map(ind => {
        if (udaV_list.includes(temp_UDAVal[ind])) {
          const index = mapData.UDA_VALUE.indexOf(temp_UDAVal[ind]);
          if (index > -1) {
            mapData.UDA_VALUE.splice(index, 1);
          }
        }
      })
    }
    if (data_list.length > 0) {
      var unique_Dlist = data_list.filter((v, i, a) => a.indexOf(v) === i);
      if (data_list.includes(mapData[fltr_name])) {
        if (name === "HIER1") {
          setFltrDiff([]);
          setFltrITP([]);
          setFltrSku([]);
        }
        if (fltr_name === "SKU") {
          setMapData((prev) => {
            return {
              ...prev,
              SKU: "",
              SKU_DESC: "",
              SKU_DIFF_ID: "",
            };
          });
        } else if (fltr_name === "DIFF_ID") {
          setMapData((prev) => {
            return {
              ...prev,
              DIFF_ID: [],
            };
          });
        } else if (fltr_name === "ITEM_PARENT") {
          setMapData((prev) => {
            return {
              ...prev,
              ITEM_PARENT: "",
            };
          });
        }
      }
    }
  }
  // SORTING
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
  }

  /* 
                      #########################################
                      ### HANDLING CRITERIA INPUT SELECTION ###
                      #########################################
  */

  const selectedHIER1 = (event, value) => {
    let sel_HIER1 = [];
    let temp_Arr = []
    if (value.option) {
      valHIER1.push(value.option);
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER1.length; i++) {
        if (valHIER1[i]["HIER1"] === value.removedValue.HIER1) {
          index = i;
          break;
        }
      }
      // Reverse Filtering
      Rev_fltr(valHIER1[index].HIER1, hier2Data, "HIER1", "HIER2", valHIER2);
      Rev_fltr(valHIER1[index].HIER1, fltrH3.length > 0 ? fltrH3 : hier3Data, "HIER1", "HIER3", valHIER3);
      Rev_fltr(valHIER1[index].HIER1, fltrUDA.length > 0 ? fltrUDA : udaData, "HIER1", "UDA", valUDA);

      Rev_Sngl_fltr(valHIER1[index].HIER1, fltrDiff.length > 0 ? fltrDiff : diffData, "HIER1", "DIFF_ID");
      Rev_Sngl_fltr(valHIER1[index].HIER1, fltrITP.length > 0 ? fltrITP : itemParentData, "HIER1", "ITEM_PARENT");
      Rev_Sngl_fltr(valHIER1[index].HIER1, fltrSku.length > 0 ? fltrSku : skuData, "HIER1", "SKU");
      valHIER1.splice(index, 1);

    } else if (value.action === "clear") {
      valHIER1.splice(0, valHIER1.length);
    }

    if (valHIER1.length > 0 && typeof valHIER1[0]['HIER1'] !== "undefined") {
      valHIER1.map(
        (item) => {
          sel_HIER1.push(item.HIER1);

        }
      )
      setMapData((prev) => {
        return {
          ...prev,
          HIER1: sel_HIER1,
        };
      });
      setCheckClass(true)
      var temp = {}

      temp["HIER1"] = sel_HIER1;
      dispatch(getHIER2Request([temp]));
      dispatch(getHIER3Request([temp]));
      dispatch(getUDARequest([temp]));
      dispatch(getITEMPARENTRequest([temp]));
      dispatch(getDIFFRequest([temp]));
      dispatch(getSKURequest([temp]));
      // dispatch(getAllocItemsRequest([allocNo]));
    } else {
      //CLEARING DATA WHEN HIER1 IS EMPTY
      setHier2Data([]);
      setHier3Data([]);
      setItemParentData([]);
      setUdaData([]);
      setSkuData([]);
      setDIffData([]);
      //filter variables data
      setFltrH2([])
      setFltrH3([]);
      setFltrITP([]);
      setFltrSku([])
      setFltrDiff([]);
      setFltrUDA([]);
      //Selected val
      setValSKU([]);
      setValUDA([]);
      setValUDAValue([]);
      setValItempar([]);
      setValHIER3([]);
      setValHIER2([]);
      setValDiff([]);
      setValUDAValue([])

      setMapData((prev) => {
        return {
          ...prev,
          HIER1: [],
          HIER2: [],
          HIER3: [],
          UDA: [],
          UDA_VALUE: [],
          ITEM_PARENT: "",
          DIFF_ID: "",
          SKU: "",
          SKU_DESC: "",
          SKU_DIFF_ID: "",
        };
      });
    }
  }
  const selectedHIER2 = (event, value) => {
    let sel_HIER2 = [];
    let temp_Arr = []
    if (value.option) {
      valHIER2.push(value.option);
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER2.length; i++) {
        if (valHIER2[i]["HIER2"] === value.removedValue.HIER2) {
          index = i;
          break;
        }
      }
      // Reverse Filtering
      Rev_fltr(valHIER2[index].HIER2, fltrH3, "HIER2", "HIER3", valHIER3);
      Rev_fltr(valHIER2[index].HIER2, fltrUDA, "HIER2", "UDA", valUDA);

      Rev_Sngl_fltr(valHIER2[index].HIER2, fltrDiff.length > 0 ? fltrDiff : diffData, "HIER2", "DIFF_ID");
      Rev_Sngl_fltr(valHIER2[index].HIER2, fltrITP.length > 0 ? fltrITP : itemParentData, "HIER2", "ITEM_PARENT");
      Rev_Sngl_fltr(valHIER2[index].HIER2, fltrSku.length > 0 ? fltrSku : skuData, "HIER2", "SKU");
      valHIER2.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER2.splice(0, valHIER2.length);

    }

    if (valHIER2.length > 0 && typeof valHIER2[0]['HIER2'] !== "undefined") {

      valHIER2.map(
        (item) => {
          sel_HIER2.push(item.HIER2);
        }
      )

      setCheckSubClass(true)

      setMapData((prev) => {
        return {
          ...prev,
          HIER2: sel_HIER2,
        };
      });
      //FILTERING BASED ON HIER2 SELECTION
      var temp = {}
      temp["HIER2"] = sel_HIER2;
      filteringData(UniqSubClass, temp, "HIER3"); // Filtering Subclass
      if (mapData.HIER3.length === 0) {
        filteringData(itemParentData, temp, "ITEM_PARENT"); // Filtering ITEM_PARENT
        filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
        filteringData(skuData, temp, "SKU"); // Filtering SKU
        filteringData(udaData, temp, "UDA"); // Filtering UDA
      }
    } else {
      setUDAVCheck(true);
      setCheckSubClass(false);
      setFltrH3([]);
      setFltrUDA([]);
      setFltrDiff([]);
      setFltrSku([]);
      setFltrITP([]);
      setValHIER3([]);
      setMapData((prev) => {
        return {
          ...prev,
          HIER2: [],
          HIER3: [],
        };
      });
    }
  }
  const selectedHIER3 = (event, value) => {
    let sel_HIER3 = [];
    let temp_Arr = []
    if (value.option) {
      valHIER3.push(value.option);
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER3.length; i++) {
        if (valHIER3[i]["HIER3"] === value.removedValue.HIER3) {
          index = i;
          break;
        }
      }
      // Reverse Filtering
      if (valHIER3.length > 1) {
        // Rev_fltr(valHIER3[index].HIER3,fltrITP,"HIER3","ITEM_PARENT",valItemPar) ;
        // Rev_fltr(valHIER3[index].HIER3,fltrDiff,"HIER3","DIFF_ID",valDiff) ;
        // Rev_fltr(valHIER3[index].HIER3,fltrSku,"HIER3","SKU",valSKU) ;
        Rev_fltr(valHIER3[index].HIER3, fltrUDA, "HIER3", "UDA", valUDA);

        Rev_Sngl_fltr(valHIER3[index].HIER3, fltrDiff.length > 0 ? fltrDiff : diffData, "HIER3", "DIFF_ID");
        Rev_Sngl_fltr(valHIER3[index].HIER3, fltrITP.length > 0 ? fltrITP : itemParentData, "HIER3", "ITEM_PARENT");
        Rev_Sngl_fltr(valHIER3[index].HIER3, fltrSku.length > 0 ? fltrSku : skuData, "HIER3", "SKU");
      }
      valHIER3.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER3.splice(0, valHIER3.length);
    }

    if (valHIER3.length > 0 && typeof valHIER3[0]['HIER3'] !== "undefined") {
      valHIER3.map(
        (item) => {
          sel_HIER3.push(item.HIER3);
        }
      )
      setMapData((prev) => {
        return {
          ...prev,
          HIER3: sel_HIER3,
        };
      });

      var temp = {}
      temp["HIER3"] = sel_HIER3;
      filteringData(itemParentData, temp, "ITEM_PARENT"); // Filtering ITEM_PARENT
      filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
      filteringData(skuData, temp, "SKU"); // Filtering SKU
      filteringData(udaData, temp, "UDA"); // Filtering UDA
    } else {
      setUDAVCheck(true);
      var temp = {}
      if (mapData.HIER2.length > 0) {
        temp["HIER2"] = mapData.HIER2;
        filteringData(UniqItemParent, temp, "ITEM_PARENT"); // Filtering ITEM_PARENT
        filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
        filteringData(skuData, temp, "SKU"); // Filtering SKU
        filteringData(udaData, temp, "UDA"); // Filtering UDA
      }
      setMapData((prev) => {
        return {
          ...prev,
          HIER3: [],
        };
      });
    }
  }
  const selectedUDA = (event, value) => {

    let sel_UDA = [];
    if (value.option) {
      if (mapData.UDA.length === 3) {
        return (
          setOpenDialogLIM(true),
          setDialogDataLIM("UDA limit is 3"))
      }
      valUDA.push(value.option);
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDA.length; i++) {
        if (valUDA[i]["UDA"] === value.removedValue.UDA) {
          index = i;
          break;
        }
      }
      valUDA.splice(index, 1);
    } else if (value.action === "clear") {
      valUDA.splice(0, valUDA.length);
    }

    if (valUDA.length > 0 && typeof valUDA[0]['UDA'] !== "undefined") {

      const filterUDAVal = (fltrUDA.length > 0 ? fltrUDA : udaData).filter((item) => {
        return (valUDA).some((val) => {
          return item.UDA === val.UDA;
        });
      });

      setFilterUDAValue(filterUDAVal);
      valUDA.map(
        (item) => {
          sel_UDA.push(item.UDA);
        }
      )
      var temp = {}
      temp["UDA"] = sel_UDA;

      setMapData((prev) => {
        return {
          ...prev,
          UDA: sel_UDA,
        };
      });
    } else {
      setFilterUDAValue([]);
      setValUDAValue([]);
      setMapData((prev) => {
        return {
          ...prev,
          UDA: [],
          UDA_VALUE: [],
        };
      });
    }
  }
  const selectedUDAValue = (event, value) => {
    let sel_UDA_Val = [];
    if (value.option) {
      valUDAValue.push(value.option);
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDAValue.length; i++) {
        if (valUDAValue[i]["UDA_VALUE"] === value.removedValue.UDA_VALUE) {
          index = i;
          break;
        }
      }
      valUDAValue.splice(index, 1);
    } else if (value.action === "clear") {
      valUDAValue.splice(0, valUDAValue.length);
    }

    if (valUDAValue.length > 0 && typeof valUDAValue[0]['UDA_VALUE'] !== "undefined") {
      valUDAValue.map(
        (item) => {
          sel_UDA_Val.push(item.UDA_VALUE);
        }
      )
      setMapData((prev) => {
        return {
          ...prev,
          UDA_VALUE: sel_UDA_Val,
        };
      });
    } else {
      setMapData((prev) => {
        return {
          ...prev,
          UDA_VALUE: [],
        };
      });
    }
  }
  const selectedItemListMulti = (event, value) => {
    let sel_Item_list = [];
    if (value.option) {
      valItemList.push(value.option);
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valItemList.length; i++) {
        if (valItemList[i]["ITEM_LIST"] === value.removedValue.ITEM_LIST) {
          index = i;
          break;
        }
      }
      valItemList.splice(index, 1);
    } else if (value.action === "clear") {
      valItemList.splice(0, valItemList.length);
    }

    if (valItemList.length > 0 && typeof valItemList[0]['ITEM_LIST'] !== "undefined") {
      valItemList.map(
        (item) => {
          sel_Item_list.push(item.ITEM_LIST);
        }
      )
      setMapData((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: sel_Item_list,
        };
      });
    } else {
      setMapData((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: [],
        };
      });
    }
  }
  const selectedItemList = (value) => {
    if (value) {
      setMapData((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: value.ITEM_LIST,
        };
      });

    } else {
      setMapData((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: "",
        };
      });
    }
  }
  const selectedItemParent = (value) => {
    if (value) {
      var temp = {};
      temp["ITEM_PARENT"] = [value.ITEM_PARENT];

      filteringData((fltrDiff.filter(obj => obj.ITEM_PARENT === value.ITEM_PARENT)).length > 0 ? fltrDiff : diffData, temp, "DIFF_ID");
      filteringData((fltrSku.filter(obj => obj.ITEM_PARENT === value.ITEM_PARENT)).length > 0 ? fltrSku : skuData, temp, "SKU");
      filteringData((fltrUDA.filter(obj => obj.ITEM_PARENT === value.ITEM_PARENT)).length > 0 ? fltrUDA : udaData, temp, "UDA");

      setMapData((prev) => {
        return {
          ...prev,
          ITEM_PARENT: value.ITEM_PARENT,
          NO_OF_SKUS: "",
        };
      });
      if (mapData.DIFF_ID.length > 0) {
        const diffCheck = (diffData.filter(obj => obj.ITEM_PARENT === value.ITEM_PARENT)).filter(
          obj => obj.DIFF_ID === mapData.DIFF_ID
        )
        if (diffCheck.length > 0) {
          setLoading(true);
          const reqData = [{ "ALLOC_NO": allocHDetails[0].ALLOC_NO, "ITEM_PARENT": value.ITEM_PARENT, "DIFF_ID": mapData.DIFF_ID }]
          dispatch(postNOOFSKUSRequest([reqData]));
        }
      }
    } else {
      var temp = {}
      // if (mapData.SKU.length > 0) {
      //   temp["SKU"] = [mapData.SKU];
      // }else 
      if (mapData.HIER3.length > 0) {
        temp["HIER3"] = [...mapData.HIER3];
      } else if (mapData.HIER2.length > 0) {
        temp["HIER2"] = [...mapData.HIER2];
      }

      // else if (mapData.HIER1.length > 0) {
      //   temp["HIER1"] = [...mapData.HIER1];
      // }
      if (Object.keys(temp).length > 0) {
        filteringData(diffData, temp, "DIFF_ID");
        filteringData(skuData, temp, "SKU");
        filteringData(udaData, temp, "UDA");
      } else {
        setFltrDiff([]);
        setFltrSku([]);
        setFltrUDA([]);
      }
      setMapData((prev) => {
        return {
          ...prev,
          ITEM_PARENT: "",
        };
      });

    }
  }
  const selectedDiff = (value) => {
    if (value) {
      // var tempDF={};
      // var temp_Arr=[];
      // temp_Arr.push(value.ITEM_PARENT);
      // tempDF["DIFF"]=temp_Arr;
      var temp = {};
      temp["DIFF_ID"] = [value.DIFF_ID];
      filteringData((fltrSku.filter(obj => obj.ITEM_PARENT === value.DIFF_ID)).length > 0 ? fltrSku : skuData, temp, "SKU");
      setMapData((prev) => {
        return {
          ...prev,
          DIFF_ID: value.DIFF_ID,
          NO_OF_SKUS: "",
        };
      });
      if (mapData.ITEM_PARENT.length > 0) {
        setLoading(true);
        const reqData = { "ALLOC_NO": allocHDetails[0].ALLOC_NO, "ITEM_PARENT": mapData.ITEM_PARENT, "DIFF_ID": value.DIFF_ID }
        dispatch(postNOOFSKUSRequest([reqData]));
      }
    } else {
      var temp = {}
      if (mapData.SKU.length > 0) {
        temp["SKU"] = [mapData.SKU];
      } else if (mapData.ITEM_PARENT.length > 0) {
        temp["ITEM_PARENT"] = [mapData.ITEM_PARENT];
      } else if (mapData.HIER3.length > 0) {
        temp["HIER3"] = [...mapData.HIER3];
      } else if (mapData.HIER2.length > 0) {
        temp["HIER2"] = [...mapData.HIER2];
      }

      // else if (mapData.HIER1.length > 0) {
      //   temp["HIER1"] = [...mapData.HIER1];
      // }
      if (Object.keys(temp).length > 0) {
        filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
        // filteringData(UniqVPN,temp,"VPN"); // Filtering VPN
        // filteringData(udaData,temp,"UDA"); // Filtering UDA
      } else {
        setFltrDiff([]);
        // setFltrVPN([]);
        // setFltrUDA([]);
      }
      setMapData((prev) => {
        return {
          ...prev,
          DIFF_ID: [],
        };
      });
    }
  }
  const selectedSKU = (value) => {
    if (value) {
      var temp = {};
      temp["SKU"] = [value.SKU];
      filteringData(fltrDiff.length > 0 ? fltrDiff : diffData, temp, "DIFF_ID");
      setMapData((prev) => {
        return {
          ...prev,
          SKU: value.SKU,
          SKU_DESC: value.SKU_DESC,
          SKU_DIFF_ID: value.DIFF1,
        };
      });
    } else {
      var temp = {}
      if (mapData.ITEM_PARENT.length > 0) {
        temp["ITEM_PARENT"] = [mapData.ITEM_PARENT];
      }

      else if (mapData.HIER3.length > 0) {
        temp["HIER3"] = [...mapData.HIER3];
      }

      else if (mapData.HIER2.length > 0) {
        temp["HIER2"] = [...mapData.HIER2];
      }
      if (Object.keys(temp).length > 0) {
        filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
        // filteringData(UniqVPN,temp,"VPN"); // Filtering VPN
        // filteringData(udaData,temp,"UDA"); // Filtering UDA
      } else {
        setFltrDiff([]);
        // setFltrVPN([]);
        // setFltrUDA([]);
      }

      setMapData((prev) => {
        return {
          ...prev,
          SKU: "",
          SKU_DESC: "",
          SKU_DIFF_ID: "",
        };
      });
    }
  }
  const selectedSizeProfile = (value) => {
    if (value && value.value.length > 0) {
      setValSP(value.value)
      setMapData((prev) => {
        return {
          ...prev,
          SIZE_PROFILE: value.value,
        };
      });
    } else {
      setMapData((prev) => {
        return {
          ...prev,
          SIZE_PROFILE: "",
        };
      });
    }
  }
  const selectedWeight = (event) => {
    if ((event.target.value > 0 && event.target.value <= 100) || event.target.value === "") {

      setMapData((prev) => {
        return {
          ...prev,
          WEIGHT: event.target.value,
        };
      });
    } else {
      setOpenDialogLIM(true);
      setDialogDataLIM("Invalid WEIGHT% : " + String(event.target.value));
    }
  }
  const selectedMapSizeProf = (event) => {
    if (allocHDetails[0].ALLOC_LEVEL_CODE !== "T") {
      mapSizeprof ? setMapSP(false) : setMapSP(true)
      setMapData((prev) => {
        return {
          ...prev,
          MAP_SIZE_PROFILE: !mapSizeprof
        };
      });
    }
  }


  /*
                    #########################################
                    ### LIKE ITEM MAPPING BUTTON FUNCTION ###
                    #########################################
  */
  const handleOK = () => {
    // setTableData([]);
    setOnOkClose(true);
    //if (mapTableData.length > 0) {
    /*
    var sendData = {}
    var sendArr = []
    mapTableData.map(obj => {
      sendData["ITEM"] = obj.ITEM;
      sendData["LIKE_ITEM"] = obj.LIKE_ITEM;
      sendData["LIKE_ITEM_DIFF_ID"] = obj.LIKE_ITEM_DIFF_ID;
      sendData["LIKE_ITEM_WEIGHT"] = obj.LIKE_ITEM_WEIGHT;
      sendData["ALLOC_NO"] = allocNo.ALLOCATION_ID;
      sendArr.push(sendData);
      sendData = {}
    });
    // sendData["ALLOC_NO"]=allocNo.ALLOCATION_ID
     */
    var sendData = {}
    sendData["ALLOC_NO"] = allocHDetails[0].ALLOC_NO;
    sendData["MAPDATA"] = allocHDetails.length > 0 && allocHDetails[0].ALLOC_LEVEL_CODE === "D" ? mapTableData : []
    setLoading(true);
    dispatch(postLIkeInsertRequest([sendData]));
    setHeaderCheck(true);
    //if(AllocationData?.data?.insertLikeItemData)

    //window.location.reload();
    // setTab('1')
    // setRTabCond(false)
    // setDisCond(0)
    // }else{
    //   setTab('1');
    //   setRTabCond(false);
    //   setDisCond(0);
    //   //setOnOkClose(false);
    // }

    // setNavCond(true);

  }
  const handleMap = () => {

    if (allocHDetails[0].ALLOC_LEVEL_CODE === "T") {
      if (mapData.SKU.length === 0 && mapData.ITEM_LIST_NO.length === 0) {
        setOpenDialogLIM(true);
        setDialogDataLIM("SKU/ITEM LIST is Required* for Mapping");
        return;
      } if (mapData.SKU.length > 0 && mapData.ITEM_LIST_NO !== "") {
        setOpenDialogLIM(true);
        setDialogDataLIM("Either ITEM LIST or SKU can be Mapped");
        return;
      }
      if (allPageSelected.includes(mapData.SKU)) {
        setOpenDialogLIM(true);
        setDialogDataLIM("SKU cannot be mapped to same SKU");
        return;
      }
      if (mapData.WEIGHT === "") {
        setOpenDialogLIM(true);
        setDialogDataLIM("Invalid Weight % ");
        return;
      }
      if (Object.keys(selected[0]).length === 0) {
        setOpenDialogLIM(true);
        setDialogDataLIM("SELECT ITEMS TO MAP");
        return;
      }
      /* 
      const temp = [...tableData.filter(obj => selected.includes(obj.ITEM))];
      const deletedData = tableData.filter(obj => selected.includes(obj.ITEM));

      setDelTableData([...delTableData, ...deletedData]);
      setTableData(tableData.filter(obj => !selected.includes(obj.ITEM)));
      var mappedData = [];
      // var
      // if( mappedData.DIFF_ID.length>0){

      // }
      temp.map(obj => {
        mappedData.push({
          ...obj,
          LIKE_ITEM: mapData.SKU,
          LIKE_ITEM_DESC: mapData.SKU_DESC,
          LIKE_ITEM_DIFF_ID: mapData.DIFF_ID.length > 0 ? mapData.DIFF_ID : mapData.SKU_DIFF_ID,
          LIKE_ITEM_WEIGHT: mapData.WEIGHT
        });
      });
      setMapTableData([...mapTableData, ...mappedData]);
      setSelected([]);
      */
      const temp = [...tableData.filter(obj => allPageSelected.includes(obj.SR_NO))];

      var temp_mapData = {}
      temp_mapData["ALLOC_ITEMS"] = []
      temp.map(row => (temp_mapData["ALLOC_ITEMS"].push({ "ITEM": row.ITEM, "DIFF_ID": row.DIFF_ID })))
      temp_mapData["ALLOC_NO"] = allocHDetails[0].ALLOC_NO
      temp_mapData["DIFF_ID"] = mapData.DIFF_ID;
      temp_mapData["ITEM_LIST_NO"] = mapData.ITEM_LIST_NO;
      temp_mapData["ITEM_PARENT"] = mapData.ITEM_PARENT
      temp_mapData["SKU"] = mapData.SKU
      temp_mapData["WEIGHT"] = mapData.WEIGHT
      temp_mapData["SIZE_PROFILE"] = mapData.SIZE_PROFILE
      temp_mapData["NO_OF_SKUS"] = mapData.NO_OF_SKUS
      temp_mapData["ALLOC_LEVEL"] = allocHDetails[0].ALLOC_LEVEL_CODE
      setLoading(true);
      dispatch(postMapItemsRequest([temp_mapData]));

      setSelected([{}]);
    } else if (allocHDetails[0].ALLOC_LEVEL_CODE === "D") {
      if (Object.keys(selected[0]).length === 0) {
        setOpenDialogLIM(true);
        setDialogDataLIM("SELECT ITEMS TO MAP");
        return;
      }
      if ((mapData.ITEM_PARENT.length === 0 || mapData.DIFF_ID.length === 0)) {
        setOpenDialogLIM(true);
        setDialogDataLIM("Like Item is mandatory.");
        return;
      }
      if ((mapData.ITEM_PARENT.toString().length > 0 && mapData.toString().DIFF_ID === 0 && mapData.toString().NO_OF_SKUS === 0)) {
        setOpenDialogLIM(true);
        setDialogDataLIM("Like Item Diff is mandatory.");
        return;
      }

      const temp = [...tableData.filter(obj => allPageSelected.includes(obj.SR_NO))];

      var temp_mapData = {}
      temp_mapData["ALLOC_ITEMS"] = []
      temp.map(row => (temp_mapData["ALLOC_ITEMS"].push({ "ITEM": row.ITEM, "DIFF_ID": row.DIFF_ID })))
      temp_mapData["ALLOC_NO"] = allocHDetails[0].ALLOC_NO
      temp_mapData["DIFF_ID"] = mapData.DIFF_ID;
      temp_mapData["ITEM_LIST_NO"] = mapData.ITEM_LIST_NO;
      temp_mapData["ITEM_PARENT"] = mapData.ITEM_PARENT
      temp_mapData["SKU"] = mapData.SKU
      temp_mapData["WEIGHT"] = mapData.WEIGHT
      temp_mapData["SIZE_PROFILE"] = mapData.SIZE_PROFILE
      temp_mapData["NO_OF_SKUS"] = mapData.NO_OF_SKUS
      temp_mapData["ALLOC_LEVEL"] = allocHDetails[0].ALLOC_LEVEL_CODE
      setLoading(true);
      dispatch(postMapItemsRequest([temp_mapData]));

      setSelected([{}]);

    }
    setState({ ...state, right: false });
  }
  const handleDelete = () => {
    /*
    setDelTableData(delTableData.filter(obj => !selectedMap.includes(obj.ITEM)));
    setTableData([...tableData, ...delTableData.filter(obj => selectedMap.includes(obj.ITEM))]);
    setMapTableData(mapTableData.filter(obj => !selectedMap.includes(obj.ITEM)));
    setSelectedMap(selectedMap.filter(item => !selectedMap.includes(item)));
    */
    if (Object.keys(selectedMap).length > 0) {
      const combinedList = Object.values(selectedMap[0]).flat()
      const temp = [...mapTableData.filter(obj => combinedList.includes(obj.SR_NO))];
      var delMapData = {}
      delMapData["ALLOC_NO"] = allocHDetails[0].ALLOC_NO
      delMapData["MAP_ITEMS"] = []
      temp.map(row => (delMapData["MAP_ITEMS"].push({ "ITEM": row.ITEM, "DIFF_ID": row.DIFF_ID })));
      setLoading(true);
      dispatch(postDelMappedRequest([delMapData]));
      setSelectedMap([{}]);
    }
  }
  const handleCancel = () => {
    document.title = 'Create Allocation';
    dispatch(postLIkeInsertRequest(["CLOSE"]));
    setHeaderCheck(true);
    setNavCond(true)
    setTableData([]);
    setMapTableData([]);
    //setDelTableData([]);
    setSelected([{}]);
    setSelectedMap([{}]);
    setTab('1');
    setRTabCond(false);
    setDisCond(0);
  }
  const handleRefresh = () => {
    //setState({ ...state, right: false });
    setCheckClass(false);
    setCheckSubClass(false)
    setValHIER1([]);
    setValHIER2([]);
    setValHIER3([]);
    setValUDA([]);
    setValUDAValue([]);
    setValItemList([]);
    setValItempar([]);
    setValSKU([]);
    setFilterUDAValue([]);
    setValSP("");
    setMapSP(false);
    setMapData(initialData);


    // Referesh Data
    setHier2Data([]);
    setHier3Data([]);
    setItemParentData([]);
    setDIffData([]);
    setSkuData([]);
    setUdaData([]);
    setFltrH2([]);
    setFltrH3([]);
    setFltrITP([]);
    setFltrDiff([]);
    setFltrUDA([]);
    setFltrSku([]);
    setLoading(false);
    // dispatch(getHIERRequest([{}]));
    // dispatch(getHIER2Request([{}]));
    // dispatch(getHIER3Request([{}]));
    // dispatch(getUDARequest([{}]));
    // dispatch(getITEMPARENTRequest([{}]));
    // dispatch(getDIFFRequest([{}]));
    // dispatch(getSKURequest([{}]));
  }
  //INFO ICON POPUP
  const SearchButtonTrend = () => (
    <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
      <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
        onClick={() => {
          setOpenDialogLIM(true);
          setDialogDataLIM(String(allocHDetails[0].ALLOC_DESC));
        }}
      />
    </IconButton>
  )

  const temp_data = [{ "ALLOC_NO": 1604, "ITEM": "123400", "ITEM_DESC": "Test Item 1", "DIFF_ID": "BLACK", "NO_OF_SIZES": 1.0, "SEL_IND": "N", "DIFFS": "" },
  { "ALLOC_NO": 1604, "ITEM": "123401", "ITEM_DESC": "Test Item 2", "DIFF_ID": "BLUE", "NO_OF_SIZES": 1.0, "SEL_IND": "N", "DIFFS": "" }]

  /* View Mode Function */
  const ViewModeFunction = () => {
    setTab('1');
    setRTabCond(false);
    setDisCond(0);
  }

  const Header1 = () => (
    <Box
      component="fieldset"
      display="inline-block"
      // sx={{
      //   height: "auto",
      //   marginLeft: "5px",
      //   marginTop: "20px",
      //   backgroundColor: "#F5F5F5",
      //   borderRadius: 1,
      //   width: "100%",
      //   boxShadow: 2, border: 0,
      //   borderBottom: 3,
      // }}
      sx={{
        //backgroundColor: "",
        height: "auto",
        width: "100%",
        borderRadius: 1,
        backgroundColor: "#F5F5F5",
        boxShadow: 2, border: 0,
        borderBottom: 3,
        border: "1px solid lightgrey",
      }}
    >
      <Modal open={loading}>
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
      <legend style={{ fontWeight: "bold", color: "#191970", }}>Header</legend>

      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
            Allocation ID</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <TextField
            size="small"
            sx={{
              margin: "0px 0px 2px 2px", width: "100px"
              , "& .MuiInputBase-input.Mui-disabled": {
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                height: "15px",
              }
            }}
            id="outlined-disabled"
            name="ALLOC_NO"

            //   value={searchHeaderData.ALLOC_DESC}
            value={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_NO : null}
            // value="1604"
            defaultValue={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_NO : null}
            inputProps={{
              maxLength: 100,
            }}
            InputProps={{
              style: { fontSize: 12, height: "30px" },
              className: LikeItem.inputField,
            }}
            disabled
          />

        </div>
      </div>
      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
            Description</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield} >
          <TextField
            size="small"
            variant="outlined"
            // value="Allocation_test1"
            // name="ESID_FROM"
            helperText=""
            sx={{
              margin: "0px 0px 2px 2px", width: "180px"
              , "& .MuiInputBase-input.Mui-disabled": {
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                height: "14px",
                // padding:"0px"
              },
              // input: {
              //     "&::placeholder": {
              //         opacity: 1,
              //     },
              // },
              borderRadius: "5px",
              boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
            }}
            value={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_DESC : null}
            disabled
            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
            InputProps={{
              style: { fontSize: 12, backgroundColor: "#f0f0f0", height: "30px", },
              endAdornment: <SearchButtonTrend />,

              className: LikeItem.input,
            }}
          />
        </div>
      </div>

      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
            Alloc Context</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <TextField
            size="small"
            variant="outlined"
            //value="Sales"
            // name="ESID_FROM"
            helperText=""
            sx={{
              margin: "0px 0px 2px 2px", width: "180px"
              , "& .MuiInputBase-input.Mui-disabled": {
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                height: "15px",
              },
              // input: {
              //   "&::placeholder": {
              //     opacity: 0.5,
              //   },
              //}
            }}
            value={allocHDetails.length > 0 ? allocHDetails[0].CONTEXT : null}
            disabled
            // InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
            // inputProps={{
            //   maxLength: 100, sx: { backgroundColor: '#f0f0f0' },
            // }}
            // InputProps={{
            //   style: { fontSize: 12, height: "30px" },
            //   className: LikeItem.inputField,
            // }}
            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
            InputProps={{
              style: { fontSize: 12, height: "30px" },
              className: LikeItem.inputField,
            }}
          />
        </div>
      </div>

      {allocHDetails.PROMOTION === "NULL" ?
        <div className={LikeItem.float_container}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Promotion</InputLabel>
          </div>
          <div className={LikeItem.multiselectfield}>

            <TextField
              size="small"
              variant="outlined"
              // name="ESID_FROM"
              // value="Sku"
              helperText=""
              sx={{
                // "& .MuiInputBase-input.Mui-disabled": {
                //   backgroundColor: "#f0f0f0", border: 0
                // }, backgroundColor: "white"
                margin: "0px 0px 2px 2px", width: "180px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  height: "14px",
                },
                borderRadius: "5px",
              }}
              value={allocHDetails.length > 0 && allocHDetails[0].CONTEXT === "Promotion" ? allocHDetails[0].PROMOTION : null}
              disabled
              InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
              InputProps={{
                style: { fontSize: 12, height: "30px" },
                className: LikeItem.inputField,
              }}
            />
          </div>
        </div>
        : null}

      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
            Alloc Level</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <TextField
            size="small"
            variant="outlined"
            // name="ESID_FROM"
            // value="Sku"
            helperText=""
            sx={{
              margin: "0px 0px 2px 2px", width: "180px"
              , "& .MuiInputBase-input.Mui-disabled": {
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                height: "14px",
              },
              borderRadius: "5px",
            }}
            value={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_LEVEL : null}
            disabled={true}
            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
            InputProps={{
              style: { fontSize: 12, height: "30px" },
              className: LikeItem.inputField,
            }}
          />
        </div>
      </div>

      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
            Release Date</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}
        >
          <TextField
            size="small"
            variant="outlined"
            name="RELEASE_DATE"
            type="date"
            helperText=""
            id="outlined-disabled"
            label=""
            defaultValue=""
            // value="2023-02-22"
            value={allocHDetails.length > 0 ? allocHDetails[0].RELEASE_DATE : null}
            disabled
            sx={{
              margin: "0px 0px 2px 2px",
              //  width: "180px", 
              "& .MuiInputBase-input.Mui-disabled": {
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                height: "15px",
              },
              input: {
                "&::placeholder": {
                  opacity: 1,
                },
              }
            }}
            // sx={{
            //   // "& .MuiInputBase-input.Mui-disabled": {
            //   //   backgroundColor: "#f0f0f0", border: 0
            //   // }, backgroundColor: "white"
            //   margin: "0px 0px 2px 2px", width: "180px"
            //   , "& .MuiInputBase-input.Mui-disabled": {
            //     backgroundColor: "#f0f0f0",
            //     borderRadius: "5px",
            //     height: "14px",
            //   },
            //   borderRadius: "5px",
            // }}
            //InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
            inputProps={{ sx: { backgroundColor: '#f0f0f0' } }}
            InputProps={{
              style: { fontSize: 12, height: "30px" },
              shrink: true,
              className: LikeItem.input,
            }}
          />
        </div>
      </div>

      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
            Status</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>

          <TextField
            size="small"
            variant="outlined"
            // name="ESID_FROM"
            helperText=""
            sx={{
              margin: "0px 0px 2px 2px", width: "180px"
              , "& .MuiInputBase-input.Mui-disabled": {
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                height: "14px",
              },
              borderRadius: "5px",
            }}

            // value="Worksheet"
            value={allocHDetails.length > 0 ? allocHDetails[0].STATUS : null}
            disabled={true}
            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
            InputProps={{
              style: { fontSize: 12, height: "30px" },
              className: LikeItem.inputField,
            }}
          />
        </div>
      </div>

      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
            Alloc Type</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <TextField
            size="small"
            variant="outlined"
            // name="ESID_FROM"
            helperText=""
            sx={{
              margin: "0px 0px 2px 2px", width: "180px"
              , "& .MuiInputBase-input.Mui-disabled": {
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                height: "14px",
              },
              borderRadius: "5px",
            }}
            // value="Ad-Hoc"
            value={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_TYPE : null}
            disabled={true}
            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
            InputProps={{
              style: { fontSize: 12, height: "30px" },
              className: LikeItem.inputField,
            }}
          />
        </div>
      </div>

      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
            Allocator</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <TextField
            size="small"
            variant="outlined"
            // name="ESID_FROM"
            helperText=""
            // value="Admin"
            value={allocHDetails.length > 0 ? allocHDetails[0].ALLOCATOR : null}
            disabled={true}
            sx={{
              margin: "0px 0px 2px 2px", width: "180px"
              , "& .MuiInputBase-input.Mui-disabled": {
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                height: "15px",
              }
            }}
            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
            InputProps={{
              style: { fontSize: 12, height: "30px" },
              className: LikeItem.inputField,
            }}
          />
        </div>
      </div>

    </Box>
  )

  const Header = () => (
    <Box
      // component="fieldset"
      display="inline-block"

      sx={{
        //   //backgroundColor: "",
        //   height: "auto",
        width: "100%",
        //   borderRadius: 1,
        //   backgroundColor: "#F5F5F5",
        //   boxShadow: 2, border: 0,
        //   borderBottom: 3,
        // border: "1px solid yellow",
      }}
    >
      <Modal open={loading}>
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
      {/* <legend style={{ fontWeight: "bold", color: "#191970", }}>Header</legend> */}
      <div style={{ display: "flex", }}>
        <div style={{ flex: "1 1 auto" }}>
          <div className={LikeItem.float_container}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Allocation ID</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
              <TextField
                size="small"
                sx={{
                  margin: "0px 0px 2px 2px", width: "100px"
                  , "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",
                  }
                }}
                id="outlined-disabled"
                name="ALLOC_NO"

                //   value={searchHeaderData.ALLOC_DESC}
                value={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_NO : null}
                // value="1604"
                defaultValue={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_NO : null}
                inputProps={{
                  maxLength: 100,
                }}
                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  className: LikeItem.inputField,
                }}
                disabled
              />
            </div>
          </div>
          <div className={LikeItem.float_container}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left' }}>
                Description</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield} >
              <TextField
                size="small"
                variant="outlined"
                helperText=""
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
                value={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_DESC : null}
                disabled


                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, backgroundColor: "#f0f0f0", height: "30px", },
                  endAdornment: <SearchButtonTrend />,
                  className: LikeItem.input,
                }}
              />
            </div>
          </div>

          <div className={LikeItem.float_container}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left' }}>
                Alloc Context</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
              <TextField
                size="small"
                variant="outlined"
                helperText=""
                sx={{
                  margin: "0px 0px 2px 0px", width: "20vh"
                  , "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",
                  },
                }}
                value={allocHDetails.length > 0 ? allocHDetails[0].CONTEXT : null}
                disabled
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  className: LikeItem.inputField,
                }}
              />
            </div>
          </div>

          {allocHDetails.PROMOTION === "NULL" ?
            <div className={LikeItem.float_container}>
              <div>
                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left' }}>
                  Promotion</InputLabel>
              </div>
              <div className={LikeItem.multiselectfield}>
                <TextField
                  size="small"
                  variant="outlined"
                  // name="ESID_FROM"
                  // value="Sku"
                  helperText=""
                  sx={{
                    // "& .MuiInputBase-input.Mui-disabled": {
                    //   backgroundColor: "#f0f0f0", border: 0
                    // }, backgroundColor: "white"
                    margin: "0px 0px 2px 0px", width: "20vh"
                    , "& .MuiInputBase-input.Mui-disabled": {
                      backgroundColor: "#f0f0f0",
                      borderRadius: "5px",
                      height: "14px",
                    },
                    borderRadius: "5px",
                  }}
                  value={allocHDetails.length > 0 && allocHDetails[0].CONTEXT === "Promotion" ? allocHDetails[0].PROMOTION : null}
                  disabled
                  InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                  InputProps={{
                    style: { fontSize: 12, height: "30px" },
                    className: LikeItem.inputField,
                  }}
                />
              </div>
            </div>
            : null}

          <div className={LikeItem.float_container}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left' }}>
                Alloc Level</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
              <TextField
                size="small"
                variant="outlined"
                // name="ESID_FROM"
                // value="Sku"
                helperText=""
                sx={{
                  margin: "0px 0px 2px 0px", width: "20vh"
                  , "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "14px",
                  },
                  borderRadius: "5px",
                }}
                value={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_LEVEL : null}
                disabled={true}
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  className: LikeItem.inputField,
                }}
              />
            </div>
          </div>



          <div className={LikeItem.float_container}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left' }}>
                Release Date</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}
            >
              <TextField
                size="small"
                variant="outlined"
                // name="ESID_FROM"
                // value="Sku"
                helperText=""
                sx={{
                  margin: "0px 0px 2px 0px", width: "140px"
                  , "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "14px",
                  },
                  borderRadius: "5px",
                }}
                value={allocHDetails.length > 0 ? allocHDetails[0].RELEASE_DATE : null}
                disabled={true}
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  className: LikeItem.inputField,
                }}
              />
            </div>
          </div>

          <div className={LikeItem.float_container}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left' }}>
                Status</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
              <TextField
                size="small"
                variant="outlined"
                // name="ESID_FROM"
                helperText=""
                sx={{
                  margin: "0px 0px 2px 0px", width: "20vh"
                  , "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "14px",
                  },
                  borderRadius: "5px",
                }}

                // value="Worksheet"
                value={allocHDetails.length > 0 ? allocHDetails[0].STATUS : null}
                disabled={true}
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  className: LikeItem.inputField,
                }}
              />
            </div>
          </div>

          <div className={LikeItem.float_container}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left' }}>
                Alloc Type</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
              <TextField
                size="small"
                variant="outlined"
                // name="ESID_FROM"
                helperText=""
                sx={{
                  margin: "0px 0px 2px 0px", width: "20vh"
                  , "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "14px",
                  },
                  borderRadius: "5px",
                }}
                // value="Ad-Hoc"
                value={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_TYPE : null}
                disabled={true}
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  className: LikeItem.inputField,
                }}
              />
            </div>
          </div>

          <div className={LikeItem.float_container}>
            <div>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 0px", display: 'inline', float: 'left' }}>
                Allocator</InputLabel>
            </div>
            <div className={LikeItem.multiselectfield}>
              <TextField
                size="small"
                variant="outlined"
                // name="ESID_FROM"
                helperText=""
                // value="Admin"
                value={allocHDetails.length > 0 ? allocHDetails[0].ALLOCATOR : null}
                disabled={true}
                sx={{
                  margin: "0px 0px 2px 0px", width: "140px"
                  , "& .MuiInputBase-input.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    height: "15px",
                  }
                }}
                InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                InputProps={{
                  style: { fontSize: 12, height: "30px" },
                  className: LikeItem.inputField,
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
    </Box>
  )

  const HeaderButtons = () => (
    <Box
      display="flex"
      justifyContent="flex-end"
    // sx={{border:"1px solid red"}}
    >
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        transitionDuration={500}
        PaperProps={{
          style: { width: "450px" } // Set the desired width value
        }}
      >
        {searchPanel("right")}
      </Drawer>

      {/* <div className={LikeItem.grid_container}
        style={{
          marginRight: "0px",
          border: "1px solid red",
        }}> */}
      {/* <div className={LikeItem.grid_child1}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px",
              padding: "5px", fontFamily: "system-ui",
              width: "100px",
              marginRight: "5px", paddingLeft: "0px", marginTop: "2px",
              '&.Mui-disabled': {
                opacity: 0.5,
                backgroundColor: 'DodgerBlue',
                color: '#fff',
              },
            }}
            variant="contained"
            onClick={toggleDrawer("right", true)}
            // startIcon={<SearchIcon />}
            startIcon={<PolylineIcon />}
          >
            Mapping
          </Button>
        </div> */}
      <div className={LikeItem.grid_child1}>
        <Button
          sx={{
            fontSize: "12px", padding: "5px", fontFamily: "system-ui",
            width: "100px", marginRight: "5px", marginTop: "2px", paddingLeft: "0px",
            backgroundColor: "#228B22",  '&:hover': {
              backgroundColor: '#3CB371', // Change this to the desired "light maroon" color
            },
          }}
          size='medium'
          variant="contained"
          type="submit"
          onClick={ApproveFreeseCheck ? ViewModeFunction : handleOK}
          startIcon={<DoneAllIcon />}
        >
          OK</Button></div>
      <div className={LikeItem.grid_child1}>
        <Button
          sx={{
            backgroundColor: "maroon",
            fontSize: "12px", fontFamily: "system-ui", paddingLeft: "0px",
            width: "100px", margin: "2px 0px 0px 0px", padding: "5px"
            //  marginLeft: "5px",
            //  marginTop: "2px", 
            // marginRight:"0px"
            , '&:hover': {
              backgroundColor: '#8B0000', // Change this to the desired "light maroon" color
            },
          }}
          size='medium'
          variant="contained"
          //className={LikeItem.textField}
          type="submit"
          onClick={ApproveFreeseCheck ? ViewModeFunction : handleCancel}
          startIcon={<CancelIcon />}
        >
          Cancel</Button>
      </div>
      {/* </div> */}
    </Box>
  )

  /*
                    #########################################
                    ######### LIKE ITEM CRITERIA  ###########
                    #########################################
  */

  const Like_Criteria = () => (
    <Box
      component="fieldset"
      display="inline-block"
      sx={{
        //position: 'relative',
        height: "auto",
        marginLeft: "5px",
        marginTop: "20px",
        backgroundColor: "#F5F5F5",
        borderRadius: 1,

        boxShadow: 2, border: 0,
        borderBottom: 3,
      }}
    >
      <legend style={{ fontWeight: "bold", color: "#191970", }}>Like Item Criteria</legend>

      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
            Hier1</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <Select
            closeMenuOnSelect={true}
            isSearchable={true}
            getOptionLabel={option =>
              `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
            getOptionValue={option => option.HIER1}
            options={UniqDept.length > 0 ? UniqDept : []}
            styles={styleSelect}
            components={animatedComponents}
            maxMenuHeight={180}
            onChange={selectedHIER1}
            value={hier1Data.filter(obj => mapData?.HIER1.includes(obj.HIER1))}
            isMulti
            isClearable={true}
            isDisabled={ApproveFreeseCheck}
          />
        </div>
      </div>
      {/* </div> 
               <div className={LikeItem.float_container}> */}
      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
            Hier2</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield} >
          <Select
            closeMenuOnSelect={true}
            isSearchable={true}
            getOptionLabel={option =>
              `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
            getOptionValue={option => option.HIER2}
            options={(UniqClass.length > 0) ? UniqClass : []}
            styles={styleSelect}
            components={animatedComponents}
            maxMenuHeight={180}
            onChange={selectedHIER2}
            value={hier2Data.filter(obj => mapData?.HIER2.includes(obj.HIER2))}
            isMulti
            isClearable={true}
            isDisabled={mapData.HIER1.length === 0 || ApproveFreeseCheck}
          />
        </div> </div>

      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
            Hier3</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <Select
            closeMenuOnSelect={true}
            isSearchable={true}
            getOptionLabel={option =>
              `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
            getOptionValue={option => option.HIER3}
            options={fltrH3.length > 0 || mapData.HIER2.length > 0 ? fltrH3 : (UniqSubClass.length > 0) ? UniqSubClass : []}
            styles={styleSelect}
            components={animatedComponents}
            onChange={selectedHIER3}
            value={hier3Data.filter(obj => mapData?.HIER3.includes(obj.HIER3))}
            isMulti
            isClearable={true}
            isDisabled={mapData.HIER2.length === 0 || ApproveFreeseCheck}
            maxMenuHeight={180}
          />
        </div> </div>
      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
            Extended Attribute</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <Select
            closeMenuOnSelect={true}
            isSearchable={true}
            getOptionLabel={option =>
              `${option.UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
            getOptionValue={option => option.UDA}
            options={fltrUDA.length > 0 || (mapData.HIER2.length > 0 || mapData.HIER3.length > 0) ?
              fltrUDA.length > 0
                ? [...new Map(fltrUDA.map((item) => [item["UDA"], item])).values()]
                : []
              : UniqUDA.length ? UniqUDA : []}
            styles={styleSelect}
            components={animatedComponents}
            onChange={selectedUDA}
            value={udaData.filter(obj => mapData?.UDA.includes(obj.UDA))}
            isMulti
            isDisabled={mapData.HIER1.length === 0 || ApproveFreeseCheck}
            isClearable={true}
            maxMenuHeight={180}
          />
        </div> </div>
      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
            Attribute Value</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <Select
            closeMenuOnSelect={true}
            isSearchable={true}
            getOptionLabel={option =>
              `${option.UDA_VALUE.toString()} (${option.USER_ATTR_VALUE_DESC.toString()})`}
            getOptionValue={option => option.UDA_VALUE}
            options={filterUDAValue.length > 0 ? filterUDAValue : []}
            styles={styleSelect}
            components={animatedComponents}
            onChange={selectedUDAValue}
            value={(fltrUDA.length > 0 ? fltrUDA : udaData).filter(obj => mapData?.UDA_VALUE.includes(obj.UDA_VALUE))}
            isMulti
            maxMenuHeight={180}
            isClearable={true}
            isDisabled={mapData.UDA.length === 0 || ApproveFreeseCheck}

          />
        </div> </div>

      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
            Item List</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <Select
            closeMenuOnSelect={true}
            isSearchable={true}
            getOptionLabel={option =>
              `${option.ITEM_LIST.toString()}-${option.ITEM_LIST_DESC.toString()}`}
            getOptionValue={option => option.ITEM_LIST}
            options={itemListHeadData.length > 0 ? itemListHeadData : []}
            styles={styleSelect}
            components={animatedComponents}
            onChange={selectedItemList}
            value={itemListHeadData.filter(obj => mapData?.ITEM_LIST_NO === (obj.ITEM_LIST))}
            //isMulti
            maxMenuHeight={180}
            isClearable={true}
            isDisabled={ApproveFreeseCheck}
          />
        </div> </div>
      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
            Size Profile</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <Select
            closeMenuOnSelect={true}
            isSearchable={true}
            getOptionLabel={option => `${option.value.toString()}`}
            getOptionValue={option => option.value}
            options={[{ value: 'YES' }, { value: 'NO' }]}
            styles={styleSelect}
            components={animatedComponents}
            onChange={selectedSizeProfile}
            value={[{ value: 'YES' }, { value: 'NO' }].filter(obj => mapData?.SIZE_PROFILE.includes(obj.value))}
            isClearable={true}
            isDisabled={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_LEVEL_CODE === "T" : false || ApproveFreeseCheck}
            maxMenuHeight={180}
          />
        </div> </div>
      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
            Style</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <Select
            closeMenuOnSelect={true}
            isSearchable={true}
            getOptionLabel={option => `${option.ITEM_PARENT.toString()}`}
            getOptionValue={option => option.ITEM_PARENT}
            options={fltrITP.length > 0 || (mapData.HIER2.length > 0 || mapData.HIER3.length > 0) ?
              fltrITP.length > 0
                ? [...new Map(fltrITP.map((item) => [item["ITEM_PARENT"], item])).values()]
                : []
              : UniqItemParent.length > 0 ? UniqItemParent : []}
            styles={styleSelect}
            components={animatedComponents}
            onChange={selectedItemParent}
            value={UniqItemParent.filter(obj => mapData?.ITEM_PARENT.includes(obj.ITEM_PARENT))}
            //isMulti 
            isDisabled={mapData.HIER1.length === 0 || ApproveFreeseCheck}
            isClearable={true}
            maxMenuHeight={180}
          />
        </div> </div>
      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
            Variant</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <Select
            closeMenuOnSelect={true}
            isSearchable={true}
            getOptionLabel={option =>
              `${option.DIFF_ID.toString()}`}
            getOptionValue={option => option.DIFF_ID}
            //options={diffData.length > 0 ? diffData : []}\
            options={fltrDiff.length > 0 || (mapData.HIER2.length > 0 || mapData.HIER3.length > 0) ?
              fltrDiff.length > 0
                ? [...new Map(fltrDiff.map((item) => [item["DIFF_ID"], item])).values()]
                : []
              : UniqDiff.length > 0 ? UniqDiff : []}
            styles={styleSelect}
            components={animatedComponents}
            onChange={selectedDiff}
            value={diffData.filter(obj => mapData?.DIFF_ID.includes(obj.DIFF_ID))}
            //isMulti 
            isClearable={true}
            isDisabled={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_LEVEL_CODE === "T" ? true : (mapData.HIER1.length === 0 || ApproveFreeseCheck) : (mapData.HIER1.length === 0 || ApproveFreeseCheck)}
            maxMenuHeight={180}
          />
        </div> </div>
      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
            Sku</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <Select
            closeMenuOnSelect={true}
            isSearchable={true}
            getOptionLabel={option =>
              `${option.SKU.toString()}`}
            getOptionValue={option => option.SKU}
            //options={ fltrSku.length>0?fltrSku: skuData.length > 0 ? skuData : []}
            options={fltrSku.length > 0 || (mapData.HIER2.length > 0 || mapData.HIER3.length > 0) ?
              fltrSku.length > 0
                ? [...new Map(fltrSku.map((item) => [item["SKU"], item])).values()]
                : []
              : skuData.length > 0 ? UniqSKU : []}
            styles={styleSelect}
            components={animatedComponents}
            maxMenuHeight={180}
            onChange={selectedSKU}
            value={skuData.filter(obj => mapData?.SKU.includes(obj.SKU))}
            //isMulti 
            isDisabled={mapData.HIER1.length === 0 || ApproveFreeseCheck}
            isClearable={true}
          />
        </div> </div>
      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
            No of Sku's</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>
          <TextField
            size="small"
            variant="outlined"
            name="ESID_FROM"
            helperText=""
            sx={{
              input: {
                backgroundColor: "white",
              },
              margin: "0px 0px 2px 0px", width: "180px"
              , "& .MuiInputBase-input.Mui-disabled": {
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                height: "14px",
              },
              borderRadius: "5px",
              //boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
            }}
            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
            InputProps={{
              style: { fontSize: 12, height: "32px" },
              className: LikeItem.inputField,
            }}
            value={mapData.ITEM_PARENT.length > 0 && mapData.DIFF_ID.length > 0 ? mapData.NO_OF_SKUS : ""}
            disabled//={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_LEVEL_CODE === "T" : false || ApproveFreeseCheck}
          />
        </div> </div>
      <div className={LikeItem.float_container}>
        <div>
          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
            Weight %</InputLabel>
        </div>
        <div className={LikeItem.multiselectfield}>

          <TextField
            size="small"
            sx={{
              input: {
                backgroundColor: "white",
              },
              margin: "0px 0px 2px 0px", width: "180px"
              , "& .MuiInputBase-input.Mui-disabled": {
                backgroundColor: "#f0f0f0",
                color: "red",
                borderRadius: "5px",
                height: "14px",
              },
              borderRadius: "5px",

            }}
            id="outlined-disabled"
            //variant="outlined"
            //name="ESID_FROM"
            helperText=""
            onChange={selectedWeight}
            //value={searchData.ESID_FROM}
            //id="Outlined"
            value={mapData.WEIGHT}
            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true", }}
            InputProps={{
              style: { fontSize: 12, height: "32px", },
              className: LikeItem.inputField,
            }}
            disabled={ApproveFreeseCheck}
          />
        </div> </div>
      <div className={LikeItem.float_container}>
        <div className={LikeItem.multiselectfield}>

          <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline' }}>
            Map Size Profile:</InputLabel>

          <FormControlLabel
            sx={{
              margin: "2px 0px 0px 0px",//backgroundColor:"#F0FFFF" 
            }}

            control={

              <Switch checked={mapSizeprof} onChange={selectedMapSizeProf} name="jason" disabled={ApproveFreeseCheck} />}

          //onChange={selectedMapSizeProf}
          /></div></div>


      <Box
        display="flex"
        sx={{
          backgroundColor: "",
          height: "auto",
          width: "100%",
          padding: "0px 0px 0px 0px",
          justifyContent: 'flex-end',
          marginTop: "2px",
        }}
      >
        <div className={LikeItem.grid_container}>
          <div className={LikeItem.grid_child1}>
            <Button
              sx={{
                backgroundColor: "", fontSize: "12px",
                padding: "5px", fontFamily: "system-ui",
                width: "100px",
                marginLeft: "5px", paddingLeft: "0px", marginTop: "2px",
                '&.Mui-disabled': {
                  opacity: 0.5,
                  backgroundColor: 'DodgerBlue',
                  color: '#fff',
                },
              }}
              variant="contained"
              //className={CreateAllocationClasses.textField}
              size='medium'
              type="submit"
              onClick={handleMap}
              startIcon={<PolylineIcon />}
              disabled={ApproveFreeseCheck}
            //startIcon={<CloseFullscreenIcon/>}
            >
              Map</Button></div>
          <div className={LikeItem.grid_child1}>
            <Button
              sx={{
                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                width: "100px", marginLeft: "5px", marginTop: "2px", paddingLeft: "0px",
                backgroundColor: "#B22202", '&:hover': {
                  backgroundColor: "#B22202",
                },
                '&.Mui-disabled': {
                  opacity: 0.5,
                  backgroundColor: 'DodgerBlue',
                  color: '#fff',
                },
              }}

              variant="contained"
              className={LikeItem.textField}
              type="submit"
              onClick={handleRefresh}
              startIcon={<RefreshIcon />}
              size='medium'
              disabled={ApproveFreeseCheck}
            >
              Refresh</Button></div>

          <div className={LikeItem.grid_child1}>
            <Button
              sx={{
                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                width: "100px", marginLeft: "-5px", marginTop: "2px", paddingLeft: "0px",
                backgroundColor: "#228B22", '&:hover': {
                  backgroundColor: "#3CB371",
                }
              }}
              size='medium'
              variant="contained"
              type="submit"
              onClick={ApproveFreeseCheck ? ViewModeFunction : handleOK}
              startIcon={<DoneAllIcon />}
            >
              OK</Button></div>
          <div className={LikeItem.grid_child1}>
            <Button
              sx={{
                backgroundColor: "maroon",
                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                width: "100px", marginLeft: "5px", marginTop: "2px", paddingLeft: "0px",
                '&:hover': {
                  backgroundColor: '#8B0000', // Change this to the desired "light maroon" color
                },
              }}
              size='medium'
              variant="contained"
              className={LikeItem.textField}
              type="submit"
              onClick={ApproveFreeseCheck ? ViewModeFunction : handleCancel}
              startIcon={<CancelIcon />}
            >
              Cancel</Button>
          </div>
        </div>
        {/* </Box> */}
      </Box>
    </Box>
  )
  const [isHierExpanded, setHierExpanded] = useState(false);
  const [isAttrExpanded, setAttrExpanded] = useState(false);
  const [isSelExpanded, setSelExpanded] = useState(false);
  const [isAddAttrxpanded, setAddAttrExpanded] = useState(false);

  const handleHierClick = () => {
    setHierExpanded(!isHierExpanded);
  };
  const handleAttrClick = () => {
    setAttrExpanded(!isAttrExpanded);
  };
  const handleSelClick = () => {
    setSelExpanded(!isSelExpanded);
  };
  const handleAddAttrClick = () => {
    setAddAttrExpanded(!isAddAttrxpanded);
  };
  const Like_Criteria1 = () => (
    <Box
      // component="fieldset"
      // display="inline-block"
      sx={{
        //position: 'relative',
        //height: "auto",
        border: 0,
      }}
    >
      {/* <legend style={{ fontWeight: "bold", color: "#191970", }}>Like Item Criteria</legend> */}
      <div>
        <Typography
          variant="body1"
          style={{
            cursor: 'pointer', fontSize: "14px", fontWeight: "bold", position: "static", padding: "0px",
            backgroundColor: !isHierExpanded ? "#f5f5f5" : 'transparent', // Apply background color when expanded
            // textDecoration: isHierExpanded ? 'underline' : 'none',
            color: isHierExpanded ? '#191970' : 'inherit',
            borderRadius: isHierExpanded ? '5px' : '5px', // Add border radius when expanded

          }}

          onClick={handleHierClick}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
            {isHierExpanded ? (
              <>
                <span>HIERARCHY</span>
                <ExpandLessRoundedIcon style={{ marginLeft: '5px', }} />
              </>
            ) : (
              <>
                <span>HIERARCHY</span>
                <ExpandMoreRoundedIcon style={{ marginLeft: '5px', }} />
              </>
            )}
          </div>
        </Typography>
        {isHierExpanded && (
          <Box  //bgcolor="#f5f5f5" 
            sx={{ paddingTop: "0px" }}
          >
            {/* Content of the expanded box */}
            <Typography>
              <div className={LikeItem.float_container}>
                <div>
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Hier1</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    getOptionLabel={option =>
                      `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
                    getOptionValue={option => option.HIER1}
                    options={UniqDept.length > 0 ? UniqDept : []}
                    styles={styleSelect}
                    components={animatedComponents}
                    maxMenuHeight={180}
                    onChange={selectedHIER1}
                    value={hier1Data.filter(obj => mapData?.HIER1.includes(obj.HIER1))}
                    isMulti
                    isClearable={true}
                    isDisabled={ApproveFreeseCheck}
                  />
                </div>
              </div>
              {/* </div> 
               <div className={LikeItem.float_container}> */}
              <div className={LikeItem.float_container}>
                <div>
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Hier2</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield} >
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    getOptionLabel={option =>
                      `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
                    getOptionValue={option => option.HIER2}
                    options={(UniqClass.length > 0) ? UniqClass : []}
                    styles={styleSelect}
                    components={animatedComponents}
                    maxMenuHeight={180}
                    onChange={selectedHIER2}
                    value={hier2Data.filter(obj => mapData?.HIER2.includes(obj.HIER2))}
                    isMulti
                    isClearable={true}
                    isDisabled={mapData.HIER1.length === 0 || ApproveFreeseCheck}
                  />
                </div> </div>

              <div className={LikeItem.float_container}>
                <div>
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Hier3</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    getOptionLabel={option =>
                      `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
                    getOptionValue={option => option.HIER3}
                    options={fltrH3.length > 0 || mapData.HIER2.length > 0 ? fltrH3 : (UniqSubClass.length > 0) ? UniqSubClass : []}
                    styles={styleSelect}
                    components={animatedComponents}
                    onChange={selectedHIER3}
                    value={hier3Data.filter(obj => mapData?.HIER3.includes(obj.HIER3))}
                    isMulti
                    isClearable={true}
                    isDisabled={mapData.HIER2.length === 0 || ApproveFreeseCheck}
                    maxMenuHeight={180}
                  />
                </div> </div>
            </Typography>
          </Box>
        )}
      </div>
      {/* ITEM ATTRIBUTES */}
      <div style={{ paddingTop: "10px" }}>
        <Typography
          variant="body1"
          style={{
            cursor: 'pointer', fontSize: "14px", fontWeight: "bold", position: "static", padding: "0px",
            backgroundColor: !isAttrExpanded ? "#f5f5f5" : 'transparent', // Apply background color when expanded
            // textDecoration: isHierExpanded ? 'underline' : 'none',
            color: isAttrExpanded ? '#191970' : 'inherit',
            borderRadius: isAttrExpanded ? '5px' : '5px', // Add border radius when expanded

          }}

          onClick={handleAttrClick}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
            {isAttrExpanded ? (
              <>
                <span>ITEM ATTRIBUTES</span>
                <ExpandLessRoundedIcon style={{ marginLeft: '5px', }} />
              </>
            ) : (
              <>
                <span>ITEM ATTRIBUTES</span>
                <ExpandMoreRoundedIcon style={{ marginLeft: '5px', }} />
              </>
            )}
          </div>
        </Typography>
        {isAttrExpanded && (
          <Box  //bgcolor="#f5f5f5" 
            sx={{ paddingTop: "0px" }}
          >
            {/* Content of the expanded box */}
            <Typography>
              <div className={LikeItem.float_container}>
                <div>
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Extended Attribute</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    getOptionLabel={option =>
                      `${option.UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
                    getOptionValue={option => option.UDA}
                    options={fltrUDA.length > 0 || (mapData.HIER2.length > 0 || mapData.HIER3.length > 0) ?
                      fltrUDA.length > 0
                        ? [...new Map(fltrUDA.map((item) => [item["UDA"], item])).values()]
                        : []
                      : UniqUDA.length ? UniqUDA : []}
                    styles={styleSelect}
                    components={animatedComponents}
                    onChange={selectedUDA}
                    value={udaData.filter(obj => mapData?.UDA.includes(obj.UDA))}
                    isMulti
                    isDisabled={mapData.HIER1.length === 0 || ApproveFreeseCheck}
                    isClearable={true}
                    maxMenuHeight={180}
                  />
                </div> </div>
              <div className={LikeItem.float_container}>
                <div>
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Attribute Value</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    getOptionLabel={option =>
                      `${option.UDA_VALUE.toString()} (${option.USER_ATTR_VALUE_DESC.toString()})`}
                    getOptionValue={option => option.UDA_VALUE}
                    options={filterUDAValue.length > 0 ? filterUDAValue : []}
                    styles={styleSelect}
                    components={animatedComponents}
                    onChange={selectedUDAValue}
                    value={(fltrUDA.length > 0 ? fltrUDA : udaData).filter(obj => mapData?.UDA_VALUE.includes(obj.UDA_VALUE))}
                    isMulti
                    maxMenuHeight={180}
                    isClearable={true}
                    isDisabled={mapData.UDA.length === 0 || ApproveFreeseCheck}

                  />
                </div> </div>
            </Typography>
          </Box>
        )}
      </div>

      {/* ITEM SELECTION */}
      <div style={{ paddingTop: "10px" }}>
        <Typography
          variant="body1"
          style={{
            cursor: 'pointer', fontSize: "14px", fontWeight: "bold", position: "static", padding: "0px",
            backgroundColor: !isSelExpanded ? "#f5f5f5" : 'transparent', // Apply background color when expanded
            // textDecoration: isHierExpanded ? 'underline' : 'none',
            color: isSelExpanded ? '#191970' : 'inherit',
            borderRadius: isSelExpanded ? '5px' : '5px', // Add border radius when expanded

          }}

          onClick={handleSelClick}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
            {isSelExpanded ? (
              <>
                <span>ITEM SELECTION</span>
                <ExpandLessRoundedIcon style={{ marginLeft: '5px', }} />
              </>
            ) : (
              <>
                <span>ITEM SELECTION</span>
                <ExpandMoreRoundedIcon style={{ marginLeft: '5px', }} />
              </>
            )}
          </div>
        </Typography>
        {isSelExpanded && (
          <Box  //bgcolor="#f5f5f5" 
            sx={{ paddingTop: "0px" }}
          >
            {/* Content of the expanded box */}
            <Typography>
              <div className={LikeItem.float_container}>
                <div>
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Sku List</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    getOptionLabel={option =>
                      `${option.ITEM_LIST.toString()}-${option.ITEM_LIST_DESC.toString()}`}
                    getOptionValue={option => option.ITEM_LIST}
                    options={itemListHeadData.length > 0 ? itemListHeadData : []}
                    styles={styleSelect}
                    components={animatedComponents}
                    onChange={selectedItemList}
                    value={itemListHeadData.filter(obj => mapData?.ITEM_LIST_NO === (obj.ITEM_LIST))}
                    //isMulti
                    maxMenuHeight={180}
                    isClearable={true}
                    isDisabled={ApproveFreeseCheck}
                  />
                </div> </div>

              <div className={LikeItem.float_container}>
                <div>
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Style</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    getOptionLabel={option => `${option.ITEM_PARENT.toString()}`}
                    getOptionValue={option => option.ITEM_PARENT}
                    options={fltrITP.length > 0 || (mapData.HIER2.length > 0 || mapData.HIER3.length > 0) ?
                      fltrITP.length > 0
                        ? [...new Map(fltrITP.map((item) => [item["ITEM_PARENT"], item])).values()]
                        : []
                      : UniqItemParent.length > 0 ? UniqItemParent : []}
                    styles={styleSelect}
                    components={animatedComponents}
                    onChange={selectedItemParent}
                    value={UniqItemParent.filter(obj => mapData?.ITEM_PARENT.includes(obj.ITEM_PARENT))}
                    //isMulti 
                    isDisabled={mapData.HIER1.length === 0 || ApproveFreeseCheck}
                    isClearable={true}
                    maxMenuHeight={180}
                  />
                </div> </div>
              <div className={LikeItem.float_container}>
                <div>
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Variant</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    getOptionLabel={option =>
                      `${option.DIFF_ID.toString()}`}
                    getOptionValue={option => option.DIFF_ID}
                    //options={diffData.length > 0 ? diffData : []}\
                    options={fltrDiff.length > 0 || (mapData.HIER2.length > 0 || mapData.HIER3.length > 0) ?
                      fltrDiff.length > 0
                        ? [...new Map(fltrDiff.map((item) => [item["DIFF_ID"], item])).values()]
                        : []
                      : UniqDiff.length > 0 ? UniqDiff : []}
                    styles={styleSelect}
                    components={animatedComponents}
                    onChange={selectedDiff}
                    value={diffData.filter(obj => mapData?.DIFF_ID.includes(obj.DIFF_ID))}
                    //isMulti 
                    isClearable={true}
                    isDisabled={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_LEVEL_CODE === "T" ? true : (mapData.HIER1.length === 0 || ApproveFreeseCheck) : (mapData.HIER1.length === 0 || ApproveFreeseCheck)}
                    maxMenuHeight={180}
                  />
                </div> </div>
              <div className={LikeItem.float_container}>
                <div>
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Sku</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    getOptionLabel={option =>
                      `${option.SKU.toString()}`}
                    getOptionValue={option => option.SKU}
                    //options={ fltrSku.length>0?fltrSku: skuData.length > 0 ? skuData : []}
                    options={fltrSku.length > 0 || (mapData.HIER2.length > 0 || mapData.HIER3.length > 0) ?
                      fltrSku.length > 0
                        ? [...new Map(fltrSku.map((item) => [item["SKU"], item])).values()]
                        : []
                      : skuData.length > 0 ? UniqSKU : []}
                    styles={styleSelect}
                    components={animatedComponents}
                    maxMenuHeight={180}
                    onChange={selectedSKU}
                    value={skuData.filter(obj => mapData?.SKU.includes(obj.SKU))}
                    //isMulti 
                    isDisabled={mapData.HIER1.length === 0 || ApproveFreeseCheck}
                    isClearable={true}
                  />
                </div> </div>
              <div className={LikeItem.float_container}>
                <div>
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    No of Sku's</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>
                  <TextField
                    size="small"
                    variant="outlined"
                    name="ESID_FROM"
                    helperText=""
                    sx={{
                      input: {
                        backgroundColor: "white",
                      },
                      margin: "0px 0px 2px 0px", width: "180px"
                      , "& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor: "#f0f0f0",
                        borderRadius: "5px",
                        height: "14px",
                      },
                      borderRadius: "5px",
                      //boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                    }}
                    InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                    InputProps={{
                      style: { fontSize: 12, height: "32px" },
                      className: LikeItem.inputField,
                    }}
                    value={mapData.ITEM_PARENT.length > 0 && mapData.DIFF_ID.length > 0 ? mapData.NO_OF_SKUS : ""}
                    disabled//={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_LEVEL_CODE === "T" : false || ApproveFreeseCheck}
                  />
                </div> </div>
            </Typography>
          </Box>
        )}
      </div>
      {/* ADDITIONAL ATTRIBUTES */}
      <div style={{ paddingTop: "10px" }}>
        <Typography
          variant="body1"
          style={{
            cursor: 'pointer', fontSize: "14px", fontWeight: "bold", position: "static", padding: "0px",
            backgroundColor: !isAddAttrxpanded ? "#f5f5f5" : 'transparent', // Apply background color when expanded
            // textDecoration: isHierExpanded ? 'underline' : 'none',
            color: isAddAttrxpanded ? '#191970' : 'inherit',
            borderRadius: isAddAttrxpanded ? '5px' : '5px', // Add border radius when expanded

          }}

          onClick={handleAddAttrClick}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
            {isAddAttrxpanded ? (
              <>
                <span>ADDITIONAL ATTRIBUTES</span>
                <ExpandLessRoundedIcon style={{ marginLeft: '5px', }} />
              </>
            ) : (
              <>
                <span>ADDITIONAL ATTRIBUTES</span>
                <ExpandMoreRoundedIcon style={{ marginLeft: '5px', }} />
              </>
            )}
          </div>
        </Typography>
        {isAddAttrxpanded && (
          <Box  //bgcolor="#f5f5f5" 
            sx={{ paddingTop: "0px" }}
          >
            {/* Content of the expanded box */}
            <Typography>
              <div className={LikeItem.float_container}>
                <div>
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Size Profile</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    getOptionLabel={option => `${option.value.toString()}`}
                    getOptionValue={option => option.value}
                    options={[{ value: 'YES' }, { value: 'NO' }]}
                    styles={styleSelect}
                    components={animatedComponents}
                    onChange={selectedSizeProfile}
                    value={[{ value: 'YES' }, { value: 'NO' }].filter(obj => mapData?.SIZE_PROFILE.includes(obj.value))}
                    isClearable={true}
                    isDisabled={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_LEVEL_CODE === "T" : false || ApproveFreeseCheck}
                    maxMenuHeight={180}
                  />
                </div> </div>



              <div className={LikeItem.float_container}>
                <div>
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                    Weight %</InputLabel>
                </div>
                <div className={LikeItem.multiselectfield}>

                  <TextField
                    size="small"
                    sx={{
                      input: {
                        backgroundColor: "white",
                      },
                      margin: "0px 0px 2px 0px", width: "180px"
                      , "& .MuiInputBase-input.Mui-disabled": {
                        backgroundColor: "#f0f0f0",
                        color: "red",
                        borderRadius: "5px",
                        height: "14px",
                      },
                      borderRadius: "5px",

                    }}
                    id="outlined-disabled"
                    //variant="outlined"
                    //name="ESID_FROM"
                    helperText=""
                    onChange={selectedWeight}
                    //value={searchData.ESID_FROM}
                    //id="Outlined"
                    value={mapData.WEIGHT}
                    InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true", }}
                    InputProps={{
                      style: { fontSize: 12, height: "32px", },
                      className: LikeItem.inputField,
                    }}
                    disabled={ApproveFreeseCheck}
                  />
                </div> </div>
              <div className={LikeItem.float_container}>
                <div className={LikeItem.multiselectfield}>

                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline' }}>
                    Map Size Profile:</InputLabel>

                  <FormControlLabel
                    sx={{
                      margin: "2px 0px 0px 0px",//backgroundColor:"#F0FFFF" 
                    }}

                    control={

                      <Switch checked={mapSizeprof} onChange={selectedMapSizeProf} name="jason" disabled={ApproveFreeseCheck} />}

                  //onChange={selectedMapSizeProf}
                  /></div></div>

            </Typography>
          </Box>
        )}
      </div>
      <div style={{ paddingTop: "10px" }}></div>



      <Box
        display="flex"
        justifyContent='flex-end'

      >
        <div className={LikeItem.grid_container}>
          <div className={LikeItem.grid_child1}>
            <Button
              sx={{
                backgroundColor: "", fontSize: "12px",
                padding: "5px", fontFamily: "system-ui",
                width: "100px",
                paddingLeft: "0px", margin: "2px 0px 0px 5px",
                '&.Mui-disabled': {
                  opacity: 0.5,
                  backgroundColor: 'DodgerBlue',
                  color: '#fff',
                },
              }}
              variant="contained"
              //className={CreateAllocationClasses.textField}
              size='medium'
              type="submit"
              onClick={handleMap}
              startIcon={<PolylineIcon />}
              disabled={ApproveFreeseCheck}
            //startIcon={<CloseFullscreenIcon/>}
            >
              Map</Button>

          </div>
          <div className={LikeItem.grid_child1}>
            <Button
              sx={{
                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                width: "100px", margin: "2px 0px 0px 5px",
                // backgroundColor: "#B22202", '&:hover': {
                //   //backgroundColor: "#B22202",
                // },
                '&.Mui-disabled': {
                  opacity: 0.5,
                  backgroundColor: 'DodgerBlue',
                  color: '#fff',
                },
              }}

              variant="contained"
              className={LikeItem.textField}
              type="submit"
              onClick={handleRefresh}
              startIcon={<RefreshIcon />}
              // size='medium'
              disabled={ApproveFreeseCheck}
            >
              Refresh</Button>
          </div>

        </div>
      </Box>
    </Box>
  )
  /* 
                      ########################################
                      ##### CHECKBOX SELECTION HANDLING ######
                      ########################################
*/

  const handleSelectAllClick = (event) => {
    const lastPage = Math.ceil((tableData.length) / rowsPerPage);

    // const filteredArray = tableData.slice((page * rowsPerPage),
    //   ((page * rowsPerPage) +
    //     (page === lastPage - 1 ? (tableData.length - (page * rowsPerPage)) : rowsPerPage)
    //   ));
    const filteredArray = currentPageData
    const newSelected = filteredArray.map((n) => n.SR_NO);
    const pageselected = { [page]: newSelected };

    if (event.target.checked && (Object.keys(selected[0]).length > 0 && !Object.keys(selected[0]).includes(String(page)))
    ) {
      const sortedArray = ((selected && Object.keys(selected[0]).length > 0) ? [{ ...selected[0], ...pageselected }]
        : [pageselected]).sort((a, b) => {
          const keyA = Object.keys(a)[0];
          const keyB = Object.keys(b)[0];
          return keyA - keyB;
        });
      setSelected(sortedArray);
      const combinedList = Object.values(sortedArray[0]).flat()
      setAllPageSelected(combinedList);
      return;
    } else if (event.target.checked && Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) {
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
    } else if (event.target.checked && (Object.keys(selected[0]).length === 0)) {
      setSelected([pageselected]);
      const combinedList = Object.values(pageselected).flat()
      setAllPageSelected(combinedList);
      return;
    }
    setSelected([{}]);
    setAllPageSelected([]);

  };
  const [breakchk, setBreakChk] = useState([]);
  const handleClick = (event, name) => {
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
    const combinedList = Object.values(newSelected[0]).flat()
    setAllPageSelected(combinedList);
    setSelected(newSelected);
    setBreakChk([]);
    return;
  };

  const isSelected = (name) => (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page)))
    ? selected[0][page].indexOf(name) !== -1 : false;


  const handleMapSelectAllClick = (event) => {
    const lastPage = Math.ceil((mapTableData.length) / rowsPerPageMap);

    // const filteredArray = mapTableData.slice((pageMap * rowsPerPageMap),
    //   ((pageMap * rowsPerPageMap) +
    //     (pageMap === lastPage - 1 ? (mapTableData.length - (pageMap * rowsPerPageMap)) : rowsPerPageMap)
    //   ));
    const filteredArray = currentPageDataMap
    const newSelected = filteredArray.map((n) => n.SR_NO);
    const pageselected = { [page]: newSelected };

    if (event.target.checked && (Object.keys(selectedMap[0]).length > 0 && !Object.keys(selectedMap[0]).includes(String(pageMap)))
    ) {
      const sortedArray = ((selectedMap && Object.keys(selectedMap[0]).length > 0) ? [{ ...selectedMap[0], ...pageselected }]
        : [pageselected]).sort((a, b) => {
          const keyA = Object.keys(a)[0];
          const keyB = Object.keys(b)[0];
          return keyA - keyB;
        });
      setSelectedMap(sortedArray);
      const combinedList = Object.values(sortedArray[0]).flat()
      setAllPageSelectedMap(combinedList);
      return;
    } else if (event.target.checked && Object.keys(selectedMap[0]).length > 0 && Object.keys(selectedMap[0]).includes(String(pageMap))) {
      const updatedArray = selectedMap.map((obj) => {
        if (obj.hasOwnProperty(pageMap)) {
          delete obj[pageMap];
        }
        return obj;
      });
      updatedArray.sort((a, b) => {
        const keyA = Object.keys(a)[0];
        const keyB = Object.keys(b)[0];
        return keyA - keyB;
      });
      setSelectedMap(updatedArray);
      const combinedList = Object.values(updatedArray[0]).flat()
      setAllPageSelectedMap(combinedList);
      return;
    } else if (event.target.checked && (Object.keys(selectedMap[0]).length === 0)) {
      setSelectedMap([pageselected]);
      const combinedList = Object.values(pageselected).flat()
      setAllPageSelectedMap(combinedList);
      return;
    }
    setSelectedMap([{}]);
    setAllPageSelectedMap([]);
  };
  const handleMapClick = (event, name) => {
    const selectedIndex = Object.keys(selectedMap[0]).length > 0 && Object.keys(selectedMap[0]).includes(String(pageMap))
      ? selectedMap[0][pageMap].indexOf(name)
      : -1;
    let newSelected = [];
    if (selectedIndex === -1) {
      if (Object.keys(selectedMap[0]).length > 0 && !Object.keys(selectedMap[0]).includes(String(pageMap))) {
        newSelected = [{ ...selectedMap[0], [pageMap]: [name] }];
      } else if (Object.keys(selectedMap[0]).length > 0 && Object.keys(selectedMap[0]).includes(String(pageMap))) {
        newSelected = selectedMap;
        newSelected[0][pageMap].push(name);
      } else if (Object.keys(selectedMap[0]).length === 0) {
        const pageselected = { [pageMap]: [name] };
        newSelected.push(pageselected);
      }
    } else {
      if (selectedMap[0][pageMap].length === 1) {
        newSelected = selected.map((obj) => {
          if (obj.hasOwnProperty(String(pageMap))) {
            const newObj = { ...obj };
            delete newObj[String(pageMap)];
            return newObj;
          }
          return obj;
        });

      } else if (selectedMap[0][pageMap].length > 1) {
        selectedMap.forEach((obj) => {
          if (obj.hasOwnProperty(pageMap)) {
            const index = obj[pageMap].indexOf(name);
            obj[pageMap].splice(index, 1);
          }
        });
        newSelected = selectedMap;
      }
    }
    const combinedList = Object.values(newSelected[0]).flat()
    setAllPageSelectedMap(combinedList);
    setSelectedMap(newSelected);
    setBreakChk([]);
    return;
  };

  const isMapSelected = (name) => (Object.keys(selectedMap[0]).length > 0
    && Object.keys(selectedMap[0]).includes(String(pageMap)))
    ? selectedMap[0][pageMap].indexOf(name) !== -1 : false;


  // const isMapSelected = (name) => selectedMap.indexOf(name) !== -1;
  /*
      #################################################
      ##########  MANAGE COLUMNS IN TABLE  ############
      #################################################
*/

  const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
  const [ManageHeaderData, setManageHeaderData] = useState([]);

  if (ManageHeaderCheck && allocHDetails.length > 0) {
    var temp = []
    // map_head.map(row => temp.push(row.id));
    map_head.map(row => {
      if (!(row.id === "MAP_SIZE_PR" && allocHDetails.length > 0 && allocHDetails[0].ALLOC_LEVEL_CODE === 'T')) {
        if (Object.keys(row).length > 0) {
          temp.push(row.id);
        }
      }
    });
    setManageHeaderData(temp);
    setManageHeaderCheck(false);
  } else if (allocHDetails.length === 0 && ManageHeaderData.length === 0) {
    var temp = []
    map_head.map(row => {
      if (Object.keys(row).length > 0) {
        temp.push(row.id)
      }
    });
    setManageHeaderData(temp);
    // setManageHeaderCheck(false);
  }
  const HandleManageHeader = () => {
    setOpenDialogManage(true);
  }
  const handleCloseDialogManage = (e) => {
    if (ManageHeaderData.length > 0) { setOpenDialogManage(false); }
    else { setOpenDialogLIM(true); setDialogDataLIM("Table must contain atleast one column."); }
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
    // map_head.map(row => temp.push(row.id));
    map_head.map(row => {
      if (!(row.id === "MAP_SIZE_PR" && allocHDetails.length > 0 && allocHDetails[0].ALLOC_LEVEL_CODE === 'T')) {
        if (Object.keys(row).length > 0) {
          temp.push(row.id);
        }
      }
    });
    setManageHeaderData(temp);
  }
  const headerManage = () => (
    <Box display="inline-block"
      sx={{ backgroundColor: "", height: "auto", padding: "0rem 0rem", width: "100%", }}>
      <div>
        {map_head.map((key) => {
          if (!(allocHDetails.length > 0 && allocHDetails[0].ALLOC_LEVEL_CODE === 'T' && key.id === "MAP_SIZE_PR")) {
            if (Object.keys(key).length > 0) {
              return (
                <div key={key.id}>
                  <FormControlLabel
                    size="small"
                    sx={{ padding: "0px", margin: "0px 0px 0px 0px" }}
                    control={
                      <Checkbox
                        sx={{ margin: "0px 0px 0px 0px", padding: "2px", paddingTop: "0px" }}
                        color="primary"
                        size="small"
                        onClick={(event) => handleManageHeaderClick(event, key?.id)}
                        checked={ManageHeaderData.includes(key.id)}
                        style={{ padding: "0px", textAlign: "center" }}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                    label={
                      <InputLabel
                        sx={{
                          fontWeight: "bold",
                          fontSize: "12px",
                          margin: "0px 0px 0px 0px",
                          padding: "0px 0px 0px 0px",
                          display: 'inline',
                          float: 'left',
                        }}
                      >
                        {key.label}
                      </InputLabel>
                    }
                  />
                </div>
              );
            }
          } else {
            return null; // Exclude the component from rendering
          }
        })}

      </div>
    </Box>
  )
  /* 
                      ########################################
                      ##### ALLOCATED ITEM GRID HEADER #######
                      ########################################
    */
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

  function Alloc_Grid(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead //className={LikeItem.TitleHead}
        sx={{ position: "sticky", top: -1, }}
      >
        <TableRow //className={LikeItem.TitleRow}
        //sx={{ backgroundColor: "#6495ED", height: "10px" }}
        >
          <TableCell
            padding="checkbox"
            style={{
              padding: "0px", backgroundColor: "DodgerBlue",
            }} align="center">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Checkbox
                color="primary"
                size="small"
                disabled={ApproveFreeseCheck}
                // indeterminate={selected.length > 0 && selected.length < tableData.length}
                // checked={tableData.length > 0 && selected.length === tableData.length}
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
                  color: "#fff",
                  padding: "3px",
                  // margin: "0px 0px 0px 5px",
                }}
              />
            </div>
          </TableCell>

          {alloc_head.map((headCell) => (
            <TableCell
              sx={{ padding: "1px", textAlign: "left", fontSize: "11px", backgroundColor: "DodgerBlue", paddingLeft: "3px" }}
              // style={{
              //   whiteSpace: "nowrap", paddingLeft: "3px"
              // }}
              size="small"
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {/* {headcell} */}
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

            </TableCell>))
          }


        </TableRow>
      </TableHead>
    );
  }
  Alloc_Grid.propTypes = {
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
          ...(tableData.length > 0 &&
          { //position: "sticky",
            minHeight: {
              minHeight: "40px !important",
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
        {tableData.length > 0 && (
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
            Rows {selected.length} of {tableData.length}
          </Typography>
        )}
      </Toolbar>
    );
  }

  /* 
                      ########################################
                      ####### MAPPED ITEM GRID HEADER ########
                      ########################################
    */


  function Mapped_Grid(props) {
    const { onSelectMapAllClick, orderM, orderMBy, numMapSelected, rowCountM, onRequestMapSort } =
      props;
    const createSortMapHandler = (property) => (event) => {
      onRequestMapSort(event, property);
    };
    return (
      <TableHead className={LikeItem.TitleHead} sx={{ position: "sticky", top: -1, }}>
        <TableRow className={LikeItem.TitleRow}
          role="checkbox" sx={{ backgroundColor: "#6495ED", height: "10px" }}>
          <TableCell style={{
            padding: "0px", backgroundColor: "DodgerBlue",
          }} align="center">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              <Checkbox
                color="primary"
                size="small"
                disabled={ApproveFreeseCheck}
                // indeterminate={selectedMap.length > 0 && selectedMap.length < mapTableData.length}
                // checked={mapTableData.length > 0 && selectedMap.length === mapTableData.length}
                indeterminate={Object.keys(selectedMap[0]).length > 0
                  && Object.keys(selectedMap[0]).includes(String(pageMap))
                  && selectedMap[0][pageMap].length < currentPageDataMap.length}
                checked={currentPageDataMap.length > 0 && Object.keys(selectedMap[0]).length > 0
                  && Object.keys(selectedMap[0]).includes(String(pageMap))
                  && selectedMap[0][pageMap].length === currentPageDataMap.length}
                onChange={onSelectMapAllClick}
                inputProps={{
                  'aria-label': 'select all data',
                }}
                style={{
                  color: "#fff",
                  padding: "3px",
                  // paddingTop:"0px",
                  // paddingBottom:"0px"
                  // margin: "0px 0px 0px 5px",
                }} />
            </div>
          </TableCell>
          {map_head.map((headCell) => (ManageHeaderData.includes(headCell.id) &&
            <TableCell
              sx={{ padding: "1px", textAlign: "left", fontSize: "12px", backgroundColor: "DodgerBlue", paddingLeft: "3px", color: "white", }}
              size="small"
              key={headCell.id}
              sortDirection={orderMBy === headCell.id ? orderM : false}
            >
              {['WEIGHT%', "MAP_SIZE_PR"].includes(headCell.id) ?
                headCell.label
                :
                <TableSortLabel
                  active={orderMBy === headCell.id}
                  direction={orderMBy === headCell.id ? orderM : 'asc'}
                  onClick={createSortMapHandler(headCell.id)}
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
                  {orderMBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {orderM === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              }
            </TableCell>)

          )}
          {/* <TableCell sx={{ padding: "1px", textAlign: "left", fontSize: "12px", backgroundColor: "DodgerBlue", color: "white", paddingLeft: "3px" }}
          >WEIGHT%</TableCell>
          <TableCell //align="right" 
            //sx={{ padding: "0px", textAlign: "left", fontSize: "11px",backgroundColor: "DodgerBlue", }}
            //sx={{ padding: "1px", textAlign: "left", fontSize: "11px", backgroundColor: "DodgerBlue",color:"white" }}
            sx={{ padding: "1px", textAlign: "left", fontSize: "12px", backgroundColor: "DodgerBlue", color: "white", paddingLeft: "3px" }}
          >
            MAP_SIZE_PR</TableCell> */}

        </TableRow>
      </TableHead>
    );
  }
  Mapped_Grid.propTypes = {
    numMapSelected: PropTypes.number.isRequired,
    onRequestMapSort: PropTypes.func.isRequired,
    onSelectMapAllClick: PropTypes.func.isRequired,
    orderM: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderMBy: PropTypes.string.isRequired,
    rowCountM: PropTypes.number.isRequired,
  };
  function EnhancedTableToolbarMap(props) {
    const { numMapSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(mapTableData.length > 0 &&
          {
            minHeight: {
              minHeight: "40px !important",
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
        {mapTableData.length > 0 && (
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
            Rows {selectedMap.length} of {mapTableData.length}
          </Typography>
        )}
      </Toolbar>
    );
  }

  /*
                       #########################################
                       #########   INLINE FILTERING    #########
                       #########################################
   */
  useEffect(() => {
    if (Object.keys(inputVal).length > 0) {
      for (let i = 0; i < Object.keys(inputVal).length; i++) {
        var temp_dict = {};
        if (inputVal[Object.keys(inputVal)[i]].includes("&") || inputVal[Object.keys(inputVal)[i]].includes("%")) {
          inputVal[Object.keys(inputVal)[i]].slice(1)
          temp_dict[Object.keys(inputVal)[i]] = inputVal[Object.keys(inputVal)[i]].slice(1)
          if (temp_dict) {
            for (const key in temp_dict) {
              if (temp_dict[key] === '') {
                delete temp_dict[key];
              }
            }
          }
          const temp = currentPageRows.filter((props) => String(props[Object.keys(inputVal)[i]]) === String(temp_dict[Object.keys(inputVal)[i]]));
          setcurrentPageData(temp);
        }
        else {
          const filteredTable = currentPageRows.filter((props) =>
            Object.entries(inputVal).every(
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
    } else if (Object.keys(inputVal).length === 0) {
      setcurrentPageData(currentPageRows);
    }

    if (Object.keys(inputValMap).length > 0) {
      for (let i = 0; i < Object.keys(inputValMap).length; i++) {
        var temp_dict = {};
        if (inputValMap[Object.keys(inputValMap)[i]].includes("&") || inputValMap[Object.keys(inputValMap)[i]].includes("%")) {
          inputValMap[Object.keys(inputValMap)[i]].slice(1)
          temp_dict[Object.keys(inputValMap)[i]] = inputValMap[Object.keys(inputValMap)[i]].slice(1)
          if (temp_dict) {
            for (const key in temp_dict) {
              if (temp_dict[key] === '') {
                delete temp_dict[key];
              }
            }
          }
          const temp = currentPageRowsMap.filter((props) => String(props[Object.keys(inputValMap)[i]]) === String(temp_dict[Object.keys(inputValMap)[i]]));
          setcurrentPageDataMap(temp);
        }
        else {
          const filteredTable = currentPageRowsMap.filter((props) =>
            Object.entries(inputValMap).every(
              ([key, val]) =>
                !val.length ||
                props[key]
                  ?.toString()
                  .toLowerCase()
                  .includes(val?.toString().toLowerCase())
            )
          );
          setcurrentPageDataMap(filteredTable);
        }

      }
    } else if (Object.keys(inputValMap).length === 0) {
      setcurrentPageDataMap(currentPageRowsMap);
    }
  }, [inputVal, inputValMap]);
  // const resetFilter = () => {
  //   if (inputVal.length === 0) {
  //     setcurrentPageData(tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined));
  //     setInputVal([]);
  //   } else {
  //     setcurrentPageData(tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined));
  //     setInputVal([]);
  //   }
  // };
  const resetFilter = () => {
    setInputVal({})
  };
  const resetMapFilter = () => {
    setInputValMap({})
  };
  const gridFilter = (e) => {
    setInputVal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const gridFilterMap = (e) => {
    setInputValMap((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const InlineChangeMP = (e) => {
    if (Object.is(e, null) === false) {
      setInputValMap((prev) => ({ ...prev, "MAP_SIZE_PROF_IND": e.id, }))
    }
    if (Object.is(e, null) === true) {
      setInputValMap((prev) => ({ ...prev, "MAP_SIZE_PROF_IND": "", }))
    }
  }
  const handleMapSizePr = (e, index) => {

    const toggleMapSizeProfInd = (data, index) => {
      return data.map((obj) => {
        if (obj.SR_NO === index) {
          return {
            ...obj,
            MAP_SIZE_PROF_IND: e.target.checked ? 'Y' : 'N'
          };
        }
        return obj; // Return the original object if the condition is not satisfied
      });
    };
    const temp = toggleMapSizeProfInd(mapTableData, index);
    const currentTemp = toggleMapSizeProfInd(currentPageDataMap, index);
    setcurrentPageDataMap(currentTemp);
    setcurrentPageRowsMap(currentTemp);
    setMapTableData(temp);
  }
  /*
                      #########################################
                      ######### SORTING FUNCTIONALITY #########
                      #########################################
  */
  const [sortCheck, setSortCheck] = useState(false)
  const [sortValue, setSortValue] = useState("")
  const [sortMapCheck, setSortMapCheck] = useState(false)
  const [sortMapValue, setSortMapValue] = useState("")

  useEffect(() => {
    if (sortCheck) {
      if (order === "asc") {
        const sortedData = stableSort(currentPageData, getComparator("asc", sortValue));
        sortedData.forEach((item, index) => { tableData[startIndex + index] = item; });
        setcurrentPageData(sortedData);
      }
      if (order === "desc") {
        const sortedData = stableSort(currentPageData, getComparator("desc", sortValue));
        sortedData.forEach((item, index) => { tableData[startIndex + index] = item; });
        setcurrentPageData(sortedData);
      }
      setSortCheck(false)
    }
  }, [currentPageData, order, orderBy]);

  useEffect(() => {
    if (sortMapCheck) {
      if (orderM === "asc") {
        const sortedData = stableSort(currentPageDataMap, getComparator("asc", sortMapValue));
        sortedData.forEach((item, index) => { mapTableData[startIndexMap + index] = item; });
        setcurrentPageDataMap(sortedData);
      }
      if (orderM === "desc") {
        const sortedData = stableSort(currentPageDataMap, getComparator("desc", sortMapValue));
        sortedData.forEach((item, index) => { mapTableData[startIndexMap + index] = item; });
        setcurrentPageDataMap(sortedData);
      }
      setSortMapCheck(false)
    }
  }, [currentPageDataMap, orderM, orderMBy]);


  function descendingComparator(a, b, orderBy) {
    let c, d;
    if (orderBy == "ITEM") {
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
    // if (orderBy === "NO_OF_SIZES") {
    //   return order === 'desc'
    //     ? (a, b) => descendingComparator(a, b, "SKU_COUNT")
    //     : (a, b) => -descendingComparator(a, b, "SKU_COUNT");
    // }
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const handleRequestMapSort = (event, property) => {
    if (event) {
      setSortMapCheck(true)
      setSortMapValue(String(property))
    }
    const isAsc = (orderMBy === property && orderM === 'asc');
    setOrderM(isAsc ? 'desc' : 'asc');
    setOrderMBy(property);
  };
  const handleRequestSort = (event, property) => {
    if (event) {
      setSortCheck(true)
      setSortValue(String(property))
    }
    const isAsc = (orderBy === property && order === 'asc');
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
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
  function stableMapSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {

      const orderM = comparator(a[0], b[0]);
      if (orderM !== 0) {
        return orderM;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleCloseDialog = (e) => {
    setOpenDialogLIM(false);
    setDialogDataLIM("")
  }
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedMapRow, setSelectedMapRow] = useState(null);

  const handleRowClick = (rowId) => {
    setSelectedRow(rowId);
  };
  const handleMapRowClick = (rowId) => {
    setSelectedMapRow(rowId);
  };



  const searchPanel = () => (
    <Box
      sx={{ width: 430, marginTop: "80px", padding: "0px 0px 0px 20px" }}
    // role="presentation"
    // component="form"
    >
      {Like_Criteria1()}
    </Box>
  )

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const temp = tableData.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage)
      .filter(row => row !== undefined);
    setcurrentPageData(temp);
    setcurrentPageRows(temp);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePageMap = (event, newPage) => {
    setPageMap(newPage);
    const temp = mapTableData.slice(newPage * rowsPerPageMap, newPage * rowsPerPageMap + rowsPerPageMap)
      .filter(row => row !== undefined);
    setcurrentPageDataMap(temp);
    setcurrentPageRowsMap(temp);
  };

  const handleChangeRowsPerPageMap = (event) => {
    setRowsPerPageMap(parseInt(event.target.value, 10));
    setPageMap(0);
  };

  return (
    <Box >
      <div sx={{ display: "flex", flexDirection: "row" }}>
        <Grid id="top-row" container spacing={0}>
          <Box
            component="fieldset"
            display="inline-block"
            sx={{
              //backgroundColor: "",
              height: "auto",
              width: "100%",
              borderRadius: 1,
              //backgroundColor: "#F5F5F5",
              boxShadow: 2, border: 0,
              borderBottom: 3,
              border: "1px solid lightgrey",
            }}
          >
            <legend style={{ fontWeight: "bold", color: "#191970", }}>Header</legend>
            <div className={LikeItem.course_box}>
              {Header()}
            </div>

            <div className={LikeItem.course_box}>
              {HeaderButtons()}
            </div>
          </Box>

        </Grid>
      </div>

      {/* <div sx={{ display: "flex", flexDirection: "row" }}>
        <Grid id="top-row" container spacing={0}>
          <div className={LikeItem.course_box}>
            {Like_Criteria()}
          </div>
        </Grid>
      </div> */}
      <Box component="fieldset"
        display="flex"
        sx={{
          // marginLeft: "5px",
          marginTop: "5px",
          //backgroundColor: "#F5F5F5",
          borderRadius: 1,
          boxShadow: 2, border: 0,
          borderBottom: 3,
          //height:"fit-content"
          //backgroundColor:"blue"
        }}>
        <Box display="grid" sx={{ width: "100%", height: "fit-content" }}
          gridTemplateColumns="repeat(12, 2fr)" gap={1}
        >
          <Box gridColumn="span 4" //sx={{backgroundColor:"goldenrod",height:"100%"}}
          >
            <legend style={{ fontWeight: "bold", color: "#191970", padding: "5px 0px 1px 5px", }}>Allocated Items </legend>
            <Paper //sx={{ maxHeight: "100%", mb: 7 ,}}
            >
              {/* <Paper sx={{ width: '100%', mb: 0 }}> */}

              <TableContainer
                style={{ maxHeight: 530, borderRadius: '7px' }}
                className={LikeItem.TitleHead}
              >
                <Table
                  //sx={{ tableLayout: "fixed" }}
                  aria-label="customized table">
                  <Alloc_Grid
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={tableData.length}
                    onRequestSort={handleRequestSort}
                    order={order}
                    orderBy={orderBy}
                  />
                  <TableBody>

                    <TableCell padding="checkbox" sx={{ padding: "0px" }} >
                      <Grid item xs={0} style={{ padding: "0px", margin: "0px 0px 0px 0px" }}>
                        <IconButton small="small" sx={{ padding: "0px" }} onClick={resetFilter}>
                          <RestartAltIcon small="small" sx={{ padding: "0px" }} />
                        </IconButton>
                      </Grid>
                    </TableCell>

                    <TableCell sx={{
                      padding: "0px",
                    }}>
                      <TextField
                        name="ITEM"
                        onChange={gridFilter}
                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("ITEM") > 0 ? inputVal.ITEM : ""}
                        placeholder={allocHDetails.length > 0 && allocHDetails[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku"}
                        // label="Location"
                        autoComplete="off"
                        InputProps={{
                          sx: { fontSize: 12, padding: "0px", textAlign: "left", }
                        }}
                        sx={{
                          width: "100%"
                        }}
                        variant="standard"
                        inputProps={{
                          // maxLength: 5,
                          sx: {
                            fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                            "&::placeholder": { textAlign: "left", padding: "0px", },
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{
                      padding: "0px",
                    }}>
                      <TextField
                        name="ITEM_DESC"
                        onChange={gridFilter}
                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("ITEM_DESC") > 0 ? inputVal.ITEM_DESC : ""}
                        placeholder="Description"
                        // label="Location"
                        autoComplete="off"
                        InputProps={{
                          sx: { fontSize: 12, padding: "0px", textAlign: "left", }
                        }}
                        sx={{
                          width: "100%"
                        }}
                        variant="standard"
                        inputProps={{
                          // maxLength: 5,
                          sx: {
                            fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                            "&::placeholder": { textAlign: "left", padding: "0px", },
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{
                      padding: "0px",
                    }}>
                      <TextField
                        name="DIFF_ID"
                        onChange={gridFilter}
                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("DIFF_ID") > 0 ? inputVal.DIFF_ID : ""}
                        placeholder="Variant"
                        // label="Location"
                        autoComplete="off"
                        InputProps={{
                          sx: { fontSize: 12, padding: "0px", textAlign: "left", }
                        }}
                        sx={{
                          width: "100%"
                        }}
                        variant="standard"
                        inputProps={{
                          // maxLength: 5,
                          sx: {
                            fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                            "&::placeholder": { textAlign: "left", padding: "0px", },
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{
                      padding: "0px",
                    }}>
                      <TextField
                        name="NO_OF_SIZES"
                        onChange={gridFilter}
                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("NO_OF_SIZES") > 0 ? inputVal.NO_OF_SIZES : ""}
                        placeholder="No of Skus's"
                        // label="Location"
                        autoComplete="off"
                        InputProps={{
                          sx: { fontSize: 12, padding: "0px", textAlign: "left", }
                        }}
                        sx={{
                          width: "100%"
                        }}
                        variant="standard"
                        inputProps={{
                          // maxLength: 5,
                          sx: {
                            fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                            "&::placeholder": { textAlign: "left", padding: "0px", },
                          },
                        }}
                      />
                    </TableCell>


                  </TableBody>
                  <TableBody >

                    {currentPageData
                      // .length > 0 ?
                      //   stableSort(tableData, getComparator(order, orderBy))
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.SR_NO);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.SR_NO}
                            selected={isItemSelected}
                            sx={{ border: "1px solid red" }}
                            onClick={() => { handleRowClick(row.SR_NO) }}
                            style={selectedRow === row.SR_NO ? { backgroundColor: "#CDF0FF" } : null}
                          >
                            <TableCell
                              style={{
                                padding: "0px", width: "1%"
                              }}
                              align="center"
                            >

                              {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
                              <Checkbox
                                disabled={ApproveFreeseCheck}
                                onClick={(event) => handleClick(event, row?.SR_NO)}
                                color="primary"
                                size="small"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                                style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}

                              />
                              {/* </div> */}
                            </TableCell>

                            <TableCell align="left" style={{ padding: "0px", textAlign: "center", fontSize: "12px", width: "70px", whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'flex-start', whiteSpace: "nowrap" }}>
                                {row.ITEM}
                              </Box>
                            </TableCell>

                            {/* <TableCell
                                style={{
                                  padding: "0px"
                                }}
                                align="center"
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'left' // Add this line
                                  }}
                                >
                                  Chejdfgdhf
                                </div>
                              </TableCell> */}

                            <TableCell //align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, width: "130px" }}
                              sx={{ padding: "0px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
                              <Box
                                display="flex"
                                justifyContent="space-between"
                              //sx={{ border: 0, }}
                              >
                                <InputLabel
                                  sx={{
                                    paddingTop: "3px",
                                    fontSize: "12px",
                                    fontFamily: "system-ui",
                                    // fontWeight:"bold",
                                    color: "rgb(10, 10, 10)",
                                    paddingLeft: "2px",
                                    paddingRight: "0px",
                                    // width:"70px"
                                  }}
                                >

                                  {row.ITEM_DESC}
                                </InputLabel>
                                {/* <p>{String(row.ITEM_DESC).length > 0 && String(row.ITEM_DESC).length < 5 ?
                                    row.ITEM_DESC
                                    : String(row.ITEM_DESC).substring(0, 10) + "..."}</p> */}
                                <Button sx={{
                                  backgroundColor: "", '&:hover': {
                                    backgroundColor: "",
                                  }, border: 0, color: "CadetBlue"
                                }}
                                  style={{
                                    maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start"
                                  }}
                                  size='small'
                                  className={LikeItem.textField}
                                  onClick={() => {
                                    setOpenDialogLIM(true);
                                    setDialogDataLIM(String(row.ITEM_DESC));
                                  }}


                                  startIcon={<InfoIcon style={{ fontSize: 16 }} />}
                                >
                                </Button>
                              </Box>
                            </TableCell>
                            <TableCell  //sx={{ fontFamily: "system-ui", fontSize: "75%", padding: 0,justifyContent: "left"}} 
                              //sx={{ padding: "0px", fontSize: "12px", justifyContent: "flext-start",width:"120px" }}
                              sx={{ padding: "0px", textAlign: "center", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100px', paddingLeft: "2px", }}
                            >
                              {/* <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                {row.DIFF_ID}</Box> */}
                              {row.DIFF_ID}
                              {/* <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  sx={{ border: 0 }}
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
                                      //width:"60px"
                                    }}
                                  >
                                    {row.DIFF_ID}
                                  </InputLabel>
                                  <Button sx={{
                                    backgroundColor: "", '&:hover': {
                                      backgroundColor: "",
                                    }, border: 0, color: "CadetBlue"
                                  }}
                                    style={{
                                      maxWidth: '25px', minWidth: '25px',// justifyContent: "flex-start"
                                    }}
                                    size='small'
                                    className={LikeItem.textField}
                                    onClick={() => {
                                      swal(
                                        <div>
                                          <p>{row.DIFF_ID}</p>
                                        </div>
                                      )
                                    }}
                                    startIcon={<InfoIcon style={{ fontSize: 16 }} />}
                                  >
                                  </Button>
                                </Box> */}
                            </TableCell>
                            <TableCell //align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"
                              sx={{ padding: "0px", textAlign: "center", fontSize: "12px", width: "70px" }}
                            >
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                sx={{ border: 0, }} >
                                <InputLabel
                                  sx={{
                                    paddingTop: "3px",
                                    fontSize: "12px",
                                    fontFamily: "system-ui",
                                    // fontWeight:"bold",
                                    color: "rgb(10, 10, 10)",
                                    paddingLeft: "5px",
                                    paddingRight: "0px",
                                    width: "fit-content"
                                  }}
                                >
                                  {row.NO_OF_SIZES}
                                </InputLabel>
                                {/* //<p> &nbsp;{row.NO_OF_SIZES}</p> */}
                                <Button sx={{
                                  backgroundColor: "", '&:hover': {
                                    backgroundColor: "",
                                  }, border: 0, color: "CadetBlue"
                                }}
                                  style={{
                                    maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start"
                                  }}
                                  size='small'
                                  className={LikeItem.textField}
                                  onClick={() => {
                                    setOpenDialogLIM(true);
                                    setDialogDataLIM(String(row.DIFFS));
                                  }}









                                  startIcon={<InfoIcon style={{ fontSize: 16 }} />}
                                >
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow >
                        );
                      })
                      // : false
                    }
                    {currentPageData.length < 19 ?
                      [...Array(19 - (currentPageData.length)).keys()].map(val => (
                        <TableRow >
                          <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%", height: "25px" }}>
                            <Checkbox style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                              color="primary" size="small" disabled={true} />
                          </TableCell>

                          <TableCell align="left" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                          <TableCell align="left" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                          <TableCell align="left" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                          <TableCell align="left" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                        </TableRow>
                      )) : false
                    }
                  </TableBody>

                </Table>
              </TableContainer>
              {//tableData.length > 0 ?
                <div style={{ display: 'flex', alignItems: '', justifyContent: "space-between", }}>
                  <span
                    style={{
                      margin: '13px 0px 0px 15px', fontSize: '14px',
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    {/* {Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))
                                                                ? "Selected : " + String(selected[0][page].length)
                                                                : null} */}
                    {Object.keys(selected[0]).length > 0 ? "Selected: " + String(allPageSelected.length) : null}
                  </span>
                  <div>
                    <div className={LikeItem.header_child}>
                      <span
                        style={{
                          margin: '13px 0px 0px 15px', fontSize: '14px',
                          fontFamily: 'Arial, sans-serif',
                        }}
                      >
                        {/* {"Total Selected: " + String(allPageSelected.length)} */}
                      </span>
                    </div>
                    <div className={LikeItem.header_child}>
                      <TablePagination
                        rowsPerPageOptions={[30]}
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                          '& .MuiToolbar-root': { minHeight: '20px', }, //border: "1px solid red"
                        }}
                      />
                    </div>
                  </div>
                </div>
                //: null
              }
            </Paper>
            {/* {selected.length > 0 ? <EnhancedTableToolbar numSelected={selected.length} /> : false} */}
          </Box>


          <Box gridColumn="span 8">
            <legend style={{ fontWeight: "bold", color: "#191970", backgroundColor: "", display: "flex", justifyContent: "space-between", }}>
              <div style={{ paddingTop: "5px", paddingBottom: "0px", }}>Mapped Items</div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div
                  style={{
                    // flex: "1",
                    backgroundColor: isSHovered ? '#f5f5f5' : 'white',
                    borderRadius: '20%',
                    padding: "0px 8px 0px 8px",
                    margin: "0px 0px 0px 2px", height: "30px", minHeight: "30px",
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
                    }}
                    title="Search"
                  />
                </div>

                <div
                  style={{
                    // flex: "1",
                    backgroundColor: isSHovered1 ? '#f5f5f5' : 'white',
                    borderRadius: '20%',
                    padding: "0px 8px 0px 8px",
                    margin: "0px 0px 0px 2px",
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
              {/* </Box> */}
            </legend>


            <Paper // sx={{ border:"1px solid red"}}
            >
              {/* <EnhancedTableToolbarMap numMapSelected={selectedMap.length} /> */}
              <TableContainer
                // sx={{ height: "fit-content", maxHeight: "39vh", borderRadius: '10px', }} 
                // component={Paper}
                style={{ maxHeight: 530, borderRadius: '7px' }}
                className={LikeItem.TitleHead}
              >
                <Table //</TableContainer>sx={{ minWidth: "auto", }} 
                  //sx={{backgroundColor:"yellow"}}
                  aria-label="customized table">
                  <Mapped_Grid
                    numMapSelected={selectedMap.length}
                    onSelectMapAllClick={handleMapSelectAllClick}
                    rowCountM={mapTableData.length}
                    onRequestMapSort={handleRequestMapSort}
                    orderM={orderM}
                    orderMBy={orderMBy}
                  />
                  <TableBody>
                    <TableCell padding="checkbox" sx={{ padding: "0px" }} >
                      <Grid item xs={0} style={{ padding: "0px", margin: "0px 0px 0px 0px" }}>
                        <IconButton small="small" sx={{ padding: "0px" }} onClick={resetMapFilter}>
                          <RestartAltIcon small="small" sx={{ padding: "0px" }} />
                        </IconButton>
                      </Grid>
                    </TableCell>
                    {ManageHeaderData.includes('ITEM') ?
                      <TableCell sx={{
                        padding: "0px",
                      }}>
                        <TextField
                          name="ITEM"
                          onChange={gridFilterMap}
                          value={Object.keys(inputValMap).length > 0 && Object.keys(inputValMap).includes("ITEM") > 0 ? inputValMap.ITEM : ""}
                          placeholder={allocHDetails.length > 0 && allocHDetails[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku"}
                          // label="Location"
                          autoComplete="off"
                          InputProps={{
                            sx: { fontSize: 12, padding: "0px", textAlign: "left", }
                          }}
                          sx={{
                            width: "100%"
                          }}
                          variant="standard"
                          inputProps={{
                            // maxLength: 5,
                            sx: {
                              fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                              "&::placeholder": { textAlign: "left", padding: "0px", },
                            },
                          }}
                        />
                      </TableCell>
                      : null}
                    {ManageHeaderData.includes('ITEM_DESC') ?
                      <TableCell sx={{
                        padding: "0px",
                      }}>
                        <TextField
                          name="ITEM_DESC"
                          onChange={gridFilterMap}
                          value={Object.keys(inputValMap).length > 0 && Object.keys(inputValMap).includes("ITEM_DESC") > 0 ? inputValMap.ITEM_DESC : ""}
                          placeholder="Description"
                          // label="Location"
                          autoComplete="off"
                          InputProps={{
                            sx: { fontSize: 12, padding: "0px", textAlign: "left", }
                          }}
                          sx={{
                            width: "100%"
                          }}
                          variant="standard"
                          inputProps={{
                            // maxLength: 5,
                            sx: {
                              fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                              "&::placeholder": { textAlign: "left", padding: "0px", },
                            },
                          }}
                        />
                      </TableCell>
                      : null}


                    {ManageHeaderData.includes('DIFF_ID') ?
                      <TableCell sx={{
                        padding: "0px",
                      }}>
                        <TextField
                          name="DIFF_ID"
                          onChange={gridFilterMap}
                          value={Object.keys(inputValMap).length > 0 && Object.keys(inputValMap).includes("DIFF_ID") > 0 ? inputValMap.DIFF_ID : ""}
                          placeholder="Variant"
                          // label="Location"
                          autoComplete="off"
                          InputProps={{
                            sx: { fontSize: 12, padding: "0px", textAlign: "left", }
                          }}
                          sx={{
                            width: "100%"
                          }}
                          variant="standard"
                          inputProps={{
                            // maxLength: 5,
                            sx: {
                              fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                              "&::placeholder": { textAlign: "left", padding: "0px", },
                            },
                          }}
                        />
                      </TableCell>
                      : null}



                    {ManageHeaderData.includes('LIKE_ITEM') ?
                      <TableCell sx={{
                        padding: "0px",
                      }}>
                        <TextField
                          name="LIKE_ITEM"
                          onChange={gridFilterMap}
                          value={Object.keys(inputValMap).length > 0 && Object.keys(inputValMap).includes("LIKE_ITEM") > 0 ? inputValMap.LIKE_ITEM : ""}
                          placeholder={"Like" + "\u00A0" + "Item"}
                          // label="Location"
                          autoComplete="off"
                          InputProps={{
                            sx: { fontSize: 12, padding: "0px", textAlign: "left", }
                          }}
                          sx={{
                            width: "100%"
                          }}
                          variant="standard"
                          inputProps={{
                            // maxLength: 5,
                            sx: {
                              fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                              "&::placeholder": { textAlign: "left", padding: "0px", },
                            },
                          }}
                        />
                      </TableCell>
                      : null}

                    {ManageHeaderData.includes('LIKE_ITEM_DESC') ?
                      <TableCell sx={{
                        padding: "0px",
                      }}>
                        <TextField
                          name="LIKE_ITEM_DESC"
                          onChange={gridFilterMap}
                          value={Object.keys(inputValMap).length > 0 && Object.keys(inputValMap).includes("LIKE_ITEM_DESC") > 0 ? inputValMap.LIKE_ITEM_DESC : ""}
                          placeholder={"Like" + "\u00A0" + "Item" + "\u00A0" + "Desc"}
                          // label="Location"
                          autoComplete="off"
                          InputProps={{
                            sx: { fontSize: 12, padding: "0px", textAlign: "left", }
                          }}
                          sx={{
                            width: "100%"
                          }}
                          variant="standard"
                          inputProps={{
                            // maxLength: 5,
                            sx: {
                              fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                              "&::placeholder": { textAlign: "left", padding: "0px", },
                            },
                          }}
                        />
                      </TableCell>
                      : null}
                    {ManageHeaderData.includes('LIKE_ITEM_DIFF_ID') ?
                      <TableCell sx={{
                        padding: "0px",
                      }}>
                        <TextField
                          name="LIKE_ITEM_DIFF_ID"
                          onChange={gridFilterMap}
                          value={Object.keys(inputValMap).length > 0 && Object.keys(inputValMap).includes("LIKE_ITEM_DIFF_ID") > 0 ? inputValMap.LIKE_ITEM_DIFF_ID : ""}
                          placeholder={"Like" + "\u00A0" + "Item" + "\u00A0" + "Variant"}
                          // label="Location"
                          autoComplete="off"
                          InputProps={{
                            sx: { fontSize: 12, padding: "0px", textAlign: "left", }
                          }}
                          sx={{
                            width: "100%"
                          }}
                          variant="standard"
                          inputProps={{
                            // maxLength: 5,
                            sx: {
                              fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                              "&::placeholder": { textAlign: "left", padding: "0px", },
                            },
                          }}
                        />
                      </TableCell>
                      : null}

                    {ManageHeaderData.includes('WEIGHT%') ?
                      <TableCell sx={{
                        padding: "0px",
                      }}>
                        <TextField
                          name="WEIGHT"
                          onChange={gridFilterMap}
                          value={Object.keys(inputValMap).length > 0 && Object.keys(inputValMap).includes("WEIGHT") > 0 ? inputValMap["WEIGHT"] : ""}
                          placeholder={"Weight%"}
                          // label="Location"
                          autoComplete="off"
                          InputProps={{
                            sx: { fontSize: 12, padding: "0px", textAlign: "left", }
                          }}
                          sx={{
                            width: "100%"
                          }}
                          variant="standard"
                          inputProps={{
                            // maxLength: 5,
                            sx: {
                              fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                              "&::placeholder": { textAlign: "left", padding: "0px", },
                            },
                          }}
                        />
                      </TableCell>
                      : null}

                    {ManageHeaderData.includes('MAP_SIZE_PR') ?
                      <TableCell sx={{
                        padding: "0px",
                      }}>
                        <Select
                          classNamePrefix="mySelect"
                          getOptionLabel={option =>
                            `${option.id.toString()}`}
                          getOptionValue={option => option.id}
                          options={MapProfile}
                          isSearchable={true}
                          isClearable={true}
                          placeholder="Map.."
                          onChange={InlineChangeMP}
                          maxMenuHeight={180}
                          styles={styleSelect4}
                          value={MapProfile.filter(obj => inputValMap?.MAP_SIZE_PROF_IND === (obj.id))}
                        />
                      </TableCell>
                      : null}



                  </TableBody>
                  <TableBody >
                    {currentPageDataMap
                      // .length > 0 ?
                      //   stableMapSort(mapTableData, getComparator(orderM, orderMBy))
                      .map((row, index) => {
                        const isItemSelected = isMapSelected(row.SR_NO);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            //sx={{backgroundColor:"green",border:"5px solid black"}}
                            tabIndex={-1}
                            key={row.SR_NO}
                            selected={isItemSelected}
                            onClick={() => { handleMapRowClick(row.SR_NO) }}
                            style={selectedMapRow === row.SR_NO ? { backgroundColor: "#CDF0FF" } : null}
                          >
                            <TableCell

                              sx={{ padding: "0px", width: "1%" }}

                              align="center"
                            >
                              {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}

                              <Checkbox
                                disabled={ApproveFreeseCheck}
                                onClick={(event) => handleMapClick(event, row?.SR_NO)}
                                size="small"
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                                style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }} />

                              {/* </div> */}
                            </TableCell>
                            {ManageHeaderData.includes('ITEM') ?
                              <TableCell align="left" style={{ padding: "0px", textAlign: "center", fontSize: "12px", width: "70px", whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', whiteSpace: "nowrap" }}>
                                  {row.ITEM}
                                </Box>
                              </TableCell> : null}
                            {ManageHeaderData.includes('ITEM_DESC') ?
                              <TableCell //align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, width: "130px" }}
                                sx={{ padding: "0px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                //sx={{ border: 0, }}
                                >
                                  <InputLabel
                                    sx={{
                                      paddingTop: "3px",
                                      fontSize: "12px",
                                      fontFamily: "system-ui",
                                      // fontWeight:"bold",
                                      color: "rgb(10, 10, 10)",
                                      paddingLeft: "2px",
                                      paddingRight: "0px",
                                      // width:"70px"
                                    }}
                                  >
                                    {row.ITEM_DESC}
                                  </InputLabel>
                                  <Button sx={{
                                    backgroundColor: "", '&:hover': {
                                      backgroundColor: "",
                                    }, border: 0, color: "CadetBlue"
                                  }}
                                    style={{
                                      maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start"
                                    }}
                                    size='small'
                                    className={LikeItem.textField}
                                    onClick={() => {
                                      setOpenDialogLIM(true);
                                      setDialogDataLIM(String(row.ITEM_DESC));
                                    }}
                                    startIcon={<InfoIcon style={{ fontSize: 16 }} />}
                                  >
                                  </Button>
                                </Box>
                              </TableCell> : null}
                            {ManageHeaderData.includes('DIFF_ID') ?
                              <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100px' }}
                              >
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  sx={{ border: 0 }}
                                >
                                  <InputLabel
                                    sx={{
                                      paddingTop: "3px",
                                      fontSize: "12px",
                                      fontFamily: "system-ui",
                                      // fontWeight:"bold",
                                      color: "rgb(10, 10, 10)",
                                      paddingLeft: "2px",
                                      paddingRight: "0px",
                                      //width:"60px"
                                    }}
                                  >
                                    {row.DIFF_ID}
                                  </InputLabel>
                                  <Button sx={{
                                    backgroundColor: "", '&:hover': {
                                      backgroundColor: "",
                                    }, border: 0, color: "CadetBlue"
                                  }}
                                    style={{
                                      maxWidth: '25px', minWidth: '25px',// justifyContent: "flex-start"
                                    }}
                                    size='small'
                                    className={LikeItem.textField}
                                    onClick={() => {
                                      setOpenDialogLIM(true);
                                      setDialogDataLIM(String(row.DIFF_ID));
                                    }}
                                    startIcon={<InfoIcon style={{ fontSize: 16 }} />}
                                  >
                                  </Button>
                                </Box>
                              </TableCell> : null}
                            {ManageHeaderData.includes('LIKE_ITEM') ?
                              <TableCell align="left" style={{ padding: "0px", textAlign: "center", fontSize: "12px", width: "70px", whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', whiteSpace: "nowrap" }}>
                                  {row.LIKE_ITEM}</Box>
                              </TableCell> : null}
                            {ManageHeaderData.includes('LIKE_ITEM_DESC') ?
                              <TableCell //align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, width: "130px" }}
                                sx={{ padding: "0px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                //sx={{ border: 0, }}
                                >
                                  <InputLabel
                                    sx={{
                                      paddingTop: "3px",
                                      fontSize: "12px",
                                      fontFamily: "system-ui",
                                      // fontWeight:"bold",
                                      color: "rgb(10, 10, 10)",
                                      paddingLeft: "2px",
                                      paddingRight: "0px",
                                      // width:"70px"
                                    }}
                                  >
                                    {row.LIKE_ITEM_DESC}
                                  </InputLabel>
                                  <Button sx={{
                                    backgroundColor: "", '&:hover': {
                                      backgroundColor: "",
                                    }, border: 0, color: "CadetBlue"
                                  }}
                                    style={{
                                      maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start"
                                    }}
                                    size='small'
                                    className={LikeItem.textField}
                                    onClick={() => {
                                      setOpenDialogLIM(true);
                                      setDialogDataLIM(String(row.LIKE_ITEM_DESC));
                                    }}
                                    startIcon={<InfoIcon style={{ fontSize: 16 }} />}
                                  >
                                  </Button>
                                </Box>
                              </TableCell> : null}
                            {ManageHeaderData.includes('LIKE_ITEM_DIFF_ID') ?
                              <TableCell
                                sx={{
                                  padding: "0px", textAlign: "left", fontSize: "12px",
                                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                  width: '70px'
                                }}
                              >
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                //sx={{ border: 0, }}
                                >
                                  <InputLabel
                                    sx={{
                                      paddingTop: "3px",
                                      fontSize: "12px",
                                      fontFamily: "system-ui",
                                      // fontWeight:"bold",
                                      color: "rgb(10, 10, 10)",
                                      paddingLeft: "2px",
                                      paddingRight: "0px",
                                      //width:"50px"
                                    }}
                                  >
                                    {row.LIKE_ITEM_DIFF_ID}
                                  </InputLabel>
                                  <Button sx={{
                                    backgroundColor: "", '&:hover': {
                                      backgroundColor: "",
                                    }, border: 0, color: "CadetBlue"
                                  }}
                                    style={{
                                      maxWidth: '25px', minWidth: '25px',// justifyContent: "flex-start"
                                    }}
                                    size='small'
                                    className={LikeItem.textField}
                                    onClick={() => {
                                      setOpenDialogLIM(true);
                                      setDialogDataLIM(String(row.LIKE_ITEM_DIFF_ID));
                                    }}
                                    startIcon={<InfoIcon style={{ fontSize: 16 }} />}
                                  >
                                  </Button>
                                </Box>
                              </TableCell> : null}
                            {ManageHeaderData.includes('WEIGHT%') ?
                              <TableCell align="left" style={{
                                padding: "0px", textAlign: "center",
                                fontSize: "12px", width: "70px", whiteSpace: "nowrap", overflow: 'hidden',
                                textOverflow: 'ellipsis', maxWidth: '100px'
                              }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', whiteSpace: "nowrap" }}>

                                  {row.WEIGHT}</Box>
                              </TableCell> : null}
                            {ManageHeaderData.includes('MAP_SIZE_PR') ?
                              <TableCell padding="checkbox" sx={{ padding: "0px", }}>
                                <Checkbox style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                  color="primary" size="small"
                                  checked={row.MAP_SIZE_PROF_IND === 'Y'}
                                  onClick={(e) => handleMapSizePr(e, row.SR_NO)}
                                  disabled={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_LEVEL_CODE === "T" : false} />
                              </TableCell> : null}
                          </TableRow>
                        );
                      })
                      //: null
                    }
                    {currentPageDataMap.length < 19 ?
                      [...Array(19 - (currentPageDataMap.length)).keys()]
                        .map(val => (
                          <TableRow
                          // sx={{'&.MuiTableRow-root': {
                          //   height: '30px', // adjust the height to your desired value
                          // },}}
                          >
                            <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%", height: "25px" }}>
                              <Checkbox
                                style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                color="primary" size="small" disabled={true} />
                            </TableCell>

                            {
                              ManageHeaderData.map((row, index) => {
                                if (!(row === "MAP_SIZE_PR" && allocHDetails.length > 0 && allocHDetails[0].ALLOC_LEVEL_CODE === 'T')) {
                                  return (
                                    <TableCell
                                      key={index}
                                      align="right"
                                      sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}
                                    >
                                      {/* Content of the TableCell */}
                                    </TableCell>
                                  );
                                } else {
                                  return null; // Exclude the component from rendering
                                }
                              })
                            }
                            {/* <TableCell align="left" sx={{ padding: "0px", textAlign: "left", fontSize: "11px", }}></TableCell>
                            <TableCell align="left" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                            <TableCell align="left" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                            <TableCell align="left" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                            <TableCell align="left" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                            <TableCell align="left" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                            <TableCell align="left" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                            <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}> */}
                            {/* <Checkbox sx={{ padding: "3px 0px 3px 0px" }} color="primary" size="small" disabled={true} /> */}
                            {/* </TableCell> */}

                          </TableRow>
                        )) : false
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              {//mapTableData.length > 0 ?
                <div style={{ display: 'flex', alignItems: '', justifyContent: "space-between", }}>
                  <span
                    style={{
                      margin: '13px 0px 0px 15px', fontSize: '14px',
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    {/* {Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))
                                                                ? "Selected : " + String(selected[0][page].length)
                                                                : null} */}
                    {Object.keys(selectedMap[0]).length > 0 ? "Selected: " + String(allPageSelectedMap.length) : null}
                  </span>
                  <div>
                    <div className={LikeItem.header_child}>
                      <span
                        style={{
                          margin: '13px 0px 0px 15px', fontSize: '14px',
                          fontFamily: 'Arial, sans-serif',
                        }}
                      >
                        {/* {"Total Selected: " + String(allPageSelected.length)} */}
                      </span>
                    </div>
                    <div className={LikeItem.header_child}>
                      <TablePagination
                        rowsPerPageOptions={[30]}
                        component="div"
                        count={mapTableData.length}
                        rowsPerPage={rowsPerPageMap}
                        page={pageMap}
                        onPageChange={handleChangePageMap}
                        onRowsPerPageChange={handleChangeRowsPerPageMap}
                        sx={{ '& .MuiToolbar-root': { minHeight: '20px', }, }}
                      />
                    </div>
                  </div>
                </div>
                //: null
              }
            </Paper>

            {/* {selectedMap.length > 0 ? <EnhancedTableToolbarMap numMapSelected={selectedMap.length} /> : false} */}
            {/* {selectedMap.length > 0 ? <br></br>:false} */}
            <br></br>
            <></>
          </Box>
          <Box
            //display="static" 
            justifyContent="right"
            sx={{ border: 0, justifyContent: "end", }}>
            <Button
              disabled={ApproveFreeseCheck}
              sx={selectedMap.length === 0 ? {
                position: 'absolute',
                bottom: 10, right: 22,
                backgroundColor: "maroon", '&:hover': {
                  backgroundColor: "maroon", boxShadow: 3
                }, borderRadius: '16px', paddingRight: "10px",
                '&.Mui-disabled': {
                  opacity: 0.5,
                  backgroundColor: 'DodgerBlue',
                  color: '#fff',
                },
              } :
                {
                  position: 'absolute',
                  bottom: 10, right: 22,
                  backgroundColor: "maroon", '&:hover': {
                    backgroundColor: "maroon", boxShadow: 3
                  }, borderRadius: '16px', paddingRight: "10px",
                  '&.Mui-disabled': {
                    opacity: 0.5,
                    backgroundColor: 'DodgerBlue',
                    color: '#fff',
                  },
                }}
              variant="contained"
              size='medium'
              className={LikeItem.textField}
              type="submit"
              onClick={handleDelete}
              startIcon={<DeleteSweepIcon />}
            />
          </Box>

        </Box>

      </Box>
      <div>
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openDialogLIM}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          disableBackdropClick
        >
          <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px", }}></DialogTitle>
          <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", }} >
            {DialogDataLIM}
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
          <DialogContent id="draggable-dialog-title" sx={{
            fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", height: "240px", margin: "0px 10px 0px 0px",
            '&::-webkit-scrollbar': { width: '8px', height: "8px" },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#bdbdbd', borderRadius: '4px', },
            '&::-webkit-scrollbar-track': { backgroundColor: '#f5f5f5', borderRadius: '4px', },
          }} >
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
    </Box>
  )
}
export default LikeItemMap;