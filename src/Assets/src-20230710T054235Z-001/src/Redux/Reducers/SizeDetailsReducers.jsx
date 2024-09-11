import * as actions from "../constant";
const initialState = {
    isLoading: false,
    data: [],
    isError: false,
    message: "",
    isSuccess: false,
};

const sizeDetailsReducers = (state = initialState, action) => {
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
        case actions.POST_SIZEDETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_SIZEDETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_SIZEDETAILS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_SIZEHEADERDETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_SIZEHEADERDETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_SIZEHEADERDETAILS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_SIZEUPDATEDETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_SIZEUPDATEDETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_SIZEUPDATEDETAILS_ERROR:
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
        default:
            return { ...state };
    }
};

export default sizeDetailsReducers;