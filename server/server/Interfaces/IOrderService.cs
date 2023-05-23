using server.Dto;
using server.Models;

namespace server.Interfaces
{
    public interface IOrderService
    {
        OrderDto AddOrder(OrderDto orderDto);
        void DeleteOrder(long id);
        List<OrderDto> GetAdminOrders(long adminId);
        List<OrderDto> GetBuyerOrders(long buyerId);
        List<OrderDto> GetSellerOrders(long sellerId);
        void UpdateProductAmount(Order order, bool subtractingAmount = false, bool addingAmount = false);
    }
}
