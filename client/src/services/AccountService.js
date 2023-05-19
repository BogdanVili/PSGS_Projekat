import {FetchDataPost, FetchDataGet} from './FetchData'
import { createContext, useContext, useState } from 'react';

export const GetUserAccount = (LoginDto) => 
{
    return FetchDataPost(`http://localhost:7168/account/login`, LoginDto);
}

export const LoggedIn = () =>
{
    if(JSON.parse(localStorage.getItem("userData")) !== null)
    {
        return true;
    }
    else
    {
        return false;
    }
}

export const GetUserType = (type) => {
    switch(type){
        case "ADMIN":
            return "0";
        case "SELLER":
            return "1";
        case "BUYER":
            return "2";
    }
}
