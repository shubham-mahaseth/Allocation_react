import * as actions from "../constant";
const initialState = {
    isLoading: false,
    data: [],
    isError: false,
    message: "",
    isSuccess: false,
};

const AllocDPkReducers = (state = initialState, action) => {
    switch (action.type) {
        case actions.POST_RTVADPACK_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_RTVADPACK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_RTVADPACK_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_ADVALIDN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_ADVALIDN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_ADVALIDN_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_G1ADPK_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_G1ADPK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_G1ADPK_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_G2ADPK_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_G2ADPK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_G2ADPK_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_UPDATEADPK_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_UPDATEADPK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_UPDATEADPK_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_RESTOREADPK_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };

        case actions.POST_RESTOREADPK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_RESTOREADPK_ERROR:
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

export default AllocDPkReducers;