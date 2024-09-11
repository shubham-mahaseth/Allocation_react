import * as actions from "../constant";
const initialState = {
    isLoading: false,
    data: [],
    isError: false,
    message: "",
    isSuccess: false,
};

const AllocationSummaryReducers = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_AllTRSTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.GET_AllTRSTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.GET_AllTRSTS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };


        case actions.POST_ALLOCIDS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_ALLOCIDS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_ALLOCIDS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_SWITCHASY_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_SWITCHASY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };


        case actions.POST_SWITCHASY_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_SEARCHASY_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_SEARCHASY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_SEARCHASY_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };


        case actions.POST_COPYASY_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };


        case actions.POST_COPYASY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_COPYASY_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };


        case actions.POST_VALIDASY_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };


        case actions.POST_VALIDASY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_VALIDASY_ERROR:
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

export default AllocationSummaryReducers;