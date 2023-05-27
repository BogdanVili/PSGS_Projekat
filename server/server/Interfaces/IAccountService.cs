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
        public SellerDto ApproveSeller(long sellerId, bool approval);
        public List<SellerDto> GetSellers();

        object GetUser(string username, string password);
    }
}
