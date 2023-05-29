import {FetchDataGet, FetchDataPost} from './FetchData'

export const GetUserAccount = (LoginDto) => 
{
    return FetchDataPost('http://localhost:7168/account/login', LoginDto);
}

export const RegisterSeller = (SellerDto) => 
{
    return FetchDataPost('http://localhost:7168/account/register-seller', SellerDto);
}

export const RegisterBuyer = (BuyerDto) =>
{
    return FetchDataPost('http://localhost:7168/account/register-buyer', BuyerDto);
}

export const EditAdmin = (AdminDto) =>
{
    return FetchDataPost('http://localhost:7168/account/edit-admin', AdminDto);
}

export const EditSeller = (SellerDto) =>
{
    return FetchDataPost('http://localhost:7168/account/edit-seller', SellerDto);
}

export const EditBuyer = (BuyerDto) =>
{
    return FetchDataPost('http://localhost:7168/account/edit-buyer', BuyerDto);
}

export const ApproveSeller = (sellerId, approval) =>
{
    return FetchDataPost(`http://localhost:7168/account/approve-seller/${sellerId}`, approval);
}

export const GetSellers = () => 
{
    return FetchDataGet(`http://localhost:7168/account/get-sellers`);
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
