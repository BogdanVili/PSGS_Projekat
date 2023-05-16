using AutoMapper;
using server.Dto;
using server.Infrastructure;
using server.Interfaces;
using server.Models;

namespace server.Services
{


    public class AccountService : IAccountService
    {
        private readonly IMapper _mapper;
        private readonly StorePSGSDbContext _dbContext;

        public AccountService(IMapper mapper, StorePSGSDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public SellerDto AddSeller(SellerDto sellerDto)
        {
            if (_dbContext.Sellers.Any(s => s.Username == sellerDto.Username))
            {
                return null;
            }

            Seller seller = _mapper.Map<Seller>(sellerDto);
            _dbContext.Sellers.Add(seller);
            _dbContext.SaveChanges();

            return _mapper.Map<SellerDto>(seller);
        }

        public BuyerDto AddBuyer(BuyerDto buyerDto)
        {
            if(_dbContext.Buyers.Any(b => b.Username == buyerDto.Username))
            {
                return null;
            }

            Buyer buyer = _mapper.Map<Buyer>(buyerDto);
            _dbContext.Buyers.Add(buyer);
            _dbContext.SaveChanges();

            return _mapper.Map<BuyerDto>(buyer);
        }

        public AdministratorDto EditAdmin(AdministratorDto administratorDto)
        {
            Administrator admin = _dbContext.Administrators.Find(administratorDto.Id);
            admin.Password = administratorDto.Password;
            admin.Email = administratorDto.Email;
            admin.FirstAndLastName = administratorDto.FirstAndLastName;
            admin.DateOfBirth = administratorDto.DateOfBirth;
            admin.Address = administratorDto.Address;

            _dbContext.SaveChanges();

            return _mapper.Map<AdministratorDto>(admin);
        }

        public SellerDto EditSeller(SellerDto sellerDto)
        {
            Seller seller = _dbContext.Sellers.Find(sellerDto.Id);
            seller.Password = sellerDto.Password;
            seller.Email = sellerDto.Email;
            seller.FirstAndLastName = sellerDto.FirstAndLastName;
            seller.DateOfBirth = sellerDto.DateOfBirth;
            seller.Address = sellerDto.Address;

            _dbContext.SaveChanges();

            return _mapper.Map<SellerDto>(seller);
        }

        public BuyerDto EditBuyer(BuyerDto buyerDto)
        {
            Buyer buyer = _dbContext.Buyers.Find(buyerDto.Id);
            buyer.Password = buyerDto.Password;
            buyer.Email = buyerDto.Email;
            buyer.FirstAndLastName = buyerDto.FirstAndLastName;
            buyer.DateOfBirth = buyerDto.DateOfBirth;
            buyer.Address = buyerDto.Address;

            _dbContext.SaveChanges();

            return _mapper.Map<BuyerDto>(buyer);
        }

        public List<SellerDto> GetSellers()
        {
            return _mapper.Map<List<SellerDto>>(_dbContext.Sellers);
        }

        public SellerDto ApproveSeller(long sellerId, bool approval)
        {
            Seller seller = _dbContext.Sellers.Find(sellerId);
            seller.Approval = approval;

            _dbContext.SaveChanges();

            return _mapper.Map<SellerDto>(seller);
        }

        public object GetUser(string username, string password)
        {
            if (_dbContext.Administrators.Any(a => a.Username == username && a.Password == password))
            {
                Administrator admin = _dbContext.Administrators.Where(a => a.Username == username).FirstOrDefault();

                if (admin != null)
                {
                    return _mapper.Map<AdministratorDto>(admin);
                }
            }

            if (_dbContext.Sellers.Any(s => s.Username == username && s.Password == password))
            {
                Seller seller = _dbContext.Sellers.Where(s => s.Username == username).FirstOrDefault();

                if (seller != null)
                {
                    return _mapper.Map<SellerDto>(seller);
                }
            }

            if (_dbContext.Buyers.Any(b => b.Username == username && b.Password == password))
            {
                Buyer buyer = _dbContext.Buyers.Where(b => b.Username == username).FirstOrDefault();

                if (buyer != null)
                {
                    return _mapper.Map<BuyerDto>(buyer);
                }
            }

            return null;
        }


    }
}
