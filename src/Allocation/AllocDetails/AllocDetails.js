import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import { makeStyles, withStyles } from "@mui/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import swal from '@sweetalert/with-react';
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
import { visuallyHidden } from '@mui/utils';
import { ItemWHDetailsHeader } from "./tableHead";
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import StormIcon from '@mui/icons-material/Storm';
import {
    postALLOCDTLTABRequest,
    postALLOCDTLRTVRequest,
    postSizeProfRequest,
    postSpreadAllocRequest,
    postAllocQtyRequest,
    postCOMMITDATARequest,
    postFETCHNNRequest,
    postCOPYADRequest,
    postADSaveRequest,
} from "../../Redux/Action/createAllocation";
import SizeDetails from "../SizeDetails";
import { getALLOCHEADDETAILSRequest, } from "../../Redux/Action/quantityLimits"
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { BsFillEraserFill } from 'react-icons/bs';
import LockIcon from '@mui/icons-material/Lock';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AnimationIcon from '@mui/icons-material/Animation';
import { StickyTableRow } from '@mui/material/Table';
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Draggable from 'react-draggable';
import DialogTitle from "@mui/material/DialogTitle";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';
import { useRef } from "react";
import { CONFIG } from "../../services/config";
import {
    getLOCATIONLISTRLRequest,
    getLOCATIONTRAITSRLRequest,
} from "../../Redux/Action/rules&location";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
//import { withStyles } from '@material-ui/core/styles';

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
        // backgroundColor:"yellow",
        // width:"100%",
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
        // marginBottom: "0.2rem",
        // marginLeft: "20px"
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
    TitleRowSrc: {
        //paddingTop:"2px",

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
    TableBoby: {
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

});


const AllocDetails = ({ allocNoData, setTab, setDisCond, ApproveFreeseCheck, adData, setIsLoading, setADData, setValAD, setADSwitch }) => {
    const [spTabData, setSPTabData] = useState([]);
    const [itmDData, setItmDData] = useState([]);
    const [sampleVal, setSampleVal] = useState([]);

    const [itmWHData, setItmWHData] = useState([]);
    const [locGrpData, setLocGrpData] = useState([]);

    const [filtrdItemWHData, setfiltrdItemWHData] = useState([]);
    const [filtrdLocGrpData, setfiltrdLocGrpData] = useState([]);
    const [alloc_Dtls, SetAlloc_Dtls] = useState([]);
    const [loading, setLoading] = useState(false);
    // INLINE SEARCH FILTER
    const [srcFltrItmD, setsrcFltrItmD] = useState([]);
    const [srcFltrLocGrp, setsrcFltrLocGrp] = useState([]);
    const [inputVal, setInputVal] = useState({});
    const [inputValLoc, setInputValLoc] = useState({});
    const [inputValD, setInputValD] = useState({});
    //sort
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
    const [totalGrd1, setTotalGrd1] = useState([]);
    const [totalGrd2, setTotalGrd2] = useState([]);
    const [fltrTest, setFltrTest] = useState([]);
    const [editAQ, setEditAQ] = useState([]);
    const [editAQCheck, setEditAQCheck] = useState(false);
    const [AllocQtyData, setAllocQtyData] = useState([]);
    const [sizeDData, setSizeDData] = useState([]);
    //CHECKBOX SELECT 
    const [selected, setSelected] = useState([])
    // COPY DOWN AND ERASE 
    const [LockCheck, setLockCheck] = useState(false);
    const [copyValue, setCopyValue] = useState({});
    const [sProfile, setSProfile] = useState(false);
    const [spHeaderData, setSPHeaderdata] = useState([]);
    /*COPY DOWN VARIABLE */
    const [cLocData, setCLocData] = useState([]);
    const [cUpdateChk, setCUpdateChk] = useState([]);
    const [copyRData, setCopyRData] = useState([]);
    const [countRow, setCountRow] = useState(0);

    const AllocDetailsClasses = useStyles();
    const [selectedRow, setSelectedRow] = useState(null);
    const [ruleType, setRuleType] = useState("");
    const [dataCheck, setDataCheck] = useState(false);
    const [sizePdata, setSizePData] = useState([]);
    const AllocDetailsData = useSelector(
        (state) => state.CreateAllocationReducers
    );

    const [locationListRL, setLocationListRl] = useState([]);
    const [locationTraitRL, setLocationTraitRl] = useState([]);

    const RulesLocationData = useSelector(
        (state) => state.RulesLocationReducers
    );
    // const [isLoading, setIsLoading] = useState(false);
    const [LoadCheck, setLoadCheck] = useState(false);
    // Create a ref
    const tableRef = useRef(null);
    const dispatch = useDispatch();

    const [sizeDetailsScreen, setsizeDetailsScreen] = useState(false);
    const [ScreenNameAllocDetails, setScreenNameAllocDetails] = useState("Alloc_details");
    const [reload, setReload] = useState(false);

    // Error popup message
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

    const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
    const [ManageHeaderDataItemDtl, setManageHeaderDataItemDtl] = useState([]);
    const [ManageHeaderDataItemWHDtl, setManageHeaderDataItemWHDtl] = useState([]);
    const [ManageHeaderDataLocGroup, setManageHeaderDataLocGroup] = useState([]);

    // CHECK OK/CANCEL CLICK
    var okButtonClicked = false;
    var cancelButtonClicked = false;
    const [closeOnBlur, setCloseOnBlur] = useState("");
    const ItemDetailsHeader = [
        { id: "SOURCE_ITEM", label: alloc_Dtls.length > 0 && alloc_Dtls[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku" },
        { id: "SOURCE_ITEM_DESC", label: "Description" },
        { id: "DIFF_ID", label: "Variant" },
        { id: "GROSS_NEED", label: "Gross Need" },
        { id: "STOCK_ON_HAND", label: "On Hand" },
        { id: "FUTURE_FULFILL_QTY", label: "On Order" },
        { id: "NET_NEED", label: "Net Need" },
        { id: "CALC_QTY", label: "Calc Qty" },
        { id: "AVAIL_QTY", label: "Avail Qty" },
        { id: "ALLOC_QTY", label: "Alloc Qty" },
        { id: "REMAIN_QTY", label: "Remain Qty" },
    ];

    const LocGroupItemDetailsHeader = [
        { id: "LOCATION_ID", label: "Location" },
        { id: "GROUP_ID", label: "Location List" },
        { id: "GROUP_DESC", label: "Location Attribute" },
        { id: "WH_ID", label: "Def WH" },
        { id: "SOURCE_ITEM", label: alloc_Dtls.length > 0 && alloc_Dtls[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku" },
        { id: "SOURCE_ITEM_DESC", label: "Description" },
        { id: "DIFF_ID", label: "Variant" },
        { id: "SOM_QTY", label: "Store Pack Qty" },
        { id: "GROSS_NEED", label: "Gross Need" },
        { id: "STOCK_ON_HAND", label: "On Hand" },
        { id: "FUTURE_FULFILL_QTY", label: "On Order" },
        { id: "NET_NEED", label: "Net Need" },
        { id: "CALC_QTY", label: "Calc Qty" },
        { id: "ALLOC_QTY", label: "Alloc Qty" },
        { id: "VARIANCE_PCT", label: "Variance" },
    ];

    const SPHeader = [
        { id: "Sku", width: "50px" },
        { id: "Description", width: "150px" },
        { id: "Contrib Pct", width: "50px" }
    ]
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
        document.title = 'Alloc Details';
    }, []);

    var check = false;
    useEffect(() => {
        setLoading(true);

        if (adData.length > 0) {
            dispatch(getALLOCHEADDETAILSRequest([allocNoData]));
            dispatch(getLOCATIONLISTRLRequest([{}]));
            dispatch(getLOCATIONTRAITSRLRequest([{}]));
            check = true
            setLoadCheck(true);
        }
    }, [""]);

    const serializedata1 = (datatable) => {
        let newTabledata = [];
        let count = 1;
        if (datatable.length > 0) {
            datatable.map(item => {
                item['SR_NO'] = count;
                const reorder = {
                    "ALLOC_NO": "", "SOURCE_ITEM": "", "SOURCE_ITEM_DESC": "", "DIFF_ID": "",
                    "PO_NO": "", "RULE_TYPE": "", "GROSS_NEED": "", "STOCK_ON_HAND": "",
                    "FUTURE_FULFILL_QTY": "", "NET_NEED": "", "CALC_QTY": "", "AVAIL_QTY": "",
                    "ALLOC_QTY": "", "REMAIN_QTY": "", "SPREAD_QTY": "", "SOM_QTY": "", "PACK_IND": ""
                }
                count++;

                let test = Object.assign(reorder, item);
                newTabledata.push(test);
            })
            // setTabledataclone(newTabledata)
            return newTabledata;
        }
    }
    const serializedata2 = (datatable) => {
        let newTabledata = [];
        let count = 1;
        if (datatable.length > 0) {
            datatable.map(item => {
                item['SR_NO'] = count;
                const reorder = {
                    "ALLOC_NO": "", "WH_ID": "", "SOURCE_ITEM": "", "SOURCE_ITEM_DESC": "",
                    "DIFF_ID": "", "PO_NO": "", "RULE_TYPE": "", "GROSS_NEED": "", "STOCK_ON_HAND": "",
                    "FUTURE_FULFILL_QTY": "", "NET_NEED": "", "CALC_QTY": "", "AVAIL_QTY": "", "ALLOC_QTY": "",
                    "REMAIN_QTY": "", "SPREAD_QTY": "", "SOM_QTY": ""
                }
                count++;

                let test = Object.assign(reorder, item);
                newTabledata.push(test);
            })
            // setTabledataclone(newTabledata)
            return newTabledata;
        }
    }
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
                    "ALLOC_QTY": "", "VARIANCE_PCT": "", "SEL_IND": "", "ITEM_PARENT": "", "PACK_NO": "", "COMP_CALC_QTY": ""
                }
                count++;

                let test = Object.assign(reorder, item);
                newTabledata.push(test);
            })
            // setTabledataclone(newTabledata)
            return newTabledata;
        }
    }
    const handleCancel = () => {
        cancelButtonClicked = false;
        setTab('1');
        setDisCond(0);
        setADData([]);
        setValAD(false);
        setADSwitch(0);
        dispatch(postADSaveRequest(["CLOSE"]));
        document.title = 'Create Allocation';
    }
    const handleOk = () => {
        okButtonClicked = false;
        setTab('1');
        setDisCond(0);
        setADData([]);
        setValAD(false);
        setADSwitch(0);
        dispatch(postADSaveRequest(["SAVE"]));
        document.title = 'Create Allocation';
    }

    const handleOkButtonMouseDown = () => {
        okButtonClicked = true;
    };

    const handleCancelButtonMouseDown = () => {
        cancelButtonClicked = true;
    };
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

    useEffect(() => {
        if (reload) {
            console.log("Reload ::  ")
            setLoadCheck(true);
            dispatch(postALLOCDTLTABRequest([allocNoData]));
        }
    }, [reload])

    useEffect(() => {
        setLoading(true);

        if ((adData.length > 0 && alloc_Dtls.length > 0) || (reload && adData.length > 0)) {
            if (adData[0].length === 0 || adData[1].length === 0 || adData[2].length === 0) {
                var emptyChk = 0;
                if (adData[0].length === 0) {
                    adData[0] = [{
                        "ALLOC_NO": "", "SOURCE_ITEM": "", "SOURCE_ITEM_DESC": "", "DIFF_ID": "",
                        "PO_NO": "", "RULE_TYPE": "", "GROSS_NEED": "", "STOCK_ON_HAND": "",
                        "FUTURE_FULFILL_QTY": "", "NET_NEED": "", "CALC_QTY": "", "AVAIL_QTY": "",
                        "ALLOC_QTY": "", "REMAIN_QTY": "", "SPREAD_QTY": "", "SOM_QTY": "", "PACK_IND": ""
                    }]
                    setOpenDialogAllocDtl(true);
                    setDialogDataAllocDtl("Alloc details top grid is empty no data retrieved from function 'RTV_ALLOC_DTL'.");
                    emptyChk = 1;
                }
                if (adData[2].length === 0) {
                    adData[2] = [{
                        "ALLOC_NO": "", "WH_ID": "", "SOURCE_ITEM": "", "SOURCE_ITEM_DESC": "",
                        "DIFF_ID": "", "PO_NO": "", "RULE_TYPE": "", "GROSS_NEED": "", "STOCK_ON_HAND": "",
                        "FUTURE_FULFILL_QTY": "", "NET_NEED": "", "CALC_QTY": "", "AVAIL_QTY": "", "ALLOC_QTY": "",
                        "REMAIN_QTY": "", "SPREAD_QTY": "", "SOM_QTY": ""
                    }];
                    if (emptyChk === 0) {
                        setOpenDialogAllocDtl(true);
                        setDialogDataAllocDtl("Alloc details middle grid is empty no data retrieved from function 'RTV_ALLOC_DTL'.");
                        emptyChk = 2;
                    }

                }
                if (adData[1].length === 0) {
                    adData[1] = [{
                        "ALLOC_NO": "", "WH_ID": "", "SOURCE_ITEM": "", "SOURCE_ITEM_DESC": "",
                        "DIFF_ID": "", "PO_NO": "", "LOCATION_ID": "", "LOCATION_DESC": "", "GROUP_ID": "",
                        "GROUP_DESC": "", "ASSIGN_DEFAULT_WH": "", "RULE_TYPE": "", "SOM_QTY": "", "GROSS_NEED": "",
                        "STOCK_ON_HAND": "", "FUTURE_FULFILL_QTY": "", "NET_NEED": "", "CALC_QTY": "",
                        "ALLOC_QTY": "", "VARIANCE_PCT": "", "SEL_IND": "", "ITEM_PARENT": "", "PACK_NO": "", "COMP_CALC_QTY": ""
                    }];

                    if (emptyChk === 0) {
                        setOpenDialogAllocDtl(true);
                        setDialogDataAllocDtl("Alloc details bottom grid is empty no data retrieved from function 'RTV_ALLOC_DTL'.");
                    }
                }
            }

            const itmD = adData[0].length > 0 ? serializedata1(adData[0]) : []
            const itmWD = adData[2].length > 0 ? serializedata2(adData[2]) : []
            const itmLocD = adData[1].length > 0 ? serializedata3(adData[1]) : []
            setRuleType(adData[3]);
            let uniqueLocGrp = alloc_Dtls[0].ALLOC_CRITERIA === "F" ? ((itmLocD.filter(obj =>
                (obj.DIFF_ID === itmWD[0].DIFF_ID) && obj.SOURCE_ITEM === itmWD[0].SOURCE_ITEM)).length > 0
                ? [...new Map((itmLocD.filter(obj => (
                    obj.DIFF_ID === itmWD[0].DIFF_ID && obj.SOURCE_ITEM === itmWD[0].SOURCE_ITEM))).map((item) => [item["LOCATION_ID"], item])).values()]
                : [])
                :
                ((itmLocD.filter(obj => (
                    obj.WH_ID === itmWD[0].WH_ID) && obj.SOURCE_ITEM === itmWD[0].SOURCE_ITEM)).length > 0
                    ? [...new Map((itmLocD.filter(obj => (
                        obj.WH_ID === itmWD[0].WH_ID
                        && obj.SOURCE_ITEM === itmWD[0].SOURCE_ITEM))).map((item) => [item["LOCATION_ID"], item])).values()]
                    : []);
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
            uniqueLocGrp.map(obj => {
                if (obj.ALLOC_QTY !== "") {
                    totalAllocGrid2 = totalAllocGrid2 + obj.ALLOC_QTY;
                }
                if (obj.CALC_QTY !== "") {
                    totalCalcGrid2 = totalCalcGrid2 + obj.CALC_QTY;
                }
            });
            setTotalGrd1([totalAvailGrid1, totalAllocGrid1]);
            setTotalGrd2([totalCalcGrid2, totalAllocGrid2]);
            setItmDData(itmD);
            setsrcFltrItmD(itmD);
            setItmWHData(itmWD);
            setLocGrpData(itmLocD);
            setSizeDData([(itmWD.filter((obj) => obj.SOURCE_ITEM === (itmD)[0].SOURCE_ITEM))[0]]);
            setfiltrdItemWHData(itmWD.filter((obj) => obj.SOURCE_ITEM === (itmD)[0].SOURCE_ITEM && obj.DIFF_ID === (itmD)[0].DIFF_ID));
            setfiltrdLocGrpData(uniqueLocGrp);
            setSelectedRow(uniqueLocGrp.length > 0 ? uniqueLocGrp[0].LOCATION_ID : null);
            setsrcFltrLocGrp(uniqueLocGrp);
            setIsLoading(false);
            adData.splice(0, adData.length);
            setLoadCheck(false);
            setReload(false);
        }
    });

    /*
    ****************************************
    ******   HANDLING API RESPONSE    ******
    ****************************************
    */
    useEffect(() => {
        if (AllocDetailsData?.data?.allocHDetails && Array.isArray(AllocDetailsData?.data?.allocHDetails)) {
            SetAlloc_Dtls(AllocDetailsData?.data?.allocHDetails);
            setLoading(false);
        } else if (AllocDetailsData?.data?.allocdtlData && Array.isArray(AllocDetailsData?.data?.allocdtlData)) {
            setItmDData(AllocDetailsData?.data?.allocdtlData[0]);
            setsrcFltrItmD(AllocDetailsData?.data?.allocdtlData[0]);
            setItmWHData(AllocDetailsData?.data?.allocdtlData[2]);
            setLocGrpData(AllocDetailsData?.data?.allocdtlData[1]);
            setfiltrdItemWHData(AllocDetailsData?.data?.allocdtlData[2].filter((obj) => obj.SOURCE_ITEM === (AllocDetailsData?.data?.allocdtlData[0])[0].SOURCE_ITEM))

            let uniqueLocGrp = (AllocDetailsData?.data?.allocdtlData[1].filter(obj => (
                obj.WH_ID === AllocDetailsData?.data?.allocdtlData[2][0].WH_ID) && obj.SOURCE_ITEM === AllocDetailsData?.data?.allocdtlData[2][0].SOURCE_ITEM)).length > 0
                ? [...new Map((AllocDetailsData?.data?.allocdtlData[1].filter(obj => (
                    obj.WH_ID === AllocDetailsData?.data?.allocdtlData[2][0].WH_ID
                    && obj.SOURCE_ITEM === AllocDetailsData?.data?.allocdtlData[2][0].SOURCE_ITEM))).map((item) => [item["LOCATION_ID"], item])).values()]
                : [];
            setfiltrdLocGrpData(uniqueLocGrp);
            setsrcFltrLocGrp(uniqueLocGrp);
            setIsLoading(false);
            setSelectedRow(uniqueLocGrp.length > 0 ? uniqueLocGrp[0].LOCATION_ID : null);
            var totalAllocGrid1 = 0;
            var totalAvailGrid1 = 0;
            var totalAllocGrid2 = 0;
            var totalCalcGrid2 = 0;
            AllocDetailsData?.data?.allocdtlData[0].map(obj => {
                if (obj.ALLOC_QTY !== "") {
                    totalAllocGrid1 = totalAllocGrid1 + obj.ALLOC_QTY;
                }
                if (obj.AVAIL_QTY !== "") {
                    totalAvailGrid1 = totalAvailGrid1 + obj.AVAIL_QTY;
                }
            });
            uniqueLocGrp.map(obj => {
                if (obj.ALLOC_QTY !== "") {
                    totalAllocGrid2 = totalAllocGrid2 + obj.ALLOC_QTY;
                }
                if (obj.CALC_QTY !== "") {
                    totalCalcGrid2 = totalCalcGrid2 + obj.CALC_QTY;
                }
            });

            setTotalGrd1([totalAvailGrid1, totalAllocGrid1]);
            setTotalGrd2([totalCalcGrid2, totalAllocGrid2]);

        } else if (AllocDetailsData?.data?.sprdAllocData && Array.isArray(AllocDetailsData?.data?.sprdAllocData)) {
            setItmDData(AllocDetailsData?.data?.sprdAllocData[0]);
            setsrcFltrItmD(AllocDetailsData?.data?.sprdAllocData[0]);
            setItmWHData(AllocDetailsData?.data?.sprdAllocData[2]);
            setLocGrpData(AllocDetailsData?.data?.sprdAllocData[1]);
            setfiltrdItemWHData(AllocDetailsData?.data?.sprdAllocData[2].filter((obj) => obj.SOURCE_ITEM === (AllocDetailsData?.data?.sprdAllocData[0])[0].SOURCE_ITEM))

            let uniqueLocGrp = (AllocDetailsData?.data?.sprdAllocData[1].filter(obj => (
                obj.WH_ID === AllocDetailsData?.data?.sprdAllocData[2][0].WH_ID) && obj.SOURCE_ITEM === AllocDetailsData?.data?.sprdAllocData[2][0].SOURCE_ITEM)).length > 0
                ? [...new Map((AllocDetailsData?.data?.sprdAllocData[1].filter(obj => (
                    obj.WH_ID === AllocDetailsData?.data?.sprdAllocData[2][0].WH_ID
                    && obj.SOURCE_ITEM === AllocDetailsData?.data?.sprdAllocData[2][0].SOURCE_ITEM))).map((item) => [item["LOCATION_ID"], item])).values()]
                : [];


            setfiltrdLocGrpData(uniqueLocGrp);
            setsrcFltrLocGrp(uniqueLocGrp);
            setSelectedRow(uniqueLocGrp.length > 0 ? uniqueLocGrp[0].LOCATION_ID : null);
            setIsLoading(false);
            var totalAllocGrid1 = 0;
            var totalAvailGrid1 = 0;
            var totalAllocGrid2 = 0;
            var totalCalcGrid2 = 0;
            AllocDetailsData?.data?.sprdAllocData[0].map(obj => {
                totalAllocGrid1 = totalAllocGrid1 + obj.ALLOC_QTY;
                totalAvailGrid1 = totalAvailGrid1 + obj.AVAIL_QTY;
            });
            uniqueLocGrp.map(obj => {
                totalAllocGrid2 = totalAllocGrid2 + obj.ALLOC_QTY;
                totalCalcGrid2 = totalCalcGrid2 + obj.CALC_QTY;
            });
            setTotalGrd1([totalAvailGrid1, totalAllocGrid1]);
            setTotalGrd2([totalCalcGrid2, totalAllocGrid2]);
        } else if (AllocDetailsData?.data?.sizeProfData && Array.isArray(AllocDetailsData?.data?.sizeProfData)) {
            setSPTabData(AllocDetailsData?.data?.sizeProfData);
            setIsLoading(false);
            setLoadCheck(false);
        } else if (AllocDetailsData?.data?.AllocQtyData && Array.isArray(AllocDetailsData?.data?.AllocQtyData)) {
            setAllocQtyData(AllocDetailsData?.data?.AllocQtyData)
            if (editAQ.length > 0) {
                setEditAQCheck(true);
            }
        }
        if (AllocDetailsData?.data?.sizeProfData && Array.isArray(AllocDetailsData?.data?.sizeProfData)) {
            setSizePData(AllocDetailsData?.data?.sizeProfData)
            if (AllocDetailsData?.data?.sizeProfData.length === 0) {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl("No record found for item and location.");
                AllocDetailsData.data.sizeProfData = ""
            }
        } else if (
            AllocDetailsData?.data?.allocdtlval
            && Array.isArray(AllocDetailsData?.data?.allocdtlval)
        ) {
            setADData(AllocDetailsData?.data?.allocdtlval);
            setLoadCheck(false);
        }
    }, [AllocDetailsData?.data]);

    useEffect(() => {
        if ((AllocDetailsData?.data?.sprdAllocData?.status) === 500 || (AllocDetailsData?.data?.allocdtlData?.status) === 500) {
            setOpenDialogAllocDtl(true);
            setDialogDataAllocDtl(String(AllocDetailsData?.data?.sprdAllocData?.message));
            AllocDetailsData.data.sprdAllocData.status = 0
            setIsLoading(false);
            setLoadCheck(false);
        }
        if ((AllocDetailsData?.data?.AllocQtyData?.status) === 500) {
            setOpenDialogAllocDtl(true);
            setDialogDataAllocDtl(String(AllocDetailsData?.data?.AllocQtyData?.message));
            AllocDetailsData.data.AllocQtyData.status = 0
            setLoadCheck(false);
        } if ((AllocDetailsData?.data?.allocdtlval?.status) === 500) {
            setOpenDialogAllocDtl(true);
            setDialogDataAllocDtl(String(AllocDetailsData?.data?.allocdtlval?.message));
            AllocDetailsData.data.allocdtlval.status = 0
            setLoadCheck(false);
        }
        if (AllocDetailsData?.data?.sizeProfData?.status === 500) {
            setOpenDialogAllocDtl(true);
            setDialogDataAllocDtl(String(AllocDetailsData?.data?.sizeProfData?.message));
            AllocDetailsData.data.sizeProfData.status = 0
            setSProfile(false);
            setLoadCheck(false);
        }
    }, [AllocDetailsData?.data]);

    useEffect(() => {
        if (
            RulesLocationData?.data?.locationListRL
            && Array.isArray(RulesLocationData?.data?.locationListRL)
        ) {
            setLocationListRl(RulesLocationData?.data?.locationListRL);
        } else if (
            RulesLocationData?.data?.locationTraitRL
            && Array.isArray(RulesLocationData?.data?.locationTraitRL)
        ) {
            setLocationTraitRl(RulesLocationData?.data?.locationTraitRL);
        }
    }, [RulesLocationData?.data]);

    /* 
    ***********************************
    *****  ON BLUR FUNCTIONALITY  ***** 
    ***********************************
    */
    if (editAQCheck && editAQ.length > 0) {
        itmDData.map(obj => {
            if (obj.SOURCE_ITEM === editAQ[0].SOURCE_ITEM && obj.DIFF_ID === editAQ[0].DIFF_ID) {
                obj.ALLOC_QTY = AllocQtyData[0]
                obj.REMAIN_QTY = obj.AVAIL_QTY - AllocQtyData[0]

            }
        })
        setItmDData(itmDData)
        srcFltrItmD.map(obj => {
            if (obj.SOURCE_ITEM === editAQ[0].SOURCE_ITEM && obj.DIFF_ID === editAQ[0].DIFF_ID) {
                obj.ALLOC_QTY = AllocQtyData[0]
            }
        })
        setsrcFltrItmD(srcFltrItmD);

        itmWHData.map(obj => {
            if (obj.SOURCE_ITEM === editAQ[0].SOURCE_ITEM && obj.DIFF_ID === editAQ[0].DIFF_ID && obj.WH_ID === editAQ[0].WH_ID) {
                obj.ALLOC_QTY = AllocQtyData[1]
            }
        })
        setItmWHData(itmWHData);

        filtrdItemWHData.filter(obj => {
            if (obj.SOURCE_ITEM === editAQ[0].SOURCE_ITEM && obj.DIFF_ID === editAQ[0].DIFF_ID && obj.WH_ID === editAQ[0].WH_ID) {
                obj.ALLOC_QTY = AllocQtyData[1]
                obj.REMAIN_QTY = obj.AVAIL_QTY - AllocQtyData[1]
            }
        })
        setfiltrdItemWHData(filtrdItemWHData);

        locGrpData.map(obj => {
            if (obj.SOURCE_ITEM === editAQ[0].SOURCE_ITEM && obj.DIFF_ID === editAQ[0].DIFF_ID && obj.LOCATION_ID === editAQ[0].LOCATION_ID) {
                obj.ALLOC_QTY = AllocQtyData[2]
            }
        })
        setLocGrpData(locGrpData);

        filtrdLocGrpData.map(obj => {
            if (obj.SOURCE_ITEM === editAQ[0].SOURCE_ITEM && obj.DIFF_ID === editAQ[0].DIFF_ID && obj.LOCATION_ID === editAQ[0].LOCATION_ID) {
                obj.ALLOC_QTY = AllocQtyData[2]
            }
        })
        setfiltrdLocGrpData(filtrdLocGrpData);

        srcFltrLocGrp.map(obj => {
            if (obj.SOURCE_ITEM === editAQ[0].SOURCE_ITEM && obj.DIFF_ID === editAQ[0].DIFF_ID && obj.LOCATION_ID === editAQ[0].LOCATION_ID) {
                obj.ALLOC_QTY = AllocQtyData[2]
            }
        })


        var totalAllocGrid1 = 0;
        var totalAvailGrid1 = 0;
        var totalAllocGrid2 = 0;
        var totalCalcGrid2 = 0;
        itmDData.map(obj => {
            totalAllocGrid1 = totalAllocGrid1 + obj.ALLOC_QTY;
            totalAvailGrid1 = totalAvailGrid1 + obj.AVAIL_QTY;
        });
        filtrdLocGrpData.map(obj => {
            totalAllocGrid2 = totalAllocGrid2 + obj.ALLOC_QTY;
            totalCalcGrid2 = totalCalcGrid2 + obj.CALC_QTY;
        });
        setTotalGrd1([totalAvailGrid1, totalAllocGrid1]);
        setTotalGrd2([totalCalcGrid2, totalAllocGrid2]);

        console.log("editAQ:: \n", itmDData, '\n', filtrdLocGrpData, selectedRow);
        setsrcFltrLocGrp(srcFltrLocGrp);
        setEditAQCheck(false);
        setEditAQ([]);
        setLoadCheck(false);
        if (closeOnBlur === "OK") {
            setCloseOnBlur("");
            handleOk();
            okButtonClicked = false; // Reset the flag after handling the OK button click
        }
    }

    const SearchHeader = () => (
        <Box
            component="fieldset"
            display="flex"
            sx={{
                backgroundColor: "",
                height: "auto",
                // width: "100%",
                width: "calc(93vw - 0px)",
                borderRadius: 1,

                boxShadow: 2, border: 0,
                borderBottom: 3,
                border: "1px solid lightgrey",
                // width: "100%",
            }}
        >

            <legend style={{ fontWeight: "bold", color: "#191970" }}>Header</legend>

            <div className={AllocDetailsClasses.header_container}>
                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Allocation ID</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            value={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_NO : null}
                            sx={{
                                margin: "0px 0px 2px 2px", //height:"30px",
                                width: "100px",
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                },
                                // borderRadius: "5px",
                                // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                            }}
                            // id="outlined-disabled"
                            name="ALLOC_NO"
                            placeholder="ALLOC_NO"
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
                            id="outlined-disabled"
                            name="ALLOC_DESC"
                            placeholder="ALLOC_DESC"
                            //   value={searchHeaderData.ALLOC_DESC}
                            // value={allocDetails[0].ALLOC_DESC}
                            // defaultValue={allocDetails[0].ALLOC_DESC}
                            // InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                            // inputProps={{
                            //     maxLength: 100, sx: { backgroundColor: '#fff' },
                            // }}
                            InputProps={{
                                endAdornment: <SearchButtonTrend desc={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_DESC : null} />,
                                style: {
                                    fontSize: 12,// backgroundColor: "white",
                                    backgroundColor: "#f0f0f0",
                                },
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
                            // value={allocDetails[0].CONTEXT}
                            // defaultValue={allocDetails[0].CONTEXT}
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

                {/* {allocDetails[0].CONTEXT === "Promotion" ?
                    [ */}
                {/* <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Promotion</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
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
                            placeholder="PROMOTION"
                            // value={allocDetails[0].PROMOTION}
                            // defaultValue={allocDetails[0].PROMOTION}
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
                </div> */}
                {/* ] : null} */}


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
                            // value={allocDetails[0].ALLOC_LEVEL}
                            // defaultValue={allocDetails[0].ALLOC_LEVEL}
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
                            // value={allocDetails[0].ALLOC_LEVEL}
                            // defaultValue={allocDetails[0].ALLOC_LEVEL}
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
                            value={alloc_Dtls.length > 0 ? alloc_Dtls[0].STATUS : null}
                            size="small"
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
                            // value={allocDetails[0].STATUS}
                            // defaultValue={allocDetails[0].STATUS}
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
                            // value={allocDetails[0].ALLOC_TYPE}
                            // defaultValue={allocDetails[0].ALLOC_TYPE}
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
                            size="small"
                            value={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOCATOR : null}
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
                            // value={allocDetails[0].ALLOCATOR}
                            // defaultValue={allocDetails[0].ALLOCATOR}
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
    const SIZEPSCREEN = () => (
        <Box
            component="fieldset"
            display="flex" justifyContent={"space-between"}
            sx={{
                height: "auto",
                marginLeft: "0px",
                marginTop: "10px",
                padding: "0px 4px 10px 7px",
                //backgroundColor: "#F5F5F5",
                backgroundColor: "white",
                borderRadius: 1,
                width: "100%",
                //width: "calc(45.5vw - 0px)",
                //width:"",
                boxShadow: 2, border: 0,
                borderBottom: 3,
            }}
        >

            <div className={AllocDetailsClasses.header_container}>
                <div className={AllocDetailsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Location</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            //value={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_NO : null}
                            sx={{
                                margin: "0px 0px 2px 2px",
                                width: "180px",
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
                            name="LOCATION"
                            placeholder="LOCATION"
                            value={spHeaderData.length > 0 ? spHeaderData[0].LOCATION_ID : ""}
                            // value={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
                            // defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
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
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Item</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            // value={alloc_Dtls.length > 0 ? alloc_Dtls[0].CONTEXT : null}
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
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
                            value={spHeaderData.length > 0 ? spHeaderData[0].SOURCE_ITEM : ""}
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
                            Item Desc</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            //value={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_DESC : null}
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
                            name="ITEM_DESC"
                            placeholder="ITEM_DESC"
                            value={spHeaderData.length > 0 ? spHeaderData[0].SOURCE_ITEM_DESC : ""}
                            InputProps={{
                                endAdornment: <SearchButtonTrend desc={spHeaderData.length > 0 ? spHeaderData[0].SOURCE_ITEM_DESC : ""} />,
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
                            Diff ID</InputLabel>
                    </div>
                    <div className={AllocDetailsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            value={spHeaderData.length > 0 ? spHeaderData[0].DIFF_ID : ""}
                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
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
                            name="DIFF_ID"
                            placeholder="DIFF_ID"
                            // value={allocDetails[0].ALLOC_LEVEL}
                            // defaultValue={allocDetails[0].ALLOC_LEVEL}
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
    /* 
   ***************************
   *****  INLINE FILTER  ***** 
   ***************************
   */
    const gridFilterLocGrp = (e) => {
        setInputVal((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const gridFilterLocGrp1 = (e) => {
        setInputValLoc((prev) => ({
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
                    const temp = srcFltrLocGrp.filter((props) => (String(props[Object.keys(inputVal)[i]]).toLowerCase()) === (String(temp_dict[Object.keys(inputVal)[i]]).toLowerCase()))
                    setfiltrdLocGrpData(temp);
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
                    setfiltrdLocGrpData(filteredTable);
                }
            }
        } else if (Object.keys(inputVal).length === 0) {
            setfiltrdLocGrpData(srcFltrLocGrp);
        }
        // ITEM DETAILS
        if (Object.keys(inputValD).length > 0 && adData.length === 0) {
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
                    setItmDData(temp);
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
                    setItmDData(filteredTable);
                }

            }
        } else if (Object.keys(inputValD).length === 0 && adData.length === 0) {
            setItmDData(srcFltrItmD);
        }

        if (Object.keys(inputValLoc).length > 0) {
            
            for (let i = 0; i < Object.keys(inputValLoc).length; i++) {
                var temp_dict = {}
                for (const key in inputValLoc) {
                    if (inputValLoc[key] === '') {
                        delete inputValLoc[key];
                    }
                }
                if (inputValLoc.hasOwnProperty('GROUP_ID') && String(inputValLoc.GROUP_ID).length > 0) {
                    const temp1 = locationListRL.some(obj => parseInt(obj.LOC_LIST) === parseInt(inputValLoc.GROUP_ID))
                    const temp = srcFltrLocGrp.filter((props) =>
                        (parseInt(props.GROUP_ID)) === (parseInt(inputValLoc.GROUP_ID))
                    )
                    if (temp1) { setfiltrdLocGrpData(temp); } else { setfiltrdLocGrpData([]) }
                }
                if (inputValLoc.hasOwnProperty('GROUP_DESC') && String(inputValLoc.GROUP_DESC).length > 0) {
                    const temp1 = locationTraitRL.some(obj => parseInt(obj.LOC_TRAIT) === parseInt(inputValLoc.GROUP_DESC))
                    const temp = srcFltrLocGrp.filter((props) =>
                        (parseInt(props.GROUP_ID)) === (parseInt(inputValLoc.GROUP_DESC))
                    )
                    if (temp1) { setfiltrdLocGrpData(temp); } else { setfiltrdLocGrpData([]) }
                }
            }
        } else if (Object.keys(inputValLoc).length === 0 && Object.keys(inputVal).length === 0 ) {
            
            setfiltrdLocGrpData(srcFltrLocGrp);
        }

    }, [inputVal, inputValD, inputValLoc]);

    /* 
    ***************************
    *****  TABLE HEADER   ***** 
    ***************************
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
                    <TableRow className={AllocDetailsClasses.TitleRow}>


                        {ItemDetailsHeader.map((headCell) => (ManageHeaderDataItemDtl.includes(headCell.id) &&
                            <StyledTableCell
                                key={headCell.id}
                                // className={AllocDetailsClasses.TableCell}
                                size="small"
                                sortDirection={orderBy1 === headCell.id ? order1 : false}
                                style={{
                                    whiteSpace: "nowrap", padding: "0px", margin: "0px", paddingLeft: "3px",
                                    width: headCell.width,
                                    maxWidth: headCell.maxWidth,
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy1 === headCell.id}
                                    direction={orderBy1 === headCell.id ? order1 : "asc"}
                                    onClick={createSortHandler(headCell.id)}
                                    sx={{
                                        "&.MuiTableSortLabel-root": {
                                            color: "white",
                                            fontSize: "0.775rem",
                                        },
                                        "&.MuiTableSortLabel-root:hover": {
                                            color: "#fff",
                                            padding: "0px"
                                        },
                                        "&.Mui-active": {
                                            color: "#fff",
                                        },
                                        "& .MuiTableSortLabel-icon": {
                                            color: "#fff !important",
                                            marginLeft: "0px",
                                            // border:"1px solid red"
                                        },
                                        padding: "0px", margin: "0px"
                                    }}
                                >
                                    {headCell.label}
                                    {orderBy1 === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden} >
                                            {order1 === "desc"
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
                                    {headCell.label === "Sku" ? (alloc_Dtls.length > 0 && alloc_Dtls[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku")
                                        : headCell.label}
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
                    sx={{ position: "sticky", top: -1, backgroundColor: "white" }}
                >
                    <TableRow className={AllocDetailsClasses.TitleRow} >
                        <StyledTableCell padding="checkbox" style={{
                            whiteSpace: "nowrap", padding: "0px",
                        }}
                        >
                            <Checkbox
                                color="primary"
                                size="small"
                                indeterminate={selected.length > 0 && selected.length < filtrdLocGrpData.length}
                                checked={filtrdLocGrpData.length > 0 && selected.length === filtrdLocGrpData.length}
                                disabled={ApproveFreeseCheck}
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


                        {LocGroupItemDetailsHeader.map((headCell) => (ManageHeaderDataLocGroup.includes(headCell.id) &&
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
    function SizeProfileHead(props) {
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


                        {SPHeader.map((headCell) => (

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

    function EnhancedTableToolbar(props) {
        const { numSelected } = props;
        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(filtrdLocGrpData.length > 0 &&
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
                {filtrdLocGrpData.length > 0 && (
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
                        Rows {selected.length} of {filtrdLocGrpData.length}
                    </Typography>
                )}
            </Toolbar>
        );
    }
    /*
    #########################################
    ######### CHECKBOX FUNCTIONALITY ########
    #########################################
    */
    const handleSelectAllClick = (event) => {
        if (event.target.checked && selected.length === 0) {
            const newSelected = filtrdLocGrpData.map((n) => n.LOCATION_ID);
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
    /*
    ###################################
    ######### FILTER ON SELECT ########
    ###################################
    */
    useEffect(() => {
        if (fltrTest.length > 0 && alloc_Dtls.length > 0) {
            if (alloc_Dtls[0].ALLOC_CRITERIA !== "F") {
                setfiltrdLocGrpData(fltrTest);
                setsrcFltrLocGrp(fltrTest)
                setFltrTest([]);
            }
        }
    }, [fltrTest])

    let isClickInProgress = false;

    const handleItemWH = (item) => {
        if (isClickInProgress) {
            return;
        }

        isClickInProgress = true;
        const filteredItemWHData = itmWHData.filter(obj => (obj.SOURCE_ITEM === item.SOURCE_ITEM && obj.DIFF_ID === item.DIFF_ID));
        const filteredLocGroupData = locGrpData.filter(obj =>
        (
            obj.WH_ID === filteredItemWHData[0].WH_ID
            && obj.SOURCE_ITEM === filteredItemWHData[0].SOURCE_ITEM
            && obj.DIFF_ID === filteredItemWHData[0].DIFF_ID
        ));
        const filteredLocGroupData1 = locGrpData.filter(obj =>
        (
            obj.DIFF_ID === filteredItemWHData[0].DIFF_ID
            && obj.SOURCE_ITEM === filteredItemWHData[0].SOURCE_ITEM
            && obj.DIFF_ID === filteredItemWHData[0].DIFF_ID
        ));
        let UniqfltrdLocGrpData = alloc_Dtls[0].ALLOC_CRITERIA === "F" ?
            (filteredLocGroupData1.length > 0
                ? [...new Map(filteredLocGroupData1.map((item) => [item["LOCATION_ID"], item])).values()]
                : []) :
            (filteredLocGroupData.length > 0
                ? [...new Map(filteredLocGroupData.map((item) => [item["LOCATION_ID"], item])).values()]
                : []);
        setFltrTest(UniqfltrdLocGrpData);

        if (alloc_Dtls[0].ALLOC_CRITERIA !== "F") {
            setfiltrdLocGrpData([]);
            setsrcFltrLocGrp([]);
        }
        setSizeDData([filteredItemWHData[0]]);
        setSelectedRow(UniqfltrdLocGrpData.length > 0 ? UniqfltrdLocGrpData[0].LOCATION_ID : null);
        setfiltrdLocGrpData(UniqfltrdLocGrpData);
        setfiltrdItemWHData(filteredItemWHData);
        var totalAllocGrid2 = 0;
        var totalCalcGrid2 = 0;

        UniqfltrdLocGrpData.map(obj => {
            if (obj.ALLOC_QTY !== "") {
                totalAllocGrid2 = totalAllocGrid2 + obj.ALLOC_QTY;
            }
            if (obj.CALC_QTY !== "") {
                totalCalcGrid2 = totalCalcGrid2 + obj.CALC_QTY;
            }
        });
        setTotalGrd2([totalCalcGrid2, totalAllocGrid2]);
        isClickInProgress = false;
    }

    let isClickInProgress1 = false;

    const handleLocGroup = (wh, item) => {
        if (isClickInProgress1) {
            return;
        }
        isClickInProgress1 = true;
        const filteredLocGroupData = locGrpData.filter(obj => (obj.WH_ID === wh && obj.SOURCE_ITEM === item));
        const filteredLocGroupData1 = locGrpData.filter(obj => (obj.DIFF_ID === wh && obj.SOURCE_ITEM === item));
        let UniqfltrdLocGrpData = alloc_Dtls[0].ALLOC_CRITERIA === "F" ?
            (filteredLocGroupData1.length > 0
                ? [...new Map(filteredLocGroupData1.map((item) => [item["LOCATION_ID"], item])).values()]
                : []) :
            (filteredLocGroupData.length > 0
                ? [...new Map(filteredLocGroupData.map((item) => [item["LOCATION_ID"], item])).values()]
                : []);

        setFltrTest(UniqfltrdLocGrpData);
        if (alloc_Dtls[0].ALLOC_CRITERIA !== "F") {
            setSelectedRow(UniqfltrdLocGrpData.length > 0 ? UniqfltrdLocGrpData[0].LOCATION_ID : null);
            setfiltrdLocGrpData([]);
            setsrcFltrLocGrp([]);
        }
        var totalAllocGrid2 = 0;
        var totalCalcGrid2 = 0;

        UniqfltrdLocGrpData.map(obj => {
            if (obj.ALLOC_QTY !== "") {
                totalAllocGrid2 = totalAllocGrid2 + obj.ALLOC_QTY;
            }
            if (obj.CALC_QTY !== "") {
                totalCalcGrid2 = totalCalcGrid2 + obj.CALC_QTY;
            }
        });
        setTotalGrd2([totalCalcGrid2, totalAllocGrid2]);
        isClickInProgress1 = false;
    }

    /*
    #########################################
    ######### SORTING FUNCTIONALITY #########
    #########################################
    */
    useEffect(() => {
        if (sortCheck1) {
            if (order1 === "asc" && adData.length === 0) {
                const sortedData = stableSort(itmDData, getComparator("asc", sortValue1));
                setItmDData(sortedData);
            }
            if (order1 === "desc" && adData.length === 0) {
                const sortedData = stableSort(itmDData, getComparator("desc", sortValue1));
                setItmDData(sortedData);
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
                const sortedData = stableSort(filtrdLocGrpData, getComparator("asc", sortValue3));
                setfiltrdLocGrpData(sortedData);
            }
            if (order === "desc") {
                const sortedData = stableSort(filtrdLocGrpData, getComparator("desc", sortValue3));
                setfiltrdLocGrpData(sortedData);
            }
            setSortCheck3(false)
        }
    }, [filtrdItemWHData, order2, orderBy2, itmDData, order1, orderBy1, filtrdLocGrpData, order, orderBy]);


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
        if (orderBy === "#OF_SKUS") {
            return order === 'desc'
                ? (a, b) => descendingComparator(a, b, "SKU_COUNT")
                : (a, b) => -descendingComparator(a, b, "SKU_COUNT");
        }
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
        if (AllocDetailsData?.data?.NNData && Array.isArray(AllocDetailsData?.data?.NNData)
            && (AllocDetailsData?.data?.NNData).length > 0) {
            const temp = AllocDetailsData?.data?.NNData[0].filter(obj =>
                filtrdItemWHData[0].SOURCE_ITEM === obj.SOURCE_ITEM && obj.WH_ID === filtrdItemWHData[0].WH_ID);
            setCLocData(temp.filter(obj => selected.includes(obj.LOCATION_ID)).sort((a, b) => (parseInt(a['LOCATION_ID']) > parseInt(b['LOCATION_ID'])) ? 1 : -1));
            if (AllocDetailsData?.data?.NNData[1] === true) {
                setCUpdateChk(true);
            } else {
                setCUpdateChk(false);
            }
            AllocDetailsData.data.NNData = [];
        }
        if (AllocDetailsData?.data?.CopyADData || AllocDetailsData?.data?.allocdtlval) {
            if ((AllocDetailsData?.data?.allocdtlval?.status) === 500) {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl(String(AllocDetailsData?.data?.allocdtlval?.message));
                setLoadCheck(false);
            } else if ((AllocDetailsData?.data?.CopyADData?.status) === 500) {
                setOpenDialogAllocDtl(true);
                setDialogDataAllocDtl(String(AllocDetailsData?.data?.CopyADData?.message));
                setLoadCheck(false);
            }
        }
        if (AllocDetailsData?.data?.NNData?.status === 500) {
            setOpenDialogAllocDtl(true);
            setDialogDataAllocDtl(String(AllocDetailsData?.data?.NNData?.message));
            setLoadCheck(false);
        }

    }, [AllocDetailsData?.data]);

    useEffect(() => {

        if (copyRData.length > 0) {
            const res = copyRData
            if (res.length > 0) {
                /* CHANGE DATA IN GRIDS */
                for (let i = 0; i < res.length; i++) {
                    itmDData.map(obj => {
                        if (obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM && obj.DIFF_ID === cLocData[i].DIFF_ID) {
                            obj.ALLOC_QTY = res[i][0];
                            obj.REMAIN_QTY = obj.AVAIL_QTY - res[i][0];
                        }
                    })
                    setItmDData(itmDData);
                    srcFltrItmD.map(obj => {
                        if (obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM && obj.DIFF_ID === cLocData[i].DIFF_ID) {
                            obj.ALLOC_QTY = res[i][0];
                            obj.REMAIN_QTY = obj.AVAIL_QTY - res[i][0];
                        }
                    })
                    setsrcFltrItmD(srcFltrItmD);

                    itmWHData.map(obj => {
                        if (obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM && obj.DIFF_ID === cLocData[i].DIFF_ID && obj.WH_ID === cLocData[i].WH_ID) {
                            obj.ALLOC_QTY = res[i][1];
                            obj.REMAIN_QTY = obj.AVAIL_QTY - res[i][1];
                        }
                    })
                    setItmWHData(itmWHData);

                    filtrdItemWHData.filter(obj => {
                        if (obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM && obj.DIFF_ID === cLocData[i].DIFF_ID && obj.WH_ID === cLocData[i].WH_ID) {
                            obj.ALLOC_QTY = res[i][1]
                            obj.REMAIN_QTY = obj.AVAIL_QTY - res[i][1]
                        }
                    })
                    setfiltrdItemWHData(filtrdItemWHData);

                    // LOC/ GROUP DETAILS DATA
                    locGrpData.map(obj => {
                        if (obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM && obj.DIFF_ID === cLocData[i].DIFF_ID && obj.LOCATION_ID === cLocData[i].LOCATION_ID) {
                            obj.ALLOC_QTY = res[i][2]
                            obj.VARIANCE_PCT = res[i][3]
                        }
                    })
                    setLocGrpData(locGrpData);

                    filtrdLocGrpData.map(obj => {
                        if (obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM && obj.DIFF_ID === cLocData[i].DIFF_ID && obj.LOCATION_ID === cLocData[i].LOCATION_ID) {
                            obj.ALLOC_QTY = res[i][2]
                            obj.VARIANCE_PCT = res[i][3]
                        }
                    })
                    setfiltrdLocGrpData(filtrdLocGrpData);

                    srcFltrLocGrp.map(obj => {
                        if (obj.SOURCE_ITEM === cLocData[i].SOURCE_ITEM && obj.DIFF_ID === cLocData[i].DIFF_ID && obj.LOCATION_ID === cLocData[i].LOCATION_ID) {
                            obj.ALLOC_QTY = res[i][2]
                            obj.VARIANCE_PCT = res[i][3]
                        }
                    });
                    setsrcFltrLocGrp(srcFltrLocGrp);
                    var totalAllocGrid1 = 0;
                    var totalAvailGrid1 = 0;
                    var totalAllocGrid2 = 0;
                    var totalCalcGrid2 = 0;
                    itmDData.map(obj => {
                        if (obj.ALLOC_QTY !== "") {
                            totalAllocGrid1 = totalAllocGrid1 + obj.ALLOC_QTY;
                        }
                        if (obj.AVAIL_QTY !== "") {
                            totalAvailGrid1 = totalAvailGrid1 + obj.AVAIL_QTY;
                        }
                    });
                    filtrdLocGrpData.map(obj => {
                        if (obj.ALLOC_QTY !== "") {
                            totalAllocGrid2 = totalAllocGrid2 + obj.ALLOC_QTY;
                        }
                        if (obj.CALC_QTY !== "") {
                            totalCalcGrid2 = totalCalcGrid2 + obj.CALC_QTY;
                        }
                    });
                    setTotalGrd1([totalAvailGrid1, totalAllocGrid1]);
                    setTotalGrd2([totalCalcGrid2, totalAllocGrid2]);
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
                for (let i = 0; i < cLocData.length; i++) {
                    if (cLocData[i] !== 0) {
                        cLocData[i].ALLOC_QTY = copyValue["ALLOC_QTY"];
                        try {
                            const url = CONFIG.BASE_URL + "/copyDownAD/";
                            const response = await axios.post(url, [cLocData[i]]);
                            res.push(response.data);
                        } catch (error) {
                            setOpenDialogAllocDtl(true);
                            setDialogDataAllocDtl(String(error));
                            setLoadCheck(false);
                        }
                    }
                }
                setCopyRData(res)
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
            /*
            const editData = filtrdLocGrpData.filter((item) => {
                return selected.some((val) => {
                    return item.LOCATION_ID === val;
                });
            });
            const copyUpdate = editData.map(item => {
                Object.assign(item, copyValue);
                return item;
            })
            copyUpdate.map((obj) => {
                if (Object.keys(obj).includes("LOCATION_ID")) {
                    const temp = filtrdLocGrpData.filter((obj1) =>
                        obj1["LOCATION_ID"] === obj["LOCATION_ID"]
                    )
                }
            })
            */

            if (copyValue.ALLOC_QTY >= 0) {
                const AvailQty = (filtrdItemWHData.filter(obj => filtrdLocGrpData[0].SOURCE_ITEM === obj.SOURCE_ITEM && filtrdLocGrpData[0].WH_ID === obj.WH_ID))[0].AVAIL_QTY;
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
            // setCountRow(0);
            // setLoadCheck(true);
            // dispatch(postFETCHNNRequest([{ "ALLOC_NO": alloc_Dtls[0].ALLOC_NO }]));
        }

        //setfiltrdLocGrpData(filtrdLocGrpData)
        setLockCheck(false);
    }
    const eraseValWeight = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = filtrdLocGrpData.filter((item) => {
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
                    const temp = filtrdLocGrpData.filter((obj1) =>
                        obj1["LOCATION_ID"] === obj["LOCATION_ID"]

                    )
                }
            })
        }


        setfiltrdLocGrpData(filtrdLocGrpData);
        setSampleVal([]);
    }

    const onTableCellChange = (e, value, name) => {

        if (Object.is(e, null) === false) {
            if (name === "ALLOC_QTY") {
                filtrdLocGrpData.map((row) => {
                    if (row.LOCATION_ID === String(value)) {
                        Object.assign(row, { "ALLOC_QTY": e.target.value });
                        return row;
                    }
                });
            }
            if (name === "SPREAD_QTY") {
                filtrdItemWHData.map(row => {

                })
            }
        }
        setSampleVal([]);
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

    const onSpreadQtyChange = (e, value1, value2, name) => {
        console.log('spread1', e, value1, value2, name)
        if (Object.is(e, null) === false) {

            if (name === "SPREAD_QTY") {
                filtrdItemWHData.map(row => {
                    if (row.WH_ID === String(value1) && row.SOURCE_ITEM === String(value2)) {
                        console.log("spread 2 ", e.target.value, typeof e.target.value)
                        if (e.target.value.length !== 0) {
                            if (!isNaN(e.target.value) && parseFloat(e.target.value) >= 1) {
                                var remainQtyRow = itmDData.filter(obj => obj.SOURCE_ITEM === row.SOURCE_ITEM && obj.DIFF_ID === row.DIFF_ID)
                                console.log("spread 3 ", remainQtyRow[0].REMAIN_QTY);
                                if (parseFloat(e.target.value) > remainQtyRow[0].REMAIN_QTY) {
                                    setOpenDialogAllocDtl(true);
                                    setDialogDataAllocDtl("Spread qty cannot be greater than the available qty.");
                                } else {
                                    Object.assign(row, { "SPREAD_QTY": e.target.value });
                                }
                            } else {
                                setOpenDialogAllocDtl(true);
                                setDialogDataAllocDtl("Invalid Value", "Please enter a valid quantity greater than or equal to 1", "error");
                            }
                        }
                        if (e.target.value.length === 0) {
                            Object.assign(row, { "SPREAD_QTY": e.target.value });
                        }
                        return row;
                    }
                })
            }
        }
        setSampleVal([]);
    }


    const resetFilter = () => {
        setInputVal([]);
        if (inputVal.length === 0) {
            setfiltrdLocGrpData(filtrdLocGrpData);
            setSampleVal([]);
            setCopyValue({});
            setInputVal([]);
        } else {
            setfiltrdLocGrpData(filtrdLocGrpData);
            setSampleVal([]);
            setCopyValue({});
            setInputVal([]);
        }
        setLockCheck(false)
    };
    const handleSpreadLocation = () => {

        if (itmDData.length > 0) {
            const sendAlloc = itmWHData.filter(obj => obj.SPREAD_QTY.length > 0)

            if (sendAlloc.length > 0) {

                dispatch(postSpreadAllocRequest([{ ...allocNoData, "UPDATE": sendAlloc }]));
                setIsLoading(true);
            }
        }
    }
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
    const OpenSizePro = () => {
        setSProfile(true);
        setLoadCheck(true);
        const temp = filtrdLocGrpData.filter(obj => selectedRow === obj.LOCATION_ID)
        setSPHeaderdata(temp);
        // setIsLoading(true);
        // // setTimeout(() => {
        // //   setIsLoading(false);
        // // }, 2000);
        // if (callMode === "VIEW" && allocDetails.length > 0) {
        //   dispatch(postErrReportRequest([{ "ALLOC_NO": callData[0].ALLOC_NO }]));//asy
        // } else {
        dispatch(postSizeProfRequest(temp));
        // }
    };
    const handleRowClick = (rowId) => {
        setSelectedRow(rowId);
    };

    const HandleSizeDetails = (e) => {
        setsizeDetailsScreen(true)
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


    return (
        <Box className={AllocDetailsClasses.maindiv} sx={{ width: "100%" }}>
            {sizeDetailsScreen ? <div>
                <SizeDetails
                    ApproveFreeseCheck={ApproveFreeseCheck}
                    allocNoData={allocNoData}
                    setTab={setTab}
                    setOpenDialog={setOpenDialogAllocDtl}
                    setDialogData={setDialogDataAllocDtl}
                    ScreenNameAllocDetails={ScreenNameAllocDetails}
                    sizeDData={sizeDData}
                    setsizeDetailsScreen={setsizeDetailsScreen}
                    setReload={setReload}
                /> </div> :
                <div>
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
                            {/* <div sx={{ display: "flex", flexDirection: "row" }}>
                        <Grid id="top-row" container spacing={0}> */}
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
                                                        '&:hover': {
                                                            backgroundColor: '#3CB371', // Change this to the desired "light maroon" color
                                                        },
                                                    }}
                                                    variant="contained"
                                                    // className={AllocDetailsClasses.textField}
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
                                                        '&:hover': {
                                                            backgroundColor: '#8B0000', // Change this to the desired "light maroon" color
                                                        },
                                                    }}
                                                    variant="contained"
                                                    // className={AllocDetailsClasses.textField}
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
                                        color: "#191970",
                                    }}>
                                        Item Details
                                    </InputLabel>
                                    <Box display="flex" justifyContent="flex-end" sx={{ margin: "1px 7px 1px 0px", paddingRight: "5px" }}>
                                        {/* <Button
                                            autoFocus
                                            variant="contained"
                                            onClick={HandleManageHeaderItemDtl}
                                            sx={{
                                                backgroundColor: "",
                                                padding: "3.5px",
                                                margin: "2px 0px 2px 0px",
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
                                        <TableContainer style={{ maxHeight: 170, width: "calc(100% - 0px)" }} component={Paper}>
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
                                                <TableBody>
                                                    {ManageHeaderDataItemDtl.includes('SOURCE_ITEM') ?
                                                        <TableCell sx={{
                                                            padding: "0px",
                                                        }}>
                                                            <TextField
                                                                name="SOURCE_ITEM"
                                                                onChange={gridFilterD}
                                                                value={Object.keys(inputValD).length > 0 && Object.keys(inputValD).includes("SOURCE_ITEM") > 0 ? inputValD.SOURCE_ITEM : ""}
                                                                placeholder={alloc_Dtls.length > 0 && alloc_Dtls[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku"}
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

                                                <TableBody
                                                // sx={{ height: "auto",border:"2px solid green" }}
                                                >
                                                    {
                                                        itmDData.length > 0 ?
                                                            itmDData.map(row => (

                                                                <TableRow
                                                                    style={filtrdItemWHData.length > 0 && filtrdItemWHData[0].SOURCE_ITEM === row.SOURCE_ITEM && filtrdItemWHData[0].DIFF_ID === row.DIFF_ID ? { background: "#CDF0FF" } : null}
                                                                    onClick={() => { handleItemWH(row) }}
                                                                >
                                                                    {ManageHeaderDataItemDtl.includes('SOURCE_ITEM') ? <TableCell align="right"
                                                                        sx={//filtrdItemWHData[0].SOURCE_ITEM===row.SOURCE_ITEM?{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "22px",bgcolor:"yellowgreen" }:
                                                                            { fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", height: "22px" }}>{row.SOURCE_ITEM}</TableCell> : null}
                                                                    {ManageHeaderDataItemDtl.includes('SOURCE_ITEM_DESC') ? <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
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
                                                                    {ManageHeaderDataItemDtl.includes('DIFF_ID') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} >{row.DIFF_ID}</TableCell> : null}
                                                                    {ManageHeaderDataItemDtl.includes('GROSS_NEED') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{ruleType !== "M" ? row.GROSS_NEED : ""}</TableCell> : null}
                                                                    {ManageHeaderDataItemDtl.includes('STOCK_ON_HAND') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.STOCK_ON_HAND}</TableCell> : null}
                                                                    {ManageHeaderDataItemDtl.includes('FUTURE_FULFILL_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.FUTURE_FULFILL_QTY}</TableCell> : null}
                                                                    {ManageHeaderDataItemDtl.includes('NET_NEED') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{ruleType !== "M" ? row.NET_NEED : ""}</TableCell> : null}
                                                                    {ManageHeaderDataItemDtl.includes('CALC_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.CALC_QTY}</TableCell> : null}
                                                                    {ManageHeaderDataItemDtl.includes('AVAIL_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.AVAIL_QTY}</TableCell> : null}
                                                                    {ManageHeaderDataItemDtl.includes('ALLOC_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.ALLOC_QTY}</TableCell> : null}
                                                                    {ManageHeaderDataItemDtl.includes('REMAIN_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.REMAIN_QTY}</TableCell> : null}

                                                                </TableRow >
                                                            ))
                                                            : false
                                                    }

                                                    {itmDData.length < 5 ?
                                                        [...Array(5 - (itmDData.length)).keys()].map(val => (
                                                            <TableRow  >
                                                                {ManageHeaderDataItemDtl.map((row, index) => {
                                                                    return (
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", height: "22px" }}></TableCell>)
                                                                })}
                                                                {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "22px" }}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></TableCell>
                                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></TableCell>
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
                                                    <TableRow style={{ background: "#bc8f8f" }} >

                                                        {ManageHeaderDataItemDtl.includes('SOURCE_ITEM') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "22px" }}></WhiteCell> : null}
                                                        {ManageHeaderDataItemDtl.includes('SOURCE_ITEM_DESC') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></WhiteCell> : null}
                                                        {ManageHeaderDataItemDtl.includes('DIFF_ID') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></WhiteCell> : null}
                                                        {ManageHeaderDataItemDtl.includes('GROSS_NEED') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}
                                                        {ManageHeaderDataItemDtl.includes('STOCK_ON_HAND') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}
                                                        {ManageHeaderDataItemDtl.includes('FUTURE_FULFILL_QTY') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}
                                                        {ManageHeaderDataItemDtl.includes('NET_NEED') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}
                                                        {ManageHeaderDataItemDtl.includes('CALC_QTY') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}
                                                        {ManageHeaderDataItemDtl.includes('AVAIL_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{totalGrd1.length > 0 ? totalGrd1[0] : null}</TableCell> : null}
                                                        {ManageHeaderDataItemDtl.includes('ALLOC_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{totalGrd1.length > 0 ? totalGrd1[1] : null}</TableCell> : null}
                                                        {ManageHeaderDataItemDtl.includes('REMAIN_QTY') ? <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}

                                                    </TableRow >

                                                </TableBody>

                                            </Table>

                                        </TableContainer>
                                    </Paper>
                                </div>

                                <Box
                                    sx={{
                                        boxShadow: 3,
                                        borderRadius: 1,
                                        width: "calc(92vw - 0px)",
                                        margin: "5px 0px 0px 5px",
                                        padding: "0px 0px 0px 0px"
                                    }}
                                >
                                    <div className={AllocDetailsClasses.grid_block}>
                                        <Box
                                            display='flex'
                                        >
                                            <InputLabel sx={{
                                                fontWeight: "bold",
                                                fontSize: "14px",
                                                margin: "5px 0px 0px 5px",
                                                display: 'inline',
                                                float: 'left',
                                                color: "#191970",
                                            }}>
                                                Item WH Details</InputLabel>
                                        </Box>
                                    </div>

                                    <div className={AllocDetailsClasses.TableTotalBoby}>
                                        <Box
                                            display="flex"
                                            sx={{
                                                backgroundColor: "",
                                                margin: "5px 0px 2px 0px",
                                                justifyContent: "flex-end",
                                                width: "calc(92vw - 0px)",

                                            }}
                                        >
                                            {/* <div style={{ border: "1px solid red" }}> */}

                                            <div className={AllocDetailsClasses.float_child}>
                                                <Button
                                                    sx={{
                                                        fontSize: "12px",
                                                        backgroundColor: "",
                                                        padding: "5px", fontFamily: "system-ui",
                                                        width: "100%", marginRight: "0px",
                                                        margin: "2px 5px 2px 0px"
                                                        // border:"1px solid red"
                                                        , '&.Mui-disabled': {
                                                            opacity: 0.5,
                                                            backgroundColor: 'DodgerBlue',
                                                            color: '#fff',
                                                        },
                                                    }}
                                                    variant="contained"
                                                    type="submit"
                                                    // onClick={SubmitValueList}
                                                    // startIcon={<ControlPointDuplicateIcon />}
                                                    startIcon={<StormIcon sx={{ marginLeft: "5px" }} />}
                                                    disabled={ApproveFreeseCheck}
                                                    onClick={handleSpreadLocation}
                                                >Spread To All Locations</Button>
                                            </div>
                                            <div className={AllocDetailsClasses.float_child}>
                                                {/* <div style={{ display: "flex", justifyContent: "flex-end" }}> */}
                                                <div
                                                    style={{
                                                        // flex: "1",
                                                        backgroundColor: isSHovered2 ? '#f5f5f5' : 'white',
                                                        borderRadius: '20%', padding: "0px 8px 0px 8px",
                                                        margin: "2px 0px 0px 0px", //border: "1px solid red",
                                                        height: "30px", minHeight: "30px",
                                                    }}
                                                    title="Manage Columns"
                                                    onMouseEnter={handleSEnter2}
                                                    onMouseLeave={handleSLeave2}
                                                >
                                                    <ViewColumnIcon style={{ padding: "0px", backgroundColor: isSHovered2 ? '#f5f5f5' : 'white', marginTop: "2px", color: "DodgerBlue" }} onClick={HandleManageHeaderItemWHDtl} title="Manage Columns" />
                                                </div>
                                                {/* </div> */}
                                            </div>
                                            {/* </div> */}
                                        </Box>
                                    </div>

                                    <div className={AllocDetailsClasses.TableBoby}>
                                        <Paper sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", width: "calc(92vw - 0px)", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
                                            <TableContainer style={{ maxHeight: 120, width: "calc(100% - 0px)" }} component={Paper}>
                                                <Table aria-label="customized table">
                                                    <ItemWHDetailsTableHead
                                                        order2={order2}
                                                        orderBy2={orderBy2}
                                                        onRequestSort={handleRequestSort2}

                                                    />
                                                    <TableBody
                                                    // sx={{ height: "auto",border:"2px solid green" }}
                                                    >
                                                        {
                                                            filtrdItemWHData.length > 0 ?
                                                                filtrdItemWHData.map(row => (
                                                                    <TableRow
                                                                        style={filtrdLocGrpData.length > 0 && filtrdLocGrpData[0].WH_ID === row.WH_ID
                                                                            && filtrdLocGrpData[0].SOURCE_ITEM === row.SOURCE_ITEM ? { background: "#CDF0FF" }
                                                                            : null}
                                                                        onClick={() => {
                                                                            setSizeDData([row]);
                                                                            alloc_Dtls.length > 0 ? (alloc_Dtls[0].ALLOC_CRITERIA === "F" ?
                                                                                handleLocGroup(row.DIFF_ID, row.SOURCE_ITEM) :
                                                                                handleLocGroup(row.WH_ID, row.SOURCE_ITEM)) :
                                                                                handleLocGroup(row.WH_ID, row.SOURCE_ITEM)
                                                                        }}
                                                                    >
                                                                        {ManageHeaderDataItemWHDtl.includes('WH_ID') ?
                                                                            <TableCell align="right" sx={//filtrdLocGrpData.length>0 && filtrdLocGrpData[0].WH_ID===row.WH_ID && filtrdLocGrpData[0].SOURCE_ITEM===row.SOURCE_ITEM?{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" ,bgcolor:"yellowgreen"}:
                                                                                { fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", height: "20px" }}

                                                                            >{row.WH_ID}</TableCell> : null}

                                                                        {ManageHeaderDataItemWHDtl.includes('SOURCE_ITEM') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }}>{row.SOURCE_ITEM}</TableCell> : null}

                                                                        {ManageHeaderDataItemWHDtl.includes('SOURCE_ITEM_DESC') ?
                                                                            <TableCell align="right"
                                                                                // sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}
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
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">
                                                                                {row.DIFF_ID}</TableCell> : null}

                                                                        {ManageHeaderDataItemWHDtl.includes('GROSS_NEED') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">
                                                                                {ruleType !== "M" ? row.GROSS_NEED : ""}</TableCell> : null}

                                                                        {ManageHeaderDataItemWHDtl.includes('STOCK_ON_HAND') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">
                                                                                {row.STOCK_ON_HAND}</TableCell> : null}

                                                                        {ManageHeaderDataItemWHDtl.includes('FUTURE_FULFILL_QTY') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">
                                                                                {row.FUTURE_FULFILL_QTY}</TableCell> : null}

                                                                        {ManageHeaderDataItemWHDtl.includes('NET_NEED') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">
                                                                                {ruleType !== "M" ? row.NET_NEED : ""}</TableCell> : null}

                                                                        {ManageHeaderDataItemWHDtl.includes('CALC_QTY') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">
                                                                                {row.CALC_QTY}</TableCell> : null}

                                                                        {ManageHeaderDataItemWHDtl.includes('AVAIL_QTY') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">
                                                                                {row.AVAIL_QTY}</TableCell> : null}

                                                                        {ManageHeaderDataItemWHDtl.includes('ALLOC_QTY') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">
                                                                                {row.ALLOC_QTY}</TableCell> : null}

                                                                        {ManageHeaderDataItemWHDtl.includes('REMAIN_QTY') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">
                                                                                {row.REMAIN_QTY}</TableCell> : null}

                                                                        {ManageHeaderDataItemWHDtl.includes('SPREAD_QTY') ?
                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "center", padding: 0 }} textAlign="right">
                                                                                <TextField
                                                                                    sx={{
                                                                                        width: "100%",
                                                                                        "& .MuiInputBase-input.Mui-disabled": {
                                                                                            backgroundColor: "#f0f0f0",
                                                                                            borderRadius: "5px",
                                                                                        },
                                                                                    }}
                                                                                    value={row.SPREAD_QTY}
                                                                                    InputProps={{
                                                                                        style: {
                                                                                            fontSize: 12, height: "20px", width: "100%",
                                                                                            // border:"1px solid red"
                                                                                        },
                                                                                    }}
                                                                                    onChange={(e) => onSpreadQtyChange(e, row.WH_ID, row.SOURCE_ITEM, "SPREAD_QTY")}
                                                                                    disabled={ApproveFreeseCheck || (alloc_Dtls.length ? alloc_Dtls[0].ALLOC_CRITERIA === "F" : false)}
                                                                                    inputProps={{
                                                                                        maxLength: 20,
                                                                                        sx: { padding: "0px 0px 0px 5px", height: "20px", width: "100%", backgroundColor: "#fff", textAlign: "left" }
                                                                                    }}
                                                                                />
                                                                            </TableCell> : null}
                                                                    </TableRow>
                                                                ))
                                                                : false
                                                        }


                                                        {filtrdItemWHData.length < 3 ?
                                                            [...Array(3 - (filtrdItemWHData.length)).keys()].map(val => (
                                                                <TableRow  >
                                                                    {ManageHeaderDataItemWHDtl.map((row, index) => {
                                                                        // if (row !== "SPREAD_QTY") {
                                                                        return (

                                                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", height: "20px" }}></TableCell>
                                                                        )
                                                                        // }

                                                                    })}
                                                                    {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "20px" }}></TableCell>
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
                                                                    </TableCell> */}

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
                                        // border: "1px solid lightgrey",
                                        boxShadow: 3,
                                        borderRadius: 1,
                                        width: "calc(92vw - 0px)",
                                        margin: "5px 0px 5px 5px",
                                        padding: "0px 0px 0px 0px"
                                    }}
                                >
                                    <div className={AllocDetailsClasses.TableTotalBoby} display="flex">
                                        <Box
                                            display='flex'
                                        >
                                            <InputLabel sx={{
                                                fontWeight: "bold",
                                                fontSize: "14px",
                                                margin: "5px 0px 0px 5px",
                                                display: 'flex',
                                                float: 'left',
                                                color: "#191970",
                                            }}>
                                                Loc/Group Item Details
                                            </InputLabel>
                                        </Box>

                                        <div>
                                            <Box
                                                display="flex"
                                                sx={{
                                                    backgroundColor: "",
                                                    margin: "0px 0px 0px 5px",
                                                    justifyContent: "flex-end",
                                                    // width: "calc(92vw - 0px)",
                                                    // border:"1px solid red"
                                                }}
                                            >
                                                {/* <div>
                                            <FormControlLabel
                                                size="small"
                                                sx={{
                                                    padding: "0px",
                                                    margin: "0px 0px 0px 18px",
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
                                                        // checked={checked?false:true}
                                                        // onChange={handleChangeSwitch}
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
                                                        // border:"1px solid red"
                                                    }}>
                                                    View By Other Group</InputLabel>}
                                            />
                                        </div> */}

                                                {/* <div> */}
                                                <div className={AllocDetailsClasses.float_child}>
                                                    <Button
                                                        sx={{
                                                            fontSize: "12px",
                                                            backgroundColor: "",
                                                            padding: "5px", fontFamily: "system-ui",
                                                            width: "100px", marginRight: "0px", marginTop: "2px",
                                                            margin: "2px 5px 2px 0px"
                                                            // border:"1px solid red"
                                                            , '&.Mui-disabled': {
                                                                opacity: 0.5,
                                                                backgroundColor: 'DodgerBlue',
                                                                color: '#fff',
                                                            },
                                                        }}
                                                        variant="contained"
                                                        // className={AllocDetailsClasses.textField}
                                                        type="submit"
                                                        onClick={HandleSizeDetails}
                                                        // startIcon={<DoneAllIcon />}
                                                        disabled={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_LEVEL_CODE !== "D" ? true : false : true}
                                                    >
                                                        Size Details</Button>
                                                </div>

                                                <div className={AllocDetailsClasses.float_child}>
                                                    <Button
                                                        sx={{
                                                            fontSize: "12px",
                                                            backgroundColor: "",
                                                            padding: "5px", fontFamily: "system-ui",
                                                            width: "100px", marginLeft: "0px", marginTop: "2px",
                                                            margin: "2px 0px 2px 0px",
                                                            // border:"1px solid red"
                                                            '&.Mui-disabled': {
                                                                opacity: 0.5,
                                                                backgroundColor: 'DodgerBlue',
                                                                color: '#fff',
                                                            },
                                                        }}
                                                        variant="contained"
                                                        // className={AllocDetailsClasses.textField}
                                                        type="submit"
                                                        onClick={OpenSizePro}

                                                        disabled={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_LEVEL_CODE !== "D" ? true : false : true}
                                                    // startIcon={<DoneAllIcon />}
                                                    >
                                                        Size Profile</Button>
                                                </div>
                                                <div className={AllocDetailsClasses.float_child}>
                                                    <div
                                                        style={{
                                                            // flex: "1",
                                                            backgroundColor: isSHovered3 ? '#f5f5f5' : 'white',
                                                            borderRadius: '20%', padding: "0px 8px 0px 8px",
                                                            margin: "2px 0px 0px 0px",// border: "1px solid red",
                                                            height: "30px", minHeight: "30px",
                                                        }}
                                                        title="Manage Columns"
                                                        onMouseEnter={handleSEnter3}
                                                        onMouseLeave={handleSLeave3}
                                                    >
                                                        <ViewColumnIcon style={{ padding: "0px", backgroundColor: isSHovered3 ? '#f5f5f5' : 'white', marginTop: "2px", color: "DodgerBlue" }} onClick={HandleManageHeaderLocGroup} title="Manage Columns" />
                                                    </div>
                                                </div>
                                                {/* </div> */}
                                            </Box>
                                        </div>

                                        <div className={AllocDetailsClasses.TableBoby}>
                                            <Paper sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
                                                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                                <TableContainer style={{ maxHeight: 285, width: "calc(100% - 0px)" }} component={Paper}>
                                                    <Table aria-label="customized table">
                                                        <LocGroupItemDetailsTableHead
                                                            numSelected={selected.length}
                                                            onSelectAllClick={handleSelectAllClick}
                                                            rowCount={filtrdLocGrpData.length}
                                                            onRequestSort={handleRequestSort}
                                                            order={order}
                                                            orderBy={orderBy}
                                                        />
                                                        <TableBody sx={{ position: "sticky" }}>
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

                                                            {ManageHeaderDataLocGroup.includes('GROUP_ID') ?
                                                                <TableCell sx={{
                                                                    padding: "0px",
                                                                }}>
                                                                    <TextField
                                                                        disabled={LockCheck}
                                                                        name="GROUP_ID"
                                                                        onChange={gridFilterLocGrp1}
                                                                        value={Object.keys(inputValLoc).length > 0 && Object.keys(inputValLoc).includes("GROUP_ID") > 0 ? inputValLoc.GROUP_ID : ""}
                                                                        placeholder="Location List"
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
                                                                </TableCell> : null}

                                                            {ManageHeaderDataLocGroup.includes('GROUP_DESC') ?
                                                                <TableCell sx={{
                                                                    padding: "0px",
                                                                }}>
                                                                    <TextField
                                                                        disabled={LockCheck}
                                                                        name="GROUP_DESC"
                                                                        onChange={gridFilterLocGrp1}
                                                                        value={Object.keys(inputValLoc).length > 0 && Object.keys(inputValLoc).includes("GROUP_DESC") > 0 ? inputValLoc.GROUP_DESC : ""}
                                                                        placeholder="Location Attribute"
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
                                                                        placeholder="Def WH"
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
                                                                        placeholder={alloc_Dtls.length > 0 && alloc_Dtls[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku"}
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
                                                                        placeholder="Store Packs Qty"
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
                                                                            // maxLength: 5,
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
                                                                            // maxLength: 5,
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
                                                                            // maxLength: 5,
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
                                                                        placeholder="Net Need"
                                                                        name="NET_NEED"
                                                                        onChange={gridFilterLocGrp}
                                                                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("NET_NEED") > 0 ? inputVal.NET_NEED : ""}
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
                                                                </TableCell> : null}

                                                            {ManageHeaderDataLocGroup.includes('CALC_QTY') ?
                                                                <TableCell sx={{
                                                                    padding: "0px"
                                                                    , height: "auto"
                                                                }}>
                                                                    <TextField
                                                                        disabled={LockCheck}
                                                                        placeholder="Calc Qty"
                                                                        name="CALC_QTY"
                                                                        onChange={gridFilterLocGrp}
                                                                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("CALC_QTY") > 0 ? inputVal.CALC_QTY : ""}
                                                                        autoComplete="off"
                                                                        InputProps={{
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
                                                                            // maxLength: 5,
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
                                                                filtrdLocGrpData.length > 0 ?
                                                                    filtrdLocGrpData.map((row, index) => {
                                                                        const isItemSelected = isSelected(row.LOCATION_ID);
                                                                        const labelId = `enhanced-table-checkbox-${index}`;

                                                                        return (
                                                                            <TableRow
                                                                                hover
                                                                                role="checkbox"
                                                                                aria-checked={isItemSelected}
                                                                                tabIndex={-1}
                                                                                key={row.LOCATION_ID}
                                                                                selected={isItemSelected}
                                                                                ref={tableRef}
                                                                                // onClick={(event) =>
                                                                                //     //handleClick(event, row?.LOCATION_ID)
                                                                                //     //handleRowClick(row.LOCATION_ID);}
                                                                                // }
                                                                                onClick={(event) => handleRowClick(row?.LOCATION_ID)}
                                                                                style={selectedRow === row.LOCATION_ID ? { backgroundColor: "#CDF0FF" } : null}
                                                                                onKeyDown={(e) => {
                                                                                    if (e.key === 'Enter') {
                                                                                        const currentIndex = filtrdLocGrpData.findIndex((r) => r.LOCATION_ID === row.LOCATION_ID);

                                                                                        if (currentIndex < filtrdLocGrpData.length - 1) {
                                                                                            const nextRow = tableRef.current.querySelector(`[data-rowindex="${currentIndex + 1}"]`);
                                                                                            const nextCell = nextRow.querySelector('[name="ALLOC_QTY"] input');

                                                                                            if (nextCell) {
                                                                                                nextCell.focus();
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                                                    <Checkbox size="small" color="primary" //disabled={false} 
                                                                                        onClick={(event) => handleClick(event, row?.LOCATION_ID)}
                                                                                        checked={isItemSelected}
                                                                                        inputProps={{
                                                                                            'aria-labelledby': labelId,
                                                                                        }}
                                                                                        style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                                                                        disabled={ApproveFreeseCheck}
                                                                                    />
                                                                                </TableCell>
                                                                                {ManageHeaderDataLocGroup.includes('LOCATION_ID') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }}>{row.LOCATION_ID}</TableCell> : null}

                                                                                {ManageHeaderDataLocGroup.includes('GROUP_ID') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.GROUP_ID}</TableCell> : null}
                                                                                {ManageHeaderDataLocGroup.includes('GROUP_DESC') ? <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
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
                                                                                {ManageHeaderDataLocGroup.includes('WH_ID') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }}>{row.WH_ID}</TableCell> : null}
                                                                                {ManageHeaderDataLocGroup.includes('SOURCE_ITEM') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} >{row.SOURCE_ITEM}</TableCell> : null}
                                                                                {ManageHeaderDataLocGroup.includes('SOURCE_ITEM_DESC') ? <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
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
                                                                                {ManageHeaderDataLocGroup.includes('DIFF_ID') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.DIFF_ID}</TableCell> : null}
                                                                                {ManageHeaderDataLocGroup.includes('SOM_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.SOM_QTY}</TableCell> : null}
                                                                                {ManageHeaderDataLocGroup.includes('GROSS_NEED') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{ruleType !== "M" ? row.GROSS_NEED : ""}</TableCell> : null}
                                                                                {ManageHeaderDataLocGroup.includes('STOCK_ON_HAND') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.STOCK_ON_HAND}</TableCell> : null}
                                                                                {ManageHeaderDataLocGroup.includes('FUTURE_FULFILL_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.FUTURE_FULFILL_QTY}</TableCell> : null}
                                                                                {ManageHeaderDataLocGroup.includes('NET_NEED') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{ruleType !== "M" ? row.NET_NEED : ""}</TableCell> : null}
                                                                                {ManageHeaderDataLocGroup.includes('CALC_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.CALC_QTY}</TableCell> : null}
                                                                                {ManageHeaderDataLocGroup.includes('ALLOC_QTY') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "center", padding: 0 }} textAlign="right">
                                                                                    <TextField
                                                                                        value={row.ALLOC_QTY}
                                                                                        defaultValue={row.ALLOC_QTY}
                                                                                        name="ALLOC_QTY"
                                                                                        onChange={(e) => onTableCellChange(e, row.LOCATION_ID, "ALLOC_QTY")}
                                                                                        // onKeyDown={(e) => {
                                                                                        //     if (e.key === 'Enter') {
                                                                                        //       const currentRow = e.target.closest('tr');
                                                                                        //       const rowIndex = Array.from(currentRow.parentNode.children).indexOf(currentRow);
                                                                                        //       const nextRow = currentRow.parentNode.children[rowIndex + 1];

                                                                                        //       if (nextRow) {
                                                                                        //         const nextCell = nextRow.querySelector('[name="ALLOC_QTY"] input');

                                                                                        //         if (nextCell) {
                                                                                        //           nextCell.focus();
                                                                                        //         }
                                                                                        //       }
                                                                                        //     }
                                                                                        //   }}
                                                                                        onBlur={() => { handleAllocQtyChange(row) }}
                                                                                        autoComplete="off"
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
                                                                                                fontSize: 12, height: "22px", width: "100%", textAlign: "left"
                                                                                                // border:"1px solid red"
                                                                                            },
                                                                                        }}
                                                                                        disabled={ApproveFreeseCheck ||( alloc_Dtls.length ? alloc_Dtls[0].ALLOC_CRITERIA === "F" : false)}
                                                                                        inputProps={{
                                                                                            maxLength: 20,
                                                                                            sx: { padding: "0px 0px 0px 5px", height: "20px", width: "100%", backgroundColor: "#fff", textAlign: "left" }
                                                                                        }}
                                                                                    />
                                                                                </TableCell> : null}
                                                                                {ManageHeaderDataLocGroup.includes('VARIANCE_PCT') ? <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.VARIANCE_PCT}</TableCell> : null}
                                                                            </TableRow >
                                                                        )
                                                                    }) : false}
                                                            {filtrdLocGrpData.length < 8 ?
                                                                [...Array(8 - (filtrdLocGrpData.length)).keys()].map(val => (
                                                                    <TableRow   >
                                                                        <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                                            <Checkbox size="small" color="primary" disabled={true}
                                                                                style={{ padding: "0px", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                                                                            />
                                                                        </TableCell>
                                                                        {ManageHeaderDataLocGroup.map((row, index) => {
                                                                            return (
                                                                                <TableCell align="right" sx={{ padding: "0px", textAlign: "center", fontSize: "11px" }}></TableCell>)
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
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></TableCell> */}

                                                                    </TableRow >
                                                                )) : false}


                                                            <TableRow style={{ background: "#bc8f8f" }} >
                                                                <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell>
                                                                {ManageHeaderDataLocGroup.includes('LOCATION_ID') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('GROUP_ID') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('GROUP_DESC') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('WH_ID') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('ITEM_PARENT') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('SOURCE_ITEM') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0, height: "22px" }}></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('SOURCE_ITEM_DESC') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('DIFF_ID') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('SOM_QTY') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('GROSS_NEED') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('STOCK_ON_HAND') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('FUTURE_FULFILL_QTY') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('NET_NEED') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('COMP_CALC_QTY') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('CALC_QTY') ?
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{totalGrd2.length > 0 ? totalGrd2[0] : null}</TableCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('ALLOC_QTY') ?
                                                                    <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{totalGrd2.length > 0 ? totalGrd2[1] : null}</TableCell> : null}

                                                                {ManageHeaderDataLocGroup.includes('VARIANCE_PCT') ?
                                                                    <WhiteCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></WhiteCell> : null}

                                                            </TableRow >
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                {selected.length > 0 ? <EnhancedTableToolbar numSelected={selected.length} /> : null}
                                            </Paper>
                                        </div>
                                    </div>
                                </Box>

                            </div >
                        </Box >
                    </div >
                    {/* SIZE PROFILE */}
                    < div >
                        <Dialog open={sProfile}
                            onClose={(event, reason) => {
                                // if (reason !== 'backdropClick') {
                                setSizePData([]);
                                setSProfile(false);
                                //  }
                            }}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                            maxWidth="lg" //fullWidth
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
                                    <SIZEPSCREEN />
                                    <Box
                                        component="fieldset"
                                        display="inline-block"
                                        sx={{
                                            height: "auto",
                                            marginLeft: "0px",
                                            marginTop: "20px",
                                            backgroundColor: "white",
                                            borderRadius: 1,
                                            width: "100%",
                                            boxShadow: 2, border: 0,
                                            borderBottom: 3,
                                        }}
                                    >
                                        <div className={AllocDetailsClasses.TableBoby}>
                                            <Paper sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", width: "calc(100% - 0px)", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}>
                                                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                                <TableContainer style={{
                                                    maxHeight: 250, width: "calc(100% - 0px)"
                                                }} component={Paper}>
                                                    <Table aria-label="customized table">
                                                        <SizeProfileHead />
                                                        <TableBody>

                                                            {sizePdata.length > 0 ?
                                                                sizePdata.map(row => (
                                                                    <TableRow  >
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", height: "20px" }}>{row.ITEM}</TableCell>

                                                                        <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }} >
                                                                            {String(row.ITEM_DESC).length > 0 ?
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
                                                                                </Box> : null}
                                                                        </TableCell>

                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} >{row.CONTRIB_PCT}</TableCell>
                                                                    </TableRow >
                                                                )) : false}
                                                            {sizePdata.length < 10 ?
                                                                [...Array(10 - (sizePdata.length)).keys()].map(val => (
                                                                    <TableRow  >
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", height: "20px" }}></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }}></TableCell>
                                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} ></TableCell>
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
                                        }, fontSize: "12px", margin: "2px 15px 0px 0px",
                                    }}
                                    size='medium'
                                    variant="contained"
                                    type="submit"
                                    onClick={() => {
                                        setSizePData([]);
                                        setSProfile(false)
                                    }}
                                    startIcon={<DoneAllIcon />}
                                >OK</Button>
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
                </div>}

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
        </Box >
    )

};

export default AllocDetails;