import React, { useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import MuiAlert from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import { makeStyles } from "@mui/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Select from 'react-select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
// import SearchTableData from "../Search";
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AnimationIcon from '@mui/icons-material/Animation';
import ReportIcon from '@mui/icons-material/Report';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from "@mui/material/CircularProgress";
import {
    getWarehouseRequest,
    getPACKNORequest,
    getDIFFRequest,
    getSKURequest,
    getVPNRequest,
    getPORequest,
    getHIERRequest,
    getCONTEXT_TYPERequest,
    getPROMOTIONRequest,
    getALLOC_CRITERIARequest,
    getITEMPARENTRequest,
    getHIER2Request,
    getHIER3Request,
    getASNRequest,
    getTSFRequest,
    postCOMMITDATARequest
} from "../../Redux/Action/createAllocation";
import {
    getAllStsRequest,
    postAllocIdsRequest,
    postSearchASYRequest,
    postValidASYRequest,
    postCopyASYRequest,
    postMAPRVRequest,
} from "../../Redux/Action/allocSummary";
import swal from '@sweetalert/with-react';
import CreateAllocation from "../CreateScreen/index"
import InfoIcon from '@mui/icons-material/Info';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from 'react-draggable';
import { useNavigate, Outlet } from "react-router-dom";
import Radio from '@mui/material/Radio';
import Drawer from "@mui/material/Drawer";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import TablePagination from '@mui/material/TablePagination';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { BsFillEraserFill } from 'react-icons/bs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import { css } from '@emotion/react';
import { red } from "@material-ui/core/colors";
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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const swalStyles = makeStyles((theme) => ({
    mySwal: {
        // position: 'fixed',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
    },
    myPopup: {
        width: '100px !important',
        height: '100px !important',
    },

    button: {
        backgroundColor: "#228B22",//theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: 'bold',
        //borderRadius: '4px',
        //padding: '0.5rem 1rem',
        // minWidth: '8rem',
        // margin: '1rem',
        fontSize: "12px",
        //backgroundColor: "#228B22",
        padding: "5px", fontFamily: "system-ui",
        width: "100px",
        //marginLeft: "5px", marginTop: "2px",
    },
    cancelButton: {
        //backgroundColor: "red",//theme.palette.primary.main,
        color: theme.palette.common.white,
        // fontWeight: 'bold',
        // borderRadius: '4px',
        // //padding: '0.5rem 1rem',
        // minWidth: '8rem',
        // margin: '1rem',
        fontSize: "12px",
        backgroundColor: "maroon",
        padding: "5px", fontFamily: "system-ui",
        width: "100px",// marginLeft: "5px", marginTop: "2px",
    },
    title: {
        fontSize: "25px",
        //fontWeight: "bold",
        fontFamily: "system-ui",
    },

}));
const useStyles = makeStyles({
    tableRow: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "red",
        },
    },
    maindiv: {
        position: "relative",
        // backgroundColor:"yellow",
        //  paddingTop:"75px",
        margin: "75px 0px 0px 0px",
        width: "calc(95vw - 0px)",
        "& table": {
            "& tr": {
                "& td:nth-child(26)": {
                    display: "none",
                },
                "& td:nth-child(27)": {
                    display: "none",
                },
                "& td:nth-child(28)": {
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
    TitleHead: {
        // height: "25px",
        position: "sticky",
        top: -1,
        width: "100%",
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
        // backgroundColor:"#f0f0f0",
        '& input + fieldset': {
            // borderColor: 'gray',
            // borderRadius: "0",
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
    header_container: {
        display: "inline-block",
        width: "100%",
    },
    header_child: {
        display: "inline-block",
        // border: "1px solid red",
        padding: "0rem 0.2rem",
        verticalAlign: "middle",
    },
    inputtable: {
        height: "30px"
    },
    float_child: {
        display: "inline-block",
        // border: "1px solid blue",
        marginBottom: "0.1rem",
        marginLeft: "0.5rem"
        // padding: "0rem 0rem",
        // verticalAlign: "middle",
    },
    sample: {
        border: "1px solid red"
    },
    TableCell: {
        color: "#fff",
        padding: "6px 6px !important",
        lineHeight: "1.2rem !important",
    },
    TitleRow: {
        height: 15,
        width: "100%",
    },
    inputPlaceHolder: {
        // border:"1px solid red",
        "&::placeholder": {
            color: "red",
            textAlign: "left"
        }
    },
    course_box: {
        // backgroundColor:"lightgray"
        // border:"2px solid red",
    },
    TableBody: {
        marginBottom: "0px"
    },
    grid_block: {
        // backgroundColor:"lightgray"
    },
    TableTotalBoby: {
        // border:"1px solid red",
        padding: "0px",
        margin: "0px",
    },
    multiselectfield: {
        display: "inline-block",
        // border: "1px solid red",
        margin: "0rem",
        padding: "0rem 0rem",
        verticalAlign: "Top",
    },
    testdiv: {
        marginLeft: "0rem",
    }, backdrop: {
        zIndex: 999,
        color: '#fff',
    },

});
const styleSelect = {
    control: base => ({
        ...base,
        width: "180px",
        fontSize: "13px",
        // height:"25px",
        minHeight: "30px",
        marginBottom: "0px",
        paddingBottom: '0px',
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
    }), menu: provided => ({ ...provided, zIndex: 9999 }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
        // border:"1px solid pink"
    })
};


const SearchResultsHeader = [
    { id: "ALLOC_NO", label: "Alloc No" },
    { id: "ALLOC_DESC", label: "Description" },
    { id: "DOC_TYPE", label: "Alloc Criteria" },
    { id: "ALLOC_LEVEL_CODE", label: "Alloc Level" },
    { id: "DTLCOUNT", label: "# of Rec" },
    { id: "LOCCOUNT", label: "# of Loc" },
    { id: "CONTEXT", label: "Context" },
    { id: "PROMOTION", label: "Promotion" },
    { id: "RELEASE_DATE", label: "Release Date" },
    { id: "STATUS", label: "Status" },
    { id: "CALC_STATUS", label: "Calc Req Status" },
    { id: "CREATED_BY_USER_ID", label: "Create ID" },
    { id: "CREATED_DATE", label: "Create Date" },
    { id: "ALLOCATED_QTY", label: "Allocated Qty" },
    { id: "SELECTED_QTY", label: "Selected Qty" },
    { id: "SHIPPED_QTY", label: "Shipped Qty" },
    { id: "CANCELED_QTY", label: "Canceled Qty" },
    { id: "RECEIVED_QTY", label: "Received Qty" },
]
const initialData = {
    ALLOC_NO: "",
    ALLOC_DESC: "",
    RELEASE_DATE_TO: "",
    RELEASE_DATE_FROM: "",
    CREATE_DATE_TO: "",
    CREATE_DATE_FROM: "",
    STATUS: [],
    ALLOCATOR: "",
    SOURCE: "",
    CONTEXT: "",
    PROMOTION: "",
    HIER1: "",
    HIER2: "",
    HIER3: "",
    WH: "",
    SUPPLIER: "",
    SUPPLIER_SITE: "",
    PACK_NO: "",
    ITEM_PARENT: "",
    DIFF_ID: "",
    SKU: "",
    VPN: "",
    ALLOC_TYPE: "A",
    WH: "",
    PO: "",
    TSF: "",
    ASN: "",
    BATCH: "N"

}

const tempTableData = [
    {
        "SELECTED": "", "ALLOC_NO": 1064, "ALLOC_DESC": "Allocation test1", "CONTEXT": "SALES", "PROMOTION": "", "ALLOCATED_QTY": "69", "CANCELED_QTY": "", "RECEIVED_QTY": "",
        "SHIPPED_QTY": "", "STATUS_CODE": "WS", "STATUS": "Worksheet", "RELEASE_DATE": "2023-02-22", "CREATED_DATE": "2023-02-22", "CREATED_BY_USER_ID": "Admin",
        "DTLCOUNT": 3.0, "LOCCOUNT": 4.0, "DOC_TYPE": "W", "SELECTED_QTY": "", "ALLOC_LEVEL_CODE": "Sku", "CALC_STATUS": "Online"
    },
    {
        "SELECTED": "", "ALLOC_NO": 1065, "ALLOC_DESC": "Allocation test2", "CONTEXT": "SALES", "PROMOTION": "", "ALLOCATED_QTY": "60", "CANCELED_QTY": "", "RECEIVED_QTY": "",
        "SHIPPED_QTY": "", "STATUS_CODE": "WS", "STATUS": "Worksheet", "RELEASE_DATE": "2023-02-22", "CREATED_DATE": "2023-02-22", "CREATED_BY_USER_ID": "Admin",
        "DTLCOUNT": 3.0, "LOCCOUNT": 4.0, "DOC_TYPE": "W", "SELECTED_QTY": "", "ALLOC_LEVEL_CODE": "Style Diff", "CALC_STATUS": "Online"
    },
    {
        "SELECTED": "", "ALLOC_NO": 1607, "ALLOC_DESC": "Allocation test4", "CONTEXT": "SALES", "PROMOTION": "", "ALLOCATED_QTY": "25", "CANCELED_QTY": "", "RECEIVED_QTY": "",
        "SHIPPED_QTY": "", "STATUS_CODE": "WS", "STATUS": "PO Create", "RELEASE_DATE": "2023-02-22", "CREATED_DATE": "2023-02-22", "CREATED_BY_USER_ID": "Admin",
        "DTLCOUNT": 3.0, "LOCCOUNT": 4.0, "DOC_TYPE": "W", "SELECTED_QTY": "", "ALLOC_LEVEL_CODE": "Style Diff", "CALC_STATUS": "Online"
    }
]
const AllocSummary = ({ DashSearch }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AllocSummaryData = useSelector(
        (state) => state.CreateAllocationReducers
    );
    const AllocSummaryData1 = useSelector(
        (state) => state.AllocationSummaryReducers
    );
    const AllocDetailsClasses = useStyles();
    const AllocDSwal = swalStyles();
    const [searchData, setSearchData] = useState(initialData);
    // SEARCH FIELDS DATA
    const [hier1Data, setHier1Data] = useState([]);
    const [hier2Data, setHier2Data] = useState([]);
    const [hier3Data, setHier3Data] = useState([]);
    const [poData, setPOData] = useState([]);
    const [asnData, setASNData] = useState([]);
    const [tsfData, setTSFData] = useState([]);
    const [vpnData, setVPNData] = useState([]);
    const [warehouseData, setWarehouseData] = useState([]);
    const [packNoData, setPackNoData] = useState([]);
    const [diffData, setDIffData] = useState([]);
    const [skuData, setSkuData] = useState([]);
    const [itemParentData, setItemParentData] = useState([]);
    const [contextTypeData, setContextTypeData] = useState([]);
    const [promotionData, setPromotionData] = useState([]);
    const [criteriaData, setCriteriaData] = useState([]);
    const [valStatus, setValStatus] = useState([]);
    const [initSrch, setInitSrch] = useState(true);
    const [allocD, setAllocD] = useState([]);
    const [allocDSrc, setAllocDSrc] = useState([]);
    const [alltr, setAlltr] = useState([]);
    const [aStatus, setAStatus] = useState([]);
    const [allocSrch, setAllocSrch] = useState("");

    const [disHead, setDisHead] = useState(false);
    //TABLE DATA
    const [tabData, setTabData] = useState([]);
    const [tabFltrData, setTabFltrData] = useState([])
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [selected, setSelected] = useState([{}]);
    const [inputFVal, setInputFVal] = useState({})
    const [srch, setSrch] = useState(false);
    // CREATE CALL
    const [callMode, setCallMode] = useState("");
    const [callData, setCallData] = useState([]);
    const [callWksht, setCallWksht] = useState(false);
    const [rlCheck, setRLCheck] = useState(false);
    const [isLoadingAllocSumm, setIsLoadingAllocSumm] = useState(false);

    // Error popup message
    const [openDialogQL, setOpenDialogQL] = useState(false);
    const [DialogDataQL, setDialogDataQL] = useState("");

    // Manage columns popup in Table Grid
    const [openDialogManage, setOpenDialogManage] = useState(false);

    const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
    const [ManageHeaderData, setManageHeaderData] = useState([]);

    const [LoadCheckAllcSumm, setLoadCheckAllcSumm] = useState(false);

    const [selectedRow, setSelectedRow] = useState(null);

    const [massAprvOpen, setMassAprvOpen] = useState(false);
    const [massApvData, setMassApvData] = useState([]);
    const [rowsPerPageMA, setRowsPerPageMA] = React.useState(30);
    const [pageMA, setPageMA] = React.useState(0);

    const [rtnSwitch, setRtnSwtich] = useState(false);
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
    const [check, setCheck] = useState(false);

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [isScreenBigger, setIsScreenBigger] = useState(window.innerWidth < 1500 ? false : true);
    const [rowsPerPage, setRowsPerPage] = React.useState(30);
    const [page, setPage] = React.useState(0);
    const [currentPageData, setcurrentPageDataAllSumm] = useState([]);
    const [currentPageRows, setcurrentPageRowsAllSumm] = useState([]);
    const [allPageSelected, setAllPageSelected] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const startIndex = page * rowsPerPage;

    const [isSHovered1, setIsHovered1] = useState(false);

    const handleSEnter1 = () => { setIsHovered1(true); };

    const handleSLeave1 = () => { setIsHovered1(false); };

    const handleResize = () => {
        const screenWidth = window.innerWidth;
        const breakpoint = 1024; // Set your desired breakpoint here
        // //console.log("screenWidth ",screenWidth,(isScreenBigger?25:15),screenWidth < 1366? false: true)
        setIsScreenBigger(screenWidth < 1500 ? false : true);
    };



    useEffect(() => {
        document.title = 'Alloc Summary';
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (typeof JSON.parse(localStorage.getItem("userData"))?.username === "undefined") {
            navigate(`/`);
        } else {
            setUserRole(JSON.parse(localStorage.getItem("userData"))?.role_id);
        }
    }, []);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.root}`]: {
            height: "10px",
            padding: "0px",
        },
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "DodgerBlue",
            color: theme.palette.common.black,
            fontSize: "12px",
            textAlign: "left"
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: "11px",
            textAlign: "left"
        },
    }));

    useEffect(() => {
        if (initSrch && hier1Data.length === 0) {

            setIsLoadingAllocSumm(true);
            dispatch(getHIERRequest([{}]));
            dispatch(getPORequest([{}]));
            dispatch(getASNRequest([{}]));
            dispatch(getTSFRequest([{}]));
            dispatch(getWarehouseRequest([{}]));
            dispatch(getCONTEXT_TYPERequest([{}]));
            dispatch(getPROMOTIONRequest([{}]));
            dispatch(getALLOC_CRITERIARequest([{}]));
            dispatch(getAllStsRequest([{}]));
            dispatch(postAllocIdsRequest([{}]));
            setInitSrch(false);
            // console.log("DashSearch", DashSearch, searchData)
            if (DashSearch === "ACTIVE_ALLOCATION" || DashSearch === "SCHEDULED" || DashSearch === "PO_CREATE") {
                // console.log("DashSearch1;;;;;;;;")
                handleSearch(DashSearch)
            }

        }


    }, []);

    /*
    ####################################
    ### SEARCH DATA UNIQUE FUNCTIONS ###
    ####################################
  */

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
    let UniqPack =
        packNoData.length > 0
            ? [...new Map(packNoData.map((item) => [item["PACK_NO"], item])).values()]
            : [];

    useEffect(() => {
        const handleUniqData = (key, data, setStateFunc) => {
            if (data && Array.isArray(data)) {
                const uniqData = data.length > 0
                    ? [...new Map(data.map(item => [item[key], item])).values()]
                    : [];
                setStateFunc(uniqData);
            }
        };

        handleUniqData("HIER1", AllocSummaryData?.data?.hierData, setHier1Data);
        handleUniqData("PO", AllocSummaryData?.data?.poData, setPOData);
        handleUniqData("TSF", AllocSummaryData?.data?.tsfData, setTSFData);
        handleUniqData("ASN", AllocSummaryData?.data?.asnData, setASNData);
        handleUniqData("SRC", AllocSummaryData?.data?.srcData, setTabFltrData);

        if (AllocSummaryData?.data?.hier2Data && Array.isArray(AllocSummaryData?.data?.hier2Data)) {
            setHier2Data(AllocSummaryData?.data?.hier2Data);
        } else if (AllocSummaryData?.data?.hier3Data && Array.isArray(AllocSummaryData?.data?.hier3Data)) {
            setHier3Data(AllocSummaryData?.data?.hier3Data);
        } else if (AllocSummaryData?.data?.vpnData && Array.isArray(AllocSummaryData?.data?.vpnData)) {
            setVPNData(AllocSummaryData?.data?.vpnData);
        } else if (AllocSummaryData?.data?.warehouseData && Array.isArray(AllocSummaryData?.data?.warehouseData)) {
            setWarehouseData(AllocSummaryData?.data?.warehouseData);
        } else if (AllocSummaryData?.data?.packNoData && Array.isArray(AllocSummaryData?.data?.packNoData)) {
            setPackNoData(AllocSummaryData?.data?.packNoData);
        } else if (AllocSummaryData?.data?.diffData && Array.isArray(AllocSummaryData?.data?.diffData)) {
            setDIffData(AllocSummaryData?.data?.diffData);
        } else if (AllocSummaryData?.data?.skuData && Array.isArray(AllocSummaryData?.data?.skuData)) {
            setSkuData(AllocSummaryData?.data?.skuData);
        } else if (AllocSummaryData?.data?.itemParentData && Array.isArray(AllocSummaryData?.data?.itemParentData)) {
            setItemParentData(AllocSummaryData?.data?.itemParentData);
        } else if (AllocSummaryData?.data?.contextTypeData && Array.isArray(AllocSummaryData?.data?.contextTypeData)) {
            setContextTypeData(AllocSummaryData?.data?.contextTypeData);
        } else if (AllocSummaryData?.data?.promotionData && Array.isArray(AllocSummaryData?.data?.promotionData)) {
            setPromotionData(AllocSummaryData?.data?.promotionData);
        } else if (AllocSummaryData?.data?.criteriaData && Array.isArray(AllocSummaryData?.data?.criteriaData)) {
            setCriteriaData(AllocSummaryData?.data?.criteriaData);
        }

        if (AllocSummaryData1?.data?.alltrSts && Array.isArray(AllocSummaryData1?.data?.alltrSts)) {
            setAlltr(AllocSummaryData1?.data?.alltrSts[0]);
            setAStatus(AllocSummaryData1?.data?.alltrSts[1]);
        } else if (AllocSummaryData1?.data?.allocIdsData && Array.isArray(AllocSummaryData1?.data?.allocIdsData)) {
            if (initSrch) {
                setAllocDSrc(AllocSummaryData1?.data?.allocIdsData);
            } else {
                setAllocD(AllocSummaryData1?.data?.allocIdsData);
            }
            setIsLoadingAllocSumm(false);
        } else if (AllocSummaryData1?.data?.srcData && Array.isArray(AllocSummaryData1?.data?.srcData)) {
            if (AllocSummaryData1?.data?.srcData.length > 0 && srch) {
                setIsLoadingAllocSumm(false);


                const sortData = stableSort(AllocSummaryData1?.data?.srcData, getComparator('desc', 'ALLOC_NO'));
                setTabFltrData(sortData);
                setTabData(sortData);
                setDisHead(true);
                // setAllPageSelected([]);
                // setSelected([{}]);
                // const temp = sortData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
                // setcurrentPageDataAllSumm(temp);
                // setcurrentPageRowsAllSumm(temp);
                /* SWITCH BACK */
                if (!rtnSwitch) {
                    setAllPageSelected([]);
                    setSelected([{}]);
                    const temp = sortData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
                    setcurrentPageDataAllSumm(temp);
                    setcurrentPageRowsAllSumm(temp);
                } else {
                    const temp = sortData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(row => row !== undefined);
                    setcurrentPageDataAllSumm(temp);
                    setcurrentPageRowsAllSumm(temp);
                    setRtnSwtich(false);
                    setCheck(false);
                }
                // setLoadCheckAllcSumm(false);

            } else if (srch && AllocSummaryData1?.data?.srcData.length === 0) {
                setIsLoadingAllocSumm(false);
                setOpenDialogQL(true);
                setDialogDataQL(String(AllocSummaryData1?.data?.srcData?.message));
                setSrch(false);
            }
            setState({ ...state, right: false });
            AllocSummaryData1.data.srcData = 0;
        } else if (AllocSummaryData1?.data?.validCheck && Array.isArray(AllocSummaryData1?.data?.validCheck)) {
            setCheck(true);
            setIsLoadingAllocSumm(false);
            AllocSummaryData1.data.validCheck = 0;
            setLoadCheckAllcSumm(true);
            setRLCheck(AllocSummaryData1?.data?.validCheck[0]);
        } else if (AllocSummaryData1?.data?.copyAsyData && Array.isArray(AllocSummaryData1?.data?.copyAsyData)) {
            if (AllocSummaryData1?.data?.copyAsyData.length > 0) {
                setCallData([{ "ALLOC_NO": AllocSummaryData1?.data?.copyAsyData[0] }]);
                swal({
                    text: "New Allocation created - " + AllocSummaryData1?.data?.copyAsyData[0].toString(),
                    icon: "success",
                    buttons: {
                        confirm: {
                            text: "OK",
                            className: "AllocDSwal.button",
                            closeModal: true,
                        },
                    },
                    closeOnClickOutside: false,
                    customClass: {
                        container: AllocDSwal.mySwal,
                        popup: AllocDSwal.myPopup,
                    },
                }).then(() => {
                    dispatch(postValidASYRequest([{ "ALLOC_NO": AllocSummaryData1?.data?.copyAsyData[0] }]));
                });
            }
        }

        if (AllocSummaryData1?.data?.mAprvData && Array.isArray(AllocSummaryData1?.data?.mAprvData)) {
            handleSearch("");
            setIsLoadingAllocSumm(false);

            setMassAprvOpen(true);
            setMassApvData(AllocSummaryData1?.data?.mAprvData);
        }
        if (AllocSummaryData1?.data?.validCheck?.status === 200) {
            setCheck(true);
            setIsLoadingAllocSumm(false);
            setLoadCheckAllcSumm(true);
            setRLCheck(true);
        }

        const data = AllocSummaryData1?.data;

        if (data) {
            const matchingKey = Object.keys(data).find(key => data[key]?.status === 500);

            if (matchingKey) {
                setIsLoadingAllocSumm(false);
                setOpenDialogQL(true);
                setDialogDataQL(data[matchingKey]?.message);

                data[matchingKey].status = 0;
            }
        }
    }, [AllocSummaryData?.data, AllocSummaryData1?.data]);

    /* 
                #######################################
                ##### FILTERING DATA IN CRITERIA ######
                #######################################
    */
    //FILTERING ON SELECT
    const filteringData = (data, f_key, name) => {
        var fltrd_data = [];
        const temp_fdata = data.filter((row => row[Object.keys(f_key)[0]] === f_key[Object.keys(f_key)[0]]))
        fltrd_data.push(...temp_fdata);
        //UPDATE FILTERED DATA 
        if (name == "HIER3") {
            setFltrH3(fltrSort(fltrd_data, "HIER3"));
        } else if (name == "PACK_NO") {
            setFltrPACK(fltrSort(fltrd_data, "PACK_NO"));
            if (searchData.PACK_NO.length > 0) {
                var temp = []
                if (fltrd_data.length > 0) {
                    fltrd_data.map((row) => { temp.push(row[name]) });
                } else {
                    setSearchData((prev) => {
                        return {
                            ...prev,
                            PACK_NO: [],
                        };
                    });
                }
            }
        } else if (name == "ITEM_PARENT") {
            setFltrITP(fltrSort(fltrd_data, "ITEM_PARENT"));
            if (searchData.ITEM_PARENT.length > 0) {
                var temp = []
                if (fltrd_data.length > 0) {
                    fltrd_data.map((row) => { temp.push(row[name]) });
                } else {
                    setSearchData((prev) => {
                        return {
                            ...prev,
                            ITEM_PARENT: [],
                        };
                    });
                }
            }
        } else if (name == "DIFF_ID") {
            setFltrDiff(fltrSort(fltrd_data, "DIFF_ID"));
            if (searchData.DIFF_ID.length > 0) {
                var temp = []
                if (fltrd_data.length > 0) {
                    fltrd_data.map((row) => { temp.push(row[name]) });
                } else {
                    setSearchData((prev) => {
                        return {
                            ...prev,
                            DIFF_ID: [],
                        };
                    });
                }
            }
        } else if (name == "SKU") {
            setFltrSku(fltrSort(fltrd_data, "SKU"));
            if (searchData.SKU.length > 0) {
                var temp = []
                if (fltrd_data.length > 0) {
                    fltrd_data.map((row) => { temp.push(row[name]) });
                } else {
                    setSearchData((prev) => {
                        return {
                            ...prev,
                            SKU: [],
                        };
                    });
                }
            }
        } else if (name == "VPN") {
            setFltrVPN(fltrSort(fltrd_data, "VPN"));
            if (searchData.VPN.length > 0) {
                var temp = []
                if (fltrd_data.length > 0) {
                    fltrd_data.map((row) => { temp.push(row[name]) });
                } else {
                    setSearchData((prev) => {
                        return {
                            ...prev,
                            VPN: [],
                        };
                    });
                }
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
    }

    /* 
            ##################################################
            ##### MULTI SELECT CODE FOR PURSCHASE ORDER ######
            ##################################################
    */
    const selectAllocID = (value) => {

        if (value) {
            // DISPATCH CALL ON SELECTED HIER1 VALUES   
            setAllocSrch("");
            setSearchData((prev) => {
                return {
                    ...prev,
                    ALLOC_NO: value.ALLOC_NO,
                    ALLOC_DESC: (value.ALLOC_DESC),
                };
            });
            // setAllocSrch((value.ALLOC_NO).toString());
        } else {
            setAllocSrch("");
            setSearchData((prev) => {
                return {
                    ...prev,
                    ALLOC_NO: "",
                    ALLOC_DESC: "",
                };
            });
        }
    }
    const selectAllocator = (value) => {
        if (value) {
            // DISPATCH CALL ON SELECTED HIER1 VALUES
            setSearchData((prev) => {
                return {
                    ...prev,
                    ALLOCATOR: value.ALLOCATOR,
                };
            });
        } else {

            setSearchData((prev) => {
                return {
                    ...prev,
                    ALLOCATOR: "",
                };
            });
        }
    }
    const handleClear = () => {
        setSearchData((prev) => {
            return {
                ...prev,
                RELEASE_DATE_FROM: "",
            };
        });
    };
    const handleToday = () => {
        setSearchData((prev) => {
            return {
                ...prev,
                RELEASE_DATE_FROM: new Date(),
            };
        });
    };

    const CustomHeader = ({ date, decreaseMonth, increaseMonth }) => (
        <div className="custom-datepicker-header">
            <button className="clear-button" onClick={handleClear}>Clear</button>
            <div className="header-title">{date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</div>
            <div className="header-navigation">
                <button className="prev-button" onClick={decreaseMonth}>{'<'}</button>
                <button className="next-button" onClick={increaseMonth}>{'>'}</button>
            </div>
        </div>
    );
    console.log("check Time Zone ::", new Date(), "  role : ", userRole);

    const convert_Date_picker = (val) => {
        //'' yyyy-mm-dd
        // console.log("convert_Date_picker::", val);
        if (val.length > 0) {
            const initialDateParts1 = val.slice(0, 10).split('-');
            const initialDateR = new Date(
                Number(initialDateParts1[0]), // Year
                Number(initialDateParts1[1]) - 1, // Month (0-based index)
                Number(initialDateParts1[2]) // Day
            );
            return initialDateR;
        }
        return '';
    }

    const handleDateErase = (label) => {

        switch (label) {
            case "RELEASE_DATE_FROM":
                setSearchData((prev) => ({
                    ...prev,
                    RELEASE_DATE_FROM: "",
                }));

                break;
            case "RELEASE_DATE_TO":
                setSearchData((prev) => ({
                    ...prev,
                    RELEASE_DATE_TO: "",
                }));

                break;
            case "CREATE_DATE_FROM":
                setSearchData((prev) => ({
                    ...prev,
                    CREATE_DATE_FROM: "",
                }));

                break;
            case "CREATE_DATE_TO":
                setSearchData((prev) => ({
                    ...prev,
                    CREATE_DATE_TO: "",
                }));

                break;
            case "RELEASE_DATE":
                setInputFVal((prev) => ({
                    ...prev,
                    RELEASE_DATE: "",
                }));

                break;
            case "CREATED_DATE":
                setInputFVal((prev) => ({
                    ...prev,
                    CREATED_DATE: "",
                }));

                break;
            default:
                break;
        }
    }
    const handleDateChangePicker = (name, date) => {
        // console.log("handPicker: ", name, date);
        // console.log('checkasdf', /^\d{2}-\d{2}-\d{2}$/.test(date))
        if (/^\d{2}-\d{2}-\d{2}$/.test(date)) {
            return;
        }
        const Cdate = new Date(date);
        const year = Cdate.getFullYear();
        const month = String(Cdate.getMonth() + 1).padStart(2, '0');
        const day = String(Cdate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        switch (name) {
            case "RELEASE_DATE_FROM":
                setSearchData((prev) => {
                    return {
                        ...prev,
                        RELEASE_DATE_FROM: formattedDate === null ? "" : formattedDate,
                    };
                });
                break;
            case "RELEASE_DATE_TO":
                setSearchData((prev) => {
                    return {
                        ...prev,
                        RELEASE_DATE_TO: formattedDate === null ? "" : formattedDate,
                    };
                });
                break;
                // if (convertDateFormat1(date) < convertDateFormat1(searchData.RELEASE_DATE_FROM)) {
                //     if (date === null || String(date).length === 0) {
                //         setSearchData((prev) => {
                //             return {
                //                 ...prev,
                //                 RELEASE_DATE_TO: "",
                //             };
                //         });
                //         return;
                //     }
                //     setOpenDialogQL(true);
                //     setDialogDataQL("RELEASE_DATE_TO cannot be earlier than RELEASE_DATE_FROM");
                //     //     }
                //     // }}   
                //     //     if (date < searchData.RELEASE_DATE_FROM) {
                //     //         setOpenDialogQL(true);
                //     //         setDialogDataQL("RELEASE_DATE_TO cannot be earlier than RELEASE_DATE_FROM");
                // } else {
                //     setSearchData((prev) => {
                //         return {
                //             ...prev,
                //             RELEASE_DATE_TO: formattedDate,
                //         };
                //     });
                // }
                break;
            case "CREATE_DATE_FROM":
                setSearchData((prev) => {
                    return {
                        ...prev,
                        CREATE_DATE_FROM: formattedDate === null ? "" : formattedDate,
                    };
                });
                break;
            case "CREATE_DATE_TO":
                setSearchData((prev) => {
                    return {
                        ...prev,
                        CREATE_DATE_TO: formattedDate === null ? "" : formattedDate,
                    };
                });
                // if (convertDateFormat1(date) < convertDateFormat1(searchData.CREATE_DATE_FROM)) {
                //     if (date === null || String(date).length === 0) {
                //         setSearchData((prev) => {
                //             return {
                //                 ...prev,
                //                 CREATE_DATE_TO: "",
                //             };
                //         });
                //         return;
                //     }
                //     setOpenDialogQL(true);
                //     setDialogDataQL("CREATE_DATE_TO cannot be earlier than CREATE_DATE_FROM");
                //     // if (date < searchData.CREATE_DATE_FROM) {
                //     //     setOpenDialogQL(true);
                //     //     setDialogDataQL("CREATE_DATE_TO cannot be earlier than CREATE_DATE_FROM");
                // } else {
                //     setSearchData((prev) => {
                //         return {
                //             ...prev,
                //             CREATE_DATE_TO: formattedDate,
                //         };
                //     });
                // }
                break;
            case "RELEASE_DATE":
                setInputFVal((prev) => ({
                    ...prev,
                    RELEASE_DATE: date === null ? "" : formattedDate,
                }));

                break;
            case "CREATED_DATE":
                setInputFVal((prev) => ({
                    ...prev,
                    CREATED_DATE: date === null ? "" : formattedDate,
                }));
                break;
            default:
                break;
        }
    };
    const handleDateChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "RELEASE_DATE_FROM":
                setSearchData((prev) => {
                    return {
                        ...prev,
                        RELEASE_DATE_FROM: value,
                    };
                });
                break;
            case "RELEASE_DATE_TO":
                if (value < searchData.RELEASE_DATE_FROM) {
                    setOpenDialogQL(true);
                    setDialogDataQL("RELEASE_DATE_TO cannot be earlier than RELEASE_DATE_FROM");
                } else {
                    setSearchData((prev) => {
                        return {
                            ...prev,
                            RELEASE_DATE_TO: value,
                        };
                    });
                }
                break;
            case "CREATE_DATE_FROM":
                setSearchData((prev) => {
                    return {
                        ...prev,
                        CREATE_DATE_FROM: value,
                    };
                });
                break;
            case "CREATE_DATE_TO":
                if (value < searchData.CREATE_DATE_FROM) {
                    setOpenDialogQL(true);
                    setDialogDataQL("CREATE_DATE_TO cannot be earlier than CREATE_DATE_FROM");
                } else {
                    setSearchData((prev) => {
                        return {
                            ...prev,
                            CREATE_DATE_TO: value,
                        };
                    });
                }
                break;
            default:
                break;
        }
    };

    const selectAllocStatus = (event, value) => {
        let updatedData = [];
        let selectedDataOptions = event.map(res => res.STATUS_CODE);
        updatedData = aStatus.filter(res => !selectedDataOptions.includes(res.STATUS_CODE));
        const temp1 = stableSort(event, getComparator("asc", "STATUS"));
        const temp2 = stableSort(updatedData, getComparator("asc", "STATUS"));
        updatedData = [...temp1, ...temp2];
        setAStatus(updatedData);

        let selectedStatus = [];
        if (value.option && value.action === 'select-option') {
            valStatus.push(value.option);
        } else if (value.removedValue) {
            const index = valStatus.findIndex(item => item.STATUS === value.removedValue.STATUS_CODE);
            valStatus.splice(index, 1);
        } else if (value.action === "clear") {
            valStatus.splice(0, valStatus.length);
        } else if (value.action === "deselect-option") {
            const index = valStatus.findIndex(item => item.STATUS === value.option.STATUS_CODE);
            valStatus.splice(index, 1);
        }

        if (valStatus.length > 0 && typeof valStatus[0].STATUS !== "undefined") {
            selectedStatus = valStatus.map(item => item.STATUS_CODE);
        }

        setSearchData(prev => ({
            ...prev,
            STATUS: selectedStatus
        }));
    };

    const selectSource = (value) => {
        if (value) {
            // DISPATCH CALL ON SELECTED HIER1 VALUES


            setSearchData((prev) => {
                return {
                    ...prev,
                    SOURCE: value.CODE,
                };
            });
        } else {

            setSearchData((prev) => {
                return {
                    ...prev,
                    SOURCE: "",
                };
            });
        }
    }
    const selectContext = (value) => {
        if (value) {
            setSearchData((prev) => {
                return {
                    ...prev,
                    CONTEXT: value.CODE,
                };
            });
        } else {
            setSearchData((prev) => {
                return {
                    ...prev,
                    CONTEXT: "",
                };
            });
        }
    }
    const selectPromo = (value) => {
        if (value) {
            setSearchData((prev) => {
                return {
                    ...prev,
                    PROMOTION: value.PROMOTION,
                };
            });
        } else {
            setSearchData((prev) => {
                return {
                    ...prev,
                    PROMOTION: "",
                };
            });
        }
    }
    const handleAllocDesc = (event) => {

        if (event && searchData.ALLOC_NO.length === 0) {
            setSearchData((prev) => {
                return {
                    ...prev,
                    ALLOC_DESC: event.target.value,
                };
            });
        }
    }

    const selectHIER1 = (value) => {
        setTabData([]);
        if (value) {
            // DISPATCH CALL ON SELECTED HIER1 VALUES
            var temp = {};
            temp["HIER1"] = [value.HIER1];
            dispatch(getHIER2Request([temp]));
            dispatch(getHIER3Request([temp]));
            dispatch(getITEMPARENTRequest([temp]));
            dispatch(getPACKNORequest([temp]));
            dispatch(getSKURequest([temp]));
            dispatch(getDIFFRequest([temp]));
            dispatch(getVPNRequest([temp]));
            setSearchData((prev) => {
                return {
                    ...prev,
                    HIER1: value.HIER1,
                };
            });
        } else {
            //CLEARING DATA WHEN HIER1 IS EMPTY
            setHier2Data([]);
            setHier3Data([]);
            setItemParentData([]);
            setPackNoData([]);
            setVPNData([]);
            setSkuData([]);
            setDIffData([]);
            //   //filter variables data
            setFltrH3([]);
            setFltrITP([]);
            setFltrPACK([]);
            setFltrVPN([]);
            setFltrDiff([]);

            setSearchData((prev) => {
                return {
                    ...prev,
                    HIER1: "",
                    HIER2: "",
                    HIER3: "",
                    PACK_NO: "",
                    ITEM_PARENT: "",
                    DIFF_ID: "",
                    SKU: "",
                    VPN: "",
                };
            });
        }
    }
    const selectHIER2 = (value) => {
        if (value) {
            var temp = {};
            temp["HIER2"] = value.HIER2;
            filteringData(hier3Data, temp, "HIER3"); // Filtering Pack no
            filteringData(packNoData, temp, "PACK_NO"); // Filtering Pack no
            filteringData(itemParentData, temp, "ITEM_PARENT"); // Filtering ITEM_PARENT
            filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
            filteringData(skuData, temp, "SKU"); // Filtering SKU
            filteringData(vpnData, temp, "VPN"); // Filtering VPN
            setSearchData((prev) => {
                return {
                    ...prev,
                    HIER2: value.HIER2,
                };
            });
        } else {
            setFltrH3([]);
            setFltrDiff([]);
            setFltrSku([]);
            setFltrITP([]);
            setFltrPACK([]);
            setFltrVPN([]);
            setSearchData((prev) => {
                return {
                    ...prev,
                    HIER2: "",
                    HIER3: "",
                };
            });
        }
    }
    const selectHIER3 = (value) => {
        if (value) {
            // DISPATCH CALL ON SELECTED HIER1 VALUES
            var temp = {};
            temp["HIER3"] = value.HIER3;
            filteringData(packNoData, temp, "PACK_NO"); // Filtering Pack no
            filteringData(itemParentData, temp, "ITEM_PARENT"); // Filtering ITEM_PARENT
            filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
            filteringData(skuData, temp, "SKU"); // Filtering SKU
            filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
            setSearchData((prev) => {
                return {
                    ...prev,
                    HIER3: value.HIER3,
                };
            });
        } else {
            var temp = {}
            if (searchData.HIER2.length > 0) {
                temp["HIER2"] = [...searchData.HIER2];
            } else if (searchData.HIER2.length > 0) {
                temp["HIER1"] = [...searchData.HIER1];
            }
            if (Object.keys(temp).length > 0) {
                filteringData(packNoData, temp, "PACK_NO"); // Filtering Pack no
                filteringData(itemParentData, temp, "ITEM_PARENT"); // Filtering ITEM_PARENT
                filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
                filteringData(skuData, temp, "SKU"); // Filtering SKU
                filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
            } else {
                setFltrH3([]);
                setFltrDiff([]);
                setFltrSku([]);
                setFltrITP([]);
                setFltrPACK([]);
                setFltrVPN([]);
            }
            setSearchData((prev) => {
                return {
                    ...prev,
                    HIER3: [],
                };
            });
        }
    }
    const selectITEM_PARENT = (value) => {
        if (value) {
            var temp = {};
            temp["ITEM_PARENT"] = value.ITEM_PARENT;
            filteringData(packNoData, temp, "PACK_NO"); // Filtering Pack no
            filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
            filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
            filteringData(skuData, temp, "SKU"); // Filtering SKU

            setSearchData((prev) => {
                return {
                    ...prev,
                    ITEM_PARENT: value.ITEM_PARENT,
                };
            });

        } else {
            // Re-filtering when ITEM_PARENT is empty
            var temp = {}
            if (searchData.SKU.length > 0) {
                temp["SKU"] = searchData.SKU
            } else if (searchData.PACK_NO.length > 0) {
                temp["PACK_NO"] = searchData.PACK_NO
            } else if (searchData.HIER3.length > 0) {
                temp["HIER3"] = searchData.HIER3
            } else if (searchData.HIER2.length > 0) {
                temp["HIER2"] = searchData.HIER2
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

            } else {
                setFltrSku([]);
                setFltrDiff([]);
                setFltrVPN([]);
                setFltrPACK([])
            }
            //setFltrITP([]);
            setSearchData((prev) => {
                return {
                    ...prev,
                    ITEM_PARENT: "",
                };
            });
        }
    }
    const selectDIFF_ID = (value) => {
        if (value) {
            var temp = {};
            temp["DIFF_ID"] = value.DIFF_ID;
            filteringData(fltrSku.length > 0 ? fltrSku : skuData, temp, "SKU"); // Filtering SKU
            setSearchData((prev) => {
                return {
                    ...prev,
                    DIFF_ID: value.DIFF_ID,
                };
            });
        } else {
            setSearchData((prev) => {
                return {
                    ...prev,
                    DIFF_ID: "",
                };
            });
            // Re-filtering when diff is empty
            var temp = {}
            if (searchData.ITEM_PARENT.length > 0) {
                temp["ITEM_PARENT"] = searchData.ITEM_PARENT
            } else if (searchData.HIER3.length > 0) {
                temp["HIER3"] = searchData.HIER3
            } else if (searchData.HIER2.length > 0) {
                temp["HIER2"] = searchData.HIER2
            }
            if (Object.keys(temp).length > 0) {
                filteringData(skuData, temp, "SKU"); // Filtering SKU

            } else {
                setFltrSku([]);
            }
        }
    }
    const selectSKU = (value) => {

        if (value) {

            var temp = {};
            temp["SKU"] = value.SKU;
            filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
            filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
            setSearchData((prev) => {
                return {
                    ...prev,
                    SKU: value.SKU,
                };
            });
        } else {
            setSearchData((prev) => {
                return {
                    ...prev,
                    SKU: "",
                };
            });
            // Re-filtering when SKU is empty
            var temp = {}
            if (searchData.ITEM_PARENT.length > 0) {
                temp["ITEM_PARENT"] = searchData.ITEM_PARENT
            } else if (searchData.PACK_NO.length > 0) {
                temp["PACK_NO"] = searchData.PACK_NO
            } else if (searchData.HIER3.length > 0) {
                temp["HIER3"] = searchData.HIER3
            } else if (searchData.HIER2.length > 0) {
                temp["HIER2"] = searchData.HIER2
            }
            if (Object.keys(temp).length > 0) {
                filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
                filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
            } else {
                setFltrDiff([]);
                setFltrVPN([]);
            }
        }
    }
    const selectVPN = (value) => {
        if (value) {

            setSearchData((prev) => {
                return {
                    ...prev,
                    VPN: value.VPN,
                };
            });
        } else {
            var temp = {}
            if (searchData.SKU.length > 0) {
                temp["SKU"] = searchData.SKU
            } else if (searchData.ITEM_PARENT.length > 0) {
                temp["ITEM_PARENT"] = searchData.ITEM_PARENT
            } else if (searchData.HIER3.length > 0) {
                temp["HIER3"] = searchData.HIER3
            } else if (searchData.HIER2.length > 0) {
                temp["HIER2"] = searchData.HIER2
            }
            if (Object.keys(temp).length > 0) {
                filteringData(skuData, temp, "SKU"); // Filtering SKU

            } else {
                setFltrSku([]);
            }
            setSearchData((prev) => {
                return {
                    ...prev,
                    VPN: "",
                };
            });
        }
    }
    const selectPACK_NO = (value) => {
        if (value) {
            var temp = {}
            temp["PACK_NO"] = value.PACK_NO;
            // Filtering on select 
            filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
            filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
            setSearchData((prev) => {
                return {
                    ...prev,
                    PACK_NO: value.PACK_NO,
                };
            });
        } else {
            var temp = {}
            if (searchData.ITEM_PARENT.length > 0) {
                temp["ITEM_PARENT"] = searchData.ITEM_PARENT
            } else if (searchData.HIER3.length > 0) {
                temp["HIER3"] = searchData.HIER3
            } else if (searchData.HIER2.length > 0) {
                temp["HIER2"] = searchData.HIER2
            }
            if (Object.keys(temp).length > 0) {
                filteringData(diffData, temp, "DIFF_ID"); // Filtering DIFF_ID
                filteringData(UniqVPN, temp, "VPN"); // Filtering VPN
            } else {
                setFltrDiff([]);
                setFltrVPN([]);
            }
            setSearchData((prev) => {
                return {
                    ...prev,
                    PACK_NO: "",
                };
            })
        }
    }
    const selectWH = (value) => {

        if (value) {
            setSearchData((prev) => {
                return {
                    ...prev,
                    WH: value.WH,
                };
            });
        } else {

            setSearchData((prev) => {
                return {
                    ...prev,
                    WH: "",
                };
            });
        }
    }

    const selectPO = (value) => {

        if (value) {
            setSearchData((prev) => {
                return {
                    ...prev,
                    PO: value.PO,
                };
            });
        } else {

            setSearchData((prev) => {
                return {
                    ...prev,
                    PO: "",
                };
            });
        }
    }
    const selectASN = (value) => {

        if (value) {
            setSearchData((prev) => {
                return {
                    ...prev,
                    ASN: value.ASN,
                };
            });
        } else {

            setSearchData((prev) => {
                return {
                    ...prev,
                    ASN: "",
                };
            });
        }
    }

    const selectTranser = (value) => {

        if (value) {
            setSearchData((prev) => {
                return {
                    ...prev,
                    TSF: value.TSF,
                };
            });
        } else {

            setSearchData((prev) => {
                return {
                    ...prev,
                    TSF: "",
                };
            });
        }
    }
    const handleCheckboxChange = (event) => {
        const target = event.target;
        const name = target.name;
        const allocType = name === 'adHocAllocations' ? "A" : name === 'childAllocations' ? "C" : name === 'scheduledAllocations' ? "S" : searchData.ALLOC_TYPE;
        // Unselect all other checkboxes
        setSearchData(prevSearchData => {
            return {
                ...prevSearchData,
                ALLOC_TYPE: allocType
            }
        });
    };

    const handleRefresh = () => {
        setAllocSrch("");
        dispatch(postAllocIdsRequest([{}]));
        setDisHead(false);
        setSelected([{}]);
        setTabData([]);
        setTabFltrData([]);
        setcurrentPageDataAllSumm([]);
        setcurrentPageRowsAllSumm([]);
        setPage(0);
        setInputFVal([]);
        setSearchData(initialData);
        setSrch(false);
        setSelectedRow(null);
        setAllPageSelected([]);
    }
    const handleBatchClick = (event) => {
        const isChecked = event.target.checked;
        setSearchData(prevSearchData => {
            return {
                ...prevSearchData,
                BATCH: isChecked ? "Y" : "N"
            }
        });
    };

    function convertDateFormat2(dateString) {
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

    function convertDateFormat1(dateString) {
        // Split the date string into an array
        dateString = convertDateFormat2(dateString);

        var dateArray = dateString.split('-');

        // Rearrange the array elements to the desired format
        //var rearrangedDateArray = [dateArray[1], dateArray[0], '20' + dateArray[2]];
        var rearrangedDateArray = ['20' + dateArray[2], dateArray[0], dateArray[1]];

        // Join the array elements with '-' separator
        var convertedDateString = rearrangedDateArray.join('-');

        return convertedDateString;
    }
    const handleSearch = (e) => {
        const temp_initialData = { ...initialData };
        switch (e) {
            case "ACTIVE_ALLOCATION":
                temp_initialData.RELEASE_DATE_FROM = new Date().toISOString().slice(0, 10);
                temp_initialData.STATUS = ["APV", "RSV"];
                setIsLoadingAllocSumm(true);
                setSrch(true);
                dispatch(postSearchASYRequest([temp_initialData]));
                return;
            case "SCHEDULED":
                temp_initialData.RELEASE_DATE_FROM = new Date().toISOString().slice(0, 10);
                temp_initialData.STATUS = ["SCHD"];
                temp_initialData.ALLOC_TYPE = "S";
                setIsLoadingAllocSumm(true);
                setSrch(true);
                dispatch(postSearchASYRequest([temp_initialData]));
                return;
            case "PO_CREATE":
                temp_initialData.RELEASE_DATE_FROM = new Date().toISOString().slice(0, 10);
                temp_initialData.STATUS = ["POC"];
                setIsLoadingAllocSumm(true);
                setSrch(true);
                dispatch(postSearchASYRequest([temp_initialData]));
                return;
            default:
                break;
        }
        // if (allocSrch.length > 0 && searchData.ALLOC_NO.length === 0) {
        //     const dataToSearch = allocDSrc.length === 0 ? allocD : allocDSrc;

        //     dataToSearch.forEach(obj => {
        //         if (obj.ALLOC_NO.toString() === allocSrch.toString()) {
        //             setSearchData(prev => ({
        //                 ...prev,
        //                 ALLOC_NO: obj.ALLOC_NO,
        //                 ALLOC_DESC: obj.ALLOC_DESC,
        //             }));
        //                            }
        //     });
        // }


        const reqSearch = { ...searchData }
        reqSearch.RELEASE_DATE_FROM = String(reqSearch.RELEASE_DATE_FROM).length > 0 ? convertDateFormat1(reqSearch.RELEASE_DATE_FROM) : "";
        reqSearch.RELEASE_DATE_TO = String(reqSearch.RELEASE_DATE_TO).length > 0 ? convertDateFormat1(reqSearch.RELEASE_DATE_TO) : "";
        reqSearch.CREATE_DATE_FROM = String(reqSearch.CREATE_DATE_FROM).length > 0 ? convertDateFormat1(reqSearch.CREATE_DATE_FROM) : "";
        reqSearch.CREATE_DATE_TO = String(reqSearch.CREATE_DATE_TO).length > 0 ? convertDateFormat1(reqSearch.CREATE_DATE_TO) : "";

        //console.log("Request data:: ", reqSearch, searchData)
        setIsLoadingAllocSumm(true);
        setSrch(true);
        dispatch(postSearchASYRequest([reqSearch]));
        setInputFVal([]);
    }
    const validateDateInput1 = (input) => {
        if (typeof input === "undefined" || input === null || input.length === 0) {
            return true;
        }
        if (input.length === 3 || input.length === 6) {
            if (input.slice(-1) === "-") {
                return true;
            } else {
                return false;
            }
        } else if (/^\d{2}-\d{2}-\d{2}$/.test(input)) {
            if (input.split("-")[2].length > 2) {
                return false;
            } else {
                return true;
            }
        } else {
            const isValid = input.replace(/-/g, '').match(/^\d+$/);
            return isValid ? true : false;
        }
    };
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




    const handleEditAllocation = () => {
        if (Object.keys(selected[0]).length === 1 && selected[0][(Object.keys(selected[0]))[0]].length === 1) {
            const temp = tabData.filter(obj => obj.ALLOC_NO === selected[0][(Object.keys(selected[0]))[0]][0] && ((obj.STATUS).toUpperCase() === "WORKSHEET" || (obj.STATUS).toUpperCase() === "SCHEDULED"))
            const row = tabData.filter(obj => obj.ALLOC_NO === selected[0][(Object.keys(selected[0]))[0]][0])
            setCallData(row);
            if (temp.length > 0) {
                if (temp[0].CREATED_BY_USER_ID !== JSON.parse(localStorage.getItem("userData"))?.username) {
                    swal({
                        title: 'Allocation belongs to another user',
                        text: 'Do you want to continue?',
                        icon: 'warning',
                        buttons: {

                            confirm: {
                                text: 'Yes',
                                value: true,
                                className: AllocDSwal.button,
                                visible: true,
                                closeModal: true,
                            }, cancel: {
                                text: 'No',
                                value: false,
                                className: AllocDSwal.cancelButton,
                                visible: true,
                                closeModal: true,
                            },
                        },
                        closeOnClickOutside: false,
                        customClass: {
                            // popup: `${AllocDSwal.modal}`,
                            //  title: `${swalStyles.title}`,
                        },
                    }).then((ok) => {
                        // Handle the user's choice
                        if (ok) {
                            setIsLoadingAllocSumm(true);
                            dispatch(postValidASYRequest([{ "ALLOC_NO": row[0].ALLOC_NO }]));
                            setCallMode("EDIT");
                        } else {

                        }
                    });
                } else {
                    setIsLoadingAllocSumm(true);
                    dispatch(postValidASYRequest([{ "ALLOC_NO": row[0].ALLOC_NO }]));
                    setCallMode("EDIT");
                }

            } else {
                const temp = tabData.filter(obj => obj.ALLOC_NO === selected[0])
                // if ((temp[0].STATUS).toUpperCase() === "APPROVED" || (temp[0].STATUS).toUpperCase() === "RESERVED") {
                //     setCallWksht(true);
                // }
                dispatch(postValidASYRequest([{ "ALLOC_NO": row[0].ALLOC_NO }]));
                setCallMode("EDIT");
                setIsLoadingAllocSumm(true);
            }
        } else if (Object.keys(selected[0]).length > 1 || Object.keys(selected[0]).length === 1 && selected[0][(Object.keys(selected[0]))[0]].length > 1) {
            setOpenDialogQL(true);
            setDialogDataQL("Only one Allocation can be selected.");
        } else {
            setOpenDialogQL(true);
            setDialogDataQL("No records to process.");
        }
    }
    const handleCopyAllocation = () => {
        if (Object.keys(selected[0]).length === 1 && selected[0][(Object.keys(selected[0]))[0]].length === 1) {
            setIsLoadingAllocSumm(true);
            dispatch(postCopyASYRequest([{
                "ALLOC_NO": selected[0][(Object.keys(selected[0]))[0]][0],
                "ALLOCATOR": JSON.parse(localStorage.getItem("userData"))?.username
            }]));

            setCallMode("EDIT");
        } else if (Object.keys(selected[0]).length > 1 || Object.keys(selected[0]).length === 1 && selected[0][(Object.keys(selected[0]))[0]].length > 1) {
            setOpenDialogQL(true);
            setDialogDataQL("Only one Allocation can be selected.");
        } else {
            setOpenDialogQL(true);
            setDialogDataQL("No records to process.");
        }
    }
    const handleApproveAlloc = () => {
        dispatch(postMAPRVRequest([{ "UPDATE": allPageSelected }]))
        setIsLoadingAllocSumm(true);

    }



    function handleCellDoubleClick(row) {
        setCheck(true);
        setLoadCheckAllcSumm(true);
        setCallMode("VIEW");
        setCallData([row])
        //dispatch(postValidASYRequest([{ "ALLOC_NO": row.ALLOC_NO }]))
        // Perform other actions as necessary
    }
    const resetFilter = () => {
        setInputFVal({})
    };

    const [isAllocAttrExpanded, setAllocAttrExpanded] = useState(false);
    const [isHierExpanded, setHierExpanded] = useState(false);
    const [isAttrExpanded, setAttrExpanded] = useState(false);
    const [isSelExpanded, setSelExpanded] = useState(false);
    const [isAddAttrxpanded, setAddAttrExpanded] = useState(false);

    const handleAllocAttrClick = () => {
        setAllocAttrExpanded(!isAllocAttrExpanded);
    };
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
    // Define a CSS class for the shared styles
    const sharedInputClass = {
        fontSize: '12px',
        height: '32px',
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    };
    const sharedInputClassDis = {
        fontSize: '12px',
        height: '32px',
        backgroundColor: "#f0f0f0",
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    };
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

    const handleYearClick = () => {
        setIsYearDropdownOpen(!isYearDropdownOpen);
    };
    const SearchCriteria = () => (
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
                        backgroundColor: !isAllocAttrExpanded ? "#f5f5f5" : 'transparent', // Apply background color when expanded
                        // textDecoration: isHierExpanded ? 'underline' : 'none',
                        color: isAllocAttrExpanded ? '#191970' : 'inherit',
                        borderRadius: isAllocAttrExpanded ? '5px' : '5px', // Add border radius when expanded

                    }}

                    onClick={handleAllocAttrClick}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                        {isAllocAttrExpanded ? (
                            <>
                                <span>ALLOCATION ATTRIBUTES</span>
                                <ExpandLessRoundedIcon style={{ marginLeft: '5px', }} />
                            </>
                        ) : (
                            <>
                                <span>ALLOCATION ATTRIBUTES</span>
                                <ExpandMoreRoundedIcon style={{ marginLeft: '5px', }} />
                            </>
                        )}
                    </div>
                </Typography>
                {isAllocAttrExpanded && (
                    <Box  //bgcolor="#f5f5f5" 
                        sx={{ paddingTop: "0px" }}
                    >
                        {/* Content of the expanded box */}
                        <Typography>
                            <div className={AllocDetailsClasses.float_container}>
                                <div className={AllocDetailsClasses.float_child}>
                                    <div>
                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                            Allocation ID</InputLabel>
                                    </div>
                                    <div className={AllocDetailsClasses.multiselectfield}>


                                        <Select

                                            classNamePrefix="mySelect"
                                            maxMenuHeight={180}
                                            placeholder={"Allocation ID"}
                                            getOptionLabel={option =>
                                                `${option.ALLOC_NO.toString()}`}
                                            getOptionValue={option => option.ALLOC_NO}
                                            options={allocDSrc.length > 0 ? allocDSrc : allocD.length > 0 ? allocD : []}
                                            onInputChange={(value, action) => {
                                                if (action.action === "input-change") {
                                                    setAllocSrch(value);
                                                    const inputValue = {};
                                                    inputValue["ALLOC_NO"] = value
                                                    if (value !== "") {
                                                        dispatch(postAllocIdsRequest([inputValue]))
                                                    }

                                                } // <---
                                            }}
                                            inputValue={allocSrch}
                                            onChange={selectAllocID}
                                            styles={styleSelect}
                                            menuPlacement="bottom"
                                            // closeMenuOnSelect={false}
                                            // hideSelectedOptions={false}
                                            isSearchable={true}
                                            // components={{ Control, DropdownIndicator: null, }}
                                            value={allocDSrc.length === 0 ? allocD.filter(obj => searchData.ALLOC_NO === obj.ALLOC_NO)
                                                : allocDSrc.filter(obj => searchData.ALLOC_NO === obj.ALLOC_NO)}

                                            isClearable={true}
                                            isDisabled={disHead}

                                        />

                                    </div>
                                    {/* <div className={AllocDetailsClasses.multiselectfield}>
                        <Button
                            sx={{
                                backgroundColor: "green",
                                '&:hover': {
                                    backgroundColor: "green",
                                    boxShadow: 3
                                },
                                width: "50px",
                                //borderRadius: "50%",
                                // paddingRight: "10px"
                                padding: 0, // remove padding
                                margin: 0, // remove margin
                            }}
                            variant="contained"
                            size='medium'
                            className={AllocDetailsClasses.textField}
                            type="submit"
                            //onClick={handleDelete}
                            startIcon={<SearchIcon />}
                        /></div> */}

                                </div>

                                <div className={AllocDetailsClasses.float_child}>
                                    <div>
                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                            Description</InputLabel>
                                    </div>
                                    <div>
                                        <TextField
                                            size="small"
                                            onChange={handleAllocDesc}
                                            sx={{
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    backgroundColor: "#f0f0f0",
                                                    borderRadius: "5px",
                                                    height: "15px",
                                                }
                                            }}
                                            id="outlined-disabled"
                                            autoComplete='off'
                                            value={searchData.ALLOC_DESC}
                                            // label="Not Before Date To"
                                            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                                            InputProps={{
                                                style: { fontSize: 12, height: "32px" },
                                                className: AllocDetailsClasses.inputFielddate,
                                            }}
                                            inputProps={{ sx: { backgroundColor: '#fff' } }}
                                            disabled={disHead}
                                            isDisabled={disHead}
                                        />
                                    </div>
                                </div>

                                <div className={AllocDetailsClasses.float_child}>
                                    <div>
                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                            Release Date From</InputLabel>
                                    </div>
                                    <div>

                                        <DatePicker
                                            autoComplete="off"
                                            placeholderText="MM-DD-YY"
                                            selected={convert_Date_picker(searchData.RELEASE_DATE_FROM)}
                                            maxDate={convert_Date_picker(searchData.RELEASE_DATE_TO)}
                                            onChange={(date) => handleDateChangePicker("RELEASE_DATE_FROM", date)}
                                            onChangeRaw={(event) => {
                                                event.preventDefault();
                                            }}
                                            style={{ color: "red", border: "1px solid green" }}
                                            //todayButton="Today"
                                            showYearDropdown  // Enable year dropdown
                                            showMonthDropdown
                                            scrollableMonthYearDropdown
                                            scrollableYearDropdown={true}
                                            yearDropdownItemNumber={300}

                                            dateFormat="MM-dd-yy"
                                            className={AllocDetailsClasses.inputFielddate} // Pass the class name to apply styles
                                            disabled={disHead}

                                            customInput={

                                                <TextField
                                                    size="small"
                                                    variant="outlined"
                                                    type="text"
                                                    name="RELEASE_DATE_FROM"
                                                    autoComplete='off'
                                                    helperText=""
                                                    sx={{
                                                        "& .MuiInputBase-input.Mui-disabled": {
                                                            backgroundColor: "#f0f0f0",
                                                            height: "13px", borderRadius: "5px"
                                                        },
                                                    }}
                                                    id="outlined-disabled"
                                                    InputLabelProps={{
                                                        style: { fontSize: "12px", },
                                                        shrink: true,
                                                    }}
                                                    InputProps={{
                                                        style: disHead ? sharedInputClassDis : sharedInputClass,
                                                        endAdornment: (<>
                                                            <CalendarTodayIcon style={{ fontSize: "11px", margin: "0px 3px 0px 0px" }} />
                                                            {(searchData?.RELEASE_DATE_FROM?.length > 0)
                                                                && <BsFillEraserFill fontSize="medium"
                                                                    onClick={() => handleDateErase("RELEASE_DATE_FROM")} />}
                                                        </>)
                                                    }}
                                                    inputProps={{ sx: { backgroundColor: '#fff', height: "13px", borderRadius: "5px" } }}
                                                    disabled={disHead}
                                                />

                                            }
                                        />
                                    </div>
                                </div>

                                <div className={AllocDetailsClasses.float_child}>
                                    <div>
                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                            Release Date To</InputLabel>
                                    </div>
                                    <div>
                                        <DatePicker
                                            autoComplete="off"
                                            placeholderText="MM-DD-YY"
                                            selected={convert_Date_picker(searchData.RELEASE_DATE_TO)}
                                            minDate={convert_Date_picker(searchData.RELEASE_DATE_FROM)}
                                            onChange={(date) => handleDateChangePicker("RELEASE_DATE_TO", date)}
                                            onChangeRaw={(event) => {
                                                event.preventDefault();
                                            }}
                                            dateFormat="MM-dd-yy"
                                            className={AllocDetailsClasses.inputFielddate} // Pass the class name to apply styles
                                            disabled={disHead}
                                            showYearDropdown  // Enable year dropdown
                                            showMonthDropdown
                                            scrollableMonthYearDropdown
                                            scrollableYearDropdown={true}
                                            yearDropdownItemNumber={300}
                                            customInput={

                                                <TextField
                                                    size="small"
                                                    variant="outlined"
                                                    type="text"
                                                    name="RELEASE_DATE_FROM"
                                                    autoComplete='off'
                                                    helperText=""
                                                    sx={{
                                                        "& .MuiInputBase-input.Mui-disabled": {
                                                            backgroundColor: "#f0f0f0",
                                                            height: "13px", borderRadius: "5px"
                                                        }
                                                    }}
                                                    id="outlined-disabled"
                                                    InputLabelProps={{
                                                        style: { fontSize: "12px" },
                                                        shrink: true,
                                                    }}
                                                    InputProps={{
                                                        style: disHead ? sharedInputClassDis : sharedInputClass,
                                                        endAdornment: (<>
                                                            <CalendarTodayIcon style={{ fontSize: "11px", margin: "0px 3px 0px 0px" }} />
                                                            {(searchData?.RELEASE_DATE_TO?.length > 0)
                                                                && <BsFillEraserFill fontSize="medium"
                                                                    onClick={() => handleDateErase("RELEASE_DATE_TO")} />}
                                                        </>)
                                                    }}
                                                    inputProps={{ sx: { backgroundColor: '#fff', height: "13px", borderRadius: "5px" } }}
                                                    disabled={disHead}
                                                />

                                            }
                                        //showYearDropdown // Display the year dropdown
                                        //yearDropdownItemNumber={10} // Display 10 years in the dropdown (adjust as needed)
                                        />
                                    </div>
                                </div>


                                <div className={AllocDetailsClasses.float_child}>
                                    <div>
                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                            Create Date From</InputLabel>
                                    </div>
                                    <div>
                                        <DatePicker
                                            autoComplete="off"
                                            placeholderText="MM-DD-YY"
                                            selected={convert_Date_picker(searchData.CREATE_DATE_FROM)}
                                            maxDate={convert_Date_picker(searchData.CREATE_DATE_TO)}
                                            onChange={(date) => handleDateChangePicker("CREATE_DATE_FROM", date)}
                                            onChangeRaw={(event) => {
                                                event.preventDefault();
                                            }}
                                            dateFormat="MM-dd-yy"
                                            className={AllocDetailsClasses.inputFielddate} // Pass the class name to apply styles
                                            disabled={disHead}
                                            showYearDropdown  // Enable year dropdown
                                            showMonthDropdown
                                            scrollableMonthYearDropdown
                                            scrollableYearDropdown={true}
                                            yearDropdownItemNumber={300}
                                            customInput={

                                                <TextField
                                                    size="small"
                                                    variant="outlined"
                                                    type="text"
                                                    name="RELEASE_DATE_FROM"
                                                    autoComplete='off'
                                                    helperText=""
                                                    sx={{
                                                        "& .MuiInputBase-input.Mui-disabled": {
                                                            backgroundColor: "#f0f0f0", height: "13px", borderRadius: "5px"
                                                        }
                                                    }}
                                                    id="outlined-disabled"
                                                    InputLabelProps={{
                                                        style: { fontSize: "12px" },
                                                        shrink: true,
                                                    }}
                                                    InputProps={{
                                                        style: disHead ? sharedInputClassDis : sharedInputClass,
                                                        endAdornment: (<>
                                                            <CalendarTodayIcon style={{ fontSize: "11px", margin: "0px 3px 0px 0px" }} />
                                                            {(searchData?.CREATE_DATE_FROM?.length > 0)
                                                                && <BsFillEraserFill fontSize="medium"
                                                                    onClick={() => handleDateErase("CREATE_DATE_FROM")} />}
                                                        </>)
                                                    }}
                                                    inputProps={{ sx: { backgroundColor: '#fff', height: "13px", borderRadius: "5px" } }}
                                                    disabled={disHead}
                                                />

                                            }
                                        />
                                        {/* <TextField
                                            size="small"
                                            variant="outlined"
                                            name="CREATE_DATE_FROM"
                                            onChange={handleDateChange}
                                            value={searchData.CREATE_DATE_FROM}
                                            type="date"
                                            autoComplete='off'
                                            helperText=""
                                            sx={{
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    backgroundColor: "#f0f0f0"
                                                }
                                            }}
                                            id="outlined-disabled"
                                            // label="EISD From"
                                            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                                            InputProps={{
                                                style: { fontSize: 12, height: "32px" },
                                                className: AllocDetailsClasses.inputFielddate,
                                            }}
                                            inputProps={{ sx: { backgroundColor: '#fff' } }}
                                            disabled={disHead}
                                        /> */}
                                    </div>
                                </div>

                                <div className={AllocDetailsClasses.float_child}>
                                    <div>
                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                            Create Date To</InputLabel>
                                    </div>
                                    <div>
                                        <DatePicker
                                            autoComplete="off"
                                            placeholderText="MM-DD-YY"
                                            selected={convert_Date_picker(searchData.CREATE_DATE_TO)}
                                            minDate={convert_Date_picker(searchData.CREATE_DATE_FROM)}
                                            onChange={(date) => handleDateChangePicker("CREATE_DATE_TO", date)}
                                            onChangeRaw={(event) => {
                                                event.preventDefault();
                                            }}
                                            showYearDropdown  // Enable year dropdown
                                            showMonthDropdown
                                            scrollableMonthYearDropdown
                                            scrollableYearDropdown={true}
                                            yearDropdownItemNumber={300}
                                            dateFormat="MM-dd-yy"
                                            className={AllocDetailsClasses.inputFielddate} // Pass the class name to apply styles
                                            disabled={disHead}

                                            customInput={

                                                <TextField
                                                    size="small"
                                                    variant="outlined"
                                                    type="text"
                                                    name="RELEASE_DATE_FROM"
                                                    autoComplete='off'
                                                    helperText=""
                                                    sx={{
                                                        "& .MuiInputBase-input.Mui-disabled": {
                                                            backgroundColor: "#f0f0f0",
                                                            height: "13px", borderRadius: "5px"
                                                        }

                                                    }}
                                                    id="outlined-disabled"
                                                    InputLabelProps={{
                                                        style: { fontSize: "12px" },
                                                        shrink: true,
                                                    }}
                                                    InputProps={{
                                                        style: disHead ? sharedInputClassDis : sharedInputClass,
                                                        endAdornment: (<>
                                                            <CalendarTodayIcon style={{ fontSize: "11px", margin: "0px 3px 0px 0px" }} />
                                                            {(searchData?.CREATE_DATE_TO?.length > 0)
                                                                && <BsFillEraserFill fontSize="medium"
                                                                    onClick={() => handleDateErase("CREATE_DATE_TO")} />}
                                                        </>)
                                                    }}
                                                    inputProps={{ sx: { backgroundColor: '#fff', height: "13px", borderRadius: "5px" } }}
                                                    disabled={disHead}
                                                />

                                            }
                                        //showYearDropdown // Display the year dropdown
                                        //yearDropdownItemNumber={10} // Display 10 years in the dropdown (adjust as needed)
                                        />
                                        {/* <TextField
                                            size="small"
                                            variant="outlined"
                                            name="CREATE_DATE_TO"
                                            onChange={handleDateChange}
                                            value={searchData.CREATE_DATE_TO}
                                            type="date"
                                            autoComplete='off'
                                            helperText=""
                                            sx={{
                                                "& .MuiInputBase-input.Mui-disabled": {
                                                    backgroundColor: "#f0f0f0"
                                                }
                                            }}
                                            id="outlined-disabled"
                                            // label="EISD From"
                                            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                                            InputProps={{
                                                style: { fontSize: 12, height: "32px" },
                                                className: AllocDetailsClasses.inputFielddate,
                                            }}
                                            inputProps={{
                                                sx: { backgroundColor: '#fff' },
                                                max: new Date().toISOString().slice(0, 10),
                                            }}
                                            disabled={disHead}
                                        />*/}
                                    </div>
                                </div>

                                <div className={AllocDetailsClasses.float_child}>
                                    <div>
                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                            Allocator</InputLabel>
                                    </div>
                                    <div className={AllocDetailsClasses.multiselectfield}>
                                        <Select

                                            classNamePrefix="mySelect"
                                            maxMenuHeight={180}
                                            placeholder={"Allocator"}
                                            getOptionLabel={option =>
                                                `${option.ALLOCATOR.toString()}`}
                                            getOptionValue={option => option.ALLOCATOR}
                                            options={alltr.length > 0 ? alltr :
                                                []}
                                            onChange={selectAllocator}
                                            styles={styleSelect}
                                            menuPlacement="bottom"
                                            closeMenuOnSelect={false}
                                            hideSelectedOptions={false}
                                            isSearchable={true}
                                            // components={{ Control, DropdownIndicator: null, }}
                                            value={alltr.filter(obj => searchData.ALLOCATOR === (obj.ALLOCATOR))}
                                            isClearable={true}
                                            isDisabled={disHead}
                                        />

                                    </div>
                                </div>

                                <div className={AllocDetailsClasses.float_child}>
                                    <div>
                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                            Allocation Status</InputLabel>
                                    </div>
                                    <div className={AllocDetailsClasses.multiselectfield}>
                                        <Select

                                            classNamePrefix="mySelect"
                                            maxMenuHeight={180}
                                            placeholder={"Status"}
                                            getOptionLabel={option =>
                                                `${option.STATUS.toString()}`}
                                            getOptionValue={option => option.STATUS}
                                            options={aStatus.length > 0 ? aStatus : []}
                                            onChange={selectAllocStatus}
                                            styles={styleSelect}
                                            menuPlacement="bottom"
                                            closeMenuOnSelect={false}
                                            hideSelectedOptions={false}
                                            isSearchable={true}
                                            // components={{ Control, DropdownIndicator: null, }}
                                            value={
                                                aStatus.filter(obj => searchData.STATUS.includes(obj.STATUS_CODE))}
                                            isClearable={true}
                                            isMulti
                                            isDisabled={disHead}

                                        />
                                    </div>
                                </div>

                                <div className={AllocDetailsClasses.float_child}>
                                    <div>
                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                            Source</InputLabel>
                                    </div>
                                    <div className={AllocDetailsClasses.multiselectfield}>
                                        <Select

                                            classNamePrefix="mySelect"
                                            maxMenuHeight={180}
                                            placeholder={"Source"}
                                            getOptionLabel={option =>
                                                `${option.ALLOC_CRITERIA.toString()}`}
                                            getOptionValue={option => option.ALLOC_CRITERIA}
                                            options={criteriaData.length > 0 ? criteriaData : []}
                                            onChange={selectSource}
                                            styles={styleSelect}
                                            menuPlacement="bottom"
                                            closeMenuOnSelect={false}
                                            hideSelectedOptions={false}
                                            isSearchable={true}
                                            value={
                                                criteriaData.filter(obj => searchData.SOURCE === (obj.CODE))}
                                            isClearable={true}
                                            isDisabled={disHead}

                                        />
                                    </div>
                                </div>

                                <div className={AllocDetailsClasses.float_child}>
                                    <div>
                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                            Alloc Context</InputLabel>
                                    </div>
                                    <div className={AllocDetailsClasses.multiselectfield}>
                                        <Select

                                            classNamePrefix="mySelect"
                                            maxMenuHeight={180}
                                            placeholder={"Context Type"}
                                            getOptionLabel={option =>
                                                `${option.CONTEXT.toString()}`}
                                            getOptionValue={option => option.CONTEXT}
                                            options={contextTypeData.length > 0 ? contextTypeData : []}
                                            onChange={selectContext}
                                            styles={styleSelect}
                                            menuPlacement="bottom"
                                            closeMenuOnSelect={false}
                                            hideSelectedOptions={false}
                                            isSearchable={true}
                                            // components={{ Control, DropdownIndicator: null, }}
                                            value={
                                                contextTypeData.filter(obj => searchData.CONTEXT === (obj.CODE))}
                                            isClearable={true}
                                            isDisabled={disHead}

                                        />
                                    </div>
                                </div>
                                <div className={AllocDetailsClasses.float_child}>
                                    <div>
                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                            Promotion</InputLabel>
                                    </div>
                                    <div className={AllocDetailsClasses.multiselectfield}>
                                        <Select

                                            classNamePrefix="mySelect"
                                            maxMenuHeight={180}
                                            placeholder={"Promotion"}
                                            getOptionLabel={option =>
                                                `${option.PROMOTION.toString()}-${option.DESCRIPTION.toString()}`

                                            }
                                            getOptionValue={option => option.PROMOTION}
                                            options={promotionData.length > 0 ? promotionData : []}
                                            onChange={selectPromo}
                                            styles={styleSelect}
                                            menuPlacement="bottom"
                                            closeMenuOnSelect={false}
                                            hideSelectedOptions={false}
                                            isSearchable={true}
                                            value={
                                                promotionData.filter(obj => searchData.PROMOTION === (obj.PROMOTION))}
                                            isClearable={true}
                                            isDisabled={disHead || searchData.CONTEXT !== "PROM"}

                                        />
                                    </div>
                                </div>
                            </div>
                        </Typography>
                    </Box>
                )}
            </div>
            <div style={{ paddingTop: "10px" }}>
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
                            <div className={AllocDetailsClasses.float_child}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                        Hier1</InputLabel>
                                </div>
                                <div className={AllocDetailsClasses.multiselectfield}>
                                    <Select
                                        // className= {AllocDetailsClasses.inputField}
                                        classNamePrefix="mySelect"
                                        // inputValue={inputHIER1}
                                        onChange={selectHIER1}
                                        maxMenuHeight={180}
                                        getOptionLabel={option =>
                                            `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
                                        getOptionValue={option => option.HIER1}
                                        options={hier1Data.length > 0 ? hier1Data : []}
                                        value={hier1Data.filter(obj => searchData?.HIER1 === (obj.HIER1))}
                                        // placeholder={"Choose a Dept"}
                                        hideSelectedOptions={true}
                                        styles={styleSelect}
                                        menuPlacement="bottom"
                                        //isSearchable={true}
                                        //isMulti
                                        // defaultValue={searchData.HIER1.length>0 ? searchData.HIER1[0]:[]}
                                        // components={{ ValueContainer }}
                                        // components={{ Control }}
                                        isClearable={true}
                                        closeMenuOnSelect={false}
                                        isDisabled={disHead}
                                    />
                                </div>
                            </div>

                            <div className={AllocDetailsClasses.float_child}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                        Hier2</InputLabel>
                                </div>
                                <div className={AllocDetailsClasses.multiselectfield}>
                                    <Select
                                        onChange={selectHIER2}
                                        closeMenuOnSelect={false}
                                        getOptionLabel={option =>
                                            `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
                                        getOptionValue={option => option.HIER2}
                                        options={(UniqClass.length > 0) ? UniqClass : []}
                                        value={UniqClass.filter(obj => searchData?.HIER2 === (obj.HIER2))}

                                        classNamePrefix="mySelect"
                                        isSearchable={true}
                                        hideSelectedOptions={false}
                                        menuPlacement="bottom"
                                        maxMenuHeight={180}
                                        isClearable={true}
                                        styles={styleSelect}
                                        isDisabled={searchData.HIER1.length === 0 || disHead}
                                    //isDisabled={disHead}
                                    />
                                </div>
                            </div>

                            <div className={AllocDetailsClasses.float_child}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                        Hier3</InputLabel>
                                </div>
                                <div className={AllocDetailsClasses.multiselectfield}>
                                    <Select
                                        closeMenuOnSelect={false}
                                        onChange={selectHIER3}
                                        getOptionLabel={option =>
                                            `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
                                        getOptionValue={option => option.HIER3}
                                        options={fltrH3.length > 0 || searchData.HIER2.length > 0 ? fltrH3 : (UniqSubClass.length > 0) ? UniqSubClass : []}
                                        value={fltrH3.length > 0 ?
                                            fltrH3.filter(obj => searchData?.HIER3 === (obj.HIER3)) :
                                            UniqSubClass.filter(obj => searchData?.HIER3 === (obj.HIER3))}
                                        classNamePrefix="mySelect"
                                        isSearchable={true}
                                        hideSelectedOptions={false}
                                        menuPlacement="bottom"
                                        maxMenuHeight={180}
                                        isClearable={true}
                                        styles={styleSelect}
                                        isDisabled={!(searchData.HIER1.length > 0 && searchData.HIER2.length > 0) || disHead}
                                    //                       
                                    />
                                </div>
                            </div>

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
                            <div className={AllocDetailsClasses.float_child}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                        Style</InputLabel>
                                </div>
                                <div className={AllocDetailsClasses.multiselectfield}>
                                    <Select
                                        //disabled={filterItem.length > 0 ?false:true}
                                        onChange={selectITEM_PARENT}
                                        getOptionLabel={option =>
                                            `${option.ITEM_PARENT.toString()}`}
                                        getOptionValue={option => option.ITEM_PARENT}
                                        options={fltrITP.length > 0 || (searchData.HIER2.length > 0 || searchData.HIER3.length > 0) ?
                                            fltrITP.length > 0
                                                ? [...new Map(fltrITP.map((item) => [item["ITEM_PARENT"], item])).values()]
                                                : []
                                            : UniqItemParent.length > 0 ? UniqItemParent : []}
                                        value={fltrITP.length > 0 ? fltrITP.filter(obj => searchData?.ITEM_PARENT === (obj.ITEM_PARENT)) : UniqItemParent.filter(obj => searchData?.ITEM_PARENT === (obj.ITEM_PARENT))}
                                        isSearchable={true}
                                        //   onInputChange={(value, action) => {
                                        //     if (action.action === "input-change") setInputITEM_PARENT(value);
                                        //   }}
                                        closeMenuOnSelect={false}
                                        hideSelectedOptions={false}
                                        menuPlacement="bottom"
                                        maxMenuHeight={180}
                                        isClearable={true}
                                        // placeholder={"Choose a ITEM"}
                                        styles={styleSelect}
                                        isDisabled={searchData.HIER1.length === 0 || disHead}
                                    // isMulti
                                    />
                                </div>
                            </div>

                            <div className={AllocDetailsClasses.float_child}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                        Variant</InputLabel>
                                </div>
                                <div className={AllocDetailsClasses.multiselectfield}>
                                    <Select
                                        //disabled={filterItem.length > 0 ?false:true}
                                        onChange={selectDIFF_ID}
                                        getOptionLabel={option =>
                                            `${option.DIFF_ID.toString()}`}
                                        getOptionValue={option => option.DIFF_ID}
                                        options={fltrDiff.length > 0 || (searchData.HIER2.length > 0 || searchData.HIER3.length > 0) ?
                                            fltrDiff.length > 0
                                                ? [...new Map(fltrDiff.map((item) => [item["DIFF_ID"], item])).values()]
                                                : []
                                            : diffData.length > 0 ? UniqDiff_id : []}
                                        value={fltrDiff.length > 0 ? fltrDiff.filter(obj => searchData?.DIFF_ID === (obj.DIFF_ID))
                                            : UniqDiff_id.filter(obj => searchData?.DIFF_ID === (obj.DIFF_ID))}

                                        closeMenuOnSelect={false}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        isSearchable={true}
                                        hideSelectedOptions={false}
                                        menuPlacement="bottom"
                                        maxMenuHeight={180}
                                        isClearable={true}
                                        // placeholder={"Choose a ITEM"}
                                        isDisabled={searchData.HIER1.length === 0 || disHead}
                                        styles={styleSelect}
                                    // isMulti
                                    />
                                </div>
                            </div>

                            <div className={AllocDetailsClasses.float_child}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                        Sku</InputLabel>
                                </div>
                                <div className={AllocDetailsClasses.multiselectfield}>
                                    <Select
                                        //disabled={filterItem.length > 0 ?false:true}
                                        onChange={selectSKU}
                                        getOptionLabel={option =>
                                            `${option.SKU.toString()}`}
                                        getOptionValue={option => option.SKU}
                                        options={fltrSku.length > 0 || (searchData.HIER2.length > 0 || searchData.HIER3.length > 0) ?
                                            fltrSku.length > 0
                                                ? [...new Map(fltrSku.map((item) => [item["SKU"], item])).values()]
                                                : []
                                            : UniqSKU.length > 0 ? UniqSKU : []}
                                        value={fltrSku.length > 0 ? fltrSku.filter(obj => searchData?.SKU === (obj.SKU))
                                            : UniqSKU.filter(obj => searchData?.SKU === (obj.SKU))}
                                        closeMenuOnSelect={false}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        isSearchable={true}
                                        hideSelectedOptions={false}
                                        menuPlacement="bottom"
                                        maxMenuHeight={180}
                                        isClearable={true}
                                        styles={styleSelect}
                                        isDisabled={searchData.HIER1.length === 0 || disHead}
                                    // isMulti
                                    />
                                </div>
                            </div>

                            <div className={AllocDetailsClasses.float_child}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                        VPN</InputLabel>
                                </div>
                                <div className={AllocDetailsClasses.multiselectfield}>
                                    <Select
                                        //disabled={filterItem.length > 0 ?false:true}
                                        onChange={selectVPN}
                                        getOptionLabel={option =>
                                            `${option.VPN.toString()}`}
                                        getOptionValue={option => option.VPN}
                                        options={fltrVPN.length > 0 || (searchData.HIER2.length > 0 || searchData.HIER3.length > 0) ?
                                            fltrVPN.length > 0
                                                ? [...new Map(fltrVPN.map((item) => [item["VPN"], item])).values()]
                                                : []
                                            : UniqVPN.length > 0 ? UniqVPN : []}
                                        value={fltrVPN.length > 0 ? fltrVPN.filter(obj => searchData?.VPN === (obj.VPN))
                                            : UniqVPN.filter(obj => searchData?.VPN === (obj.VPN))}
                                        closeMenuOnSelect={false}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        isSearchable={true}
                                        hideSelectedOptions={false}
                                        menuPlacement="bottom"
                                        maxMenuHeight={180}
                                        isClearable={true}
                                        styles={styleSelect}
                                        isDisabled={searchData.HIER1.length === 0 || disHead}
                                    // isMulti
                                    />
                                </div>
                            </div>
                            <div className={AllocDetailsClasses.float_child}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                        Pack No</InputLabel>
                                </div>
                                <div className={AllocDetailsClasses.multiselectfield}>
                                    <Select
                                        //disabled={filterItem.length > 0 ?false:true}
                                        onChange={selectPACK_NO}
                                        getOptionLabel={option =>
                                            `${option.PACK_NO.toString()}`}
                                        getOptionValue={option => option.PACK_NO}
                                        options={fltrPACK.length > 0 || (searchData.HIER2.length > 0 || searchData.HIER3.length > 0 || searchData.ITEM_PARENT.length > 0) ?
                                            fltrPACK.length > 0
                                                ? [...new Map(fltrPACK.map((item) => [item["PACK_NO"], item])).values()]
                                                : []
                                            : packNoData.length > 0 ? packNoData : []}
                                        value={fltrPACK.length > 0 ? fltrPACK.filter(obj => searchData?.PACK_NO === (obj.PACK_NO))
                                            : UniqPack.filter(obj => searchData?.PACK_NO === (obj.PACK_NO))}
                                        closeMenuOnSelect={false}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        isSearchable={true}
                                        hideSelectedOptions={false}
                                        menuPlacement="bottom"
                                        maxMenuHeight={180}
                                        isDisabled={searchData.HIER1.length === 0 || disHead}
                                        // placeholder={"Choose a ITEM"}
                                        styles={styleSelect}
                                        isClearable={true}
                                    />
                                </div>
                            </div>
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
                            <div className={AllocDetailsClasses.float_child}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                        WH</InputLabel>
                                </div>
                                <div className={AllocDetailsClasses.multiselectfield}>
                                    <Select
                                        getOptionLabel={option =>
                                            `${option.WH.toString()}-(${option.WH_DESC.toString()})`}
                                        getOptionValue={option => option.WH}
                                        options={warehouseData.length > 0 ? warehouseData : []}
                                        onChange={selectWH}
                                        value={warehouseData.filter(obj => searchData?.WH === (obj.WH))}
                                        closeMenuOnSelect={false}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        isSearchable={true}
                                        hideSelectedOptions={false}
                                        menuPlacement="bottom"
                                        maxMenuHeight={180}
                                        isClearable={true}
                                        styles={styleSelect}
                                        isDisabled={disHead}
                                    />
                                </div>
                            </div>


                            <div className={AllocDetailsClasses.float_child}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                        PO</InputLabel>
                                </div>
                                <div className={AllocDetailsClasses.multiselectfield}>
                                    <Select
                                        getOptionLabel={option =>
                                            `${option.PO.toString()}`}
                                        getOptionValue={option => option.PO}
                                        options={poData.length > 0 ? poData : []}
                                        onChange={selectPO}
                                        value={poData.filter(obj => searchData?.PO === (obj.PO))}
                                        closeMenuOnSelect={false}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        isSearchable={true}
                                        hideSelectedOptions={false}
                                        menuPlacement="bottom"
                                        maxMenuHeight={180}
                                        isClearable={true}
                                        styles={styleSelect}
                                        isDisabled={disHead}
                                    />
                                </div>
                            </div>

                            <div className={AllocDetailsClasses.float_child}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                        ASN</InputLabel>
                                </div>
                                <div className={AllocDetailsClasses.multiselectfield}>
                                    <Select
                                        getOptionLabel={option =>
                                            `${option.ASN.toString()}`}
                                        getOptionValue={option => option.ASN}
                                        options={asnData.length > 0 ? asnData : []}
                                        onChange={selectASN}
                                        value={asnData.filter(obj => searchData?.ASN === (obj.ASN))}
                                        closeMenuOnSelect={false}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        isSearchable={true}
                                        hideSelectedOptions={false}
                                        menuPlacement="bottom"
                                        maxMenuHeight={180}
                                        isClearable={true}
                                        styles={styleSelect}
                                        isDisabled={disHead}
                                    />
                                </div>
                            </div>

                            <div className={AllocDetailsClasses.float_child}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                                        Transfer</InputLabel>
                                </div>
                                <div className={AllocDetailsClasses.multiselectfield}>
                                    <Select
                                        getOptionLabel={option =>
                                            `${option.TSF.toString()}`}
                                        getOptionValue={option => option.TSF}
                                        options={tsfData.length > 0 ? tsfData : []}
                                        onChange={selectTranser}
                                        value={tsfData.filter(obj => searchData?.TSF === (obj.TSF))}

                                        closeMenuOnSelect={false}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        isSearchable={true}
                                        hideSelectedOptions={false}
                                        menuPlacement="bottom"
                                        maxMenuHeight={180}
                                        isClearable={true}
                                        styles={styleSelect}
                                        isDisabled={disHead}
                                    />
                                </div>
                            </div>


                            <div className={AllocDetailsClasses.float_child}>
                                {/* <FormControlLabel
                        size="small"
                        sx={{
                            padding: "0px",
                            margin: "0px 0px 0px 0px",
                            // border:"1px solid red"
                        }}
                        control={
                            <Checkbox
                                size="small"
                                sx={{
                                    margin: "0px 0px 0px 0px",
                                    padding: "2px",
                                    // border:"1px solid red"
                                }}
                                // disabled
                                checked={searchData.BATCH === "Y"}
                                onChange={handleBatchClick}
                                inputProps={{ 'aria-label': 'controlled' }}
                                disabled={disHead}
                            />
                        }
                        label={<InputLabel
                            sx={{
                                fontWeight: "bold",
                                fontSize: "12px",
                                margin: "0px 0px 0px 0px",
                                padding: "0px 0px 0px 0px",
                                display: 'inline',
                                float: 'left',
                                // border:"1px solid red"
                            }}>
                            Batch Calculation</InputLabel>}
                    /> */}
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                                <FormControlLabel
                                    size="small"
                                    sx={{
                                        padding: "0px 0px 0px 4px",
                                        margin: "0px 0px 0px 0px",
                                    }}
                                    control={
                                        <Radio
                                            size="small"
                                            sx={{
                                                margin: "0px 0px 0px 0px",
                                                padding: "2px",
                                            }}
                                            name="adHocAllocations"
                                            onChange={handleCheckboxChange}
                                            checked={searchData.ALLOC_TYPE === "A"}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            disabled={disHead}
                                        />
                                    }
                                    label={<InputLabel
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "12px",
                                            margin: "0px 5px 0px 0px",
                                            padding: "0px 0px 0px 0px",
                                            display: 'inline',
                                            float: 'left',
                                        }}>
                                        Manual Allocations</InputLabel>}
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    size="small"
                                    sx={{
                                        padding: "0px 0px 0px 4px",
                                        margin: "0px 0px 0px 0px",
                                    }}
                                    control={
                                        <Radio
                                            size="small"
                                            sx={{
                                                margin: "0px 0px 0px 0px",
                                                padding: "2px",
                                            }}
                                            name="childAllocations"
                                            onChange={handleCheckboxChange}
                                            checked={searchData.ALLOC_TYPE === "C"}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            disabled={disHead}
                                        />
                                    }
                                    label={<InputLabel
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "12px",
                                            margin: "0px 5px 0px 0px",
                                            padding: "0px 0px 0px 0px",
                                            display: 'inline',
                                            float: 'left',
                                        }}>
                                        Child Allocations</InputLabel>}
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    size="small"
                                    sx={{
                                        padding: "0px 0px 0px 4px",
                                        margin: "0px 0px 0px 0px",
                                    }}
                                    control={
                                        <Radio
                                            size="small"
                                            sx={{
                                                margin: "0px 0px 0px 0px",
                                                padding: "2px",
                                            }}
                                            name="scheduledAllocations"
                                            onChange={handleCheckboxChange}
                                            checked={searchData.ALLOC_TYPE === "S"}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            disabled={disHead}
                                        />
                                    }
                                    label={<InputLabel
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "12px",
                                            margin: "0px 5px 0px 0px",
                                            padding: "0px 0px 0px 0px",
                                            display: 'inline',
                                            float: 'left',
                                        }}>
                                        Scheduled Allocations</InputLabel>}
                                />
                            </div>
                        </Typography>
                    </Box>
                )}
            </div>

            <Box
                display="flex"
                sx={{
                    padding: "10px 10px 10px 0px",
                    backgroundColor: "",

                    justifyContent: "flex-end",
                }}
            >
                <div>
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
                        type="submit"
                        startIcon={<SearchIcon />}
                        onClick={handleSearch}
                    >
                        Search</Button>

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
                        type="submit"
                        startIcon={<RefreshIcon />}
                        onClick={handleRefresh}
                    >
                        Refresh</Button>

                </div>


            </Box>

        </Box>
    )
    const SearchCriteriaPrev = () => (
        <div >
            <div className={AllocDetailsClasses.float_container}>
                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Allocation ID</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>


                        <Select

                            classNamePrefix="mySelect"
                            maxMenuHeight={180}
                            placeholder={"Allocation ID"}
                            getOptionLabel={option =>
                                `${option.ALLOC_NO.toString()}`}
                            getOptionValue={option => option.ALLOC_NO}
                            options={allocDSrc.length > 0 ? allocDSrc : allocD.length > 0 ? allocD : []}
                            onInputChange={(value, action) => {
                                if (action.action === "input-change") {
                                    setAllocSrch(value);
                                    const inputValue = {};
                                    inputValue["ALLOC_NO"] = value
                                    if (value !== "") {
                                        dispatch(postAllocIdsRequest([inputValue]))
                                    }

                                } // <---
                            }}
                            inputValue={allocSrch}
                            onChange={selectAllocID}
                            styles={styleSelect}
                            menuPlacement="bottom"
                            // closeMenuOnSelect={false}
                            // hideSelectedOptions={false}
                            isSearchable={true}
                            // components={{ Control, DropdownIndicator: null, }}
                            value={allocDSrc.length === 0 ? allocD.filter(obj => searchData.ALLOC_NO === obj.ALLOC_NO)
                                : allocDSrc.filter(obj => searchData.ALLOC_NO === obj.ALLOC_NO)}
                            isClearable={true}

                            isDisabled={disHead}

                        />

                    </div>
                    {/* <div className={AllocDetailsClasses.multiselectfield}>
                        <Button
                            sx={{
                                backgroundColor: "green",
                                '&:hover': {
                                    backgroundColor: "green",
                                    boxShadow: 3
                                },
                                width: "50px",
                                //borderRadius: "50%",
                                // paddingRight: "10px"
                                padding: 0, // remove padding
                                margin: 0, // remove margin
                            }}
                            variant="contained"
                            size='medium'
                            className={AllocDetailsClasses.textField}
                            type="submit"
                            //onClick={handleDelete}
                            startIcon={<SearchIcon />}
                        /></div> */}

                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Description</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            onChange={handleAllocDesc}
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                }
                            }}
                            id="outlined-disabled"
                            autoComplete='off'
                            value={searchData.ALLOC_DESC}
                            // label="Not Before Date To"
                            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                            InputProps={{
                                style: { fontSize: 12, height: "32px" },
                                className: AllocDetailsClasses.inputFielddate,
                            }}
                            inputProps={{ sx: { backgroundColor: '#fff' } }}
                            disabled={disHead}
                            isDisabled={disHead}
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Release Date From</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            variant="outlined"
                            type="date"
                            name="RELEASE_DATE_FROM"
                            onChange={handleDateChange}
                            value={searchData.RELEASE_DATE_FROM}
                            autoComplete='off'
                            helperText=""
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0"
                                }
                            }}
                            id="outlined-disabled"
                            // label="EISD From"
                            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                            InputProps={{
                                style: { fontSize: 12, height: "32px" },
                                className: AllocDetailsClasses.inputFielddate,
                            }}
                            inputProps={{ sx: { backgroundColor: '#fff' } }}
                            disabled={disHead}

                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Release Date To</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            variant="outlined"
                            type="date"
                            autoComplete='off'
                            helperText=""
                            name="RELEASE_DATE_TO"
                            onChange={handleDateChange}
                            value={searchData.RELEASE_DATE_TO}
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0"
                                }
                            }}
                            id="outlined-disabled"
                            // label="EISD From"
                            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true", }}
                            InputProps={{
                                style: { fontSize: 12, height: "32px" },
                                className: AllocDetailsClasses.inputFielddate,
                            }}
                            inputProps={{ sx: { backgroundColor: '#fff' }, }}
                            disabled={disHead}
                        />
                    </div>
                </div>


                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Create Date From</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            variant="outlined"
                            name="CREATE_DATE_FROM"
                            onChange={handleDateChange}
                            value={searchData.CREATE_DATE_FROM}
                            type="date"
                            autoComplete='off'
                            helperText=""
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0"
                                }
                            }}
                            id="outlined-disabled"
                            // label="EISD From"
                            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                            InputProps={{
                                style: { fontSize: 12, height: "32px" },
                                className: AllocDetailsClasses.inputFielddate,
                            }}
                            inputProps={{ sx: { backgroundColor: '#fff' } }}
                            disabled={disHead}
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Create Date To</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            variant="outlined"
                            name="CREATE_DATE_TO"
                            onChange={handleDateChange}
                            value={searchData.CREATE_DATE_TO}
                            type="date"
                            autoComplete='off'
                            helperText=""
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0"
                                }
                            }}
                            id="outlined-disabled"
                            // label="EISD From"
                            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                            InputProps={{
                                style: { fontSize: 12, height: "32px" },
                                className: AllocDetailsClasses.inputFielddate,
                            }}
                            inputProps={{
                                sx: { backgroundColor: '#fff' },
                                max: new Date().toISOString().slice(0, 10),
                            }}
                            disabled={disHead}
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Allocator</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select

                            classNamePrefix="mySelect"
                            maxMenuHeight={180}
                            placeholder={"Allocator"}
                            getOptionLabel={option =>
                                `${option.ALLOCATOR.toString()}`}
                            getOptionValue={option => option.ALLOCATOR}
                            options={alltr.length > 0 ? alltr :
                                []}
                            onChange={selectAllocator}
                            styles={styleSelect}
                            menuPlacement="bottom"
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            isSearchable={true}
                            // components={{ Control, DropdownIndicator: null, }}
                            //value={alltr.filter(obj => searchData.ALLOCATOR === (obj.ALLOCATOR))}
                            isClearable={true}
                            isDisabled={disHead}
                        />

                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Allocation Status</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select

                            classNamePrefix="mySelect"
                            maxMenuHeight={180}
                            placeholder={"Status"}
                            getOptionLabel={option =>
                                `${option.STATUS.toString()}`}
                            getOptionValue={option => option.STATUS}
                            options={aStatus.length > 0 ? aStatus : []}
                            onChange={selectAllocStatus}
                            styles={styleSelect}
                            menuPlacement="bottom"
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            isSearchable={true}
                            // components={{ Control, DropdownIndicator: null, }}
                            value={
                                aStatus.filter(obj => searchData.STATUS.includes(obj.STATUS_CODE))}
                            isClearable={true}
                            isMulti
                            isDisabled={disHead}

                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Source</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select

                            classNamePrefix="mySelect"
                            maxMenuHeight={180}
                            placeholder={"Source"}
                            getOptionLabel={option =>
                                `${option.ALLOC_CRITERIA.toString()}`}
                            getOptionValue={option => option.ALLOC_CRITERIA}
                            options={criteriaData.length > 0 ? criteriaData : []}
                            onChange={selectSource}
                            styles={styleSelect}
                            menuPlacement="bottom"
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            isSearchable={true}
                            value={
                                criteriaData.filter(obj => searchData.SOURCE === (obj.CODE))}
                            isClearable={true}
                            isDisabled={disHead}

                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Alloc Context</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select

                            classNamePrefix="mySelect"
                            maxMenuHeight={180}
                            placeholder={"Context Type"}
                            getOptionLabel={option =>
                                `${option.CONTEXT.toString()}`}
                            getOptionValue={option => option.CONTEXT}
                            options={contextTypeData.length > 0 ? contextTypeData : []}
                            onChange={selectContext}
                            styles={styleSelect}
                            menuPlacement="bottom"
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            isSearchable={true}
                            // components={{ Control, DropdownIndicator: null, }}
                            value={
                                contextTypeData.filter(obj => searchData.CONTEXT === (obj.CODE))}
                            isClearable={true}
                            isDisabled={disHead}

                        />
                    </div>
                </div>
                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Promotion</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select

                            classNamePrefix="mySelect"
                            maxMenuHeight={180}
                            placeholder={"Promotion"}
                            getOptionLabel={option =>
                                `${option.PROMOTION.toString()}-${option.DESCRIPTION.toString()}`

                            }
                            getOptionValue={option => option.PROMOTION}
                            options={promotionData.length > 0 ? promotionData : []}
                            onChange={selectPromo}
                            styles={styleSelect}
                            menuPlacement="bottom"
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            isSearchable={true}
                            value={
                                promotionData.filter(obj => searchData.PROMOTION === (obj.PROMOTION))}
                            isClearable={true}
                            isDisabled={disHead || searchData.CONTEXT !== "PROM"}

                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Hier1</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select
                            // className= {AllocDetailsClasses.inputField}
                            classNamePrefix="mySelect"
                            // inputValue={inputHIER1}
                            onChange={selectHIER1}
                            maxMenuHeight={180}
                            getOptionLabel={option =>
                                `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
                            getOptionValue={option => option.HIER1}
                            options={hier1Data.length > 0 ? hier1Data : []}
                            value={hier1Data.filter(obj => searchData?.HIER1 === (obj.HIER1))}
                            // placeholder={"Choose a Dept"}
                            hideSelectedOptions={true}
                            styles={styleSelect}
                            menuPlacement="bottom"
                            //isSearchable={true}
                            //isMulti
                            // defaultValue={searchData.HIER1.length>0 ? searchData.HIER1[0]:[]}
                            // components={{ ValueContainer }}
                            // components={{ Control }}
                            isClearable={true}
                            closeMenuOnSelect={false}
                            isDisabled={disHead}
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Hier2</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select
                            onChange={selectHIER2}
                            closeMenuOnSelect={false}
                            getOptionLabel={option =>
                                `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
                            getOptionValue={option => option.HIER2}
                            options={(UniqClass.length > 0) ? UniqClass : []}
                            value={UniqClass.filter(obj => searchData?.HIER2 === (obj.HIER2))}

                            classNamePrefix="mySelect"
                            isSearchable={true}
                            hideSelectedOptions={false}
                            menuPlacement="bottom"
                            maxMenuHeight={180}
                            isClearable={true}
                            styles={styleSelect}
                            isDisabled={searchData.HIER1.length === 0 || disHead}
                        //isDisabled={disHead}
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Hier3</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select
                            closeMenuOnSelect={false}
                            onChange={selectHIER3}
                            getOptionLabel={option =>
                                `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
                            getOptionValue={option => option.HIER3}
                            options={fltrH3.length > 0 || searchData.HIER2.length > 0 ? fltrH3 : (UniqSubClass.length > 0) ? UniqSubClass : []}
                            value={fltrH3.length > 0 ?
                                fltrH3.filter(obj => searchData?.HIER3 === (obj.HIER3)) :
                                UniqSubClass.filter(obj => searchData?.HIER3 === (obj.HIER3))}
                            classNamePrefix="mySelect"
                            isSearchable={true}
                            hideSelectedOptions={false}
                            menuPlacement="bottom"
                            maxMenuHeight={180}
                            isClearable={true}
                            styles={styleSelect}
                            isDisabled={!(searchData.HIER1.length > 0 && searchData.HIER2.length > 0) || disHead}
                        //                       
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            WH</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select
                            getOptionLabel={option =>
                                `${option.WH.toString()}-(${option.WH_DESC.toString()})`}
                            getOptionValue={option => option.WH}
                            options={warehouseData.length > 0 ? warehouseData : []}
                            onChange={selectWH}
                            value={warehouseData.filter(obj => searchData?.WH === (obj.WH))}
                            closeMenuOnSelect={false}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isSearchable={true}
                            hideSelectedOptions={false}
                            menuPlacement="bottom"
                            maxMenuHeight={180}
                            isClearable={true}
                            styles={styleSelect}
                            isDisabled={disHead}
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Style</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select
                            //disabled={filterItem.length > 0 ?false:true}
                            onChange={selectITEM_PARENT}
                            getOptionLabel={option =>
                                `${option.ITEM_PARENT.toString()}`}
                            getOptionValue={option => option.ITEM_PARENT}
                            options={fltrITP.length > 0 || (searchData.HIER2.length > 0 || searchData.HIER3.length > 0) ?
                                fltrITP.length > 0
                                    ? [...new Map(fltrITP.map((item) => [item["ITEM_PARENT"], item])).values()]
                                    : []
                                : UniqItemParent.length > 0 ? UniqItemParent : []}
                            value={fltrITP.length > 0 ? fltrITP.filter(obj => searchData?.ITEM_PARENT === (obj.ITEM_PARENT)) : UniqItemParent.filter(obj => searchData?.ITEM_PARENT === (obj.ITEM_PARENT))}
                            isSearchable={true}
                            //   onInputChange={(value, action) => {
                            //     if (action.action === "input-change") setInputITEM_PARENT(value);
                            //   }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            menuPlacement="bottom"
                            maxMenuHeight={180}
                            isClearable={true}
                            // placeholder={"Choose a ITEM"}
                            styles={styleSelect}
                            isDisabled={searchData.HIER1.length === 0 || disHead}
                        // isMulti
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Variant</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select
                            //disabled={filterItem.length > 0 ?false:true}
                            onChange={selectDIFF_ID}
                            getOptionLabel={option =>
                                `${option.DIFF_ID.toString()}`}
                            getOptionValue={option => option.DIFF_ID}
                            options={fltrDiff.length > 0 || (searchData.HIER2.length > 0 || searchData.HIER3.length > 0) ?
                                fltrDiff.length > 0
                                    ? [...new Map(fltrDiff.map((item) => [item["DIFF_ID"], item])).values()]
                                    : []
                                : diffData.length > 0 ? UniqDiff_id : []}
                            value={fltrDiff.length > 0 ? fltrDiff.filter(obj => searchData?.DIFF_ID === (obj.DIFF_ID))
                                : UniqDiff_id.filter(obj => searchData?.DIFF_ID === (obj.DIFF_ID))}

                            closeMenuOnSelect={false}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isSearchable={true}
                            hideSelectedOptions={false}
                            menuPlacement="bottom"
                            maxMenuHeight={180}
                            isClearable={true}
                            // placeholder={"Choose a ITEM"}
                            isDisabled={searchData.HIER1.length === 0 || disHead}
                            styles={styleSelect}
                        // isMulti
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Sku</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select
                            //disabled={filterItem.length > 0 ?false:true}
                            onChange={selectSKU}
                            getOptionLabel={option =>
                                `${option.SKU.toString()}`}
                            getOptionValue={option => option.SKU}
                            options={fltrSku.length > 0 || (searchData.HIER2.length > 0 || searchData.HIER3.length > 0) ?
                                fltrSku.length > 0
                                    ? [...new Map(fltrSku.map((item) => [item["SKU"], item])).values()]
                                    : []
                                : UniqSKU.length > 0 ? UniqSKU : []}
                            value={fltrSku.length > 0 ? fltrSku.filter(obj => searchData?.SKU === (obj.SKU))
                                : UniqSKU.filter(obj => searchData?.SKU === (obj.SKU))}
                            closeMenuOnSelect={false}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isSearchable={true}
                            hideSelectedOptions={false}
                            menuPlacement="bottom"
                            maxMenuHeight={180}
                            isClearable={true}
                            styles={styleSelect}
                            isDisabled={searchData.HIER1.length === 0 || disHead}
                        // isMulti
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            VPN</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select
                            //disabled={filterItem.length > 0 ?false:true}
                            onChange={selectVPN}
                            getOptionLabel={option =>
                                `${option.VPN.toString()}`}
                            getOptionValue={option => option.VPN}
                            options={fltrVPN.length > 0 || (searchData.HIER2.length > 0 || searchData.HIER3.length > 0) ?
                                fltrVPN.length > 0
                                    ? [...new Map(fltrVPN.map((item) => [item["VPN"], item])).values()]
                                    : []
                                : UniqVPN.length > 0 ? UniqVPN : []}
                            value={fltrVPN.length > 0 ? fltrVPN.filter(obj => searchData?.VPN === (obj.VPN))
                                : UniqVPN.filter(obj => searchData?.VPN === (obj.VPN))}
                            closeMenuOnSelect={false}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isSearchable={true}
                            hideSelectedOptions={false}
                            menuPlacement="bottom"
                            maxMenuHeight={180}
                            isClearable={true}
                            styles={styleSelect}
                            isDisabled={searchData.HIER1.length === 0 || disHead}
                        // isMulti
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            PO</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select
                            getOptionLabel={option =>
                                `${option.PO.toString()}`}
                            getOptionValue={option => option.PO}
                            options={poData.length > 0 ? poData : []}
                            onChange={selectPO}
                            value={poData.filter(obj => searchData?.PO === (obj.PO))}
                            closeMenuOnSelect={false}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isSearchable={true}
                            hideSelectedOptions={false}
                            menuPlacement="bottom"
                            maxMenuHeight={180}
                            isClearable={true}
                            styles={styleSelect}
                            isDisabled={disHead}
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            ASN</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select
                            getOptionLabel={option =>
                                `${option.ASN.toString()}`}
                            getOptionValue={option => option.ASN}
                            options={asnData.length > 0 ? asnData : []}
                            onChange={selectASN}
                            value={asnData.filter(obj => searchData?.ASN === (obj.ASN))}
                            closeMenuOnSelect={false}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isSearchable={true}
                            hideSelectedOptions={false}
                            menuPlacement="bottom"
                            maxMenuHeight={180}
                            isClearable={true}
                            styles={styleSelect}
                            isDisabled={disHead}
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Transfer</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select
                            getOptionLabel={option =>
                                `${option.TSF.toString()}`}
                            getOptionValue={option => option.TSF}
                            options={tsfData.length > 0 ? tsfData : []}
                            onChange={selectTranser}
                            value={tsfData.filter(obj => searchData?.TSF === (obj.TSF))}

                            closeMenuOnSelect={false}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isSearchable={true}
                            hideSelectedOptions={false}
                            menuPlacement="bottom"
                            maxMenuHeight={180}
                            isClearable={true}
                            styles={styleSelect}
                            isDisabled={disHead}
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.float_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                            Pack No</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <Select
                            //disabled={filterItem.length > 0 ?false:true}
                            onChange={selectPACK_NO}
                            getOptionLabel={option =>
                                `${option.PACK_NO.toString()}`}
                            getOptionValue={option => option.PACK_NO}
                            options={fltrPACK.length > 0 || (searchData.HIER2.length > 0 || searchData.HIER3.length > 0 || searchData.ITEM_PARENT.length > 0) ?
                                fltrPACK.length > 0
                                    ? [...new Map(fltrPACK.map((item) => [item["PACK_NO"], item])).values()]
                                    : []
                                : packNoData.length > 0 ? packNoData : []}
                            value={fltrPACK.length > 0 ? fltrPACK.filter(obj => searchData?.PACK_NO === (obj.PACK_NO))
                                : UniqPack.filter(obj => searchData?.PACK_NO === (obj.PACK_NO))}
                            closeMenuOnSelect={false}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isSearchable={true}
                            hideSelectedOptions={false}
                            menuPlacement="bottom"
                            maxMenuHeight={180}
                            isDisabled={searchData.HIER1.length === 0 || disHead}
                            // placeholder={"Choose a ITEM"}
                            styles={styleSelect}
                            isClearable={true}
                        />
                    </div>
                </div>


                <div className={AllocDetailsClasses.float_child}>
                    {/* <FormControlLabel
                        size="small"
                        sx={{
                            padding: "0px",
                            margin: "0px 0px 0px 0px",
                            // border:"1px solid red"
                        }}
                        control={
                            <Checkbox
                                size="small"
                                sx={{
                                    margin: "0px 0px 0px 0px",
                                    padding: "2px",
                                    // border:"1px solid red"
                                }}
                                // disabled
                                checked={searchData.BATCH === "Y"}
                                onChange={handleBatchClick}
                                inputProps={{ 'aria-label': 'controlled' }}
                                disabled={disHead}
                            />
                        }
                        label={<InputLabel
                            sx={{
                                fontWeight: "bold",
                                fontSize: "12px",
                                margin: "0px 0px 0px 0px",
                                padding: "0px 0px 0px 0px",
                                display: 'inline',
                                float: 'left',
                                // border:"1px solid red"
                            }}>
                            Batch Calculation</InputLabel>}
                    /> */}
                </div>
            </div>
        </div>

    )

    function SearchResultsTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
        if (Object.keys(selected[0]).length > 0
            && Object.keys(selected[0]).includes(String(page))
        ) {
            const allCheck = currentPageData.map((n) => n.SR_NO);

            const isCompleteDataPresent = allCheck.every(item => (selected[0][page].map((n) => n.SR_NO)).includes(item));
            const allCheckVald = currentPageData.length > selected[0][page].length
                ? !isCompleteDataPresent : isCompleteDataPresent
        }
        return (
            <>
                <TableHead className={AllocDetailsClasses.TitleHead}
                    sx={{ position: "sticky", top: -1, }}
                >
                    <TableRow className={AllocDetailsClasses.TitleRow}>
                        <StyledTableCell padding="checkbox" style={{
                            whiteSpace: "nowrap", padding: "0px",
                        }}
                        >
                            <Checkbox
                                color="primary"
                                size="small"
                                // indeterminate={selected.length > 0 && selected.length < tabData.length}
                                // checked={tabData.length > 0 && selected.length === tabData.length}
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
                                    // border: "1px solid black"
                                }}
                            />
                        </StyledTableCell>


                        {SearchResultsHeader.map((headCell) => (ManageHeaderData.includes(headCell.id) &&
                            <StyledTableCell
                                key={headCell.id}
                                // className={AllocDetailsClasses.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px"
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
                                        padding: "0px", margin: "0px"
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

    SearchResultsTableHead.propTypes = {
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
                    ...(massApvData.length > 0 &&
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
                {massApvData.length > 0 && (
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
                        Rows: {massApvData.length}
                    </Typography>
                )}
            </Toolbar>
        );
    }

    /* 
                         ########################################
                         ##### CHECKBOX SELECTION HANDLING ######
                         ########################################
   */
    // const handleSelectAllClick = (event) => {
    //     if (event.target.checked && selected.length === 0) {
    //         const newSelected = tabData.map((n) => n.ALLOC_NO);
    //         setSelected(newSelected);
    //         return;
    //     }
    //     setSelected([]);
    // };
    // const handleClick = (event, name) => {
    //     const selectedIndex = selected.indexOf(name);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, name);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1),
    //         );
    //     }

    //     setSelected(newSelected);
    // };
    // const isSelected = (name) => selected.indexOf(name) !== -1;
    const handleSelectAllClick = (event) => {
        const lastPage = Math.ceil((tabData.length) / rowsPerPage);

        // const filteredArray = tabData.slice((page * rowsPerPage),
        //     ((page * rowsPerPage) +
        //         (page === lastPage - 1 ? (tabData.length - (page * rowsPerPage)) : rowsPerPage)
        //     ));
        const filteredArray = currentPageData
        const newSelected = filteredArray.map((n) => n.ALLOC_NO);
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

    const isSelected = (name) => (Object.keys(selected[0]).length > 0 && Object.keys(selected[0]).includes(String(page))) ? selected[0][page].indexOf(name) !== -1 : false;




    /*
                            #########################################
                            ######### SORTING FUNCTIONALITY #########
                            #########################################
        */
    function descendingComparator(a, b, orderBy) {
        let c, d;
        if (orderBy == "ALLOC_DESC") {
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
        else if (c === "" || d === "") {
            if (c === "" && d !== "") {
                return -1
            }
            else if (d === "" && c !== "") {
                return 1
            }
            else {
                return 1
            }
        }
        else {
            if (orderBy == "ALLOC_DESC") {
                if (c.toLowerCase() < d.toLowerCase()) {
                    return -1;
                } else if (c.toLowerCase() > d.toLowerCase()) {
                    return 1;
                }
                else {
                    return 1;
                }
            }
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
                sortedData.forEach((item, index) => { tabData[startIndex + index] = item; });
                setcurrentPageDataAllSumm(sortedData);
            }
            if (order === "desc") {
                const sortedData = stableSort(currentPageData, getComparator("desc", sortValue));
                sortedData.forEach((item, index) => { tabData[startIndex + index] = item; });
                setcurrentPageDataAllSumm(sortedData);
            }
            setSortCheck(false)
        }
    }, [currentPageData, order, orderBy]);
    const handleRequestSort = (event, property) => {
        if (event) {
            setSortCheck(true)
            setSortValue(String(property))
        }
        const isAsc = (orderBy === property && order === 'asc');
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const gridFilterD = (e) => {
        setInputFVal((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    useEffect(() => {
        if (Object.keys(inputFVal).length > 0) {
            for (let i = 0; i < Object.keys(inputFVal).length; i++) {
                var temp_dict = {};
                if (inputFVal[Object.keys(inputFVal)[i]].includes("&") || inputFVal[Object.keys(inputFVal)[i]].includes("%")) {
                    inputFVal[Object.keys(inputFVal)[i]].slice(1)
                    temp_dict[Object.keys(inputFVal)[i]] = inputFVal[Object.keys(inputFVal)[i]].slice(1)
                    if (temp_dict) {
                        for (const key in temp_dict) {
                            if (temp_dict[key] === '') {
                                delete temp_dict[key];
                            }
                        }
                    }
                    const temp = currentPageRows.filter((props) => String(props[Object.keys(inputFVal)[i]]) === String(temp_dict[Object.keys(inputFVal)[i]]));
                    setcurrentPageDataAllSumm(temp);
                }
                else {
                    // const filteredTable = currentPageRows.filter((props) =>
                    //     Object.entries(inputFVal).every(
                    //         ([key, val]) =>
                    //             !val.length ||
                    //             props[key]
                    //                 ?.toString()
                    //                 .toLowerCase()
                    //                 .includes(val?.toString().toLowerCase())
                    //     )
                    // );
                    const filteredTable = currentPageRows.filter((props) =>
                        Object.entries(inputFVal).every(([key, val]) => {
                            // Check if the key is 'RELEASE_DATE' or 'CREATE_DATE' and reformat the date value if necessary
                            if ((key === "RELEASE_DATE" || key === "CREATED_DATE") && props[key]) {
                                const dateParts = val.split("-");
                                const formattedDate = `${dateParts[1]}-${dateParts[2]}-${dateParts[0].slice(-2)}`;
                                return !val.length || props[key] === formattedDate;
                            }
                            // For other keys, proceed with the normal comparison
                            return !val.length || props[key]?.toString().toLowerCase().includes(val.toLowerCase());
                        })
                    );

                    setcurrentPageDataAllSumm(filteredTable);
                }

            }
        } else if (Object.keys(inputFVal).length === 0) {
            setcurrentPageDataAllSumm(currentPageRows);
        }
    }, [inputFVal]);
    const handleOk = () => {
        //dispatch(postSwitchASYRequest([{}]))
        dispatch(postCOMMITDATARequest([]))
        navigate(`/AllocDashboard`);
        setAllPageSelected([])
    }
    const handleCancel = () => {
        //dispatch(postSwitchASYRequest([{}]))
        dispatch(postCOMMITDATARequest([]))
        navigate(`/AllocDashboard`);
        setAllPageSelected([])
    }


    const handleRowClick = (rowId) => {
        setSelectedRow(rowId);
    };

    const handleCloseDialog = (e) => {
        setOpenDialogQL(false);
        setDialogDataQL("")
    }
    /*
         #################################################
         ##########  MANAGE COLUMNS IN TABLE  ############
         #################################################
   */
    if (ManageHeaderCheck) {
        var temp = []
        SearchResultsHeader.map(row => temp.push(row.id));
        const temp1 = ['CONTEXT', 'PROMOTION', 'SELECTED_QTY', 'SHIPPED_QTY', 'CANCELED_QTY', 'RECEIVED_QTY']
        const temp2 = temp.filter(value => !temp1.includes(value));
        setManageHeaderData(temp2);
        setManageHeaderCheck(false);
    }

    const HandleManageHeader = () => {
        setOpenDialogManage(true);
    }
    const handleCloseDialogManage = (e) => {
        if (ManageHeaderData.length > 0) { setOpenDialogManage(false); }
        else { setOpenDialogQL(true); setDialogDataQL("Table must contain atleast one column."); }
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
        SearchResultsHeader.map(row => temp.push(row.id));
        setManageHeaderData(temp);
    }

    const headerManage = () => (
        <Box display="inline-block"
            sx={{ backgroundColor: "", height: "auto", padding: "0rem 0rem", width: "100%", }}>
            <div>
                {SearchResultsHeader.map((key) => (
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

    const searchPanel = () => (
        <Box
            sx={{ width: 430, marginTop: "80px", padding: "0px 0px 0px 20px" }}
        >
            {SearchCriteria()}
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
        const temp = tabData.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage)
            .filter(row => row !== undefined);
        setcurrentPageDataAllSumm(temp);
        setcurrentPageRowsAllSumm(temp);
        setInputFVal([]);
        // setSampleVal(tableData);
        // setCopyValue(initialCopyValues);
        // setInputValue({});
        // setInputValue1({})
        setIsLoadingAllocSumm(false);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPageMA(parseInt(event.target.value, 10));
        setPageMA(0);
    };

    const handleChangePageMA = (event, newPage) => {
        setPageMA(newPage);
        const temp = tabData.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage)
            .filter(row => row !== undefined);
        // setcurrentPageDataAllSumm(temp);
        // setcurrentPageRowsAllSumm(temp);
        // setInputFVal([]);
        // // setSampleVal(tableData);
        // // setCopyValue(initialCopyValues);
        // // setInputValue({});
        // // setInputValue1({})
        setIsLoadingAllocSumm(false);
    };

    const handleChangeRowsPerPageMA = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const [isSHovered, setIsHovered] = useState(false);

    const handleSEnter = () => {
        setIsHovered(true);
    };

    const handleSLeave = () => {
        setIsHovered(false);
    };

    const MassAprvHeader = [

        { id: "Alloc no", width: "30px" }, { id: "Action", width: "70px" }, { id: "Result", width: "170px" },
    ]
    function MassAprvHead(props) {
        const { order, orderBy } =
            props;
        // const createSortHandler = (property) => (event) => {
        //     onRequestSort(event, property);
        // };

        return (
            <>
                <TableHead className={AllocDetailsClasses.TitleHead}
                    sx={{ position: "sticky", top: -1, }}
                >
                    <TableRow className={AllocDetailsClasses.TitleRow} >


                        {MassAprvHeader.map((headCell) => (

                            <StyledTableCell
                                key={headCell.id}
                                // className={AllocDetailsClasses.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "5px", //width: "fit-content" //
                                    width: headCell.width
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : "asc"}
                                    // onClick={createSortHandler(headCell.id)}
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
                                    {headCell.id}
                                    {/* {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}
                                        </Box>
                                    ) : null} */}
                                </TableSortLabel>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>

            </>
        );
    }


    return (
        <div>
            {check ?
                <div>
                    < CreateAllocation
                        screenName={"AllocSummary"}
                        callData={callData}
                        callMode={callMode}
                        rlCheck={rlCheck}
                        setCheck={setCheck}
                        setTabFltrData={setTabFltrData}
                        setTabData={setTabData}
                        callWksht={callWksht}
                        setCallWksht={setCallWksht}
                        LoadCheckAllcSumm={LoadCheckAllcSumm}
                        setLoadCheckAllcSumm={setLoadCheckAllcSumm}
                        setcurrentPageRowsAllSumm={setcurrentPageRowsAllSumm}
                        setcurrentPageDataAllSumm={setcurrentPageDataAllSumm}
                        aSMPage={page}
                        setOpenDialogASM={setOpenDialogQL}
                        setDialogDataASM={setDialogDataQL}
                        setRtnSwtich={setRtnSwtich}
                        handleSearch={handleSearch}
                        setIsLoadingAllocSumm={setIsLoadingAllocSumm}
                        isLoadingAllocSumm={isLoadingAllocSumm}
                    />
                </div > :
                <Box className={AllocDetailsClasses.maindiv} sx={{ width: "100%" }}>

                    {/* <Box
                        component="fieldset"
                        display="flex"
                        sx={{
                            backgroundColor: "",
                            height: "auto",
                            // width: "100%",
                            width: "calc(93vw - 0px)",
                            borderRadius: 1,
                            marginLeft: "10px",

                            boxShadow: 2, border: 0,
                            borderBottom: 3,
                            border: "1px solid lightgrey",
                            // justifyContent:"space-between"
                            // width: "100%",
                        }}
                    >
                        <legend style={{ fontWeight: "bold", color: "#191970" }}>Allocation Search</legend>
                        <div sx={{ display: "flex", flexDirection: "row" }}>
                            <Grid id="top-row" container spacing={0}>


                                <div>
                                    {SearchCriteriaPrev()}
                                </div>
                               

                            </Grid>
                        </div>
                    </Box> */}
                    {/* Screen Loading */}
                    <Modal open={isLoadingAllocSumm}>
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
                    <div  >
                        <Box
                            // component="fieldset"
                            display="inline-block"
                            sx={{
                                backgroundColor: "",
                                height: "auto",
                                width: "calc(93vw - 0px)",
                                // width: "100%",
                                // width:"calc(93vw - 0px)",
                                borderRadius: 1,

                                boxShadow: 2, border: 0,
                                borderBottom: 3,
                                border: "1px solid lightgrey",
                                margin: "5px 0px 0px 10px"
                            }}
                        >

                            {/* <div sx={{ display: "flex", flexDirection: "row" }}>
                        <Grid id="top-row" container spacing={0}> */}
                            <div className={AllocDetailsClasses.course_box}>
                                {/* <div className={AllocDetailsClasses.grid_block}>
                                    <Box
                                        display="flex"
                                        // justifyContent="flex-end"

                                        sx={{
                                            backgroundColor: "",
                                            margin: "5px 0px 0px 5px",
                                            justifyContent: "flex-end",
                                            width: "calc(92vw - 0px)",
                                        }}

                                    >

                                        <div className={AllocDetailsClasses.float_child}>
                                            <Button

                                                sx={{
                                                    backgroundColor: "", fontSize: "12px",
                                                    padding: "5px", fontFamily: "system-ui",
                                                    width: "100px",
                                                    paddingLeft: "0px", //margin: "2px 5px 0px 0px",
                                                    '&.Mui-disabled': {
                                                        opacity: 0.5,
                                                        backgroundColor: 'DodgerBlue',
                                                        color: '#fff',
                                                    },
                                                }}
                                                variant="contained"
                                                type="submit"
                                                startIcon={<SearchIcon />}
                                                onClick={toggleDrawer("right", true)}
                                            >
                                                Search</Button>
                                        </div>
                                    </Box>

                                </div> */}

                                <Box
                                    // display='flex'
                                    sx={{
                                        // border: "1px solid lightgrey",
                                        boxShadow: 3,
                                        borderRadius: 1,
                                        width: "calc(92vw - 0px)",
                                        margin: "5px 0px 5px 5px",
                                        padding: "0px 0px 0px 0px",
                                        borderRadius: 1, boxShadow: 2, border: "0", borderBottom: 3, backgroundColor: ""
                                    }}
                                >
                                    <div className={AllocDetailsClasses.TableTotalBoby} display="flex">
                                        <Box
                                            display='flex' justifyContent="space-between"
                                        >
                                            <InputLabel sx={{
                                                fontWeight: "bold",
                                                fontSize: "14px",
                                                margin: "5px 0px 5px 5px",
                                                display: 'flex',
                                                float: 'left',
                                                color: "black",
                                            }}>
                                                Search Results
                                            </InputLabel>
                                            <div style={{ display: "flex", }}>
                                                <div
                                                    style={{
                                                        flex: "1",
                                                        backgroundColor: isSHovered ? '#f5f5f5' : 'white',
                                                        borderRadius: '20%',
                                                        padding: "0px 8px 0px 8px",
                                                        marginRight: "2px", height: "30px", minHeight: "30px",
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
                                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <div
                                                        style={{
                                                            flex: "1",
                                                            backgroundColor: isSHovered1 ? '#f5f5f5' : 'white',
                                                            borderRadius: '20%',
                                                            padding: "0px 8px 0px 8px",
                                                            margin: "2px 0px 0px 2px",
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
                                                {/* <div
                                                    style={{ flex: "2", }}>
                                                    <Button
                                                        autoFocus
                                                        variant="contained"
                                                        onClick={HandleManageHeader}
                                                        sx={{
                                                            backgroundColor: "",
                                                            padding: "1px",
                                                            margin: "2px 4px 2px 0px",
                                                            alignItems: "center",
                                                            width: "30px",
                                                            // height:"10px",
                                                            minWidth: "30px",
                                                        }}
                                                        title="Manage Columns"
                                                    >
                                                        <ViewColumnIcon style={{ padding: "0px" }} />
                                                    </Button>
                                                </div> */}
                                            </div>
                                        </Box>


                                        <div className={AllocDetailsClasses.TableBody}>
                                            <Paper sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", }}>
                                                <TableContainer style={{ maxHeight: (isScreenBigger ? 700 : 420), width: "calc(100% - 0px)" }} component={Paper}>
                                                    <Table aria-label="customized table">
                                                        <SearchResultsTableHead
                                                            numSelected={selected.length}
                                                            onSelectAllClick={handleSelectAllClick}
                                                            rowCount={tabData.length}
                                                            onRequestSort={handleRequestSort}
                                                            order={order}
                                                            orderBy={orderBy} />
                                                        <TableBody
                                                        >
                                                            <TableCell padding="checkbox" sx={{ padding: "0px", textAlign: "center", alignContent: "center" }} >
                                                                {/* <Grid item xs={1} style={{ padding: "0px", margin: "0px 0px 0px 0px" }}> */}
                                                                <IconButton small="small" sx={{ padding: "0px", }}>
                                                                    <RestartAltIcon small="small" sx={{ padding: "0px" }} onClick={resetFilter} />
                                                                </IconButton>
                                                                {/* </Grid> */}
                                                            </TableCell>

                                                            {ManageHeaderData.includes('ALLOC_NO') ?
                                                                <TableCell sx={{
                                                                    padding: "0px",
                                                                }}>
                                                                    <TextField
                                                                        placeholder="Alloc No"
                                                                        autoComplete="off"

                                                                        InputProps={{
                                                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: {
                                                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                            },
                                                                        }}
                                                                        name="ALLOC_NO"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("ALLOC_NO") > 0 ? inputFVal.ALLOC_NO : ""}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('ALLOC_DESC') ?
                                                                <TableCell sx={{
                                                                    padding: "0px",
                                                                }}>
                                                                    <TextField
                                                                        placeholder="Description"
                                                                        name="ALLOC_DESC"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("ALLOC_DESC") > 0 ? inputFVal.ALLOC_DESC : ""}

                                                                        autoComplete="off"
                                                                        InputProps={{
                                                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: {
                                                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                            },
                                                                        }}

                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('DOC_TYPE') ?
                                                                <TableCell sx={{
                                                                    padding: "0px",
                                                                }}>
                                                                    <TextField
                                                                        placeholder="Alloc Criteria"
                                                                        name="DOC_TYPE"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("DOC_TYPE") > 0 ? inputFVal.DOC_TYPE : ""}

                                                                        autoComplete="off"
                                                                        InputProps={{
                                                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: {
                                                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                            },
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('ALLOC_LEVEL_CODE') ?
                                                                <TableCell sx={{
                                                                    padding: "0px",
                                                                }}>
                                                                    <TextField
                                                                        placeholder="Alloc Level"
                                                                        name="ALLOC_LEVEL_CODE"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("ALLOC_LEVEL_CODE") > 0 ? inputFVal.ALLOC_LEVEL_CODE : ""}

                                                                        autoComplete="off"
                                                                        InputProps={{
                                                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: {
                                                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                            },
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('DTLCOUNT') ?
                                                                <TableCell sx={{
                                                                    padding: "0px",
                                                                }}>
                                                                    <TextField
                                                                        placeholder="# of Rec"
                                                                        name="DTLCOUNT"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("DTLCOUNT") > 0 ? inputFVal.DTLCOUNT : ""}

                                                                        autoComplete="off"
                                                                        InputProps={{
                                                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: {
                                                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                            },
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('LOCCOUNT') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        placeholder="# of Loc"
                                                                        name="LOCCOUNT"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("LOCCOUNT") > 0 ? inputFVal.LOCCOUNT : ""}

                                                                        autoComplete="off"
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('CONTEXT') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        autoComplete="off"
                                                                        placeholder="Context"
                                                                        name="CONTEXT"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("CONTEXT") > 0 ? inputFVal.CONTEXT : ""}

                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px", textAlign: "left", },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('PROMOTION') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        autoComplete="off"
                                                                        placeholder="Promotion"
                                                                        name="PROMOTION"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("PROMOTION") > 0 ? inputFVal.PROMOTION : ""}

                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px", textAlign: "left", },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('RELEASE_DATE') ?

                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    {/* <TextField
                                                                //         autoComplete="off"
                                                                //         placeholder="Release Date"
                                                                //         name="RELEASE_DATE"
                                                                //         onChange={gridFilterD}
                                                                //         value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("RELEASE_DATE") > 0 ? inputFVal.RELEASE_DATE : ""}

                                                                //         InputProps={{
                                                                //             style: { fontSize: 12, height: "20px", textAlign: "left", },
                                                                //         }}
                                                                //         sx={{
                                                                //             width: "100%"
                                                                //         }}
                                                                //         variant="standard"
                                                                //         inputProps={{
                                                                //             sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                //         }}
                                                                //     /> */}


                                                                    <DatePicker
                                                                        autoComplete="off"
                                                                        placeholderText="MM-DD-YY"
                                                                        selected={convert_Date_picker(Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("RELEASE_DATE") > 0 ? inputFVal.RELEASE_DATE : "")}
                                                                        // maxDate={convert_Date_picker(leftContData.END_DATE1)}
                                                                        // onChange={(date) => onTableCellDateChange("RELEASE_DATE", date)}
                                                                        onChange={(date) => handleDateChangePicker("RELEASE_DATE", date)}
                                                                        onChangeRaw={(event) => {
                                                                            event.preventDefault();
                                                                        }}
                                                                        dateFormat="MM-dd-yy"
                                                                        showYearDropdown  // Enable year dropdown
                                                                        showMonthDropdown
                                                                        scrollableMonthYearDropdown
                                                                        scrollableYearDropdown={true}
                                                                        yearDropdownItemNumber={300}
                                                                        sx={{ border: "none", }}
                                                                        customInput={
                                                                            <TextField
                                                                                size="small"
                                                                                variant="outlined"
                                                                                type="text"
                                                                                name="RELEASE_DATE"
                                                                                autoComplete='off'
                                                                                helperText=""
                                                                                id="outlined-disabled"
                                                                                InputLabelProps={{ style: { fontSize: "12px", }, shrink: true, }}

                                                                                InputProps={{
                                                                                    style: { fontSize: 12, height: "20px" },

                                                                                    endAdornment: (<>
                                                                                        <CalendarTodayIcon style={{ fontSize: "11px", margin: "0px 3px 0px 0px" }} />
                                                                                        {(inputFVal?.RELEASE_DATE?.length > 0)
                                                                                            && <BsFillEraserFill fontSize="medium"
                                                                                                onClick={() => handleDateErase("RELEASE_DATE")} />}
                                                                                    </>)
                                                                                }}
                                                                                sx={{
                                                                                    width: "100%", "& input::placeholder": { fontSize: "10px", }, border: 0, borderBottom: "1px solid gray", marginBottom: "2px",
                                                                                    "& .MuiOutlinedInput-root": { "& fieldset": { border: "none", } }
                                                                                }}
                                                                                inputProps={{ style: { fontSize: "12px" }, placeholder: "MM-DD-YY", }}
                                                                            />
                                                                        }
                                                                    />

                                                                </TableCell>
                                                                : null}

                                                            {ManageHeaderData.includes('STATUS') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        autoComplete="off"
                                                                        placeholder="Status"
                                                                        name="STATUS"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("STATUS") > 0 ? inputFVal.STATUS : ""}
                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('CALC_STATUS') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        autoComplete="off"
                                                                        placeholder="Calc Req Status"
                                                                        name="CALC_STATUS"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("CALC_STATUS") > 0 ? inputFVal.CALC_STATUS : ""}

                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('CREATED_BY_USER_ID') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        autoComplete="off"
                                                                        placeholder="Create ID"
                                                                        name="CREATED_BY_USER_ID"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("CREATED_BY_USER_ID") > 0 ? inputFVal.CREATED_BY_USER_ID : ""}

                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('CREATED_DATE') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    {/* <TextField
                                                                        autoComplete="off"
                                                                        placeholder="Create Date"
                                                                        name="CREATED_DATE"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("CREATED_DATE") > 0 ? inputFVal.CREATED_DATE : ""}

                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    /> */}
                                                                    <DatePicker
                                                                        autoComplete="off"
                                                                        placeholderText="MM-DD-YY"
                                                                        selected={convert_Date_picker(Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("CREATED_DATE") > 0
                                                                            ? inputFVal.CREATED_DATE : "")}
                                                                        // maxDate={convert_Date_picker(leftContData.END_DATE1)}
                                                                        // onChange={(date) => onTableCellDateChange("RELEASE_DATE", date)}
                                                                        onChange={(date) => handleDateChangePicker("CREATED_DATE", date)}
                                                                        onChangeRaw={(event) => {
                                                                            event.preventDefault();
                                                                        }}
                                                                        dateFormat="MM-dd-yy"
                                                                        showYearDropdown  // Enable year dropdown
                                                                        showMonthDropdown
                                                                        scrollableMonthYearDropdown
                                                                        scrollableYearDropdown={true}
                                                                        yearDropdownItemNumber={300}
                                                                        sx={{ border: "none", }}
                                                                        customInput={
                                                                            <TextField
                                                                                size="small"
                                                                                variant="outlined"
                                                                                type="text"
                                                                                name="CREATED_DATE"
                                                                                autoComplete='off'
                                                                                helperText=""
                                                                                id="outlined-disabled"
                                                                                InputLabelProps={{ style: { fontSize: "12px", }, shrink: true, }}

                                                                                InputProps={{
                                                                                    style: { fontSize: 12, height: "20px" },
                                                                                    endAdornment: (<>
                                                                                        <CalendarTodayIcon style={{ fontSize: "11px", margin: "0px 3px 0px 0px" }} />
                                                                                        {(inputFVal?.CREATED_DATE?.length > 0)
                                                                                            && <BsFillEraserFill fontSize="medium"
                                                                                                onClick={() => handleDateErase("CREATED_DATE")} />}
                                                                                    </>)
                                                                                }}
                                                                                sx={{
                                                                                    width: "100%", "& input::placeholder": { fontSize: "10px", }, border: 0, borderBottom: "1px solid gray", marginBottom: "2px",
                                                                                    "& .MuiOutlinedInput-root": { "& fieldset": { border: "none", } }
                                                                                }}
                                                                                inputProps={{ style: { fontSize: "12px" }, placeholder: "MM-DD-YY", }}
                                                                            />
                                                                        }
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('ALLOCATED_QTY') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        autoComplete="off"
                                                                        placeholder="Allocated Qty"
                                                                        name="ALLOCATED_QTY"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("ALLOCATED_QTY") > 0 ? inputFVal.ALLOCATED_QTY : ""}

                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('SELECTED_QTY') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        autoComplete="off"
                                                                        placeholder="Selected Qty"
                                                                        name="SELECTED_QTY"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("SELECTED_QTY") > 0 ? inputFVal.SELECTED_QTY : ""}

                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('SHIPPED_QTY') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        autoComplete="off"
                                                                        placeholder="Shipped Qty"
                                                                        name="SHIPPED_QTY"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("SHIPPED_QTY") > 0 ? inputFVal.SHIPPED_QTY : ""}

                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('CANCELED_QTY') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        autoComplete="off"
                                                                        placeholder="Canceled Qty"
                                                                        name="CANCELED_QTY"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("CANCELED_QTY") > 0 ? inputFVal.CANCELED_QTY : ""}

                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}

                                                            {ManageHeaderData.includes('RECEIVED_QTY') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        autoComplete="off"
                                                                        placeholder="Received Qty"
                                                                        name="RECEIVED_QTY"
                                                                        onChange={gridFilterD}
                                                                        value={Object.keys(inputFVal).length > 0 && Object.keys(inputFVal).includes("RECEIVED_QTY") > 0 ? inputFVal.RECEIVED_QTY : ""}

                                                                        InputProps={{
                                                                            style: { fontSize: 12, height: "20px" },
                                                                        }}
                                                                        sx={{
                                                                            width: "100%"
                                                                        }}
                                                                        variant="standard"
                                                                        inputProps={{
                                                                            sx: { padding: "0px 0px 0px 3px", height: "20px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                                        }}
                                                                    />
                                                                </TableCell> : null}
                                                        </TableBody>

                                                        <TableBody
                                                        >
                                                            {currentPageData
                                                                // .length > 0 ?
                                                                //     stableSort(tabData, getComparator(order, orderBy))
                                                                .map((row, index) => {
                                                                    const isItemSelected = isSelected(row.ALLOC_NO);
                                                                    const labelId = `enhanced-table-checkbox-${index}`;
                                                                    return (
                                                                        <TableRow
                                                                            hover
                                                                            role="checkbox"
                                                                            aria-checked={isItemSelected}
                                                                            tabIndex={-1}
                                                                            key={row.ALLOC_NO}
                                                                            selected={isItemSelected}
                                                                            onDoubleClick={() => handleCellDoubleClick(row)}
                                                                            //key={row.id}
                                                                            // className={selectedRow === row.ALLOC_NO ? AllocDetailsClasses.tableRow : ""}
                                                                            onClick={() => handleRowClick(row.ALLOC_NO)}
                                                                            style={selectedRow === row.ALLOC_NO ? { backgroundColor: "#CDF0FF" } : null}
                                                                        >
                                                                            <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                                                <Checkbox
                                                                                    size="small" color="primary"
                                                                                    onClick={(event) => handleClick(event, row?.ALLOC_NO)}
                                                                                    checked={isItemSelected}
                                                                                    inputProps={{
                                                                                        'aria-labelledby': labelId,
                                                                                    }}
                                                                                    style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }} />
                                                                            </TableCell>
                                                                            {ManageHeaderData.includes('ALLOC_NO') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}>{row.ALLOC_NO}</TableCell> : null}
                                                                            {ManageHeaderData.includes('ALLOC_DESC') ? <TableCell align="right" sx={{
                                                                                padding: "0px 0px 0px 3px", textAlign: "left",
                                                                                fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px'
                                                                            }}>
                                                                                <Box
                                                                                    display="flex"
                                                                                    justifyContent="space-between"
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
                                                                                        {row.ALLOC_DESC
                                                                                        }
                                                                                    </InputLabel>
                                                                                    <Button sx={{
                                                                                        backgroundColor: "", '&:hover': {
                                                                                            backgroundColor: "",
                                                                                        }, border: 0, color: "CadetBlue", padding: "0px"
                                                                                    }}
                                                                                        style={{
                                                                                            maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start"
                                                                                        }}
                                                                                        size='small'
                                                                                        className={AllocDetailsClasses.textField}
                                                                                        onClick={() => {
                                                                                            setOpenDialogQL(true);
                                                                                            setDialogDataQL(String(row.ALLOC_DESC));
                                                                                        }}
                                                                                        startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                                                    >
                                                                                    </Button>
                                                                                </Box>
                                                                            </TableCell> : null}
                                                                            {ManageHeaderData.includes('DOC_TYPE') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 2px 0px 2px" }} >{row.DOC_TYPE}
                                                                            </TableCell> : null}
                                                                            {ManageHeaderData.includes('ALLOC_LEVEL_CODE') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.ALLOC_LEVEL_CODE}</TableCell> : null}
                                                                            {ManageHeaderData.includes('DTLCOUNT') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.DTLCOUNT}</TableCell> : null}
                                                                            {ManageHeaderData.includes('LOCCOUNT') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.LOCCOUNT}</TableCell> : null}
                                                                            {ManageHeaderData.includes('CONTEXT') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.CONTEXT}</TableCell> : null}
                                                                            {ManageHeaderData.includes('PROMOTION') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.PROMOTION}</TableCell> : null}
                                                                            {ManageHeaderData.includes('RELEASE_DATE') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.RELEASE_DATE}</TableCell> : null}
                                                                            {ManageHeaderData.includes('STATUS') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.STATUS}</TableCell> : null}
                                                                            {ManageHeaderData.includes('CALC_STATUS') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.CALC_STATUS}</TableCell> : null}
                                                                            {ManageHeaderData.includes('CREATED_BY_USER_ID') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.CREATED_BY_USER_ID}</TableCell> : null}
                                                                            {ManageHeaderData.includes('CREATED_DATE') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.CREATED_DATE}</TableCell> : null}
                                                                            {ManageHeaderData.includes('ALLOCATED_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.ALLOCATED_QTY}</TableCell> : null}
                                                                            {ManageHeaderData.includes('SELECTED_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.SELECTED_QTY}</TableCell> : null}
                                                                            {ManageHeaderData.includes('SHIPPED_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.SHIPPED_QTY}</TableCell> : null}
                                                                            {ManageHeaderData.includes('CANCELED_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.CANCELED_QTY}</TableCell> : null}
                                                                            {ManageHeaderData.includes('RECEIVED_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                                {row.RECEIVED_QTY}</TableCell> : null}

                                                                        </TableRow >
                                                                    )
                                                                }) //: false
                                                            }
                                                            {currentPageData.length < (isScreenBigger ? 30 : 15) ?
                                                                [...Array((isScreenBigger ? 30 : 15) - (currentPageData.length)).keys()].map(val => (
                                                                    <TableRow  >
                                                                        <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                                            <Checkbox size="small" color="primary" disabled={true} style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }} />
                                                                        </TableCell>
                                                                        {ManageHeaderData.map((row, index) => {
                                                                            return (
                                                                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>)
                                                                        })}
                                                                        {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell> */}

                                                                    </TableRow >
                                                                )) : false}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                {tabData.length > 0 ?
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
                                                            <div className={AllocDetailsClasses.header_child}>
                                                                <span
                                                                    style={{
                                                                        margin: '13px 0px 0px 15px', fontSize: '14px',
                                                                        fontFamily: 'Arial, sans-serif',
                                                                    }}
                                                                >
                                                                    {"Total Selected: " + String(allPageSelected.length)}
                                                                </span>
                                                            </div>
                                                            <div className={AllocDetailsClasses.header_child}>
                                                                <TablePagination
                                                                    rowsPerPageOptions={[30]}
                                                                    component="div"
                                                                    count={tabData.length}
                                                                    rowsPerPage={rowsPerPage}
                                                                    page={page}
                                                                    onPageChange={handleChangePage}
                                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                                    sx={{ '& .MuiToolbar-root': { minHeight: '20px', }, }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null}

                                                {/* {selected.length > 0 ? <EnhancedTableToolbar numSelected={selected.length} /> : false} */}
                                                {/* {tabData.length > 0 ? <EnhancedTableToolbar numSelected={selected.length} /> : null} */}


                                            </Paper>
                                        </div>
                                    </div>

                                </Box>

                            </div>
                            <Box
                                display="flex"
                                sx={{
                                    margin: "5px 0px 5px 5px",
                                    justifyContent: "space-between",
                                    width: "calc(92vw - 0px)",
                                }}

                            >

                                <div className={AllocDetailsClasses.float_child} style={{ marginLeft: "0px" }}>
                                    <Button
                                        sx={{
                                            fontSize: "12px",
                                            backgroundColor: "DodgerBlue",
                                            padding: "5px", fontFamily: "system-ui",
                                            width: "170px", marginLeft: "0px", marginTop: "2px",
                                        }}
                                        variant="contained"
                                        type="submit"
                                        startIcon={<EditIcon />}
                                        onClick={handleEditAllocation}
                                    >
                                        Edit Allocation</Button>

                                    <Button
                                        sx={{
                                            backgroundColor: "DodgerBlue",
                                            fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                            width: "170px", marginLeft: "5px", marginTop: "2px",
                                        }}
                                        variant="contained"
                                        type="submit"
                                        startIcon={<ContentCopyIcon />}
                                        onClick={handleCopyAllocation}
                                    >
                                        Copy Allocation</Button>

                                    {/* <Button
                                            sx={{
                                                backgroundColor: "DodgerBlue",
                                                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                                width: "170px", marginLeft: "5px", marginTop: "2px",
                                            }}
                                            variant="contained"
                                            type="submit"
                                            startIcon={<ReportIcon />}
                                        >
                                            Alert</Button> */}
                                    {userRole !== 1 && userRole !== 2 ? null :
                                        <Button
                                            sx={{
                                                backgroundColor: "DodgerBlue",
                                                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                                width: "170px", marginLeft: "5px", marginTop: "2px",
                                                '&.Mui-disabled': {
                                                    opacity: 0.5,
                                                    backgroundColor: 'DodgerBlue',
                                                    color: '#fff',
                                                },
                                            }}
                                            variant="contained"
                                            type="submit"
                                            startIcon={<RecommendOutlinedIcon />}
                                            onClick={handleApproveAlloc}
                                        // disabled={userRole !== 1 && userRole !== 2}
                                        >
                                            Approve Allocation</Button>
                                    }
                                    {/* <Button
                                            sx={{
                                                backgroundColor: "DodgerBlue",
                                                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                                width: "170px", marginLeft: "5px", marginTop: "2px",
                                            }}
                                            variant="contained"
                                            type="submit"
                                            startIcon={<DeleteIcon />}
                                        >
                                            Delete Location</Button> */}

                                </div>


                                <div className={AllocDetailsClasses.float_child}>
                                    <Button
                                        sx={{
                                            fontSize: "12px",
                                            backgroundColor: "#228B22",
                                            padding: "5px", fontFamily: "system-ui",
                                            width: "100px", marginLeft: "5px", marginTop: "2px",
                                            '&:hover': {
                                                backgroundColor: '#3CB371', // Change this to the desired "light maroon" color
                                            },
                                        }}
                                        variant="contained"
                                        type="submit"
                                        onClick={handleOk}
                                        startIcon={<DoneAllIcon />}
                                    >
                                        Ok</Button>

                                    <Button
                                        sx={{
                                            backgroundColor: "maroon",
                                            fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                            width: "100px", marginLeft: "5px", marginTop: "2px",
                                            '&:hover': {
                                                backgroundColor: '#8B0000', // Change this to the desired "light maroon" color
                                            },
                                        }}
                                        variant="contained"
                                        type="submit"
                                        startIcon={<CancelIcon />}
                                        onClick={handleCancel}
                                    >
                                        Cancel</Button>

                                </div>
                            </Box>

                        </Box>

                    </div>
                </Box >}

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
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", height: "240px", margin: "0px 10px 0px 0px" }} >
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

            < div >
                <Dialog
                    fullWidth={true}
                    maxWidth="xs"
                    open={openDialogQL}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    disableBackdropClick
                >
                    <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px", margin: "0px", }}></DialogTitle>
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', margin: "0px", padding: "0px 10px 0px 10px", }} >
                        {DialogDataQL}
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px", }}
                            onClick={handleCloseDialog} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            {/* MASS APPROVAL POP-UP */}
            < div >
                <Dialog open={massAprvOpen}
                    onClose={(event, reason) => {
                        if (reason !== 'backdropClick') {

                            setMassAprvOpen(false);
                        }
                    }}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    maxWidth="sm" fullWidth
                    disableBackdropClick
                >
                    <DialogTitle //style={{ cursor: 'move' }} 
                        style={{
                            //cursor: 'move'
                            fontSize: '18px', // Modify the font size here
                            // color:"1px solid black",
                            height: '25px', // Adjust the height here
                            paddingTop: '2px',// Adjust the paddingTop here
                        }}
                        id="draggable-dialog-title">
                        {/* <AssignmentTurnedInIcon size="small" style={{ position:"absolute",top:5,left:0,color: 'green'}}/> */}
                        Approve/Cancel Validation
                    </DialogTitle>
                    <DialogContent
                        style={{
                            paddingBottom: "0px", paddingTop: "5px", paddingLeft: "20px",
                            height: "auto",
                        }}
                    >
                        <DialogContentText>
                            <Box
                                component="fieldset"
                                display="inline-block"
                                sx={{
                                    height: "auto",
                                    marginLeft: "0px",
                                    padding: "0px",
                                    marginTop: "5px",
                                    backgroundColor: "white",
                                    borderRadius: 1,
                                    width: "100%",
                                    boxShadow: 2, border: 0,
                                    borderBottom: 3,
                                }}
                            >

                                <div className={AllocDetailsClasses.TableBoby}>
                                    <Paper sx={{
                                        margin: "0px 0px 0px 0px", mb: 0, height: "auto", width: "calc(100% - 0px)", //borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, 
                                    }}>
                                        <TableContainer style={{
                                            maxHeight: 270, width: "calc(100% - 0px)"
                                        }} component={Paper}>
                                            <Table aria-label="customized table">
                                                <MassAprvHead />
                                                <TableBody>
                                                    {massApvData.length > 0 ?
                                                        massApvData.map((row, index) => (
                                                            <TableRow key={index} >
                                                                <TableCell align="right" sx={{ padding: "0px 0px 0px 5px", fontFamily: "system-ui", textAlign: "left", fontSize: "75%", height: "20px" }}>
                                                                    {row.ALLOC_NO}</TableCell>
                                                                <TableCell align="right" sx={{ padding: "0px 0px 0px 5px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
                                                                    {row.ACTION}
                                                                </TableCell>
                                                                <TableCell align="right" sx={{
                                                                    padding: "0px 0px 0px 3px", textAlign: "left",
                                                                    fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px'
                                                                }}>

                                                                    <Box
                                                                        display="flex"
                                                                        justifyContent="space-between"
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
                                                                                //width: "fit-content"
                                                                            }}
                                                                        >
                                                                            {row.VALIDATION}
                                                                        </InputLabel>
                                                                        <Button sx={{
                                                                            backgroundColor: "", '&:hover': {
                                                                                backgroundColor: "",
                                                                            }, border: 0, color: "CadetBlue", padding: "0px"
                                                                        }}
                                                                            style={{
                                                                                maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start"
                                                                            }}
                                                                            size='small'
                                                                            className={AllocDetailsClasses.textField}
                                                                            onClick={() => {
                                                                                setOpenDialogQL(true);
                                                                                setDialogDataQL(String(row.VALIDATION));
                                                                            }}
                                                                            startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                                        >
                                                                        </Button>
                                                                    </Box>
                                                                </TableCell>


                                                            </TableRow >
                                                        )) : false}
                                                    {massApvData.length < 10 ?
                                                        [...Array(10 - (massApvData.length)).keys()].map(val => (
                                                            <TableRow  >
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} ></TableCell>

                                                            </TableRow >
                                                        )) : false}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <Toolbar
                                            sx={{
                                                pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, ...(massApvData.length > 0 && {
                                                    minHeight: { minHeight: "25px !important", },
                                                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                                                }), padding: "0px",
                                            }}
                                        >
                                            {massApvData.length > 0 && (
                                                <Typography
                                                    sx={{ flex: "1 1 100%", display: "flex", justifyContent: "flex-end", padding: "0px 5px 0px 0px", fontSize: "14px", fontFamily: "system-ui", }}
                                                    color="inherit" variant="subtitle1" component="div"
                                                >Rows : {massApvData.length}
                                                </Typography>)}
                                        </Toolbar>
                                    </Paper>
                                </div>
                            </Box>


                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{
                        backgroundColor: "",// justifyContent: "space-between" 
                    }}>
                        {/* {massApvData.length > 0 ?
                            <span style={{ textAlign: "left", fontSize: "14px", paddingLeft: "10px" }}>
                                {"COUNT: " + massApvData.length}
                            </span>
                            : null
                        } */}
                        <Button
                            sx={{

                                height: "fit-content",//width: "100px", padding: "5px", margin: "0px 15px 0px 0px",
                                // backgroundColor: "green", '&:hover': {
                                //     backgroundColor: "#228B22", textShadow: "0 0 #000"
                                // }, fontSize: "12px", //margin: "0px 0px 0px 0px",

                                fontSize: "12px",
                                backgroundColor: "#228B22",
                                padding: "5px", fontFamily: "system-ui",
                                width: "100px",
                                '&:hover': {
                                    backgroundColor: '#3CB371', // Change this to the desired "light maroon" color
                                },
                            }}
                            size='medium'
                            variant="contained"
                            type="submit"
                            onClick={() => { setMassAprvOpen(false) }}
                            startIcon={<DoneAllIcon />}
                        >OK</Button>


                    </DialogActions>
                </Dialog>
            </div >
        </div >

    )

};

export default AllocSummary;