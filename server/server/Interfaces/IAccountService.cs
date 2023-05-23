using server.Dto;
using server.Models;

namespace server.Interfaces
{
    public interface IAccountService
    {
        BuyerDto AddBuyer(BuyerDto buyerDto);
        SellerDto AddSeller(SellerDto sellerDto);
        AdministratorDto EditAdmin(AdministratorDto administratorDto);
        SellerDto EditSeller(SellerDto sellerDto);
        BuyerDto EditBuyer(BuyerDto buyerDto);

        object GetUser(string username, string password);
    }
}
