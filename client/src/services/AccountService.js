import {FetchDataPost} from './FetchData'
import SellerDto from '../dto/SellerDto'
import BuyerDto from '../dto/BuyerDto'


export const GetUserAccount = (LoginDto) => 
{
    return FetchDataPost(`http://localhost:7168/account/login`, LoginDto);
}

export const RegisterSeller = (SellerDto) => 
{
    return FetchDataPost('http://localhost:7168/account/registerSeller', SellerDto);
}

export const RegisterBuyer = (BuyerDto) =>
{
    return FetchDataPost('http://localhost:7168/account/registerBuyer', BuyerDto);
}

export const EditAdmin = (AdminDto) =>
{
    return FetchDataPost('http://localhost:7168/account/editAdmin', AdminDto);
}

export const EditSeller = (SellerDto) =>
{
    return FetchDataPost('http://localhost:7168/account/editSeller', SellerDto);
}

export const EditBuyer = (BuyerDto) =>
{
    return FetchDataPost('http://localhost:7168/account/editBuyer', BuyerDto);
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
            return 0;
        case "SELLER":
            return 1;
        case "BUYER":
            return 2;
    }
}

export const GetUserTypeFromNumber = (typeNumber) => {
    switch(typeNumber){
        case 0:
            return "ADMIN";
        case 1:
            return "SELLER";
        case 2:
            return "BUYER";
    }
}

export const UserTypeIsSame = (typeInputString) => {
    if(localStorage.getItem('userType') === null)
    {
        return false;
    }
    
    const typeInput = GetUserType(typeInputString);
    const typeLocalStorage = JSON.parse(localStorage.getItem('userType'));
    
    if(typeInput === typeLocalStorage)
    {
        return true;
    }
    else
    {
        return false;
    }
}
