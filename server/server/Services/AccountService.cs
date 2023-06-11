using AutoMapper;
using server.Dto;
using server.Infrastructure;
using server.Interfaces;
using server.Models;
using System.Reflection.Metadata.Ecma335;

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

            sellerDto.Password = BCrypt.Net.BCrypt.HashPassword(sellerDto.Password);

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

            buyerDto.Password = BCrypt.Net.BCrypt.HashPassword(buyerDto.Password);

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
            admin.Image = administratorDto.Image;

            _dbContext.SaveChanges();

            return _mapper.Map<AdministratorDto>(admin);
        }

        public SellerDto EditSeller(SellerDto sellerDto)
        {
            Seller seller = _dbContext.Sellers.Find(sellerDto.Id);

            if(seller == null)
            {
                return null;
            }

            seller.Password = BCrypt.Net.BCrypt.HashPassword(sellerDto.Password);
            seller.Email = sellerDto.Email;
            seller.FirstAndLastName = sellerDto.FirstAndLastName;
            seller.DateOfBirth = sellerDto.DateOfBirth;
            seller.Address = sellerDto.Address;
            seller.Image = sellerDto.Image;

            _dbContext.SaveChanges();

            return _mapper.Map<SellerDto>(seller);
        }

        public BuyerDto EditBuyer(BuyerDto buyerDto)
        {
            Buyer buyer = _dbContext.Buyers.Find(buyerDto.Id);

            if(buyer == null)
            {
                return null;
            }

            buyer.Password = BCrypt.Net.BCrypt.HashPassword(buyerDto.Password);
            buyer.Email = buyerDto.Email;
            buyer.FirstAndLastName = buyerDto.FirstAndLastName;
            buyer.DateOfBirth = buyerDto.DateOfBirth;
            buyer.Address = buyerDto.Address;
            buyer.Image = buyerDto.Image;

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

            if (_dbContext.Sellers.Any(s => s.Username == username))
            {
                Seller seller = _dbContext.Sellers.Where(s => s.Username == username).FirstOrDefault();

                if(!BCrypt.Net.BCrypt.Verify(password, seller.Password))
                {
                    return null;
                }

                if (seller != null)
                {
                    return _mapper.Map<SellerDto>(seller);
                }
            }

            if (_dbContext.Buyers.Any(b => b.Username == username))
            {
                Buyer buyer = _dbContext.Buyers.Where(b => b.Username == username).FirstOrDefault();

                if (!BCrypt.Net.BCrypt.Verify(password, buyer.Password))
                {
                    return null;
                }

                if (buyer != null)
                {
                    return _mapper.Map<BuyerDto>(buyer);
                }
            }

            return null;
        }
    }
}
