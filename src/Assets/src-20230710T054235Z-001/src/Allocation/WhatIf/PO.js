import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import { makeStyles, withStyles } from "@mui/styles";
//import { trnType } from "./transType.js";
// import { errorList } from "./errorType.js";
import { alpha } from "@mui/material/styles";
import swal from '@sweetalert/with-react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Toolbar from "@mui/material/Toolbar";
// import SearchTableData from "../Search";
import { visuallyHidden } from '@mui/utils';
// import { ItemWHDetailsHeader } from "./tableHead";
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import InfoIcon from '@mui/icons-material/Info';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CreateIcon from '@mui/icons-material/Create';
import FormControlLabel from '@mui/material/FormControlLabel';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AnimationIcon from '@mui/icons-material/Animation';
import Checkbox from '@mui/material/Checkbox';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from 'react-draggable';
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { postRETRIEVEWHATIFRequest, postCrtPoRequest } from "../../Redux/Action/whatIF";
import {
    getALLOCHEADDETAILSRequest,
} from "../../Redux/Action/quantityLimits";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
        // '&::-webkit-scrollbar': { width: '8px', height: "8px" },
        // '&::-webkit-scrollbar-thumb': { backgroundColor: '#bdbdbd', borderRadius: '4px', },
        // '&::-webkit-scrollbar-track': { backgroundColor: '#f5f5f5', borderRadius: '4px', },
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
        // border: "1px solid red",
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
    multiselectfield: {
        display: "inline-block",
        // border: "1px solid red",
        margin: "0rem",
        padding: "0rem 0rem",
        verticalAlign: "middle",
    },

});

// const temp_data = [
//     {
//         ITEM: '1234501', ITEM_DESC: "Test Item-MEDIUM", ITEM_PARENT: '12345001', DIFF_ID: "BLUE", LOCATION: "1001",
//         LOC_TYPE: "W", PO_QTY: 18, SUPPLIER: 45000, ORIGIN_CTY: "CN", PO_TYPE: "Warehouse", PO: "91500", ERROR_MESSAGE: ""
//     },
// ]

const dump_data = [
    { ITEM: '1234501', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '18', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234502', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '20', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234503', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '22', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234504', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '24', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234505', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '26', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234506', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '28', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234507', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '30', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234508', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '32', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '1234509', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '12345001', DIFF_ID: 'BLUE', LOCATION: '1001', LOC_TYPE: 'W', PO_QTY: '34', SUPPLIER: '450001', ORIGIN_CTY: 'CN', PO_TYPE: 'Warehouse', PO: '91500', ERROR_MESSAGE: '' },
    { ITEM: '2222201', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '22222001', DIFF_ID: 'BLACK', LOCATION: '2001', LOC_TYPE: 'W', PO_QTY: '36', SUPPLIER: '540001', ORIGIN_CTY: 'US', PO_TYPE: 'Warehouse', PO: '15000', ERROR_MESSAGE: '' },
    { ITEM: '2222202', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '22222001', DIFF_ID: 'BLACK', LOCATION: '2001', LOC_TYPE: 'W', PO_QTY: '38', SUPPLIER: '540001', ORIGIN_CTY: 'US', PO_TYPE: 'Warehouse', PO: '15000', ERROR_MESSAGE: '' },
    { ITEM: '2222203', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '22222001', DIFF_ID: 'BLACK', LOCATION: '2001', LOC_TYPE: 'W', PO_QTY: '40', SUPPLIER: '540001', ORIGIN_CTY: 'US', PO_TYPE: 'Warehouse', PO: '15000', ERROR_MESSAGE: '' },
    { ITEM: '2222204', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '22222001', DIFF_ID: 'BLACK', LOCATION: '2001', LOC_TYPE: 'W', PO_QTY: '42', SUPPLIER: '540001', ORIGIN_CTY: 'US', PO_TYPE: 'Warehouse', PO: '15000', ERROR_MESSAGE: '' },
    { ITEM: '2222205', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '22222001', DIFF_ID: 'BLACK', LOCATION: '2001', LOC_TYPE: 'W', PO_QTY: '44', SUPPLIER: '540001', ORIGIN_CTY: 'US', PO_TYPE: 'Warehouse', PO: '15000', ERROR_MESSAGE: '' },
    { ITEM: '2222206', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '22222001', DIFF_ID: 'BLACK', LOCATION: '2001', LOC_TYPE: 'W', PO_QTY: '46', SUPPLIER: '540001', ORIGIN_CTY: 'US', PO_TYPE: 'Warehouse', PO: '15000', ERROR_MESSAGE: '' },
    { ITEM: '3333301', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '33333001', DIFF_ID: 'RED', LOCATION: '3001', LOC_TYPE: 'W', PO_QTY: '48', SUPPLIER: '650231', ORIGIN_CTY: 'BN', PO_TYPE: 'Warehouse', PO: '35000', ERROR_MESSAGE: '' },
    { ITEM: '3333302', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '33333001', DIFF_ID: 'RED', LOCATION: '3001', LOC_TYPE: 'W', PO_QTY: '50', SUPPLIER: '650231', ORIGIN_CTY: 'BN', PO_TYPE: 'Warehouse', PO: '35000', ERROR_MESSAGE: '' },
    { ITEM: '3333303', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '33333001', DIFF_ID: 'RED', LOCATION: '3001', LOC_TYPE: 'W', PO_QTY: '52', SUPPLIER: '650231', ORIGIN_CTY: 'BN', PO_TYPE: 'Warehouse', PO: '35000', ERROR_MESSAGE: '' },
    { ITEM: '3333304', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '33333001', DIFF_ID: 'RED', LOCATION: '3001', LOC_TYPE: 'W', PO_QTY: '54', SUPPLIER: '650231', ORIGIN_CTY: 'BN', PO_TYPE: 'Warehouse', PO: '35000', ERROR_MESSAGE: '' },
    { ITEM: '3333305', ITEM_DESC: 'Test Item-MEDIUM', ITEM_PARENT: '33333001', DIFF_ID: 'RED', LOCATION: '3001', LOC_TYPE: 'W', PO_QTY: '56', SUPPLIER: '650231', ORIGIN_CTY: 'BN', PO_TYPE: 'Warehouse', PO: '35000', ERROR_MESSAGE: '' },
]

const WhatIFPO = ({ setOpenPoPrv, allocDetails, setOpenDialog, setDialogData, poPrvData, poEnable, ApproveFreeseCheck, setRtvOnSuccess, 
    setSelected, allocNoData, setAllocDetails, setApproveFreeseCheck, callMode }) => {
    const [WhatIFPOdata, setWhatIFPOdata] = useState(poPrvData);
    const [tableData, setTableData] = useState(poPrvData);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [CreatePOCheck, setCreatePOCheck] = useState(false);
    const [loadCheck, setLoadCheck] = useState(false);
    const [inputValue, setInputValue] = useState([]);
    const [sampleVal, setSampleVal] = useState([]);

    // Manage columns popup in Table Grid
    const [openDialogManage, setOpenDialogManage] = useState(false);
    const WhatIFPOStyle = useStyles();


    const POPreview = [
        { id: "SOURCE_ITEM", label: allocDetails.length > 0 && allocDetails[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku", width: "80px" },
        { id: "ITEM_DESC", label: "Description", width: "150px" },
        { id: "TRAN_ITEM", label: "Sku", width: "80px" },
        { id: "DIFF_ID", label: "Variant", width: "80px" },
        { id: "LOC", label: "Location", width: "80px" },
        { id: "LOC_TYPE", label: "Location Type", width: "80px" },
        { id: "PO_QTY", label: "PO Qty", width: "80px" },
        { id: "SUPPLIER", label: "Supplier", width: "80px" },
        { id: "ORIG_CTY", label: "Origin Cty", width: "80px" },
        { id: "PO_TYPE", label: "PO Type", width: "80px" },
        { id: "ORDER_NO", label: "PO", width: "80px" },
        { id: "ERROR_DESC", label: "Error Message", width: "150px" },
    ]

    useEffect(() => {
        document.title = 'PO Preview';
    }, []);

    const WhatIFSummaryData = useSelector(
        (state) => state.WhatIFReducers
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (WhatIFSummaryData?.data?.CreatePO) {
            if (WhatIFSummaryData?.data?.CreatePO && Array.isArray(WhatIFSummaryData?.data?.CreatePO)) {
                setWhatIFPOdata(WhatIFSummaryData?.data?.CreatePO);
                setTableData(WhatIFSummaryData?.data?.CreatePO);
                setOpenDialog(true);
                setCreatePOCheck(true);
                setDialogData("PO CREATED");
                setApproveFreeseCheck(true);
                WhatIFSummaryData.data.CreatePO = ""
                dispatch(getALLOCHEADDETAILSRequest([allocNoData]));
            }
            if (WhatIFSummaryData?.data?.CreatePO?.status === 500) {
                setOpenDialog(true);
                setCreatePOCheck(false);
                setDialogData(String(WhatIFSummaryData?.data?.CreatePO?.message));
                WhatIFSummaryData.data.CreatePO.status = 0
            }
            setLoadCheck(false);

        } else if (
            WhatIFSummaryData?.data?.allocDetails
            && Array.isArray(WhatIFSummaryData?.data?.allocDetails)
        ) {
            setAllocDetails(WhatIFSummaryData?.data?.allocDetails);
        }
    }, [WhatIFSummaryData?.data]);


    const SearchButtonTrend = (input) => (

        <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
            <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
                onClick={() => {
                    swal(
                        //console.log("what if po",input)
                        input[(Object.keys(input))[0]]
                    )
                }}
            />
        </IconButton>
    )
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.root}`]: {
            height: "28px",
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

            <div className={WhatIFPOStyle.header_container}>
                <div className={WhatIFPOStyle.header_child}>
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
                            value={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
                            id="outlined-disabled"
                            name="ALLOC_NO"
                            placeholder="ALLOC_NO"
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' }
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFPOStyle.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={WhatIFPOStyle.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Description</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            value={allocDetails.length > 0 ? allocDetails[0].ALLOC_DESC : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_DESC : null}
                            sx={{
                                margin: "0px 0px 2px 2px", width: "25vh"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "14px",
                                    // padding:"0px"
                                },
                                borderRadius: "5px",
                                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                            }}
                            id="outlined-disabled"
                            name="ALLOC_DESC"
                            placeholder="ALLOC_DESC"
                            InputProps={{
                                endAdornment: <SearchButtonTrend desc={allocDetails.length > 0 ? allocDetails[0].ALLOC_DESC : null} />,
                                style: {
                                    fontSize: 12, backgroundColor: "#f0f0f0",//backgroundColor: "#f0f0f0",
                                },
                                className: WhatIFPOStyle.input,
                            }}

                            disabled
                        />
                    </div>
                </div>
                <div className={WhatIFPOStyle.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Alloc Context</InputLabel>
                    </div>
                    <div className={WhatIFPOStyle.multiselectfield}>
                        <TextField
                            size="small"
                            value={allocDetails.length > 0 ? allocDetails[0].CONTEXT : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].CONTEXT : null}
                            sx={{
                                margin: "0px 0px 2px 2px", width: "20vh"
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
                                className: WhatIFPOStyle.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={WhatIFPOStyle.header_child}>
                    <div >
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Alloc Level</InputLabel>
                    </div>
                    <div className={WhatIFPOStyle.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "20vh"
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
                            value={allocDetails.length > 0 ? allocDetails[0].ALLOC_LEVEL : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_LEVEL : null}
                            id="outlined-disabled"
                            name="ALLOC_LEVEL"
                            placeholder="ALLOC_LEVEL"
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFPOStyle.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={WhatIFPOStyle.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Release Date</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "20vh"
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
                            value={allocDetails.length > 0 ? allocDetails[0].RELEASE_DATE : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].RELEASE_DATE : null}
                            id="outlined-disabled"
                            name="RELEASE_DATE"
                            placeholder="RELEASE_DATE"
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: WhatIFPOStyle.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={WhatIFPOStyle.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Status</InputLabel>
                    </div>
                    <div className={WhatIFPOStyle.multiselectfield}>
                        <TextField
                            size="small"
                            value={allocDetails.length > 0 ? allocDetails[0].STATUS : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].STATUS : null}
                            sx={{
                                margin: "0px 0px 2px 2px", width: "20vh"
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
                                className: WhatIFPOStyle.input,
                            }}
                            inputProps={{ sx: { backgroundColor: '#fff' } }}
                            disabled
                        />
                    </div>
                </div>


                <div className={WhatIFPOStyle.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Allocator</InputLabel>
                    </div>
                    <div>
                        <TextField
                            variant="outlined"
                            size="small"
                            value={allocDetails.length > 0 ? allocDetails[0].ALLOCATOR : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOCATOR : null}
                            sx={{
                                margin: "0px 0px 2px 2px", width: "140px"
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
                                className: WhatIFPOStyle.input,
                            }}
                            disabled
                        />
                    </div>
                </div>
                {/* {allocDetails[0].CONTEXT === "Promotion" ?
                    [ */}
                {/* <div className={WhatIFPOStyle.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Promotion</InputLabel>
                    </div>
                    <div className={WhatIFPOStyle.multiselectfield}>

                        <TextField
                            size="small"

                            sx={{
                                margin: "0px 0px 2px 2px", width: "180px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "13px",
                                },
                                input: {
                                    "&::placeholder": {
                                        opacity: 1,
                                    },
                                },
                                borderRadius: "5px",
                                boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                            }}
                            id="outlined-disabled"
                            name="PROMOTION"
                            placeholder="PROMOTION"
                            //   value={searchHeaderData.ALLOC_DESC}
                            // value={allocDetails[0].ALLOC_DESC}
                            // defaultValue={allocDetails[0].ALLOC_DESC}
                            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                            inputProps={{
                                maxLength: 100, sx: { backgroundColor: '#fff' },
                            }}
                            InputProps={{
                                endAdornment: <SearchButtonTrend Promo="PROMOTION" />,
                                style: { fontSize: 12, backgroundColor: "#f0f0f0", },
                                className: WhatIFPOStyle.input,
                            }}

                            disabled
                        />
                    </div>
                </div> */}
                {/* ] : null} */}
            </div>
        </Box>
    )


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
                    const temp = tableData.filter((props) => String(props[Object.keys(inputValue)[i]]).toLowerCase() === String(temp_dict[Object.keys(inputValue)[i]]).toLowerCase())
                    setWhatIFPOdata(temp);
                }
                else {
                    const filteredTable = tableData.filter((props) =>
                        Object.entries(inputValue).every(
                            ([key, val]) =>
                                !val.length ||
                                props[key]
                                    ?.toString()
                                    .toLowerCase()
                                    .includes(val?.toString().toLowerCase())
                        )
                    );
                    setWhatIFPOdata(filteredTable);
                }
            }
        }
        if (Object.keys(inputValue).length === 0) {
            setWhatIFPOdata(tableData)
        }

    }, [inputValue]);

    function POPreviewTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead
                    className={WhatIFPOStyle.TitleHead}
                // sx={{ position: "sticky", top: 0, zIndex: "1" }}
                >
                    <TableRow className={WhatIFPOStyle.TitleRow}
                    // sx={{ border: "1px solid red" }}

                    >
                        {POPreview.map((headCell) => (ManageHeaderData.includes(headCell.id) &&
                            <StyledTableCell
                                key={headCell.id}
                                // className={WhatIFPOStyle.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "3px",
                                    width: headCell.width
                                    // border: "1px solid black"
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : "asc"}
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
                                        }, width: headCell.width,
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

    POPreviewTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    function POPreviewTableHeadToolbar(props) {
        const { numSelected } = props;
        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(WhatIFPOdata.length > 0 &&
                    {
                        minHeight: {
                            minHeight: "25px !important",
                        },
                        // border:"2px solid black",
                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.action.activatedOpacity
                            ),
                    }),
                    padding: "0px",
                }}
            >
                {WhatIFPOdata.length > 0 && (
                    <Typography
                        sx={{
                            flex: "1 1 100%", display: "flex",
                            justifyContent: "flex-end",
                            padding: "0px 20px 0px 0px",
                            fontSize: "14px",
                            fontFamily: "system-ui",
                        }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        Rows: {WhatIFPOdata.length}
                    </Typography>
                )}
            </Toolbar>
        );
    }

    function descendingComparator(a, b, orderBy) {
        let c, d;
        if (orderBy == "ITEM_DESC" || orderBy == "DIFF_ID"
            || orderBy == "ORIGIN_CTY" || orderBy == "ERROR_MESSAGE"
            || orderBy == "PO_TYPE") {
            c = String(b[orderBy]);
            d = String(a[orderBy]);
        }
        else if (orderBy == "ITEM_PARENT" || orderBy == "ITEM" ||
            orderBy == "LOC_TYPE" || orderBy == "LOCATION" ||
            orderBy == "PO_QTY" ||
            orderBy == "SUPPLIER" || orderBy == "PO"
        ) {
            c = parseInt(b[orderBy]);
            d = parseInt(a[orderBy]);
            c = isNaN(c) ? c : parseInt(c);
            d = isNaN(d) ? d : parseInt(d);
            c = isNaN(c) ? 0 : parseInt(c);
            d = isNaN(d) ? 0 : parseInt(d);
        }
        else {
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
            else if (d !== "" && c === "") {
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
                const sortedData = stableSort(WhatIFPOdata, getComparator("asc", sortValue));
                setWhatIFPOdata(sortedData);
            }
            if (order === "desc") {
                const sortedData = stableSort(WhatIFPOdata, getComparator("desc", sortValue));
                setWhatIFPOdata(sortedData);
            }
            setSortCheck(false)
        }
    }, [WhatIFPOdata, order, orderBy]);

    const handleRequestSort = (event, property) => {
        if (event) {
            setSortCheck(true)
            setSortValue(String(property))
        }
        const isAsc = (orderBy === property && order === 'asc');
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const testChange = (e) => {
        setInputValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
        setSampleVal((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))

    }
    const handleOK = () => {
        // if(rtvOnSuccess){
        //     dispatch(postRETRIEVEWHATIFRequest([searchData]));
        //     return;
        // }
        if (CreatePOCheck) { setRtvOnSuccess(true); } else { setRtvOnSuccess(false); }
        setOpenPoPrv(false);
        setSelected([]);
        setTableData([]);
        setWhatIFPOdata([]);
        document.title = 'WhatIf Summary';

    }
    const handleCreatePO = () => {
        if (WhatIFPOdata.length === 0) {
            setOpenDialog(true);
            setDialogData("There is no record selected to proceed");
            return;
        }
        setLoadCheck(true);
        dispatch(postCrtPoRequest([{ "ALLOC_NO": allocDetails[0].ALLOC_NO,  "ALLOCATOR": JSON.parse(localStorage.getItem("userData"))?.username }]));
    }
    /*
            #################################################
            ##########  MANAGE COLUMNS IN TABLE  ############
            #################################################
      */

    const [ManageHeaderCheck, setManageHeaderCheck] = useState(true);
    const [ManageHeaderData, setManageHeaderData] = useState([]);

    if (ManageHeaderCheck) {
        var temp = []
        POPreview.map(row => temp.push(row.id));
        setManageHeaderData(temp);
        setManageHeaderCheck(false);
    }

    const HandleManageHeader = () => {
        setOpenDialogManage(true);
    }
    const handleCloseDialogManage = (e) => {
        if (ManageHeaderData.length > 0) { setOpenDialogManage(false); }
        else { setOpenDialog(true); setDialogData("Table must contain atleast one column."); }
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
        POPreview.map(row => temp.push(row.id));
        setManageHeaderData(temp);
    }
    // console.log("WhatIFPOdata ",WhatIFPOdata, poPrvData)
    const headerManage = () => (
        <Box display="inline-block"
            sx={{ backgroundColor: "", height: "auto", padding: "0rem 0rem", width: "100%", }}>
            <div>
                {POPreview.map((key) => (
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
    return (
        <Box className={WhatIFPOStyle.maindiv} sx={{ width: "100%" }}>
            <div >
                {SearchHeader()}
            </div>
            <div  >
                <Box
                    component="fieldset"
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
                        margin: "5px 0px 0px 2px",
                        padding: "5px 0px 5px 5px"
                    }}
                >
                    <legend style={{ fontWeight: "bold", fontSize: "14px", color: "#191970", paddingLeft: "6px" }}>What If - Purchase Order Preview</legend>

                    <Box
                        display="flex"
                        sx={{
                            //backgroundColor: "yellow",
                            margin: "-5px 0px 3px 0px",
                            justifyContent: "end",
                            width: "calc(92.3vw - 0px)",
                        }}
                    >
                        <div className={WhatIFPOStyle.float_child}>
                            <Button
                                sx={{
                                    fontSize: "12px",
                                    backgroundColor: "#228B22",
                                    padding: "5px", fontFamily: "system-ui",
                                    width: "100px", marginLeft: "5px", marginTop: "2px",
                                }}
                                variant="contained"
                                // className={WhatIFPOStyle.textField}
                                type="submit"
                                onClick={handleOK}
                                startIcon={<DoneAllIcon />}
                            >
                                Ok</Button>


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
                                // className={WhatIFPOStyle.textField}
                                type="submit"
                                onClick={handleCreatePO}
                                startIcon={<CreateIcon />}
                                disabled={poEnable || callMode === "VIEW" ? true : false}
                            >
                                Create PO</Button>
                            <Button
                                autoFocus
                                variant="contained"
                                onClick={HandleManageHeader}
                                sx={{
                                    backgroundColor: "",
                                    padding: "3.5px",
                                    margin: "2px 4px 0px 4px",
                                    alignItems: "center",
                                    width: "fit-content",
                                    // border: "1px solid yellow",
                                }}
                                title="Manage Columns"
                            ><ViewColumnIcon style={{ padding: "0px" }} /></Button>
                        </div>
                        {/* </div> */}
                    </Box>

                    <Paper sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", width: "calc(92.3vw - 0px)", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}
                    >
                        <TableContainer style={{ maxHeight: "fit-content", width: "calc(100% - 0px)", borderRadius: '7px' }}
                            component={Paper}
                        >
                            <Table aria-label="customized table">
                                <POPreviewTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody >

                                    {ManageHeaderData.includes('SOURCE_ITEM') ?
                                        <TableCell sx={{
                                            padding: "0px",
                                            height: "22px",
                                        }}>
                                            <TextField
                                                name="SOURCE_ITEM"
                                                onChange={testChange}
                                                value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SOURCE_ITEM") > 0 ? inputValue.ITEM : ""}
                                                placeholder={allocDetails.length > 0 && allocDetails[0].ALLOC_LEVEL_CODE === 'D' ? "Style" : "Sku"}
                                                autoComplete="off"
                                                InputProps={{
                                                    sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                }}
                                                sx={{ width: "100%", }}
                                                variant="standard"
                                                inputProps={{
                                                    sx: {
                                                        fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                        "&::placeholder": { textAlign: "center" },
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
                                                onChange={testChange}
                                                value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ITEM_DESC") > 0 ? inputValue.ITEM_DESC : ""}
                                                placeholder="Description"
                                                autoComplete="off"
                                                InputProps={{
                                                    sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", textJustify: "left" },
                                                }}
                                                sx={{ width: "100%" }}
                                                variant="standard"
                                                inputProps={{
                                                    sx: {
                                                        fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                        "&::placeholder": { textAlign: "center" } // aligns the placeholder text to the left
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        : null}

                                    {ManageHeaderData.includes('TRAN_ITEM') ?
                                        <TableCell sx={{
                                            padding: "0px",
                                        }}>
                                            <TextField
                                                name="TRAN_ITEM"
                                                onChange={testChange}
                                                value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("TRAN_ITEM") > 0 ? inputValue.ITEM_PARENT : ""}
                                                placeholder="Sku"
                                                autoComplete="off"
                                                InputProps={{
                                                    sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                }}
                                                sx={{ width: "100%", }}
                                                variant="standard"
                                                inputProps={{
                                                    sx: {
                                                        fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
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
                                                onChange={testChange}
                                                value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("DIFF_ID") > 0 ? inputValue.DIFF_ID : ""}
                                                placeholder="Variant"
                                                autoComplete="off"
                                                InputProps={{
                                                    sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                }}
                                                sx={{ width: "100%", }}
                                                variant="standard"
                                                inputProps={{
                                                    sx: {
                                                        fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                        "&::placeholder": { textAlign: "left", padding: "0px", },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        : null}

                                    {ManageHeaderData.includes('LOC') ?
                                        <TableCell sx={{
                                            padding: "0px",
                                        }}>
                                            <TextField
                                                name="LOC"
                                                onChange={testChange}
                                                value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOC") > 0 ? inputValue.LOCATION : ""}
                                                placeholder="Location"
                                                autoComplete="off"
                                                InputProps={{
                                                    sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                }}
                                                sx={{ width: "100%", }}
                                                variant="standard"
                                                inputProps={{
                                                    sx: {
                                                        fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                        "&::placeholder": { textAlign: "left", padding: "0px", },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        : null}

                                    {ManageHeaderData.includes('LOC_TYPE') ?
                                        <TableCell sx={{
                                            padding: "0px",
                                        }}>
                                            <TextField
                                                name="LOC_TYPE"
                                                onChange={testChange}
                                                value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOC_TYPE") > 0 ? inputValue.LOC_TYPE : ""}
                                                placeholder="Location Type"
                                                autoComplete="off"
                                                InputProps={{
                                                    sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                }}
                                                sx={{ width: "100%", }}
                                                variant="standard"
                                                inputProps={{
                                                    sx: {
                                                        fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                        "&::placeholder": { textAlign: "left", padding: "0px", },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        : null}

                                    {ManageHeaderData.includes('PO_QTY') ?
                                        <TableCell sx={{
                                            padding: "0px",
                                        }}>
                                            <TextField
                                                name="PO_QTY"
                                                onChange={testChange}
                                                value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("PO_QTY") > 0 ? inputValue.PO_QTY : ""}
                                                placeholder="PO Qty"
                                                autoComplete="off"
                                                InputProps={{
                                                    sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                }}
                                                sx={{ width: "100%", }}
                                                variant="standard"
                                                inputProps={{
                                                    sx: {
                                                        fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                        "&::placeholder": { textAlign: "left", padding: "0px", },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        : null}
                                    {ManageHeaderData.includes('SUPPLIER') ?
                                        <TableCell sx={{
                                            padding: "0px",
                                        }}>
                                            <TextField
                                                name="SUPPLIER"
                                                onChange={testChange}
                                                value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("SUPPLIER") > 0 ? inputValue.SUPPLIER : ""}
                                                placeholder="Supplier"
                                                autoComplete="off"
                                                InputProps={{
                                                    sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                }}
                                                sx={{ width: "100%", }}
                                                variant="standard"
                                                inputProps={{
                                                    sx: {
                                                        fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                        "&::placeholder": { textAlign: "left", padding: "0px", },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        : null}

                                    {ManageHeaderData.includes('ORIG_CTY') ?
                                        <TableCell sx={{
                                            padding: "0px",
                                        }}>
                                            <TextField
                                                name="ORIG_CTY"
                                                onChange={testChange}
                                                value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ORIG_CTY") > 0 ? inputValue.ORIGIN_CTY : ""}
                                                placeholder="Origin Cty"
                                                autoComplete="off"
                                                InputProps={{
                                                    sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                }}
                                                sx={{ width: "100%", }}
                                                variant="standard"
                                                inputProps={{
                                                    sx: {
                                                        fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                        "&::placeholder": { textAlign: "left", padding: "0px", },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        : null}

                                    {ManageHeaderData.includes('PO_TYPE') ?
                                        <TableCell sx={{
                                            padding: "0px",
                                        }}>
                                            <TextField
                                                name="PO_TYPE"
                                                onChange={testChange}
                                                value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("PO_TYPE") > 0 ? inputValue.PO_TYPE : ""}
                                                placeholder="PO Type"
                                                autoComplete="off"
                                                InputProps={{
                                                    sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                }}
                                                sx={{ width: "100%", }}
                                                variant="standard"
                                                inputProps={{
                                                    sx: {
                                                        fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                        "&::placeholder": { textAlign: "left", padding: "0px", },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        : null}

                                    {ManageHeaderData.includes('ORDER_NO') ?
                                        <TableCell sx={{
                                            padding: "0px",
                                        }}>
                                            <TextField
                                                name="ORDER_NO"
                                                onChange={testChange}
                                                value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ORDER_NO") > 0 ? inputValue.PO : ""}
                                                placeholder="PO"
                                                autoComplete="off"
                                                InputProps={{
                                                    sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                }}
                                                sx={{ width: "100%", }}
                                                variant="standard"
                                                inputProps={{
                                                    sx: {
                                                        fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                        "&::placeholder": { textAlign: "left", padding: "0px", },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        : null}

                                    {ManageHeaderData.includes('ERROR_DESC') ?
                                        <TableCell sx={{
                                            padding: "0px",
                                        }}>
                                            <TextField
                                                name="ERROR_DESC"
                                                onChange={testChange}
                                                value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("ERROR_DESC") > 0 ? inputValue.ERROR_MESSAGE : ""}
                                                placeholder="Error Message"
                                                autoComplete="off"
                                                InputProps={{
                                                    sx: { fontSize: 12, padding: "0px", height: "22px", textAlign: "left", }
                                                }}
                                                sx={{ width: "100%", }}
                                                variant="standard"
                                                inputProps={{
                                                    sx: {
                                                        fontSize: 12, padding: "0px 0px 0px 3px", height: "22px", textAlign: "left",
                                                        "&::placeholder": { textAlign: "left", padding: "0px", },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        : null}


                                    {WhatIFPOdata.length > 0 ? WhatIFPOdata.map(row => (
                                        <TableRow  >

                                            {ManageHeaderData.includes('SOURCE_ITEM') ?
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", height: "22px" }}>{row.SOURCE_ITEM}</TableCell>
                                                : null}
                                            {ManageHeaderData.includes('ITEM_DESC') ?
                                                <TableCell align="right" sx={{ padding: "0px 0px 0px 3px", textAlign: "center", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px', height: "20px" }}>
                                                    {String(row.ITEM_DESC).length > 0 ?
                                                        < Box
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
                                                                    paddingLeft: "0px",
                                                                    paddingRight: "0px",
                                                                    // width:"70px"
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
                                                                className={WhatIFPOStyle.textField}
                                                                onClick={() => {
                                                                    swal(
                                                                        <div>
                                                                            <p>{row.ITEM_DESC}</p>
                                                                        </div>
                                                                    )
                                                                }}
                                                                startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                            >
                                                            </Button>
                                                        </Box>
                                                        : null}

                                                </TableCell>
                                                : null}
                                            {ManageHeaderData.includes('TRAN_ITEM') ?
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} >{row.TRAN_ITEM}</TableCell>
                                                : null}
                                            {ManageHeaderData.includes('DIFF_ID') ?
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.DIFF_ID}</TableCell>
                                                : null}
                                            {ManageHeaderData.includes('LOC') ?
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.LOC}</TableCell>
                                                : null}
                                            {ManageHeaderData.includes('LOC_TYPE') ?
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.LOC_TYPE}</TableCell>
                                                : null}
                                            {ManageHeaderData.includes('PO_QTY') ?
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.PO_QTY}</TableCell>
                                                : null}
                                            {ManageHeaderData.includes('SUPPLIER') ?
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.SUPPLIER}</TableCell>
                                                : null}
                                            {ManageHeaderData.includes('ORIG_CTY') ?
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.ORIG_COUNTRY}</TableCell>
                                                : null}
                                            {ManageHeaderData.includes('PO_TYPE') ?
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.PO_TYPE}</TableCell>
                                                : null}

                                            {ManageHeaderData.includes('ORDER_NO') ?
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.ORDER_NO}</TableCell>
                                                : null}
                                            {ManageHeaderData.includes('ERROR_DESC') ?
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px" }} textAlign="right">{row.ERROR_DESC}</TableCell>
                                                : null}

                                        </TableRow >
                                    )) : false}
                                    {WhatIFPOdata.length < 20 ?
                                        [...Array(20 - WhatIFPOdata.length).keys()].map(val => (
                                            <TableRow  >

                                                {ManageHeaderData.map((row, index) => {
                                                    return (
                                                        <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px", height: "20px" }}></TableCell>
                                                    )
                                                })}

                                            </TableRow >
                                        )) : false}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <POPreviewTableHeadToolbar />
                    </Paper>
                </Box>
            </div>
            <div>
                <Dialog
                    //fullWidth={true}
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
                        // '&::-webkit-scrollbar-button': {
                        //     background: 'transparent',
                        //     width: '8px',
                        //     height: '8px',
                        //   },
                        //   '&::-webkit-scrollbar-button:start:decrement': {
                        //     content: '""',
                        //     display: 'block',
                        //     position: 'absolute',
                        //     top: '0',
                        //     left: '0',
                        //     width: '8px',
                        //     height: '8px',
                        //     borderTopRightRadius: '4px',
                        //     border: 'none',
                        //     background: 'black',
                        //   },
                        //   '&::-webkit-scrollbar-button:end:increment': {
                        //     content: '""',
                        //     display: 'flex',
                        //     position: 'absolute',
                        //     bottom: '0',
                        //     left: '0',
                        //     width: '8px',
                        //     height: '8px',
                        //     borderBottomRightRadius: '10px',
                        //     border: 'none',
                        //     background: 'black',
                        //   },
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
            <Modal open={loadCheck}>
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
        </Box>
    )

};

export default WhatIFPO;