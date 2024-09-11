import React, { useEffect, useState } from "react";
import Header from "../Header";
import Autocomplete from '@mui/material/Autocomplete';
import {Table, TableBody, TableCell, TableContainer, TablePagination, TableRow,Paper, Checkbox, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TableToolbar from "../Toolbar/index";
// import { trnType } from "../../ErrorProcessing/transType";
import TrnTypeList from "../../TRNTYPE";
import "../index.css";
import { bgcolor } from "@mui/system";

const useStyles = makeStyles({
  tabCell: {
    padding: "6px 4px !important",
    fontSize: "0.7rem !important",
},
  input: {
    '& .MuiInput-root': {
    fontSize: '12px !important',    
      '& .MuiInput-input':{
        padding:'4px 0 1px',
      }
    },
  },
  '& .Mui-disabled': {
    opacity: '0.3',
  }
});

const CommonTable = ({
  handleClick,
  handleSelectAllClick,
  handleRequestSort,
  handleChangePage,
  isSelected,
  handleDelete,
  handleSearch,
  handleEdit,
  seteditRows,
  setSelected,
  editRows,
  setUpdateRow,
  searchText,
  rows,
  selected,
  order,
  orderBy,
  stableSort,
  getComparator,
  page,
  rowsPerPage,
  emptyRows,
  handleChangeRowsPerPage,
  headCells,
  pageName,
  setTabledata,
  allData,
  handleSearchClick,
  freeze,
  setFreeze,
  handleCopyDown,
  tableData,
  setAllData,
  tabledataclone,
  setInputValue,
  inputValue,
  setSearched,
  selectPageNo,
  allSelectObject,
  s_object,
  s_selecVal
}) => {


    const [updateData, setupdateData] = useState({});  
    const rowClasses = useStyles();  

    var trnTypeValue = TrnTypeList();

  const onBlur = (event, value , row) => {
    let temp = {...updateData};
    //console.log(temp);
    temp[(row?.TRAN_SEQ_NO)?row?.TRAN_SEQ_NO:row?.SR_NO] = row;
    temp[(row?.TRAN_SEQ_NO)?row?.TRAN_SEQ_NO:row?.SR_NO][event.target.name] = event.target.value; 
    if(event.target.name == 'QTY') {
           temp[row?.TRAN_SEQ_NO]['TOTAL_COST'] = parseInt(event.target.value) * parseInt(row['UNIT_COST']); 
         }
      if(value){
        temp[(row?.TRAN_SEQ_NO)?row?.TRAN_SEQ_NO:row?.SR_NO]['TRN_TYPE'] = value['TRN_TYPE'];
        temp[(row?.TRAN_SEQ_NO)?row?.TRAN_SEQ_NO:row?.SR_NO]['AREF'] = value['AREF']; 
      }   
    setupdateData(temp)
  }
//console.log("sa ",s_selecVal)
  useEffect(() => {
    if(setUpdateRow){
    setUpdateRow(updateData);
    }
  },[updateData])
// console.log("ct",rowsPerPage);

  return (
    <>
      <Paper sx={{ maxWidth: "100%", maxHeight: "fit-content", mb: 2 }}>
          {((pageName != "Inventory Transaction" || pageName != "stage") && pageName != 'reconciliation' && pageName != 'inquiry' && pageName !='subledgercost' ) &&
        <TableToolbar selected={selected} handledelete={handleDelete} edithandle={handleEdit} seteditRows={seteditRows} setUpdateRow={setUpdateRow} setSelected={setSelected} editRows={editRows} setupdateData={setupdateData} setTabledata={setTabledata} allData={allData}/>
        } 
        <TableContainer sx={{ overflowX: "scroll", overflowY: "scroll",height: "fit-content", maxHeight: "70vh" }}>
          <Table
            sx={{ maxWidth: "100%" }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <Header
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              handleSearch={handleSearch}
              handleSearchClick={handleSearchClick}
              searchText={searchText}
              headCells={headCells}
              editRows={editRows}
              checkEditrows={true}
              freeze={freeze}
              handleCopyDown={handleCopyDown}
              tableData={tableData}
              setTabledata={setTabledata}
              setAllData={setAllData}
              tabledataclone={tabledataclone}
              inputValue={inputValue}
              setInputValue={setInputValue}
              setSearched={setSearched}
              setFreeze={setFreeze}
              selected={selected}
              pageName={pageName}
              rowsPerPage={rowsPerPage}
              selectPageNo={selectPageNo}
              page={page}
              allSelectObject={allSelectObject}
              s_object={s_object}
              s_selecVal={s_selecVal}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row?.SR_NO?row?.SR_NO:row?.TRAN_SEQ_NO);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row?.SR_NO?row?.SR_NO:row?.TRAN_SEQ_NO}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row?.SR_NO?row?.SR_NO:row?.TRAN_SEQ_NO)}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          style={{
                            color: "#635b5bb8",
                          }}
                         // disabled={editRows && editRows.length > 0}
                        />
                      </TableCell>
                      { editRows?.includes((row?.TRAN_SEQ_NO)?row?.TRAN_SEQ_NO:row?.SR_NO) ? <>
                        {Object.entries(row).map(([key, value]) => {
                            let editable;
                          if(pageName == "error"){
                              editable = false;
                            if(key == "ITEM"){
                                editable = row["ERR_MSG"].toLowerCase().search("item") !== -1;
                            }if(key == "LOCATION"){
                              editable = row["ERR_MSG"].toLowerCase().search("location") !== -1;
                            }if(key == "TRN_NAME"){
                              editable = row["ERR_MSG"].toLowerCase().search("trn_type") !== -1;
                            }if(key == "QTY"){
                              editable = row["ERR_MSG"].toLowerCase().search("qty") !== -1;
                            }if(key == "CURRENCY"){
                              editable = row["ERR_MSG"].toLowerCase().search("currency") !== -1;
                            }if(key == 'TRN_DATE'){
                              editable = row["ERR_MSG"].toLowerCase().search("trn_date") !== -1;
                            }
                          }
                          if(pageName == "config"){
                              editable = true;
                            if(key == 'TRN_NAME'){
                              editable = false;
                              //console.log(editable);
                              }
                          }
                        //   if(pageName == "cost_maintenance"){
                        //     editable = true;
                        //     if(key == "UNIT_COST"){
                        //       editable = true
                        //   }
                        // }
                          if(pageName == "edit_Transaction"){
                            editable = false;
                          if(key == 'QTY'){
                            editable = true;
                            //console.log("log:",editable);
                            }
                          if(key == 'UNIT_COST'){
                            editable = true;
                          }
                          if(key == 'UNIT_RETAIL'){
                            editable = true;
                          }}
                        //   if(pageName == "cost_maintenance"){
                        //   if(key == "UNIT_COST"){
                        //     editable = true
                        // }}
                            return <TableCell padding="none" align="left" key={key} className={rowClasses.tabCell}>
                              {(key == 'TRN_NAME' && pageName == 'error') ? (
                                    <Autocomplete
                                    disabled={!editable}
                                    disablePortal
                                    size="small"
                                    id="combo-box-trn-type"
                                    // value={(row?.TRN_TYPE == option?.TRN_TYPE)?row?.TRN_TYPE: }
                                    onChange={ (event, value) => onBlur(event, value, row)}
                                    options={trnTypeValue}
                                    getOptionLabel={(option) => option.TRN_NAME}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} variant="standard" />}
                                  />
                              ) : (
                                <TextField 
                            disabled={!editable}
                            size="small"
                            type={(key == 'TRN_DATE')?'date':'text'}
                            variant="standard"
                            className={rowClasses.input}
                            defaultValue={value} name={key} onChange={ (event, value) => onBlur(event,value,row)} />
                              )
                              
                              }
                            
                           </TableCell>
                              }
                      )}
                      </> :           
                      <>
                      {Object.entries(row).map(([key, value])=> {
                          let colorcode = "";
                          if(pageName == "reconciliation"){
                            if(key == "QTY"){
                                colorcode = (row['QTY_MATCHED'] == 'N')?"lightyellow":"";
                            } 
                            if(key == "ROLLED_QTY"){
                              colorcode = (row['QTY_MATCHED'] == 'N')?"lightyellow":"";
                            }
                            if(key == "COST"){
                              colorcode = (row['COST_MATCHED'] == 'N')?"lightyellow":"";
                             } 
                           if(key == "ROLLED_COST"){
                            colorcode = (row['COST_MATCHED'] == 'N')?"lightyellow":"";
                            }
                            if(key == "RETAIL"){
                            colorcode = (row['RETAIL_MATCHED'] == 'N')?"lightyellow":"";
                            } 
                            if(key == "ROLLED_RETAIL"){
                            colorcode = (row['RETAIL_MATCHED'] == 'N')?"lightyellow":"";
                            } 
                          }
                          return (<TableCell align="left" key={key} className={rowClasses.tabCell} sx={((key == 'SR_NO')?'display:none':'')} 
                          style={{color:((colorcode)?`Red`:``)}}>
                              {(value == "NULL")?"":value }
                          </TableCell> )
                      }
                      )}
                      </> }
                      
                    </TableRow>
                  );
                })}

              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {selected.length===0 && */}
        <TablePagination
          rowsPerPageOptions={[30, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> 
        {/* }
        {selected.length>0 &&
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />  } */}
        </Paper>
    </>
  );
};

export default CommonTable;
