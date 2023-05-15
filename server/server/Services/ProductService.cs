using AutoMapper;
using server.Infrastructure;
using server.Interfaces;

namespace server.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly StorePSGSDbContext _dbContext;

        public ProductService(IMapper mapper, StorePSGSDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }


    }
}
