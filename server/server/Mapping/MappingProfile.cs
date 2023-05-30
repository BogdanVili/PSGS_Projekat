using AutoMapper;
using server.Dto;
using server.Models;

namespace server.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<Administrator, AdministratorDto>().ReverseMap();
            CreateMap<Seller, SellerDto>().ReverseMap();
            CreateMap<Buyer, BuyerDto>().ReverseMap();
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.SellerDto, act => act.MapFrom(src => src.Seller))
                .ReverseMap();
            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.BuyerDto, act => act.MapFrom(src => src.Buyer))
                .ForMember(dest => dest.OrderProductAmountsDto, act => act.MapFrom(src => src.OrderProductAmounts))
                .ReverseMap();
            CreateMap<OrderProductAmount, OrderProductAmountDto>()
                .ForMember(dest => dest.ProductDto, act => act.MapFrom(src => src.Product))
                .ReverseMap();
            
        }
    }
}
