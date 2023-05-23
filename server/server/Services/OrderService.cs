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

            UpdateProductAmount(order, subtractingAmount: true);

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

            UpdateProductAmount(order, addingAmount: true);

            _dbContext.SaveChanges();
        }

        public List<OrderDto> GetAdminOrders(long adminId)
        {
            return _mapper.Map<List<OrderDto>>(_dbContext.Orders);
        }

        public List<OrderDto> GetSellerOrders(long sellerId)
        {
            List<Order> orders = _dbContext.Orders.Where(o => o.Products.Any(p => p.SellerId == sellerId)).ToList();
            List<Order> returnOrders = new List<Order>();

            foreach (Order order in orders)
            {
                returnOrders.Add(order);
            }

            foreach (Order order in returnOrders)
            {
                order.Products.RemoveAll(p => p.SellerId != sellerId);
            }

            return _mapper.Map<List<OrderDto>>(returnOrders);
        }

        public List<OrderDto> GetBuyerOrders(long buyerId)
        {
            List<Order> orders = _dbContext.Orders.Where(o => o.BuyerId == buyerId).ToList();

            return _mapper.Map<List<OrderDto>>(orders);
        }

        public void UpdateProductAmount(Order order, bool subtractingAmount = false, bool addingAmount = false)
        {
            if (subtractingAmount)
            {
                foreach (Product productFromOrder in order.Products)
                {
                    Product product = _dbContext.Products.Find(productFromOrder.Id);

                    product.Amount -= productFromOrder.Amount;

                    _dbContext.SaveChanges();
                }
            }

            if (addingAmount)
            {
                foreach (Product productFromOrder in order.Products)
                {
                    Product product = _dbContext.Products.Find(productFromOrder.Id);

                    product.Amount += productFromOrder.Amount;

                    _dbContext.SaveChanges();
                }
            }
        }
    }
}
