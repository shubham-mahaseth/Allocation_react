import React,{useState} from "react";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from "@mui/material";

//import CancelTranList from "../../TransactionReversal/index"


export default function EnhancedTableToolbar(props) {
  const { selected, handledelete, edithandle,SubmitList, handleClickOpen,valueSelect,setValueSelect,seteditRows,handleClick,cancelReverse, setSelected, editRows = [], setUpdateRow,updateData, setupdateData, setTabledata, allData } = props;

  const [isAuth, setIsAuth] = useState([]);
  
  if (selected.length>0){
    setValueSelect(selected)
  }
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selected.length > 0 && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected.length} selected
        </Typography>
      )}
      {selected.length > 0 && (
        <>
        {(edithandle === true) ?
        <Button size="small" variant="contained" onClick={() => handleClickOpen()} startIcon={<EditIcon />}>Reversal</Button>
        :<>
        <Button size="small" variant="contained" onClick={() => {setSelected([]);seteditRows([]); setUpdateRow([]); setupdateData({}); setTabledata(allData);}} startIcon={<CancelIcon />}>CANCEL</Button>
          <Button size="small" variant="contained" onClick={() => {setSelected([]);seteditRows([]);}}startIcon={<EditIcon />}>Save</Button>  
        </>    
      }     
      </>
      )}
    </Toolbar>
    
  );
}
console.log("table:4")

