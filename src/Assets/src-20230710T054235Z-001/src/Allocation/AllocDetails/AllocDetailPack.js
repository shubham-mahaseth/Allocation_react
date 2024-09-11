import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import { makeStyles, withStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import swal from '@sweetalert/with-react';
// import TrnTypeList from "../TRNTYPE";
import Select from 'react-select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { visuallyHidden } from '@mui/utils';
import { ItemWHDetailsHeader } from "./PackHeaders";
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import { BsFillEraserFill } from 'react-icons/bs';
import FormControlLabel from '@mui/material/FormControlLabel';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AnimationIcon from '@mui/icons-material/Animation';
import LockIcon from '@mui/icons-material/Lock';
import Draggable from 'react-draggable';
import { getALLOCHEADDETAILSRequest, } from "../../Redux/Action/quantityLimits"
import {
    postG1ADPKRequest,
    postG2ADPKRequest,
    postRESTOREADPKRequest,
    postUPDATEADPKRequest
} from "../../Redux/Action/AllocDPk";
import {
    postAllocQtyRequest,
    postADSaveRequest,
    postFETCHNNRequest,
} from "../../Redux/Action/createAllocation";
import axios from 'axios';
import { CONFIG } from "../../services/config";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/* STYLING */
const WhiteCell = withStyles({
    root: {
        backgroundColor: 'white',
        // width: '100px',
        '&:not(:last-child)': {
            borderRight: 'none',
        },
        borderRight: 'none',
        borderColor: 'white'
    },
})(TableCell);
const useStyles = makeStyles({
    maindiv: {
        position: "relative",
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
        height: "30px",
        '& input + fieldset': {
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        },
    },
    inputFielddate: {
        width: "200px",
        height: 38,
        border: 0,
        '& input + fieldset': {
            borderRadius: "0",
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        },
    },
    header_container: {
        display: "inline-block",
        width: "100%",
    },
    header_child: {
        display: "inline-block",
        padding: "0rem 0.2rem",
        verticalAlign: "middle",
    },
    inputtable: {
        height: "30px"
    },
    float_child: {
        display: "inline-block",
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
        "&::placeholder": {
            color: "red",
            textAlign: "center"
        }
    },
    course_box: {
        // backgroundColor:"lightgray"
        // border:"2px solid red",
    },
    TableBoby: {
        marginBottom: "0px"
    },
    grid_block: {
        // backgroundColor:"lightgray"
    },
    TableTotalBoby: {
        padding: "0px",
        margin: "0px",
    }

});
const styleSelect1 = {
    control: (base, state) => ({
        ...base,
        width: "100px",
        fontSize: "12px",
        minHeight: "18px",
        margin: "0px 0px 1px 0px",
        padding: "1px",
        borderRadius: "0px",
        border: "0",
        borderBottom: "1px solid gray",
        boxShadow: "none", // Remove the box shadow
        "&:hover": {
            borderColor: "black", // Apply a border color on hover
            borderBottom: state.isFocused ? "2px solid dodgerblue" : "2px solid black",
        },
    })
    ,
    dropdownIndicator: (base) => ({
        ...base,
        padding: 0,
        // paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
        ...base,
        padding: 0,
    }),
    valueContainer: (provided) => ({
        ...provided,
        // minHeight: '1px',
        height: '18px',
        paddingTop: '0',
        paddingBottom: '0',
    }),
    singleValue: (provided) => ({
        ...provided
    }),
    input: (provided) => ({
        ...provided,
        width: "100%",
    }),
    option: provided => ({
        ...provided,
        fontSize: "12px",
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: "gray"
    }),
    menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
    })
};

/* DATA */
const ItemDetailsHeader = [
    { id: "SOURCE_ITEM", label: "Sku", width: "100px" },
    { id: "SOURCE_ITEM_DESC", label: "Description", width: "180px" },
    { id: "DIFF_ID", label: "Variant", width: "90px" },
    { id: "PACK_IND", label: "Pack Ind", width: "45px", maxWidth: "45px" },
    { id: "GROSS_NEED", label: "Gross Need", width: "70px" },
    { id: "STOCK_ON_HAND", label: "On Hand", width: "70px" },
    { id: "FUTURE_FULFILL_QTY", label: "On Order", width: "80px" },
    { id: "NET_NEED", label: "Net Need", width: "70px" },
    { id: "CALC_QTY", label: "Calc Qty", width: "70px" },
    { id: "AVAIL_QTY", label: "Avail Qty", width: "70px" },
    { id: "ALLOC_QTY", label: "Alloc Qty", width: "70px" },
    { id: "REMAIN_QTY", label: "Remain Qty", width: "80px" },
]
const LocGroupItemDetailsHeader = [
    { id: "LOCATION_ID", label: "Location", width: "80px" },
    { id: "GROUP_ID", label: "Location List", width: "100px" },
    { id: "GROUP_DESC", label: "Location Attribute", width: "130px" },
    { id: "WH_ID", label: "WH", width: "80px" },
    { id: "ASSIGN_DEFAULT_WH", label: "Def WH", width: "80px" },
    { id: "ITEM_PARENT", label: "Style", width: "100px" },
    { id: "SOURCE_ITEM", label: "Sku", width: "100px" },
    { id: "SOURCE_ITEM_DESC", label: "Description", width: "200px" },
    { id: "DIFF_ID", label: "Variant", width: "100px" },
    { id: "SOM_QTY", label: "Store Pack Qty", width: "110px" },
    { id: "GROSS_NEED", label: "Gross Need", width: "100px" },
    { id: "STOCK_ON_HAND", label: "On Hand", width: "100px" },
    { id: "FUTURE_FULFILL_QTY", label: "On Order", width: "100px" },
    { id: "NET_NEED", label: "Net Need", width: "100px" },
    { id: "COMP_CALC_QTY", label: "Sku Calc Qty", width: "100px" },
    { id: "CALC_QTY", label: "Calc Qty", width: "100px" },
    { id: "ALLOC_QTY", label: "Alloc Qty", width: "100px" },
    { id: "VARIANCE_PCT", label: "Variance", width: "100px" },
]
const PackIndOptions = [
    { id: "Y" },
    { id: "N" },
]

const AllocDetailsPack = ({ allocNoData, setTab, setDisCond, ApproveFreeseCheck, packADData, setPackADData, setValAD, setADSwitch }) => {

    const [ItemDetailsData, setItemDetailsData] = useState([]);
    const [ItemWHDetailsData, setItemWHDetailsData] = useState([]);
    const [filtrdItemWHData, setfiltrdItemWHData] = useState([]);
    const [LocGroupItemDetailsData, setLocGroupItemDetailsData] = useState([]);
    const [itmDScrn, setItmDScrn] = useState(false);
    const [itmDWScrn, setItmWDScrn] = useState(false);
    const [totalGrd1, setTotalGrd1] = useState([]);
    const [totalGrd2, setTotalGrd2] = useState([]);
    const [alloc_Dtls, setAlloc_Dtls] = useState([]);
    // INLINE SEARCH FILTER
    const [srcFltrItmD, setsrcFltrItmD] = useState([]);
    const [srcFltrLocGrp, setsrcFltrLocGrp] = useState([]);
    const [inputVal, setInputVal] = useState({});
    const [inputValD, setInputValD] = useState({});
    //HIGHLIGHTED
    const [selected, setSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedWRow, setSelectedWRow] = useState(null);
    const [sampleVal, setSampleVal] = useState([]);
    //HOOKS RELATED TO SORTING
    const [sortCheck1, setSortCheck1] = useState(false);
    const [sortValue1, setSortValue1] = useState("");
    const [sortCheck2, setSortCheck2] = useState(false);
    const [sortValue2, setSortValue2] = useState("");
    const [sortCheck3, setSortCheck3] = useState(false);
    const [sortValue3, setSortValue3] = useState("");
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [order1, setOrder1] = React.useState('asc');
    const [orderBy1, setOrderBy1] = React.useState('');
    const [order2, setOrder2] = React.useState('asc');
    const [orderBy2, setOrderBy2] = React.useState('');

    const [editAQ, setEditAQ] = useState([]);
    const [editAQCheck, setEditAQCheck] = useState(false);
    const [AllocQtyData, setAllocQtyData] = useState([]);
    //POP-UP HOOKS
    const [grid1Header, setGrid1Header] = useState([]);
    const [grid2Header, setGrid2Header] = useState([]);
    const [grid1Data, setGrid1Data] = useState([]);
    const [grid2Data, setGrid2Data] = useState([]);
    // COPY DOWN AND ERASE 
    const [LockCheck, setLockCheck] = useState(false);
    const [copyValue, setCopyValue] = useState({});
    /* Temporary Data */
    const [topGData, setTopGData] = useState([]);
    const [midGData, setMidGData] = useState([]);
    const [g2Data, setG2Data] = useState([]);
    // const [fltrdMidGData, setfltrdMidGData] = useState([]);
    const [editAQG2, setEditAQG2] = useState([]);
    /* COPY DOWN VARIABLE */
    const [cLocData, setCLocData] = useState([]);
    const [cUpdateChk, setCUpdateChk] = useState([]);
    const [copyRData, setCopyRData] = useState([]);
    // LOADING
    const [packLocData, setPackLocData] = useState([])
    const [LoadCheck, setLoadCheck] = useState(false);

    // ERROR POPUP MESSAGE
    const [openDialogAllocDtl, setOpenDialogAllocDtl] = useState(false);
    const [DialogDataAllocDtl, setDialogDataAllocDtl] = useState("");

    // Manage columns popup in Table Grid
    const [openDialogManageItemDtl, setOpenDialogManageItemDtl] = useState(false);
    const [openDialogManageItemWHDtl, setOpenDialogManageItemWHDtl] = useState(false);
    const [openDialogManageLocGroup, setOpenDialogManageLocGroup] = useState(false);

    const [isSHovered1, setIsHovered1] = useState(false);
    const [isSHovered2, setIsHovered2] = useState(false);
    const [isSHovered3, setIsHovered3] = useState(false);

    const handleSEnter1 = () => { setIsHovered1(true); };
    const handleSEnter2 = () => { setIsHovered2(true); };
    const handleSEnter3 = () => { setIsHovered3(true); };

    const handleSLeave1 = () => { setIsHovered1(false); };
    const handleSLeave2 = () => { setIsHovered2(false); };
    const handleSLeave3 = () => { setIsHovered3(false); };

    // CHECK OK/CANCEL CLICK
    var okButtonClicked = false;
    var cancelButtonClicked = false;
    const [closeOnBlur, setCloseOnBlur] = useState("");

    const AllocDetailsClasses = useStyles();
    const dispatch = useDispatch();
    const AllocDetailsPData = useSelector(
        (state) => state.AllocDPkReducers
    );
    const CreateAllocationData = useSelector(
        (state) => state.CreateAllocationReducers
    );
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

    const serializedata3 = (datatable) => {
        let newTabledata = [];
        let count = 1;
        if (datatable.length > 0) {
            datatable.map(item => {
                item['SR_NO'] = count;
                const reorder = {
                    "ALLOC_NO": "", "WH_ID": "", "SOURCE_ITEM": "", "SOURCE_ITEM_DESC": "",
                    "DIFF_ID": "", "PO_NO": "", "LOCATION_ID": "", "LOCATION_DESC": "", "GROUP_ID": "",
                    "GROUP_DESC": "", "ASSIGN_DEFAULT_WH": "", "RULE_TYPE": "", "SOM_QTY": "", "GROSS_NEED": "",
                    "STOCK_ON_HAND": "", "FUTURE_FULFILL_QTY": "", "NET_NEED": "", "CALC_QTY": "",
                    "ALLOC_QTY": "", "VARIANCE_PCT": "", "SEL_IND": "", "ITEM_PARENT": "", "PACK_NO": "",
                    "COMP_CALC_QTY": ""
                }
                count++;

                let test = Object.assign(reorder, item);
                newTabledata.push(test);
            })
            // setTabledataclone(newTabledata)
            return newTabledata;
        }
    }
    const serializedataG2 = (datatable) => {
        let newTabledata = [];
        let count = 1;
        if (datatable.length > 0) {
            datatable.map(item => {
                item['SR_NO'] = count;
                const reorder = {
                    "ALLOC_NO": "",
                    "ALLOC_QTY": "",
                    "AVAIL_QTY": "",
                    "HIGHEST_CALC_QTY": "",
                    "HIGHEST_QTY_STORE": "",
                    "ITEM_DESC": "",
                    "REMAIN_QTY": "",
                    "TRAN_ITEM": "",
                    "WH": "",
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
        document.title = 'Alloc Detail For Pack';
    }, []);
    useEffect(() => {
        if (alloc_Dtls.length === 0) {
            dispatch(getALLOCHEADDETAILSRequest([allocNoData]));
            setLoadCheck(true);
        }
    }, [""]);


    useEffect(() => {
        if (packADData.length > 0 && alloc_Dtls.length > 0) {
            if (packADData[0].length === 0 || packADData[1].length === 0 || packADData[2].length === 0) {
                var emptyChk = 0;
                if (packADData[0].length === 0) {
                    packADData[0] = [{
                        'ALLOC_NO': "", 'SOURCE_ITEM': "", 'SOURCE_ITEM_DESC': "", 'DIFF_ID': "", 'PO_NO': "",
                        'RULE_TYPE': "", 'GROSS_NEED': "", 'STOCK_ON_HAND': "", 'FUTURE_FULFILL_QTY': "", 'NET_NEED': "",
                        'CALC_QTY': "", 'AVAIL_QTY': "", 'ALLOC_QTY': "", 'REMAIN_QTY': "", 'SPREAD_QTY': "", 'SOM_QTY': "", 'PACK_IND': ""
                    }]
                    setOpenDialogAllocDtl(true);
                    setDialogDataAllocDtl("Alloc details top grid is empty no data retrieved from function 'RTV_ALLOC_DTL'.");
                    emptyChk = 1;
                }
                if (packADData[2].length === 0) {
                    packADData[2] = [{
                        'ALLOC_NO': "", 'WH_ID': "", 'SOURCE_ITEM': "", 'SOURCE_ITEM_DESC': "", 'DIFF_ID': "",
                        'PO_NO': "", 'RULE_TYPE': "", 'GROSS_NEED': "", 'STOCK_ON_HAND': "", 'FUTURE_FULFILL_QTY': "",
                        'NET_NEED': "", 'CALC_QTY': "", 'AVAIL_QTY': "", 'ALLOC_QTY': "", 'REMAIN_QTY': "",
                        'SPREAD_QTY': "", 'SOM_QTY': ""
                    }]
                    if (emptyChk === 0) {
                        setOpenDialogAllocDtl(true);
                        setDialogDataAllocDtl("Alloc details middle grid is empty no data retrieved from function 'RTV_ALLOC_DTL'.");
                        emptyChk = 2;
                    }

                }
                if (packADData[1].length === 0) {
                    packADData[1] = [{
                        "ALLOC_NO": "", "WH_ID": "", "SOURCE_ITEM": "", "SOURCE_ITEM_DESC": "",
                        "DIFF_ID": "", "PO_NO": "", "LOCATION_ID": "", "LOCATION_DESC": "", "GROUP_ID": "",
                        "GROUP_DESC": "", "ASSIGN_DEFAULT_WH": "", "RULE_TYPE": "", "SOM_QTY": "", "GROSS_NEED": "",
                        "STOCK_ON_HAND": "", "FUTURE_FULFILL_QTY": "", "NET_NEED": "", "CALC_QTY": "",
                        "ALLOC_QTY": "", "VARIANCE_PCT": "", "SEL_IND": "", "ITEM_PARENT": "", "PACK_NO": "",
                        "COMP_CALC_QTY": ""
                    }]
                    if (emptyChk === 0) {
                        setOpenDialogAllocDtl(true);
                        setDialogDataAllocDtl("Alloc details bottom grid is empty no data retrieved from function'RTV_ALLOC_DTL'.");
                    }
                }
            }
            const itmD = packADData[0]
            const itmWD = packADData[2]
            const itmLocD = serializedata3(packADData[1])
            setItemDetailsData(itmD);
            setsrcFltrItmD(itmD);
            setItemWHDetailsData(itmWD);
            setfiltrdItemWHData(itmWD.filter((obj) => obj.SOURCE_ITEM === (itmD)[0].SOURCE_ITEM));
            setLocGroupItemDetailsData(itmLocD);
            setsrcFltrLocGrp(itmLocD);
            setSelectedRow([{ "LOC": itmLocD[0].LOCATION_ID, "ITEM": itmLocD[0].SOURCE_ITEM, "DIFF_ID": itmLocD[0].DIFF_ID }]);
            setSelectedWRow(itmWD[0])
            var totalAllocGrid1 = 0;
            var totalAvailGrid1 = 0;
            var totalAllocGrid2 = 0;
            var totalCalcGrid2 = 0;
            itmD.map(obj => {
                if (obj.ALLOC_QTY !== "") {
                    totalAllocGrid1 = totalAllocGrid1 + obj.ALLOC_QTY;
                }
                if (obj.AVAIL_QTY !== "") {
                    totalAvailGrid1 = totalAvailGrid1 + obj.AVAIL_QTY;
                }
            });
            itmLocD.map(obj => {
                if (obj.ALLOC_QTY !== "") {
                    totalAllocGrid2 = totalAllocGrid2 + obj.ALLOC_QTY;
                }
                if (obj.CALC_QTY !== "") {
                    totalCalcGrid2 = totalCalcGrid2 + obj.CALC_QTY;
                }
            });
            setTotalGrd1([totalAvailGrid1, totalAllocGrid1]);
            setTotalGrd2([totalCalcGrid2, totalAllocGrid2]);
            packADData.splice(0, packADData.length);
            setLoadCheck(false);
        }
    }, [alloc_Dtls]);

    /*
    ****************************************
    ******   HANDLING API RESPONSE    ******
    ****************************************
    */
    useEffect(() => {

        if (CreateAllocationData?.data?.allocHDetails && Array.isArray(CreateAllocationData?.data?.allocHDetails) && alloc_Dtls.length === 0) {
            setAlloc_Dtls(CreateAllocationData?.data?.allocHDetails);
            setLoadCheck(false);
            CreateAllocationData.data.allocHDetails = 0
        } else if (AllocDetailsPData?.data?.grid1Data && Array.isArray(AllocDetailsPData?.data?.grid1Data)) {
            setGrid1Data(AllocDetailsPData?.data?.grid1Data);
            setLoadCheck(false);
        } else if (AllocDetailsPData?.data?.grid2Data && Array.isArray(AllocDetailsPData?.data?.grid2Data)) {
            setGrid2Data(AllocDetailsPData?.data?.grid2Data);
            setLoadCheck(false);
            setG2Data(serializedataG2(AllocDetailsPData?.data?.grid2Data));
            AllocDetailsPData.data.grid2Data = ""
        }
        if (CreateAllocationData?.data?.AllocQtyData && Array.isArray(CreateAllocationData?.data?.AllocQtyData)) {
            setAllocQtyData(CreateAllocationData?.data?.AllocQtyData);
            if (editAQ.length > 0) {
                setEditAQCheck(true);
            } else if (editAQG2.length > 0) {
                setEditAQCheck(true);
            }
        }
    }, [AllocDetailsPData?.data, CreateAllocationData?.data]);


    /* HANDLING ERRORS */
    useEffect(() => {

        if ((CreateAllocationData?.data?.AllocQtyData?.status) === 500) {
            setLoadCheck(false);
            if (CreateAllocationData?.data?.AllocQtyData?.message === "object of type 'bool' has no len()") {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl("Connection Lost");
            } else {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl(String(CreateAllocationData?.data?.AllocQtyData?.message));
            }
            CreateAllocationData.data.AllocQtyData.status = 0
        }
        else if (CreateAllocationData?.data?.NNData?.status === 500) {
            setLoadCheck(false);
            if (CreateAllocationData?.data?.NNData?.message === "object of type 'bool' has no len()") {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl("Connection Lost");
            } else {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl(String(CreateAllocationData?.data?.NNData?.message));
            }
            CreateAllocationData.data.NNData.status = 0
        } else if (CreateAllocationData?.data?.allocHDetails?.status === 500) {
            setLoadCheck(false);
            setOpenDialogAllocDtl(true);
            setDialogDataAllocDtl(String(CreateAllocationData?.data?.allocHDetails?.message));
            CreateAllocationData.data.allocHDetails.status = 0
        }

        if (AllocDetailsPData?.data?.grid2Data?.status === 500) {
            setLoadCheck(false);
            if (AllocDetailsPData?.data?.grid2Data?.message === "object of type 'bool' has no len()") {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl("Connection Lost");
            } else {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl(String(AllocDetailsPData?.data?.grid2Data?.message));
            }
            AllocDetailsPData.data.grid2Data.status = 0
        } else if (AllocDetailsPData?.data?.grid1Data?.status === 500) {
            setLoadCheck(false);
            if (AllocDetailsPData?.data?.grid2Data?.message === "object of type 'bool' has no len()") {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl("Connection Lost");
            } else {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl(String(AllocDetailsPData?.data?.grid1Data?.message));
            }
            AllocDetailsPData.data.grid1Data.status = 0
        }
    }, [CreateAllocationData?.data, AllocDetailsPData?.data]);

    /*
    ****************************************
    ******    COPY DOWN & ON BLUR     ******
    ****************************************
     */
    const handleOkButtonMouseDown = () => {
        okButtonClicked = true;
    };
    const handleCancelButtonMouseDown = () => {
        cancelButtonClicked = true;
    };
    const handleCancel = () => {
        cancelButtonClicked = false;
        dispatch(postADSaveRequest(["CLOSE"]));
        setTab('1');
        setDisCond(0);
        setPackADData([]);
        setValAD(false);
        setADSwitch(0);
        document.title = 'Create Allocation';
    }
    const handleOk = () => {
        okButtonClicked = false;
        dispatch(postADSaveRequest(["SAVE"]));
        setTab('1');
        setDisCond(0);
        setPackADData([]);
        setValAD(false);
        setADSwitch(0);
        document.title = 'Create Allocation';
    }
    if (editAQCheck && editAQ.length > 0) {

        if (AllocQtyData.length > 1) {
            ItemDetailsData.map(obj => {
                if (obj.SOURCE_ITEM === editAQ[0].SOURCE_ITEM && obj.DIFF_ID === editAQ[0].DIFF_ID) {
                    obj.ALLOC_QTY = AllocQtyData[0]
                    obj.REMAIN_QTY = obj.AVAIL_QTY - AllocQtyData[0]

                }
            })
            setItemDetailsData(ItemDetailsData)

            ItemWHDetailsData.map(obj => {
                if (obj.SOURCE_ITEM === editAQ[0].SOURCE_ITEM && obj.DIFF_ID === editAQ[0].DIFF_ID && obj.WH_ID === editAQ[0].WH_ID) {
                    obj.ALLOC_QTY = AllocQtyData[1]
                }
            })
            setItemWHDetailsData(ItemWHDetailsData);

            filtrdItemWHData.filter(obj => {
                if (obj.SOURCE_ITEM === editAQ[0].SOURCE_ITEM && obj.DIFF_ID === editAQ[0].DIFF_ID && obj.WH_ID === editAQ[0].WH_ID) {
                    obj.ALLOC_QTY = AllocQtyData[1]
                    obj.REMAIN_QTY = obj.AVAIL_QTY - AllocQtyData[1]
                }
            })
            setfiltrdItemWHData(filtrdItemWHData);

            LocGroupItemDetailsData.map(obj => {
                if (obj.SOURCE_ITEM === editAQ[0].SOURCE_ITEM && obj.DIFF_ID === editAQ[0].DIFF_ID && obj.LOCATION_ID === editAQ[0].LOCATION_ID) {
                    obj.ALLOC_QTY = AllocQtyData[2]
                }
            })
            setLocGroupItemDetailsData(LocGroupItemDetailsData);
        } else {

            //const allocData = (srcFltrLocGrp.filter(obj => editAQ[0].SOURCE_ITEM && obj.DIFF_ID === editAQ[0].DIFF_ID && obj.LOCATION_ID === editAQ[0].LOCATION_ID))[0]
            LocGroupItemDetailsData.map(obj => {
                if (obj.SOURCE_ITEM === editAQ[0].SOURCE_ITEM && obj.DIFF_ID === editAQ[0].DIFF_ID && obj.LOCATION_ID === editAQ[0].LOCATION_ID) {
                    obj.ALLOC_QTY = packLocData.length > 0 ? packLocData[0].ALLOC_QTY : 0
                }
            });
            setLocGroupItemDetailsData(LocGroupItemDetailsData);
        }
        const totalAllocGrid1 = ItemDetailsData.reduce((total, obj) => total + (obj.ALLOC_QTY !== "" ? obj.ALLOC_QTY : 0), 0);
        const totalAvailGrid1 = ItemDetailsData.reduce((total, obj) => total + (obj.AVAIL_QTY !== "" ? obj.AVAIL_QTY : 0), 0);
        const totalAllocGrid2 = LocGroupItemDetailsData.reduce((total, obj) => total + (obj.ALLOC_QTY !== "" ? obj.ALLOC_QTY : 0), 0);
        const totalCalcGrid2 = LocGroupItemDetailsData.reduce((total, obj) => total + (obj.CALC_QTY !== "" ? obj.CALC_QTY : 0), 0);

        setTotalGrd1([totalAvailGrid1, totalAllocGrid1]);
        setTotalGrd2([totalCalcGrid2, totalAllocGrid2]);

        setPackLocData([]);
        setEditAQCheck(false);
        setEditAQ([]);
        setLoadCheck(false);
        if (closeOnBlur === "OK") {
            setCloseOnBlur("");
            handleOk();
            okButtonClicked = false; // Reset the flag after handling the OK button click
        }
        // else if (closeOnBlur ==="CANCEL") {
        //     setCloseOnBlur("");
        //     handleCancel();            
        //     cancelButtonClicked = false;
        // }
    }
    if (editAQCheck && editAQG2.length > 0) {

        ItemDetailsData.map(obj => {
            if (obj.SOURCE_ITEM === editAQG2[0].SOURCE_ITEM && obj.DIFF_ID === editAQG2[0].DIFF_ID) {
                obj.ALLOC_QTY = AllocQtyData[0]
                obj.REMAIN_QTY = obj.AVAIL_QTY - AllocQtyData[0]

            }
        })
        setItemDetailsData(ItemDetailsData)

        ItemWHDetailsData.map(obj => {
            if (obj.SOURCE_ITEM === editAQG2[0].SOURCE_ITEM && obj.DIFF_ID === editAQG2[0].DIFF_ID && obj.WH_ID === editAQG2[0].WH_ID) {
                obj.ALLOC_QTY = AllocQtyData[1]
            }
        })
        setItemWHDetailsData(ItemWHDetailsData);

        filtrdItemWHData.filter(obj => {
            if (obj.SOURCE_ITEM === editAQG2[0].SOURCE_ITEM && obj.DIFF_ID === editAQG2[0].DIFF_ID && obj.WH_ID === editAQG2[0].WH_ID) {
                obj.ALLOC_QTY = AllocQtyData[1]
                obj.REMAIN_QTY = obj.AVAIL_QTY - AllocQtyData[1]
            }
        })
        setfiltrdItemWHData(filtrdItemWHData);



        grid2Data.map(obj => {
            if (obj.TRAN_ITEM === editAQG2[0].SOURCE_ITEM && obj.WH === editAQG2[0].LOCATION_ID) {
                obj.ALLOC_QTY = AllocQtyData[2];
            }
        })
        const totalAllocGrid1 = ItemDetailsData.reduce((total, obj) => total + (obj.ALLOC_QTY !== "" ? obj.ALLOC_QTY : 0), 0);
        const totalAvailGrid1 = ItemDetailsData.reduce((total, obj) => total + (obj.AVAIL_QTY !== "" ? obj.AVAIL_QTY : 0), 0);

        setTotalGrd1([totalAvailGrid1, totalAllocGrid1]);
        setGrid2Data(grid2Data);

        setEditAQCheck(false);
        setEditAQG2([]);
        setAllocQtyData([]);
        setLoadCheck(false);
    }

    const SearchHeader = () => (
        <Box
            component="fieldset"
            display="flex"
            sx={{
                backgroundColor: "",
                height: "auto",
                width: "calc(93vw - 0px)",
                borderRadius: 1,
                boxShadow: 2, border: 0,
                borderBottom: 3,
                border: "1px solid lightgrey",
            }}
        >
            <legend style={{ fontWeight: "bold" }}>Header</legend>
            <div className={AllocDetailsClasses.header_container}>
                <div className={AllocDetailsClasses.header_child}>
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
                                    height: "15px",
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                }
                            }}
                            id="outlined-disabled"
                            name="ALLOC_NO"
                            placeholder="ALLOC_NO"
                            value={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_NO : null}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' }
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Description</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            value={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_DESC : null}
                            sx={{
                                margin: "0px 0px 2px 0px", width: "25vh"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "13px",
                                },
                                borderRadius: "5px",
                                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                            }}
                            id="outlined-disabled"
                            name="ALLOC_DESC"
                            placeholder="ALLOC_DESC"
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                endAdornment: <SearchButtonTrend desc={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_DESC : null} />,
                                style: { fontSize: 12, backgroundColor: "#f0f0f0", },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Alloc Context</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            value={alloc_Dtls.length > 0 ? alloc_Dtls[0].CONTEXT : null}
                            sx={{
                                margin: "0px 0px 2px 0px", width: "20vh"
                                , "& .MuiInputBase-input.Mui-disabled": {
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
                            id="outlined-disabled"
                            name="CONTEXT_TYPE"
                            placeholder="CONTEXT_TYPE"
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                {alloc_Dtls.length > 0 && alloc_Dtls[0].CONTEXT_CODE === "PROM" ?
                    <div className={AllocDetailsClasses.header_child}>
                        <div>
                            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                                Promotion</InputLabel>
                        </div>
                        <div className={AllocDetailsClasses.multiselectfield}>
                            <TextField
                                size="small"
                                value={alloc_Dtls.length > 0 ? alloc_Dtls[0].PROMOTION : ""}
                                sx={{
                                    margin: "0px 0px 2px 0px", width: "20vh"
                                    , "& .MuiInputBase-input.Mui-disabled": {
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
                                id="outlined-disabled"
                                name="PROMOTION"
                                inputProps={{
                                    maxLength: 100, sx: { backgroundColor: '#fff' },
                                }}
                                InputProps={{
                                    style: { fontSize: 12 },
                                    className: AllocDetailsClasses.input,
                                }}
                                disabled
                            />
                        </div>
                    </div>
                    : null}


                <div className={AllocDetailsClasses.header_child}>
                    <div >
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Alloc Level</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            value={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_LEVEL : null}
                            sx={{
                                margin: "0px 0px 2px 0px", width: "20vh"
                                , "& .MuiInputBase-input.Mui-disabled": {
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
                            id="outlined-disabled"
                            name="ALLOC_LEVEL"
                            placeholder="ALLOC_LEVEL"
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Release Date</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            value={alloc_Dtls.length > 0 ? alloc_Dtls[0].RELEASE_DATE : null}
                            sx={{
                                margin: "0px 0px 2px 0px", width: "140px"
                                , "& .MuiInputBase-input.Mui-disabled": {
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
                            id="outlined-disabled"
                            name="RELEASE_DATE"
                            placeholder="RELEASE_DATE"
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Status</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            value={alloc_Dtls.length > 0 ? alloc_Dtls[0].STATUS : null}
                            sx={{
                                margin: "0px 0px 2px 0px", width: "20vh"
                                , "& .MuiInputBase-input.Mui-disabled": {
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
                            placeholder="STATUS"
                            name="STATUS"
                            id="outlined-disabled"
                            InputProps={{
                                style: { fontSize: 12, },
                                className: AllocDetailsClasses.input,
                            }}
                            inputProps={{ sx: { backgroundColor: '#fff' } }}
                            disabled
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Alloc Type</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            value={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_TYPE : null}
                            sx={{
                                margin: "0px 0px 2px 0px", width: "20vh"
                                , "& .MuiInputBase-input.Mui-disabled": {
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
                            id="outlined-disabled"
                            name="ALLOC_TYPE"
                            placeholder="ALLOC_TYPE"
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12, },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 0px", display: 'inline', float: 'left' }}>
                            Allocator</InputLabel>
                    </div>
                    <div>
                        <TextField
                            variant="outlined"
                            value={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOCATOR : null}
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 0px", width: "140px"
                                , "& .MuiInputBase-input.Mui-disabled": {
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
                            placeholder="CREATE_ID"
                            name="CREATE_ID"
                            id="outlined-disabled"
                            inputProps={{ sx: { backgroundColor: '#fff' } }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>
            </div>
        </Box>
    )

    /*
       ****************************************
       ******        TABLE HEADER        ******
       ****************************************
     */
    function ItemDetailsTableHead(props) {
        const { onSelectAllClick, order1, orderBy1, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead className={AllocDetailsClasses.TitleHead}
                    sx={{ position: "sticky", top: -1, }}
                >
                    <TableRow className={AllocDetailsClasses.TitleRow}
                        sx={{ border: "1px solid red" }}>

                        {ItemDetailsHeader.map((headCell) => ManageHeaderDataItemDtl.includes(headCell.id) && (headCell.id !== "PACK_IND" ?
                            <StyledTableCell
                                key={headCell.id}
                                // className={AllocDetailsClasses.TableCell}
                                size="small"
                                sortDirection={orderBy1 === headCell.id ? order1 : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "3px",
                                    // border: "1px solid black",
                                    width: headCell.width, maxWidth: headCell.width
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy1 === headCell.id}
                                    direction={orderBy1 === headCell.id ? order1 : "asc"}
                                    onClick={createSortHandler(headCell.id)}
                                    size="small"
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
                                            marginLeft: "0px"
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
                            :
                            <StyledTableCell
                                key={headCell.id}
                                // className={AllocDetailsClasses.TableCell}
                                size="small"
                                sortDirection={orderBy1 === headCell.id ? order1 : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "3px", color: "#fff",
                                    // border: "1px solid black",
                                    width: headCell.width, maxWidth: headCell.maxWidth
                                }}
                            >{headCell.label}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>

            </>
        );
    }
    function ItemWHDetailsTableHead(props) {
        const { onSelectAllClick, order2, orderBy2, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
        return (
            <>
                <TableHead className={AllocDetailsClasses.TitleHead}
                    sx={{ position: "sticky", top: -1, }}
                >
                    <TableRow className={AllocDetailsClasses.TitleRow}>

                        {ItemWHDetailsHeader.map((headCell) => (ManageHeaderDataItemWHDtl.includes(headCell.id) &&
                            <StyledTableCell
                                key={headCell.id}
                                // className={AllocDetailsClasses.TableCell}
                                size="small"
                                sortDirection={orderBy2 === headCell.id ? order2 : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "3px", width: headCell.width
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy2 === headCell.id}
                                    direction={orderBy2 === headCell.id ? order2 : "asc"}
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
                                    {orderBy2 === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order2 === "desc"
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
    function LocGroupItemDetailsTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

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
                                indeterminate={selected.length > 0 && selected.length < LocGroupItemDetailsData.length}
                                checked={LocGroupItemDetailsData.length > 0 && selected.length === LocGroupItemDetailsData.length}
                                onChange={onSelectAllClick}
                                disabled={ApproveFreeseCheck}
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


                        {LocGroupItemDetailsHeader.map((headCell) => (ManageHeaderDataLocGroup.includes(headCell.id) &&
                            <StyledTableCell
                                key={headCell.id}
                                // className={AllocDetailsClasses.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px",
                                    width: headCell.width, maxWidth: headCell.width
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
                                            marginLeft: "0px"
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

    ItemDetailsTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };
    ItemWHDetailsTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };
    LocGroupItemDetailsTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };
    /*  <> */
    function PaperComponent(props) {
        return (
            <Draggable
                handle="#draggable-dialog-title"
                cancel={'[class*="MuiDialogContent-root"]'}
            >
                <Paper {...props} />
            </Draggable>
        );
    }
    const SearchButtonTrend = (input) => (

        <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
            <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
                onClick={() => {
                    setOpenDialogAllocDtl(true);
                    setDialogDataAllocDtl(String(input[(Object.keys(input))[0]]));
                }}
            />
        </IconButton>
    )
    /*
                                #########################################
                                ######### SORTING FUNCTIONALITY #########
                                #########################################
            */
    useEffect(() => {
        if (sortCheck1) {
            if (order1 === "asc" && packADData.length === 0) {
                const sortedData = stableSort(ItemDetailsData, getComparator("asc", sortValue1));
                setItemDetailsData(sortedData);
            }
            if (order1 === "desc" && packADData.length === 0) {
                const sortedData = stableSort(ItemDetailsData, getComparator("desc", sortValue1));
                setItemDetailsData(sortedData);
            }
            setSortCheck1(false)
        }
        if (sortCheck2) {
            if (order2 === "asc") {
                const sortedData = stableSort(filtrdItemWHData, getComparator("asc", sortValue2));
                setfiltrdItemWHData(sortedData);
            }
            if (order2 === "desc") {
                const sortedData = stableSort(filtrdItemWHData, getComparator("desc", sortValue2));
                setfiltrdItemWHData(sortedData);
            }
            setSortCheck2(false)
        }
        if (sortCheck3) {
            if (order === "asc") {
                const sortedData = stableSort(LocGroupItemDetailsData, getComparator("asc", sortValue3));
                setLocGroupItemDetailsData(sortedData);
            }
            if (order === "desc") {
                const sortedData = stableSort(LocGroupItemDetailsData, getComparator("desc", sortValue3));
                setLocGroupItemDetailsData(sortedData);
            }
            setSortCheck3(false)
        }
    }, [filtrdItemWHData, order2, orderBy2, ItemDetailsData, order1, orderBy1, LocGroupItemDetailsData, order, orderBy]);

    function descendingComparator(a, b, orderBy) {
        let c, d;
        if (orderBy == "SOURCE_ITEM" || orderBy == "LOCATION_ID") {
            c = parseInt(b[orderBy]);
            d = parseInt(a[orderBy]);
        } else if (orderBy == "DIFF_ID") {
            c = (b[orderBy]);
            d = (a[orderBy]);
        }
        else {
            c = b[orderBy] === '' ? '' : isNaN(b[orderBy]) ? b[orderBy] : parseInt(b[orderBy]);
            d = a[orderBy] === '' ? '' : isNaN(a[orderBy]) ? a[orderBy] : parseInt(a[orderBy]);
        }
        if (c === "" || d === "") {
            if (c === "" && d !== "") {
                return 1
            }
            else if (d === "" && c !== "") {
                return -1
            }
            else {
                return -1
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

    const handleRequestSort1 = (event, property) => {
        if (event) {
            setSortCheck1(true)
            setSortValue1(String(property))
        }
        const isAsc = (orderBy1 === property && order1 === 'asc');
        setOrder1(isAsc ? 'desc' : 'asc');
        setOrderBy1(property);
    };
    const handleRequestSort2 = (event, property) => {
        if (event) {
            setSortCheck2(true)
            setSortValue2(String(property))
        }
        const isAsc = (orderBy2 === property && order2 === 'asc');
        setOrder2(isAsc ? 'desc' : 'asc');
        setOrderBy2(property);
    };
    const handleRequestSort = (event, property) => {
        if (event) {
            setSortCheck3(true)
            setSortValue3(String(property))
        }
        const isAsc = (orderBy === property && order === 'asc');
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    /*
                          #########################################
                          ######### CHECKBOX FUNCTIONALITY ########
                          #########################################
      */
    const handleSelectAllClick = (event) => {
        if (event.target.checked && selected.length === 0) {
            const newSelected = LocGroupItemDetailsData.map((n) => n.SR_NO);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
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
        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const handleRowClick = (rowId) => {
        setSelectedRow([{ "LOC": rowId.LOCATION_ID, "ITEM": rowId.SOURCE_ITEM, "DIFF_ID": rowId.DIFF_ID }]);
    };
    const handleWRowClick = (rowId) => {
        setSelectedWRow(rowId);
    };

    /*
            ################################
            ######## POP_UP SCREENS ########
            ################################
    */
    const QPHeader1 = [

        { id: "Pack No", width: "50px" }, { id: "Item", width: "80px" }, { id: "Description", width: "150px" },
        { id: "Pack Qty", width: "40px" }//, { id: "Avail Qty", width: "50px" }
    ]
    const QPHeader2 = [

        { id: "Pack No", width: "50px" }, { id: "Description", width: "150px" }, { id: "Store", width: "70px" },
        { id: "Calc Qty", width: "50px" }, { id: "Alloc Qty", width: "50px" }
    ]
    let isClickInProgress = false;
    const handleItemWH = (item) => {
        if (isClickInProgress) {
            return;
        }

        isClickInProgress = true;
        const filteredItemWHData = ItemWHDetailsData.filter(obj => (obj.SOURCE_ITEM === item.SOURCE_ITEM && obj.DIFF_ID === item.DIFF_ID));
        setfiltrdItemWHData(filteredItemWHData);
        setSelectedWRow(filteredItemWHData.length > 0 ? filteredItemWHData[0] : null);
        isClickInProgress = false;
    }

    const handleItmDClick = (row) => {

        dispatch(postG1ADPKRequest([{ "ALLOC_NO": row.ALLOC_NO, "PACK_NO": row.SOURCE_ITEM }]));
        setGrid1Header(row);
        setItmDScrn(true);
        setLoadCheck(true);
    }
    const handleItmWDClick = (row) => {
        const pack_chk = (ItemDetailsData.filter(obj => obj.SOURCE_ITEM === row.SOURCE_ITEM && obj.DIFF_ID === row.DIFF_ID))[0]
        if (pack_chk.PACK_IND === 'Y') {
            const topG = ItemDetailsData.filter(obj => obj.SOURCE_ITEM === row.SOURCE_ITEM && obj.DIFF_ID === row.DIFF_ID)
            const midG = filtrdItemWHData.filter(obj => obj.SOURCE_ITEM === row.SOURCE_ITEM && obj.DIFF_ID === row.DIFF_ID)

            setTopGData([topG[0].ALLOC_QTY]);
            setMidGData([row.ALLOC_QTY]);
            dispatch(postG2ADPKRequest([{ "ALLOC_NO": row.ALLOC_NO, "PACK_NO": row.SOURCE_ITEM, "WH_ID": row.WH_ID }]));
            setGrid2Header(row);
            setItmWDScrn(true);
            setLoadCheck(true);
        }
    }
    function QtyPackHead1(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead className={AllocDetailsClasses.TitleHead}
                    sx={{ position: "sticky", top: -1, }}
                >
                    <TableRow className={AllocDetailsClasses.TitleRow}>


                        {QPHeader1.map((headCell) => (

                            <StyledTableCell
                                key={headCell.id}
                                // className={AllocDetailsClasses.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "3px", //width: "fit-content" //
                                    width: headCell.width
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
                                    }}
                                >
                                    {headCell.id}
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
    function QtyPackHead2(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead className={AllocDetailsClasses.TitleHead}
                    sx={{ position: "sticky", top: -1, }}
                >
                    <TableRow className={AllocDetailsClasses.TitleRow}>


                        {QPHeader2.map((headCell) => (

                            <StyledTableCell
                                key={headCell.id}
                                // className={AllocDetailsClasses.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "3px", //width: "fit-content" //
                                    width: headCell.width
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
                                    }}
                                >
                                    {headCell.id}
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
    const QtyOfPack1 = () => (
        <Box
            component="fieldset"
            display="flex" justifyContent={"space-between"}
            sx={{
                height: "auto",
                marginLeft: "0px",
                marginTop: "10px",
                padding: "0px 4px 10px 7px",
                backgroundColor: "white",
                borderRadius: 1,
                width: "100%",
                boxShadow: 2, border: 0,
                borderBottom: 3,
            }}
        >

            <div className={AllocDetailsClasses.header_container}>
                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Pack No</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "13px",
                                },
                                borderRadius: "5px",
                                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                            }}
                            id="outlined-disabled"
                            name="PACK_NO"
                            value={grid1Header.SOURCE_ITEM}
                            InputProps={{
                                endAdornment: <SearchButtonTrend desc={grid1Header.SOURCE_ITEM_DESC} />,
                                style: {
                                    fontSize: 12, backgroundColor: "#f0f0f0", height: "30px",
                                },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>
                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Diff ID</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "13px",
                                },
                                borderRadius: "5px",
                                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                            }}
                            id="outlined-disabled"
                            name="DIFF_ID"
                            value={grid1Header.DIFF_ID}
                            InputProps={{
                                endAdornment: <SearchButtonTrend desc={grid1Header.DIFF_ID} />,
                                style: {
                                    fontSize: 12, backgroundColor: "#f0f0f0", height: "30px",
                                },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Avail Qty</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "117px"
                                , "& .MuiInputBase-input.Mui-disabled": {
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
                            id="outlined-disabled"
                            name="AVAIL_QTY"
                            value={grid1Header.AVAIL_QTY}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>


                <div className={AllocDetailsClasses.header_child}>
                    <div >
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Alloc Qty</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "117px"
                                , "& .MuiInputBase-input.Mui-disabled": {
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
                            id="outlined-disabled"
                            name="ALLOC_QTY"
                            value={grid1Header.ALLOC_QTY}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />

                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div >
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Remain Qty</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "117px"
                                , "& .MuiInputBase-input.Mui-disabled": {
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
                            id="outlined-disabled"
                            name="REMAIN_QTY"
                            value={grid1Header.REMAIN_QTY}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>
            </div>

        </Box>
    )
    const QtyOfPack2 = () => (
        <Box
            component="fieldset"
            display="flex" justifyContent={"space-between"}
            sx={{
                height: "auto",
                marginLeft: "0px",
                marginTop: "10px",
                padding: "0px 4px 10px 7px",
                backgroundColor: "white",
                borderRadius: 1,
                width: "100%",
                boxShadow: 2, border: 0,
                borderBottom: 3,
            }}
        >

            <div className={AllocDetailsClasses.header_container}>
                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Pack No</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "13px",
                                },
                                borderRadius: "5px",
                                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                            }}
                            id="outlined-disabled"
                            name="PACK_NO"
                            value={grid2Header.SOURCE_ITEM}

                            InputProps={{
                                endAdornment: <SearchButtonTrend desc={grid2Header.SOURCE_ITEM_DESC} />,
                                style: {
                                    fontSize: 12, backgroundColor: "#f0f0f0", height: "30px",
                                },
                                className: AllocDetailsClasses.input,
                            }}

                            disabled
                        />
                    </div>
                </div>
                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Diff ID</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "13px",
                                },
                                borderRadius: "5px",
                                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                            }}
                            id="outlined-disabled"
                            name="DIFF_ID"
                            value={grid2Header.DIFF_ID}
                            InputProps={{
                                endAdornment: <SearchButtonTrend desc={grid2Header.DIFF_ID} />,
                                style: {
                                    fontSize: 12, backgroundColor: "#f0f0f0", height: "30px",
                                },
                                className: AllocDetailsClasses.input,
                            }}

                            disabled
                        />
                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div >
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            WH</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "117px"
                                , "& .MuiInputBase-input.Mui-disabled": {
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
                            id="outlined-disabled"
                            name="WH"
                            value={grid2Header.WH_ID}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />

                    </div>
                </div>
                <div className={AllocDetailsClasses.header_child}>
                    <div >
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Alloc Qty</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "117px"
                                , "& .MuiInputBase-input.Mui-disabled": {
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
                            id="outlined-disabled"
                            name="ALLOC_QTY"
                            value={grid2Header.ALLOC_QTY}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />

                    </div>
                </div>

                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Avail Qty</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "117px"
                                , "& .MuiInputBase-input.Mui-disabled": {
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
                            id="outlined-disabled"
                            name="AVAIL_QTY"
                            value={grid2Header.AVAIL_QTY}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>
                <div className={AllocDetailsClasses.header_child}>
                    <div >
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Remain Qty</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "117px"
                                , "& .MuiInputBase-input.Mui-disabled": {
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
                            id="outlined-disabled"
                            name="REMAIN_QTY"
                            value={grid2Header.REMAIN_QTY}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: AllocDetailsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>
            </div>

        </Box>
    )
    const onTableCellChange = (e, value, name) => {
        if (Object.is(e, null) === false) {
            if (name === "ALLOC_QTY") {
                setPackLocData([{ "LOCATION_ID": value.LOCATION_ID, "SOURCE_ITEM": value.SOURCE_ITEM, "DIFF_ID": value.DIFF_ID, "ALLOC_QTY": value.ALLOC_QTY }])
                LocGroupItemDetailsData.map((row) => {
                    if (row.LOCATION_ID === String(value.LOCATION_ID) && row.SOURCE_ITEM === value.SOURCE_ITEM && row.DIFF_ID === value.DIFF_ID) {
                        Object.assign(row, { "ALLOC_QTY": e.target.value });
                        return row;
                    }
                });
            }
        }
        setSampleVal([]);
    }
    const onTableCellChangeGrid = (e, obj, name) => {
        if (Object.is(e, null) === false) {
            if (name === "ALLOC_QTY") {
                grid2Data.map((row) => {
                    if (row.WH === obj.WH && row.TRAN_ITEM === obj.TRAN_ITEM) {
                        Object.assign(row, { "ALLOC_QTY": e.target.value });
                        return row;
                    }
                });
            }
        }
        setSampleVal([]);
    }

    const handleAllocQtyChangeGrid = (e, row) => {
        setLoadCheck(true);
        if (cancelButtonClicked) {
            handleG2Cancel();
            cancelButtonClicked = false;
            return;
        }
        const reqData = {
            "ALLOC_NO": row.ALLOC_NO,
            "WH_ID": grid2Header.WH_ID,
            "SOURCE_ITEM": row.TRAN_ITEM,
            "DIFF_ID": grid2Header.DIFF_ID,
            "LOCATION_ID": row.WH,
            "ALLOC_QTY": e.target.textContent
        };
        setEditAQG2([reqData]);

        dispatch(postAllocQtyRequest([reqData]));
        if (okButtonClicked) {
            handleG2Ok();
            okButtonClicked = false; // Reset the flag after handling the OK button click
        }
    }
    const handleAllocQtyChange = (row) => {
        if (okButtonClicked) {
            setCloseOnBlur("OK");
            okButtonClicked = false; // Reset the flag after handling the OK button click
        } else if (cancelButtonClicked) {
            setCloseOnBlur("");
            handleCancel();
            cancelButtonClicked = false;
            return;
        }
        setEditAQ([row]);
        setLoadCheck(true);
        dispatch(postAllocQtyRequest([row]));

    }



    /*IN-LINE FILTER */
    const handleInlinePkInd = (value) => {
        if (value) {
            setInputValD((prev) => ({
                ...prev,
                "PACK_IND": value.id,
            }));
        } else {
            setInputValD((prev) => {
                const { PACK_IND, ...rest } = prev;
                return rest;
            });
        }
    }
    const gridFilterLocGrp = (e) => {
        setInputVal((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    const gridFilterD = (e) => {
        setInputValD((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    useEffect(() => {
        if (Object.keys(inputVal).length > 0) {

            for (let i = 0; i < Object.keys(inputVal).length; i++) {
                var temp_dict = {}
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
                    const temp = srcFltrLocGrp.filter((props) => (String(props[Object.keys(inputVal)[i]]).toLowerCase()) === (String(temp_dict[Object.keys(inputVal)[i]]).toLowerCase()))
                    setLocGroupItemDetailsData(temp);
                }
                else {
                    const filteredTable = srcFltrLocGrp.filter((props) =>
                        Object.entries(inputVal).every(
                            ([key, val]) =>
                                !val.length ||
                                props[key]
                                    ?.toString()
                                    .toLowerCase()
                                    .includes(val?.toString().toLowerCase())
                        )
                    );
                    setLocGroupItemDetailsData(filteredTable);
                }
            }
        } else if (Object.keys(inputVal).length === 0) {
            setLocGroupItemDetailsData(srcFltrLocGrp);
        }
        // ITEM DETAILS
        if (Object.keys(inputValD).length > 0 && packADData.length === 0) {
            for (let i = 0; i < Object.keys(inputValD).length; i++) {
                var temp_dict = {}
                if (inputValD[Object.keys(inputValD)[i]].includes("&") || inputValD[Object.keys(inputValD)[i]].includes("%")) {
                    inputValD[Object.keys(inputValD)[i]].slice(1)
                    temp_dict[Object.keys(inputValD)[i]] = inputValD[Object.keys(inputValD)[i]].slice(1)
                    if (temp_dict) {
                        for (const key in temp_dict) {
                            if (temp_dict[key] === '') {
                                delete temp_dict[key];
                            }
                        }
                    }
                    const temp = srcFltrItmD.filter((props) => String(props[Object.keys(inputValD)[i]]) === String(temp_dict[Object.keys(inputValD)[i]]));
                    setItemDetailsData(temp);
                }
                else {
                    const filteredTable = srcFltrItmD.filter((props) =>
                        Object.entries(inputValD).every(
                            ([key, val]) =>
                                !val.length ||
                                props[key]
                                    ?.toString()
                                    .toLowerCase()
                                    .includes(val?.toString().toLowerCase())
                        )
                    );
                    setItemDetailsData(filteredTable);
                }

            }
        } else if (Object.keys(inputValD).length === 0 && packADData.length === 0) {
            setItemDetailsData(srcFltrItmD);
        }

    }, [inputVal, inputValD]);



    /*
                             ##################################################
                             ######### COPYDOWN & ERASE FUNCTIONALITY #########
                             ##################################################
      */
    const SearchButtonCopy = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck || (alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_CRITERIA === "F" : false) ? true : false}>
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} disabled={ApproveFreeseCheck || (alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_CRITERIA === "F" : false) ? true : false}
                        onClick={handleCopyDown}
                    />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} disabled={ApproveFreeseCheck || (alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_CRITERIA === "F" : false) ? true : false}
                        onClick={handleLockFilter}
                    />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck || (alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_CRITERIA === "F" : false) ? true : false}>
                <BsFillEraserFill fontSize="small" disabled={ApproveFreeseCheck || (alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_CRITERIA === "F" : false) ? true : false}
                    onClick={eraseValWeight}
                />
            </IconButton>
        ]
    )
    const handleLockFilter = (e) => {
        setCopyValue({})
        setLockCheck(true);
        // if (LockCheck) {
        //     setLockCheck(true);
        // } else {
        //     setLockCheck(false);
        // }
        // setCopyValue(initialCopyValues);
    }
    const handleChangeWeight = (e, name) => {
        if (e) {
            setCopyValue((prev) => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }

    }
    /*
       ####################################
       ###   COPY DOWN FUNCTIONALITY :)  ##
       ####################################
     */

    useEffect(() => {
        if (CreateAllocationData?.data?.NNData && Array.isArray(CreateAllocationData?.data?.NNData)
            && (CreateAllocationData?.data?.NNData).length > 0) {

            const fltrData = LocGroupItemDetailsData.filter(obj => selected.includes(obj.SR_NO));
            const filteredData = (CreateAllocationData?.data?.NNData[0] || [])
                .filter(obj =>
                    fltrData.some(item =>
                        item.LOCATION_ID === obj.LOCATION_ID &&
                        item.SOURCE_ITEM === obj.SOURCE_ITEM &&
                        item.DIFF_ID === obj.DIFF_ID
                    )
                );
            setCLocData(filteredData);
            if (CreateAllocationData?.data?.NNData[1] === true) {
                setCUpdateChk(true);
            } else {
                setCUpdateChk(false);
            }
            CreateAllocationData.data.NNData = [];
        }
        if (CreateAllocationData?.data?.CopyADData || CreateAllocationData?.data?.allocdtlval) {
            if ((CreateAllocationData?.data?.allocdtlval?.status) === 500) {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl(String(CreateAllocationData?.data?.allocdtlval?.message));
            } else if ((CreateAllocationData?.data?.CopyADData?.status) === 500) {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl(String(CreateAllocationData?.data?.CopyADData?.message));
                // setLoadCheck(false);
            }
        }

    }, [CreateAllocationData?.data]);


    useEffect(() => {

        if (copyRData.length > 0) {
            const res = copyRData
            if (res.length > 0) {
                /* CHANGE DATA IN GRIDS */
                for (let i = 0; i < res.length; i++) {
                    if (res[i].length > 3) {
                        ItemDetailsData.map(obj => {
                            if (obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM && obj.DIFF_ID === cLocData[i].DIFF_ID) {
                                obj.ALLOC_QTY = res[i][0];
                                obj.REMAIN_QTY = obj.AVAIL_QTY - res[i][0];
                            }
                        })
                        setItemDetailsData(ItemDetailsData);
                        srcFltrItmD.map(obj => {
                            if (obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM && obj.DIFF_ID === cLocData[i].DIFF_ID) {
                                obj.ALLOC_QTY = res[i][0];
                                obj.REMAIN_QTY = obj.AVAIL_QTY - res[i][0];
                            }
                        })
                        setsrcFltrItmD(srcFltrItmD);

                        ItemWHDetailsData.map(obj => {
                            if (obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM && obj.DIFF_ID === cLocData[i].DIFF_ID && obj.WH_ID === cLocData[i].WH_ID) {
                                obj.ALLOC_QTY = res[i][1];
                                obj.REMAIN_QTY = obj.AVAIL_QTY - res[i][1];
                            }
                        })
                        setItemWHDetailsData(ItemWHDetailsData);

                        filtrdItemWHData.filter(obj => {
                            if (obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM && obj.DIFF_ID === cLocData[i].DIFF_ID && obj.WH_ID === cLocData[i].WH_ID) {
                                obj.ALLOC_QTY = res[i][1]
                                obj.REMAIN_QTY = obj.AVAIL_QTY - res[i][1]
                            }
                        })
                        setfiltrdItemWHData(filtrdItemWHData);

                        // LOC/ GROUP DETAILS DATA


                        srcFltrLocGrp.map(obj => {
                            if (obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM && obj.DIFF_ID === cLocData[i].DIFF_ID && obj.LOCATION_ID === cLocData[i].LOCATION_ID) {
                                obj.ALLOC_QTY = res[i][2]
                                obj.VARIANCE_PCT = res[i][3]
                            }
                        })
                        setsrcFltrLocGrp(srcFltrLocGrp);

                        LocGroupItemDetailsData.map(obj => {
                            if (obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM && obj.DIFF_ID === cLocData[i].DIFF_ID && obj.LOCATION_ID === cLocData[i].LOCATION_ID) {
                                obj.ALLOC_QTY = res[i][2]
                                obj.VARIANCE_PCT = res[i][3]
                            }
                        });
                        setLocGroupItemDetailsData(LocGroupItemDetailsData);
                        var totalAllocGrid1 = 0;
                        var totalAvailGrid1 = 0;
                        var totalAllocGrid2 = 0;
                        var totalCalcGrid2 = 0;
                        ItemDetailsData.map(obj => {
                            if (obj.ALLOC_QTY !== "") {
                                totalAllocGrid1 = totalAllocGrid1 + obj.ALLOC_QTY;
                            }
                            if (obj.AVAIL_QTY !== "") {
                                totalAvailGrid1 = totalAvailGrid1 + obj.AVAIL_QTY;
                            }
                        });
                        LocGroupItemDetailsData.map(obj => {
                            if (obj.ALLOC_QTY !== "") {
                                totalAllocGrid2 = totalAllocGrid2 + obj.ALLOC_QTY;
                            }
                            if (obj.CALC_QTY !== "") {
                                totalCalcGrid2 = totalCalcGrid2 + obj.CALC_QTY;
                            }
                        });
                        setTotalGrd1([totalAvailGrid1, totalAllocGrid1]);
                        setTotalGrd2([totalCalcGrid2, totalAllocGrid2]);
                    } else {

                        const allocData = (packLocData.filter(obj =>
                            obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM
                            && obj.DIFF_ID === cLocData[i].DIFF_ID
                            && obj.LOCATION_ID === cLocData[i].LOCATION_ID))[0]
                        LocGroupItemDetailsData.map((row) => {
                            if (row.LOCATION_ID === String(allocData.LOCATION_ID) && row.SOURCE_ITEM === allocData.SOURCE_ITEM && row.DIFF_ID === allocData.DIFF_ID) {
                                Object.assign(row, { "ALLOC_QTY": allocData.ALLOC_QTY });
                                return row;
                            }
                        });
                        setLocGroupItemDetailsData(LocGroupItemDetailsData);
                    }
                }
            }
            setCopyRData([]);
            setCLocData([]);
            setLoadCheck(false);
            setSelected([])
        }
    }, [copyRData])

    if (cLocData.length > 0 && cLocData[cLocData.length - 1] !== 0) {
        if (cUpdateChk === true) {
            async function postData() {
                var res = [];
                var pack_list = []
                for (let i = 0; i < cLocData.length; i++) {
                    if (cLocData[i] !== 0) {
                        const packValn = {
                            "LOCATION_ID": cLocData[i].LOCATION_ID,
                            "SOURCE_ITEM": cLocData[i].SOURCE_ITEM,
                            "DIFF_ID": cLocData[i].DIFF_ID,
                            "ALLOC_QTY": cLocData[i].ALLOC_QTY
                        }
                        cLocData[i].ALLOC_QTY = copyValue["ALLOC_QTY"];
                        try {
                            const url = CONFIG.BASE_URL + "/copyDownAD/";
                            const response = await axios.post(url, [cLocData[i]]);
                            if (response.data.length <= 3) {
                                pack_list.push(packValn);
                            }
                            res.push(response.data);
                        } catch (error) {
                            setOpenDialogAllocDtl(true);
                            setDialogDataAllocDtl(String(error));
                            setLoadCheck(false);
                        }
                    }
                }
                setCopyRData(res);
                setPackLocData(pack_list);
            }
            postData();
            cLocData.push(0);
        }
    }

    const handleCopyDown = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }
        if (selected.length > 0) {
            //COPY DOWN CODE 
            if (copyValue.ALLOC_QTY >= 0) {
                const AvailQty = (filtrdItemWHData.filter(obj => LocGroupItemDetailsData[0].SOURCE_ITEM === obj.SOURCE_ITEM && LocGroupItemDetailsData[0].WH_ID === obj.WH_ID))[0].AVAIL_QTY;
                if ((copyValue["ALLOC_QTY"] * selected.length) > AvailQty) {
                    swal({
                        text: "The copy down qty cannot exceed total available qty.",
                        buttons: {
                            ok: "OK"
                        },
                        backdrop: 'static',
                        closeOnClickOutside: false,
                    }).then((value) => {
                        if (value === "ok") {
                            // setCountRow(0);
                            setLoadCheck(true);
                            dispatch(postFETCHNNRequest([{ "ALLOC_NO": alloc_Dtls[0].ALLOC_NO }]));
                        }
                    });
                } else {
                    setLoadCheck(true);
                    dispatch(postFETCHNNRequest([{ "ALLOC_NO": alloc_Dtls[0].ALLOC_NO }]));
                }
            }
        }
        setLockCheck(false);
    }
    const eraseValWeight = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = LocGroupItemDetailsData.filter((item) => {
                return selected.some((val) => {
                    return item.LOCATION_ID === val;
                });
            });


            editData.map((row) => {
                if (Object.keys(row).includes("ALLOC_QTY")) {
                    row["ALLOC_QTY"] = ""
                }
            }
            )
            editData.map((obj) => {
                if (Object.keys(obj).includes("LOCATION_ID")) {
                    const temp = LocGroupItemDetailsData.filter((obj1) =>
                        obj1["LOCATION_ID"] === obj["LOCATION_ID"]

                    )
                }
            })
        }


        setLocGroupItemDetailsData(LocGroupItemDetailsData);
        setSampleVal([]);
    }

    const resetFilter = () => {
        setInputVal([]);
        if (inputVal.length === 0) {
            setLocGroupItemDetailsData(srcFltrLocGrp);
            setSampleVal([]);
            setCopyValue({});
            setInputVal([]);
        } else {
            setLocGroupItemDetailsData(srcFltrLocGrp);
            setSampleVal([]);
            setCopyValue({});
            setInputVal([]);
        }
        //setLockCheck(false)
    };
    useEffect(() => {
        if (AllocDetailsPData?.data?.restoreChk?.status === 200) {
            //swal("restored")
            setLoadCheck(false);
            setItmWDScrn(false);
            ItemDetailsData.map(obj => {
                if (obj.SOURCE_ITEM === grid2Header.SOURCE_ITEM && obj.DIFF_ID === grid2Header.DIFF_ID) {
                    obj.ALLOC_QTY = topGData[0]
                    obj.REMAIN_QTY = obj.AVAIL_QTY - topGData[0]
                }
            })
            ItemWHDetailsData.map(obj => {
                if (obj.SOURCE_ITEM === grid2Header.SOURCE_ITEM && obj.DIFF_ID === grid2Header.DIFF_ID && obj.WH_ID === grid2Header.WH_ID) {
                    obj.ALLOC_QTY = midGData[0]
                    obj.REMAIN_QTY = obj.AVAIL_QTY - midGData[0]
                }
            })
            setGrid2Data([]);
            setItemDetailsData(ItemDetailsData);
            setfiltrdItemWHData(ItemWHDetailsData.filter(obj => obj.SOURCE_ITEM === selectedWRow.SOURCE_ITEM));
            const totalAllocGrid1 = ItemDetailsData.reduce((total, obj) => total + (obj.ALLOC_QTY !== "" ? obj.ALLOC_QTY : 0), 0);
            const totalAvailGrid1 = ItemDetailsData.reduce((total, obj) => total + (obj.AVAIL_QTY !== "" ? obj.AVAIL_QTY : 0), 0);
            const totalAllocGrid2 = LocGroupItemDetailsData.reduce((total, obj) => total + (obj.ALLOC_QTY !== "" ? obj.ALLOC_QTY : 0), 0);
            const totalCalcGrid2 = LocGroupItemDetailsData.reduce((total, obj) => total + (obj.CALC_QTY !== "" ? obj.CALC_QTY : 0), 0);

            setTotalGrd1([totalAvailGrid1, totalAllocGrid1]);
            setTotalGrd2([totalCalcGrid2, totalAllocGrid2]);

            AllocDetailsPData.data.restoreChk.status = 0;
        } else if (AllocDetailsPData?.data?.restoreChk?.status === 500) {
            setLoadCheck(false);
            if (AllocDetailsPData?.data?.restoreChk?.message === "object of type 'bool' has no len()") {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl("Connection Lost");
            } else {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl(String(AllocDetailsPData?.data?.restoreChk?.message));
            }
            setItmWDScrn(false);
            ItemDetailsData.map(obj => {
                if (obj.SOURCE_ITEM === grid2Header.SOURCE_ITEM && obj.DIFF_ID === grid2Header.DIFF_ID) {
                    obj.ALLOC_QTY = topGData[0]
                    obj.REMAIN_QTY = obj.AVAIL_QTY - topGData[0]
                }
            })
            ItemWHDetailsData.map(obj => {
                if (obj.SOURCE_ITEM === grid2Header.SOURCE_ITEM && obj.DIFF_ID === grid2Header.DIFF_ID && obj.WH_ID === grid2Header.WH_ID) {
                    obj.ALLOC_QTY = midGData[0]
                    obj.REMAIN_QTY = obj.AVAIL_QTY - midGData[0]
                }
            })
            setGrid2Data([]);
            setItemDetailsData(ItemDetailsData);
            setfiltrdItemWHData(ItemWHDetailsData.filter(obj => obj.SOURCE_ITEM === selectedWRow.SOURCE_ITEM));
        }
        if (AllocDetailsPData?.data?.updateChk?.status === 200) {
            setLoadCheck(false);
            setItmWDScrn(false);
            setGrid2Data([]);
        } else if (AllocDetailsPData?.data?.updateChk?.status === 500) {
            setLoadCheck(false);
            if (AllocDetailsPData?.data?.updateChk?.message === "object of type 'bool' has no len()") {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl("Connection Lost");
            } else {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl(String(AllocDetailsPData?.data?.updateChk?.message));
            }
            setItmWDScrn(false);
            setGrid2Data([]);
        }
    }, [AllocDetailsPData?.data]);

    const handleG2Cancel = () => {
        if (ApproveFreeseCheck || (alloc_Dtls.length > 0 && alloc_Dtls[0].ALLOC_CRITERIA === "F")) {
            setItmWDScrn(false);
        } else {
            const restore = { "ALLOC_NO": grid2Header.ALLOC_NO, "WH_ID": grid2Header.WH_ID };
            setLoadCheck(true);
            dispatch(postRESTOREADPKRequest([restore]));
        }
        setG2Data({});
        cancelButtonClicked = false;
    }
    const handleG2Ok = () => {

        let update_chk = grid2Data.filter(o1 => !g2Data.some(o2 => o1.ALLOC_QTY === o2.ALLOC_QTY));
        if (ApproveFreeseCheck || (alloc_Dtls.length > 0 && alloc_Dtls[0].ALLOC_CRITERIA === "F") || update_chk.length === 0) {
            setItmWDScrn(false);
        } else {
            const restore = { "ALLOC_NO": grid2Header.ALLOC_NO, "PACK_NO": grid2Header.SOURCE_ITEM };
            setLoadCheck(true);
            dispatch(postUPDATEADPKRequest([restore]));
        }
        setG2Data([]);
        okButtonClicked = false;
    }

    function EnhancedTableToolbar(props) {
        const { numSelected } = props;
        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(LocGroupItemDetailsData.length > 0 && {
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
                {LocGroupItemDetailsData.length > 0 && (
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
                        Rows {selected.length} of {LocGroupItemDetailsData.length}
                    </Typography>
                )}
            </Toolbar>
        );
    }

    const handleCloseDialog = (e) => {
        setOpenDialogAllocDtl(false);
        setDialogDataAllocDtl("")
    }

    /*
         #################################################
         ##########  MANAGE COLUMNS IN TABLE  ############
         #################################################
   */

    const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
    const [ManageHeaderDataItemDtl, setManageHeaderDataItemDtl] = useState([]);
    const [ManageHeaderDataItemWHDtl, setManageHeaderDataItemWHDtl] = useState([]);
    const [ManageHeaderDataLocGroup, setManageHeaderDataLocGroup] = useState([]);

    if (ManageHeaderCheck) {
        var temp1 = []
        ItemDetailsHeader.map(row => temp1.push(row.id));
        var temp2 = []
        ItemWHDetailsHeader.map(row => temp2.push(row.id));
        var temp3 = []
        LocGroupItemDetailsHeader.map(row => temp3.push(row.id));
        const temp11 = ['VARIANCE_PCT']
        const temp21 = temp3.filter(value => !temp11.includes(value));
        setManageHeaderDataItemDtl(temp1);
        setManageHeaderDataItemWHDtl(temp2);
        setManageHeaderDataLocGroup(temp21);
        setManageHeaderCheck(false);
    }

    const HandleManageHeaderItemDtl = () => {
        setOpenDialogManageItemDtl(true);
    }
    const HandleManageHeaderItemWHDtl = () => {
        setOpenDialogManageItemWHDtl(true);
    }
    const HandleManageHeaderLocGroup = () => {
        setOpenDialogManageLocGroup(true);
    }

    const handleCloseDialogManageItemDtl = (e) => {
        if (ManageHeaderDataItemDtl.length > 0) { setOpenDialogManageItemDtl(false); }
        else { setOpenDialogAllocDtl(true); setDialogDataAllocDtl("Table must contain atleast one column."); }
    }
    const handleCloseDialogManageItemWHDtl = (e) => {
        if (ManageHeaderDataItemWHDtl.length > 0) { setOpenDialogManageItemWHDtl(false); }
        else { setOpenDialogAllocDtl(true); setDialogDataAllocDtl("Table must contain atleast one column."); }
    }
    const handleCloseDialogManageLocGroup = (e) => {
        if (ManageHeaderDataLocGroup.length > 0) { setOpenDialogManageLocGroup(false); }
        else { setOpenDialogAllocDtl(true); setDialogDataAllocDtl("Table must contain atleast one column."); }
    }

    const handleManageHeaderClickItemDtl = (e, name) => {
        if (e.target.checked === true) {
            const updatedManageHeaderData = [...ManageHeaderDataItemDtl, name]; setManageHeaderDataItemDtl(updatedManageHeaderData)
        } else {
            const updatedManageHeaderData = ManageHeaderDataItemDtl.filter(item => item !== name); setManageHeaderDataItemDtl(updatedManageHeaderData)
        }
    }
    const handleManageHeaderClickItemWHDtl = (e, name) => {
        if (e.target.checked === true) {
            const updatedManageHeaderData = [...ManageHeaderDataItemWHDtl, name]; setManageHeaderDataItemWHDtl(updatedManageHeaderData)
        } else {
            const updatedManageHeaderData = ManageHeaderDataItemWHDtl.filter(item => item !== name); setManageHeaderDataItemWHDtl(updatedManageHeaderData)
        }
    }
    const handleManageHeaderClickLocGroup = (e, name) => {
        if (e.target.checked === true) {
            const updatedManageHeaderData = [...ManageHeaderDataLocGroup, name]; setManageHeaderDataLocGroup(updatedManageHeaderData)
        } else {
            const updatedManageHeaderData = ManageHeaderDataLocGroup.filter(item => item !== name); setManageHeaderDataLocGroup(updatedManageHeaderData)
        }
    }

    const handleShowAllManageHeaderItemDtl = () => {
        var temp = []
        ItemDetailsHeader.map(row => temp.push(row.id));
        setManageHeaderDataItemDtl(temp);
    }
    const handleShowAllManageHeaderItemWHDtl = () => {
        var temp = []
        ItemWHDetailsHeader.map(row => temp.push(row.id));
        setManageHeaderDataItemWHDtl(temp);
    }
    const handleShowAllManageHeaderLocGroup = () => {
        var temp = []
        LocGroupItemDetailsHeader.map(row => temp.push(row.id));
        setManageHeaderDataLocGroup(temp);
    }

    const headerManageItemDtl = () => (
        <Box display="inline-block"
            sx={{ backgroundColor: "", height: "auto", padding: "0rem 0rem", width: "100%", }}>
            <div>
                {ItemDetailsHeader.map((key) => (
                    <div key={key.id}>
                        <FormControlLabel
                            size="small"
                            sx={{ padding: "0px", margin: "0px 0px 0px 0px", }}
                            control={
                                <Checkbox
                                    sx={{ margin: "0px 0px 0px 0px", padding: "2px", paddingTop: "0px" }}
                                    color="primary"
                                    size="small"
                                    onClick={(event) => [handleManageHeaderClickItemDtl(event, key?.id)]}
                                    checked={ManageHeaderDataItemDtl.includes(key.id)}
                                    style={{ padding: "0px", textAlign: "left", }}
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
    const headerManageItemWHDtl = () => (
        <Box display="inline-block"
            sx={{ backgroundColor: "", height: "auto", padding: "0rem 0rem", width: "100%", }}>
            <div>
                {ItemWHDetailsHeader.map((key) => (
                    <div key={key.id}>
                        <FormControlLabel
                            size="small"
                            sx={{ padding: "0px", margin: "0px 0px 0px 0px", }}
                            control={
                                <Checkbox
                                    sx={{ margin: "0px 0px 0px 0px", padding: "2px", paddingTop: "0px" }}
                                    color="primary"
                                    size="small"
                                    onClick={(event) => [handleManageHeaderClickItemWHDtl(event, key?.id)]}
                                    checked={ManageHeaderDataItemWHDtl.includes(key.id)}
                                    style={{ padding: "0px", textAlign: "left", }}
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
    const headerManageLocGroup = () => (
        <Box display="inline-block"
            sx={{ backgroundColor: "", height: "auto", padding: "0rem 0rem", width: "100%", }}>
            <div>
                {LocGroupItemDetailsHeader.map((key) => (
                    <div key={key.id}>
                        <FormControlLabel
                            size="small"
                            sx={{ padding: "0px", margin: "0px 0px 0px 0px", }}
                            control={
                                <Checkbox
                                    sx={{ margin: "0px 0px 0px 0px", padding: "2px", paddingTop: "0px" }}
                                    color="primary"
                                    size="small"
                                    onClick={(event) => [handleManageHeaderClickLocGroup(event, key?.id)]}
                                    checked={ManageHeaderDataLocGroup.includes(key.id)}
                                    style={{ padding: "0px", textAlign: "left", }}
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

    return (
        <Box className={AllocDetailsClasses.maindiv} sx={{ width: "100%" }}>
            <div >
                {SearchHeader()}
            </div>
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
                        margin: "5px 0px 0px 2px"
                    }}
                >
                    <div className={AllocDetailsClasses.course_box}>
                        <div className={AllocDetailsClasses.grid_block}>

                            <Box
                                display="flex"
                                sx={{
                                    backgroundColor: "",
                                    margin: "5px 0px 0px 5px",
                                    justifyContent: "flex-end",
                                    width: "calc(92vw - 0px)",
                                }}
                            >
                                <div>
                                    <div className={AllocDetailsClasses.float_child}>
                                        <Button
                                            sx={{
                                                fontSize: "12px",
                                                backgroundColor: "#228B22",
                                                padding: "5px", fontFamily: "system-ui",
                                                width: "100px", marginLeft: "5px", marginTop: "2px",
                                            }}
                                            variant="contained"
                                            type="submit"
                                            onClick={handleOk}
                                            onMouseDown={handleOkButtonMouseDown}
                                            startIcon={<DoneAllIcon />}
                                        >
                                            Ok</Button>

                                        <Button
                                            sx={{
                                                backgroundColor: "maroon",
                                                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                                width: "100px", marginLeft: "5px", marginTop: "2px",
                                            }}
                                            variant="contained"
                                            type="submit"
                                            onClick={handleCancel}
                                            onMouseDown={handleCancelButtonMouseDown}
                                            startIcon={<CancelIcon />}
                                        >
                                            Cancel</Button>

                                    </div>
                                </div>
                            </Box>

                        </div>

                        <div className={AllocDetailsClasses.grid_block}>
                            <InputLabel sx={{
                                fontWeight: "bold",
                                fontSize: "14px",
                                margin: "5px 0px 10px 10px",
                                display: 'inline',
                                float: 'left',
                                color: "black",
                            }}>
                                Item Details
                            </InputLabel>
                            <Box display="flex" justifyContent="flex-end" sx={{ margin: "1px 10px 0px 0px", }}>
                                {/* <Button
                                    autoFocus
                                    variant="contained"
                                    onClick={HandleManageHeaderItemDtl}
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
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <div
                                        style={{
                                            flex: "1",
                                            backgroundColor: isSHovered1 ? '#f5f5f5' : 'white',
                                            borderRadius: '20%',
                                            padding: "0px 8px 0px 8px",
                                            margin: "2px 0px 0px 0px",
                                            // border: "1px solid red",
                                            height: "30px", minHeight: "30px",
                                        }}
                                        title="Manage Columns"
                                        onMouseEnter={handleSEnter1}
                                        onMouseLeave={handleSLeave1}
                                    >
                                        <ViewColumnIcon style={{ padding: "0px", backgroundColor: isSHovered1 ? '#f5f5f5' : 'white', marginTop: "2px", color: "DodgerBlue" }} onClick={HandleManageHeaderItemDtl} title="Manage Columns" />
                                    </div>
                                </div>
                            </Box>
                        </div>

                        <div className={AllocDetailsClasses.TableBoby}>
                            <Paper sx={{ margin: "0px 0px 0px 5px", width: '100%', mb: 0, height: "auto", width: "calc(92vw - 0px)", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
                                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                <TableContainer style={{ maxHeight: 190, width: "calc(100% - 0px)" }} component={Paper}>
                                    <Table aria-label="customized table">
                                        <ItemDetailsTableHead
                                            // numSelected={selected.length}
                                            order1={order1}
                                            orderBy1={orderBy1}
                                            // onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort1}
                                        // rowCount={qtyLimitsData.length}
                                        // sx={{height: "auto",border:"2px solid blue"}}
                                        />
                                        <TableBody
                                        // sx={{ position: "sticky", top: -1,textAlign:"left" }}
                                        // sx={{ height: "auto",border:"2px solid green" }}
                                        >
                                            {/* <TableCell padding="checkbox" sx={{ padding: "0px" }} >
                                                <Grid item xs={1} style={{ padding: "0px", margin: "0px 0px 0px 0px" }}>
                                                    <IconButton small="small" sx={{ padding: "0px" }}>
                                                        <RestartAltIcon small="small" sx={{ padding: "0px" }} />
                                                    </IconButton>
                                                </Grid>
                                            </TableCell> */}

                                            {ManageHeaderDataItemDtl.includes('SOURCE_ITEM') ?
                                                <TableCell sx={{
                                                    padding: "0px",
                                                }}>
                                                    <TextField
                                                        name="SOURCE_ITEM"
                                                        onChange={gridFilterD}
                                                        value={Object.keys(inputValD).length > 0 && Object.keys(inputValD).includes("SOURCE_ITEM") > 0 ? inputValD.SOURCE_ITEM : ""}
                                                        placeholder="Sku"
                                                        // label="Location"
                                                        autoComplete="off"
                                                        InputProps={{
                                                            sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                        }}
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: {
                                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                                            },
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderDataItemDtl.includes('SOURCE_ITEM_DESC') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="SOURCE_ITEM_DESC"
                                                        onChange={gridFilterD}
                                                        value={Object.keys(inputValD).length > 0 && Object.keys(inputValD).includes("SOURCE_ITEM_DESC") > 0 ? inputValD.SOURCE_ITEM_DESC : ""}
                                                        placeholder="Description"
                                                        autoComplete="off"
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "22px" },
                                                        }}
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderDataItemDtl.includes('DIFF_ID') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="DIFF_ID"
                                                        onChange={gridFilterD}
                                                        value={Object.keys(inputValD).length > 0 && Object.keys(inputValD).includes("DIFF_ID") > 0 ? inputValD.DIFF_ID : ""}
                                                        autoComplete="off"
                                                        placeholder="Variant"
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "22px", textAlign: "left", },
                                                        }}
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderDataItemDtl.includes('PACK_IND') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto",
                                                    // border: "1px solid gray",
                                                    width: "",
                                                    // bgcolor:"yellow"
                                                    // paddingBottom:"-10px"
                                                }}>
                                                    <Select
                                                        classNamePrefix="mySelect"
                                                        getOptionLabel={option =>
                                                            `${option.id.toString()}`}
                                                        getOptionValue={option => option.id}
                                                        options={PackIndOptions}
                                                        isSearchable={true}
                                                        isClearable={true}
                                                        placeholder="Pack Ind"
                                                        onChange={handleInlinePkInd}
                                                        maxMenuHeight={180}
                                                        // placeholder={"Choose a Dept"}
                                                        styles={styleSelect1}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderDataItemDtl.includes('GROSS_NEED') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="GROSS_NEED"
                                                        onChange={gridFilterD}
                                                        value={Object.keys(inputValD).length > 0 && Object.keys(inputValD).includes("GROSS_NEED") > 0 ? inputValD.GROSS_NEED : ""}
                                                        autoComplete="off"
                                                        placeholder="Gross Need"
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "22px", textAlign: "left", },
                                                        }}
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderDataItemDtl.includes('STOCK_ON_HAND') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="STOCK_ON_HAND"
                                                        onChange={gridFilterD}
                                                        value={Object.keys(inputValD).length > 0 && Object.keys(inputValD).includes("STOCK_ON_HAND") > 0 ? inputValD.STOCK_ON_HAND : ""}
                                                        autoComplete="off"
                                                        placeholder="On Hand"
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "22px" },
                                                        }}
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderDataItemDtl.includes('FUTURE_FULFILL_QTY') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="FUTURE_FULFILL_QTY"
                                                        onChange={gridFilterD}
                                                        value={Object.keys(inputValD).length > 0 && Object.keys(inputValD).includes("FUTURE_FULFILL_QTY") > 0 ? inputValD.FUTURE_FULFILL_QTY : ""}
                                                        autoComplete="off"
                                                        placeholder="On Order"
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "22px" },
                                                        }}
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderDataItemDtl.includes('NET_NEED') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="NET_NEED"
                                                        onChange={gridFilterD}
                                                        value={Object.keys(inputValD).length > 0 && Object.keys(inputValD).includes("NET_NEED") > 0 ? inputValD.NET_NEED : ""}
                                                        autoComplete="off"
                                                        placeholder="Net Need"
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "22px" },
                                                        }}
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderDataItemDtl.includes('CALC_QTY') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="CALC_QTY"
                                                        onChange={gridFilterD}
                                                        value={Object.keys(inputValD).length > 0 && Object.keys(inputValD).includes("CALC_QTY") > 0 ? inputValD.CALC_QTY : ""}
                                                        autoComplete="off"
                                                        placeholder="Calc Qty"
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "22px" },
                                                        }}
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderDataItemDtl.includes('AVAIL_QTY') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="AVAIL_QTY"
                                                        onChange={gridFilterD}
                                                        value={Object.keys(inputValD).length > 0 && Object.keys(inputValD).includes("AVAIL_QTY") > 0 ? inputValD.AVAIL_QTY : ""}
                                                        autoComplete="off"
                                                        placeholder="Avail Qty"
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "22px" },
                                                        }}
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderDataItemDtl.includes('ALLOC_QTY') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="ALLOC_QTY"
                                                        onChange={gridFilterD}
                                                        value={Object.keys(inputValD).length > 0 && Object.keys(inputValD).includes("ALLOC_QTY") > 0 ? inputValD.ALLOC_QTY : ""}
                                                        autoComplete="off"
                                                        placeholder="Alloc Qty"
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "22px" },
                                                        }}
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}

                                            {ManageHeaderDataItemDtl.includes('REMAIN_QTY') ?
                                                <TableCell sx={{
                                                    padding: "0px"
                                                    , height: "auto"
                                                }}>
                                                    <TextField
                                                        name="REMAIN_QTY"
                                                        onChange={gridFilterD}
                                                        value={Object.keys(inputValD).length > 0 && Object.keys(inputValD).includes("REMAIN_QTY") > 0 ? inputValD.REMAIN_QTY : ""}
                                                        autoComplete="off"
                                                        placeholder="Remain Qty"
                                                        InputProps={{
                                                            style: { fontSize: 12, height: "22px" },
                                                        }}
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        variant="standard"
                                                        inputProps={{
                                                            // maxLength: 5,
                                                            sx: { padding: "0px 0px 0px 3px", height: "22px", textAlign: "left", "&::placeholder": { textAlign: "left", padding: "0px", }, }
                                                        }}
                                                    />
                                                </TableCell> : null}
                                        </TableBody>

                                        <TableBody>
                                            {
                                                ItemDetailsData.length > 0 ?
                                                    ItemDetailsData.map(row => (

                                                        <TableRow
                                                            onDoubleClick={() => { if (row.PACK_IND === 'Y') { handleItmDClick(row) } }}
                                                            style={filtrdItemWHData.length > 0 && filtrdItemWHData[0].SOURCE_ITEM === row.SOURCE_ITEM ? { background: "#CDF0FF" } : null}
                                                            onClick={() => { handleItemWH(row) }}
                                                        >
                                                            {ManageHeaderDataItemDtl.includes('SOURCE_ITEM') ?
                                                                <TableCell align="right"
                                                                    sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", height: "22px" }}>
                                                                    {row.SOURCE_ITEM}</TableCell> : null}

                                                            {ManageHeaderDataItemDtl.includes('SOURCE_ITEM_DESC') ?
                                                                <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
                                                                    {String(row.SOURCE_ITEM_DESC).length > 0 ?
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
                                                                                {row.SOURCE_ITEM_DESC}
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
                                                                                    setOpenDialogAllocDtl(true);
                                                                                    setDialogDataAllocDtl(String(row.SOURCE_ITEM_DESC));
                                                                                }}
                                                                                startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                                            >
                                                                            </Button>
                                                                        </Box> : null}
                                                                </TableCell> : null}

                                                            {ManageHeaderDataItemDtl.includes('DIFF_ID') ?
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} >
                                                                    {row.DIFF_ID}</TableCell> : null}

                                                            {ManageHeaderDataItemDtl.includes('PACK_IND') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <Checkbox
                                                                        disabled
                                                                        color="primary"
                                                                        size="small"
                                                                        checked={row.PACK_IND === 'Y'}
                                                                        style={{ padding: "0px", textAlign: "left", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                                                        sx={row.PACK_IND === 'Y' ? {
                                                                            // position: "relative",
                                                                            // zIndex: 999,
                                                                            '&.Mui-disabled': {
                                                                                opacity: 0.5,
                                                                                color: 'DodgerBlue',
                                                                            },
                                                                        } : null
                                                                        }
                                                                    />
                                                                    {/* <Checkbox size="small" color="primary" disabled={true}
                                                                    checked={row.PACK_IND === 'Y'} sx={{ padding: "0px" }} /> */}


                                                                </TableCell> : null}
                                                            {ManageHeaderDataItemDtl.includes('GROSS_NEED') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                {row.GROSS_NEED}</TableCell> : null}
                                                            {ManageHeaderDataItemDtl.includes('STOCK_ON_HAND') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                {row.STOCK_ON_HAND}</TableCell> : null}
                                                            {ManageHeaderDataItemDtl.includes('FUTURE_FULFILL_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                {row.FUTURE_FULFILL_QTY}</TableCell> : null}
                                                            {ManageHeaderDataItemDtl.includes('NET_NEED') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                {row.NET_NEED}</TableCell> : null}
                                                            {ManageHeaderDataItemDtl.includes('CALC_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                {row.CALC_QTY}</TableCell> : null}
                                                            {ManageHeaderDataItemDtl.includes('AVAIL_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                {row.AVAIL_QTY}</TableCell> : null}
                                                            {ManageHeaderDataItemDtl.includes('ALLOC_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                {row.ALLOC_QTY}</TableCell> : null}
                                                            {ManageHeaderDataItemDtl.includes('REMAIN_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                {row.REMAIN_QTY}</TableCell> : null}

                                                        </TableRow >
                                                    ))
                                                    : false
                                            }

                                            {ItemDetailsData.length < 5 ?
                                                [...Array(5 - (ItemDetailsData.length)).keys()].map(val => (
                                                    <TableRow>
                                                        {ManageHeaderDataItemDtl.map((row, index) => {
                                                            return (
                                                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>)
                                                        })}
                                                        {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}}></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} ></TableCell>
                                                        <TableCell sx={{
                                                            padding: "0px"
                                                            , height: "auto"
                                                        }}>
                                                            <Checkbox size="small" color="primary" disabled={true} sx={{ padding: "0px" }} />
                                                        </TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell> */}

                                                    </TableRow >
                                                )) : false}
                                            <TableRow style={{ background: "#bc8f8f" }} >
                                                {ManageHeaderDataItemDtl.includes('SOURCE_ITEM') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "22px" }}></WhiteCell> : null}
                                                {ManageHeaderDataItemDtl.includes('SOURCE_ITEM_DESC') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}></WhiteCell> : null}
                                                {ManageHeaderDataItemDtl.includes('DIFF_ID') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} ></WhiteCell> : null}
                                                {ManageHeaderDataItemDtl.includes('PACK_IND') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "22px" }}></WhiteCell> : null}
                                                {ManageHeaderDataItemDtl.includes('GROSS_NEED') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}></WhiteCell> : null}
                                                {ManageHeaderDataItemDtl.includes('STOCK_ON_HAND') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} ></WhiteCell> : null}
                                                {ManageHeaderDataItemDtl.includes('FUTURE_FULFILL_QTY') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}
                                                {ManageHeaderDataItemDtl.includes('NET_NEED') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}
                                                {ManageHeaderDataItemDtl.includes('CALC_QTY') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}
                                                {ManageHeaderDataItemDtl.includes('AVAIL_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{totalGrd1.length > 0 ? totalGrd1[0] : null}</TableCell> : null}
                                                {ManageHeaderDataItemDtl.includes('ALLOC_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{totalGrd1.length > 0 ? totalGrd1[1] : null}</TableCell> : null}
                                                {ManageHeaderDataItemDtl.includes('REMAIN_QTY') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}
                                                {/* <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "22px" }}></WhiteCell>
                                                <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}}></WhiteCell>
                                                <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} ></WhiteCell>
                                                <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "22px" }}></WhiteCell>
                                                <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}}></WhiteCell>
                                                <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} ></WhiteCell>
                                                <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></WhiteCell>
                                                <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></WhiteCell>
                                                <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></WhiteCell>
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right">{totalGrd1.length > 0 ? totalGrd1[0] : null}</TableCell>
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right">{totalGrd1.length > 0 ? totalGrd1[1] : null}</TableCell>
                                                <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></WhiteCell> */}

                                            </TableRow >
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                            </Paper>
                        </div>

                        <Box
                            // display='flex'
                            sx={{
                                // border: "1px solid lightgrey",
                                boxShadow: 3,
                                borderRadius: 1,
                                width: "calc(92vw - 0px)",
                                margin: "5px 0px 0px 5px",
                                padding: "0px 0px 0px 0px"
                            }}
                        >
                            <div className={AllocDetailsClasses.grid_block}>
                                <Box
                                    display='flex' justifyContent="space-between"
                                ><div>
                                        <InputLabel sx={{
                                            fontWeight: "bold",
                                            fontSize: "14px",
                                            margin: "5px 0px 10px 5px",
                                            display: 'inline',
                                            float: 'left',
                                            color: "black",
                                        }}>
                                            Item WH Details</InputLabel></div>
                                    {/* <div>
                                        <Button
                                            autoFocus
                                            variant="contained"
                                            onClick={HandleManageHeaderItemWHDtl}
                                            sx={{
                                                backgroundColor: "",
                                                padding: "3.5px",
                                                margin: "2px 4px 2px 0px",
                                                alignItems: "center",
                                                width: "fit-content",
                                                // border: "1px solid yellow",
                                            }}
                                            title="Manage Columns"
                                        ><ViewColumnIcon style={{ padding: "0px" }} /></Button>
                                    </div> */}
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div
                                            style={{
                                                flex: "1", backgroundColor: isSHovered2 ? '#f5f5f5' : 'white',
                                                borderRadius: '20%', padding: "0px 8px 0px 8px",
                                                margin: "2px 0px 0px 0px", // border: "1px solid red",
                                                height: "30px", minHeight: "30px",
                                            }}
                                            title="Manage Columns"
                                            onMouseEnter={handleSEnter2}
                                            onMouseLeave={handleSLeave2}
                                        >
                                            <ViewColumnIcon style={{ padding: "0px", backgroundColor: isSHovered2 ? '#f5f5f5' : 'white', marginTop: "2px", color: "DodgerBlue" }} onClick={HandleManageHeaderItemWHDtl} title="Manage Columns" />
                                        </div>
                                    </div>

                                </Box>
                            </div>

                            <div className={AllocDetailsClasses.TableBoby}>
                                <Paper sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", width: "calc(92vw - 0px)", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
                                    {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                    <TableContainer style={{ maxHeight: 120, width: "calc(100% - 0px)" }} component={Paper}>
                                        <Table aria-label="customized table">
                                            <ItemWHDetailsTableHead
                                                // numSelected={selected.length}
                                                order2={order2}
                                                orderBy2={orderBy2}
                                                onRequestSort={handleRequestSort2}
                                            // onSelectAllClick={handleSelectAllClick}
                                            // onRequestSort={handleRequestSort}
                                            // rowCount={qtyLimitsData.length}
                                            // sx={{height: "auto",border:"2px solid blue"}}
                                            />
                                            <TableBody
                                            // sx={{ height: "auto",border:"2px solid green" }}
                                            >
                                                {
                                                    filtrdItemWHData.length > 0 ?
                                                        filtrdItemWHData.map(row => (
                                                            <TableRow
                                                                onClick={() => { handleWRowClick(row) }}
                                                                onDoubleClick={() => { handleItmWDClick(row) }}
                                                                style={selectedWRow.WH_ID === row.WH_ID && selectedWRow.SOURCE_ITEM === row.SOURCE_ITEM ? { backgroundColor: "#CDF0FF" } : null}
                                                            >
                                                                {ManageHeaderDataItemWHDtl.includes('WH_ID') ?
                                                                    <TableCell align="right" sx={//filtrdLocGrpData.length>0 && filtrdLocGrpData[0].WH_ID===row.WH_ID && filtrdLocGrpData[0].SOURCE_ITEM===row.SOURCE_ITEM?{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" ,bgcolor:"yellowgreen"}:
                                                                        { fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", height: "20px" }}

                                                                    >{row.WH_ID}</TableCell> : null}
                                                                {ManageHeaderDataItemWHDtl.includes('SOURCE_ITEM') ?
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}>{row.SOURCE_ITEM}</TableCell> : null}
                                                                {ManageHeaderDataItemWHDtl.includes('SOURCE_ITEM_DESC') ?
                                                                    <TableCell align="right"
                                                                        // sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}}
                                                                        sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px', }} >
                                                                        {String(row.SOURCE_ITEM_DESC).length > 0 ?
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
                                                                                    {row.SOURCE_ITEM_DESC}
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
                                                                                        setOpenDialogAllocDtl(true);
                                                                                        setDialogDataAllocDtl(String(row.SOURCE_ITEM_DESC));
                                                                                    }}
                                                                                    startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                                                >
                                                                                </Button>
                                                                            </Box> : null}
                                                                    </TableCell> : null}
                                                                {ManageHeaderDataItemWHDtl.includes('DIFF_ID') ?
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                        {row.DIFF_ID}</TableCell> : null}
                                                                {ManageHeaderDataItemWHDtl.includes('GROSS_NEED') ?
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                        {row.GROSS_NEED}</TableCell> : null}
                                                                {ManageHeaderDataItemWHDtl.includes('STOCK_ON_HAND') ?
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                        {row.STOCK_ON_HAND}</TableCell> : null}
                                                                {ManageHeaderDataItemWHDtl.includes('FUTURE_FULFILL_QTY') ?
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                        {row.FUTURE_FULFILL_QTY}</TableCell> : null}
                                                                {ManageHeaderDataItemWHDtl.includes('NET_NEED') ?
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                        {row.NET_NEED}</TableCell> : null}
                                                                {ManageHeaderDataItemWHDtl.includes('CALC_QTY') ?
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                        {row.CALC_QTY}</TableCell> : null}
                                                                {ManageHeaderDataItemWHDtl.includes('AVAIL_QTY') ?
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                        {row.AVAIL_QTY}</TableCell> : null}
                                                                {ManageHeaderDataItemWHDtl.includes('ALLOC_QTY') ?
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                        {row.ALLOC_QTY}</TableCell> : null}
                                                                {ManageHeaderDataItemWHDtl.includes('REMAIN_QTY') ?
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">
                                                                        {row.REMAIN_QTY}</TableCell> : null}

                                                            </TableRow>
                                                        ))
                                                        : false
                                                }
                                                {filtrdItemWHData.length < 3 ?
                                                    [...Array(3 - (filtrdItemWHData.length)).keys()].map(val => (
                                                        <TableRow   >
                                                            {ManageHeaderDataItemWHDtl.map((row, index) => {
                                                                return (
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>)
                                                            })}
                                                            {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}}></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} ></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell> */}
                                                        </TableRow >
                                                    )) : false}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                </Paper>
                            </div>
                        </Box>


                        <Box
                            // display='flex'
                            sx={{
                                boxShadow: 3,
                                borderRadius: 1,
                                width: "calc(92vw - 0px)",
                                margin: "5px 0px 5px 5px",
                                padding: "0px 0px 0px 0px"
                            }}
                        >
                            <div className={AllocDetailsClasses.TableTotalBoby} display="flex">
                                <Box
                                    display='flex' justifyContent="space-between"
                                >
                                    <InputLabel sx={{
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        margin: "5px 0px 2px 5px",
                                        display: 'flex',
                                        float: 'left',
                                        color: "black",
                                    }}>
                                        Loc/Group Item Details
                                    </InputLabel>
                                    {/* <Button
                                        autoFocus
                                        variant="contained"
                                        onClick={HandleManageHeaderLocGroup}
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
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div
                                            style={{
                                                flex: "1", backgroundColor: isSHovered3 ? '#f5f5f5' : 'white',
                                                borderRadius: '20%', padding: "0px 8px 0px 8px",
                                                margin: "2px 0px 0px 0px", // border: "1px solid red",
                                                height: "30px", minHeight: "30px",
                                            }}
                                            title="Manage Columns"
                                            onMouseEnter={handleSEnter3}
                                            onMouseLeave={handleSLeave3}
                                        >
                                            <ViewColumnIcon style={{ padding: "0px", backgroundColor: isSHovered3 ? '#f5f5f5' : 'white', marginTop: "2px", color: "DodgerBlue" }} onClick={HandleManageHeaderLocGroup} title="Manage Columns" />
                                        </div>
                                    </div>
                                </Box>

                                <div>
                                    <Box
                                        display="flex"
                                        sx={{
                                            backgroundColor: "",
                                            margin: "0px 0px 0px 5px",
                                            justifyContent: "flex-start"
                                        }}
                                    >
                                        {/* <div>
                                            <FormControlLabel
                                                size="small"
                                                sx={{
                                                    padding: "0px",
                                                    margin: "0px 0px 10px 18px",
                                                }}
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        sx={{
                                                            margin: "0px 0px 0px 0px",
                                                            padding: "2px",
                                                        }}
                                                        inputProps={{ 'aria-label': 'controlled' }}
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
                                                    }}>
                                                    View By Other Group</InputLabel>}
                                            />
                                        </div> */}

                                    </Box>
                                </div>

                                <div className={AllocDetailsClasses.TableBoby}>
                                    <Paper sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
                                        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                        <TableContainer style={{ maxHeight: 300, width: "calc(100% - 0px)" }} component={Paper}>
                                            <Table aria-label="customized table">
                                                <LocGroupItemDetailsTableHead
                                                    numSelected={selected.length}
                                                    onSelectAllClick={handleSelectAllClick}
                                                    rowCount={LocGroupItemDetailsData.length}
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
                                                    {ManageHeaderDataLocGroup.includes('LOCATION_ID') ?
                                                        <TableCell sx={{
                                                            padding: "0px",
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="LOCATION_ID"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("LOCATION_ID") > 0 ? inputVal.LOCATION_ID : ""}
                                                                placeholder="Location"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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
                                                        </TableCell> : null}

                                                    {ManageHeaderDataLocGroup.includes('GROUP_ID') ?
                                                        <TableCell sx={{
                                                            padding: "0px",
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="LOC_LIST"
                                                                placeholder="Location List"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
                                                                }}
                                                                sx={{ width: "100%" }}
                                                                variant="standard"
                                                                inputProps={{
                                                                    sx: {
                                                                        fontSize: 12, padding: "2px", height: "20px", textAlign: "left",
                                                                        "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                    },
                                                                }}
                                                            />
                                                        </TableCell> : null}

                                                    {ManageHeaderDataLocGroup.includes('GROUP_DESC') ?
                                                        <TableCell sx={{
                                                            padding: "0px",
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="LOC_TRAIT"
                                                                placeholder="Location Attribute"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('WH_ID') ?
                                                        <TableCell sx={{
                                                            padding: "0px",
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="WH_ID"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("WH_ID") > 0 ? inputVal.WH_ID : ""}
                                                                placeholder="WH"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('ASSIGN_DEFAULT_WH') ?
                                                        <TableCell sx={{
                                                            padding: "0px",
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="ASSIGN_DEFAULT_WH"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("ASSIGN_DEFAULT_WH") > 0 ? inputVal.WH_ID : ""}
                                                                placeholder="Def WH"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('ITEM_PARENT') ?
                                                        <TableCell sx={{
                                                            padding: "0px",
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="ITEM_PARENT"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("ITEM_PARENT") > 0 ? inputVal.WH_ID : ""}
                                                                placeholder="Style"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('SOURCE_ITEM') ?
                                                        <TableCell sx={{
                                                            padding: "0px",
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="SOURCE_ITEM"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("SOURCE_ITEM") > 0 ? inputVal.SOURCE_ITEM : ""}
                                                                placeholder="Sku"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('SOURCE_ITEM_DESC') ?
                                                        <TableCell sx={{
                                                            padding: "0px"
                                                            , height: "auto"
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="SOURCE_ITEM_DESC"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("SOURCE_ITEM_DESC") > 0 ? inputVal.SOURCE_ITEM_DESC : ""}
                                                                placeholder="Description"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('DIFF_ID') ?
                                                        <TableCell sx={{
                                                            padding: "0px"
                                                            , height: "auto"
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="DIFF_ID"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("DIFF_ID") > 0 ? inputVal.DIFF_ID : ""}
                                                                placeholder="Variant"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('SOM_QTY') ?
                                                        <TableCell sx={{
                                                            padding: "0px"
                                                            , height: "auto"
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="SOM_QTY"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("SOM_QTY") > 0 ? inputVal.SOM_QTY : ""}
                                                                placeholder="Store Pack Qty"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('GROSS_NEED') ?
                                                        <TableCell sx={{
                                                            padding: "0px"
                                                            , height: "auto"
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="GROSS_NEED"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("GROSS_NEED") > 0 ? inputVal.GROSS_NEED : ""}
                                                                placeholder="Gross Need"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('STOCK_ON_HAND') ?
                                                        <TableCell sx={{
                                                            padding: "0px"
                                                            , height: "auto"
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="STOCK_ON_HAND"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("STOCK_ON_HAND") > 0 ? inputVal.STOCK_ON_HAND : ""}
                                                                placeholder="On Hand"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('FUTURE_FULFILL_QTY') ?
                                                        <TableCell sx={{
                                                            padding: "0px"
                                                            , height: "auto"
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="FUTURE_FULFILL_QTY"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("FUTURE_FULFILL_QTY") > 0 ? inputVal.FUTURE_FULFILL_QTY : ""}
                                                                placeholder="On Order"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('NET_NEED') ?
                                                        <TableCell sx={{
                                                            padding: "0px"
                                                            , height: "auto"
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="NET_NEED"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("NET_NEED") > 0 ? inputVal.NET_NEED : ""}
                                                                placeholder="Net Need"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('COMP_CALC_QTY') ?
                                                        <TableCell sx={{
                                                            padding: "0px"
                                                            , height: "auto"
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="COMP_CALC_QTY"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("COMP_CALC_QTY") > 0 ? inputVal.COMP_CALC_QTY : ""}
                                                                placeholder="Sku Calc Qty"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('CALC_QTY') ?
                                                        <TableCell sx={{
                                                            padding: "0px"
                                                            , height: "auto"
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                name="CALC_QTY"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("CALC_QTY") > 0 ? inputVal.CALC_QTY : ""}
                                                                placeholder="Calc Qty"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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

                                                    {ManageHeaderDataLocGroup.includes('ALLOC_QTY') ?
                                                        <TableCell sx={{
                                                            padding: "0px"
                                                            , height: "auto"
                                                        }}>
                                                            <TextField
                                                                placeholder="Alloc Qty"
                                                                name="ALLOC_QTY"
                                                                onChange={LockCheck ? handleChangeWeight : gridFilterLocGrp}
                                                                value={LockCheck ?
                                                                    Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("ALLOC_QTY") > 0 ? copyValue.ALLOC_QTY : "" :
                                                                    Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("ALLOC_QTY") > 0 ? inputVal.ALLOC_QTY : ""}
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    endAdornment: <SearchButtonCopy />,
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
                                                                }}
                                                                sx={{
                                                                    width: "100%"
                                                                }}
                                                                variant="standard"
                                                                inputProps={{
                                                                    maxLength: 5,
                                                                    sx: {
                                                                        fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                                        "&::placeholder": { textAlign: "left", padding: "0px", },
                                                                    },
                                                                }}
                                                            />
                                                        </TableCell> : null}

                                                    {ManageHeaderDataLocGroup.includes('VARIANCE_PCT') ?
                                                        <TableCell sx={{
                                                            padding: "0px"
                                                            , height: "auto"
                                                        }}>
                                                            <TextField
                                                                disabled={LockCheck}
                                                                placeholder="Variance"
                                                                name="VARIANCE_PCT"
                                                                onChange={gridFilterLocGrp}
                                                                value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("VARIANCE_PCT") > 0 ? inputVal.VARIANCE_PCT : ""}
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    sx: { fontSize: 12, padding: "0px", textAlign: "left", }
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
                                                </TableBody>

                                                <TableBody>
                                                    {
                                                        LocGroupItemDetailsData.length > 0 ?
                                                            LocGroupItemDetailsData.map((row, index) => {
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
                                                                        onClick={(event) => handleRowClick(row)}
                                                                        style={selectedRow.length > 0 && (selectedRow[0].LOC === row.LOCATION_ID
                                                                            && selectedRow[0].ITEM === row.SOURCE_ITEM
                                                                            && selectedRow[0].DIFF_ID === row.DIFF_ID) ? { backgroundColor: "#CDF0FF" } : null}
                                                                    >
                                                                        <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                                            <Checkbox size="small" color="primary" //disabled={false} 
                                                                                onClick={(event) => handleClick(event, row.SR_NO)}
                                                                                checked={isItemSelected}
                                                                                disabled={ApproveFreeseCheck}
                                                                                inputProps={{
                                                                                    'aria-labelledby': labelId,
                                                                                }}
                                                                                style={{ padding: "0px", textAlign: "left", display: 'flex', justifyContent: 'center', alignItems: 'center', }} />
                                                                        </TableCell>
                                                                        {ManageHeaderDataLocGroup.includes('LOCATION_ID') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}>
                                                                                {row.LOCATION_ID}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('GROUP_ID') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}>{row.GROUP_ID}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('GROUP_DESC') ?
                                                                            <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
                                                                                {String(row.GROUP_DESC).length > 0 ?
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
                                                                                            {row.GROUP_DESC}
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
                                                                                                setOpenDialogAllocDtl(true);
                                                                                                setDialogDataAllocDtl(String(row.GROUP_DESC));
                                                                                            }}
                                                                                            startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                                                        >
                                                                                        </Button>
                                                                                    </Box> : null}
                                                                            </TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('WH_ID') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.WH_ID}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('ASSIGN_DEFAULT_WH') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.ASSIGN_DEFAULT_WH}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('ITEM_PARENT') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.ITEM_PARENT}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('SOURCE_ITEM') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.SOURCE_ITEM}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('SOURCE_ITEM_DESC') ?
                                                                            <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
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
                                                                                        {row.SOURCE_ITEM_DESC}
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
                                                                                            setOpenDialogAllocDtl(true);
                                                                                            setDialogDataAllocDtl(String(row.SOURCE_ITEM_DESC));
                                                                                        }}
                                                                                        startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                                                    >
                                                                                    </Button>
                                                                                </Box>
                                                                            </TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('DIFF_ID') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.DIFF_ID}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('SOM_QTY') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.SOM_QTY}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('GROSS_NEED') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.GROSS_NEED}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('STOCK_ON_HAND') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.STOCK_ON_HAND}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('FUTURE_FULFILL_QTY') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.FUTURE_FULFILL_QTY}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('NET_NEED') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.NET_NEED}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('COMP_CALC_QTY') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.COMP_CALC_QTY}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('CALC_QTY') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.CALC_QTY}</TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('ALLOC_QTY') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                                <TextField
                                                                                    value={row.ALLOC_QTY}
                                                                                    defaultValue={row.ALLOC_QTY}
                                                                                    name="ALLOC_QTY"
                                                                                    onChange={(e) => { onTableCellChange(e, row, "ALLOC_QTY") }}
                                                                                    onBlur={() => { handleAllocQtyChange(row) }}
                                                                                    onKeyDown={(e) => {
                                                                                        if (e.key === "Enter") {
                                                                                            e.preventDefault();
                                                                                        }
                                                                                    }}
                                                                                    autoComplete="off"
                                                                                    sx={{
                                                                                        "& .MuiInputBase-input.Mui-disabled": {
                                                                                            backgroundColor: "#f0f0f0", borderRadius: "5px",
                                                                                        }, width: "100%",
                                                                                    }}
                                                                                    InputProps={{ style: { fontSize: 12, height: "22px", width: "100%", }, }}
                                                                                    disabled={ApproveFreeseCheck || (alloc_Dtls.length > 0 && alloc_Dtls[0].ALLOC_CRITERIA === "F")}
                                                                                    inputProps={{ maxLength: 20, sx: { padding: "0px 0px 0px 5px", height: "20px", width: "100%", backgroundColor: "#fff", textAlign: "left" } }}
                                                                                />
                                                                            </TableCell> : null}
                                                                        {ManageHeaderDataLocGroup.includes('VARIANCE_PCT') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.VARIANCE_PCT}</TableCell> : null}

                                                                    </TableRow >
                                                                )
                                                            }) : false}

                                                    {LocGroupItemDetailsData.length < 10 ?
                                                        [...Array(10 - (LocGroupItemDetailsData.length)).keys()].map(val => (

                                                            <TableRow  >
                                                                <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                                    <Checkbox size="small" color="primary" disabled={true}
                                                                        style={{ padding: "0px", textAlign: "left", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                                                    />
                                                                </TableCell>
                                                                {ManageHeaderDataLocGroup.map((row, index) => {
                                                                    return (
                                                                        <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>)
                                                                })}
                                                                {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} ></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                    <TextField
                                                                        sx={{
                                                                            width: "100%",
                                                                            "& .MuiInputBase-input.Mui-disabled": {
                                                                                backgroundColor: "#f0f0f0",
                                                                                borderRadius: "5px",
                                                                                // height: "15px",
                                                                            },
                                                                        }}

                                                                        InputProps={{
                                                                            style: {
                                                                                fontSize: 12, height: "20px", width: "100%",
                                                                                // border:"1px solid red"
                                                                            },
                                                                        }}
                                                                        disabled
                                                                        inputProps={{
                                                                            maxLength: 20,
                                                                            sx: { padding: "0px", height: "20px", width: "100%", backgroundColor: "#fff" }
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} textAlign="right"></TableCell> */}

                                                            </TableRow >
                                                        )) : false}
                                                    <TableRow style={{ background: "#bc8f8f" }} >
                                                        <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell>
                                                        {ManageHeaderDataLocGroup.includes('LOCATION_ID') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('GROUP_ID') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('GROUP_DESC') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} ></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('WH_ID') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('ASSIGN_DEFAULT_WH') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('ITEM_PARENT') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('SOURCE_ITEM') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "22px" }}></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('SOURCE_ITEM_DESC') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('DIFF_ID') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} ></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('SOM_QTY') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('GROSS_NEED') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('STOCK_ON_HAND') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('FUTURE_FULFILL_QTY') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('NET_NEED') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('COMP_CALC_QTY') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('CALC_QTY') ?
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{totalGrd2.length > 0 ? totalGrd2[0] : null}</TableCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('ALLOC_QTY') ?
                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{totalGrd2.length > 0 ? totalGrd2[1] : null}</TableCell> : null}

                                                        {ManageHeaderDataLocGroup.includes('VARIANCE_PCT') ?
                                                            <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right"></WhiteCell> : null}

                                                    </TableRow >
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        {selected.length > 0 ? <EnhancedTableToolbar numSelected={selected.length} /> : null}
                                    </Paper>


                                </div>
                            </div>

                        </Box>

                    </div>
                </Box>
            </div >

            {/* ITEM DETAILS ONCLICK POP-UP */}
            < div >
                <Dialog open={itmDScrn}
                    onClose={(event, reason) => {
                        // if (reason !== 'backdropClick') {

                        setItmDScrn(false);
                        //  }
                    }}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    maxWidth="sm"
                    PaperProps={{
                        style: {
                            maxWidth: '550px', // Set your custom width here
                            //margin: '0 auto',
                            //padding: '20px',
                            //boxSizing: 'border-box',
                        },
                    }}
                    disableBackdropClick
                >
                    {/* <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title"></DialogTitle> */}
                    <DialogContent
                        style={{
                            paddingBottom: "0px", paddingTop: "5px", paddingLeft: "20px",
                            height: "auto",
                        }}
                    >
                        <DialogContentText>
                            <QtyOfPack1 />
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
                                            maxHeight: 250, width: "calc(100% - 0px)"
                                        }} component={Paper}>
                                            <Table aria-label="customized table">
                                                <QtyPackHead1 />
                                                <TableBody>
                                                    {grid1Data.length > 0 ?
                                                        grid1Data.map(row => (
                                                            <TableRow  >
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}>{row.PACK_NO}</TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}>{row.ITEM}</TableCell>
                                                                <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
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
                                                                            {row.ITEM_DESC}
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
                                                                                setOpenDialogAllocDtl(true);
                                                                                setDialogDataAllocDtl(String(row.ITEM_DESC));
                                                                            }}
                                                                            startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                                        >
                                                                        </Button>
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}>{row.PACK_QTY}</TableCell>
                                                                {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} ></TableCell> */}
                                                            </TableRow >
                                                        )) : false}
                                                    {grid1Data.length < 10 ?
                                                        [...Array(10 - (grid1Data.length)).keys()].map(val => (
                                                            <TableRow  >
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} ></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}></TableCell>
                                                                {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left",fontSize: "75%", padding: "0px 0px 0px 3px"}} ></TableCell> */}
                                                            </TableRow >
                                                        )) : false}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                    </Paper>
                                </div>
                            </Box>


                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: "" }}>
                        <Button
                            sx={{

                                height: "fit-content", width: "100px", padding: "5px", margin: "5px 0px 0px 0px",
                                backgroundColor: "green", '&:hover': {
                                    backgroundColor: "#228B22", textShadow: "0 0 #000"
                                }, fontSize: "12px", margin: "0px 15px 0px 0px",
                            }}
                            size='medium'
                            variant="contained"
                            type="submit"
                            onClick={() => {
                                setItmDScrn(false)
                            }}
                            startIcon={<DoneAllIcon />}
                        >OK</Button>
                    </DialogActions>
                </Dialog>
            </div >
            {/* ITEM WH DETAILS ONCLICK POP-UP */}
            < div >
                <Dialog open={itmDWScrn}
                    onClose={(event, reason) => {
                        if (reason !== 'backdropClick') {

                            setItmWDScrn(false);
                        }
                    }}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    maxWidth="sm" //fullWidth
                    disableBackdropClick
                >
                    {/* <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        </DialogTitle> */}
                    <DialogContent
                        style={{
                            paddingBottom: "0px", paddingTop: "5px", paddingLeft: "20px",
                            height: "auto",
                        }}
                    >
                        <DialogContentText>
                            <QtyOfPack2 />
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
                                        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                        <TableContainer style={{
                                            maxHeight: 270, width: "calc(100% - 0px)"
                                        }} component={Paper}>
                                            <Table aria-label="customized table">
                                                <QtyPackHead2 />
                                                <TableBody>
                                                    {grid2Data.length > 0 ?
                                                        grid2Data.map((row, index) => (
                                                            <TableRow key={index} >
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}>{row.TRAN_ITEM}</TableCell>
                                                                <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
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
                                                                            {row.ITEM_DESC}
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
                                                                                setOpenDialogAllocDtl(true);
                                                                                setDialogDataAllocDtl(String(row.ITEM_DESC));
                                                                            }}
                                                                            startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                                        >
                                                                        </Button>
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}>{row.WH}</TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}>{row.HIGHEST_CALC_QTY}</TableCell>
                                                                <TableCell sx={{
                                                                    padding: "0px",
                                                                    textAlign: "center",
                                                                    fontSize: "12px",
                                                                    outline: "none",
                                                                    verticalAlign: "center",
                                                                    // backgroundColor: '#fff',
                                                                    margin: "0px 0px 0px 0px",
                                                                }}
                                                                    disabled={ApproveFreeseCheck || (alloc_Dtls.length > 0 && alloc_Dtls[0].ALLOC_CRITERIA === "F")}

                                                                    // className={CreateAllocationClasses.SpecificCell}
                                                                    // contentEditable={((alloc_Dtls.length ? alloc_Dtls[0].ALLOC_CRITERIA !== "F" : false) || ApproveFreeseCheck) ? true : false}
                                                                    contentEditable={((alloc_Dtls.length > 0 && alloc_Dtls[0].ALLOC_CRITERIA === "F") || ApproveFreeseCheck) ? false : true}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === "Enter") {
                                                                            e.preventDefault();


                                                                        }
                                                                    }}
                                                                    onBlur={(e) => handleAllocQtyChangeGrid(e, row)}
                                                                    onInput={(e) => {
                                                                        const valid = /^\d+$/.test(e.target.textContent)
                                                                        if (!valid && e.target.textContent !== "") {
                                                                            setOpenDialogAllocDtl(true);
                                                                            setDialogDataAllocDtl("Only Numberic values are accepted");
                                                                            e.target.textContent = ""
                                                                        }
                                                                        else if (parseInt(e.target.textContent) < 0 && e.target.textContent !== "") {
                                                                            setOpenDialogAllocDtl(true);
                                                                            setDialogDataAllocDtl("Values should be greater than zero*");
                                                                            e.target.textContent = ""
                                                                        }
                                                                        else if (e.target.textContent.length === 0 && row.ALLOC_QTY.length > 0) {
                                                                            row["ALLOC_QTY"] = ""
                                                                        }
                                                                    }}
                                                                    suppressContentEditableWarning={true}
                                                                >
                                                                    <Box sx={alloc_Dtls[0].ALLOC_CRITERIA === "F" ? {
                                                                        backgroundColor: '#f0f0f0',
                                                                        padding: "1px 0px 0px 0px",
                                                                        height: "22px",
                                                                        border: "1px solid lightgrey",
                                                                        borderRadius: "3px",
                                                                        //  textAlign: "center",
                                                                        fontSize: 12,
                                                                        margin: "0px"
                                                                    } : {
                                                                        backgroundColor: '#fff',
                                                                        padding: "1px 0px 0px 0px",
                                                                        height: "22px",
                                                                        border: "1px solid lightgrey",
                                                                        borderRadius: "3px",
                                                                        //  textAlign: "center",
                                                                        fontSize: 12,
                                                                        margin: "0px"
                                                                    }
                                                                    }>
                                                                        {row.ALLOC_QTY}
                                                                    </Box>
                                                                </TableCell>

                                                            </TableRow >
                                                        )) : false}
                                                    {grid2Data.length < 10 ?
                                                        [...Array(10 - (grid2Data.length)).keys()].map(val => (
                                                            <TableRow  >
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} ></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} >

                                                                    <TextField
                                                                        sx={{
                                                                            width: "100%",
                                                                            "& .MuiInputBase-input.Mui-disabled": {
                                                                                backgroundColor: "#f0f0f0",
                                                                                borderRadius: "5px",
                                                                                // height: "15px",
                                                                            },
                                                                        }}

                                                                        InputProps={{
                                                                            style: {
                                                                                fontSize: 12, height: "22px", width: "100%",
                                                                                // border:"1px solid red"
                                                                            },
                                                                        }}
                                                                        disabled
                                                                        inputProps={{
                                                                            maxLength: 20,
                                                                            sx: { padding: "0px", height: "20px", width: "100%", backgroundColor: "#fff" }
                                                                        }}

                                                                    />
                                                                </TableCell>
                                                            </TableRow >
                                                        )) : false}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                    </Paper>
                                </div>
                            </Box>


                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: "" }}>
                        <Button
                            sx={{

                                height: "fit-content", width: "100px", padding: "5px", margin: "5px 0px 0px 0px",
                                backgroundColor: "green", '&:hover': {
                                    backgroundColor: "#228B22", textShadow: "0 0 #000"
                                }, fontSize: "12px", margin: "0px 0px 0px 0px",
                            }}
                            size='medium'
                            variant="contained"
                            type="submit"
                            onClick={handleG2Ok}
                            onMouseDown={handleOkButtonMouseDown}
                            startIcon={<DoneAllIcon />}
                        >OK</Button>

                        <Button
                            sx={{
                                height: "fit-content", width: "100px", padding: "5px",
                                margin: "5px 0px 0px 0px", backgroundColor: "maroon",
                                // '&:hover': {
                                //     backgroundColor: "#228B22", textShadow: "0 0 #000"
                                // },
                                fontSize: "12px", margin: "0px 15px 0px 0px",
                            }}
                            variant="contained"
                            type="submit"
                            onClick={handleG2Cancel}
                            onMouseDown={handleCancelButtonMouseDown}
                            startIcon={<CancelIcon />}
                        >
                            Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div >
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
            < div >
                <Dialog
                    fullWidth={true}
                    maxWidth="xs"
                    open={openDialogAllocDtl}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    disableBackdropClick
                >
                    <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px", margin: "0px", }}></DialogTitle>
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', margin: "0px", padding: "0px 10px 0px 10px", }} >
                        {DialogDataAllocDtl}
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px", }}
                            onClick={handleCloseDialog} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            {/* ITEM DETAILS MANAGE COLUMNS POP-UP */}
            <div>
                <Dialog
                    // fullWidth={true}
                    maxWidth="xs"
                    open={openDialogManageItemDtl}
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
                        {headerManageItemDtl()}
                    </DialogContent>
                    <DialogActions sx={{ display: "flex", justifyContent: "space-between", }}>
                        <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "125px" }}
                            onClick={handleShowAllManageHeaderItemDtl} autoFocus variant="contained" startIcon={<AnimationIcon />}>
                            Show All
                        </Button>

                        <Box>
                            <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 0px 0px 0px", width: "100px" }}
                                onClick={handleCloseDialogManageItemDtl} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                                Ok
                            </Button>
                        </Box>
                    </DialogActions>
                </Dialog>
            </div>

            {/* ITEM WH DETAILS MANAGE COLUMNS POP-UP */}
            <div>
                <Dialog
                    // fullWidth={true}
                    maxWidth="xs"
                    open={openDialogManageItemWHDtl}
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
                        {headerManageItemWHDtl()}
                    </DialogContent>
                    <DialogActions sx={{ display: "flex", justifyContent: "space-between", }}>
                        <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "125px" }}
                            onClick={handleShowAllManageHeaderItemWHDtl} autoFocus variant="contained" startIcon={<AnimationIcon />}>
                            Show All
                        </Button>

                        <Box>
                            <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 0px 0px 0px", width: "100px" }}
                                onClick={handleCloseDialogManageItemWHDtl} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                                Ok
                            </Button>
                        </Box>
                    </DialogActions>
                </Dialog>
            </div>

            {/* LOC GROUP DETAILS MANAGE COLUMNS POP-UP */}
            <div>
                <Dialog
                    // fullWidth={true}
                    maxWidth="xs"
                    open={openDialogManageLocGroup}
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
                        {headerManageLocGroup()}
                    </DialogContent>
                    <DialogActions sx={{ display: "flex", justifyContent: "space-between", }}>
                        <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "125px" }}
                            onClick={handleShowAllManageHeaderLocGroup} autoFocus variant="contained" startIcon={<AnimationIcon />}>
                            Show All
                        </Button>

                        <Box>
                            <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 0px 0px 0px", width: "100px" }}
                                onClick={handleCloseDialogManageLocGroup} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                                Ok
                            </Button>
                        </Box>
                    </DialogActions>
                </Dialog>
            </div>
        </Box >
    )

};

export default AllocDetailsPack;