export const API = {
  EXCELDATA: "/stg_trn_data/",
  FETCHERRORDATA: "/err_trn_data_tab/",
  UPDATEERRORDATA: "/delete_err_trn/",
  GETHIER2DATA: "/lov_item_dtl/",
  GETLOCATIONDATA: "/location_validation/",
  FETCHCONFIGDATA: "/system_config_tab/",
  UPDATECONFIGDATA: "/sys_conf/",
  DAILYCOUNTDATA: "/count_pending/",
  STAGECOUNTDATA: "/count_stg_trn/",
  ERRORCOUNTDATA: "/count_trn/",
  FETCHDAILYRECDATA: "/daily_rec/",
  FETCHERRSTAGESATA: "/retrieve_err_stg_data/",
  UPDATETRANSACTIONREVERSAL: "/trn_data_rev/",
  FETCHTRANSACTIONREVERSAL: "/trn_data_history/",
  CANCELTRANSACTIONREVERSAL: "/cancel/",
  FETCHITEMLOCATIONDATA: "/item_loc_data/",
  UPDATECOSTANDVAR: "/cost_update_stg_trn/",
  FETCHGLACCOUNT: "/gl_account_tab/",
  UPDATEGLACCOUNT: "/GL_ACCOUNT_update/",
  GETGLDATA: "/currency_gl/",
  INSERTGLDATA: "/GL_ACCOUNT_create/",
  FETCHSTGFIN: "/Retrieve_stg_fin/",
  FETCHTRNTYPE: "/trn_type_dtl/",
  FETCHTRNTYPELIST: "/trn_type_dtl_list/",
  FETCHDAILYVIEW: "/Daily_view/",
  FETCHSUBLEDGERCOST: "/subledger_cost/",
  CREATESYSCONF: "/system_config_creation/",
  FETCHGLPRIMARY: "/primary_gl/",

  FETCHWH: "/Warehouse_tab/",
  FETCHSUP: "/SUPPLIER_tab/",
  FETCHSUPSITE: "/SUPPLIER_SITE_tab/",
  FETCHPKN: "/PACK_NO_tab/",
  FETCHDIF: "/DIFF_tab/",
  FETCHSKU: "/SKU_tab/",
  FETCHILH: "/item_list_head_tab/",
  FETCHVPN: "/VPN_tab/",
  FETCHUDA: "/UDA_tab/",
  FETCHPO: "/PO_tab/",
  FETCHPO_TYPE: "/PO_TYPE_tab/",
  FETCHHIER: "/HIER_tab/",
  FETCHEXCLUDEUDA: "/EXCLUDE_UDA_tab/",
  FETCHALTYPE: "/Alloc_Type_tab/",
  FETCHALLEVEL: "/Alloc_Level_tab/",
  FETCHCNTYPE: "/Context_type_tab/",
  FETCHSTATUS: "/Status_tab/",
  FETCHPROM: "/Promotion_tab/",
  UPDATEALLOCRES: "/Alloc_result_tab/",
  FETCHALOCRITERIA: "/Criteria_tab/",
  UPDATEALLOCINSERT: "/Alloc_Insert_Tab/",
  FETCHITEMPRT: "/ITEM_PARENT_tab/",
  FETCHHIER2: "/HIER2_tab/",
  FETCHHIER3: "/HIER3_tab/",
  UPDATEALLOCRESWH: "/Alloc_result_WH_tab/",
  FETCHASN: "/ASN_tab/",
  UPDATEALLOCRESASN: "/Alloc_result_ASN_tab/",
  FETCHTSF: "/TSF_tab/",
  UPDATEALLOCRESTSF: "/Alloc_result_TSF_tab/",
  FETCHALLOCNO: "/Alloc_No_tab/",
  FETCHALLOCHEADDETAILS: "/Alloc_no_screen_tab/",
  UPDATESELINDCREATE: "/Alloc_update_SelInd_Create_tab/",

  FETCHQTYLIMITS: "/Alloc_qty_limits_retrive_tab/",
  FETCHALLOCNODTLS: "/alloc_no_detail_tab/",
  UPDATEQTYLIMITS: "/update_Alloc_quantity_limits_grid_tab/",
  OKQTYLIMITSSRN: "/alloc_qty_Limits_Insert_tab/",

  FETCHALLOCITEMS: "/allocated_items/",
  INSERTLIKEITEM: "/Insert_LikeItem/",
  DELMAPPEDITMS: "/delMappedItms/",
  MAPITEMS: "/mapItms/",
  FETCHAVAILQTY: "/Alloc_avail_qty_tab/",
  FETCHAVAILSEARCH: "/Alloc_avail_search_tab/",

  FETCHRULETYPE: "/rule_type_code_detail_tab/",
  FETCHNEED: "/need_code_detail_tab/",
  FETCHHIERARCHY: "/hierarchy_code_detail_tab/",
  FETCHALLOCATETO: "/allocate_to_code_detail_tab/",
  FETCHLOCATIONDATA: "/Alloc_pop_store_tab/",
  FETCHLOCATIONRL: "/store_tab/",
  FETCHLOCATIONLISTRL: "/store_list_table/",
  FETCHLOCATIONTRAITSRL: "/store_traits_tab/",
  FETCHCLEARANCERL: "/clearance_code_detail_tab/",
  FETCHSTATUSRL: "/status_code_detail_tab/",
  UPDATERULESRL: "/alloc_rule_Data_tab/",
  FETCHLOCGRID: "/locationGrid/",

  UPDATELOCATIONRL: "/Alloc_update_RL_Location_tab/",
  DELETELOCATIONRL: "/Alloc_DEL_LOCS_tab/",
  LOADWEIGHTCHANGERL: "/Alloc_load_change_weights_tab/",
  LOADRULEDATERL: "/Alloc_load_rule_dates_tab/",
  // RETRIEVERULEDATERL: "/Alloc_retrieve_rule_dates_tab/",
  UPDATECHANGEWEIGHTSRL: "/Fetch_Alloc_change_weights_tab/",
  UPDATEWHINDRL: "/Alloc_STORE_WH_tab/",
  INSLOCRL: "/Alloc_INS_DATA_tab/",
  RTVRLDATA: "/alloc_rtv_rl_data_tab/",

  SWITCHTABFUNC: "/switchTab/",
  DELETECREATEGRID: "/Alloc_delete_Create_tab/",
  CREATEREFRESHGRID: "/Alloc_Refresh_grid_Create_tab/",
  SPLITCREATEFUNCTION: "/Alloc_split_button_create_tab/",
  CALCFUNC: "/calculation_tab/",

  /* SIZE DETAILS*/
  SIZEDETAILS: "/size_details_tab/",
  SIZEHEADERDETAILS: "/size_details_Header_tab/",
  SIZEUPDATEDETAILS: "/size_details_Update_tab/",
  /* ALLOC DETAILS*/
  ALLOC_DTL_TAB: "/Alloc_dtl_tab/",
  ALLOCDTL_RTVDATA: "/Alloc_dtl_data/",
  ALLOCQTY_UP: "/UAllocQty/",

  /* WHAT IF SUMMARY*/
  RETRIEVEWHATIF: "/Retrieve_WhatIF_tab/",
  SUBMITWHATIF: "/Submit_WhatIF_tab/",
  POTYPEWHATIF: "/POType_WhatIF_tab/",
  SUPPLIERWHATIF: "/Supplier_WhatIF_tab/",
  ORIGINCRTYWHATIF: "/Origin_country_WhatIF_tab/",
  ERRREPORT: "/err_report_tab/",
  
  /* WHAT IF PO*/
  RETRIEVEWHATIFPO: "/Retrieve_WhatIFPO_tab/",
  SUBMITWHATIFPO: "/Submit_WhatIFPO_tab/",
  RTVPOPRV:"/rtvpopreview/",
  CRTPO:"/createpo/",
  UPDATEPO:"/updatePO/",

  /*APPROVE CREATE SCREEN*/
  APPROVEFUNCTION: "/approve_createScreen_tab/",
  APPROVEVALIDFUNCTION: "/approve_valid_createScreen_tab/",
  CREATEGRIDDF: "/createScreen_grid_tab/",

  /*ALLOCATION SUMMARY */
  ALLOCIDS: "/alloc_dtls_asy/",
  ALLTRSTS: "/alloc_asy/",
  SWITCHASY: "/switch_ASY/",
  SEARCHASY: "/search_asmy/",
  COPYASY: "/copy_alloc/",
  VALIDASY: "/valid_asy/",

  /*RESERVE CREATE SCREEN*/
  RESERVEFUNCTION: "/reverse_createScreen_tab/",
  /*WORKSHEET CREATE SCREEN*/
  WORKSHEETFUNCTION: "/worksheet_createScreen_tab/",
  SPREADALLOC: "/spreadAlloc/",
  SIZEPROF: "/sizePro/",

  /* SCHEDULE SCREEEN */
  SCHDLSV: "/schdlsv/",
  SCHDLRTV: "/schdlData/",
  /* Commiting */
  COMMITDATA: "/Alloc_Commit_Data_tab/",
  COPYAD: "/copyDownAD/",
  FETCHNN: "/fetchNN/",

  /* ALLOC DETAILS PACK */

  RTVADPACK: "/rtvADPack/",
  ADVALIDN: "/AD_valid/",
  G1ADPK: "/ADPgrid1/",
  G2ADPK: "/ADPgrid2/",
  UPDATEADPK: "/ADPUpdate/",
  RESTOREADPK: "/ADPRestore/",
  NOOFSKUS: "/noSkus/",
  /* Multi PO Create Screen*/
  MULTIPOCREATE: "/Multi_PO_Create_Tab/",
  /* RL Validation in Create Screen*/
  VALIDRLCHECKDATA: "/RL_Data_check_tab/",
  
  /*COMMIT/CLOSE ALLOC DETAILS & SIZE DETAILS */
  ADSAVE:"/adSave/",
  SDSAVE:"/sdSave/",

    /* ALLOCATION DASHBOARD*/
    DASHBOARDUSERALLOC: "/Alloc_Dashboard_UserAlloc_tab/",
    DASHBOARDRELEASECOUNT: "/Alloc_Dashboard_Release_tab/",
    DASHBOARDALLOCCOUNT: "/Alloc_Dashboard_AllocCount_tab/",
    DALLOC:"/DAlloc/",
    ASMAPRV: "/massAprv/",

    /* COLLAB COMMENTS */
    RTVCOLLABCOMM:'/rtvcomments/',
    INSCOLLABCOMM:'/inscomment/',

    /* Allocation Batches */
    ALLOCSCHDLBTH : '/alcscdlbth/',
    UPDATEBTHDATE:'/updbthdate/',

     /* RL TEMPLATE STARTS */
    RULESAVETEMPLATE: '/ruleRLTemplateData/',
    RLLOCSAVETEMPLATE: '/locRLTemplateData/',
    RULETEMPLATENAME: '/rule_template_data/',
    RLLOCTEMPLATENAME: '/loc_template_data/',
    FETCHRULETEMPLATE: '/Fetch_RL_RuleTemplateData/',
    FETCHRLLOCTEMPLATE: '/Ftech_RL_locTemplateData/',
    /* RL TEMPLATE ENDS */

    /* SEED DATA INSERT */
    SEEDHIER1:'/insHier1/',
    SEEDHIER2:'/insHier2/',
    SEEDHIER3:'/insHier3/',
    SEEDITMDTL:'/insItmDtl/',
    REPORT: '/genReport/',
  };
