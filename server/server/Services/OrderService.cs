using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using server.Infrastructure;
using server.Interfaces;
using server.Models;
using System.Linq;

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

            foreach(OrderProductAmount opa in order.OrderProductAmounts)
            {
                opa.Product.Seller = _dbContext.Sellers.Find(opa.Product.Seller.Id);
            }

            Random random = new Random();
            int randomMinutes = random.Next(0, 60);
            int randomSeconds = random.Next(0, 60);

            order.DeliveryTime = DateTime.UtcNow.Add(new TimeSpan(1, randomMinutes, randomSeconds));

            _dbContext.Orders.Attach(order);

            _dbContext.SaveChanges();

            UpdateProductAmount(order, subtractingAmount: true);

            return _mapper.Map<OrderDto>(order);
        }

        public List<OrderDto> GetAdminOrders(long adminId)
        {
            return _mapper.Map<List<OrderDto>>(_dbContext.Orders.Include(o => o.Buyer)
                                                                .Include(o => o.OrderProductAmounts)
                                                                    .ThenInclude(opa => opa.Product)
                                                                    .ThenInclude(p => p.Seller)
                                                                .ToList());
        }

        public List<OrderDto> GetSellerOrders(long sellerId)
        {
            List<OrderDto> ordersDto = _mapper.Map<List<OrderDto>>(_dbContext.Orders.Include(o => o.Buyer)
                                                                .Include(o => o.OrderProductAmounts)
                                                                    .ThenInclude(opa => opa.Product)
                                                                    .ThenInclude(p => p.Seller)
                                                                .Where(o => o.OrderProductAmounts.Any(opa => opa.Product.Seller.Id == sellerId))
                                                                .ToList());

            List<OrderProductAmountDto> opasToRemove = new List<OrderProductAmountDto>();

            foreach (OrderDto orderDto in ordersDto)
            {
                foreach(OrderProductAmountDto orderProductAmountDto in orderDto.OrderProductAmountsDto)
                {
                    if(orderProductAmountDto.ProductDto.SellerDto.Id != sellerId)
                    {
                        opasToRemove.Add(orderProductAmountDto);
                    }
                }

                foreach(OrderProductAmountDto orderProductAmountDtoToRemove in opasToRemove)
                {
                    orderDto.OrderProductAmountsDto.Remove(orderProductAmountDtoToRemove);
                }

                opasToRemove.Clear();
            }

            return ordersDto;
        }

        public List<OrderDto> GetBuyerOrders(long buyerId)
        {
            List<Order> orders = _dbContext.Orders.Include(o => o.Buyer)
                                                  .Include(o => o.OrderProductAmounts)
                                                    .ThenInclude(opa => opa.Product)
                                                    .ThenInclude(p => p.Seller)
                                                  .Where(o => o.BuyerId == buyerId).ToList();

            return _mapper.Map<List<OrderDto>>(orders);
        }

        public bool DeleteOrder(long orderId, long buyerId)
        {
            if(!CanDeleteOrder(orderId))
            {
                return false;
            }

            try
            {
                Order order = _dbContext.Orders.Include(o => o.OrderProductAmounts).FirstOrDefault(o => o.Id == orderId);

                foreach(OrderProductAmount orderProductAmount in order.OrderProductAmounts)
                {
                    _dbContext.OrderProductAmounts.Remove(orderProductAmount);
                }

                _dbContext.SaveChanges();

                _dbContext.Orders.Remove(order);

                _dbContext.SaveChanges();

                UpdateProductAmount(order, addingAmount: true);

                return true;
            }
            catch
            {
                return false;
            }

        }

        public bool CanDeleteOrder(long orderId)
        {
            Order order = _dbContext.Orders.Include(o => o.OrderProductAmounts).FirstOrDefault(o => o.Id == orderId);

            if(order == null)
            {
                return false;
            }

            var orderTimeElapsed = DateTime.UtcNow - order.OrderTime;

            if (orderTimeElapsed.TotalHours >= 1)
            {
                return false;
            }

            return true;
        }

        public void UpdateProductAmount(Order order, bool subtractingAmount = false, bool addingAmount = false)
        {
            if (subtractingAmount)
            {
                foreach(OrderProductAmount orderProductAmount in order.OrderProductAmounts)
                {
                    Product product = _dbContext.Products.Find(orderProductAmount.Product.Id);

                    product.Amount -= orderProductAmount.SelectedAmount;
                }
            }

            if (addingAmount)
            {
                foreach (OrderProductAmount orderProductAmount in order.OrderProductAmounts)
                {
                    Product product = _dbContext.Products.Find(orderProductAmount.Product.Id);

                    product.Amount += orderProductAmount.SelectedAmount;
                }
            }

            _dbContext.SaveChanges();
        }
    }
}
