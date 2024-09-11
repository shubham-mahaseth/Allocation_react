import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { ExcelRenderer } from "react-excel-renderer";
// import Table from "../../Components/Table/index";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import { hier1Headers, item_dtl_headers, isHeadersEqual, header_list } from "../Constants/headers";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { formattedExcelData } from "../Utils/format";
import CircularProgress from "@mui/material/CircularProgress";
import UploadFileIcon from '@mui/icons-material/Upload';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
// import { headCells } from './tableHead';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { 
    postSEEDHIER1Request,
    postSEEDHIER2Request,
    postSEEDHIER3Request,
    postSEEDITMDTLRequest,

} from "../../../Redux/Action/SeedDataInsert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { ConstructionOutlined } from "@mui/icons-material";

// import "./index.css";


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
    stagemaindiv: {
        margin: "80px 0px 0px 10px",
        position: "relative",
        width: "calc(95vw - 64px)",
        '& table': {
            '& tr': {
                '& td:nth-child(17)': {
                    display: 'none'
                },
                '& td:nth-child(18)': {
                    display: 'none'
                },
                '& td:nth-child(19)': {
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
        // marginTop: "50px",
        textAlign: "start",
        gap: 20,
    },
    GobackDiv: {
        cursor: "pointer",
    },
    resetBtn: {
        marginTop: "40px !important",
    }
});
const DataProcessing = () => {
    const [tableData, setTabledata] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState("");
    const [openDialog2, setOpenDialog2] = useState(false);
    const [dialogData2, setDialogData2] = useState("");
    const [reloadStatus, setReloadStatus] = useState(false);
    const [processName, setProcessName] = useState("");
    const DataProcessingClasses = useStyles();
    const dispatch = useDispatch();
    const ProcessData = useSelector(
        (state) => state.seedDataInsertReducers
    );
    //  console.log("ProcessData?.data::",ProcessData    )
    useEffect(() => {
        if (ProcessData?.data?.insH1Status?.status === 201) {
            setIsLoading(false);
            setOpenDialog2(true);
            setDialogData2(ProcessData?.data?.insH1Status?.message)
            ProcessData.data.insH1Status.status = 0;
        } else if (ProcessData?.data?.insH1Status?.status === 500) {
            setIsLoading(false);
            setOpenDialog2(true);
            setDialogData2(ProcessData?.data?.insH1Status?.message)
            setReloadStatus(true);
            ProcessData.data.insH1Status.status = 0;
        }
    }, [ProcessData?.data]);
    const serializedata = (datatable) => {
        let newTabledata = [];
        let count = 1;
        if (datatable.length > 0) {
            datatable.map(item => {
                item['SR_NO'] = count;
                count++;

                newTabledata.push(item);
            })
            // setTabledataclone(newTabledata)
            return newTabledata;
        }
    }
    // Handle Excel Template on Upload
    const handleCapture = ({ target }) => {
        // dispatch(resetStageProcessing());

        // console.log("target::", target, target.files[0], target.files[0].name)
        // setIsValidExcel(true);
        let fileObj = target.files[0];
        let result;
        const file_Name = target.files[0].name;
        if (file_Name.includes("_TEMPLATE")) {
            result = file_Name.split("_TEMPLATE")[0];
            setProcessName(result)
        }

        const headers = header_list[result];
        ExcelRenderer(fileObj, (err, resp) => {
            console.log("headers:: ", resp.rows[0], headers);
            // Align all arrays to the length of the first by replacing empty values and padding shorter arrays with empty strings
            const file_Columns = resp.rows[0];
            const firstArrayLength = resp.rows[0].length;
            const dataArray = resp.rows.slice(1);
            const adjustedRows = dataArray.map((row, index) => {
                const fullArray = Array.from(row, item => item === undefined ? '' : item);
                const adjustedRow = fullArray.map(item => item == null || item === '' ? '' : item);
                while (adjustedRow.length < firstArrayLength) {
                    adjustedRow.push('');
                }
                return adjustedRow;
            });

            // console.log("adjustedRows", adjustedRows,file_Columns);
            const dataSet = [file_Columns, ...adjustedRows]
            if (isHeadersEqual(file_Columns, headers)) {
                let count = 1;
                console.log(adjustedRows, count);
                // Example input


                const formatData = formattedExcelData(dataSet, headers);
                // console.log("Upload 1 formatData: ", formatData);
                formatData.filter((val) => {
                    for (const [key, value] of Object.entries(val)) {
                        if (value === "NaN") {
                            val[key] = ""
                        }
                    }
                })

                setTabledata(serializedata(formatData));
                // setAllData(serializedata(formatData));
            } else {
                setDialogData2("Upload a valid file.");
                setOpenDialog2(true);
                setReloadStatus(true);
            }
        });
    };
    console.log("table data:: ", tableData)
    // Get Current User name
    const getCurrentUser = () => {
        if (localStorage.getItem("userData")) {
            return JSON.parse(localStorage.getItem("userData"))?.username;
        } else {
            return "default";
        }
    }
    const handleCloseDialog = (e) => {
        setOpenDialog(false);
        setDialogData("");
        finalSubmit();
    }
    const handleCloseDialog2 = (e) => {
        setOpenDialog2(false);
        setDialogData2("");
        setIsLoading(false);
        if (reloadStatus) {
            setTabledata([]);
            setProcessName('');
        }
    }
    const submitList = () => {
        setOpenDialog(true);
        setDialogData("Do you want to submit data?");
    }

    const finalSubmit = () => {
        setIsLoading(true);
        const currentUser = getCurrentUser();
        dispatch(postSEEDHIER1Request([{
            TABLE_DATA: tableData,
            USER: currentUser
        }]));
    }
    return (
        <Box className={DataProcessingClasses.stagemaindiv}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center', // Aligns items vertically in the center
                    padding: '16px', // Optional padding for the outer box
                    // border: '1px solid lightgrey', // Optional border
                    // borderRadius: '8px', // Optional border radius for rounded corners
                }}
            >
                <Box className={DataProcessingClasses.boxDiv}>
                    <div className={DataProcessingClasses.uploaddiv}>
                        {processName.length > 0 ?
                            <h4>{processName} Processing</h4> :
                            <h4></h4>
                        }
                        <Button variant="contained" component="label" sx={{
                            backgroundColor: "", fontSize: "12px",
                            padding: "5px", fontFamily: "system-ui",
                            width: "130px", height: "32px",
                            marginLeft: "8px", // Space between select and button
                            '&.Mui-disabled': {
                                opacity: 0.5,
                                backgroundColor: 'DodgerBlue',
                                color: '#fff',
                            },
                        }} startIcon={<UploadFileIcon />}
                        >
                            Upload File
                            <input type="file" hidden
                                onChange={(e) => {
                                    handleCapture(e);
                                    e.target.value = null;
                                }}
                            />
                        </Button>
                    </div>
                </Box>

                <Box>
                    {tableData.length > 0 ?
                        <Button variant="contained" component="label" sx={{
                            backgroundColor: "", fontSize: "12px",
                            padding: "5px", fontFamily: "system-ui",
                            width: "130px", height: "32px",
                            marginLeft: "8px", // Space between select and button
                            '&.Mui-disabled': {
                                opacity: 0.5,
                                backgroundColor: 'DodgerBlue',
                                color: '#fff',
                            },
                        }}
                            onClick={submitList}
                        >
                            Submit
                        </Button>
                        : null
                    }
                </Box>
            </Box>
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth="xs"
                    open={openDialog}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    disableBackdropClick
                >
                    <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px", }}></DialogTitle>
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", }} >
                        {dialogData}
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px", }}
                            onClick={handleCloseDialog} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                            Ok
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: "maroon",
                                fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                                width: "100px", marginLeft: "5px", marginTop: "2px",
                            }}
                            startIcon={<CancelIcon />}
                            variant="contained"
                            onClick={() => {
                                setDialogData("");
                                setOpenDialog(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth="xs"
                    open={openDialog2}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    disableBackdropClick
                >
                    <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px", }}></DialogTitle>
                    <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px", }} >
                        {dialogData2}
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px", }}
                            onClick={() => {
                                handleCloseDialog2();
                                if (!reloadStatus) {
                                    window.location.reload();
                                }
                            }} autoFocus variant="contained" startIcon={<DoneAllIcon />}>
                            Ok
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
            <Modal open={isLoading}>
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
    );
};

export default DataProcessing;
