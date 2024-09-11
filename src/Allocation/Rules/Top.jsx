import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import IconButton from "@mui/material/IconButton";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import "./Top.css"
import axios from "axios";
import { default as ReactSelect } from "react-select";
// import { useState } from 'react';
import data from './RightContainer';
import { CONFIG } from "../../services/config";
import {
     getALLOCHEADDETAILSRequest,
     getALLOCNODETAILSRequest,

} from "../../Redux/Action/quantityLimits";
import {
     getUPDATERULESRLRLRequest,
     getUPDATELOCATIONRLRequest,
     getUPDATESIZEPROFILEINDRLRequest,
     getUPDATEWHINDRLRequest,
     getINSLOCRLRequest

} from "../../Redux/Action/rules&location";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import { makeStyles, withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { NumbersOutlined } from "@mui/icons-material";
import swal from "sweetalert";
import Paper from '@mui/material/Paper';
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


// import { setActionOptionsFor } from 'sweetalert/typings/modules/state';
// import LeftContData from './LeftContainer';
const inputField = {
     backgroundColor: '#e9e0e0'
}

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
     float_container: {
          display: "inline-block",
          margin: "0rem 0.3rem",

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
     inputField: {
          width: "200px",
          // margin:"10px 0px 0px 0px",
          height: 25,
          //backgroundColor:"#f0f0f0",
          '& input + fieldset': {
               // borderColor: 'gray',
               borderRadius: "5px",
               boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
          },
     },
     multiselectfield: {
          display: "inline-block",
          // border: "1px solid red",
          margin: "0rem",
          padding: "0rem 0rem",
          verticalAlign: "middle",
     },
})

// const dupData = [
//      { "ALLOC_NO": 1604, "ALLOC_DESC": "Allocation_test1", "ALLOC_LEVEL": "Sku", "RELEASE_DATE": "2023-02-22", "ALLOCATOR": "Admin", "STATUS": "Worksheet", "CONTEXT": "Sales", "PROMOTION": "", "ALLOC_TYPE": "Ad-Hoc" }
// ]


const Top = ({ submit, submit1, leftContData, setAllocNo, allocNo, allocNoData, setAllocLevel, allocDetails,
     setAllocDetails, setTab, tab, setIsValidQtyLimits, totalData, setLeftContData, setDisCond,
     setUpdateRulesRL, updateRulesRL, setrtvrldata, setRTabCond, AllRetreiverRLdataCheck, setLoadCheck, setIsLoading,
     ApproveFreeseCheck, setHeaderCheck, setRLRuleData, setOpenDialog, setDialogData
}) => {
     const [loading, setLoading] = useState(false);
     const [isSearch, setSearch] = useState(false);
     const [allocNoDtl, setAllocNoDtl] = useState([]);
     const [tableData, setTableData] = useState([]);
     // const [updateRulesRL, setUpdateRulesRL] = useState([]);
     const [inslocrl, setinslocrl] = useState([]);
     const [InsertLocCheck, setInsertLocCheck] = useState(false);
     const [InsertRuleCheck, setInsertRuleCheck] = useState(false);
     // const [searchHeaderData, setSearchHeaderData] = useState(initialHeaderData);

     // Error popup message
     const [openDialogRL, setOpenDialogRL] = useState(false);
     const [DialogDataRL, setDialogDataRL] = useState("")

     useEffect(() => {
          document.title = 'Rule And Location';
     }, []);

     const RulesLocationData = useSelector(
          (state) => state.RulesLocationReducers
     );

     const dispatch = useDispatch();

     const RulesLocationHeaderClasses = useStyles();

     useEffect(() => {
          setLoading(true);
          setIsLoading(false);
          // dispatch(getALLOCNODETAILSRequest([{}]))
          dispatch(getALLOCHEADDETAILSRequest([allocNoData]));
     }, [""]);

     useEffect(() => {
          if (
               RulesLocationData?.data?.allocDetails
               && Array.isArray(RulesLocationData?.data?.allocDetails)
          ) {
               setAllocDetails(RulesLocationData?.data?.allocDetails);
               if (RulesLocationData?.data?.allocDetails.length > 0) {
                    if (RulesLocationData?.data?.allocDetails[0].ALLOC_CRITERIA === "F") {
                         setLeftContData((prev) => {
                              return {
                                   ...prev,
                                   ENFORCE_WH_RL: "N"
                              };
                         })
                    }
               }
               setLoading(false);
          } else if (
               RulesLocationData?.data?.allocNoDtl
               && Array.isArray(RulesLocationData?.data?.allocNoDtl)
          ) {
               setAllocNoDtl(RulesLocationData?.data?.allocNoDtl);
               setLoading(false);
          } else if (
               RulesLocationData?.data?.inslocrl
          ) {
               setinslocrl(RulesLocationData?.data?.inslocrl);
               setLoading(false);
               setLoadCheck(false)
          } else {
               setSearch(false);
          }
     }, [RulesLocationData?.data]);

     // console.log("allocDetails::", allocDetails, allocNoData, inslocrl);

     // var check_count=0
     const handleCancel = () => {
          setTab('1');
          setRTabCond(false);
          setDisCond(0);
          setHeaderCheck(true);
     }

     const ViewModeFunction = () => {
          setTab('1');
          setRTabCond(false);
          setDisCond(0);
     }

     const [check_count, setCheck_Count] = useState(0)
     const handlesubmitRules = () => {
          if (totalData.length > 0) {
               if (String(leftContData.RULE_TYPE) === "Manual") {
                    setLoading(true);

                    setinslocrl([])
                    dispatch(getINSLOCRLRequest([[leftContData], totalData]))
                    setLoadCheck(true)
                    setCheck_Count(1)
                    setInsertLocCheck(true)
                    setrtvrldata([]);
                    setHeaderCheck(true);
                    setLeftContData((prev) => {
                         return {
                              ...prev,
                              CHANGEWEIGHTSCHECK: "Y"
                         };
                    })
               } else {
                    if (String(leftContData.RULE_TYPE).length > 0 && String(leftContData.EXACT_IND_VAL).length > 0 && String(leftContData.RULE_LEVEL).length > 0 && String(leftContData.NET_NEED_IND_VAL).length > 0) {

                         if (String(leftContData.ON_ORDER_COMMIT_WEEKS).length > 0 || String(leftContData.ON_ORDER_COMMIT_DATE).length > 0 ||
                              String(leftContData.WEEKS_LAST_YEAR).length > 0 || String(leftContData.WEEKS_THIS_YEAR).length > 0 ||
                              String(leftContData.START_DATE1).length > 0 || String(leftContData.END_DATE1).length > 0 ||
                              String(leftContData.START_DATE2).length > 0 || String(leftContData.END_DATE2).length > 0) {
                              if (String(leftContData.START_DATE1).length > 0 && String(leftContData.END_DATE1).length === 0) {
                                   setOpenDialogRL(true);
                                   setDialogDataRL("Start/End Date is required");
                              }
                              else if (String(leftContData.START_DATE2).length > 0 && String(leftContData.END_DATE2).length === 0) {
                                   setOpenDialogRL(true);
                                   setDialogDataRL("Start/End Date is required")
                              }
                              else if (String(leftContData.END_DATE1).length > 0 && String(leftContData.START_DATE1).length === 0) {
                                   setOpenDialogRL(true);
                                   setDialogDataRL("Start/End Date is required")
                              }
                              else if (String(leftContData.END_DATE2).length > 0 && String(leftContData.START_DATE2).length === 0) {
                                   setOpenDialogRL(true);
                                   setDialogDataRL("Start/End Date is required")
                              }
                              else {
                                   setLoading(true);
                                   setinslocrl([]);
                                   dispatch(getINSLOCRLRequest([[leftContData], totalData]));
                                   setLoadCheck(true);
                                   setCheck_Count(1);
                                   setInsertLocCheck(true);
                                   setrtvrldata([]);
                                   setHeaderCheck(true);
                                   setLeftContData((prev) => {
                                        return {
                                             ...prev,
                                             CHANGEWEIGHTSCHECK: "Y"
                                        };
                                   });
                              }
                         }
                         else {
                              setOpenDialogRL(true);
                              setDialogDataRL("Please give inputs*")
                         }

                    }
                    else {
                         setOpenDialogRL(true);
                         setDialogDataRL("Please give inputs*")
                    }
               }
          }
          else {
               setOpenDialogRL(true);
               setDialogDataRL("Please give inputs*")
          }
     }


     // // console.log("InsertLocCheck:11: ", InsertLocCheck,check_count,Object.keys(RulesLocationData?.data?.inslocrl).length>0)
     if (InsertLocCheck) {
          if (RulesLocationData?.data?.inslocrl) {
               setOpenDialog(true);
               setDialogData("Rules & Locations: " + String(RulesLocationData?.data?.inslocrl?.message));
               setInsertLocCheck(false)
               setDisCond(0)
               setRLRuleData(leftContData)
               setIsValidQtyLimits(true);
               setTab('1')
          }
     }

     const SearchButtonHeaderDesc = () => (
          <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
               <InfoIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em', color: "CadetBlue" }}
                    onClick={() => {
                         setOpenDialogRL(true);
                         setDialogDataRL(String(allocDetails[0].ALLOC_DESC));
                    }}
               />
          </IconButton>
     )

     const SearchHeader = () => (
          <Box
               component="fieldset"
               display="flex"
               sx={{
                    backgroundColor: "",
                    height: "auto",
                    width: "100%",
                    borderRadius: 1,

                    boxShadow: 2, border: 0,
                    borderBottom: 3,
                    border: "1px solid lightgrey",
                    // width: "100%",
               }}
          >

               <legend style={{ fontWeight: "bold" }}>Header</legend>

               <div className={RulesLocationHeaderClasses.header_container}>
                    <div className={RulesLocationHeaderClasses.header_child}>
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
                                        }
                                   }}
                                   id="outlined-disabled"
                                   name="ALLOC_NO"

                                   //   value={searchHeaderData.ALLOC_DESC}
                                   value={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
                                   defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
                                   inputProps={{
                                        maxLength: 100,
                                   }}
                                   InputProps={{
                                        style: { fontSize: 12 },
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                                   disabled
                              />
                         </div>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
                         <div>
                              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                   Description</InputLabel>
                         </div>
                         <div>
                              <TextField
                                   size="small"
                                   sx={{
                                        margin: "0px 0px 2px 2px", width: "180px"
                                        , "& .MuiInputBase-input.Mui-disabled": {
                                             backgroundColor: "#f0f0f0",
                                             borderRadius: "5px",
                                             height: "14px",
                                        },
                                        borderRadius: "5px",
                                        boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                                   }}
                                   id="outlined-disabled"
                                   name="ALLOC_DESC"
                                   autoComplete='off'
                                   value={allocDetails[0].ALLOC_DESC}
                                   defaultValue={allocDetails[0].ALLOC_DESC}
                                   // onChange={onChange}
                                   inputProps={{
                                        maxLength: 100,
                                   }}
                                   InputProps={{
                                        endAdornment: <SearchButtonHeaderDesc />,
                                        className: RulesLocationHeaderClasses.input,
                                        style: { fontSize: 12, height: "30px", backgroundColor: "#f0f0f0", },
                                   }}
                                   disabled
                              />
                         </div>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
                         <div>
                              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                   Alloc Context</InputLabel>
                         </div>
                         <div className={RulesLocationHeaderClasses.multiselectfield}>
                              <TextField
                                   size="small"
                                   sx={{
                                        margin: "0px 0px 2px 2px", width: "180px"
                                        , "& .MuiInputBase-input.Mui-disabled": {
                                             backgroundColor: "#f0f0f0",
                                             borderRadius: "5px",
                                             height: "15px",
                                        }
                                   }}
                                   id="outlined-disabled"
                                   name="CONTEXT_TYPE"

                                   value={allocDetails[0].CONTEXT}
                                   defaultValue={allocDetails[0].CONTEXT}
                                   // inputProps={{
                                   //      maxLength: 100, sx: { backgroundColor: '#fff' },
                                   //  }}
                                   // InputProps={{
                                   //      style: { fontSize: 12 },
                                   //      className: RulesLocationHeaderClasses.input,
                                   // }}
                                   inputProps={{
                                        maxLength: 100, sx: { backgroundColor: '#f0f0f0' },
                                   }}
                                   InputProps={{
                                        // endAdornment: <SearchButtonHeaderDesc />,
                                        style: { fontSize: 12, backgroundColor: "#f0f0f0", },
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                                   disabled
                              />
                         </div>
                    </div>

                    {allocDetails[0].CONTEXT === "Promotion" ?
                         [
                              <div className={RulesLocationHeaderClasses.header_child}>
                                   <div>
                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                             Promotion</InputLabel>
                                   </div>
                                   <div className={RulesLocationHeaderClasses.multiselectfield}>
                                        <TextField
                                             size="small"
                                             sx={{
                                                  margin: "0px 0px 2px 2px", width: "180px"
                                                  , "& .MuiInputBase-input.Mui-disabled": {
                                                       backgroundColor: "#f0f0f0",
                                                       borderRadius: "5px",
                                                       height: "15px",
                                                  }
                                             }}
                                             id="outlined-disabled"
                                             name="PROMOTION"

                                             value={allocDetails[0].PROMOTION}
                                             defaultValue={allocDetails[0].PROMOTION}
                                             inputProps={{
                                                  maxLength: 100,
                                             }}
                                             InputProps={{
                                                  style: { fontSize: 12 },
                                                  className: RulesLocationHeaderClasses.input,
                                             }}
                                             disabled
                                        />
                                   </div>
                              </div>
                         ] : null}


                    <div className={RulesLocationHeaderClasses.header_child}>
                         <div >
                              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                   Alloc Level</InputLabel>
                         </div>
                         <div className={RulesLocationHeaderClasses.multiselectfield}>
                              <TextField
                                   size="small"
                                   sx={{
                                        margin: "0px 0px 2px 2px", width: "180px"
                                        , "& .MuiInputBase-input.Mui-disabled": {
                                             backgroundColor: "#f0f0f0",
                                             borderRadius: "5px",
                                             height: "15px",
                                        }
                                   }}
                                   id="outlined-disabled"
                                   name="ALLOC_LEVEL"

                                   value={allocDetails[0].ALLOC_LEVEL}
                                   defaultValue={allocDetails[0].ALLOC_LEVEL}
                                   inputProps={{
                                        maxLength: 100,
                                   }}
                                   InputProps={{
                                        style: { fontSize: 12 },
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                                   disabled
                              />
                         </div>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
                         <div>
                              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                   Release Date</InputLabel>
                         </div>
                         <div>
                              <TextField
                                   variant="outlined"
                                   type="date"
                                   size="small"
                                   name="RELEASE_DATE"
                                   format="yyyy/MM/dd"
                                   //   inputProps={{ max: currentDate() }}
                                   sx={{
                                        margin: "0px 0px 2px 2px",
                                        //  width: "180px", 
                                        "& .MuiInputBase-input.Mui-disabled": {
                                             backgroundColor: "#f0f0f0",
                                             borderRadius: "5px",
                                             height: "15px",
                                        }
                                   }}
                                   id="outlined-disabled"
                                   disabled
                                   label=""
                                   inputProps={{
                                        maxLength: 100, sx: { backgroundColor: '#f0f0f0' },
                                   }}
                                   value={allocDetails[0].RELEASE_DATE}
                                   defaultValue={allocDetails[0].RELEASE_DATE}
                                   InputProps={{
                                        style: { fontSize: 12 },
                                        shrink: true,
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                              />
                         </div>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
                         <div>
                              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                   Status</InputLabel>
                         </div>
                         <div className={RulesLocationHeaderClasses.multiselectfield}>
                              <TextField
                                   size="small"
                                   sx={{
                                        margin: "0px 0px 2px 2px", width: "180px"
                                        , "& .MuiInputBase-input.Mui-disabled": {
                                             backgroundColor: "#f0f0f0",
                                             borderRadius: "5px",
                                             height: "15px",
                                        }
                                   }}
                                   disabled
                                   name="STATUS"
                                   value={allocDetails[0].STATUS}
                                   defaultValue={allocDetails[0].STATUS}
                                   id="outlined-disabled"
                                   InputProps={{
                                        style: { fontSize: 12 },
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                              />
                         </div>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
                         <div>
                              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                   Alloc Type</InputLabel>
                         </div>
                         <div className={RulesLocationHeaderClasses.multiselectfield}>
                              <TextField
                                   size="small"
                                   sx={{
                                        margin: "0px 0px 2px 2px", width: "180px"
                                        , "& .MuiInputBase-input.Mui-disabled": {
                                             backgroundColor: "#f0f0f0",
                                             borderRadius: "5px",
                                             height: "15px",
                                        }
                                   }}
                                   id="outlined-disabled"
                                   name="ALLOC_TYPE"

                                   value={allocDetails[0].ALLOC_TYPE}
                                   defaultValue={allocDetails[0].ALLOC_TYPE}
                                   inputProps={{
                                        maxLength: 100,
                                   }}
                                   InputProps={{
                                        style: { fontSize: 12 },
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                                   disabled
                              />
                         </div>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
                         <div>
                              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                   Allocator</InputLabel>
                         </div>
                         <div>
                              <TextField
                                   variant="outlined"
                                   size="small"
                                   sx={{
                                        margin: "0px 0px 2px 2px", width: "180px"
                                        , "& .MuiInputBase-input.Mui-disabled": {
                                             backgroundColor: "#f0f0f0",
                                             borderRadius: "5px",
                                             height: "15px",
                                        }
                                   }}
                                   disabled
                                   name="CREATE_ID"
                                   id="outlined-disabled"
                                   value={allocDetails[0].ALLOCATOR}
                                   defaultValue={allocDetails[0].ALLOCATOR}
                                   InputProps={{
                                        style: { fontSize: 12 },
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                              />
                         </div>
                    </div>

                    <Button
                         sx={{
                              fontSize: "12px",
                              backgroundColor: "#228B22",
                              padding: "5px", fontFamily: "system-ui",
                              width: "100px", marginLeft: "5px", marginTop: "20px",
                         }}
                         variant="contained"
                         //className={CreateAllocationClasses.textField}
                         type="submit"
                         onClick={ApproveFreeseCheck ? ViewModeFunction : handlesubmitRules}
                         startIcon={<DoneAllIcon />}
                    >
                         OK</Button>


                    <Button
                         sx={{
                              backgroundColor: "maroon",
                              fontSize: "12px", padding: "5px", fontFamily: "system-ui",
                              width: "100px", marginLeft: "5px", marginTop: "20px",
                         }}
                         variant="contained"
                         //className={RulesLocationHeaderClasses.textField}
                         type="submit"
                         onClick={ApproveFreeseCheck ? ViewModeFunction : handleCancel}
                         startIcon={<CancelIcon />}
                    >
                         Cancel</Button>
               </div>
          </Box >
     )

     /*
        #################################################
        ############ ERROR POP-UP MESSAGE ###############
        #################################################
     */

     const handleCloseDialog = (e) => {
          setOpenDialogRL(false);
          setDialogDataRL("")
     }

     return (
          <div>
               {!AllRetreiverRLdataCheck ?
                    <Box className={RulesLocationHeaderClasses.maindiv}>
                         <Grid >
                              <Box
                                   display="inline-block"
                                   sx={{
                                        backgroundColor: "",
                                        width: "calc(93vw - 0px)",
                                        height: "auto",
                                   }}
                              >
                                   <div className={RulesLocationHeaderClasses.course_box}>
                                        {SearchHeader()}
                                   </div>
                              </Box>
                         </Grid>
                    </Box>

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
                         }}></DialogTitle>
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
          </div>
     )
}

export default Top;