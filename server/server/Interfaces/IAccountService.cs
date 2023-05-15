﻿using server.Dto;
using server.Models;

namespace server.Interfaces
{
    public interface IAccountService
    {
        BuyerDto AddBuyer(BuyerDto buyerDto);
        SellerDto AddSeller(SellerDto sellerDto);
        AdministratorDto EditAdmin(AdministratorDto administratorDto);
        BuyerDto EditBuyer(BuyerDto buyerDto);
        SellerDto EditSeller(SellerDto sellerDto);
        object GetUser(string username, string password);
    }
}