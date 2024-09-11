import * as actions from "../constant";
const initialState = {
    isLoading: false,
    data: [],
    isError: false,
    message: "",
    isSuccess: false,
};


const RulesLocationReducers = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_ALLOCHEADDETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_ALLOCHEADDETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOCHEADDETAILS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOCNODETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_ALLOCNODETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOCNODETAILS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_RULESTYPE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_RULESTYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_RULESTYPE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_NEEDTYPE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_NEEDTYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_NEEDTYPE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_ALLOCATETOTYPE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_ALLOCATETOTYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_ALLOCATETOTYPE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_HIERARCHYTYPE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_HIERARCHYTYPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_HIERARCHYTYPE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_FETCHLOCATIONDATA_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_FETCHLOCATIONDATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_FETCHLOCATIONDATA_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_LOCATIONRL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_LOCATIONRL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_LOCATIONRL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_LOCATIONLISTRL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_LOCATIONLISTRL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_LOCATIONLISTRL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_LOCATIONTRAITSRL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_LOCATIONTRAITSRL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_LOCATIONTRAITSRL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_CLEARANCERL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_CLEARANCERL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_CLEARANCERL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_STATUSRL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_STATUSRL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_STATUSRL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_UPDATERULESRLRL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_UPDATERULESRLRL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_UPDATERULESRLRL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_UPDATELOCATIONRL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_UPDATELOCATIONRL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_UPDATELOCATIONRL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_DELETELOCATIONRL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_DELETELOCATIONRL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_DELETELOCATIONRL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_LOADWEIGHTCHANGERL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_LOADWEIGHTCHANGERL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_LOADWEIGHTCHANGERL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_LOADRULEDATERL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_LOADRULEDATERL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_LOADRULEDATERL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_RETRIEVERULEDATERL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_RETRIEVERULEDATERL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_RETRIEVERULEDATERL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_UPDATECHANGEWEIGHTSRL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_UPDATECHANGEWEIGHTSRL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_UPDATECHANGEWEIGHTSRL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_FETCHLOCGRID_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_FETCHLOCGRID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_FETCHLOCGRID_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_UPDATESIZEPROFILEINDRL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_UPDATESIZEPROFILEINDRL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_UPDATESIZEPROFILEINDRL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_UPDATEWHINDRL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_UPDATEWHINDRL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_UPDATEWHINDRL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_INSLOCRL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_INSLOCRL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_INSLOCRL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_RTVRLDATA_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_RTVRLDATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_RTVRLDATA_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        /* RL TEMPLATE STARTS */
        case actions.POST_RULESAVETEMPLATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };
        case actions.POST_RULESAVETEMPLATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_RULESAVETEMPLATE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_RLLOCSAVETEMPLATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };
        case actions.POST_RLLOCSAVETEMPLATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_RLLOCSAVETEMPLATE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_RULETEMPLATENAME_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };
        case actions.GET_RULETEMPLATENAME_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_RULETEMPLATENAME_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_RLLOCTEMPLATENAME_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };
        case actions.GET_RLLOCTEMPLATENAME_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_RLLOCTEMPLATENAME_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_FETCHRULETEMPLATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };
        case actions.POST_FETCHRULETEMPLATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_FETCHRULETEMPLATE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_FETCHRLLOCTEMPLATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };
        case actions.POST_FETCHRLLOCTEMPLATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_FETCHRLLOCTEMPLATE_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        /* RL TEMPLATE ENDS */
        default:
            return { ...state };
    }
};

export default RulesLocationReducers;