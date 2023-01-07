import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from 'react-router-dom';
import '../App.css'
import { selectAuthentication } from "../features/auth/authSlice";

export default function Account () {

    const auth = useSelector(selectAuthentication)

    
    if (!auth) return (
        <Navigate replace to="/welcome" />
    );

    return(
        <div className="page">
        </div>
    )
}