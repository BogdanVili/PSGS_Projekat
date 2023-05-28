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

            foreach(OrderProductAmountDto orderProductAmountDto in orderDto.OrderProductAmountsDto)
            {
                _dbContext.OrderProductAmounts.Add(_mapper.Map<OrderProductAmount>(orderProductAmountDto));
            }

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
            return _mapper.Map<List<OrderDto>>(_dbContext.Orders.Include(o => o.Buyer).Include(o => o.OrderProductAmounts));
        }

        public List<OrderDto> GetSellerOrders(long sellerId)
        {
            List<Product> sellerProducts = _dbContext.Products.Where(p => p.SellerId ==  sellerId).ToList();
            List<OrderProductAmount> orderProductAmounts = new List<OrderProductAmount>();

            foreach(Product product in sellerProducts)
            {
                orderProductAmounts.Add(_dbContext.OrderProductAmounts.Where(opa => opa.ProductId == product.Id) as OrderProductAmount);
            }

            List<long> orderIds = orderProductAmounts.Select(opa => opa.OrderId).Distinct().ToList();

            List<Order> returnOrders = _dbContext.Orders.Where(o => orderIds.Contains(o.Id)).ToList();

            List<OrderDto> returnOrdersDto = _mapper.Map<List<OrderDto>>(returnOrders);

            foreach(OrderProductAmount orderProductAmount in orderProductAmounts)
            {
                returnOrdersDto.Find(rodto => rodto.Id == orderProductAmount.OrderId).OrderProductAmountsDto.Add(_mapper.Map<OrderProductAmountDto>(orderProductAmount));
            }

            return returnOrdersDto;
        }

        public List<OrderDto> GetBuyerOrders(long buyerId)
        {
            List<Order> orders = _dbContext.Orders.Include(o => o.Buyer).Include(o => o.OrderProductAmounts).Where(o => o.BuyerId == buyerId).ToList();

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
