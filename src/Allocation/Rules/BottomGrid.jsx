import "./Left.css"
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import axios from "axios";
import { CONFIG } from "../../services/config";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
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
import { visuallyHidden } from '@mui/utils';
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
// import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControlLabel } from '@material-ui/core';
import makeAnimated from 'react-select/animated';
import Checkbox from '@mui/material/Checkbox';
import {
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
import swal from "sweetalert";
import { RowingOutlined } from "@mui/icons-material";
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { BsFillEraserFill } from 'react-icons/bs';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AnimationIcon from '@mui/icons-material/Animation';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ScaleIcon from '@mui/icons-material/Scale';
import SaveIcon from '@mui/icons-material/Save';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import Draggable from 'react-draggable';
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


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
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

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


const columns = [

    {
        field: "EOW",
        headerName: "EOW",
        width: 150,
    },


    {
        field: "WEIGHT",
        headerName: "WEIGHT %",
        description: "This column has a value getter and is not sortable.",
        editable: true,

        width: 150,
        //   renderHeader:likeWeightAction
    },

];
// const initialInd={
//     RULE_LEVEL: "",
//     EXACT_IND: "", 
//     RULE_TYPE: "", 
//     NET_NEED_IND: "", 
//     REGULAR_SALES_IND: "",
//     PROMO_SALES_IND: "", 
//     CLEARANCE_SALES_IND: "",
//     USESIZEPROFILE: "", 
//     DEFAULTAUTOPRESENTATIONMINANDQTYLIMITS: "", 
//     START_DATE1: "", 
//     END_DATE1: "", 
//     START_DATE2: "", 
//     END_DATE2: "", 
//     WEEKS_THIS_YEAR: "", 
//     WEEKS_LAST_YEAR: "", 
//     ON_ORDER_COMMIT_WEEKS: "", 
//     ON_ORDER_COMMIT_DATE: "", 
// }
const WeightsHeader = [
    { id: "EOW", label: "EOW" },
    { id: "WEIGHT", label: "Weight %" },
]


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
    // uploaddiv: {
    //     display: "flex",
    //     alignItems: "center",
    //     marginTop: "50px",
    //     textAlign: "start",
    //     gap: 20,
    //     // backgroundColor:"lightgreen"
    // },
    TitleHead: {
        // height: "25px",
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
    input: {
        width: "400px",
        border: "1px solid red",
        height: "30px",
        // backgroundColor:"#f0f0f0",
        '& input + fieldset': {
            // borderColor: 'gray',
            // borderRadius: "0",
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        },
    },
    divBoxLeft: {
        width: "50%",
        float: "left"
    },
    divBoxRight: {
        marginLeft: "50%",
    },
    uploaddiv: {
        display: "flex",
        alignItems: "center",
        marginTop: "20px",
        textAlign: "start",
        gap: 10,
    },
    TableCell: {
        color: "#fff",
        padding: "6px 6px !important",
        lineHeight: "1.2rem !important",
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
    input: {
        // width: "250px",
        height: 37.8,
        // backgroundColor:"#f0f0f0",
        '& input + fieldset': {
            // borderColor: 'gray',
            borderRadius: "0",
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        },
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
    Bottom_container: {
        // display: "inline-block",
        // alignItems: "stretch",
        display: "flex",
        flexWrap: "wrap",
        // flexDirection: "column"
        // display: "table",
        // gridTemplateColumns: "repeat(2,0fr)"
    },
    Bottom_child: {
        display: "inline-block",
        // border: "1px solid red",
        // display:"table-cell",
        padding: "0rem 0.2rem",
        verticalAlign: "top",
        flex: 1,
        alignItems: "stretch",
        // width:"50%"
        // height:"auto",
    },
    HeightDiv: {
        padding: "0px",
        margin: "0px"
    }

    // leftDivContainer:{
    //     width:"100%",height:"auto"
    // }
})

const useStyles1 = makeStyles({
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
    TitleHead: {
        position: "sticky",
        top: -1,
    },
    GobackDiv: {
        cursor: "pointer",
    },
    textField: {
        marginRight: "10px ",
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
    divBoxLeft: {
        width: "100%",
        float: "left"
    },
    TableCell: {
        color: "#fff",
        padding: "6px 6px !important",
        //lineHeight: "1.2rem !important",
    },
    course_box: {
        // width: "100%",
        // margin:"0 auto", 
        // display: "block",
        // flexWrap:"wrap",
    },
    textField: {
        marginRight: "10px !important",
    },
})

const styleSelect6 = {
    control: base => ({
        ...base,
        width: "180px",
        fontSize: "12px",
        margin: "0px 0px 0px 0px",
        // This line disable the blue border
        // borderRadius: "0",
        minHeight: "30px",
        // backgroundColor:"#f0f0f0",
        //border:"1px solid red",
        border: "1px solid rgb(180, 180, 180)",
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
        height: '30px',
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
        // minHeight: '1px',
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
        // backgroundColor: 'black',
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
    })
};

const styleSelect3 = {
    control: base => ({
        ...base,
        width: "130px",
        fontSize: "12px",
        minHeight: "20px",
        margin: "0px 0px 0px 0px",
        // This line disable the blue border
        borderRadius: "0px",
        border: 0,
        borderBottom: "1px solid gray"
        // backgroundColor:"#f0f0f0",
        //border:"1px solid red",
        // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
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
        padding: 0,
        // paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
    }),
    valueContainer: (provided) => ({
        ...provided,
        // minHeight: '1px',
        height: '20px',
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
        justifyContent: "right"
        // minHeight: '1px',
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
        // backgroundColor: 'black',
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
    })
};

const styleSelect5 = {
    control: base => ({
        ...base,
        width: "130px",
        fontSize: "12px",
        minHeight: "20px",
        margin: "0px 0px 0px 0px",
        // This line disable the blue border
        borderRadius: "5px",
        // border:0,
        // borderBottom:"1px solid gray"
        // backgroundColor:"#f0f0f0",
        //border:"1px solid red",
        // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
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
        padding: 0,
        // paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
    }),
    valueContainer: (provided) => ({
        ...provided,
        // minHeight: '1px',
        height: '20px',
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
        //justifyContent:"right"
        // minHeight: '1px',
    }),
    option: provided => ({
        ...provided,
        // color: 'blue',
        fontSize: "12px",
    }),
    placeholder: (provided, state) => ({
        ...provided,
        // marginTop: '-30px',
        color: "gray"
    }),
    menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // backgroundColor: 'black',
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
    })
};

const styleSelect4 = {
    control: base => ({
        ...base,
        width: "100px",
        fontSize: "12px",
        minHeight: "20px",
        margin: "0px 0px 0px 0px",
        // This line disable the blue border
        borderRadius: "0px",
        border: 0,
        borderBottom: "1px solid gray",
        // backgroundColor:"#f0f0f0",
        //border:"1px solid red",
        // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
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
        padding: 0,
        // paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
    }),
    valueContainer: (provided) => ({
        ...provided,
        // minHeight: '1px',
        height: '20px',
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
        //justifyContent:"right",


        //textAlign:"center"
        // minHeight: '1px',
    }),
    placeholder: (provided, state) => ({
        ...provided,
        // marginTop: '-30px',
        color: "gray"
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
        // backgroundColor: 'black',
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
    })
};

const styleSelect2 = {
    control: base => ({
        ...base,
        width: "180px",
        fontSize: "12px",
        minHeight: "20px",
        margin: "0px 0px 0px 0px",
        // This line disable the blue border
        borderRadius: "5px",
        // backgroundColor:"#f0f0f0",
        //border:"1px solid red",
        // boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
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
        padding: 0,
        // paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
    }),
    valueContainer: (provided) => ({
        ...provided,
        // minHeight: '1px',
        height: '20px',
        paddingTop: '0',
        paddingBottom: '0',
    }),
    placeholder: (provided, state) => ({
        ...provided,
        // marginTop: '-30px',
        color: "gray"
    }),
    singleValue: (provided) => ({
        ...provided,
        // minHeight: '1px',
        // paddingBottom: '0px',

    }),
    input: (provided) => ({
        ...provided,
        width: "100%",
        //justifyContent:"right",

        // minHeight: '1px',
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
        // backgroundColor: 'black',
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
    })
};

const styleSelect1 = {
    control: base => ({
        ...base,
        width: "200px",
        fontSize: "14px",
        margin: "0px 0px 0px 0px",
        // This line disable the blue border
        //borderRadius: "0",
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
        height: '30px',
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
        //justifyContent:"right",
        // minHeight: '1px',
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
        // backgroundColor: 'black',
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
    })
};

const animatedComponents = makeAnimated();

const optionsTemplates = [
    { value: "Template Name", label: "Template Name" },
    { value: "option 2", label: "option 2" },
    { value: "option 3", label: "option 3" },
    { value: "option 4", label: "option 4" }
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
    { id: "LOC", label: "Location" },
    { id: "LOC_DESC", label: "Location Description" },
    // { id: "LOC_TYPE", label: "Loc Type" },
    { id: "DEFAULT_WH", label: "Default WH" },
    { id: "GROUP_ID", label: "Group ID" },
    { id: "GROUP_DESC", label: "Group Desc" },
    { id: "LIKE_LOC", label: "Model After Loc" },
    { id: "LIKE_LOC_DESC", label: "Allied Loc Desc" },
    { id: "WEIGHT_PCT", label: "Weight" },
    { id: "CLEARANCE_IND", label: "Clearance Flag" },
    { id: "ITEM_LOC_STATUS", label: "Status" },
    { id: "RELEASE_DATE", label: "Release Date" },
]


const BottomContainer = forwardRef(({ setSubmit, setLeftContData, ref, allocLevel, allocNoData, allocDetails,
    leftContData, totalData, setTotalData, selected, setSelected, AllRetreiverRLdataCheck, setAllRetreieveRLdataCheck,
    setUpdateRulesRL, updateRulesRL, tableLocData, setTableLocData, setStatusRLData, setclearanceRLData,
    setLikeLocData, likeLocData, clearanceRLData, StatusRLData, setLoadCheck, LoadCheck, ApproveFreeseCheck }) => {
    const [ruleType, setRuleType] = useState([]);
    const [Hierarchy, setHierarchy] = useState([]);
    const [Need, setNeed] = useState([]);
    const [Allocateto, setAllocateto] = useState([]);

    const [check1, setCheck1] = React.useState(true)
    const [check2, setCheck2] = React.useState(true)
    const [check3, setCheck3] = React.useState(false)
    const [check4, setCheck4] = React.useState(false)
    const [check5, setCheck5] = React.useState(false)
    const [check6, setCheck6] = React.useState(false)
    const [check7, setCheck7] = React.useState(false)
    const [check8, setCheck8] = React.useState(false)
    const [check9, setCheck9] = React.useState(false)

    const [changeWeights, setChangeWeights] = useState([])
    // const [updateRulesRL, setUpdateRulesRL] = useState([]);

    // ****** DATE RANGE ***** //
    const [thisY, setThisY] = useState("")
    const [lastY, setLastY] = useState("")

    const [strt1, setStrt1] = useState("")
    const [strt2, setStrt2] = useState("")
    const [end1, setEnd1] = useState("")
    const [end2, setEnd2] = useState("")
    // const[ruleType,setRuleType]=useState();
    //for createalloc screen dailog
    // const [createAlloc,setCreateAlloc]=useState([])

    const [loading, setLoading] = useState(false);
    const [isSearch, setSearch] = useState(false);
    const [order1, setOrder1] = React.useState('asc');
    const [orderBy1, setOrderBy1] = React.useState('');
    const [totalDataCwgt, setTotalDataCwgt] = useState([]);
    const [RuleRefreshCheck, setRuleRefreshCheck] = useState(false);

    const [updateLocationRL, setUpdateLocationRL] = React.useState([]);
    const [deleteLocationRL, setDeleteLocationRL] = React.useState([]);
    const [loadWeightChangeRL, setLoadWeightChangeRL] = React.useState([]);
    const [loadRuledateRL, setLoadRuledateRL] = React.useState([]);
    const [retrieveRuleDateRL, setRetrieveRuleDateRL] = React.useState([]);
    const [updateChangeWeightsRL, setUpdateChangeWeightsRL] = React.useState([]);
    const [retrieveRuleDateRLSample, setRetrieveRuleDateRLSample] = React.useState([]);


    const [updateRulesRLCheck, setupdateRulesRLcheck] = React.useState(false);
    const [loadWeightChangeRLCheck, setLoadWeightChangeRLCheck] = React.useState(false);
    const [loadRuledateRLCheck, setLoadRuledateRLCheck] = React.useState(false);
    const [retrieveRuleDateRLCheck, setRetrieveRuleDateRLCheck] = React.useState(false);
    const [validCheck, setValidCheck] = React.useState(false);
    const [validCheckOnce, setValidCheckOnce] = React.useState(false);

    const [error, setError] = useState(false);

    const [startd1, setStartd1] = useState("");
    const [endd1, setEndd1] = useState("");
    const [startd2, setStartd2] = useState("");
    const [endd2, setEndd2] = useState("");

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [inputValue, setInputValue] = useState({});
    const [inputValue1, setInputValue1] = useState({});
    const [sampleVal, setSampleVal] = useState([]);
    const [sampleVal1, setSampleVal1] = useState([]);
    const [copyValue, setCopyValue] = useState(initialCopyValues);

    const [LockCheck, setLockCheck] = useState(false);


    ///*****right con *///
    const initialsearch = {
        LOCATION: [],
        LOCATION_LIST: [],
        LOCATION_TRAIT: [],
        EXCLUDE_LOCATION: [],
        ALL_STORE: "N",
        ALLOC_NO: allocNoData.ALLOC_NO
    }

    const [sorted, setSorted] = useState(true);

    const RulesLocationRightClasses = useStyles1();

    const [checkStore, setCheckStore] = useState(false);
    const [locationRL, setLocationRl] = useState([]);
    const [searchData, setSearchData] = useState(initialsearch);
    const [checkRL1, setCheckRL1] = React.useState(true)
    const [checkRL2, setCheckRL2] = React.useState(true)
    //const[totalData,settotalData]=useState([])

    const [locationListRL, setLocationListRl] = useState([]);
    const [locationTraitRL, setLocationTraitRl] = useState([]);
    const [locationExculdeRL, setLocationExculdeRl] = useState([]);
    // const [tableLocData, setTableLocData] = useState([]);

    //const [tableData, settableData] = useState([]);
    const [valLoc, setValLoc] = useState([]);
    const [valLoc1, setValLoc1] = useState([]);
    const [valLoc2, setValLoc2] = useState([]);
    const [valLoc3, setValLoc3] = useState([]);
    const [inputLoc, setInputLoc] = useState("");
    const [inputLoc1, setInputLoc1] = useState("");
    const [inputLoc2, setInputLoc2] = useState("");
    const [inputLoc3, setInputLoc3] = useState("");
    const [switchTableData, setSwitchTableData] = useState([]);
    const [clearanceRL, setClearanceRl] = useState([]);
    const [statusRL, setStatusRl] = useState([]);

    const [allData, setAllData] = useState([]);
    const [allDataCheck, setAllDataCheck] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const RulesLocationLeftClasses = useStyles();

    // Error popup message
    const [openDialogRL, setOpenDialogRL] = useState(false);
    const [DialogDataRL, setDialogDataRL] = useState("");

    // Manage columns popup in Table Grid
    const [openDialogManage, setOpenDialogManage] = useState(false);

    const RulesLocationLeftData = useSelector(
        (state) => state.RulesLocationReducers
    );

    const dispatch = useDispatch();

    useEffect(() => {
        // setTotalData(dumpData)
        setLoading(true);
        dispatch(getLOCATIONRLRequest([{}]));
        dispatch(getLOCATIONLISTRLRequest([{}]));
        dispatch(getLOCATIONTRAITSRLRequest([{}]));
        dispatch(getCLEARANCERLRequest([{}]));
        dispatch(getSTATUSRLRequest([{}]));
        //     dispatch(getFETCHLOCGRIDRequest([allocNoData]));
    }, [""]);

    useEffect(() => {
        setLoading(true);
        dispatch(getRULESTYPERequest([{}]));
        dispatch(getNEEDTYPERequest([{}]));
        dispatch(getHIERARCHYTYPERequest([{}]));
        dispatch(getALLOCATETOTYPERequest([{}]));
    }, [""]);

    const [validDefaultCheck, setValidDefaultCheck] = useState(true)

    useEffect(() => {
        if (updateRulesRL.length === 0 && validDefaultCheck) {
            setLeftContData({
                ...leftContData,
                END_DATE1: "",
                END_DATE2: "",
                START_DATE1: "",
                START_DATE2: "",
                RULE_TYPE: 'History',
                EXACT_IND_VAL: 'Exact',
                EXACT_IND: 'Y',
                RULE_LEVEL: "Sku",
                NET_NEED_IND_VAL: 'Net Need',
                NET_NEED_IND: 'Y',
            })
            setValidDefaultCheck(false)
        }
    }, [])

    const [countAddCheck, setCountAddCheck] = useState(0);

    useEffect(() => {
        if (
            RulesLocationLeftData?.data?.tableLocData
            && Array.isArray(RulesLocationLeftData?.data?.tableLocData)
        ) {
            if (RulesLocationLeftData?.data?.tableLocData.length > 0) {
                for (let i = 0; i < RulesLocationLeftData?.data?.tableLocData.length; i++) {
                    let rec = RulesLocationLeftData?.data?.tableLocData[i];
                    for (let col in rec) {
                        if (rec[col] == null || rec[col] == "NULL" || rec[col] === undefined) {
                            rec[col] = "";
                        }
                    }
                }
            }
            if (countAddCheck === 0) {
                setTotalData(RulesLocationLeftData?.data?.tableLocData);
                setTableLocData(RulesLocationLeftData?.data?.tableLocData);
                setLoadCheck(false)
                if (RulesLocationLeftData?.data?.tableLocData.length > 0) {
                    setCountAddCheck(1)
                }
            } else {
                setAllData(RulesLocationLeftData?.data?.tableLocData);
                setAllDataCheck(true);
            }
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.locationRL
            && Array.isArray(RulesLocationLeftData?.data?.locationRL)
        ) {
            setLocationRl(RulesLocationLeftData?.data?.locationRL);
            setLikeLocData(RulesLocationLeftData?.data?.locationRL)
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.locationListRL
            && Array.isArray(RulesLocationLeftData?.data?.locationListRL)
        ) {
            setLocationListRl(RulesLocationLeftData?.data?.locationListRL);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.locationTraitRL
            && Array.isArray(RulesLocationLeftData?.data?.locationTraitRL)
        ) {
            setLocationTraitRl(RulesLocationLeftData?.data?.locationTraitRL);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.clearanceRL
            && Array.isArray(RulesLocationLeftData?.data?.clearanceRL)
        ) {
            setClearanceRl(RulesLocationLeftData?.data?.clearanceRL);
            setclearanceRLData(RulesLocationLeftData?.data?.clearanceRL)
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.statusRL
            && Array.isArray(RulesLocationLeftData?.data?.statusRL)
        ) {
            setStatusRl(RulesLocationLeftData?.data?.statusRL);
            setStatusRLData(RulesLocationLeftData?.data?.statusRL)
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.tableLocData) {
            if (RulesLocationLeftData?.data?.tableLocData.status === 500) {
                setOpenDialogRL(true);
                setDialogDataRL(String(RulesLocationLeftData?.data?.tableLocData["message"]));
            }
            setLoadCheck(false)
        } else {
            setSearch(false);
        }
        if (allocDetails.length > 0) {
            if (allocDetails[0].ALLOC_CRITERIA === "F") {
                setCheckRL2(false);
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        ENFORCE_WH_RL: "N"
                    };
                })
            }
        }
    }, [RulesLocationLeftData?.data]);

    useEffect(() => {
        if (
            RulesLocationLeftData?.data?.ruleType
            && Array.isArray(RulesLocationLeftData?.data?.ruleType)
        ) {
            setRuleType(RulesLocationLeftData?.data?.ruleType);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.Need
            && Array.isArray(RulesLocationLeftData?.data?.Need)
        ) {
            setNeed(RulesLocationLeftData?.data?.Need);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.Hierarchy
            && Array.isArray(RulesLocationLeftData?.data?.Hierarchy)
        ) {
            setHierarchy(RulesLocationLeftData?.data?.Hierarchy);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.Allocateto
            && Array.isArray(RulesLocationLeftData?.data?.Allocateto)
        ) {
            setAllocateto(RulesLocationLeftData?.data?.Allocateto);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.updateLocationRL
            && Array.isArray(RulesLocationLeftData?.data?.updateLocationRL)
        ) {
            setUpdateLocationRL(RulesLocationLeftData?.data?.updateLocationRL);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.deleteLocationRL
            // && Array.isArray(RulesLocationLeftData?.data?.deleteLocationRL)
        ) {
            setDeleteLocationRL(RulesLocationLeftData?.data?.deleteLocationRL);
            setLoading(false);
            setLoadCheck(false)
        } else if (
            RulesLocationLeftData?.data?.loadWeightChangeRL
            // && Array.isArray(RulesLocationLeftData?.data?.loadWeightChangeRL)
        ) {
            // ////console.log("loadWeightChangeRL", RulesLocationLeftData?.data?.loadWeightChangeRL);
            if (RulesLocationLeftData?.data?.loadWeightChangeRL?.status === 500) {
                setLoadWeightChangeRL([])
            }
            else {
                setLoadWeightChangeRL(RulesLocationLeftData?.data?.loadWeightChangeRL);
            }
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.loadRuledateRL
            && Array.isArray(RulesLocationLeftData?.data?.loadRuledateRL)
        ) {
            setLoadRuledateRL(RulesLocationLeftData?.data?.loadRuledateRL);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.retrieveRuleDateRL
            && Array.isArray(RulesLocationLeftData?.data?.retrieveRuleDateRL)
        ) {
            setRetrieveRuleDateRL(RulesLocationLeftData?.data?.retrieveRuleDateRL);
            setRetrieveRuleDateRLSample(RulesLocationLeftData?.data?.retrieveRuleDateRL);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.updateChangeWeightsRL
            // && Array.isArray(RulesLocationLeftData?.data?.updateChangeWeightsRL)
        ) {
            setUpdateChangeWeightsRL(RulesLocationLeftData?.data?.updateChangeWeightsRL);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.updateRulesRL
            && Array.isArray(RulesLocationLeftData?.data?.updateRulesRL)
        ) {
            setUpdateRulesRL(RulesLocationLeftData?.data?.updateRulesRL);
            setLoading(false);
        } else {
            setSearch(false);
        }
    }, [RulesLocationLeftData?.data]);

    // const [checked, setChecked] = React.useState(false);


    if (allDataCheck && allData.length > 0) {
        // const tempLoc = []
        // allData.map((obj) => { tempLoc.push(obj.LOC) })
        // const temp = totalData.filter(item => !tempLoc.includes(item.LOC))
        const tempLoc1 = []
        totalData.map((obj) => { tempLoc1.push(obj.LOC) })
        const temp1 = allData.filter(item => !tempLoc1.includes(item.LOC))
        //  [...temp1, ...totalData]
        const temp2 = stableSort1([...temp1, ...totalData], getComparator1("asc", "LOC"))
        // temp2.slice().sort((a, b) => ////console.log("totalData 3:", a, b));
        // ////console.log("totalData 2:", temp2);
        setTotalData(temp2)
        setTableLocData(temp2)
        setAllDataCheck(false)
        setLoadCheck(false)

    }

    const [AllocRuleData, setAllocRuleData] = useState({})
    const [AllocRuleDataCheck, setAllocRuleDataCheck] = useState(true)
    const [RetrieveDataCheck, setRetrieveDataCheck] = useState(false);

    if (updateRulesRL.length > 0 && AllocRuleDataCheck) {
        updateRulesRL.map(item => setAllocRuleData(item))
        setAllocRuleDataCheck(false)
        setRetrieveDataCheck(true)
    }

    if (Object.keys(AllocRuleData).length > 0 && RetrieveDataCheck && ruleType.length > 0
        && Hierarchy.length > 0 && Need.length > 0 && Allocateto.length > 0) {
        if (AllocRuleData.REGULAR_SALES_IND === "N") {
            setCheck1(false)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    REGULAR_SALES_IND: "N"
                };
            })
        } else if (AllocRuleData.REGULAR_SALES_IND === "Y") {
            setCheck1(true)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    REGULAR_SALES_IND: "Y"
                };
            })
        }

        if (AllocRuleData.PROMO_SALES_IND === "N") {
            setCheck2(false)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    PROMO_SALES_IND: "N"
                };
            })
        } else if (AllocRuleData.PROMO_SALES_IND === "Y") {
            setCheck2(true)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    PROMO_SALES_IND: "Y"
                };
            })
        }

        if (AllocRuleData.CLEARANCE_SALES_IND === "N") {
            setCheck3(false)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    CLEARANCE_SALES_IND: "N"
                };
            })
        } else if (AllocRuleData.CLEARANCE_SALES_IND === "Y") {
            setCheck3(true)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    CLEARANCE_SALES_IND: "Y"
                };
            })
        }


        if (AllocRuleData.SIZE_PROFILE_IND === "N") {
            setCheck4(false)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    SIZE_PROFILE_IND: "N"
                };
            })
        } else if (AllocRuleData.SIZE_PROFILE_IND === "Y") {
            setCheck4(true)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    SIZE_PROFILE_IND: "Y"
                };
            })
        }


        if (AllocRuleData.ENFORCE_PRES_MIN_IND === "N") {
            setCheck5(false)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ENFORCE_PRES_MIN_IND: "N"
                };
            })
        } else if (AllocRuleData.ENFORCE_PRES_MIN_IND === "Y") {
            setCheck5(true)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ENFORCE_PRES_MIN_IND: "Y"
                };
            })
        }
        if (AllocRuleData.WH_STORE_REL_IND === "N") {
            setCheckRL2(false)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ENFORCE_WH_RL: "N"
                };
            })
        } else if (AllocRuleData.WH_STORE_REL_IND === "Y") {
            setCheckRL2(true)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ENFORCE_WH_RL: "Y"
                };
            })
        }

        if (String(AllocRuleData["WEEKS_LAST_YEAR"]).length > 0) {
            setCheck6(true);
            setLeftContData((prev) => {
                return {
                    ...prev,
                    WEEKS_LAST_YEAR: AllocRuleData["WEEKS_LAST_YEAR"],
                };
            })
        }
        if (String(AllocRuleData["WEEKS_LAST_YEAR"]).length === 0) {
            setCheck6(true);
            setLeftContData((prev) => {
                return {
                    ...prev,
                    WEEKS_LAST_YEAR: "",
                };
            })
        }

        if (String(AllocRuleData["WEEKS_THIS_YEAR"]).length > 0) {
            setCheck6(true);
            setLeftContData((prev) => {
                return {
                    ...prev,
                    WEEKS_THIS_YEAR: AllocRuleData["WEEKS_THIS_YEAR"],
                };
            })
        }
        if (String(AllocRuleData["WEEKS_THIS_YEAR"]).length === 0) {
            setCheck6(true);
            setLeftContData((prev) => {
                return {
                    ...prev,
                    WEEKS_THIS_YEAR: "",
                };
            })
        }
        if (String(AllocRuleData["WEEKS_THIS_YEAR"]).length === 0 && String(AllocRuleData["WEEKS_LAST_YEAR"]).length === 0) {
            setCheck6(false);
            setLeftContData((prev) => {
                return {
                    ...prev,
                    WEEKS_THIS_YEAR: "",
                    WEEKS_LAST_YEAR: "",
                };
            })
        }

        if (String(AllocRuleData["START_DATE1"]).length > 0 || String(AllocRuleData["END_DATE1"]).length > 0 ||
            String(AllocRuleData["START_DATE2"]).length > 0 || String(AllocRuleData["END_DATE2"]).length > 0) {
            setCheck9(true);
            if (String(AllocRuleData["START_DATE1"]).length > 0) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        START_DATE1: String(AllocRuleData["START_DATE1"]),
                    };
                })
                setStartd1(String(AllocRuleData["START_DATE1"]))
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        START_DATE1: "",
                    };
                })
                setStartd1("")
            }

            if (String(AllocRuleData["END_DATE1"]).length > 0) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        END_DATE1: String(AllocRuleData["END_DATE1"]),
                    };
                })
                setEndd1(String(AllocRuleData["END_DATE1"]))
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        END_DATE1: "",
                    };
                })
                setEndd1("")
            }

            if (String(AllocRuleData["START_DATE2"]).length > 0) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        START_DATE2: String(AllocRuleData["START_DATE2"]),
                    };
                })
                setStartd2(String(AllocRuleData["START_DATE2"]))
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        START_DATE2: "",
                    };
                })
                setStartd2("")
            }

            if (String(AllocRuleData["END_DATE2"]).length > 0) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        END_DATE2: String(AllocRuleData["END_DATE2"]),
                    };
                })
                setEndd2(String(AllocRuleData["END_DATE2"]))
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        END_DATE2: "",
                    };
                })
                setEndd2("")
            }
        }
        if (String(AllocRuleData["START_DATE1"]).length === 0 && String(AllocRuleData["END_DATE1"]).length === 0 &&
            String(AllocRuleData["START_DATE2"]).length === 0 && String(AllocRuleData["END_DATE2"]).length === 0) {
            setCheck9(false);
            setLeftContData((prev) => {
                return {
                    ...prev,
                    START_DATE1: "",
                    END_DATE1: "",
                    START_DATE2: "",
                    END_DATE2: "",
                };
            })
            setStartd1("")
            setEndd1("")
            setStartd2("")
            setEndd2("")
        }

        if (String(AllocRuleData["ON_ORDER_COMMIT_WEEKS"]).length > 0) {
            setCheck7(true)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ON_ORDER_COMMIT_WEEKS: String(AllocRuleData["ON_ORDER_COMMIT_WEEKS"]),
                };
            })
        }
        if (String(AllocRuleData["ON_ORDER_COMMIT_WEEKS"]).length === 0) {
            setCheck7(false)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ON_ORDER_COMMIT_WEEKS: "",
                };
            })
        }

        if (String(AllocRuleData["ON_ORDER_COMMIT_DATE"]).length > 0) {
            setCheck8(true)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ON_ORDER_COMMIT_DATE: String(AllocRuleData.ON_ORDER_COMMIT_DATE),
                };
            })
        }
        if (String(AllocRuleData["ON_ORDER_COMMIT_DATE"]).length === 0) {
            setCheck8(false)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ON_ORDER_COMMIT_DATE: "",
                };
            })
        }

        if (String(AllocRuleData["RULE_TYPE"]).length > 0) {
            const temp = ruleType.filter(item => item.CODE === String(AllocRuleData["RULE_TYPE"]))
            if (temp.length > 0) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        RULE_TYPE: temp[0].CODE_DESC,
                    };
                })
            }
        }

        if (String(AllocRuleData["EXACT_IND"]).length > 0) {
            const temp = Need.filter(item => item.CODE === String(AllocRuleData["EXACT_IND"]))
            if (temp.length > 0) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        EXACT_IND_VAL: temp[0].CODE_DESC,
                        EXACT_IND: temp[0].CODE,
                    };
                })
            }
        }

        if (String(AllocRuleData["NET_NEED_IND"]).length > 0) {
            const temp = Allocateto.filter(item => item.CODE === String(AllocRuleData["NET_NEED_IND"]))
            if (temp.length > 0) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        NET_NEED_IND_VAL: temp[0].CODE_DESC,
                        NET_NEED_IND: temp[0].CODE,
                    };
                })
            }
        }

        if (String(AllocRuleData["RULE_LEVEL"]).length > 0) {
            const temp = Hierarchy.filter(item => item.CODE === String(AllocRuleData["RULE_LEVEL"]))
            if (temp.length > 0) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        RULE_LEVEL: temp[0].CODE_DESC,
                    };
                })
            }
        }

        setRetrieveDataCheck(false)
        setAllRetreieveRLdataCheck(false)
    }


    //To open dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setValidCheckOnce(true);

        if (String(leftContData.WEEKS_LAST_YEAR).length > 0 ||
            String(leftContData.WEEKS_THIS_YEAR).length > 0 ||
            (String(leftContData.START_DATE1).length > 0 && String(leftContData.END_DATE1).length > 0) ||
            (String(leftContData.START_DATE2).length > 0 && String(leftContData.END_DATE2).length > 0)
        ) {
            setUpdateRulesRL([]);
            dispatch(getUPDATERULESRLRLRequest([leftContData]));
            setOpen(true)
            setValidCheckOnce(false)
            // setValidCheck(true)

        }
        else {
            setOpenDialogRL(true);
            setDialogDataRL("TY/LY or STARTDATE 1 and ENDDATE 1 OR STARTDATE 2 and ENDDATE 2 Inputs required*");
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const HandleSaveChanges = () => {
        dispatch(getUPDATECHANGEWEIGHTSRLRequest(updateRulesRL));
        setOpen(false);
        // setRetrieveRuleDateRLCheck(true);
    }

    const handleRefreshRules = (e) => {
        setStartd1("");
        setStartd2("");
        setEndd1("");
        setEndd2("");
        setCheck1(true);
        setCheck2(true);
        setCheck3(false);
        setCheck4(false);
        setCheck5(false);
        setCheck6(false);
        setCheck7(false);
        setCheck8(false);
        setCheck9(false);
        setStrt1("");
        setStrt2("");
        setEnd1("");
        setEnd2("");
        setThisY("");
        setLastY("");
        setValidDefaultCheck(true)

        dispatch(getDELETELOCATIONRLRequest([allocNoData]));
        setLoading(false);
        setSearchData(initialsearch);
        setTableLocData([]);
        setSelected([]);
        setInputValue([]);
        setSampleVal([]);
        setCheckRL1(false);
        // setCheckRL2(true);
        setCheckStore(false);
        setValLoc([]);
        setValLoc1([]);
        setValLoc2([]);
        setValLoc3([]);
        setInputLoc("");
        setInputLoc1("");
        setInputLoc2("");
        setInputLoc3("");
        setSwitchTableData([]);
        setTotalData([]);
        setSelectedRow(null);
        setLeftContData((prev) => {
            return {
                ...prev,
                RULE_LEVEL: "Sku",
                EXACT_IND_VAL: "Exact",
                RULE_TYPE: "History",
                NET_NEED_IND_VAL: "Net Need",
                REGULAR_SALES_IND: "Y",
                PROMO_SALES_IND: "Y",
                CLEARANCE_SALES_IND: "N",
                USESIZEPROFILE: "N",
                ENFORCE_PRES_MIN_IND: "Y",
                START_DATE1: "",
                END_DATE1: "",
                START_DATE2: "",
                END_DATE2: "",
                WEEKS_THIS_YEAR: "",
                WEEKS_LAST_YEAR: "",
                ON_ORDER_COMMIT_WEEKS: "",
                ON_ORDER_COMMIT_DATE: "",
                // EXACT_IND_VAL: "",
                // NET_NEED_IND_VAL: "",
                CHANGEWEIGHTSCHECK: "N",
            };
        });
        if (allocDetails.length > 0) {
            if (allocDetails[0].ALLOC_CRITERIA === "F") {
                setCheckRL2(false);
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        ENFORCE_WH_RL: "N"
                    };
                })
            } else {
                setCheckRL2(true);
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        ENFORCE_WH_RL: "Y"
                    };
                })
            }
        }
    }


    const handleswitchRulecheck = (e, val) => {
        ////console.log("handleswitchRulecheck1", e, val)
        if (e.target.name === "check1") {
            setCheck1(val)
            if (val) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        REGULAR_SALES_IND: "Y"
                    };
                })
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        REGULAR_SALES_IND: "N"
                    };
                })
            }
        }
        if (e.target.name === "check2") {
            setCheck2(val)
            if (val) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        PROMO_SALES_IND: "Y"
                    };
                })
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        PROMO_SALES_IND: "N"
                    };
                })
            }
        }
        if (e.target.name === "check3") {
            setCheck3(e.target.checked)
            if (e.target.checked) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        CLEARANCE_SALES_IND: "Y"
                    };
                })
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        CLEARANCE_SALES_IND: "N"
                    };
                })
            }
        }
        if (e.target.name === "check4") {
            setCheck4(val)
            if (val) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        SIZE_PROFILE_IND: "Y"
                    };
                })
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        SIZE_PROFILE_IND: "N"
                    };
                })
            }
        }
        if (e.target.name === "check5") {
            setCheck5(val)
            if (val) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        ENFORCE_PRES_MIN_IND: "Y"
                    };
                })
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        ENFORCE_PRES_MIN_IND: "N"
                    };
                })
            }
        }
        if (e.target.name === "check6") {
            // ////console.log(123456)
            setCheck6(true);
            setCheck9(false);
        }
        if (e.target.name === "check7") {
            setCheck7(val)
            // setCheck8(!val)
        }
        if (e.target.name === "check8") {
            setCheck8(val)
            // setCheck7(!val)
        }
        if (e.target.name === "check9") {
            setCheck9(true)

        }
        if (e.target.name === "WEEKS_THIS_YEAR") {
            if (e.target.value < 0) {
                setOpenDialogRL(true);
                setDialogDataRL("Invalid Weeks TY/LY values");
                setLeftContData((prev) => { return { ...prev, WEEKS_THIS_YEAR: 0, END_DATE1: "", END_DATE2: "", START_DATE1: "", START_DATE2: "" } })
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        WEEKS_THIS_YEAR: e.target.value,
                        END_DATE1: "",
                        END_DATE2: "",
                        START_DATE1: "",
                        START_DATE2: "",
                    };
                })
            }
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "WEEKS_LAST_YEAR") {
            if (e.target.value < 0) {
                setOpenDialogRL(true);
                setDialogDataRL("Invalid Weeks TY/LY values");
                setLeftContData((prev) => { return { ...prev, WEEKS_LAST_YEAR: 0, END_DATE1: "", END_DATE2: "", START_DATE1: "", START_DATE2: "" } })
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        WEEKS_LAST_YEAR: e.target.value,
                        END_DATE1: "",
                        END_DATE2: "",
                        START_DATE1: "",
                        START_DATE2: "",
                    };
                })
            }
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "START_DATE1") {
            let dayOfWeek = 6;
            let date = new Date(e.target.value);
            let diff = date.getDay() - dayOfWeek;
            if (diff > 0) {
                date.setDate(date.getDate() + 7);
            }
            else if (diff < 0) {
                date.setDate(date.getDate() + ((-1) * diff))
            }
            if (e.target.value) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        START_DATE1: date.toISOString().split('T')[0],
                        WEEKS_THIS_YEAR: "",
                        WEEKS_LAST_YEAR: "",
                    };
                })
            }
            else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        START_DATE1: e.target.value,
                        WEEKS_THIS_YEAR: "",
                        WEEKS_LAST_YEAR: "",
                    };
                })
            }
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "START_DATE2") {
            let dayOfWeek = 6;
            let date = new Date(e.target.value);
            let diff = date.getDay() - dayOfWeek;
            if (diff > 0) {
                date.setDate(date.getDate() + 7);
            }
            else if (diff < 0) {
                date.setDate(date.getDate() + ((-1) * diff))
            }
            if (e.target.value) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        START_DATE2: date.toISOString().split('T')[0],
                        WEEKS_THIS_YEAR: "",
                        WEEKS_LAST_YEAR: "",
                    };
                })
            }
            else {

                setLeftContData((prev) => {
                    return {
                        ...prev,
                        START_DATE2: e.target.value,
                        WEEKS_THIS_YEAR: "",
                        WEEKS_LAST_YEAR: "",
                    };
                })
            }
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "END_DATE1") {
            let dayOfWeek = 6;
            let date = new Date(e.target.value);
            let diff = date.getDay() - dayOfWeek;
            if (diff > 0) {
                date.setDate(date.getDate() + 7);
            }
            else if (diff < 0) {
                date.setDate(date.getDate() + ((-1) * diff))
            }
            if (e.target.value) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        END_DATE1: date.toISOString().split('T')[0],
                        WEEKS_THIS_YEAR: "",
                        WEEKS_LAST_YEAR: "",
                    };
                })
            }
            else {

                setLeftContData((prev) => {
                    return {
                        ...prev,
                        END_DATE1: e.target.value,
                        WEEKS_THIS_YEAR: "",
                        WEEKS_LAST_YEAR: "",
                    };
                })
            }
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "END_DATE2") {
            let dayOfWeek = 6;
            let date = new Date(e.target.value);
            let diff = date.getDay() - dayOfWeek;
            if (diff > 0) {
                date.setDate(date.getDate() + 7);
            }
            else if (diff < 0) {
                date.setDate(date.getDate() + ((-1) * diff))
            }
            if (e.target.value) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        END_DATE2: date.toISOString().split('T')[0],
                        WEEKS_THIS_YEAR: "",
                        WEEKS_LAST_YEAR: "",
                    };
                })
            }
            else {

                setLeftContData((prev) => {
                    return {
                        ...prev,
                        END_DATE2: e.target.value,
                        WEEKS_THIS_YEAR: "",
                        WEEKS_LAST_YEAR: "",
                    };
                })
            }
            setRetrieveRuleDateRL([]);
        }
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
        if (e.target.name === "ON_ORDER_COMMIT_DATE") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ON_ORDER_COMMIT_DATE: e.target.value,
                    ON_ORDER_COMMIT_WEEKS: "",
                };
            })
        }
    }

    /////////////////////////////
    /////////////////////
    /////////////////////
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
                        RULE_TYPE: val.CODE_DESC
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
                    setStrt1("");
                    setStrt2("");
                    setEnd1("");
                    setEnd2("");
                    setThisY("");
                    setLastY("");
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
        // ////console.log("value,e", val)
        if (val) {
            if (val.CODE_DESC === "Proportional") {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        EXACT_IND: "N",
                        EXACT_IND_VAL: val.CODE_DESC
                    };
                });
            }
            else if (val.CODE_DESC === "Exact") {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        EXACT_IND: "Y",
                        EXACT_IND_VAL: val.CODE_DESC
                    };
                });
            }
        }
        else {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    EXACT_IND: ""
                };
            });
        }
    }

    const selectHierarchy = (val) => {
        // ////console.log("e::555566", val)
        if (val) {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    RULE_LEVEL: val.CODE_DESC
                };
            });
        }
        else {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    RULE_LEVEL: ""
                };
            });
        }
    }

    const selectAllocateTo = (val) => {
        // ////console.log("value,e", val)
        if (val) {
            if (val.CODE_DESC === "Net Need") {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        NET_NEED_IND: "Y",
                        NET_NEED_IND_VAL: val.CODE_DESC
                    };
                });
            }
            else if (val.CODE_DESC === "Gross Need") {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        NET_NEED_IND: "N",
                        NET_NEED_IND_VAL: val.CODE_DESC
                    };
                });
            }
        }
        else {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    NET_NEED_IND: "",
                    NET_NEED_IND_VAL: ""
                };
            });
        }
    }


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


    function EnhancedTableHead1(props) {
        const { onSelectAllClick, order1, orderBy1, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead className={RulesLocationLeftClasses.TitleHead}>
                    <TableRow >
                        {WeightsHeader.map((headCell) => (
                            <StyledTableCell
                                key={headCell.id}
                                className={RulesLocationLeftClasses.TableCell}
                                size="small"
                                sortDirection={orderBy1 === headCell.id ? order1 : false}
                                style={{
                                    whiteSpace: "nowrap"
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
                                    {orderBy1 === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
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

    EnhancedTableHead1.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        // onSelectAllClick: PropTypes.func.isRequired,
        order1: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy1: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    function EnhancedTableToolbar1(props) {
        const { numSelected } = props;
        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(updateRulesRL.length > 0 &&
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
                {updateRulesRL.length > 0 && (
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
                        Rows: {updateRulesRL.length}
                    </Typography>
                )}
            </Toolbar>
        );
    }

    function descendingComparator1(a, b, orderBy1) {
        let c, d;
        if (orderBy1 == "EOW") {
            c = (b[orderBy1]);
            d = (a[orderBy1]);
        } else {
            c = isNaN(b[orderBy1]) ? b[orderBy1] : parseInt(b[orderBy1]);
            d = isNaN(a[orderBy1]) ? a[orderBy1] : parseInt(a[orderBy1]);
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


    function getComparator1(order1, orderBy1) {
        return order1 === 'desc'
            ? (a, b) => descendingComparator1(a, b, orderBy1)
            : (a, b) => -descendingComparator1(a, b, orderBy1);
    }
    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly
    function stableSort1(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order1 = comparator(a[0], b[0]);
            if (order1 !== 0) {
                return order1;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const handleRequestSort1 = (event, property) => {
        const isAsc = (orderBy1 === property && order1 === 'asc');
        setOrder1(isAsc ? 'desc' : 'asc');
        setOrderBy1(property);
    };

    const onTableChange = (e, value) => {
        // ////console.log("retrieveRuleDateRL33:", value, e, e.target.name, e.target.value, retrieveRuleDateRL);
        // setRetrieveRuleDateRLSample([])
        {
            updateRulesRL.map((row) => {
                // ////console.log("retrieveRuleDateRL11:", row);
                if (row.EOW_DATE === value) {
                    row[e.target.name] = e.target.value
                    // ////console.log("retrieveRuleDateRL22:", row);
                }
            })
        }
        // setRetrieveRuleDateRL(retrieveRuleDateRL)
        setUpdateRulesRL(updateRulesRL)

    };

    const [TotalDataCheck, setTotalDataCheck] = useState(false);

    const HandleAddButton = () => {
        // setTotalData([]);
        // setTableLocData([]);
        if (checkStore) {
            setLoading(true);
            setLoadCheck(true)
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
        // setCheckStore(false)
    }

    if (TotalDataCheck && totalData.length > 0) {
        if (totalData.length > 0) {
            setCheckStore(false)
            setSearchData((prev) => {
                return {
                    ...prev,
                    ALL_STORE: "N",
                };
            });
        } else if (totalData.length === 0) {
            setOpenDialogRL(true);
            setDialogDataRL(String(RulesLocationLeftData?.data?.totalData?.message));
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

        setLocationRl(stableSort1(locationRL, getComparator1("asc", "STORE")))
        setLocationListRl(stableSort1(locationListRL, getComparator1("asc", "LOC_LIST")))
        setLocationTraitRl(stableSort1(locationTraitRL, getComparator1("asc", "LOC_TRAIT")))
        setLocationExculdeRl(stableSort1(locationRL, getComparator1("asc", "STORE")))
        // ////console.log("temp5:",temp5);
    }

    const selectLocation = (event, value) => {
        ////console.log("selectLocation: ", event, value);

        let updatedData = []
        let selectedLocOptions = []
        event.map((res) => {
            selectedLocOptions.push(res.STORE)
        })
        updatedData = locationRL.filter((res) => !selectedLocOptions.includes(res.STORE))
        updatedData = [...event, ...updatedData];
        setLocationRl(updatedData)
        // setSelectedLoc(event);

        let selectedLocation = [];
        if (value.option) {
            valLoc.push(value.option);
            // if (value.option.LOCATION===parseInt(inputLoc)){ 
            //   ////////////console.log(1234)
            //   setInputLoc("");
            // }
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
            setCheckStore(false);
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
        // setSelectedLocList(event)
        let selectedLocationlist = [];
        if (value.option) {
            valLoc1.push(value.option);
            // if (value.option.LOCATION===parseInt(inputLoc)){ 
            //   ////////////console.log(1234)
            //   setInputLoc("");
            // }
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
            setCheckStore(false);
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
            ////////console.log("clear:")
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
        // ////console.log("1284");
        let updatedLocationtraitsData = []
        let selectedLocationtraitsOptions = []
        event.map((res) => {
            selectedLocationtraitsOptions.push(res.LOC_TRAIT)
        })
        updatedLocationtraitsData = locationTraitRL.filter((res) => !selectedLocationtraitsOptions.includes(res.LOC_TRAIT))
        updatedLocationtraitsData = [...event, ...updatedLocationtraitsData];
        setLocationTraitRl(updatedLocationtraitsData)
        ////////console.log("event:", event)
        ////////console.log("value:", value)
        //setSelectedLoctrait(event)
        let selectedLocationtraits = [];
        if (value.option) {
            valLoc2.push(value.option);
            // if (value.option.LOCATION===parseInt(inputLoc)){ 
            //   ////////////console.log(1234)
            //   setInputLoc("");
            // }
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
            setCheckStore(false);
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
            ////////console.log("clear:")
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
        // let updatedExcludedlocationData = []
        // let selectedExcludedlocationOptions = []
        // event.map((res) => {
        //     selectedExcludedlocationOptions.push(res.STORE)
        // })
        // updatedExcludedlocationData = locationExculdeRL.filter((res) => !selectedExcludedlocationOptions.includes(res.STORE))
        // updatedExcludedlocationData = [...event, ...updatedExcludedlocationData];
        // setLocationExculdeRl(updatedExcludedlocationData)
        let updatedData = []
        let selectedLocOptions = []
        event.map((res) => {
            selectedLocOptions.push(res.STORE)
        })
        updatedData = locationRL.filter((res) => !selectedLocOptions.includes(res.STORE))
        updatedData = [...event, ...updatedData];
        setLocationRl(updatedData)

        ////////console.log("event:", event)
        ////////console.log("value:", value)
        //setSelectedExcluded(event)
        let selectedExcluded_list = [];
        if (value.option) {
            valLoc3.push(value.option);
            // if (value.option.LOCATION===parseInt(inputLoc)){ 
            //   ////////////console.log(1234)
            //   setInputLoc("");
            // }
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
            ////////console.log("clear:")
            initialsearch.EXCLUDE_LOCATION = "";
            setSearchData((prev) => {
                return {
                    ...prev,
                    EXCLUDE_LOCATION: [],
                };
            });
        }
    }

    const deleteRecords = () => {
        // ////console.log("selected:1:", selected, switchTableData);
        setLoadCheck(true)
        const loc_ids = selected;
        var data = [];
        if (totalData.length > 0) {
            data.push(...totalData);
        }
        // else if (switchTableData.length > 0) {
        //     data.push(...switchTableData);
        // }

        if (data.length > 0) {
            const updatedTable = data.filter((val) => {
                return loc_ids.includes(val.LOC);
            });
            const updateRows = data.filter((val) => {
                return !loc_ids.includes(val.LOC);

            });
            const delRows = data
            // ////console.log("selected:@:2:", delRows, updatedTable)
            var temp = {}
            temp["ALLOC_NO"] = searchData.ALLOC_NO
            temp["LOC_LIST"] = selected
            // ////console.log("ksarjaadasdadadas::", temp);
            if (delRows.length > 0) {

                dispatch(getDELETELOCATIONRLRequest([temp]));

                //dispatch(getDELETELOCATIONRLRequest([delRows]));
            }

            const temp1 = tableLocData.filter((row) => {
                return !loc_ids.includes(row.LOC);
            }
            )
            setTotalData(updateRows);
            setTableLocData(temp1);
            setSelected([]);
        }




        // const id = selected;
        // const data = [...totalData];
        // const updatedTable = data.filter((val) => {
        //   return !id.includes(val.SR_NO);
        // });
        // // //////////console.log("updatedTable:",updatedTable)
        // setTabledata(updatedTable)
        // setTotalData(updatedTable)
        // dispatch(getDELETECREATEGRIDRequest(selData));
        // setSelected([]);
        // setSelData([]);

    };

    const LocationTopPart = () => (

        <div className={RulesLocationLeftClasses.header_container}>
            <div className={RulesLocationLeftClasses.header_child}>
                <div>
                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
                        Location</InputLabel>
                </div>
                <div>
                    <Select
                        isDisabled={checkStore || ApproveFreeseCheck}
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
                        // sx={{ width: "100%" }}

                        styles={styleSelect6}
                        value={locationRL.filter(obj => searchData?.LOCATION.includes(obj.STORE))}
                        components={animatedComponents}
                    />
                </div>
            </div>

            <div className={RulesLocationLeftClasses.header_child}>
                <div>
                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
                        Location List</InputLabel>
                </div>
                <div>
                    <Select
                        isDisabled={checkStore || ApproveFreeseCheck}
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
                        // sx={{ width: "100%" }}
                        styles={styleSelect6}
                        value={locationListRL.filter(obj => searchData?.LOCATION_LIST.includes(obj.LOC_LIST))}
                        components={animatedComponents}
                    />
                </div>
            </div>

            <div className={RulesLocationLeftClasses.header_child}>
                <div>
                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
                        Location Attribute</InputLabel>
                </div>
                <div>
                    <Select
                        isDisabled={checkStore || ApproveFreeseCheck}
                        maxMenuHeight={180}
                        classNamePrefix="mySelect"
                        getOptionLabel={option =>
                            `${option.LOC_TRAIT.toString()} - ${option.TRAIT_DESC.toString()}`}
                        getOptionValue={option => option.LOC_TRAIT}
                        options={locationTraitRL.length > 0 ? locationTraitRL : []}
                        isSearchable={true}
                        onChange={selectLocationtraits}
                        menuPlacement="auto"
                        //isSearchable={!readOnly}
                        //menuIsOpen={readOnly ? false : undefined}
                        isMulti
                        isClearable={true}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        // sx={{ width: "100%" }}
                        value={locationTraitRL.filter(obj => searchData?.LOCATION_TRAIT.includes(obj.LOC_TRAIT))}
                        styles={styleSelect6}
                        components={animatedComponents}
                    />
                </div>
            </div>


            <div className={RulesLocationLeftClasses.header_child}>
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
                            // sx={{ width: "100%" }}
                            value={locationRL.filter(obj => searchData?.EXCLUDE_LOCATION.includes(obj.STORE))}
                            styles={styleSelect6}
                            components={animatedComponents}
                        />

                    </div>
                </div>
            </div>

            <div className={RulesLocationLeftClasses.header_child} >
                <div>
                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
                        Location Template :</InputLabel>
                </div>
                <div>
                    <Select
                        maxMenuHeight={180}
                        classNamePrefix="mySelect"
                        getOptionLabel={option =>
                            `${option.label.toString()}`}
                        getOptionValue={option => option.label}
                        options={optionsTemplates.length > 0 ? optionsTemplates : []}
                        isSearchable={true}
                        menuPlacement="auto"
                        isMulti
                        isClearable={true}
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                        isDisabled={ApproveFreeseCheck}
                        // sx={{ width: "100%" }}
                        styles={styleSelect6}
                        components={animatedComponents}
                    />
                </div>
            </div>

            <div className={RulesLocationLeftClasses.header_child}>
                <div className={RulesLocationLeftClasses.header_child}>
                    <Button
                        sx={{
                            fontSize: "10px",
                            margin: "15px 0px 0px 0px",
                            padding: "5px",
                            '&.Mui-disabled': {
                                opacity: 0.5,
                                backgroundColor: 'DodgerBlue',
                                color: '#fff',
                            },
                        }}
                        startIcon={<OfflinePinIcon sx={{ padding: 0 }} />}
                        variant="contained"
                        disabled={ApproveFreeseCheck}
                    >
                        Apply
                    </Button>
                </div>
                <div className={RulesLocationLeftClasses.header_child}>
                    <Button
                        sx={{
                            fontSize: "10px",
                            margin: "15px 0px 0px 0px",
                            padding: "5px",
                            '&.Mui-disabled': {
                                opacity: 0.5,
                                backgroundColor: 'DodgerBlue',
                                color: '#fff',
                            },
                        }}
                        startIcon={<SaveIcon sx={{ padding: 0 }} />}
                        variant="contained"
                        disabled={ApproveFreeseCheck}
                    >
                        Save Template
                    </Button>
                </div>
            </div>
        </div>
    )

    const handleswitchcheck = (e, val) => {
        // ////console.log("leftContData gtgtgt ", e, val);
        if (e.target.name === "check1") {
            setCheckStore(true)
            setCheckRL1(val)
            if (val === true) {
                setSearchData((prev) => {
                    return {
                        ...prev,
                        ALL_STORE: "Y",
                        // LOCATION: [],
                        // LOCATION_LIST: [],
                        // LOCATION_TRAIT: [],
                    };
                });

                // ////console.log()
            }
            else {
                setCheckStore(false);
                setSearchData((prev) => {
                    return {
                        ...prev,
                        ALL_STORE: "N",
                    };
                });
            }

        }
        if (e.target.name === "check2") {
            // ////console.log("val:1: ", val, e.target.name);
            setCheckRL2(val)
            if (val) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        ENFORCE_WH_RL: "Y"
                    };
                })
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        ENFORCE_WH_RL: "N"
                    };
                })
            }

        }
        //////console.log("agsfdjgafdljahgdkjahda::",e.target.name,e.target.value,val);
    }

    function EnhancedTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>

                <TableHead className={RulesLocationRightClasses.TitleHead}>
                    <TableRow >
                        <StyledTableCell padding="checkbox" style={{
                            whiteSpace: "nowrap", padding: "0px",
                        }}
                        >
                            <Checkbox
                                color="primary"
                                size="small"
                                disabled={ApproveFreeseCheck}
                                indeterminate={selected.length > 0 && selected.length < totalData.length}
                                checked={totalData.length > 0 && selected.length === totalData.length}
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
                                // className={RulesLocationRightClasses.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap", paddingLeft: "3px",
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
        ////console.log("sort:2112:", a, b, orderBy);
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
        else if (orderBy == "RELEASE_DATE" || orderBy == "CLEARANCE_IND" || orderBy == "ITEM_LOC_STATUS") {

            c = (b[orderBy]);
            d = (a[orderBy]);
            // c = isNaN(c) ? 0 : parseInt(c);
            // d = isNaN(d) ? 0 : parseInt(d);
            ////console.log("krishnasort123", c, d)
        }
        else {
            c = isNaN(b[orderBy]) ? b[orderBy] : parseInt(b[orderBy]);
            d = isNaN(a[orderBy]) ? a[orderBy] : parseInt(a[orderBy]);
        }
        ////console.log("sort heck", typeof (c), d)
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
                const sortedData = stableSort(totalData, getComparator("asc", sortValue));
                setTotalData(sortedData);
            }
            if (order === "desc") {
                const sortedData = stableSort(totalData, getComparator("desc", sortValue));
                setTotalData(sortedData);
            }
            setSortCheck(false)
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

    const handleSelectAllClick = (event) => {
        ////////console.log("event::",event)
        if (event.target.checked && selected.length === 0) {
            const newSelected = totalData.map((n) => n.LOC);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleSingleClick = (event, name) => {
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

    ////console.log("handleLockFilter : 3:", inputValue, copyValue, LockCheck, inputValue1);

    const testChange1 = (e, name) => {
        ////console.log("handleLockFilter : 2:", e, name, Object.is(e, null));
        if (Object.is(e, null) === false) {
            if (name === "LIKE_LOC" || name === "LIKE_LOC_DESC") {
                if (name === "LIKE_LOC") {
                    var temp = "LIKE_LOC_DESC"
                    setInputValue1((prev) => ({
                        ...prev,
                        LIKE_LOC: e.STORE,
                        LIKE_LOC_DESC: e.STORE_DESC
                    }))
                    setSampleVal((prev) => ({
                        ...prev,
                        LIKE_LOC: e.STORE,
                        LIKE_LOC_DESC: e.STORE_DESC
                    }))
                }
                if (name === "LIKE_LOC_DESC") {
                    var temp = "LIKE_LOC"
                    setInputValue1((prev) => ({
                        ...prev,
                        [name]: e.STORE_DESC,
                        [temp]: e.STORE
                    }))
                    setSampleVal((prev) => ({
                        ...prev,
                        [name]: e.STORE_DESC,
                        [temp]: e.STORE
                    }))
                }

            }
            if (name === "CLEARANCE_IND") {
                var temp = "CLEARANCE_IND_DESC"
                setInputValue1((prev) => ({
                    ...prev,
                    [name]: e.CODE,
                    [temp]: e.CODE_DESC
                }))
                setSampleVal((prev) => ({
                    ...prev,
                    [name]: e.CODE,
                    [temp]: e.CODE_DESC
                }))
            }
            if (name === "ITEM_LOC_STATUS") {
                var temp = "ITEM_LOC_STATUS_DESC"
                setInputValue1((prev) => ({
                    ...prev,
                    [name]: e.CODE,
                    [temp]: e.CODE_DESC
                }))
                setSampleVal((prev) => ({
                    ...prev,
                    [name]: e.CODE,
                    [temp]: e.CODE_DESC
                }))
            }
        }

        if (Object.is(e, null) === true) {
            if (name === "LIKE_LOC" || name === "LIKE_LOC_DESC") {
                if (name === "LIKE_LOC") {
                    var temp = "LIKE_LOC_DESC"
                    setInputValue1((prev) => ({
                        ...prev,
                        [name]: "",
                        [temp]: ""
                    }))
                    setSampleVal((prev) => ({
                        ...prev,
                        [name]: "",
                        [temp]: ""
                    }))
                }
                if (name === "LIKE_LOC_DESC") {
                    var temp = "LIKE_LOC"
                    // ////console.log("inputValue:991119:", e, name, temp);
                    setInputValue1((prev) => ({
                        ...prev,
                        [name]: "",
                        [temp]: ""
                    }))
                    setSampleVal((prev) => ({
                        ...prev,
                        [name]: "",
                        [temp]: ""
                    }))
                }

            }
            if (name === "CLEARANCE_IND") {
                var temp = "CLEARANCE_IND_DESC"
                setInputValue1((prev) => ({
                    ...prev,
                    [name]: "",
                    [temp]: ""
                }))
                setSampleVal((prev) => ({
                    ...prev,
                    [name]: "",
                    [temp]: ""
                }))
            }
            if (name === "ITEM_LOC_STATUS") {
                var temp = "ITEM_LOC_STATUS_DESC"
                setInputValue1((prev) => ({
                    ...prev,
                    [name]: "",
                    [temp]: ""
                }))
                setSampleVal((prev) => ({
                    ...prev,
                    [name]: "",
                    [temp]: ""
                }))
            }
        }
        setSampleVal1([])

    }


    useEffect(() => {
        ////console.log("inputValue::", inputValue)
        if (inputValue) {
            for (const key in inputValue) {
                if (inputValue[key] === '') {
                    delete inputValue[key];
                }
            }
        }
        if (inputValue) {
            if (tableLocData) {
                for (const col in inputValue) {
                    var temp_dict = {}
                    ////console.log("handleLockFilter:6:6", inputValue, col, inputValue[col]);
                    if (inputValue[col].includes("&") || inputValue[col].includes("%")) {
                        inputValue[col].slice(1)
                        temp_dict[col] = inputValue[col].slice(1)
                        if (temp_dict) {
                            for (const key in temp_dict) {
                                if (temp_dict[key] === '') {
                                    delete temp_dict[key];
                                }
                            }
                        }
                        if (col === "LOC") {
                            const temp = tableLocData.filter((props) => String(props.LOC) === String(temp_dict.LOC))
                            setTotalData(temp);
                        }
                        else if (col === "LOC_DESC") {
                            const temp = tableLocData.filter((props) => String(props.LOC_DESC) === String(temp_dict.LOC_DESC))
                            setTotalData(temp);
                        }
                        else if (col === "LOC_TYPE") {
                            const temp = tableLocData.filter((props) => String(props.LOC_TYPE) === String(temp_dict.LOC_TYPE))
                            setTotalData(temp);
                        }
                        else if (col === "DEFAULT_WH") {
                            const temp = tableLocData.filter((props) => String(props.DEFAULT_WH) === String(temp_dict.DEFAULT_WH))
                            setTotalData(temp);
                        }
                        else if (col === "GROUP_ID") {
                            const temp = tableLocData.filter((props) => String(props.GROUP_ID) === String(temp_dict.GROUP_ID))
                            setTotalData(temp);
                        }
                        else if (col === "GROUP_DESC") {
                            const temp = tableLocData.filter((props) => String(props.GROUP_DESC) === String(temp_dict.GROUP_DESC))
                            setTotalData(temp);
                        }

                        // ////console.log("inputValue:3:",key);
                    }
                    else {
                        const filteredTable = tableLocData.filter((props) =>
                            Object.entries(inputValue).every(
                                ([key, val]) =>
                                    !val.length ||
                                    props[key]
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(val?.toString().toLowerCase())
                            )
                        );
                        setTotalData(filteredTable);
                    }
                }
            }
        }
        if (Object.keys(inputValue).length === 0) {
            setTotalData(tableLocData)
        }

    }, [inputValue]);
    //console.log("tableLocData::", tableLocData)
    useEffect(() => {
        //
        if (inputValue1) {
            for (const key in inputValue1) {
                if (inputValue1[key] === '') {
                    delete inputValue1[key];
                }
            }
        }
        if (inputValue1) {
            if (tableLocData.length > 0) {
                const filteredTable = tableLocData.filter((props) =>
                    Object.entries(inputValue1).every(
                        ([key, val]) =>
                            !val.length ||
                            props[key]
                                ?.toString()
                                .toLowerCase()
                                .includes(val?.toString().toLowerCase())
                    )
                );
                setTotalData(filteredTable);
            }
        }
    }, [inputValue1]);


    const handleChangeWeight = (e, name) => {
        if (e) {
            if (e.target.name === "WEIGHT_PCT") {
                setCopyValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value
                }))
            }
            if (e.target.name === "RELEASE_DATE") {
                setCopyValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value
                }))
            }
        }
    }

    const handleChangeWeight1 = (e, name) => {
        if (e) {
            if (e.target.name === "WEIGHT_PCT") {
                setInputValue1((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value
                }))
            }
            if (e.target.name === "RELEASE_DATE") {
                setInputValue1((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value
                }))
            }
        }
    }

    const handleChangeValue = (e, name) => {
        ////console.log("inputValue:11223332:", e, name, Object.is(e, null))
        // ////console.log("inputValue:8989898:", e, name, Object.is(e, null))


        if (Object.is(e, null) === false) {
            if (name.name === "LIKE_LOC" || name.name === "LIKE_LOC_DESC") {
                if (name.name === "LIKE_LOC") {
                    var temp = "LIKE_LOC_DESC"
                    setCopyValue((prev) => ({
                        ...prev,
                        [name.name]: e.STORE,
                        [temp]: e.STORE_DESC
                    }))
                }
                if (name.name === "LIKE_LOC_DESC") {
                    var temp = "LIKE_LOC"
                    ////console.log("inputValue:991119:", e, name, temp);
                    setCopyValue((prev) => ({
                        ...prev,
                        [name.name]: e.STORE_DESC,
                        [temp]: e.STORE
                    }))
                }

            }
            if (name.name === "CLEARANCE_IND") {
                var temp = "CLEARANCE_IND_DESC"
                setCopyValue((prev) => ({
                    ...prev,
                    [name.name]: e.CODE,
                    [temp]: e.CODE_DESC
                }))
            }
            if (name.name === "ITEM_LOC_STATUS") {
                var temp = "ITEM_LOC_STATUS_DESC"
                setCopyValue((prev) => ({
                    ...prev,
                    [name.name]: e.CODE,
                    [temp]: e.CODE_DESC
                }))
            }
        }

        if (Object.is(e, null) === true) {
            if (name.name === "LIKE_LOC" || name.name === "LIKE_LOC_DESC") {
                if (name.name === "LIKE_LOC") {
                    var temp = "LIKE_LOC_DESC"
                    setCopyValue((prev) => ({
                        ...prev,
                        [name.name]: "",
                        [temp]: ""
                    }))
                }
                if (name.name === "LIKE_LOC_DESC") {
                    var temp = "LIKE_LOC"
                    // ////console.log("inputValue:991119:", e, name, temp);
                    setCopyValue((prev) => ({
                        ...prev,
                        [name.name]: "",
                        [temp]: ""
                    }))
                }

            }
            if (name.name === "CLEARANCE_IND") {
                var temp = "CLEARANCE_IND_DESC"
                setCopyValue((prev) => ({
                    ...prev,
                    [name.name]: "",
                    [temp]: ""
                }))
            }
            if (name.name === "ITEM_LOC_STATUS") {
                var temp = "ITEM_LOC_STATUS_DESC"
                setCopyValue((prev) => ({
                    ...prev,
                    [name.name]: "",
                    [temp]: ""
                }))
            }
        }
        // setSampleVal([])
    }

    const onTableCellChange = (e, value, name) => {
        // ////console.log("inputValue; aty:::::::totalData:::", totalData, e, value, name, Object.is(e, null))

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
                totalData.map((row) => {
                    if (row.LOC === value) {
                        row["WEIGHT_PCT"] = e.target.value
                    }
                })
            }

            if (name === "RELEASE_DATE") {
                totalData.map((row) => {
                    if (row.LOC === value) {
                        row["RELEASE_DATE"] = e.target.value
                    }
                })
            }
        }
        if (Object.is(e, null) === true) {
            // ////console.log("inputValue; aty:::::::12345:::", totalData, e, value, name, Object.is(e, null))
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
            // ////console.log("inputValue; aty:::::::555555:::", totalData, e, value,name)
        }
        setTotalData(totalData);
        setSampleVal([])
        setSorted(true);
    };

    const handleCopyDown = (e) => {
        ////console.log("handleCopyDown:6:", copyValue);

        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }
        if (selected.length > 0) {
            const editData = tableLocData.filter((item) => {
                return selected.some((val) => {
                    return item.LOC === val;
                });
            });

            const copyUpdate = editData.map(item => {
                Object.assign(item, copyValue);
                return item;
            })

            copyUpdate.map((obj) => {
                if (Object.keys(obj).includes("LOC")) {
                    const temp = totalData.filter((obj1) =>
                        obj1["LOC"] === obj["LOC"]
                    )
                }
            })
        }
        setTotalData(totalData)
        setSampleVal([]);
        if (selected.length > 0) {
            setLockCheck(false);
            if (inputValue.length === 0) {
                setTotalData(totalData);
                setSampleVal(totalData);
                setCopyValue(initialCopyValues);
                setInputValue([]);
                setInputValue1({})
            } else {
                setTotalData(totalData);
                setSampleVal(totalData);
                setCopyValue(initialCopyValues);
                setInputValue([]);
                setInputValue1({})
            }
        }

    }

    const eraseValLikeLoc = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = tableLocData.filter((item) => {
                return selected.some((val) => {
                    return item.LOC === val;
                });
            });


            editData.map((row) => {
                if (Object.keys(row).includes("LIKE_LOC")) {
                    row["LIKE_LOC"] = ""
                    row["LIKE_LOC_DESC"] = ""
                }
            }
            )

            editData.map((obj) => {
                if (Object.keys(obj).includes("LOC")) {
                    const temp = totalData.filter((obj1) =>
                        obj1["LOC"] === obj["LOC"]

                    )
                }
            })
        }


        setTotalData(totalData)
        setSampleVal([]);
    }

    const eraseValClearance = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = tableLocData.filter((item) => {
                return selected.some((val) => {
                    return item.LOC === val;
                });
            });


            editData.map((row) => {
                if (Object.keys(row).includes("CLEARANCE_IND")) {
                    row["CLEARANCE_IND"] = ""
                    row["CLEARANCE_IND_DESC"] = ""
                }
            }
            )

            editData.map((obj) => {
                if (Object.keys(obj).includes("LOC")) {
                    const temp = totalData.filter((obj1) =>
                        obj1["LOC"] === obj["LOC"]

                    )
                }
            })
        }


        setTotalData(totalData)
        setSampleVal([]);
    }

    const eraseValStatus = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = tableLocData.filter((item) => {
                return selected.some((val) => {
                    return item.LOC === val;
                });
            });


            editData.map((row) => {
                if (Object.keys(row).includes("ITEM_LOC_STATUS")) {
                    row["ITEM_LOC_STATUS"] = ""
                    row["ITEM_LOC_STATUS_DESC"] = ""
                }
            }
            )

            editData.map((obj) => {
                if (Object.keys(obj).includes("LOC")) {
                    const temp = totalData.filter((obj1) =>
                        obj1["LOC"] === obj["LOC"]

                    )
                }
            })
        }


        setTotalData(totalData)
        setSampleVal([]);
    }

    const eraseValWeight = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = tableLocData.filter((item) => {
                return selected.some((val) => {
                    return item.LOC === val;
                });
            });


            editData.map((row) => {
                if (Object.keys(row).includes("WEIGHT_PCT")) {
                    row["WEIGHT_PCT"] = ""
                }
            }
            )

            editData.map((obj) => {
                if (Object.keys(obj).includes("LOC")) {
                    const temp = totalData.filter((obj1) =>
                        obj1["LOC"] === obj["LOC"]

                    )
                }
            })
        }


        setTotalData(totalData)
        setSampleVal([]);
    }

    const eraseValReleaseDate = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = tableLocData.filter((item) => {
                return selected.some((val) => {
                    return item.LOC === val;
                });
            });


            editData.map((row) => {
                if (Object.keys(row).includes("RELEASE_DATE")) {
                    row["RELEASE_DATE"] = ""
                }
            }
            )

            editData.map((obj) => {
                if (Object.keys(obj).includes("LOC")) {
                    const temp = totalData.filter((obj1) =>
                        obj1["LOC"] === obj["LOC"]

                    )
                }
            })
        }


        setTotalData(totalData)
        setSampleVal([]);
    }



    const handleLockFilter = (e) => {
        setLockCheck(true);
        // setCopyValue(initialCopyValues);
        // setInputValue1({})
    }

    const SearchButtonLIKE_LOC = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
                        onClick={handleCopyDown} disabled={ApproveFreeseCheck}
                    />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
                        disabled={ApproveFreeseCheck}
                    />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                <BsFillEraserFill fontSize="small"
                    onClick={eraseValLikeLoc}
                    disabled={ApproveFreeseCheck}
                />
            </IconButton>
        ]
    )

    const SearchButtonLIKE_LOC_DESC = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
                        onClick={handleCopyDown} disabled={ApproveFreeseCheck}
                    />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
                        disabled={ApproveFreeseCheck}
                    />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                <BsFillEraserFill fontSize="small"
                    onClick={eraseValLikeLoc}
                    disabled={ApproveFreeseCheck}
                />
            </IconButton>
        ]
    )

    const SearchButtonClearance = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
                        onClick={handleCopyDown} disabled={ApproveFreeseCheck}
                    />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
                        disabled={ApproveFreeseCheck}
                    />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                <BsFillEraserFill fontSize="small"
                    onClick={eraseValClearance}
                    disabled={ApproveFreeseCheck}
                />
            </IconButton>
        ]
    )

    const SearchButtonStatus = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck ? true : (allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F" ? true : false)}>
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
                        onClick={handleCopyDown} disabled={ApproveFreeseCheck ? true : (allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F" ? true : false)}
                    />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
                        disabled={ApproveFreeseCheck ? true : (allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F" ? true : false)}
                    />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck ? true : (allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F" ? true : false)}>
                <BsFillEraserFill fontSize="small"
                    onClick={eraseValStatus} disabled={ApproveFreeseCheck ? true : (allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F" ? true : false)}
                />
            </IconButton>
        ]
    )

    const SearchButtonWeight = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
                        onClick={handleCopyDown} disabled={ApproveFreeseCheck}
                    />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
                        disabled={ApproveFreeseCheck}
                    />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                <BsFillEraserFill fontSize="small"
                    onClick={eraseValWeight} disabled={ApproveFreeseCheck}
                />
            </IconButton>
        ]
    )

    const SearchButtonReleaseDate = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                {LockCheck ?
                    <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }}
                        onClick={handleCopyDown} disabled={ApproveFreeseCheck}
                    />
                    : <LockIcon fontSize="small" sx={{ height: '0.6em', width: '0.6em' }} onClick={handleLockFilter}
                        disabled={ApproveFreeseCheck}
                    />}
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} disabled={ApproveFreeseCheck}>
                <BsFillEraserFill fontSize="small"
                    onClick={eraseValReleaseDate} disabled={ApproveFreeseCheck}
                />
            </IconButton>
        ]
    )

    // const Control = ({ children, ...props }) => (
    //     <components.Control {...props}>
    //       {children}
    //       <Button size="small" sx={{ margin: "0px", padding: "0px", minWidth: "0px" }} startIcon={<SearchIcon sx={{ padding: 0 }} />}>{////console.log("cancel")}</Button>
    //     </components.Control>
    //   )

    const resetFilter = () => {
        setInputValue([]);

        if (inputValue.length === 0) {
            setTotalData(totalData);
            setSampleVal(totalData);
            setCopyValue(initialCopyValues);
            setInputValue([]);
            setInputValue1({})
        } else {
            setTotalData(totalData);
            setSampleVal(totalData);
            setCopyValue(initialCopyValues);
            setInputValue([]);
            setInputValue1({})
        }
        setLockCheck(false)
    }
    const handleRowClick = (rowId) => {
        setSelectedRow(rowId);
    };

    /*
        #################################################
        ############ ERROR POP-UP MESSAGE ###############
        #################################################
    */

    const handleCloseDialog = (e) => {
        setOpenDialogRL(false);
        setDialogDataRL("")
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
        LocationHeader.map(row => temp.push(row.id));
        setManageHeaderData(temp);
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

    return (
        // <div className={RulesLocationLeftClasses.divBoxLeft}>

        <div>
            {!AllRetreiverRLdataCheck ?
                <div className={RulesLocationLeftClasses.Bottom_container}>
                    <div className={RulesLocationLeftClasses.Bottom_child}>
                        <Box
                            component="fieldset"
                            display="inline-block"
                            sx={{
                                backgroundColor: "",
                                height: "100%",
                                width: "calc(45vw - 0px)",
                                margin: "10px 0px 0px 0px",
                                // backgroundColor: "rgb(250, 250, 250)",
                                borderRadius: 1,

                                boxShadow: 2, border: 0,
                                borderBottom: 3,
                                border: "1px solid lightgrey",
                                // border:"1px dotted gray",
                                // borderRadius:"5px",
                            }}
                        >
                            {!RetrieveDataCheck ?
                                <div style={{ display: "flex" }}>
                                    <div className={RulesLocationLeftClasses.header_container} style={{ position: "relative" }}>
                                        <Box
                                            display="flex"
                                            sx={{
                                                justifyContent: "space-between"
                                            }}
                                        >

                                            <div>
                                                <div className={RulesLocationLeftClasses.header_child}>
                                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "18px", margin: "2px 0px -5px 2px", display: 'flex', float: 'left' }}>
                                                        Rules & History Range</InputLabel>
                                                    <div> <InputLabel sx={{ fontWeight: "bold", fontSize: "18px", margin: "12px 0px 2px 2px", display: 'flex', float: 'left' }}>
                                                        Sales history Types :</InputLabel>
                                                    </div>
                                                </div>

                                                <div>
                                                    {
                                                        <div>
                                                            <div>
                                                                <div className={RulesLocationLeftClasses.header_child}>
                                                                    <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                                                                        control={
                                                                            <Switch
                                                                                disabled={leftContData.RULE_TYPE != 'History' || ApproveFreeseCheck}
                                                                                size="small"
                                                                                name="check1"
                                                                                defaultChecked
                                                                                checked={check1 && leftContData.RULE_TYPE == 'History'}
                                                                                onChange={handleswitchRulecheck}
                                                                                value={leftContData.REGULAR_SALES_IND}
                                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                                sx={(check1 && leftContData.RULE_TYPE == 'History') ? {
                                                                                    '&.Mui-disabled': {
                                                                                        opacity: 0.5,
                                                                                        color: 'DodgerBlue',
                                                                                    },
                                                                                } : null
                                                                                }
                                                                            />
                                                                        }
                                                                        label={<InputLabel
                                                                            sx={{
                                                                                fontWeight: "bold",
                                                                                fontSize: "12px",
                                                                                margin: "0px 0px 0px 0px",
                                                                                padding: "0px 0px 0px 0px",
                                                                                display: 'inline',
                                                                                float: 'left'
                                                                            }}>
                                                                            Regular</InputLabel>}
                                                                    />
                                                                </div>
                                                                <div className={RulesLocationLeftClasses.header_child}>
                                                                    <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                                                                        control={
                                                                            <Switch
                                                                                disabled={leftContData.RULE_TYPE != 'History' || ApproveFreeseCheck}
                                                                                size="small"
                                                                                name="check2"
                                                                                defaultChecked
                                                                                checked={check2 && leftContData.RULE_TYPE == 'History'}
                                                                                onChange={handleswitchRulecheck}
                                                                                //  onClick={() => { setCheck1(!check1) }}
                                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                                sx={(check2 && leftContData.RULE_TYPE == 'History') ? {
                                                                                    '&.Mui-disabled': {
                                                                                        opacity: 0.5,
                                                                                        color: 'DodgerBlue',
                                                                                    },
                                                                                } : null
                                                                                }
                                                                            />
                                                                        }
                                                                        label={<InputLabel
                                                                            sx={{
                                                                                fontWeight: "bold",
                                                                                fontSize: "12px",
                                                                                margin: "0px 0px 0px 0px",
                                                                                padding: "0px 0px 0px 0px",
                                                                                display: 'inline',
                                                                                float: 'left'
                                                                            }}>
                                                                            Promotional</InputLabel>}
                                                                    />
                                                                </div>
                                                                <div className={RulesLocationLeftClasses.header_child}>
                                                                    <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                                                                        control={
                                                                            <Switch
                                                                                disabled={leftContData.RULE_TYPE != 'History' || ApproveFreeseCheck}
                                                                                size="small"
                                                                                name="check3"
                                                                                checked={check3 && leftContData.RULE_TYPE != 'Forecast'}
                                                                                // onChange={handleswitchcheck}
                                                                                onChange={handleswitchRulecheck}
                                                                                // value={leftContData.CLEARANCE_SALES_IND}
                                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                                sx={(check3 && leftContData.RULE_TYPE != 'Forecast') ? {
                                                                                    '&.Mui-disabled': {
                                                                                        opacity: 0.5,
                                                                                        color: 'DodgerBlue',
                                                                                    },
                                                                                } : null
                                                                                }
                                                                            />
                                                                        }
                                                                        label={<InputLabel
                                                                            sx={{
                                                                                fontWeight: "bold",
                                                                                fontSize: "12px",
                                                                                margin: "0px 0px 0px 0px",
                                                                                padding: "0px 0px 0px 0px",
                                                                                display: 'inline',
                                                                                float: 'left'
                                                                            }}>
                                                                            Clearance</InputLabel>}
                                                                    />

                                                                </div>
                                                                {/* className={RulesLocationLeftClasses.header_child} */}


                                                                <div className={RulesLocationLeftClasses.header_child} >
                                                                    <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                                                                        control={
                                                                            <Switch
                                                                                disabled={ApproveFreeseCheck}
                                                                                size="small"
                                                                                name="check1"
                                                                                checked={checkStore}
                                                                                onChange={handleswitchcheck}
                                                                                // onClick={() => { setCheck1(!check1) }}
                                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                                sx={checkStore ? {
                                                                                    '&.Mui-disabled': {
                                                                                        opacity: 0.5,
                                                                                        color: 'DodgerBlue',
                                                                                    },
                                                                                } : null
                                                                                }
                                                                            />
                                                                        }
                                                                        label={<InputLabel
                                                                            sx={{
                                                                                fontWeight: "bold",
                                                                                fontSize: "12px",
                                                                                margin: "0px 0px 0px 0px",
                                                                                padding: "0px 0px 0px 0px",
                                                                                display: 'inline',
                                                                                float: 'left'
                                                                            }}>
                                                                            All stores</InputLabel>}
                                                                    />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    }
                                                </div>


                                                {(allocDetails.length > 0 ? allocDetails[0].ALLOC_LEVEL == 'Style Diff' : allocDetails[0].ALLOC_LEVEL == 'Sku') ?
                                                    <div>
                                                        <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                                                            control={
                                                                <Switch
                                                                    size="small"
                                                                    name="check4"
                                                                    checked={check4}
                                                                    disabled={ApproveFreeseCheck}
                                                                    onChange={handleswitchRulecheck}
                                                                    // onClick={() => { setCheck1(!check1) }}
                                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                                    sx={check4 ? {
                                                                        '&.Mui-disabled': {
                                                                            opacity: 0.5,
                                                                            color: 'DodgerBlue',
                                                                        },
                                                                    } : null
                                                                    }
                                                                />
                                                            }
                                                            label={<InputLabel
                                                                sx={{
                                                                    fontWeight: "bold",
                                                                    fontSize: "12px",
                                                                    margin: "0px 0px 0px 0px",
                                                                    padding: "0px 0px 0px 0px",
                                                                    display: 'inline',
                                                                    float: 'left'
                                                                }}>
                                                                Use Size Profile</InputLabel>}
                                                        />
                                                    </div> : null}

                                                <div style={{ display: 'flex' }}>
                                                    <FormControlLabel size="small" sx={{ margin: "0px", paddingBottom: "5px" }}
                                                        control={
                                                            <Switch
                                                                size="small"
                                                                name="check5"
                                                                disabled={ApproveFreeseCheck}
                                                                checked={check5}
                                                                onChange={handleswitchRulecheck}
                                                                // onClick={() => { setCheck1(!check1) }}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                sx={check5 ? {
                                                                    '&.Mui-disabled': {
                                                                        opacity: 0.5,
                                                                        color: 'DodgerBlue',
                                                                    },
                                                                } : null
                                                                }
                                                            />
                                                        }
                                                        label={<InputLabel
                                                            sx={{
                                                                fontWeight: "bold",
                                                                fontSize: "12px",
                                                                margin: "0px 0px 0px 0px",
                                                                padding: "0px 0px 0px 2px",
                                                                display: 'inline',
                                                                float: 'left'
                                                            }}>
                                                            Default Auto prezi. Min and Qty Limits</InputLabel>}
                                                    />
                                                    <div classname={RulesLocationLeftClasses.header_child}>
                                                        <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                                                            control={
                                                                <Switch
                                                                    size="small"
                                                                    name="check2"
                                                                    disabled={ApproveFreeseCheck ? true : allocDetails.length > 0 && allocDetails[0].ALLOC_CRITERIA === "F" ? true : false}
                                                                    checked={allocDetails.length > 0 ? allocDetails[0].ALLOC_CRITERIA !== "F" && checkRL2 : checkRL2}
                                                                    onChange={handleswitchcheck}
                                                                    // onClick={() => { setCheck1(!check1) }}
                                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                                    sx={checkRL2 ? {
                                                                        '&.Mui-disabled': {
                                                                            opacity: 0.5,
                                                                            color: 'DodgerBlue',
                                                                        },
                                                                    } : null
                                                                    }
                                                                />
                                                            }
                                                            label={<InputLabel
                                                                sx={{
                                                                    fontWeight: "bold",
                                                                    fontSize: "12px",
                                                                    margin: "0px 0px 0px 0px",
                                                                    padding: "0px 0px 0px 0px",
                                                                    display: 'inline',
                                                                    float: 'left'
                                                                }}>
                                                                Allocate from Def WH</InputLabel>}
                                                        />
                                                    </div>

                                                </div>

                                                <div className={RulesLocationLeftClasses.header_child}>
                                                    <Box
                                                        display="flex"
                                                        sx={{
                                                            // width: "100%"
                                                        }}
                                                    >
                                                        <div className={RulesLocationLeftClasses.divHeightMain}>
                                                            {/* {(Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE !== 'Manual')
                                    ||
                                    (Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE.length === 0)
                                    ? */}
                                                            <div className={RulesLocationLeftClasses.divHeight}>
                                                                <Box
                                                                    disabled={leftContData.RULE_TYPE === "Manual"}
                                                                    //disabled={true}
                                                                    component="fieldset"
                                                                    display="inline-block"
                                                                    sx={{
                                                                        backgroundColor: "",
                                                                        height: "100%",
                                                                        // width: "100%",
                                                                        margin: "10px 0px 0px 0px",
                                                                        // backgroundColor: "rgb(250, 250, 250)",
                                                                        borderRadius: 1,

                                                                        boxShadow: 2, border: 0,
                                                                        borderBottom: 3,
                                                                        border: "1px solid lightgrey",
                                                                        // border:"1px dotted gray",
                                                                        // borderRadius:"5px",
                                                                    }}
                                                                >
                                                                    <legend style={{ fontWeight: "bold", color: "#191970", }}>Date Range</legend>
                                                                    <div className={RulesLocationLeftClasses.HeightDiv}>
                                                                        <FormControlLabel control={
                                                                            <Checkbox
                                                                                checked={check6}
                                                                                name="check6"
                                                                                disabled={ApproveFreeseCheck}
                                                                                //box-size="12px"
                                                                                style={{ transform: "scale(0.8)", padding: "0px", margin: "0px 0px 0px 10px" }}
                                                                                sx={check6 ? {
                                                                                    '&.Mui-disabled': {
                                                                                        opacity: 0.5,
                                                                                        color: 'DodgerBlue',
                                                                                    },
                                                                                } : null
                                                                                }
                                                                                // onChange={handleswitchcheck}
                                                                                onChange={(event) => {
                                                                                    setCheck9(false)
                                                                                    setCheck6(event.target.checked)
                                                                                    if (!check6) {
                                                                                        setStartd1("");
                                                                                        setStartd2("");
                                                                                        setEndd1("");
                                                                                        setEndd2("");
                                                                                    }
                                                                                }}
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
                                                                                Weeks from Today</InputLabel>}
                                                                        />
                                                                    </div>
                                                                    {check6 ?
                                                                        <div>
                                                                            <div className={RulesLocationLeftClasses.header_child}>
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
                                                                                        style: { fontSize: 12, height: "25px" },
                                                                                        inputProps: { min: 0, maxLength: 2 },
                                                                                    }}
                                                                                    variant="standard"
                                                                                />
                                                                            </div>

                                                                            <div className={RulesLocationLeftClasses.header_child}>
                                                                                <InputLabel sx={{ fontWeight: "", fontSize: "12px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                                                                                    LY: </InputLabel>
                                                                                <TextField
                                                                                    type="number"
                                                                                    sx={{ width: "50px" }}
                                                                                    name="WEEKS_LAST_YEAR"
                                                                                    disabled={ApproveFreeseCheck}
                                                                                    value={leftContData.WEEKS_LAST_YEAR}
                                                                                    // value={values.numberformat}
                                                                                    onChange={handleswitchRulecheck}
                                                                                    //onChange={(event)=>{setLastY(event.target.value)}}
                                                                                    // name="LY"
                                                                                    id="formatted-numberformat-input"
                                                                                    InputProps={{
                                                                                        style: { fontSize: 12, height: "25px" },
                                                                                        inputProps: { min: 0, maxLength: 2 },
                                                                                    }}
                                                                                    variant="standard"
                                                                                />

                                                                            </div>
                                                                        </div>
                                                                        : null}


                                                                    <div>
                                                                        <FormControlLabel control={
                                                                            <Checkbox
                                                                                checked={check9}
                                                                                name="check9"
                                                                                disabled={ApproveFreeseCheck}
                                                                                //onChange={handleswitchcheck}
                                                                                style={{
                                                                                    transform: "scale(0.8)", padding: "0px", margin: "0px 0px 0px 10px",
                                                                                }}
                                                                                sx={check9 ? {
                                                                                    '&.Mui-disabled': {
                                                                                        opacity: 0.5,
                                                                                        color: 'DodgerBlue',
                                                                                    },
                                                                                } : null
                                                                                }
                                                                                onChange={(event) => {
                                                                                    setCheck6(false);
                                                                                    setCheck9(event.target.checked);
                                                                                    if (!check9) {
                                                                                        setThisY("");
                                                                                        setLastY("");
                                                                                    }
                                                                                }}
                                                                            />
                                                                        }
                                                                            //label="Start/End Dates" 
                                                                            label={<InputLabel
                                                                                sx={{
                                                                                    fontWeight: "bold",
                                                                                    fontSize: "12px",
                                                                                    margin: "0px 0px 0px 0px",
                                                                                    padding: "0px 0px 0px 0px",
                                                                                    display: 'inline',
                                                                                    float: 'left',
                                                                                }}>
                                                                                Start/End Dates</InputLabel>}
                                                                        />

                                                                    </div>



                                                                    {check9 ?
                                                                        <div>
                                                                            <div className={RulesLocationLeftClasses.header_child}>
                                                                                <div>
                                                                                    <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                                                                                        Start: </InputLabel>
                                                                                </div>

                                                                                <div >
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        type="date"
                                                                                        size="small"
                                                                                        name="START_DATE1"
                                                                                        format="yyyy/MM/dd"
                                                                                        //   inputProps={{ max: currentDate() }}
                                                                                        sx={{
                                                                                            margin: "0px 0px 10px 2px", width: "120px"
                                                                                            , "& .MuiInputBase-input.Mui-disabled": {
                                                                                                backgroundColor: "#f0f0f0"
                                                                                            }
                                                                                        }}
                                                                                        id="outlined-disabled"
                                                                                        label=""
                                                                                        inputProps={{
                                                                                            sx: { backgroundColor: '#fff', borderRadius: "5px" }
                                                                                        }}
                                                                                        disabled={ApproveFreeseCheck}
                                                                                        value={leftContData.START_DATE1}
                                                                                        // value={allocDetails[0].RELEASE_DATE}
                                                                                        // defaultValue={allocDetails[0].RELEASE_DATE}
                                                                                        InputProps={{
                                                                                            style: { fontSize: 12, height: "30px" },
                                                                                            shrink: true,
                                                                                            className: RulesLocationLeftClasses.input,
                                                                                        }}
                                                                                        onChange={handleswitchRulecheck}
                                                                                    />
                                                                                </div>

                                                                                <div >
                                                                                    <TextField
                                                                                        value={leftContData.START_DATE2}
                                                                                        // onInput={(e) => {
                                                                                        //     let dayOfWeek = 6;//friday
                                                                                        //     let date = new Date(e.target.value);
                                                                                        //     let diff = date.getDay() - dayOfWeek;
                                                                                        //     if (diff > 0) {
                                                                                        //         date.setDate(date.getDate() + 7);
                                                                                        //     }
                                                                                        //     else if (diff < 0) {
                                                                                        //         date.setDate(date.getDate() + ((-1) * diff))
                                                                                        //     }
                                                                                        //     setStartd2(date.toISOString().split('T')[0])
                                                                                        //     // ////console.log(date.toISOString());
                                                                                        //     if (endd2 < date.toISOString().split('T')[0]) {
                                                                                        //         setEndd2("")
                                                                                        //     }

                                                                                        // }}
                                                                                        disabled={ApproveFreeseCheck}
                                                                                        variant="outlined"
                                                                                        type="date"
                                                                                        size="small"
                                                                                        name="START_DATE2"
                                                                                        format="yyyy/MM/dd"
                                                                                        //   inputProps={{ max: currentDate() }}
                                                                                        sx={{
                                                                                            margin: "0px 0px 10px 2px", width: "120px"
                                                                                            , "& .MuiInputBase-input.Mui-disabled": {
                                                                                                backgroundColor: "#f0f0f0"
                                                                                            }
                                                                                        }}
                                                                                        id="outlined-disabled"
                                                                                        label=""
                                                                                        inputProps={{
                                                                                            sx: { backgroundColor: '#fff', borderRadius: "5px" }
                                                                                        }}
                                                                                        // value={allocDetails[0].RELEASE_DATE}
                                                                                        // defaultValue={allocDetails[0].RELEASE_DATE}
                                                                                        InputProps={{
                                                                                            style: { fontSize: 12, height: "30px" },
                                                                                            shrink: true,
                                                                                            className: RulesLocationLeftClasses.input,
                                                                                        }}
                                                                                        onChange={handleswitchRulecheck}

                                                                                    />

                                                                                </div>
                                                                            </div>


                                                                            <div className={RulesLocationLeftClasses.header_child}>
                                                                                <div>
                                                                                    <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                                                                                        End: </InputLabel>
                                                                                </div>

                                                                                <div >

                                                                                    <TextField
                                                                                        disabled={ApproveFreeseCheck}
                                                                                        // value={endd1}
                                                                                        // onInput={(e) => {
                                                                                        //     let dayOfWeek = 6;//friday
                                                                                        //     let date = new Date(e.target.value);
                                                                                        //     let diff = date.getDay() - dayOfWeek;
                                                                                        //     if (diff > 0) {
                                                                                        //         date.setDate(date.getDate() + 7);
                                                                                        //     }
                                                                                        //     else if (diff < 0) {
                                                                                        //         date.setDate(date.getDate() + ((-1) * diff))
                                                                                        //     }
                                                                                        //     setEndd1(date.toISOString().split('T')[0])
                                                                                        //     // ////console.log(date.toISOString());
                                                                                        //     //     // let abc={endd1}
                                                                                        //     //     // let bcd={startd1}


                                                                                        //     //     if (endd1 < startd1){
                                                                                        //     //       setEndd1("");
                                                                                        //     //   }
                                                                                        // }}
                                                                                        variant="outlined"
                                                                                        type="date"
                                                                                        size="small"
                                                                                        name="END_DATE1"
                                                                                        format="yyyy/MM/dd"
                                                                                        //   inputProps={{ max: currentDate() }}
                                                                                        inputProps={{
                                                                                            min: leftContData.START_DATE1,
                                                                                            sx: { backgroundColor: '#fff', borderRadius: "5px" }
                                                                                        }}

                                                                                        sx={{
                                                                                            margin: "0px 0px 10px 2px", width: "120px"
                                                                                            , "& .MuiInputBase-input.Mui-disabled": {
                                                                                                backgroundColor: "#f0f0f0"
                                                                                            }
                                                                                        }}
                                                                                        id="outlined-disabled"
                                                                                        // value={allocDetails[0].RELEASE_DATE}
                                                                                        // defaultValue={allocDetails[0].RELEASE_DATE}
                                                                                        InputProps={{
                                                                                            style: { fontSize: 12, height: "30px" },
                                                                                            shrink: true,
                                                                                            className: RulesLocationLeftClasses.input,
                                                                                        }}
                                                                                        onChange={handleswitchRulecheck}
                                                                                        value={leftContData.END_DATE1}

                                                                                    />
                                                                                </div>

                                                                                <div >
                                                                                    <TextField
                                                                                        disabled={ApproveFreeseCheck}
                                                                                        // value={endd2}
                                                                                        // onInput={(e) => {
                                                                                        //     let dayOfWeek = 6;//friday
                                                                                        //     let date = new Date(e.target.value);
                                                                                        //     let diff = date.getDay() - dayOfWeek;
                                                                                        //     if (diff > 0) {
                                                                                        //         date.setDate(date.getDate() + 7);
                                                                                        //     }
                                                                                        //     else if (diff < 0) {
                                                                                        //         date.setDate(date.getDate() + ((-1) * diff))
                                                                                        //     }
                                                                                        //     setEndd2(date.toISOString().split('T')[0])
                                                                                        //     // ////console.log(date.toISOString());
                                                                                        // }}
                                                                                        variant="outlined"
                                                                                        type="date"
                                                                                        size="small"
                                                                                        name="END_DATE2"
                                                                                        format="yyyy/MM/dd"
                                                                                        //shouldDisableDate={disablePrevDates}

                                                                                        //   inputProps={{ max: currentDate() }}
                                                                                        inputProps={{
                                                                                            min: leftContData.START_DATE2, sx: { backgroundColor: '#fff', borderRadius: "5px" }
                                                                                        }}
                                                                                        sx={{
                                                                                            margin: "0px 0px 10px 2px", width: "120px"
                                                                                            , "& .MuiInputBase-input.Mui-disabled": {
                                                                                                backgroundColor: "#f0f0f0"
                                                                                            }
                                                                                        }}
                                                                                        id="outlined-disabled"
                                                                                        label=""
                                                                                        value={leftContData.END_DATE2}
                                                                                        // value={allocDetails[0].RELEASE_DATE}
                                                                                        // defaultValue={allocDetails[0].RELEASE_DATE}
                                                                                        InputProps={{
                                                                                            style: { fontSize: 12, height: "30px" },
                                                                                            shrink: true,
                                                                                            className: RulesLocationLeftClasses.input,
                                                                                        }}
                                                                                        onChange={handleswitchRulecheck}

                                                                                    />

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        : null}
                                                                    <Box display="flex" justifyContent="right" //sx={{width:"100%", backgroundColor:"red"}}
                                                                    >
                                                                        <Button
                                                                            sx={{
                                                                                fontSize: "10px",
                                                                                //margin: "10px 0px 0px 10px",
                                                                                // left: "45px",
                                                                                // top: "3px",
                                                                                //position: "fixed"
                                                                                '&.Mui-disabled': {
                                                                                    opacity: 0.5,
                                                                                    backgroundColor: 'DodgerBlue',
                                                                                    color: '#fff',
                                                                                },
                                                                            }}
                                                                            // disabled={ApproveFreeseCheck}
                                                                            startIcon={<DisplaySettingsIcon />}
                                                                            onClick={handleClickOpen}
                                                                            variant="contained">
                                                                            Change Weights
                                                                        </Button>
                                                                    </Box>

                                                                </Box>
                                                            </div>

                                                            <div className={RulesLocationLeftClasses.divHeight}>
                                                                <Box
                                                                    component="fieldset"
                                                                    display="inline-block"
                                                                    sx={{
                                                                        backgroundColor: "",
                                                                        height: "100%",
                                                                        // width: "100%",
                                                                        margin: "10px 0px 0px 0px",
                                                                        // backgroundColor: "rgb(250, 250, 250)",
                                                                        borderRadius: 1,

                                                                        boxShadow: 2, border: 0,
                                                                        borderBottom: 3,
                                                                        border: "1px solid lightgrey",
                                                                        // border:"1px dotted gray",
                                                                        // borderRadius:"5px",
                                                                    }}
                                                                >
                                                                    <legend style={{ fontWeight: "bold", color: "#191970" }}>Include Inventory</legend>
                                                                    <div>
                                                                        <FormControlLabel control={
                                                                            <Checkbox
                                                                                checked={check7}
                                                                                name="check7"
                                                                                disabled={ApproveFreeseCheck}
                                                                                //onChange={handleswitchcheck}
                                                                                sx={check7 ? {
                                                                                    '&.Mui-disabled': {
                                                                                        opacity: 0.5,
                                                                                        color: 'DodgerBlue',
                                                                                    },
                                                                                } : null
                                                                                }
                                                                                style={{ transform: "scale(0.8)", padding: "0px", margin: "0px 0px 0px 10px" }}
                                                                                onChange={(event) => {
                                                                                    setCheck8(false);
                                                                                    setCheck7(event.target.checked);
                                                                                }}
                                                                            />
                                                                        }
                                                                            //label="Weeks from Today"
                                                                            label={<InputLabel
                                                                                sx={{
                                                                                    fontWeight: "bold",
                                                                                    fontSize: "12px",
                                                                                    margin: "0px 0px 0px 0px",
                                                                                    padding: "0px 0px 0px 0px",
                                                                                    display: 'inline',
                                                                                    float: 'left',
                                                                                }}>
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
                                                                                // onChange={handleChange}
                                                                                name="ON_ORDER_COMMIT_WEEKS"
                                                                                sx={{ width: "50px" }}
                                                                                // name="TY"
                                                                                id="formatted-numberformat-input"
                                                                                InputProps={{
                                                                                    style: { fontSize: 12, height: "15px" },
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
                                                                                //onChange={handleswitchcheck}
                                                                                onChange={(event) => {
                                                                                    setCheck7(false);
                                                                                    setCheck8(event.target.checked);
                                                                                }}
                                                                                sx={check8 ? {
                                                                                    '&.Mui-disabled': {
                                                                                        opacity: 0.5,
                                                                                        color: 'DodgerBlue',
                                                                                    },
                                                                                } : null
                                                                                }
                                                                            />
                                                                        }
                                                                            //label="On order Commit Date" 
                                                                            label={<InputLabel
                                                                                sx={{
                                                                                    fontWeight: "bold",
                                                                                    fontSize: "12px",
                                                                                    margin: "0px 0px 0px 0px",
                                                                                    padding: "0px 0px 0px 0px",
                                                                                    display: 'inline',
                                                                                    float: 'left',
                                                                                }}>
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
                                                                                <TextField
                                                                                    disabled={ApproveFreeseCheck}
                                                                                    variant="outlined"
                                                                                    type="date"
                                                                                    size="small"
                                                                                    format="yyyy/MM/dd"
                                                                                    name="ON_ORDER_COMMIT_DATE"
                                                                                    //   inputProps={{ max: currentDate() }}
                                                                                    sx={{
                                                                                        margin: "0px 0px 10px 2px", width: "120px", borderRadius: "5px",
                                                                                        "& .MuiInputBase-input.Mui-disabled": {
                                                                                            backgroundColor: "#f0f0f0",
                                                                                            height: "15px",
                                                                                        }
                                                                                    }}
                                                                                    id="outlined-disabled"
                                                                                    label=""
                                                                                    value={leftContData.ON_ORDER_COMMIT_DATE}
                                                                                    // defaultValue={allocDetails[0].RELEASE_DATE}
                                                                                    inputProps={{ sx: { backgroundColor: '#fff', borderRadius: "5px" } }}
                                                                                    InputProps={{
                                                                                        style: { fontSize: 12, height: "30px" },
                                                                                        shrink: true,
                                                                                        className: RulesLocationLeftClasses.input,
                                                                                    }}
                                                                                    onChange={handleswitchRulecheck}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        : null}

                                                                </Box>
                                                            </div>
                                                        </div>
                                                    </Box>
                                                </div>
                                            </div>

                                            <div >
                                                <div className={RulesLocationLeftClasses.header_child}>
                                                    <div>
                                                        <Button
                                                            sx={{
                                                                fontSize: "12px",
                                                                backgroundColor: "",
                                                                padding: "5px", fontFamily: "system-ui",
                                                                width: "100px", marginLeft: "5px", marginTop: "20px",
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
                                                    <div>


                                                        <Button
                                                            sx={{
                                                                fontSize: "12px",
                                                                backgroundColor: "",
                                                                padding: "5px", fontFamily: "system-ui",
                                                                width: "100px", marginLeft: "5px", marginTop: "5px",
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
                                                    </div>
                                                    <div>
                                                        <Button
                                                            sx={{
                                                                fontSize: "12px",
                                                                backgroundColor: "",
                                                                padding: "5px", fontFamily: "system-ui",
                                                                width: "100px", marginLeft: "5px", marginTop: "5px",
                                                                '&.Mui-disabled': {
                                                                    opacity: 0.5,
                                                                    backgroundColor: 'DodgerBlue',
                                                                    color: '#fff',
                                                                },
                                                            }}
                                                            startIcon={<RefreshIcon />}
                                                            disabled={ApproveFreeseCheck}
                                                            onClick={handleRefreshRules}
                                                            // value={leftContData}
                                                            variant="contained">
                                                            Refresh
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>



                                        <Box
                                            display="grid"
                                            gridTemplateColumns="repeat(10, 1fr)" gap={0}
                                            sx={{
                                                backgroundColor: "",
                                                // height: "auto",
                                                // width: "100%",
                                                // width:"fit-screen",
                                                margin: "5px 0px 0px 0px"
                                            }}
                                        >
                                            <Box gridColumn="span 5">

                                                <div >
                                                    <div >
                                                        <div className={RulesLocationLeftClasses.header_child} >
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
                                                                    // isMulti
                                                                    isDisabled={ApproveFreeseCheck}
                                                                    isClearable={true}
                                                                    closeMenuOnSelect={true}
                                                                    hideSelectedOptions={false}
                                                                    // sx={{ width: "100%" }}
                                                                    value={ruleType.filter(obj => leftContData?.RULE_TYPE === (obj.CODE_DESC))}
                                                                    styles={styleSelect6}
                                                                    components={animatedComponents}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* {(Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE !== 'Manual')
                                    ||
                                    (Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE.length === 0)
                                    ? */}
                                                        <div className={RulesLocationLeftClasses.header_child}>
                                                            <div>
                                                                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
                                                                    Calc Need Type</InputLabel>
                                                            </div>
                                                            <div>
                                                                <Select
                                                                    isDisabled={leftContData.RULE_TYPE === "Manual" || ApproveFreeseCheck}
                                                                    maxMenuHeight={180}
                                                                    classNamePrefix="mySelect"
                                                                    getOptionLabel={option =>
                                                                        `${option.CODE_DESC.toString()}`}
                                                                    getOptionValue={option => option.CODE_DESC}
                                                                    options={Need.length > 0 ? Need : []}
                                                                    isSearchable={true}
                                                                    onChange={selectNEEDType}
                                                                    menuPlacement="auto"
                                                                    // isMulti
                                                                    isClearable={true}
                                                                    closeMenuOnSelect={true}
                                                                    hideSelectedOptions={false}
                                                                    // sx={{ width: "100%" }}
                                                                    value={Need.filter(obj => leftContData?.EXACT_IND_VAL === (obj.CODE_DESC))}
                                                                    styles={styleSelect6}
                                                                    components={animatedComponents}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {/* {(Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE !== 'Manual')
                                        ||
                                        (Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE.length === 0)
                                        ? */}
                                                            <div className={RulesLocationLeftClasses.header_child}>
                                                                <div>
                                                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 2px", display: 'flex', float: 'left' }}>
                                                                        Hierarchy</InputLabel>
                                                                </div>
                                                                <div>
                                                                    <Select
                                                                        isDisabled={leftContData.RULE_TYPE === "Manual" || ApproveFreeseCheck}
                                                                        maxMenuHeight={180}
                                                                        classNamePrefix="mySelect"
                                                                        getOptionLabel={option =>
                                                                            `${option.CODE_DESC.toString()}`}
                                                                        getOptionValue={option => option.CODE_DESC}
                                                                        options={Hierarchy.length > 0 ? Hierarchy : []}
                                                                        isSearchable={true}
                                                                        onChange={selectHierarchy}
                                                                        menuPlacement="auto"
                                                                        // isMulti
                                                                        isClearable={true}
                                                                        closeMenuOnSelect={true}
                                                                        hideSelectedOptions={false}
                                                                        // sx={{ width: "100%" }}
                                                                        styles={styleSelect6}
                                                                        components={animatedComponents}
                                                                        value={Hierarchy.filter(obj => leftContData?.RULE_LEVEL === (obj.CODE_DESC))}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className={RulesLocationLeftClasses.header_child}>
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
                                                                        // isMulti
                                                                        isClearable={true}
                                                                        isDisabled={ApproveFreeseCheck}
                                                                        closeMenuOnSelect={true}
                                                                        hideSelectedOptions={false}
                                                                        // sx={{ width: "100%" }}
                                                                        styles={styleSelect6}
                                                                        components={animatedComponents}
                                                                        value={Allocateto.filter(obj => leftContData?.NET_NEED_IND_VAL === (obj.CODE_DESC))}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={RulesLocationLeftClasses.header_child}>
                                                        <div>
                                                            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "5px 0px 0px 0px", display: 'flex', float: 'left' }}>
                                                                Rules Template:</InputLabel>
                                                        </div>
                                                        <div>

                                                            <Select
                                                                maxMenuHeight={180}
                                                                classNamePrefix="mySelect"
                                                                getOptionLabel={option =>
                                                                    `${option.label.toString()}`}
                                                                getOptionValue={option => option.label}
                                                                options={optionsTemplates.length > 0 ? optionsTemplates : []}
                                                                isSearchable={true}
                                                                menuPlacement="auto"
                                                                isMulti
                                                                isClearable={true}
                                                                isDisabled={ApproveFreeseCheck}
                                                                closeMenuOnSelect={true}
                                                                hideSelectedOptions={false}
                                                                // sx={{ width: "100%" }}
                                                                styles={styleSelect6}
                                                                components={animatedComponents}
                                                            />

                                                        </div>
                                                    </div>
                                                    {/* <br></br> */}

                                                    <div className={RulesLocationLeftClasses.header_child}>
                                                        <div className={RulesLocationLeftClasses.header_child}>
                                                            <Button
                                                                sx={{
                                                                    fontSize: "10px",
                                                                    margin: "15px 0px 0px 0px",
                                                                    padding: "5px",
                                                                    '&.Mui-disabled': {
                                                                        opacity: 0.5,
                                                                        backgroundColor: 'DodgerBlue',
                                                                        color: '#fff',
                                                                    },
                                                                }}
                                                                //onClick={handleClickOpen}
                                                                disabled={ApproveFreeseCheck}
                                                                startIcon={<OfflinePinIcon sx={{ padding: 0 }} />}
                                                                variant="contained">
                                                                Apply
                                                            </Button>
                                                        </div>
                                                        <div className={RulesLocationLeftClasses.header_child}>
                                                            <Button
                                                                sx={{
                                                                    fontSize: "10px",
                                                                    margin: "15px 0px 0px 0px",
                                                                    padding: "5px",
                                                                    '&.Mui-disabled': {
                                                                        opacity: 0.5,
                                                                        backgroundColor: 'DodgerBlue',
                                                                        color: '#fff',
                                                                    },
                                                                }}
                                                                disabled={ApproveFreeseCheck}
                                                                startIcon={<SaveIcon sx={{ padding: 0 }} />}
                                                                variant="contained">

                                                                {/* <SaveIcon small="small" sx={{ padding: "0px" }} 
                                                                /> */}
                                                                Save Template
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    {/* <button className='sub-container-btns' onClick={handleClickOpen}>Apply</button> */}


                                                </div>
                                            </Box>

                                            <Box gridColumn="span 5" >{LocationTopPart()}</Box>

                                        </Box>
                                    </div>

                                    <div>
                                        <BootstrapDialog
                                            onClose={handleClose}
                                            aria-labelledby="customized-dialog-title"
                                            open={open}
                                            maxWidth="sm"
                                        >
                                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                                <b>Change Weights</b>
                                            </BootstrapDialogTitle>
                                            <DialogContent dividers>
                                                <Box sx={{ height: "auto", width: "300px" }}>
                                                    <Paper sx={{ marginTop: "10px" }}>
                                                        <TableContainer style={{
                                                            maxHeight: 360,
                                                        }} component={Paper}>
                                                            <Table aria-label="customized table">
                                                                <EnhancedTableHead1
                                                                    //numSelected={selected.length}
                                                                    order1={order1}
                                                                    orderBy1={orderBy1}
                                                                    //onSelectAllClick={handleSelectAllClick}
                                                                    onRequestSort={handleRequestSort1}
                                                                    rowCount={updateRulesRL.length}
                                                                />
                                                                <TableBody >
                                                                    {stableSort1(updateRulesRL, getComparator1(order1, orderBy1))
                                                                        .map((row, index) => {
                                                                            // const isItemSelected = isSelected(row.EOW);
                                                                            // ////console.log("retrieveRuleDateRL555", retrieveRuleDateRL);
                                                                            const labelId = `enhanced-table-checkbox-${index}`;
                                                                            return (
                                                                                <TableRow
                                                                                    hover
                                                                                    role="checkbox"
                                                                                    // aria-checked={isItemSelected}
                                                                                    tabIndex={-1}
                                                                                    key={row.EOW}
                                                                                // selected={isItemSelected}
                                                                                >

                                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}>
                                                                                        {row.EOW_DATE}
                                                                                    </StyledTableCell>

                                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                                        <TextField

                                                                                            InputProps={{

                                                                                                style: { fontSize: 12, height: "30px", width: "100px" },

                                                                                            }}
                                                                                            defaultValue={row.WEIGHT}

                                                                                            name="WEIGHT"
                                                                                            onChange={(e) => onTableChange(e, row.EOW_DATE)}
                                                                                            autoComplete="off"
                                                                                            inputProps={{
                                                                                                maxLength: 3,
                                                                                            }}
                                                                                            disabled={ApproveFreeseCheck}
                                                                                            onKeyDown={((e) => {
                                                                                                // ////console.log(e.keyCode)
                                                                                                if (e.keyCode < 91 && e.keyCode > 64) {
                                                                                                    e.preventDefault()
                                                                                                }
                                                                                            })}
                                                                                        //     inputProps={{
                                                                                        //         maxLength: 3,


                                                                                        //     }}

                                                                                        />
                                                                                    </StyledTableCell>
                                                                                </TableRow >
                                                                            );
                                                                        })}
                                                                    {updateRulesRL.length < 5 ?
                                                                        [...Array(5 - (updateRulesRL.length)).keys()].map(val => (
                                                                            <TableRow  >
                                                                                <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 4 }}></StyledTableCell>
                                                                                <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 4 }}></StyledTableCell>
                                                                            </TableRow >
                                                                        )) : false}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                        {updateRulesRL.length > 0 ? <EnhancedTableToolbar1 /> : null}
                                                    </Paper>
                                                </Box>
                                            </DialogContent>
                                            <DialogActions>



                                                <Button autoFocus onClick={HandleSaveChanges} disabled={ApproveFreeseCheck}>
                                                    Save changes
                                                </Button>
                                            </DialogActions>
                                        </BootstrapDialog>
                                    </div>
                                </div> : null}


                        </Box>
                    </div>


                    <div className={RulesLocationLeftClasses.Bottom_child}>
                        <Box
                            component="fieldset"
                            display="inline-block"
                            sx={{
                                backgroundColor: "",
                                height: "100%",
                                width: "calc(45vw - 0px)",
                                margin: "10px 0px 0px 0px",
                                // backgroundColor: "rgb(250, 250, 250)",
                                borderRadius: 1,

                                boxShadow: 2, border: 0,
                                borderBottom: 3,
                                border: "1px solid lightgrey",
                                // border:"1px dotted gray",
                                // borderRadius:"5px",
                            }}
                        >
                            <Box display="flex" justifyContent="flex-end" sx={{}}>
                                <Button display="flex" justifyContent="flex-end" autoFocus variant="contained" startIcon={<ViewColumnIcon />} onClick={HandleManageHeader}
                                    sx={{
                                        backgroundColor: "",
                                        fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                        width: "170px", margin: "2px 0px 2px 0px",
                                    }}>Manage columns</Button>
                            </Box>
                            <div>
                                <Paper //sx={{ marginTop: "10px", width: "100%", mb: 0, width: "calc(45.7vw - 0px)", height: "auto", maxHeight: 500, }}
                                    sx={{ margin: "0px 0px 0px 0px", mb: 0, height: "auto", width: "calc(45.7vw - 0px)", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}
                                >
                                    <TableContainer
                                        // style={{
                                        //     maxHeight: 480,
                                        //     width: "auto",
                                        //     margin: "0px 0px 5px 0px"
                                        // }}
                                        style={{ maxHeight: 480, borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}
                                        className={RulesLocationRightClasses.TitleHead}
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

                                                <TableCell padding="checkbox" className={RulesLocationRightClasses.TitleHead} sx={{ padding: "0px" }} >
                                                    <Grid item xs={1} style={{ padding: "0px", margin: "0px 0px 0px 0px" }}>
                                                        <IconButton small="small" onClick={resetFilter} sx={{ padding: "0px" }}>
                                                            <RestartAltIcon small="small" sx={{ padding: "0px" }} />
                                                        </IconButton>
                                                    </Grid>
                                                </TableCell>

                                                {ManageHeaderData.includes('LOC') ?
                                                    <TableCell sx={{ padding: "0px" }} className={RulesLocationRightClasses.TitleHead}>
                                                        <TextField
                                                            name="LOC"
                                                            value={Object.keys(inputValue).length > 0 && Object.keys(inputValue).includes("LOC") > 0 ? inputValue.LOC : ""}
                                                            onChange={testChange}
                                                            placeholder="Location"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px" },
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
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
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px" },
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
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
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px" },
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
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
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px" },
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
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
                                                            InputProps={{
                                                                style: { fontSize: 12, height: "20px" },
                                                            }}
                                                            variant="standard"
                                                            inputProps={{
                                                                // maxLength: 5,
                                                                sx: { padding: "0px", height: "20px", textAlign: "center", }
                                                            }}
                                                            disabled={LockCheck}
                                                        />
                                                    </TableCell> : null}

                                                {ManageHeaderData.includes('LIKE_LOC') ?
                                                    <TableCell sx={{ padding: "0px" }}>
                                                        <div style={{ display: "flex" }}>
                                                            <Select
                                                                name="LIKE_LOC"
                                                                placeholder="Model after Loc"
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
                                                                styles={styleSelect4}
                                                            />
                                                            <SearchButtonLIKE_LOC />
                                                        </div>
                                                    </TableCell> : null}

                                                {ManageHeaderData.includes('LIKE_LOC_DESC') ?
                                                    <TableCell sx={{ padding: "0px" }}>
                                                        <div style={{ display: "flex" }}>
                                                            <Select
                                                                name="LIKE_LOC_DESC"
                                                                maxMenuHeight={150}
                                                                placeholder="Allied Loc Desc"
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
                                                                style={{ maxWidth: '20px' }}
                                                            />
                                                            <SearchButtonLIKE_LOC_DESC />
                                                        </div>
                                                    </TableCell> : null}

                                                {ManageHeaderData.includes('WEIGHT_PCT') ?
                                                    <TableCell sx={{ padding: "0px" }}>
                                                        <TextField
                                                            name="WEIGHT_PCT"
                                                            onChange={LockCheck ? handleChangeWeight : handleChangeWeight1}
                                                            InputProps={{ endAdornment: <SearchButtonWeight />, style: { fontSize: 12, height: "20px" } }}
                                                            autoComplete="off"
                                                            variant="standard"
                                                            value={LockCheck ?
                                                                Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("WEIGHT_PCT") > 0 ? copyValue.WEIGHT_PCT : "" :
                                                                Object.keys(inputValue1).length > 0 && Object.keys(inputValue1).includes("WEIGHT_PCT") > 0 ? inputValue1.WEIGHT_PCT : ""
                                                            }
                                                        />
                                                    </TableCell> : null}

                                                {ManageHeaderData.includes('CLEARANCE_IND') ?
                                                    <TableCell sx={{ padding: "0px" }}>
                                                        <div style={{ display: "flex" }}>
                                                            <Select
                                                                name="CLEARANCE_IND"
                                                                placeholder="Clearance"
                                                                maxMenuHeight={150}
                                                                classNamePrefix="mySelect"
                                                                getOptionLabel={option =>
                                                                    `${option.CODE_DESC.toString()}`}
                                                                getOptionValue={option => option.CODE_DESC}
                                                                options={clearanceRLData}
                                                                isSearchable={true}
                                                                onChange={LockCheck ? handleChangeValue : (e) => testChange1(e, "CLEARANCE_IND")}
                                                                menuPlacement="bottom"
                                                                isClearable={true}
                                                                closeMenuOnSelect={true}
                                                                hideSelectedOptions={false}
                                                                value={LockCheck ?
                                                                    clearanceRLData.filter(obj => copyValue?.CLEARANCE_IND_DESC === (obj.CODE_DESC)) :
                                                                    clearanceRLData.filter(obj => inputValue1?.CLEARANCE_IND_DESC === (obj.CODE_DESC))
                                                                }
                                                                styles={styleSelect3}
                                                                style={{ maxWidth: '20px' }}
                                                            />
                                                            <SearchButtonClearance />
                                                        </div>
                                                    </TableCell> : null}

                                                {ManageHeaderData.includes('ITEM_LOC_STATUS') ?
                                                    <TableCell sx={{ padding: "0px" }}>
                                                        <div style={{ display: "flex" }}>
                                                            <Select
                                                                name="ITEM_LOC_STATUS"
                                                                placeholder="Status"
                                                                maxMenuHeight={150}
                                                                classNamePrefix="mySelect"
                                                                getOptionLabel={option =>
                                                                    `${option.CODE_DESC.toString()}`}
                                                                getOptionValue={option => option.CODE_DESC}
                                                                options={StatusRLData}
                                                                isSearchable={true}
                                                                onChange={LockCheck ? handleChangeValue : (e) => testChange1(e, "ITEM_LOC_STATUS")}
                                                                menuPlacement="bottom"
                                                                isClearable={true}
                                                                closeMenuOnSelect={true}
                                                                hideSelectedOptions={false}
                                                                value={LockCheck ?
                                                                    StatusRLData.filter(obj => copyValue?.ITEM_LOC_STATUS_DESC === (obj.CODE_DESC)) :
                                                                    StatusRLData.filter(obj => inputValue1?.ITEM_LOC_STATUS_DESC === (obj.CODE_DESC))
                                                                }
                                                                styles={styleSelect3}
                                                                style={{ maxWidth: '20px' }}
                                                            />
                                                            <SearchButtonStatus />
                                                        </div>
                                                    </TableCell> : null}

                                                {ManageHeaderData.includes('RELEASE_DATE') ?
                                                    <TableCell sx={{ padding: "0px" }}>
                                                        <TextField
                                                            variant="standard"
                                                            type="date"
                                                            size="small"
                                                            name="RELEASE_DATE"
                                                            format="yyyy/MM/dd"
                                                            autoComplete='off'
                                                            inputProps={ //min: new Date().toISOString().slice(0, 10)
                                                                //min:new Date(new Date(allocDetails[0].RELEASE_DATE).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                                                                { min: allocDetails.length > 0 && allocDetails[0].RELEASE_DATE ? new Date(new Date(allocDetails[0].RELEASE_DATE).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0] }
                                                                //:{min:new Date().toISOString().slice(0, 10)}
                                                            }
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
                                                            label=""
                                                            value={LockCheck ?
                                                                Object.keys(copyValue).length > 0 && Object.keys(copyValue).includes("RELEASE_DATE") > 0 ? copyValue.RELEASE_DATE : "" :
                                                                Object.keys(inputValue1).length > 0 && Object.keys(inputValue1).includes("RELEASE_DATE") > 0 ? inputValue1.RELEASE_DATE : ""}
                                                            onChange={LockCheck ? handleChangeWeight : handleChangeWeight1}
                                                            InputProps={{ endAdornment: <SearchButtonReleaseDate />, style: { fontSize: 12, height: "20px" } }}
                                                        />
                                                    </TableCell> : null}

                                                {totalData
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
                                                                    padding: "0px"
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
                                                                        sx={{
                                                                            padding: "0px",
                                                                            '&.Mui-disabled': {
                                                                                opacity: 0.5,
                                                                                // color: 'DodgerBlue',
                                                                            },
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                {ManageHeaderData.includes('LOC') ?
                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                        {row.LOC}
                                                                    </TableCell> : null}

                                                                {ManageHeaderData.includes('LOC_DESC') ?
                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                        {String(row.LOC_DESC).length > 0 ?
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
                                                                                    {String(row.LOC_DESC).length > 0 && String(row.LOC_DESC).length < 5 ?
                                                                                        row.LOC_DESC === "NULL" ? null : row.LOC_DESC
                                                                                        : String(row.LOC_DESC).substring(0, 13)}
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
                                                                                    className={RulesLocationRightClasses.textField}
                                                                                    onClick={() => {
                                                                                        setOpenDialogRL(true);
                                                                                        setDialogDataRL(String(row.LOC_DESC));
                                                                                    }}
                                                                                    startIcon={<InfoIcon size="small" sx={{ padding: "0px" }} />}
                                                                                >
                                                                                </Button>
                                                                            </Box> : null}
                                                                    </TableCell> : null}

                                                                {ManageHeaderData.includes('DEFAULT_WH') ?
                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                        {row.DEFAULT_WH}
                                                                    </TableCell> : null}

                                                                {ManageHeaderData.includes('GROUP_ID') ?
                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
                                                                        {row.GROUP_ID}
                                                                    </TableCell> : null}

                                                                {ManageHeaderData.includes('GROUP_DESC') ?
                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}>
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
                                                                                    className={RulesLocationRightClasses.textField}
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
                                                                            styles={styleSelect2}
                                                                            style={{ maxWidth: '20px' }}

                                                                        />
                                                                    </TableCell> : null}

                                                                {ManageHeaderData.includes('WEIGHT_PCT') ?
                                                                    <TableCell sx={{ padding: "0px", textAlign: "left", fontSize: "12px" }}
                                                                    >
                                                                        <TextField
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "20px" },
                                                                            }}
                                                                            disabled={ApproveFreeseCheck}
                                                                            name="WEIGHT_PCT"
                                                                            onChange={(e) => onTableCellChange(e, row.LOC, "WEIGHT_PCT")}
                                                                            autoComplete="off"
                                                                            inputProps={{
                                                                                maxLength: 20,
                                                                                sx: { backgroundColor: '#fff', padding: "0px", height: "20px", textAlign: "center", }
                                                                            }}
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
                                                                            options={clearanceRLData}
                                                                            isSearchable={true}
                                                                            onChange={(e) =>
                                                                                onTableCellChange(e, row.LOC, "CLEARANCE_IND")
                                                                            }
                                                                            menuPlacement="bottom"
                                                                            value={clearanceRLData.filter(obj => row?.CLEARANCE_IND === (obj.CODE))}
                                                                            isClearable={true}
                                                                            closeMenuOnSelect={true}
                                                                            hideSelectedOptions={false}
                                                                            styles={styleSelect2}
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
                                                                            options={StatusRLData}
                                                                            isSearchable={true}
                                                                            onChange={(e) =>
                                                                                onTableCellChange(e, row.LOC, "ITEM_LOC_STATUS")
                                                                            }
                                                                            menuPlacement="bottom"
                                                                            value={StatusRLData.filter(obj => row?.ITEM_LOC_STATUS === (obj.CODE))}
                                                                            isClearable={true}
                                                                            closeMenuOnSelect={true}
                                                                            hideSelectedOptions={false}
                                                                            styles={styleSelect2}
                                                                            style={{ maxWidth: '20px' }}
                                                                        />
                                                                    </TableCell> : null}

                                                                {ManageHeaderData.includes('RELEASE_DATE') ?
                                                                    <TableCell sx={{ padding: "0px" }}>
                                                                        <TextField
                                                                            variant="standard"
                                                                            type="date"
                                                                            size="small"
                                                                            name="RELEASE_DATE"
                                                                            format="yyyy/MM/dd"
                                                                            autoComplete='off'
                                                                            disabled={ApproveFreeseCheck}
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "20px" },
                                                                            }}
                                                                            // value={row.WOS}
                                                                            onChange={(e) => onTableCellChange(e, row.LOC, "RELEASE_DATE")}
                                                                            inputProps={{
                                                                                // min: new Date().toISOString().slice(0, 10),
                                                                                min: allocDetails.length > 0 ?
                                                                                    new Date(new Date(allocDetails[0].RELEASE_DATE).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                                                                                    : new Date().toISOString().slice(0, 10),
                                                                                maxLength: 20,
                                                                                sx: { backgroundColor: '#fff', padding: "0px", height: "20px", textAlign: "center", }
                                                                            }}
                                                                            defaultValue={row.RELEASE_DATE}
                                                                            value={row.RELEASE_DATE}
                                                                        />
                                                                    </TableCell> : null}
                                                            </TableRow >
                                                        );
                                                    })}

                                                {totalData.length < 15 ?
                                                    [...Array(15 - (totalData.length)).keys()].map(val => (
                                                        <TableRow  >
                                                            <TableCell padding="checkbox" sx={{ padding: "0px", width: "1%" }}>
                                                                <Checkbox size="small" sx={{ padding: "1px 0px 1px 0px" }} color="primary" disabled={true} />
                                                            </TableCell>
                                                            {ManageHeaderData.map((row, index) => {
                                                                return (
                                                                    <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>)
                                                            })}
                                                            {/* <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell>
                                                            <TableCell align="right" sx={{ padding: "0px", textAlign: "left", fontSize: "11px" }}></TableCell> */}
                                                        </TableRow >
                                                    )) : false}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Toolbar
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
                                    </Toolbar>
                                </Paper>
                            </div>

                        </Box>
                    </div>
                </div>
                : null}
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
        </div>
    )
})

export default BottomContainer;