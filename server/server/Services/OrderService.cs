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

            _dbContext.Orders.Attach(order);

            _dbContext.SaveChanges();

            UpdateProductAmount(order, subtractingAmount: true);

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

            _dbContext.SaveChanges();

            UpdateProductAmount(order, addingAmount: true);
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
