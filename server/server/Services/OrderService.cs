using AutoMapper;
using server.Infrastructure;
using server.Interfaces;

namespace server.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly StorePSGSDbContext _dbContext;

        public OrderService(IMapper mapper, StorePSGSDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }
    }
}
