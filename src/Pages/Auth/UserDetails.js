import React, { createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postUSRDTLSRequest } from '../../Redux/Action/UserConfigDetails';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({});
    const [load, setLoad] = useState(true);
    const dispatch = useDispatch();
    const UserDtlsData = useSelector(
        (state) => state.UserConfigReducers
    );
    const getCurrentUser = () => {
        if (localStorage.getItem("userData")) {
            return JSON.parse(localStorage.getItem("userData"))?.username;
        } else {
            return "";
        }
    }

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (load && currentUser.length > 0) {
            console.log("UserProvider call : ", currentUser)
            dispatch(postUSRDTLSRequest([{ "USER": currentUser }]));
            setLoad(false);
        }

    }, [load]);


    useEffect(() => {
        if (UserDtlsData?.data?.usrDtls && Array.isArray(UserDtlsData?.data?.usrDtls)) {
            const user_details = (UserDtlsData?.data?.usrDtls)[0]
            setUserDetails();
            let userData = localStorage.getItem("userData");
            if (userData) {
                userData = JSON.parse(userData);
            } else {
                userData = {};
            }
            userData.role_id = user_details.role_id;
            userData.role_name = user_details.role_name;
            localStorage.setItem("userData", JSON.stringify(userData));
        } else if (UserDtlsData?.data?.usrDtls?.status === 500) {
            setUserDetails({});
        }
    }, [UserDtlsData?.data]);
    // console.log("UserProvider", UserDtlsData?.data?.usrDtls, userDetails,localStorage);
    return (
        <>
            <UserContext.Provider value={{ userDetails, setUserDetails }
            }>
                {children}
            </UserContext.Provider >

        </>

    );
};
