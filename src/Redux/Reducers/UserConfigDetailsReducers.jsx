import * as actions from "../constant";
const initialState = {
    isLoading: false,
    data: [],
    isError: false,
    message: "",
    isSuccess: false,
};

const UserConfigReducers = (state = initialState, action) => {
    switch (action.type) {

        case actions.POST_USRDTLS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.POST_USRDTLS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_USRDTLS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_USRSDATA_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.POST_USRSDATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_USRSDATA_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_USRAUTH_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.POST_USRAUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_USRAUTH_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.POST_USERREGT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };

        case actions.POST_USERREGT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };

        case actions.POST_USERREGT_ERROR:
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

export default UserConfigReducers;