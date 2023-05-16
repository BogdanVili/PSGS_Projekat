using AutoMapper;
using server.Dto;
using server.Infrastructure;
using server.Interfaces;
using server.Models;

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

        public OrderDto AddOrder(OrderDto orderDto)
        {
            Order order = _mapper.Map<Order>(orderDto);
            _dbContext.Orders.Add(order);

            foreach (Product productFromOrder in order.Products)
            {
                Product product = _dbContext.Products.Find(productFromOrder.Id);

                product.Amount -= productFromOrder.Amount;

                _dbContext.SaveChanges();
            }

            _dbContext.SaveChanges();

            return _mapper.Map<OrderDto>(order);
        }

        public void DeleteOrder(long id)
        {
            Order order = _dbContext.Orders.Find(id);
            var orderTimeElapsed = DateTime.Now - order.DeliveryTime;
            if (orderTimeElapsed.TotalHours >= 1)
            {
                return;
            }

            _dbContext.Orders.Remove(order);

            foreach (Product productFromOrder in order.Products)
            {
                Product product = _dbContext.Products.Find(productFromOrder.Id);

                product.Amount += productFromOrder.Amount;

                _dbContext.SaveChanges();
            }

            _dbContext.SaveChanges();
        }

        public List<OrderDto> GetBuyerOrders(long buyerId)
        {
            List<Order> orders = _dbContext.Orders.Where(o => o.BuyerId == buyerId).ToList();

            return _mapper.Map<List<OrderDto>>(orders);
        }

        public List<OrderDto> GetSellerOrders(long sellerId)
        {
            List<Order> orders = _dbContext.Orders.Where(o => o.Products.Any(p => p.SellerId == sellerId)).ToList();
            List<Order> returnOrders = new List<Order>();

            foreach(Order order in orders)
            {
                returnOrders.Add(order);
            }

            foreach(Order order in returnOrders)
            {
                order.Products.RemoveAll(p => p.SellerId != sellerId);
            }

            return _mapper.Map<List<OrderDto>>(returnOrders);
        }
    }
}
