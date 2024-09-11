import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Backdrop, Fade } from '@material-ui/core';
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Draggable from 'react-draggable';
import DialogTitle from "@mui/material/DialogTitle";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Paper } from "@mui/material";
import { postALCSCHLBTHRequest,postUPDBTHDATERequest } from "../../Redux/Action/AllocationBatches";

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

const AllocationBatches = ({menuName,setBatchState}) => {
    const BatchName =menuName;
    menuName =''
    const [isLoading, setIsLoading] = useState(false);
    
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState("");
    const [batchStatus, setBatchStatus] = useState(false);

    const dispatch = useDispatch();
    const AllocBatchData = useSelector((state) => state.allocationBatchReducers);

    var check = false;
    // Effect to handle batch scheduling
      useEffect(() => {
        if (BatchName.length > 0 && BatchName === 'Schedule') {
          if (!check) {
              dispatch(postALCSCHLBTHRequest([{}]));
              check = true
            }
          setIsLoading(true);
          setBatchStatus(false);
        }
        if (BatchName.length > 0 && BatchName === 'Date') {
          if (!check) {
              dispatch(postUPDBTHDATERequest([{}]));
              check = true
            }
          setIsLoading(true);
          setBatchStatus(false);
        }
      }, [BatchName, dispatch]);

    // Handle dialog close
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDialogData("");
        setBatchState(false);
        window.location.reload();
    };
    console.log("Batch Running : ",menuName)
    // // Effect to handle dialog opening based on batch status
    useEffect(() => {

      if (AllocBatchData?.data?.schlBthStatus?.status === 201) {
            setOpenDialog(true);
            setDialogData(String(AllocBatchData?.data?.schlBthStatus?.message));
            setIsLoading(false);
            setBatchStatus(true);
            AllocBatchData.data.schlBthStatus.status = 0
        } else if (AllocBatchData?.data?.schlBthStatus?.status === 500) {
            setOpenDialog(true);
            setDialogData(String(AllocBatchData?.data?.schlBthStatus?.message));
            setIsLoading(false);
            setBatchStatus(true);  
            AllocBatchData.data.schlBthStatus.status = 0
        }
        if (AllocBatchData?.data?.updBthDtStatus?.status === 201) {
          setOpenDialog(true);
          setDialogData(String(AllocBatchData?.data?.updBthDtStatus?.message));
          setIsLoading(false);
          setBatchStatus(true);
          AllocBatchData.data.updBthDtStatus.status = 0
      } else if (AllocBatchData?.data?.updBthDtStatus?.status === 500) {
          setOpenDialog(true);
          setDialogData(String(AllocBatchData?.data?.updBthDtStatus?.message));
          setIsLoading(false);
          setBatchStatus(true);  
          AllocBatchData.data.updBthDtStatus.status = 0
      }
    }, [AllocBatchData?.data]);  


    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth="xs"
                open={openDialog}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                disableBackdropClick
            >
                <DialogTitle sx={{ margin: "0px", padding: "15px 0px 0px 0px" }} id="draggable-dialog-title"></DialogTitle>
                <DialogContent id="draggable-dialog-title" sx={{ fontSize: "16px", userSelect: 'text', padding: "0px 0px 0px 10px" }}>
                    {dialogData}
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 5px 0px 0px", width: "100px" }}
                        onClick={handleCloseDialog}
                        autoFocus
                        variant="contained"
                        startIcon={<DoneAllIcon />}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
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
        </div>
    );
};

export default AllocationBatches;
