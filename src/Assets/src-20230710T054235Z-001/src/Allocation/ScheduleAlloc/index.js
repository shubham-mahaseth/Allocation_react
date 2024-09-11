import React, { useEffect, useState, memo } from 'react';
import ReactDOM from "react-dom/client";
import { makeStyles, withStyles, styled } from "@mui/styles";
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import InfoIcon from '@mui/icons-material/Info';
// import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import swal from '@sweetalert/with-react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import { getALLOCHEADDETAILSRequest, } from "../../Redux/Action/quantityLimits"
import { postSchdlsvRequest, postSchdlrtvRequest } from "../../Redux/Action/createAllocation";
import { useDispatch, useSelector } from "react-redux";
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


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

    textField: {
        marginRight: "10px !important",
    },
    float_container: {
        display: "inline-block",
        margin: "0rem 0.17rem",
        // padding: "1rem 1rem",
        // text-align: center;
    },
    float_container4: {
        display: "inline-block",
        margin: "0rem 0.17rem",
        padding: "0px ",
        // border:"1px solid red"
        // padding: "1rem 1rem",
        // text-align: center;
    },
    float_container2: {
        display: "inline-block",
        margin: "0rem 0.17rem",
        // padding: "1rem 1rem",
        // text-align: center;
    },
    float_container3: {
        display: "inline-block",
        margin: "0px 0px 0px 0px",
        //border: "1px solid red",
        padding: "0px"
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
    container_child: {
        float: "left"
    },
    multiselectfield: {
        display: "inline-block",
        padding: "0px",
        // border: "1px solid red",
        margin: "0rem",
        //padding: "0rem 0rem",
        verticalAlign: "middle",
    },
    course_box: {
        width: "100%",
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
    inputFielddate: {
        width: "184px",
        // margin:"10px 0px 0px 0px",
        height: 30,
        // border: 0,
        // backgroundColor:"#f0f0f0",
        '& input + fieldset': {
            // borderColor: 'gray',
            borderRadius: "0",
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        },
    },
    inputField1: {
        width: "100px",
        // margin:"10px 0px 0px 0px",
        height: 38,
        backgroundColor: "#f0f0f0",
        '& input + fieldset': {
            // borderColor: 'gray',
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        },
    },
    inputField: {
        width: "180px",
        // margin:"10px 0px 0px 0px",
        height: 38,
        backgroundColor: "#f0f0f0",
        '& input + fieldset': {
            // borderColor: 'gray',
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
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
        color: 'black',
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


const statusObj = [
    { code: 'WS', value: 'Worksheet' },
    { code: 'A', value: 'Approved' },
    { code: 'R', value: 'Reserved' }
];
const ScheduleAlloc = ({ allocNoData, setOpen_Schdl, setTab, setRTabCond, setDisCond, tab,
    searchHeaderData, setIsLoading, schdlData, ApproveFreeseCheck, setSchedulescreenTabColor, setOkScheduleCheck }) => {
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
    const initialData = {
        ALLOC_NO: "",
        ALLOC_DESC: "",
        DATE_TO: "",
        DATE_FROM: "",
        CREATE_DATE: convertDateFormat2(new Date().toISOString().slice(0, 10)),
        CREATE_ID: "",
        MODIFIED_BY: JSON.parse(localStorage.getItem("userData"))?.username,
        MODIFIED_DATE: convertDateFormat2(new Date().toISOString().slice(0, 10)),
        STATUS: "",
        DAY: "0000000",
        FREQUENCY: "W",
    }
    const [sendData, setSendData] = useState(initialData);
    const [sendDataChk, setSendDataChk] = useState(false);
    const [statusData, setStatusData] = useState(statusObj);
    const [alloc_Dtls, SetAlloc_Dtls] = useState("");
    const [refData, setRefData] = useState([]);
    const [loadSchdl, setLoadSchdl] = useState(false);
    //const [isLoading, setIsLoading] = useState(false);
    const [initCheck, setInitCheck] = useState(true);
    var refreshData = []
    const ScheduleAllocation = useStyles();
    const ScheduleData = useSelector(
        (state) => state.CreateAllocationReducers
    );

    // Error popup message
    const [openDialogSCDL, setOpenDialogSCDL] = useState(false);
    const [DialogDataSCDL, setDialogDataSCDL] = useState("")
    /*
        ####################################
        ######   REACT DATE PICKER    ######
        ####################################
      */


    // Define a CSS class for the shared styles
    const sharedInputClass = {
        fontSize: '12px',
        height: '30px',
        width: "180px",
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    };
    const sharedInputClassDis = {
        fontSize: '12px',
        height: '30px',
        width: "180px",
        backgroundColor: "#f0f0f0",
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    };
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const handleYearClick = () => {
        setIsYearDropdownOpen(!isYearDropdownOpen);
    };
    console.log("sendDate", sendData
    )

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

    const initialDateString = dateFrom;//searchHeaderData.RELEASE_DATE;
    const initialDateParts = initialDateString.length > 0 ? initialDateString.split('-') : "";
    const initialDateFrom = initialDateString.length > 0 ? new Date(
        Number('20' + initialDateParts[2]), // Year
        Number(initialDateParts[0]) - 1, // Month (0-based index)
        Number(initialDateParts[1]) // Day
    ) : null;

    const initialDateStringT0 = dateTo;//searchHeaderData.RELEASE_DATE;
    const initialDatePartsTO = initialDateStringT0.length > 0 ? initialDateStringT0.split('-') : "";
    const initialDateTo = initialDatePartsTO.length > 0 ? new Date(
        Number('20' + initialDatePartsTO[2]), // Year
        Number(initialDatePartsTO[0]) - 1, // Month (0-based index)
        Number(initialDatePartsTO[1]) // Day
    ) : null;
    // console.log("initialDateTo ::", initialDateTo)
    const validateDateInput = (input) => {
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



    const dispatch = useDispatch();

    useEffect(() => {

        document.title = 'Allocation Details';
    }
        , []);

    useEffect(() => {

        if (initCheck && schdlData.length > 0) {
            setSendData((prevData) => ({
                ...prevData,
                ALLOC_NO: searchHeaderData.ALLOC_NO,
                ALLOC_DESC: searchHeaderData.ALLOC_DESC,
                DATE_TO: schdlData[0].END_DATE,
                DATE_FROM: schdlData[0].START_DATE,
                CREATE_DATE: convertDateFormat2(schdlData[0].CREATE_DATETIME),
                CREATE_ID: schdlData[0].CREATE_ID,
                MODIFIED_BY: schdlData[0].LAST_UPDATE_ID,
                MODIFIED_DATE: convertDateFormat2(schdlData[0].LAST_UPDATE_DATETIME),
                STATUS: schdlData[0].CHILD_ALLOC_STATUS,
                DAY: schdlData[0].DAYS_OF_WEEK,
                FREQUENCY: schdlData[0].FREQUENCY,
            }));
            setDateFrom(convertDateFormat2(schdlData[0].START_DATE));
            setDateTo(convertDateFormat2(schdlData[0].END_DATE));
            schdlData.splice(0, schdlData.length);
            setInitCheck(false);

        } else if (Object.keys(searchHeaderData).length > 0 && schdlData.length === 0) {
            setSendData((prevData) => ({
                ...prevData,
                ALLOC_NO: searchHeaderData.ALLOC_NO,
                ALLOC_DESC: searchHeaderData.ALLOC_DESC,
                CREATE_ID: searchHeaderData.CREATE_ID,

            }));
        }
    }, [""]); // 

    useEffect(() => {
        if (ScheduleData?.data?.allocHDetails && Array.isArray(ScheduleData?.data?.allocHDetails)) {
            SetAlloc_Dtls(ScheduleData?.data?.allocHDetails);
        }
    }, [ScheduleData?.data]);


    useEffect(() => {
        if (ScheduleData?.data?.schdlrtn) {
            if (ScheduleData?.data?.schdlrtn?.status === 200) {
                setOpen_Schdl(false);
                setTab('1');
                setRTabCond(false);
                setDisCond(0);
                setIsLoading(false);
                setLoadSchdl(false);
                setOkScheduleCheck(true);
                setSchedulescreenTabColor(false);  //Tab color changing to green for Schedule screen
                ScheduleData.data.schdlrtn.status = 0
            } if (ScheduleData?.data?.schdlrtn?.status === 500) {
                setOpen_Schdl(false);
                setTab('1');
                setRTabCond(false);
                setDisCond(0);
                setIsLoading(false);
                setLoadSchdl(false);
                setSchedulescreenTabColor(true);  //Tab color changing to red for Schedule screen
                ScheduleData.data.schdlrtn.status = 0
            }
        }
    }, [ScheduleData?.data]);
    useEffect(() => {
        if (sendDataChk) {

            refreshData.push(sendData);
            setRefData(sendData)
            if (!ApproveFreeseCheck) {
                dispatch(postSchdlsvRequest([sendData]));
                //setIsLoading(true);
                setLoadSchdl(true);
            }
            if (ApproveFreeseCheck) {
                setOpen_Schdl(false);
                setTab('1');
                setRTabCond(false);
                setDisCond(0);
            }
            setSendDataChk(false);
        }
    }, [sendDataChk]);

    const SearchButtonTrend = (input) => (
        <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
            <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
                onClick={() => {
                    setOpenDialogSCDL(true);
                    setDialogDataSCDL(String(input[(Object.keys(input))[0]]));
                }}
            />
        </IconButton>

    );
    const [breaker, setBreaker] = useState("");
    const handleDatePicker = (name, date) => {
        const Cdate = new Date(date);
        const year = Cdate.getFullYear();
        const month = String(Cdate.getMonth() + 1).padStart(2, '0');
        const day = String(Cdate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        console.log("name", name, date)
        switch (name) {
            case "DATE_FROM":
                // setSendData((prevState) => ({
                //     ...prevState,
                //     DATE_FROM: formattedDate,
                // }));
                // setDateFrom(convertDateFormat2(date));
                if (date === null || (dateTo.length !== 0 && convertDateFormat2(date) > dateTo)) {
                    if (date === null || String(date).length === 0) {
                        setSendData((prevState) => ({
                            ...prevState,
                            DATE_FROM: "",
                        }));
                        setDateFrom("");
                        return;
                    }

                    setOpenDialogSCDL(true);
                    setDialogDataSCDL("From Date cannot be greater To Date");
                } else {
                    setSendData((prevState) => ({
                        ...prevState,
                        DATE_FROM: formattedDate,
                    }));
                    setDateFrom(convertDateFormat2(date));
                }
                break;
            case "DATE_TO":
                console.log(convertDateFormat2(date) < dateFrom, convertDateFormat2(date), dateFrom)
                if (convertDateFormat2(date) < dateFrom) {
                    if (date === null || String(date).length === 0) {
                        setSendData((prevState) => ({
                            ...prevState,
                            DATE_TO: "",
                        }));
                        setDateTo("");
                        return;
                    }
                    setOpenDialogSCDL(true);
                    setDialogDataSCDL("From Date cannot be greater To Date");
                    //     }
                    // }}   
                    //     if (date < searchData.RELEASE_DATE_FROM) {
                    //         setOpenDialogQL(true);
                    //         setDialogDataQL("RELEASE_DATE_TO cannot be earlier than RELEASE_DATE_FROM");
                } else {
                    setSendData((prevState) => ({
                        ...prevState,
                        DATE_TO: formattedDate,
                    }));
                    setDateTo(convertDateFormat2(date));
                }
                break;
            default:
                break;
        }
        return;
    }
    const handleDateChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log("Orginal Date :: ", name, value);
        if (
            (name === "DATE_FROM" && new Date(value) > new Date(sendData.DATE_TO)) ||
            (name === "DATE_TO" && new Date(sendData.DATE_FROM) > new Date(value))
        ) {
            setOpenDialogSCDL(true);
            setDialogDataSCDL("From Date cannot be greater To Date");
        } else {
            setSendData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const handleAllocationDay = (event) => {

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const val = event.target.checked ? 1 : 0
        const index = days.indexOf(event.target.id)
        const temp = (sendData.DAY).substring(0, index) + (val).toString()
            + (sendData.DAY).substring(index + (val).toString().length);
        setSendData((prevState) => ({
            ...prevState,
            DAY: temp,
        }));
    };
    const handleStatus = (value) => {
        if (value) {
            setSendData((prevState) => ({
                ...prevState,
                STATUS: value.code,
            }));
        } else {
            setSendData((prevState) => ({
                ...prevState,
                STATUS: "",
            }));
        }
        if (sendData.DAY === "0000000") {

        }
    }
    const handleFrequency = (event) => {
        const value = event.target.value;
        let frequency = "";
        if (value === "W") {
            frequency = "W"; // weekly
        } else if (value === "B") {
            frequency = "B"; // bi-weekly
        }
        setSendData((prevData) => ({ ...prevData, FREQUENCY: frequency }));
    };
    const handleClose = () => {
        setOpen_Schdl(false);
        setTab('1');
        setRTabCond(false);
        setDisCond(0);
    };
    const handleOk = () => {
        const tempData = sendData;
        if (sendData.STATUS.length === 0) {
            setOpenDialogSCDL(true);
            setDialogDataSCDL("Flag status cannot be null.");
            return
        } else if (sendData.DATE_FROM.length === 0 || sendData.DATE_TO.length === 0) {
            setOpenDialogSCDL(true);
            setDialogDataSCDL("Date Range cannot be empty.");
            return
        } else if (sendData.DAY === "0000000") {
            setOpenDialogSCDL(true);
            setDialogDataSCDL("Please select days.");
            return
        }

        // if(!ApproveFreeseCheck)
        // {
        //     dispatch(postSchdlsvRequest([sendData]));
        //     setIsLoading(true);
        // }
        // if(ApproveFreeseCheck){
        //     setOpen_Schdl(false);
        //     setTab('1');
        //     setRTabCond(false);
        //     setDisCond(0); 
        // }

        setSendDataChk(true);


    }

    const Header = () => (
        <Box
            component="fieldset"
            //display="inline-block"
            //display="fixed"
            //justifyContent={"center"}
            display="flex" justifyContent={"space-between"}
            sx={{
                height: "auto",
                marginLeft: "0px",
                marginTop: "0px",
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
            <legend style={{ fontWeight: "bold", color: "#191970", }}>Header</legend>
            {/* <Box display="flex" justifyContent={"space-between"} sx={{backgroundColor:"blue",padding:"0px"}}> */}
            <div className={ScheduleAllocation.float_container} style={{ display: 'inline-block' }}>
                <div className={ScheduleAllocation.float_container}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Allocation ID</InputLabel>
                    </div>
                    <div multiselectfield>
                        <TextField
                            size="small"
                            variant="outlined"
                            sx={{
                                margin: "0px 0px 2px 2px", width: "100px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "5px",
                                    height: "15px",
                                }
                            }}
                            disabled={true}
                            name="ALLOC_NO"
                            value={Object.keys(searchHeaderData).length > 0 ? searchHeaderData.ALLOC_NO : ""}
                            // onChange={onChange}
                            id="outlined-disabled"
                            //defaultValue={allocNoData["ALLOC_NO"]}
                            InputProps={{
                                // style: { fontSize: 12, height: "30px" },
                                style: {
                                    fontSize: 12, backgroundColor: "#f0f0f0", height: "30px"
                                },
                                className: ScheduleAllocation.inputField1,
                            }}
                        />
                    </div>
                </div>

                <div className={ScheduleAllocation.float_container}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Description</InputLabel>
                    </div>
                    <div  >
                        <TextField
                            size="small"
                            variant="outlined"
                            value={Object.keys(searchHeaderData).length > 0 ? searchHeaderData.ALLOC_DESC : ""}
                            helperText=""
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
                            //value={allocHDetails.length > 0 ? allocHDetails[0].ALLOC_DESC : null}
                            disabled={true}
                            InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                            InputProps={{
                                endAdornment: <SearchButtonTrend desc={searchHeaderData.ALLOC_DESC} />,
                                style: {
                                    fontSize: 12, backgroundColor: "#f0f0f0", height: "30px", padding: "0px",
                                    borderRadius: "5px",
                                    boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                                },
                                className: ScheduleAllocation.inputField,
                            }}
                        />
                    </div>
                </div>

            </div>

            <div className={ScheduleAllocation.float_container3}
                style={{
                    margin: "16px 0px 0px 0px",
                    backgroundColor: "",
                    right: 27,
                }}>

                <Button
                    sx={{

                        height: "fit-content", width: "100px", padding: "5px", marginTop: "5px",
                        backgroundColor: "green", '&:hover': {
                            backgroundColor: "#228B22", textShadow: "0 0 #000"
                        }, fontSize: "12px", margin: "2px 5px 0px 0px",
                    }}
                    size='medium'
                    variant="contained"
                    type="submit"
                    onClick={() => {
                        const temp = sendData;
                        handleOk();
                    }}
                    startIcon={<DoneAllIcon />}

                >
                    OK</Button>


                <Button
                    sx={{
                        height: "fit-content", width: "100px", padding: "5px", marginTop: "5px",
                        backgroundColor: "maroon", '&:hover': {
                            backgroundColor: "maroon", boxShadow: 3
                        }, fontSize: "12px", margin: "2px 0px 0px 0px",
                    }}
                    size='medium'
                    variant="contained"
                    className={ScheduleAllocation.textField}
                    type="submit"
                    onClick={handleClose}
                    startIcon={<CancelIcon />}
                >
                    Cancel</Button>
            </div>
            {/* </Box> */}

        </Box>
    )

    const Paramters = () => (
        <Box
            component="fieldset"
            display="inline-block"
            sx={{
                height: "auto",
                marginLeft: "0px",
                backgroundColor: "white",
                borderRadius: 1,
                width: "100%",
                boxShadow: 2, border: 0,
                borderBottom: 3,
            }}
        >
            <legend style={{ fontWeight: "bold", color: "#191970", }}>Parameters</legend>
            <Box
                display="flex"
                sx={{ width: "100%", justifyContent: "space-between" }}
            >
                <div>
                    <Box
                        display="inline-block"
                        sx={{
                            height: "auto",
                            borderRadius: 1,
                            border: 0,
                        }}
                    >
                        <div className={ScheduleAllocation.float_container}>
                            <div>
                                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                    Status</InputLabel>
                            </div>
                            <div className={ScheduleAllocation.multiselectfield}>
                                <Select
                                    closeMenuOnSelect={true}
                                    isSearchable={true}
                                    styles={styleSelect}
                                    getOptionLabel={option =>
                                        `${option.value.toString()}`}
                                    getOptionValue={option => option.value}
                                    options={statusData.length > 0 ? statusData : []}
                                    value={statusData.length > 0 ? statusData.filter(obj => sendData.STATUS.includes(obj.code)) : ""}
                                    onChange={handleStatus}
                                    isClearable={true}
                                    isDisabled={ApproveFreeseCheck}
                                />
                            </div>
                        </div>
                        <Box
                            component="fieldset"
                            // display="inline-block"
                            sx={{
                                height: "auto",
                                marginLeft: "5px",
                                marginTop: "19px",
                                backgroundColor: "white",
                                borderRadius: 1,
                                width: "fit-content",
                                boxShadow: 3, border: 0,
                                //borderBottom:1,
                            }}>
                            <legend style={{ fontWeight: "bold", color: "#191970", fontSize: 13 }}>Date Range</legend>
                            <div className={ScheduleAllocation.float_container4}
                            >
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                        From</InputLabel>
                                </div>
                                <div>
                                    <DatePicker
                                        autoComplete="off"
                                        placeholderText="MM-DD-YY"
                                        selected={initialDateFrom}
                                        minDate={new Date()}
                                        onChange={(date) => handleDatePicker("DATE_FROM", date)}
                                        onChangeRaw={(event) => {
                                            if (validateDateInput(event.target.value)) {
                                                //console.log("Valid date format");

                                                // Additional logic for handling the valid date input
                                            } else {
                                                setOpenDialogSCDL(true);
                                                setDialogDataSCDL("Invalid From Date");
                                                // Additional logic for handling the invalid date input
                                            }
                                        }}
                                        // onBlur={HandleReleaseDate}
                                        dateFormat="MM-dd-yy"
                                        className={ScheduleAllocation.inputFielddate} // Pass the class name to apply styles
                                        disabled={ApproveFreeseCheck}
                                        customInput={

                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                name="DATE_FROM"
                                                autoComplete='off'
                                                helperText=""
                                                sx={{
                                                    width: "180px", padding: "0px",
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
                                                    style: ApproveFreeseCheck ? sharedInputClassDis : sharedInputClass,
                                                    endAdornment: (
                                                        <CalendarTodayIcon
                                                            style={{ fontSize: "11px", padding: "0px", }}
                                                        />
                                                    )
                                                }}
                                                inputProps={{
                                                    // min: new Date().toISOString().slice(0, 10),
                                                    sx: { backgroundColor: '#fff', height: "13px", borderRadius: "5px" }
                                                }}
                                                disabled={ApproveFreeseCheck}
                                            />

                                        }
                                    //showYearDropdown // Display the year dropdown
                                    //yearDropdownItemNumber={10} // Display 10 years in the dropdown (adjust as needed)
                                    />
                                    {/* <TextField
                                        size="small"
                                        variant="outlined"
                                        type="date"
                                        name='DATE_FROM'
                                        helperText=""
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
                                        onChange={handleDateChange}
                                        id="outlined-disabled"
                                        value={sendData.DATE_FROM}
                                        disabled={ApproveFreeseCheck}
                                        InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                                        InputProps={{
                                            style: { fontSize: 12, backgroundColor: "white", height: "30px" },
                                            //className: ScheduleAllocation.inputFielddate,
                                            className: ScheduleAllocation.inputField,

                                        }}
                                        inputProps={{
                                            //sx: { backgroundColor: '#fff' },
                                            min: new Date().toISOString().slice(0, 10),
                                        }}
                                    /> */}
                                </div>
                            </div>
                            <div className={ScheduleAllocation.float_container4}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                        To</InputLabel>
                                </div>
                                <div
                                >
                                    <DatePicker
                                        autoComplete="off"
                                        placeholderText="MM-DD-YY"
                                        selected={initialDateTo}
                                        minDate={new Date()}
                                        onChange={(date) => handleDatePicker("DATE_TO", date)}
                                        onChangeRaw={(event) => {
                                            if (validateDateInput(event.target.value)) {
                                                //console.log("Valid date format");

                                                // Additional logic for handling the valid date input
                                            } else {
                                                setOpenDialogSCDL(true);
                                                setDialogDataSCDL("Invalid To Date");
                                                // Additional logic for handling the invalid date input
                                            }
                                        }}
                                        // onBlur={HandleReleaseDate}
                                        dateFormat="MM-dd-yy"
                                        className={ScheduleAllocation.inputFielddate} // Pass the class name to apply styles
                                        disabled={ApproveFreeseCheck}
                                        customInput={

                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                name="DATE_TO"
                                                autoComplete='off'
                                                helperText=""
                                                sx={{
                                                    width: "180px",
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
                                                    style: ApproveFreeseCheck ? sharedInputClassDis : sharedInputClass,
                                                    endAdornment: (
                                                        <CalendarTodayIcon
                                                            style={{ fontSize: "11px", }}
                                                        />
                                                    )
                                                }}
                                                inputProps={{
                                                    // min: new Date().toISOString().slice(0, 10),
                                                    sx: { backgroundColor: '#fff', height: "13px", borderRadius: "5px" }
                                                }}
                                                disabled={ApproveFreeseCheck}
                                            />

                                        }
                                    //showYearDropdown // Display the year dropdown
                                    //yearDropdownItemNumber={10} // Display 10 years in the dropdown (adjust as needed)
                                    />
                                    {/* <TextField
                                        size="small"
                                        variant="outlined"
                                        type="date"
                                        name='DATE_TO'
                                        // value="2023-04-20"
                                        helperText=""
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
                                        onChange={handleDateChange}
                                        value={sendData.DATE_TO}
                                        id="outlined-disabled"
                                        disabled={ApproveFreeseCheck}
                                        InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                                        InputProps={{
                                            style: { fontSize: 12, backgroundColor: "white", height: "30px" },
                                            //className: ScheduleAllocation.inputFielddate,
                                            className: ScheduleAllocation.inputField,
                                        }}
                                        inputProps={{
                                            //sx: { backgroundColor: '#fff' },
                                            min: new Date().toISOString().slice(0, 10),
                                        }}
                                    /> */}
                                </div>
                            </div>
                        </Box>
                    </Box>
                </div>

                <div>
                    <Box
                        component="fieldset"
                        display="inline-block"
                        sx={{
                            height: "auto",
                            marginTop: "20px",
                            backgroundColor: "white",
                            borderRadius: 1,
                            width: "fit-content",
                            boxShadow: 3,
                            border: 0,
                        }}>
                        <legend style={{ fontWeight: "bold", color: "#191970", fontSize: 13 }}>Audit Trail</legend>
                        <Box>
                            <div className={ScheduleAllocation.float_container2} >
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                        Create By</InputLabel>
                                </div>
                                <div className={ScheduleAllocation.multiselectfield}>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        value={sendData.CREATE_ID}
                                        name="CREATE_BY"
                                        helperText=""
                                        sx={{
                                            margin: "0px 0px 2px 2px", width: "180px"
                                            , "& .MuiInputBase-input.Mui-disabled": {
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                                height: "15px",
                                            }
                                        }}
                                        disabled
                                        InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                                        InputProps={{
                                            style: { fontSize: 12, height: "30px" },
                                            className: ScheduleAllocation.inputField,
                                        }}
                                        inputProps={{ sx: { backgroundColor: '#fff' } }}
                                    />
                                </div>
                            </div>
                            <div className={ScheduleAllocation.float_container2}  >
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                        Create Date</InputLabel>
                                </div>
                                <div className={ScheduleAllocation.multiselectfield}>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        name="CREATE_DATE"
                                        value={sendData.CREATE_DATE}
                                        helperText=""
                                        sx={{
                                            margin: "0px 0px 2px 2px", width: "180px"
                                            , "& .MuiInputBase-input.Mui-disabled": {
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                                height: "15px",
                                            }
                                        }}
                                        disabled
                                        InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                                        InputProps={{
                                            style: { fontSize: 12, height: "30px" },
                                            className: ScheduleAllocation.inputField,
                                        }}
                                        inputProps={{ sx: { backgroundColor: '#fff' } }}
                                    />
                                </div>
                            </div>
                        </Box>

                        <Box
                            sx={{
                                height: "auto",
                                marginTop: "0px",
                            }}
                        >
                            <div className={ScheduleAllocation.float_container2}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                        Modified By</InputLabel>
                                </div>
                                <div className={ScheduleAllocation.multiselectfield}>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        value={sendData.MODIFIED_BY}
                                        name="MODIFIED_BY"
                                        helperText=""
                                        sx={{
                                            margin: "0px 0px 2px 2px", width: "180px"
                                            , "& .MuiInputBase-input.Mui-disabled": {
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                                height: "15px",
                                            }
                                        }}
                                        disabled
                                        InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                                        InputProps={{
                                            style: { fontSize: 12, height: "30px" },
                                            className: ScheduleAllocation.inputField,
                                        }}
                                        inputProps={{ sx: { backgroundColor: '#fff' } }}
                                    />
                                </div>
                            </div>
                            <div className={ScheduleAllocation.float_container2}>
                                <div>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "0px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                        Modified Date</InputLabel>
                                </div>
                                <div className={ScheduleAllocation.multiselectfield}>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        name="MODIFIED_DATE"
                                        value={sendData.MODIFIED_DATE}
                                        helperText=""
                                        sx={{
                                            margin: "0px 0px 2px 2px", width: "180px"
                                            , "& .MuiInputBase-input.Mui-disabled": {
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                                height: "15px",
                                            }
                                        }}
                                        disabled
                                        InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
                                        InputProps={{
                                            style: { fontSize: 12, height: "30px" },
                                            className: ScheduleAllocation.inputField,
                                        }}
                                        inputProps={{ sx: { backgroundColor: '#fff' } }}
                                    />
                                </div>
                            </div>
                        </Box>
                    </Box>
                </div>
            </Box>

            <Box
                display="flex"
                sx={{
                    width: "100%", justifyContent: "space-between"
                }}
            >
                <div>
                    <Box
                        // gridColumn="span 6"
                        component="fieldset"
                        display="inline-block"
                        sx={{
                            height: "auto",
                            marginTop: "20px",
                            backgroundColor: "white",
                            borderRadius: 1,
                            width: "fit-content",
                            boxShadow: 3,
                            border: 0,
                        }}>
                        <legend style={{ fontWeight: "bold", color: "#191970", fontSize: 13 }}>Allocation Day</legend>
                        <FormControlLabel
                            size="small"
                            sx={{
                                margin: "0px 10px 0px -5px",
                                padding: "0px",
                                width: "75px",
                                height: "20px"
                            }}
                            control={
                                <Checkbox
                                    size="small"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    onClick={handleAllocationDay}
                                    checked={sendData.DAY[0] === '1' ? true : false}
                                    id="Sunday"
                                    disabled={ApproveFreeseCheck}
                                />
                            }
                            label={<InputLabel
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    margin: "0px 0px 0px -5px",
                                    padding: "0px 0px 0px 0px",
                                    display: 'inline',
                                    float: 'left', width: "70px",
                                    whiteSpace: 'nowrap'
                                }}>
                                Sunday</InputLabel>}
                        />
                        <FormControlLabel
                            size="small"
                            sx={{
                                // margin: "0px",
                                margin: "0px 10px 0px -5px",
                                padding: "0px",
                                width: "75px",
                                height: "20px"
                            }}
                            control={
                                <Checkbox
                                    size="small"
                                    onClick={handleAllocationDay}
                                    checked={sendData.DAY[1] === '1' ? true : false}
                                    id="Monday"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    disabled={ApproveFreeseCheck}
                                />
                            }
                            label={<InputLabel
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    margin: "0px 0px 0px -5px",
                                    padding: "0px 0px 0px 0px",
                                    display: 'inline',
                                    float: 'left',
                                    width: "70px",
                                    whiteSpace: 'nowrap'
                                }}>
                                Monday</InputLabel>}
                        />
                        <FormControlLabel
                            size="small"
                            sx={{
                                // margin: "0px",
                                margin: "0px 10px 0px -5px",
                                padding: "0px",
                                width: "77px",
                                height: "20px"
                            }}
                            control={
                                <Checkbox
                                    size="small"
                                    onClick={handleAllocationDay}
                                    checked={sendData.DAY[2] === '1' ? true : false}
                                    id="Tuesday"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    disabled={ApproveFreeseCheck}
                                />
                            }
                            label={<InputLabel
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    margin: "0px 0px 0px -5px",
                                    padding: "0px 0px 0px 0px",
                                    display: 'inline',
                                    float: 'left',
                                    width: "70px",
                                    whiteSpace: 'nowrap'
                                }}>
                                Tuesday</InputLabel>}
                        />
                        <FormControlLabel
                            size="small"
                            sx={{
                                margin: "0px 10px 0px -5px",
                                padding: "0px",
                                width: "97px",
                                height: "20px"
                            }}
                            control={
                                <Checkbox
                                    size="small"
                                    onClick={handleAllocationDay}
                                    checked={sendData.DAY[3] === '1' ? true : false}
                                    id="Wednesday"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    disabled={ApproveFreeseCheck}
                                />
                            }
                            label={<InputLabel
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    margin: "0px 0px 0px -5px",
                                    padding: "0px 0px 0px 0px",
                                    display: 'inline',
                                    float: 'left',
                                    width: "80px",
                                    whiteSpace: 'nowrap'
                                }}>
                                Wednesday</InputLabel>}
                        />
                        <FormControlLabel
                            size="small"
                            sx={{
                                margin: "0px 10px 0px -5px",
                                padding: "0px",
                                width: "85px",
                                height: "20px"
                            }}
                            control={
                                <Checkbox
                                    size="small"
                                    onClick={handleAllocationDay}
                                    checked={sendData.DAY[4] === '1' ? true : false}
                                    id="Thursday"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    disabled={ApproveFreeseCheck}
                                />
                            }
                            label={<InputLabel
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    margin: "0px 0px 0px -5px",
                                    padding: "0px 0px 0px 0px",
                                    display: 'inline',
                                    float: 'left',
                                    width: "90px",
                                    whiteSpace: 'nowrap'
                                }}>
                                Thursday</InputLabel>}
                        />
                        <FormControlLabel
                            size="small"
                            sx={{
                                // margin: "0px",
                                margin: "0px 10px 0px -5px",
                                padding: "0px",
                                width: "67px",
                                height: "20px"
                            }}
                            control={
                                <Checkbox
                                    size="small"
                                    onClick={handleAllocationDay}
                                    checked={sendData.DAY[5] === '1' ? true : false}
                                    id="Friday"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    disabled={ApproveFreeseCheck}
                                />
                            }
                            label={<InputLabel
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    margin: "0px 0px 0px -5px",
                                    padding: "0px 0px 0px 0px",
                                    display: 'inline',
                                    float: 'left',
                                    width: "70px",
                                    whiteSpace: 'nowrap'
                                }}>
                                Friday</InputLabel>}
                        />
                        <FormControlLabel
                            size="small"
                            sx={{
                                margin: "0px 10px 0px -5px",
                                padding: "0px",
                                width: "85px",
                                height: "20px"
                            }}
                            control={
                                <Checkbox
                                    size="small"
                                    onClick={handleAllocationDay}
                                    checked={sendData.DAY[6] === '1' ? true : false}
                                    id="Saturday"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    disabled={ApproveFreeseCheck}
                                />
                            }
                            label={<InputLabel
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    margin: "0px 0px 0px -5px",
                                    padding: "0px 0px 0px 0px",
                                    display: 'inline',
                                    float: 'left',
                                    width: "70px",
                                    whiteSpace: 'nowrap'
                                }}>
                                Saturday</InputLabel>}
                        />
                    </Box>
                </div>

                <div>
                    <Box
                        component="fieldset"
                        display="inline-block"
                        sx={{
                            height: "auto",
                            marginTop: "20px",
                            backgroundColor: "white",
                            borderRadius: 1,
                            width: "fit-content",
                            boxShadow: 3,
                            border: 0,
                        }}>
                        <legend style={{ fontWeight: "bold", color: "#191970", fontSize: 13 }}>Frequency</legend>
                        <FormControlLabel
                            size="small"
                            sx={{
                                //margin: "0px",
                                margin: "0px 10px 0px -5px", // add marginRight to decrease space
                                padding: "0px",
                                // backgroundColor:"red",
                                width: "70px",
                                height: "20px"
                            }}
                            control={
                                <Radio
                                    size="small"
                                    value="W"
                                    onChange={handleFrequency}
                                    checked={sendData.FREQUENCY === "W"}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    disabled={ApproveFreeseCheck}
                                />
                            }
                            label={<InputLabel
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    margin: "0px 0px 0px -5px",
                                    padding: "0px 0px 0px 0px",
                                    display: 'inline',
                                    float: 'left',
                                    width: "70px",
                                    whiteSpace: 'nowrap' // prevent text from wrapping
                                }}>
                                Weekly</InputLabel>}
                        />
                        <FormControlLabel
                            size="small"
                            sx={{
                                //margin: "0px",
                                margin: "0px 0px 0px -5px", // add marginRight to decrease space
                                padding: "0px",
                                width: "fit-content",
                                height: "20px",
                                // backgroundColor:"yellow"
                            }}
                            control={
                                <Radio
                                    size="small"
                                    value="B"
                                    onChange={handleFrequency}
                                    checked={sendData.FREQUENCY === "B"}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    disabled={ApproveFreeseCheck}
                                />
                            }
                            label={<InputLabel
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    margin: "0px 0px 0px -5px",
                                    padding: "0px 0px 0px 0px",
                                    //display: 'inline',
                                    float: 'left', width: "fit-content",
                                    width: "70px",
                                    whiteSpace: 'nowrap' // prevent text from wrapping
                                }}>
                                Bi-Weekly</InputLabel>}
                        />


                    </Box>
                </div>
            </Box>
        </Box>
    )

    const handleCloseDialog = (e) => {
        setOpenDialogSCDL(false);
        setDialogDataSCDL("")
    }

    return (
        <Box >
            <div className={ScheduleAllocation.course_box}>
                {Header()}

            </div>
            <div className={ScheduleAllocation.course_box}
            >
                {Paramters()}
            </div>
            {/* Screen Loading */}
            <Modal open={loadSchdl}>
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
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth="xs"
                    open={openDialogSCDL}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    disableBackdropClick
                >
                    <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px", }}></DialogTitle>
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", }} >
                        {DialogDataSCDL}
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px" }}
                            onClick={handleCloseDialog} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Box>
    );
}
export default ScheduleAlloc;