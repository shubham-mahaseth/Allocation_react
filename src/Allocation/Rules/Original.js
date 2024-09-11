import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
import BottomContainer from './BottomGrid'
import Top from './Top';

import axios from "axios";
import { CONFIG } from "../../services/config";

import swal from '@sweetalert/with-react';
import { getRTVRLDATARequest } from "../../Redux/Action/rules&location";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import { makeStyles, withStyles } from "@mui/styles";
import Button from "@mui/material/Button";


const useStyles = makeStyles({
  divBox: {
    // width: "100%",
    // height: "100%",
    overflow: "hidden",
    // position: "relative",
    display: "flex",
    // flexDirection:"row",
    border: "1px solid red"
  },
  divBoxLeft: {
    width: "50%",
    float: "left",
    // height: "100%",
    height: "auto",
    flex: 1
    // display:"table-cell",
  },
  divBoxRight: {
    // marginLeft: "50%",
    // height: "100%",
    width: "50%",
    float: "left",
    height: "auto",
    flex: 1
    // display:"table-cell",
  },
})
const dumpData = [
  { LOC: "10", LOC_DESC: "Test store10", DEFAULT_WH: "1001", GROUP_ID: "", GROUP_DESC: "", LIKE_LOC: "", LIKE_LOC_DESC: "", WEIGHT_PCT: "", CLEARANCE_IND: "", ITEM_LOC_STATUS: "", RELEASE_DATE: "" },
  { LOC: "35", LOC_DESC: "Test store35", DEFAULT_WH: "1001", GROUP_ID: "", GROUP_DESC: "", LIKE_LOC: "", LIKE_LOC_DESC: "", WEIGHT_PCT: "", CLEARANCE_IND: "", ITEM_LOC_STATUS: "", RELEASE_DATE: "" },
  { LOC: "45", LOC_DESC: "Test store45", DEFAULT_WH: "1001", GROUP_ID: "", GROUP_DESC: "", LIKE_LOC: "", LIKE_LOC_DESC: "", WEIGHT_PCT: "", CLEARANCE_IND: "", ITEM_LOC_STATUS: "", RELEASE_DATE: "" },
  { LOC: "100", LOC_DESC: "Test store100", DEFAULT_WH: "1001", GROUP_ID: "", GROUP_DESC: "", LIKE_LOC: "", LIKE_LOC_DESC: "", WEIGHT_PCT: "", CLEARANCE_IND: "", ITEM_LOC_STATUS: "", RELEASE_DATE: "" }
]

const RulesAndLocation = ({ allocNoData, tab, setTab, setIsValidQtyLimits, setRTabCond, setDisCond,
   rtvrldata, setrtvrldata, setIsLoading, ApproveFreeseCheck, setHeaderCheck, setRLRuleData,
  setOpenDialog, setDialogData
}) => {
  // const leftContRef = useRef();
  const [submit, setSubmit] = useState([]);
  const [new_table, setNew_table] = useState([])
  const [allocNo, setAllocNo] = useState([]);
  const [allocLevel, setAllocLevel] = useState('');
  const [totalData, setTotalData] = useState([]);
  const [updateRulesRL, setUpdateRulesRL] = useState([]);
  const [tableLocData, setTableLocData] = useState([]);

  const RulesLocationClasses = useStyles();
  const [allocDetails, setAllocDetails] = useState([{}])
  const [LoadCheck, setLoadCheck] = useState(false);
  const [rules, setRules] = useState({});
  const [tableData, settableData] = useState([]);
  const [likeLocData, setLikeLocData] = useState([]);
  const [clearanceRLData, setclearanceRLData] = useState([]);
  const [StatusRLData, setStatusRLData] = useState([]);

  const initialLeftRules = {
    RULE_LEVEL: "",
    EXACT_IND: "",
    RULE_TYPE: "",
    NET_NEED_IND: "",
    REGULAR_SALES_IND: "Y",
    PROMO_SALES_IND: "Y",
    CLEARANCE_SALES_IND: "N",
    SIZE_PROFILE_IND: "N",
    ENFORCE_PRES_MIN_IND: "N",
    START_DATE1: "",
    END_DATE1: "",
    START_DATE2: "",
    END_DATE2: "",
    WEEKS_THIS_YEAR: "",
    WEEKS_LAST_YEAR: "",
    ON_ORDER_COMMIT_WEEKS: "",
    ON_ORDER_COMMIT_DATE: "",
    ENFORCE_WH_RL: "Y",
    EXACT_IND_VAL: "",
    NET_NEED_IND_VAL: "",
    ALLOC_NO: allocNoData.ALLOC_NO,
    CHANGEWEIGHTSCHECK: "N",
    TEMPLATE_NO: "",
    CASCADE_IND: "",
    USE_RULE_LEVEL_ON_HAND_IND: "",
    INCLUDE_CLEARANCE_STOCK_IND: "",
    INCLUDE_INV_IN_MIN_IND: "",
    INCLUDE_INV_IN_MAX_IND: "",
    IWOS_WEEKS: "",
    WEEKS_FUTURE: "",
    CORPORATE_RULE_ID: "",
    INCLUDE_MID_TIER_ON_HAND_IND: "",
    LEAD_TIME_NEED_IND: "",
    LEAD_TIME_NEED_RULE_TYPE: "",
    LEAD_TIME_NEED_START_DATE: "",
    LEAD_TIME_NEED_END_DATE: "",
    CONVERT_TO_PACK: "",
  }

  const [leftContData, setLeftContData] = useState(initialLeftRules);
  const [selected, setSelected] = useState([]);

  const [loading, setLoading] = useState(false);

  const RulesLocationData = useSelector(
    (state) => state.RulesLocationReducers
  );
  const dispatch = useDispatch();

  const [retreieveRLdataCheck, setRetreieveRLdataCheck] = useState(true);

  const [AllRetreiverRLdataCheck, setAllRetreieveRLdataCheck] = useState(false);

  if (retreieveRLdataCheck && rtvrldata.length > 0) {
    setTotalData(rtvrldata[1]);
    setTableLocData(rtvrldata[1])
    setUpdateRulesRL(rtvrldata[0])
    setRetreieveRLdataCheck(false)
    setAllRetreieveRLdataCheck(true);
    setRLRuleData(rtvrldata[0][0])
  }

  console.log("rtvrldata: ", rtvrldata, updateRulesRL);
  return (

    <div >
      <div>
        <Box
          display="flex"
          sx={{
            backgroundColor: "",
            width: "calc(95vw - 0px)",
            margin: "0px 0px 0px 0px"
          }}
        >
          <Top
            submit={submit}
            // submit1={submit1}
            leftContData={leftContData}
            setAllocNo={setAllocNo}
            allocNoData={allocNoData}
            setAllocLevel={setAllocLevel}
            allocDetails={allocDetails}
            setAllocDetails={setAllocDetails}
            setTab={setTab}
            tab={tab}
            setIsValidQtyLimits={setIsValidQtyLimits}
            totalData={totalData}
            setLeftContData={setLeftContData}
            setRTabCond={setRTabCond}
            setDisCond={setDisCond}
            updateRulesRL={updateRulesRL}
            setUpdateRulesRL={setUpdateRulesRL}
            setrtvrldata={setrtvrldata}
            AllRetreiverRLdataCheck={AllRetreiverRLdataCheck}
            setLoadCheck={setLoadCheck}
            setIsLoading={setIsLoading}
            ApproveFreeseCheck={ApproveFreeseCheck}
            setHeaderCheck={setHeaderCheck}
            setRLRuleData={setRLRuleData}
            setOpenDialog={setOpenDialog}
            setDialogData={setDialogData}
          />
        </Box>
      </div>

      <div>
        <Box
          display="flex"
          sx={{
            backgroundColor: "",
            width: "calc(95vw - 0px)",
            margin: "0px 0px 0px 0px"
          }}
        >
          <BottomContainer
            setSubmit={setSubmit}
            setLeftContData={setLeftContData}
            allocLevel={allocLevel}
            allocNoData={allocNoData}
            allocDetails={allocDetails}
            leftContData={leftContData}
            totalData={totalData}
            rules={rules}
            selected={selected}
            setSelected={setSelected}
            setTotalData={setTotalData}
            updateRulesRL={updateRulesRL}
            setUpdateRulesRL={setUpdateRulesRL}
            AllRetreiverRLdataCheck={AllRetreiverRLdataCheck}
            setAllRetreieveRLdataCheck={setAllRetreieveRLdataCheck}
            setTableLocData={setTableLocData}
            tableLocData={tableLocData}
            setLikeLocData={setLikeLocData}
            setclearanceRLData={setclearanceRLData}
            setStatusRLData={setStatusRLData}
            likeLocData={likeLocData}
            clearanceRLData={clearanceRLData}
            StatusRLData={StatusRLData}
            LoadCheck={LoadCheck}
            setLoadCheck={setLoadCheck}
            ApproveFreeseCheck={ApproveFreeseCheck}
          />
        </Box>
      </div>
    </div>
  )
}

export default RulesAndLocation