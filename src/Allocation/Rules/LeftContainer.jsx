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
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Box from "@mui/material/Box";
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
        // width: "250px",
        height: 37.8,
        // backgroundColor:"#f0f0f0",
        '& input + fieldset': {
            // borderColor: 'gray',
            borderRadius: "0",
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
    // leftDivContainer:{
    //     width:"100%",height:"auto"
    // }
})

const styleSelect1 = {
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

const animatedComponents = makeAnimated();

const optionsTemplates = [
    { value: "Template Name", label: "Template Name" },
    { value: "option 2", label: "option 2" },
    { value: "option 3", label: "option 3" },
    { value: "option 4", label: "option 4" }
]


const LeftContainer = forwardRef(({ setSubmit, setLeftContData, ref, allocLevel, allocNoData, allocDetails,
    leftContData, totalData, setTotalData, settableData, tableData, selected, setSelected, AllRetreiverRLdataCheck, setAllRetreieveRLdataCheck,
    setUpdateRulesRL, updateRulesRL, tableLocData, setTableLocData, setStatusRLData, setclearanceRLData, setLikeLocData }) => {
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
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
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

    ///*****right con *///
    const initialsearch = {
        LOCATION: [],
        LOCATION_LIST: [],
        LOCATION_TRAIT: [],
        EXCLUDE_LOCATION: [],
        ALL_STORE: "N",
        ALLOC_NO: allocNoData.ALLOC_NO
    }

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

    const [inputValue, setInputValue] = useState([]);
    const [sampleVal, setSampleVal] = useState([]);
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
    const [selectedLoc, setSelectedLoc] = useState([])
    const [selectedLocList, setSelectedLocList] = useState([])
    const [selectedLoctrait, setSelectedLoctrait] = useState([])
    const [selectedExcluded, setSelectedExcluded] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [clearanceRL, setClearanceRl] = useState([]);
    const [statusRL, setStatusRl] = useState([]);

    const [allData, setAllData] = useState([]);
    const [allDataCheck, setAllDataCheck] = useState(false);

    const RulesLocationLeftClasses = useStyles();

    const RulesLocationLeftData = useSelector(
        (state) => state.RulesLocationReducers
    );

    const dispatch = useDispatch();

    useEffect(() => {
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

    useEffect(() => {
        if (updateRulesRL.length === 0) {
            setLeftContData({
                ...leftContData,
                END_DATE1: endd1,
                END_DATE2: endd2,
                START_DATE1: startd1,
                START_DATE2: startd2,
                RULE_TYPE: 'History',
                EXACT_IND_VAL: 'Exact',
                EXACT_IND: 'Y',
                RULE_LEVEL: "Sku",
                NET_NEED_IND_VAL: 'Net Need',
                NET_NEED_IND: 'Y',
            })
        }
    }, [endd1, endd2, startd1, startd2])

    const [countAddCheck, setCountAddCheck] = useState(0);

    useEffect(() => {
        if (
            RulesLocationLeftData?.data?.tableLocData
            && Array.isArray(RulesLocationLeftData?.data?.tableLocData)
        ) {
            if (countAddCheck === 0) {
                setTotalData(RulesLocationLeftData?.data?.tableLocData);
                setTableLocData(RulesLocationLeftData?.data?.tableLocData);
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
        } else {
            setSearch(false);
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
            && Array.isArray(RulesLocationLeftData?.data?.deleteLocationRL)
        ) {
            setDeleteLocationRL(RulesLocationLeftData?.data?.deleteLocationRL);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.loadWeightChangeRL
            // && Array.isArray(RulesLocationLeftData?.data?.loadWeightChangeRL)
        ) {
            // console.log("loadWeightChangeRL", RulesLocationLeftData?.data?.loadWeightChangeRL);
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
            // && Array.isArray(RulesLocationLeftData?.data?.updateRulesRL)
        ) {
            setUpdateRulesRL(RulesLocationLeftData?.data?.updateRulesRL);
            setLoading(false);
        } else {
            setSearch(false);
        }
    }, [RulesLocationLeftData?.data]);

    // const [checked, setChecked] = React.useState(false);


    if (allDataCheck && allData.length > 0) {
        console.log("totalData 1:", totalData, allData);
        // const tempLoc = []
        // allData.map((obj) => { tempLoc.push(obj.LOC) })
        // const temp = totalData.filter(item => !tempLoc.includes(item.LOC))
        const tempLoc1 = []
        totalData.map((obj) => { tempLoc1.push(obj.LOC) })
        const temp1 = allData.filter(item => !tempLoc1.includes(item.LOC))
        //  [...temp1, ...totalData]
        const temp2 = stableSort([...temp1, ...totalData], getComparator("asc", "LOC"))
        // temp2.slice().sort((a, b) => console.log("totalData 3:", a, b));
        // console.log("totalData 2:", temp2);
        setTotalData(temp2)
        setTableLocData(temp2)
        setAllDataCheck(false)

    }

    const [AllocRuleData, setAllocRuleData] = useState({})
    const [AllocRuleDataCheck, setAllocRuleDataCheck] = useState(true)
    const [RetrieveDataCheck, setRetrieveDataCheck] = useState(false);
    // const [RetrieveDataCheck, setRetrieveDataCheck] = useState(true)

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


        if (AllocRuleData.ENFORCE_WH_RL === "N") {
            setCheckRL2(false)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ENFORCE_WH_RL: "N"
                };
            })
        } else if (AllocRuleData.ENFORCE_WH_RL === "Y") {
            setCheckRL2(true)
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ENFORCE_WH_RL: "Y"
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
            // console.log("testing: ", String(AllocRuleData["WEEKS_THIS_YEAR"]).length, String(AllocRuleData["WEEKS_THIS_YEAR"]));
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
            // console.log("temp.length,1: ",temp,temp.length,String(AllocRuleData["RULE_TYPE"]),ruleType);
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
            // console.log("temp.length,2: ",temp,temp.length,String(AllocRuleData["EXACT_IND"]),Need,Need.filter(item => item.CODE === String(AllocRuleData["EXACT_IND"])));
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
            // console.log("temp.length,3: ",temp,temp.length,String(AllocRuleData["NET_NEED_IND"]),Allocateto);
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
            // console.log("temp.length,4: ",temp,temp.length,String(AllocRuleData["RULE_LEVEL"]),Hierarchy);
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



    // console.log("updateRulesRL:11:", AllocRuleData, "handleswitchRulecheck", leftContData,);


    //To open dialog
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setValidCheckOnce(true);

        if (String(leftContData.WEEKS_LAST_YEAR).length > 0 ||
            String(leftContData.WEEKS_THIS_YEAR).length > 0 ||
            (String(leftContData.START_DATE1).length > 0 && String(leftContData.END_DATE1).length > 0) ||
            (String(leftContData.START_DATE2).length > 0 && String(leftContData.END_DATE2).length > 0)
        ) {
            setUpdateRulesRL([]);
            dispatch(getUPDATERULESRLRLRequest([leftContData]));

            setValidCheck(true)

        }
        else {
            // console.log("retrieveRuleDateRL45678");
            swal(
                "TY/LY or STARTDATE 1 and ENDDATE 1 OR STARTDATE 2 and ENDDATE 2 Inputs required*"
                // <div>
                //     <p>Inputs required*</p>
                // </div>
            )
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const HandleSaveChanges = () => {
        dispatch(getUPDATECHANGEWEIGHTSRLRequest(loadWeightChangeRL));
        setOpen(false);
        setRetrieveRuleDateRLCheck(true);
    }

    if (retrieveRuleDateRLCheck) {
        // if (updateChangeWeightsRL.message==="Data Updated"){
        dispatch(getLOADRULEDATERLRequest([leftContData]));
        //}
        setRetrieveRuleDateRLCheck(false);
    }

    if (validCheck && updateRulesRL.status === 200) {
        if (updateRulesRL.status === 200) {
            setLoadWeightChangeRL([])
            dispatch(getLOADWEIGHTCHANGERLRequest([leftContData]));
            setOpen(true)
            setValidCheckOnce(false)
        }
        setValidCheck(false);
        setUpdateRulesRL([]);
    }
    // else if (updateRulesRLCheck) {
    //     console.log("updateRulesRL:123::",updateRulesRL);
    //     dispatch(getLOADWEIGHTCHANGERLRequest([leftContData]));
    //     setupdateRulesRLcheck(false);
    //     setOpen(true)
    //     setLeftContData((prev) => {
    //         return {
    //             ...prev,
    //             CHANGEWEIGHTSCHECK: "Y"
    //         };
    //     })
    //     setValidCheckOnce(false)
    // }

    //to open dialogfor changeweights
    // const handleClickOpen1 = () => {
    //     axios.post(CONFIG.BASE_URL + "/Alloc_change_weights_tab/", [{ "ALLOC_NO": "1234" }]).then(async (response) => {
    //         console.log(response);
    //         let data = await response.data.map((res, index) => ({ ...res, id: index + 1 }))
    //         setChangeWeights(data)
    //     });
    //     setOpenDialog(true);
    // };

    // const handleClose1 = () => {
    //     console.log("fdfdg");
    //     setOpenDialog(false);
    // }

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

        dispatch(getDELETELOCATIONRLRequest([allocNoData]));
        setLoading(false);
        setSearchData(initialsearch);
        setTableLocData([]);
        setSelected([]);
        setInputValue([]);
        setSampleVal([]);
        settableData([]);
        setCheckRL1(false);
        setCheckRL2(false);
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
                ENFORCE_PRES_MIN_IND: "N",
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
                ENFORCE_WH_RL: "Y",
            };
        });
    }


    const handleswitchRulecheck = (e, val) => {
        console.log("Akhil 1450::.val", e, val)
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
            // console.log(123456)
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
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "WEEKS_LAST_YEAR") {
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
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "START_DATE1") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    START_DATE1: e.target.value,
                    WEEKS_THIS_YEAR: "",
                    WEEKS_LAST_YEAR: "",
                };
            })
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "START_DATE2") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    START_DATE2: e.target.value,
                    WEEKS_THIS_YEAR: "",
                    WEEKS_LAST_YEAR: "",
                };
            })
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "END_DATE1") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    END_DATE1: e.target.value,
                    WEEKS_THIS_YEAR: "",
                    WEEKS_LAST_YEAR: "",
                };
            })
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "END_DATE2") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    END_DATE2: e.target.value,
                    WEEKS_THIS_YEAR: "",
                    WEEKS_LAST_YEAR: "",
                };
            })
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "ON_ORDER_COMMIT_WEEKS") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ON_ORDER_COMMIT_WEEKS: e.target.value,
                    ON_ORDER_COMMIT_DATE: "",
                };
            })
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


    // console.log("e::setLef:", leftContData, check1, check2, check3, check4)

    /////////////////////////////
    /////////////////////
    ////////////////////////////////
    const selectRuleType = (val) => {
        // console.log("e::", val)
        if (val) {
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
         console.log("Akhil 1450 2value,e", val)
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
        // console.log("e::555566", val)
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
        // console.log("value,e", val)
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





    function EnhancedTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
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
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap"
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
        // onSelectAllClick: PropTypes.func.isRequired,
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
                    ...(loadWeightChangeRL.length > 0 &&
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
                {loadWeightChangeRL.length > 0 && (
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
                        Rows {loadWeightChangeRL.length}
                    </Typography>
                )}
            </Toolbar>
        );
    }

    function descendingComparator(a, b, orderBy) {
        let c, d;
        if (orderBy == "EOW") {
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

    const handleRequestSort = (event, property) => {
        const isAsc = (orderBy === property && order === 'asc');
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const onTableChange = (e, value) => {
        // console.log("retrieveRuleDateRL33:", value, e, e.target.name, e.target.value, retrieveRuleDateRL);
        // setRetrieveRuleDateRLSample([])
        {
            loadWeightChangeRL.map((row) => {
                // console.log("retrieveRuleDateRL11:", row);
                if (row.EOW_DATE === value) {
                    row[e.target.name] = e.target.value
                    // console.log("retrieveRuleDateRL22:", row);
                }
            })
        }
        // setRetrieveRuleDateRL(retrieveRuleDateRL)
        setLoadWeightChangeRL(loadWeightChangeRL)

    };

    const [TotalDataCheck, setTotalDataCheck] = useState(false)
    const HandleAddButton = () => {
        // setTotalData([]);
        // setTableLocData([]);
        if (checkStore) {
            setLoading(true);
            dispatch(getFETCHLOCATIONDATARequest([searchData]));
        }
        else if (searchData.LOCATION.length > 0 || searchData.LOCATION_LIST.length > 0 || searchData.LOCATION_TRAIT.length > 0) {
            setLoading(true);
            dispatch(getFETCHLOCATIONDATARequest([searchData]));
        }
        else {
            swal(
                "Give any input field*"
            )
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
            swal(
                <div>
                    {RulesLocationLeftData?.data?.totalData?.message}
                </div>
            )
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
        // console.log("temp5:",temp5);
    }



    const selectLocation = (event, value) => {
        console.log("selectLocation: ", event, value);

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
            //   ////////console.log(1234)
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
            // }else if(value.length > 0){
            //       swal(
            //         <div>     
            //           <p>{"Please Choose valid LOCATION"}</p>
            //         </div>
            //       )  
            // }
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
            //   ////////console.log(1234)
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
            // }else if(value.length > 0){
            //       swal(
            //         <div>     
            //           <p>{"Please Choose valid LOCATION"}</p>
            //         </div>
            //       )  
            // }
        } else {
            ////console.log("clear:")
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
        // console.log("1284");
        let updatedLocationtraitsData = []
        let selectedLocationtraitsOptions = []
        event.map((res) => {
            selectedLocationtraitsOptions.push(res.LOC_TRAIT)
        })
        updatedLocationtraitsData = locationTraitRL.filter((res) => !selectedLocationtraitsOptions.includes(res.LOC_TRAIT))
        updatedLocationtraitsData = [...event, ...updatedLocationtraitsData];
        setLocationTraitRl(updatedLocationtraitsData)
        ////console.log("event:", event)
        ////console.log("value:", value)
        //setSelectedLoctrait(event)
        let selectedLocationtraits = [];
        if (value.option) {
            valLoc2.push(value.option);
            // if (value.option.LOCATION===parseInt(inputLoc)){ 
            //   ////////console.log(1234)
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
            // }else if(value.length > 0){
            //       swal(
            //         <div>     
            //           <p>{"Please Choose valid LOCATION"}</p>
            //         </div>
            //       )  
            // }
        } else {
            ////console.log("clear:")
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

        ////console.log("event:", event)
        ////console.log("value:", value)
        //setSelectedExcluded(event)
        let selectedExcluded_list = [];
        if (value.option) {
            valLoc3.push(value.option);
            // if (value.option.LOCATION===parseInt(inputLoc)){ 
            //   ////////console.log(1234)
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
            ////console.log("clear:")
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
        // console.log("selected:1:", selected, switchTableData);

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
            // console.log("selected:@:2:", delRows, updatedTable)
            var temp = {}
            temp["ALLOC_NO"] = searchData.ALLOC_NO
            temp["LOC_LIST"] = selected
            // console.log("ksarjaadasdadadas::", temp);
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
        // // //////console.log("updatedTable:",updatedTable)
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
                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
                        Location</InputLabel>
                </div>
                <div>
                    <Select
                        isDisabled={checkStore}
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

                        styles={styleSelect1}
                        value={locationRL.filter(obj => searchData?.LOCATION.includes(obj.STORE))}
                        components={animatedComponents}
                    />
                </div>
            </div>

            <div className={RulesLocationLeftClasses.header_child}>
                <div>
                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
                        Location List</InputLabel>
                </div>
                <div>
                    <Select
                        isDisabled={checkStore}
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
                        styles={styleSelect1}
                        value={locationListRL.filter(obj => searchData?.LOCATION_LIST.includes(obj.LOC_LIST))}
                        components={animatedComponents}
                    />
                </div>
            </div>

            <div className={RulesLocationLeftClasses.header_child}>
                <div>
                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
                        Location Traits</InputLabel>
                </div>
                <div>
                    <Select
                        isDisabled={checkStore}
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
                        styles={styleSelect1}
                        components={animatedComponents}
                    />
                </div>
            </div>


            <div className={RulesLocationLeftClasses.header_child}>
                <div >
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
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
                            // sx={{ width: "100%" }}
                            value={locationRL.filter(obj => searchData?.EXCLUDE_LOCATION.includes(obj.STORE))}
                            styles={styleSelect1}
                            components={animatedComponents}
                        />

                    </div>
                </div>
            </div>

            <div className={RulesLocationLeftClasses.header_child} >
                <div>
                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 2px", display: 'flex', float: 'left' }}>
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
                        // sx={{ width: "100%" }}
                        styles={styleSelect1}
                        components={animatedComponents}
                    />
                </div>
            </div>

            <div className={RulesLocationLeftClasses.header_child}>
                <div className={RulesLocationLeftClasses.header_child}>
                    <Button
                        sx={{
                            fontSize: "10px",
                            margin: "18px 0px 0px 0px",
                            padding: "5px",
                        }}
                        variant="contained">
                        Apply
                    </Button>
                </div>
                <div className={RulesLocationLeftClasses.header_child}>
                    <Button
                        sx={{
                            fontSize: "10px",
                            margin: "18px 0px 0px 0px",
                            padding: "5px",
                        }}
                        variant="contained">
                        Save Template
                    </Button>
                </div>
            </div>
        </div>
    )

    const handleswitchcheck = (e, val) => {
        // console.log("leftContData gtgtgt ", e, val);
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

                // console.log()
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
            // console.log("val:1: ", val, e.target.name);
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
        //console.log("agsfdjgafdljahgdkjahda::",e.target.name,e.target.value,val);
    }

    return (
        // <div className={RulesLocationLeftClasses.divBoxLeft}>

        <div>
            {!AllRetreiverRLdataCheck ?
                <Box
                    component="fieldset"
                    display="inline-block"
                    sx={{
                        backgroundColor: "",
                        height: "100%",
                        width: "98.5%",
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
                                                                        disabled={leftContData.RULE_TYPE != 'History'}
                                                                        size="small"
                                                                        name="check1"
                                                                        defaultChecked
                                                                        checked={check1 && leftContData.RULE_TYPE == 'History'}
                                                                        onChange={handleswitchRulecheck}
                                                                        value={leftContData.REGULAR_SALES_IND}
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
                                                                        float: 'left'
                                                                    }}>
                                                                    Regular</InputLabel>}
                                                            />
                                                        </div>
                                                        <div className={RulesLocationLeftClasses.header_child}>
                                                            <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                                                                control={
                                                                    <Switch
                                                                        disabled={leftContData.RULE_TYPE != 'History'}
                                                                        size="small"
                                                                        name="check2"
                                                                        defaultChecked
                                                                        checked={check2 && leftContData.RULE_TYPE == 'History'}
                                                                        onChange={handleswitchRulecheck}
                                                                        //  onClick={() => { setCheck1(!check1) }}
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
                                                                        float: 'left'
                                                                    }}>
                                                                    Promotional</InputLabel>}
                                                            />
                                                        </div>
                                                        <div className={RulesLocationLeftClasses.header_child}>
                                                            <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                                                                control={
                                                                    <Switch
                                                                        disabled={leftContData.RULE_TYPE != 'History'}
                                                                        size="small"
                                                                        name="check3"
                                                                        checked={check3 && leftContData.RULE_TYPE != 'Forecast'}
                                                                        // onChange={handleswitchcheck}
                                                                        onChange={handleswitchRulecheck}
                                                                        // value={leftContData.CLEARANCE_SALES_IND}
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

                                                                        size="small"
                                                                        name="check1"
                                                                        checked={checkStore}
                                                                        onChange={handleswitchcheck}
                                                                        // onClick={() => { setCheck1(!check1) }}
                                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                                    //disabled={searchData?.LOCATION.length != 0 || searchData?.LOCATION_LIST.length != 0 || searchData?.LOCATION_TRAITS.length != 0}

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
                                                            onChange={handleswitchRulecheck}
                                                            // onClick={() => { setCheck1(!check1) }}
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
                                                        checked={check5}
                                                        onChange={handleswitchRulecheck}
                                                        // onClick={() => { setCheck1(!check1) }}
                                                        inputProps={{ 'aria-label': 'controlled' }}
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
                                                            checked={checkRL2}
                                                            onChange={handleswitchcheck}
                                                            // onClick={() => { setCheck1(!check1) }}
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
                                                            float: 'left'
                                                        }}>
                                                        Enforce Store-WH RS</InputLabel>}
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
                                                            <div>
                                                                <FormControlLabel control={
                                                                    <Checkbox
                                                                        checked={check6}
                                                                        name="check6"
                                                                        //box-size="12px"
                                                                        style={{ transform: "scale(0.8)", }}

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
                                                                } label="Weeks from Today" />
                                                            </div>
                                                            {check6 ?
                                                                <div>
                                                                    <div className={RulesLocationLeftClasses.header_child}>
                                                                        <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                                                                            TY: </InputLabel>
                                                                        <TextField
                                                                            type="number"
                                                                            name="WEEKS_THIS_YEAR"
                                                                            value={leftContData.WEEKS_THIS_YEAR}
                                                                            onChange={handleswitchRulecheck}
                                                                            //onChange={(event)=>{setThisY(event.target.value)}}
                                                                            sx={{ width: "50px" }}
                                                                            // name="TY"
                                                                            id="formatted-numberformat-input"
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "25px" },
                                                                            }}
                                                                            variant="standard"
                                                                        />
                                                                    </div>

                                                                    <div className={RulesLocationLeftClasses.header_child}>
                                                                        <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                                                                            LY: </InputLabel>
                                                                        <TextField
                                                                            type="number"
                                                                            sx={{ width: "50px" }}
                                                                            name="WEEKS_LAST_YEAR"
                                                                            value={leftContData.WEEKS_LAST_YEAR}
                                                                            // value={values.numberformat}
                                                                            onChange={handleswitchRulecheck}
                                                                            //onChange={(event)=>{setLastY(event.target.value)}}
                                                                            // name="LY"
                                                                            id="formatted-numberformat-input"
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "25px" },
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
                                                                        //onChange={handleswitchcheck}
                                                                        style={{ transform: "scale(0.8)", }}
                                                                        onChange={(event) => {
                                                                            setCheck6(false);
                                                                            setCheck9(event.target.checked);
                                                                            if (!check9) {
                                                                                setThisY("");
                                                                                setLastY("");
                                                                            }
                                                                        }}
                                                                    />
                                                                } label="Start/End Dates" />

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
                                                                                value={startd1}
                                                                                onInput={(e) => {
                                                                                    let dayOfWeek = 6;
                                                                                    let date = new Date(e.target.value);
                                                                                    let diff = date.getDay() - dayOfWeek;
                                                                                    if (diff > 0) {
                                                                                        date.setDate(date.getDate() + 7);
                                                                                    }
                                                                                    else if (diff < 0) {
                                                                                        date.setDate(date.getDate() + ((-1) * diff))
                                                                                    }
                                                                                    setStartd1(date.toISOString().split('T')[0])
                                                                                    // console.log(date.toISOString());
                                                                                    // setEndd1("")
                                                                                    if (endd1 < date.toISOString().split('T')[0]) {
                                                                                        setEndd1("")
                                                                                    }
                                                                                }}
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
                                                                                // value={allocDetails[0].RELEASE_DATE}
                                                                                // defaultValue={allocDetails[0].RELEASE_DATE}
                                                                                InputProps={{
                                                                                    style: { fontSize: 12 },
                                                                                    shrink: true,
                                                                                    className: RulesLocationLeftClasses.input,
                                                                                }}
                                                                                onChange={handleswitchRulecheck}
                                                                            />
                                                                        </div>

                                                                        <div >
                                                                            <TextField
                                                                                value={startd2}
                                                                                onInput={(e) => {
                                                                                    let dayOfWeek = 6;//friday
                                                                                    let date = new Date(e.target.value);
                                                                                    let diff = date.getDay() - dayOfWeek;
                                                                                    if (diff > 0) {
                                                                                        date.setDate(date.getDate() + 7);
                                                                                    }
                                                                                    else if (diff < 0) {
                                                                                        date.setDate(date.getDate() + ((-1) * diff))
                                                                                    }
                                                                                    setStartd2(date.toISOString().split('T')[0])
                                                                                    // console.log(date.toISOString());
                                                                                    if (endd2 < date.toISOString().split('T')[0]) {
                                                                                        setEndd2("")
                                                                                    }

                                                                                }}
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
                                                                                // value={allocDetails[0].RELEASE_DATE}
                                                                                // defaultValue={allocDetails[0].RELEASE_DATE}
                                                                                InputProps={{
                                                                                    style: { fontSize: 12 },
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
                                                                                value={endd1}
                                                                                onInput={(e) => {
                                                                                    let dayOfWeek = 6;//friday
                                                                                    let date = new Date(e.target.value);
                                                                                    let diff = date.getDay() - dayOfWeek;
                                                                                    if (diff > 0) {
                                                                                        date.setDate(date.getDate() + 7);
                                                                                    }
                                                                                    else if (diff < 0) {
                                                                                        date.setDate(date.getDate() + ((-1) * diff))
                                                                                    }
                                                                                    setEndd1(date.toISOString().split('T')[0])
                                                                                    // console.log(date.toISOString());
                                                                                    //     // let abc={endd1}
                                                                                    //     // let bcd={startd1}


                                                                                    //     if (endd1 < startd1){
                                                                                    //       setEndd1("");
                                                                                    //   }
                                                                                }}
                                                                                variant="outlined"
                                                                                type="date"
                                                                                size="small"
                                                                                name="END_DATE1"
                                                                                format="yyyy/MM/dd"
                                                                                //   inputProps={{ max: currentDate() }}
                                                                                inputProps={{
                                                                                    min: startd1,


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
                                                                                    style: { fontSize: 12 },
                                                                                    shrink: true,
                                                                                    className: RulesLocationLeftClasses.input,
                                                                                }}
                                                                                onChange={handleswitchRulecheck}

                                                                            />
                                                                        </div>

                                                                        <div >
                                                                            <TextField
                                                                                value={endd2}
                                                                                onInput={(e) => {
                                                                                    let dayOfWeek = 6;//friday
                                                                                    let date = new Date(e.target.value);
                                                                                    let diff = date.getDay() - dayOfWeek;
                                                                                    if (diff > 0) {
                                                                                        date.setDate(date.getDate() + 7);
                                                                                    }
                                                                                    else if (diff < 0) {
                                                                                        date.setDate(date.getDate() + ((-1) * diff))
                                                                                    }
                                                                                    setEndd2(date.toISOString().split('T')[0])
                                                                                    // console.log(date.toISOString());
                                                                                }}
                                                                                variant="outlined"
                                                                                type="date"
                                                                                size="small"
                                                                                name="END_DATE2"
                                                                                format="yyyy/MM/dd"
                                                                                //shouldDisableDate={disablePrevDates}

                                                                                //   inputProps={{ max: currentDate() }}
                                                                                inputProps={{
                                                                                    min: startd2,
                                                                                }}
                                                                                sx={{
                                                                                    margin: "0px 0px 10px 2px", width: "120px"
                                                                                    , "& .MuiInputBase-input.Mui-disabled": {
                                                                                        backgroundColor: "#f0f0f0"
                                                                                    }
                                                                                }}
                                                                                id="outlined-disabled"
                                                                                label=""
                                                                                // value={allocDetails[0].RELEASE_DATE}
                                                                                // defaultValue={allocDetails[0].RELEASE_DATE}
                                                                                InputProps={{
                                                                                    style: { fontSize: 12 },
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
                                                                    }}
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
                                                                        //onChange={handleswitchcheck}
                                                                        style={{ transform: "scale(0.8)", }}
                                                                        onChange={(event) => {
                                                                            setCheck8(false);
                                                                            setCheck7(event.target.checked);
                                                                        }}
                                                                    />
                                                                } label="Weeks from Today" />
                                                            </div>

                                                            {check7 ?
                                                                <div>
                                                                    <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                                                                        WEEKS NO: </InputLabel>
                                                                    <TextField
                                                                        type="number"
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
                                                                        name="check8"
                                                                        style={{ transform: "scale(0.8)", }}
                                                                        //onChange={handleswitchcheck}
                                                                        onChange={(event) => {
                                                                            setCheck7(false);
                                                                            setCheck8(event.target.checked);
                                                                        }}
                                                                    />
                                                                } label="On Order Commit Date" />
                                                            </div>

                                                            {check8 ?
                                                                <div>
                                                                    <div>
                                                                        <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                                                                            Final Date: </InputLabel>
                                                                    </div>

                                                                    <div>
                                                                        <TextField
                                                                            variant="outlined"
                                                                            type="date"
                                                                            size="small"
                                                                            format="yyyy/MM/dd"
                                                                            name="ON_ORDER_COMMIT_DATE"
                                                                            //   inputProps={{ max: currentDate() }}
                                                                            sx={{
                                                                                margin: "0px 0px 10px 2px", width: "120px"
                                                                                , "& .MuiInputBase-input.Mui-disabled": {
                                                                                    backgroundColor: "#f0f0f0"
                                                                                }
                                                                            }}
                                                                            id="outlined-disabled"
                                                                            label=""
                                                                            value={leftContData.ON_ORDER_COMMIT_DATE}
                                                                            // defaultValue={allocDetails[0].RELEASE_DATE}
                                                                            InputProps={{
                                                                                style: { fontSize: 12 },
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
                                                        right: "0",
                                                        width: '80px'

                                                    }}
                                                    onClick={HandleAddButton}
                                                    variant="contained">
                                                    Add
                                                </Button>
                                            </div>
                                            <div>


                                                <Button
                                                    sx={{
                                                        fontSize: "12px",
                                                        // margin: "1px 0px 0px 0px",
                                                        // marginLeft: "300px",
                                                        // position: "absolute",
                                                        right: "0",
                                                        // top: "10%",
                                                        marginTop: "10px",
                                                        width: '80px'
                                                    }}
                                                    onClick={deleteRecords}
                                                    variant="contained">
                                                    Delete
                                                </Button>
                                            </div>
                                            <div>
                                                <Button
                                                    sx={{
                                                        fontSize: "12px",
                                                        // margin: "-55px 0px 0px 0px",
                                                        // marginLeft: "357px",
                                                        // position: "absolute",
                                                        right: "0",
                                                        //  top: "19%",
                                                        // top: "10px",
                                                        marginTop: "10px",
                                                        width: '80px'


                                                    }}
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
                                        margin: "0px 0px 0px 0px"
                                    }}
                                >
                                    <Box gridColumn="span 5">

                                        <div >
                                            <div >
                                                <div className={RulesLocationLeftClasses.header_child} >
                                                    <div >
                                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
                                                            Rule Type</InputLabel>
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
                                                            isClearable={true}
                                                            closeMenuOnSelect={true}
                                                            hideSelectedOptions={false}
                                                            // sx={{ width: "100%" }}
                                                            value={ruleType.filter(obj => leftContData?.RULE_TYPE === (obj.CODE_DESC))}
                                                            styles={styleSelect1}
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
                                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
                                                            Need</InputLabel>
                                                    </div>
                                                    <div>
                                                        <Select
                                                            isDisabled={leftContData.RULE_TYPE === "Manual"}
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
                                                            styles={styleSelect1}
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
                                                            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
                                                                Hierarchy</InputLabel>
                                                        </div>
                                                        <div>
                                                            <Select
                                                                isDisabled={leftContData.RULE_TYPE === "Manual"}
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
                                                                styles={styleSelect1}
                                                                components={animatedComponents}
                                                                value={Hierarchy.filter(obj => leftContData?.RULE_LEVEL === (obj.CODE_DESC))}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className={RulesLocationLeftClasses.header_child}>
                                                        <div>
                                                            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
                                                                Allocate To</InputLabel>
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
                                                                closeMenuOnSelect={true}
                                                                hideSelectedOptions={false}
                                                                // sx={{ width: "100%" }}
                                                                styles={styleSelect1}
                                                                components={animatedComponents}
                                                                value={Allocateto.filter(obj => leftContData?.NET_NEED_IND_VAL === (obj.CODE_DESC))}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={RulesLocationLeftClasses.header_child}>
                                                <div>
                                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 0px 0px", display: 'flex', float: 'left' }}>
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
                                                        closeMenuOnSelect={true}
                                                        hideSelectedOptions={false}
                                                        // sx={{ width: "100%" }}
                                                        styles={styleSelect1}
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
                                                        }}
                                                        onClick={handleClickOpen}
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
                                                        }}
                                                        variant="contained">
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
                                                        <EnhancedTableHead
                                                            //numSelected={selected.length}
                                                            order={order}
                                                            orderBy={orderBy}
                                                            //onSelectAllClick={handleSelectAllClick}
                                                            onRequestSort={handleRequestSort}
                                                            rowCount={loadWeightChangeRL.length}
                                                        />
                                                        <TableBody >
                                                            {stableSort(loadWeightChangeRL, getComparator(order, orderBy))
                                                                .map((row, index) => {
                                                                    // const isItemSelected = isSelected(row.EOW);
                                                                    // console.log("retrieveRuleDateRL555", retrieveRuleDateRL);
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
                                                                                    onKeyDown={((e) => {
                                                                                        // console.log(e.keyCode)
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
                                                            {loadWeightChangeRL.length < 5 ?
                                                                [...Array(5 - (loadWeightChangeRL.length)).keys()].map(val => (
                                                                    <TableRow  >
                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 4 }}></StyledTableCell>
                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 4 }}></StyledTableCell>
                                                                    </TableRow >
                                                                )) : false}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                {loadWeightChangeRL.length > 0 ? <EnhancedTableToolbar /> : null}
                                            </Paper>
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>



                                        <Button autoFocus onClick={HandleSaveChanges}>
                                            Save changes
                                        </Button>
                                    </DialogActions>
                                </BootstrapDialog>
                            </div>
                        </div> : null}


                </Box>
                : null}
        </div>
    )
})

export default LeftContainer