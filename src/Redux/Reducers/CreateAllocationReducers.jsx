import * as actions from "../constant";
const initialState = {
    isLoading: false,
    data: [],
    isError: false,
    message: "",
    isSuccess: false,
};

const CreateAllocationReducers = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_WAREHOUSE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_WAREHOUSE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_WAREHOUSE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_SUPPLIER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_SUPPLIER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_SUPPLIER_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_SUPPLIER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_SUPPLIER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_SUPPLIER_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_SUPPLIERSITE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_SUPPLIERSITE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_SUPPLIERSITE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_PACKNO_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_PACKNO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_PACKNO_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_DIFF_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_DIFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_DIFF_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_SKU_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_SKU_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_SKU_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_ITEM_LIST_HEAD_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_ITEM_LIST_HEAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ITEM_LIST_HEAD_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_VPN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_VPN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_VPN_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_UDA_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_UDA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_UDA_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_PO_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_PO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_PO_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_PO_TYPE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_PO_TYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_PO_TYPE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_HIER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_HIER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_HIER_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_HIER2_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_HIER2_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_HIER2_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_HIER3_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_HIER3_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_HIER3_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_ASN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_ASN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ASN_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_TSF_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_TSF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_TSF_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_EXCLUDEUDA_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_EXCLUDEUDA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_EXCLUDEUDA_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_ITEMPARENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_ITEMPARENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ITEMPARENT_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_PROMOTION_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_PROMOTION_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_STATUS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_STATUS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_CONTEXT_TYPE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_CONTEXT_TYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_CONTEXT_TYPE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_ALLOC_TYPE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };
        case actions.GET_ALLOCNO_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_ALLOCNO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOCNO_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_ALLOC_TYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOC_TYPE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_ALLOC_LEVEL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_ALLOC_LEVEL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOC_LEVEL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_ALLOCRESULT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_ALLOCRESULT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: true,
            };

        case actions.POST_ALLOCRESULT_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_ALLOC_CRITERIA_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_ALLOC_CRITERIA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOC_CRITERIA_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_ALLOCINSERT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_ALLOCINSERT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: true,
            };

        case actions.POST_ALLOCINSERT_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_ALLOCRESULTCWH_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_ALLOCRESULTCWH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: true,
            };

        case actions.POST_ALLOCRESULTCWH_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_ALLOCRESULTCASN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_ALLOCRESULTCASN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: true,
            };

        case actions.POST_ALLOCRESULTCASN_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_ALLOCRESULTCTSF_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_ALLOCRESULTCTSF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: true,
            };

        case actions.POST_ALLOCRESULTCTSF_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOC_ITEMS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_ALLOC_ITEMS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOC_ITEMS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        /* LIKE ITEM START*/
        case actions.POST_LIKE_INSERT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_LIKE_INSERT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_LIKE_INSERT_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        // NO OF SKUS
        case actions.POST_NOOFSKUS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_NOOFSKUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_NOOFSKUS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        /* LIKE ITEM END */
        case actions.GET_ALLOCHEADDETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_ALLOCHEADDETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOCHEADDETAILS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_ALLOCNODETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_ALLOCNODETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOCNODETAILS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_ALLOC_AVAIL_SEARCH_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_ALLOC_AVAIL_SEARCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOC_AVAIL_SEARCH_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOC_AVAIL_QTY_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_ALLOC_AVAIL_QTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOC_AVAIL_QTY_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_UPDATESELINDCREATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_UPDATESELINDCREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_UPDATESELINDCREATE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_SWITCHTABFUNC_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_SWITCHTABFUNC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_SWITCHTABFUNC_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_DELETECREATEGRID_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_DELETECREATEGRID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_DELETECREATEGRID_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_CREATEREFRESHGRID_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_CREATEREFRESHGRID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_CREATEREFRESHGRID_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_SPLITCREATEFUNCTION_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_SPLITCREATEFUNCTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_SPLITCREATEFUNCTION_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_DEL_MAPPED_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_DEL_MAPPED_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_DEL_MAPPED_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_MAP_ITEMS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_MAP_ITEMS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_MAP_ITEMS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        // Calculation
        case actions.POST_CALC_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_CALC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_CALC_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_CREATEGRIDDF_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_CREATEGRIDDF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_CREATEGRIDDF_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        //ALLOC DETAILS VALIDATION
        case actions.POST_ALLOCDTLTAB_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_ALLOCDTLTAB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_ALLOCDTLTAB_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        // ALLOC DETAILS GRID DATA
        case actions.POST_ALLOCDTLRTV_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_ALLOCDTLRTV_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_ALLOCDTLRTV_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        /*ERROR REPORT*/
        case actions.POST_ERRREPORT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_ERRREPORT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_ERRREPORT_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        /*APPROVEFUNCTION*/
        case actions.POST_APPROVEFUNCTION_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_APPROVEFUNCTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_APPROVEFUNCTION_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_APPROVEVALIDFUNCTION_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_APPROVEVALIDFUNCTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_APPROVEVALIDFUNCTION_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        /*RESERVEFUNCTION*/
        case actions.POST_RESERVEFUNCTION_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_RESERVEFUNCTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_RESERVEFUNCTION_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        /*WORKSHEETFUNCTION*/
        case actions.POST_WORKSHEETFUNCTION_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_WORKSHEETFUNCTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_WORKSHEETFUNCTION_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };


        // Alloca Details
        case actions.POST_SPREADALLOC_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };


        case actions.POST_SPREADALLOC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_SPREADALLOC_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_SIZEPROF_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };


        case actions.POST_SIZEPROF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_SIZEPROF_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_ALLOCQTY_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };


        case actions.POST_ALLOCQTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_ALLOCQTY_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_COPYAD_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };


        case actions.POST_COPYAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_COPYAD_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_FETCHNN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };


        case actions.POST_FETCHNN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_FETCHNN_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        /* SCHEDULE SCREEN */

        case actions.POST_SCHDLSV_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };


        case actions.POST_SCHDLSV_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_SCHDLSV_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };


        case actions.POST_SCHDLRTV_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };


        case actions.POST_SCHDLRTV_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_SCHDLRTV_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        /* COMMIT DATA */
        case actions.POST_COMMITDATA_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };
        case actions.POST_COMMITDATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_COMMITDATA_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        /* Multi PO Create Screen*/
        case actions.POST_MULTIPOCREATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };
        case actions.POST_MULTIPOCREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_MULTIPOCREATE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        /* RL Validation in Create Screen*/
        case actions.POST_VALIDRLCHECKDATA_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };
        case actions.POST_VALIDRLCHECKDATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_VALIDRLCHECKDATA_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        /*COMMIT/CLOSE ALLOC DETAILS & SIZE DETAILS */
        case actions.POST_ADSAVE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };
        case actions.POST_ADSAVE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_ADSAVE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_SDSAVE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };
        case actions.POST_SDSAVE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_SDSAVE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        // COLLAB COMMENTS START 
        case actions.POST_INSCOMM_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };
        case actions.POST_INSCOMM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_INSCOMM_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_RTVCOMM_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };
        case actions.POST_RTVCOMM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_RTVCOMM_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        //COLLAB COMMENTS END
        case actions.POST_UPDSTATUS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };
        case actions.POST_UPDSTATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_UPDSTATUS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        default:
            return { ...state };
    }
};

export default CreateAllocationReducers;