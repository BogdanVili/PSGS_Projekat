using AutoMapper;
using server.Dto;
using server.Models;

namespace server.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<Administrator, AdministratorDto>();
            CreateMap<Seller, SellerDto>();
            CreateMap<Buyer, BuyerDto>();
            CreateMap<Product, ProductDto>();
            CreateMap<Order, OrderDto>();
        }
    }
}
