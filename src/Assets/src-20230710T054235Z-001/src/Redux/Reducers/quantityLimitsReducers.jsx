import * as actions from "../constant";
const initialState = {
    isLoading: false,
    data: [],
    isError: false,
    message: "",
    isSuccess: false,
};

const QuantityLimitsReducers = (state = initialState, action) => {
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

        case actions.GET_QTYLIMITS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_QTYLIMITS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_QTYLIMITS_ERROR:
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

        case actions.GET_UPDATEQTYLIMITS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_UPDATEQTYLIMITS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_UPDATEQTYLIMITS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_OKQTYLIMITSSRN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.GET_OKQTYLIMITSSRN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_OKQTYLIMITSSRN_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };


        default:
            return { ...state };
    }
};

export default QuantityLimitsReducers;