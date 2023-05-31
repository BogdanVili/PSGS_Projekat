using server.Dto;
using server.Models;

namespace server.Interfaces
{
    public interface IOrderService
    {
        OrderDto AddOrder(OrderDto orderDto);
        List<OrderDto> GetAdminOrders(long adminId);
        List<OrderDto> GetBuyerOrders(long buyerId);
        List<OrderDto> GetSellerOrders(long sellerId);
        bool DeleteOrder(long orderId, long buyerId);
        bool CanDeleteOrder(long orderId);
        void UpdateProductAmount(Order order, bool subtractingAmount = false, bool addingAmount = false);
    }
}
