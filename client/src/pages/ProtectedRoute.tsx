import React from 'react';
import {useAppContext} from "../context/appContext";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}: {children: JSX.Element}) => {
    const {user} = useAppContext();
    if (!user) {
        return <Navigate to={"/register"}/>
    } return children
};

export default ProtectedRoute;