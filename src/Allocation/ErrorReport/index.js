import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from '@mui/material';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import { makeStyles, withStyles } from "@mui/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import InfoIcon from '@mui/icons-material/Info';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { getALLOCHEADDETAILSRequest, } from "../../Redux/Action/quantityLimits"
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import FormControlLabel from '@mui/material/FormControlLabel';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AnimationIcon from '@mui/icons-material/Animation';
import Checkbox from '@mui/material/Checkbox';
import AllOutIcon from '@mui/icons-material/AllOut';

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

const useStyles = makeStyles({
    maindiv: {
        position: "relative",
        // backgroundColor:"yellow",
        // width:"100%",
        //width: "calc(95vw - 0px)",
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
    header_container1: {
        display: "inline-block",
        width: "100%",
    }, header_container2: {
        //display: "inline-block",
        width: "100%",
        display: 'flex',
        // justifyContent:"end"
        flexDirection: 'column'
    },
    header_child: {
        display: "inline-block",
        // border: "1px solid red",
        padding: "0rem 0.2rem",
        verticalAlign: "middle",
    },
    header_child2: {
        display: "inline-block",
        // marginTop:"10px ",
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
    menu: provided => ({ ...provided, zIndex: 9999 }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
        // border:"1px solid pink"
    })
};
const styleSelectERR = {
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
        border: "1px solid black"
    }),
    clearIndicator: (base) => ({
        ...base,
        // paddingTop: 0,
        padding: 0,
        color: 'rgb(90,90,90)',
        // border:"1px solid orange"
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none',
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
    menu: provided => ({ ...provided, zIndex: 9999 }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
        // border:"1px solid pink"
    })
};
const POPreview = [
    { id: "ALLOC_NO", label: "Alloc ID", width: "80px" },
    { id: "SOURCE_ITEM", label: "Style", width: "80px" },
    { id: "DIFF_ID", label: "Variant", width: "80px" },
    { id: "TRAN_ITEM", label: "Sku", width: "80px" },
    { id: "TRAN_ITEM_DESC", label: "Description", width: "150px" },
    { id: "TO_LOC", label: "To Loc", width: "80px" },
    { id: "ERR_DESC", label: "Error Description", width: "200px" },
]

const options = [
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 2', label: 'Option 2' },
    { value: 'Option 3', label: 'Option 3' },
];
const ErrTableData = [
    {
        ALLOC_ID: '1607', ITEM_PARENT: '12345001', DIFF_ID: "BLUE", SKU: "1234501",
        DESCRIPTION: "Test Item-MEDIUM", TO_LOC: 10, ERROR_DESCRIPTION: "All the item are inactive/discontinued at some of the selected locations."
    },
    {
        ALLOC_ID: '1607', ITEM_PARENT: '12345001', DIFF_ID: "BLUE", SKU: "1234502",
        DESCRIPTION: "Test Item-SMALL", TO_LOC: 45, ERROR_DESCRIPTION: "All the item are inactive/discontinued at some of the selected locations."
    }
];
const ErrorReportScreen = ({ setOpen_ErrReport, errReportData, allocNoData, searchHeaderData }) => {
    const [errFltrData, setErrFltrData] = useState(errReportData);
    const ErrorReportStyle = useStyles();
    const [menu, setMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alloc_Dtls, SetAlloc_Dtls] = useState([]);
    const [check, setCheck] = useState(true)
    //CHECKBOX SELECT 
    const [selected, setSelected] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [inputVal, setInputVal] = useState({});
    const dispatch = useDispatch();
    const ErrorReportData = useSelector(
        (state) => state.CreateAllocationReducers
    );

    // Error popup message
    const [openDialogERR, setOpenDialogERR] = useState(false);
    const [DialogDataERR, setDialogDataERR] = useState("")
    // Manage columns popup in Table Grid
    const [openDialogManage, setOpenDialogManage] = useState(false);

    const [isSHovered, setIsHovered] = useState(false);

    const handleSEnter = () => { setIsHovered(true); };

    const handleSLeave = () => { setIsHovered(false); };
    // var check1 = true
    // useEffect(() => {
    //     if (check1) {
    //         if (alloc_Dtls.length === 0 && check) {
    //             dispatch(getALLOCHEADDETAILSRequest([allocNoData]));
    //             console.log("Error report allock")
    //             setLoading(true);
    //         }
    //         check1 = false
    //     }
    // }, []);

    useEffect(() => {
        if (ErrorReportData?.data?.allocHDetails && Array.isArray(ErrorReportData?.data?.allocHDetails)) {
            SetAlloc_Dtls(ErrorReportData?.data?.allocHDetails);
            setLoading(false);
            setCheck(false);
        }
    }, [ErrorReportData?.data]);
    // const Control = ({ children, ...props }) => (

    //     <components.Control {...props}>
    //         {children}
    //         <IconButton sx={{ backgroundColor: "", padding: "0px 0px 0px 0px", margin: "5px" }} >
    //             <InfoIcon fontSize="small" sx={{ fontSize: 16, color: "CadetBlue" }}
    //                 onClick={(e) => {
    //                     setOpenDialogERR(true);
    //                     setDialogDataERR(String(children[0].props.selectProps.value.label));
    //                 }}
    //             />
    //         </IconButton>
    //     </components.Control>
    // )
    // const [isIconClicked, setIsIconClicked] = useState(false);

    // const handleMenuOpen = () => {
    //   if (isIconClicked) {
    //     console.log("back click")
    //     setIsIconClicked(false);
    //     return false;
    //   }
    //   return true;
    // };

    // const handleMenuClose = () => {
    //   setIsIconClicked(false);
    // };
    // const Control = ({ children, ...props }) => (
    //     <components.Control {...props}>
    //       {children}
    //       <IconButton
    //         sx={{ backgroundColor: '', padding: '0px 0px 0px 0px', margin: '5px' }}
    //         onClick={() => {
    //           setIsIconClicked(true);
    //           swal(children[0].props.selectProps.value.label);
    //         }}
    //       >
    //         <InfoIcon fontSize="small" sx={{ fontSize: 16, color: 'CadetBlue' }} />
    //       </IconButton>
    //     </components.Control>
    //   );

    const SearchButtonTrend = (input) => (

        <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
            <InfoIcon fontSize="small" sx={{ fontSize: 16, color: "CadetBlue" }}
                onClick={() => {
                    setOpenDialogERR(true);
                    setDialogDataERR(String(input[(Object.keys(input))[0]]));
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
    const handleClose = () => {
        setOpen_ErrReport(false);

    };
    const ErrorSearch = () => (
        <Box
            component="fieldset"
            display="flex"
            justifyContent={"space-between"}
            sx={{
                // backgroundColor: "yellow",
                height: "auto",
                width: "100%",
                // width: "calc(84vw - 0px)",
                borderRadius: 1,

                boxShadow: 2, border: 0,
                borderBottom: 3,
                border: "1px solid lightgrey",
                // width: "100%",
            }}
        >

            <legend style={{ fontWeight: "bold", color: "#191970" }}>Error Report</legend>

            <div className={ErrorReportStyle.header_container2}>
                <div className={ErrorReportStyle.header_container1} >
                    <div className={ErrorReportStyle.header_child}>
                        <div>
                            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                Allocation ID</InputLabel>
                        </div>

                        <div>
                            {/* <Select
                                // className= {CreateAllocationClasses.inputField}
                                classNamePrefix="mySelect"

                                //onChange={}
                                maxMenuHeight={180}
                                placeholder={"Allocation ID"}
                                // hideSelectedOptions={false}
                                styles={styleSelect}
                                menuPlacement="auto"
                                isSearchable={true}
                               // components={customComponents}

                                isClearable={true}
                                // value={UniqDept.filter(obj => searchDataCCommon?.HIER1.includes(obj.HIER1))}
                                closeMenuOnSelect={false}
                            //isDisabled
                            /> */}
                            <TextField
                                size="small"
                                sx={{
                                    margin: "0px 0px 2px 2px",
                                    width: "100px",
                                    "& .MuiInputBase-input.Mui-disabled": {
                                        backgroundColor: "#f0f0f0",
                                        borderRadius: "5px",
                                        height: "13px",
                                    },
                                    input: {
                                        "&::placeholder": {
                                            opacity: 1,
                                        },
                                    }
                                }}
                                id="outlined-disabled"
                                // value={alloc_Dtls.length > 0 ? alloc_Dtls[0].ALLOC_NO : null}
                                value={searchHeaderData ? searchHeaderData.ALLOC_NO : null}
                                // name="ALLOC_NO"
                                // placeholder="ALLOC_NO"
                                inputProps={{
                                    maxLength: 100, sx: { backgroundColor: '#fff' }
                                }}
                                InputProps={{
                                    style: { fontSize: 12, height: "30px" },
                                    className: ErrorReportStyle.input,
                                }}
                                disabled
                            />
                        </div>
                    </div>

                    <div className={ErrorReportStyle.header_child} display="flex">
                        <div>
                            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                Description</InputLabel>
                        </div>
                        <div >
                            <TextField
                                size="small"
                                value={searchHeaderData ? searchHeaderData.ALLOC_DESC : null}
                                sx={{
                                    margin: "0px 0px 2px 2px", width: "25vh"
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
                                // name="ALLOC_DESC"
                                // placeholder="ALLOC_DESC"
                                //   value={searchHeaderData.ALLOC_DESC}
                                // value={allocDetails[0].ALLOC_DESC}
                                // defaultValue={allocDetails[0].ALLOC_DESC}
                                //InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                                inputProps={{
                                    maxLength: 100, sx: { backgroundColor: '#fff' },
                                }}
                                InputProps={{
                                    endAdornment: <SearchButtonTrend desc={searchHeaderData.ALLOC_DESC} />,
                                    style: { fontSize: 12, backgroundColor: "#f0f0f0", },
                                    className: ErrorReportStyle.input,
                                }}

                                disabled
                            />
                        </div>
                    </div>
                </div>
                {/* <div className={ErrorReportStyle.header_container1} >
                    <div className={ErrorReportStyle.header_child}>
                        <div>
                            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                Error Msg</InputLabel>
                        </div>

                        <div  >
                            <Select
                                // className= {CreateAllocationClasses.inputField}
                                classNamePrefix="mySelect"
                                options={options}
                                //onChange={}
                                maxMenuHeight={180}
                                placeholder={"Error Msg"}
                                // hideSelectedOptions={false}
                                styles={styleSelectERR}
                                //menuPlacement="auto"
                                isSearchable={true}
                                components={{ Control,DropdownIndicator: null, }}
                                // components={{
                                //     IndicatorSeparator: null,
                                //     //DropdownIndicator: null,
                                //     Indicator: () => null,
                                //     IndicatorContainer: SearchButtonTrend
                                // }}
                                
                                isClearable={true}
                                // onMenuOpen={handleMenuOpen}
                                //  onMenuClose={handleMenuClose}
                               // closeMenuOnSelect={false}
                               // onMenuOpen={handleMenuOpen}
                            //isDisabled
                           
                            />
                            

                        </div>
                    </div>
                </div> */}
            </div>
            <div className={ErrorReportStyle.header_container2} align="right"
            >
                {/* <div className={ErrorReportStyle.header_child2}
                    style={{
                        margin: "0px 0px 0px 0px",
                        // backgroundColor: "yellow" ,
                    }}>

                    <Button
                        sx={{
                            height: "fit-content", width: "100px", padding: "5px", marginTop: "5px",
                            // backgroundColor: "green", '&:hover': {
                            //     backgroundColor: "#228B22", textShadow: "0 0 #000"
                            // }, 
                            fontSize: "12px", //margin: "2px 5px 0px 0px",
                        }}
                        size='medium'
                        variant="contained"
                        type="submit"
                        // onClick={handleClose}
                        startIcon={<SearchIcon />}
                    >
                        Search</Button>
                </div>
                <div className={ErrorReportStyle.header_child2}
                    style={{
                        margin: "0px 0px 0px 0px",
                        // backgroundColor: "yellow" ,
                    }}>

                    <Button
                        sx={{
                            height: "fit-content", width: "100px", padding: "5px", marginTop: "5px",
                            backgroundColor: "#B22202", '&:hover': {
                                backgroundColor: "#B22202",
                            }, fontSize: "12px", //margin: "2px 5px 0px 0px",
                        }}
                        size='medium'
                        variant="contained"
                        type="submit"
                        // onClick={handleClose}
                        startIcon={<RefreshIcon />}
                    >
                        Refresh</Button>
                </div> */}
                <div className={ErrorReportStyle.header_child2}
                    style={{
                        margin: "15px 0px 0px 0px",
                        // backgroundColor: "yellow" ,
                    }}>

                    <Button
                        sx={{
                            height: "fit-content", width: "100px", padding: "5px", marginTop: "5px",
                            backgroundColor: "green", '&:hover': {
                                backgroundColor: "#228B22", textShadow: "0 0 #000"
                            }, fontSize: "12px", //margin: "2px 5px 0px 0px",
                        }}
                        size='medium'
                        variant="contained"
                        type="submit"
                        onClick={handleClose}
                        startIcon={<DoneAllIcon />}
                    >
                        OK</Button>
                </div>
            </div>

        </Box>
    )
    function ERTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead
                    className={ErrorReportStyle.TitleHead}
                // sx={{ position: "sticky", top: 0, zIndex: "1" }}
                >
                    <TableRow className={ErrorReportStyle.TitleRow}
                    // sx={{ border: "1px solid red" }}

                    >
                        {POPreview.map((headCell) => (ManageHeaderData.includes(headCell.id) &&
                            <StyledTableCell
                                key={headCell.id}
                                // className={ErrorReportStyle.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    // height:"22px",
                                    whiteSpace: "nowrap", paddingLeft: "3px",
                                    width: headCell.width
                                    // border: "1px solid black"
                                }}
                            // sx={{ padding: "1px", textAlign: "left", fontSize: "11px", backgroundColor: "DodgerBlue", paddingLeft: "3px" }}

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

    const DI_DetailsTable = () => (

        <Box
            component="fieldset"
            display="inline-block"
            sx={{
                backgroundColor: "",
                height: "auto",
                //width: "calc(93vw - 0px)",
                width: "100%",
                // width: "calc(84vw - 0px)",
                borderRadius: 1,

                boxShadow: 2, border: 0,
                borderBottom: 3,
                border: "1px solid lightgrey",
                margin: "5px 0px 0px 2px"
            }}
        >
            <Box display="flex" justifyContent="flex-end" sx={{ paddingTop: "0px" }}>
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                        style={{
                            flex: "1",
                            backgroundColor: isSHovered ? '#f5f5f5' : 'white',
                            borderRadius: '20%',
                            padding: "0px 8px 0px 8px",
                            margin: "2px 0px 0px 2px",
                            // border: "1px solid red",
                            height: "30px", minHeight: "30px",
                        }}
                        title="Manage Columns"
                        onMouseEnter={handleSEnter}
                        onMouseLeave={handleSLeave}
                    >
                        <ViewColumnIcon style={{ padding: "0px", backgroundColor: isSHovered ? '#f5f5f5' : 'white', marginTop: "2px", color: "DodgerBlue" }} onClick={HandleManageHeader} title="Manage Columns" />
                    </div>
                </div>
            </Box>
            <legend style={{
                fontWeight: "bold",//fontSize: "16px",
                color: "#191970"
            }}>Search Results</legend>

            {/* <legend style={{ fontWeight: "bold", fontSize: "14px",color: "#191970",paddingLeft:"6px" }}>DI&nbsp;DETAILS</legend> */}

            <Paper sx={{ margin: "2px 0px 0px 0px", }}
            //sx={{ margin: "0px 0px 0px 5px", width: '100%', mb: 0, height: "auto", width: "calc(92vw - 0px)", borderRadius: 1, boxShadow: 2, border: 0, borderBottom: 3, }}
            >
                <TableContainer style={{
                    maxHeight: "425px",//maxHeight: "fit-content", 
                    width: "100%",//width: "calc(100% - 0px)",
                    borderRadius: '7px'
                }}
                    component={Paper}
                //  sx={{ position: "sticky", top: -1, }}
                >
                    <Table aria-label="customized table">
                        <ERTableHead
                            numSelected={selected.length}
                            //  onSelectAllClick={handleSelectAllClick}
                            //  rowCount={filtrdLocGrpData.length}
                            onRequestSort={handleRequestSort}
                            order={order}
                            orderBy={orderBy}
                        />
                        <TableBody >
                            {ManageHeaderData.includes('ALLOC_NO') ?
                                <TableCell sx={{
                                    padding: "0px", height: "22px"
                                }}>
                                    <TextField
                                        onChange={gridFilter}
                                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("ALLOC_NO") > 0 ? inputVal.ALLOC_NO : ""}
                                        placeholder="Alloc ID"
                                        autoComplete="off"
                                        InputProps={{
                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                        }}
                                        sx={{ width: "100%", }}
                                        variant="standard"
                                        inputProps={{
                                            sx: {
                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                            },
                                        }}
                                        name="ALLOC_NO"
                                    />
                                </TableCell>
                                : null}
                            {ManageHeaderData.includes('SOURCE_ITEM') ?
                                <TableCell sx={{
                                    padding: "0px",
                                }}>
                                    <TextField
                                        name="SOURCE_ITEM"
                                        onChange={gridFilter}
                                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("SOURCE_ITEM") > 0 ? inputVal.SOURCE_ITEM : ""}
                                        placeholder="Style"
                                        autoComplete="off"
                                        InputProps={{
                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                        }}
                                        sx={{ width: "100%", }}
                                        variant="standard"
                                        inputProps={{
                                            sx: {
                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                            },
                                        }}
                                    />

                                </TableCell> : null}
                            {ManageHeaderData.includes('DIFF_ID') ?
                                <TableCell sx={{
                                    padding: "0px",
                                }}>
                                    <TextField
                                        name="DIFF_ID"
                                        onChange={gridFilter}
                                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("DIFF_ID") > 0 ? inputVal.DIFF_ID : ""}
                                        placeholder="Variant"
                                        autoComplete="off"
                                        InputProps={{
                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                        }}
                                        sx={{ width: "100%", }}
                                        variant="standard"
                                        inputProps={{
                                            sx: {
                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                            },
                                        }}
                                    />
                                </TableCell> : null}
                            {ManageHeaderData.includes('TRAN_ITEM') ?
                                <TableCell sx={{
                                    padding: "0px",
                                }}>
                                    <TextField
                                        name="TRAN_ITEM"
                                        onChange={gridFilter}
                                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("TRAN_ITEM") > 0 ? inputVal.TRAN_ITEM : ""}
                                        placeholder="Sku"
                                        autoComplete="off"
                                        InputProps={{
                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                        }}
                                        sx={{ width: "100%", }}
                                        variant="standard"
                                        inputProps={{
                                            sx: {
                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                            },
                                        }}
                                    />
                                </TableCell> : null}
                            {ManageHeaderData.includes('TRAN_ITEM_DESC') ?
                                <TableCell sx={{
                                    padding: "0px",
                                }}>
                                    <TextField
                                        name="TRAN_ITEM_DESC"
                                        onChange={gridFilter}
                                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("TRAN_ITEM_DESC") > 0 ? inputVal.TRAN_ITEM_DESC : ""}
                                        placeholder="Description"
                                        autoComplete="off"
                                        InputProps={{
                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                        }}
                                        sx={{ width: "100%", }}
                                        variant="standard"
                                        inputProps={{
                                            sx: {
                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                            },
                                        }}
                                    />
                                </TableCell> : null}
                            {ManageHeaderData.includes('TO_LOC') ?
                                <TableCell sx={{
                                    padding: "0px",
                                }}>
                                    <TextField
                                        name="TO_LOC"
                                        onChange={gridFilter}
                                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("TO_LOC") > 0 ? inputVal.TO_LOC : ""}
                                        placeholder=" To Loc"
                                        autoComplete="off"
                                        InputProps={{
                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                        }}
                                        sx={{ width: "100%", }}
                                        variant="standard"
                                        inputProps={{
                                            sx: {
                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                            },
                                        }}
                                    />
                                </TableCell> : null}
                            {ManageHeaderData.includes('ERR_DESC') ?
                                <TableCell sx={{
                                    padding: "0px",
                                }}>
                                    <TextField
                                        name="ERR_DESC"
                                        onChange={gridFilter}
                                        value={Object.keys(inputVal).length > 0 && Object.keys(inputVal).includes("ERR_DESC") > 0 ? inputVal.ERR_DESC : ""}
                                        placeholder="Error Description"
                                        autoComplete="off"
                                        InputProps={{
                                            sx: { fontSize: 12, padding: "0px", height: "20px", textAlign: "left", }
                                        }}
                                        sx={{ width: "100%", }}
                                        variant="standard"
                                        inputProps={{
                                            sx: {
                                                fontSize: 12, padding: "0px 0px 0px 3px", height: "20px", textAlign: "left",
                                                "&::placeholder": { textAlign: "left", padding: "0px", },
                                            },
                                        }}
                                    />
                                </TableCell> : null}
                            {errFltrData.length > 0 ?
                                stableSort(errFltrData, getComparator(order, orderBy)).map(row => (
                                    <TableRow  >
                                        {ManageHeaderData.includes('ALLOC_NO') ?
                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", height: "20px" }}>{row.ALLOC_NO}</TableCell>
                                            : null}
                                        {ManageHeaderData.includes('SOURCE_ITEM') ?
                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }}>{row.SOURCE_ITEM}</TableCell>
                                            : null}
                                        {ManageHeaderData.includes('DIFF_ID') ?
                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} >{row.DIFF_ID}</TableCell>
                                            : null}
                                        {ManageHeaderData.includes('TRAN_ITEM') ?
                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.TRAN_ITEM}</TableCell>
                                            : null}
                                        {/* <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px", }} textAlign="right">{row.TRAN_ITEM_DESC}</TableCell> */}
                                        {ManageHeaderData.includes("TRAN_ITEM_DESC") ?
                                            <TableCell
                                                sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px', height: "20px" }} >
                                                {String(row.TRAN_ITEM_DESC).length > 0 ? <Box
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
                                                        {row.TRAN_ITEM_DESC}
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
                                                        className={ErrorReportStyle.textField}
                                                        onClick={() => {
                                                            setOpenDialogERR(true);
                                                            setDialogDataERR(String(row.TRAN_ITEM_DESC));
                                                        }}
                                                        startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                    >
                                                    </Button>
                                                </Box> : null}
                                            </TableCell>
                                            : null}
                                        {ManageHeaderData.includes("TO_LOC") ?
                                            <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", }} textAlign="right">{row.TO_LOC}</TableCell>
                                            : null}
                                        {ManageHeaderData.includes("ERR_DESC") ?
                                            <TableCell
                                                sx={{ padding: "0px 0px 0px 3px", textAlign: "left", fontSize: "12px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px', height: "20px" }} >
                                                {String(row.ERR_DESC).length > 0 ?
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
                                                                paddingLeft: "0px",
                                                                paddingRight: "0px",
                                                                // width:"70px"
                                                            }}
                                                        >
                                                            {row.ERR_DESC}
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
                                                            className={ErrorReportStyle.textField}
                                                            onClick={() => {
                                                                setOpenDialogERR(true);
                                                                setDialogDataERR(String(row.ERR_DESC));
                                                            }}
                                                            startIcon={<InfoIcon style={{ fontSize: 16, backgroundColor: "" }} />}
                                                        >
                                                        </Button>
                                                    </Box> : null}
                                            </TableCell>
                                            : null}
                                    </TableRow >
                                )) : null}
                            {errFltrData.length < 16 ?
                                [...Array(16 - errFltrData.length).keys()].map(val => (
                                    <TableRow  >
                                        {ManageHeaderData.map((row, index) => {
                                            return (
                                                <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px 0px 0px 3px", height: "22px" }}></TableCell>
                                            )
                                        })}
                                        {/* // <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px", }}></TableCell>
                                        // <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px", }} ></TableCell>
                                        // <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px", }} textAlign="right"></TableCell>
                                        // <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px", }} textAlign="right"></TableCell>
                                        // <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px", }} textAlign="right"></TableCell>
                                        // <TableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: "0px", }} textAlign="right"></TableCell> */}

                                    </TableRow >
                                )) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>

    )

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
        else { setOpenDialogERR(true); setDialogDataERR("Table must contain atleast one column."); }
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
    /*
                      #########################################
                      ######### SORTING FUNCTIONALITY #########
                      #########################################
  */

    function descendingComparator(a, b, orderBy) {

        let c, d;
        if (orderBy === "ITEM") {
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
    const handleRequestSort = (event, property) => {
        const isAsc = (orderBy === property && order === 'asc');
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    /*
                      #########################################
                      ######### INLINE-FILTER FUNCTIONALITY #########
                      #########################################
  */
    const gridFilter = (e) => {
        setInputVal((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    useEffect(() => {
        if (Object.keys(inputVal).length > 0) {

            for (let i = 0; i < Object.keys(inputVal).length; i++) {
                var temp_dict = {}
                if (inputVal[Object.keys(inputVal)[i]].includes("&") || inputVal[Object.keys(inputVal)[i]].includes("%")) {
                    inputVal[Object.keys(inputVal)[i]].slice(1);

                    temp_dict[Object.keys(inputVal)[i]] = inputVal[Object.keys(inputVal)[i]].slice(1)
                    if (temp_dict) {
                        for (const key in temp_dict) {
                            if (temp_dict[key] === '') {
                                delete temp_dict[key];
                            }
                        }
                    }
                    const temp = errReportData.filter((props) => String(props[Object.keys(inputVal)[i]]).toLowerCase() === String(temp_dict[Object.keys(inputVal)[i]]).toLowerCase())
                    setErrFltrData(temp);
                }
                else {
                    const filteredTable = errReportData.filter((props) =>
                        Object.entries(inputVal).every(
                            ([key, val]) =>
                                !val.length ||
                                props[key]
                                    ?.toString()
                                    .toLowerCase()
                                    .includes(val?.toString().toLowerCase())
                        )
                    );
                    setErrFltrData(filteredTable);
                }
            }
        } else if (Object.keys(inputVal).length === 0) {
            setErrFltrData(errReportData);
        }
    }, [inputVal]);

    const handleCloseDialog = (e) => {
        setOpenDialogERR(false);
        setDialogDataERR("")
    }
    return (
        <Box className={ErrorReportStyle.maindiv} //sx={{  width: "calc(60vw - 0px)",backgroundColor:"green"}}
        >
            <div >
                {ErrorSearch()}
            </div>
            <div>
                {DI_DetailsTable()}
            </div>
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth="xs"
                    open={openDialogERR}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    disableBackdropClick
                >
                    <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px", }}></DialogTitle>
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", }} >
                        {DialogDataERR}
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

};

export default ErrorReportScreen;