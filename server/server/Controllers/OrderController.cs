using Microsoft.AspNetCore.Mvc;
using server.Dto;
using server.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("order")]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("add-order")]
        public IActionResult AddOrder([FromBody]OrderDto orderDto)
        {
            return Ok(_orderService.AddOrder(orderDto));
        }

        [HttpPost("delete-order/{id}")]
        public IActionResult DeleteOrder(long id)
        {
            _orderService.DeleteOrder(id);
            return Ok();
        }

        [HttpPost("get-admin-orders")]
        public IActionResult GetAdminOrders([FromBody]long adminId)
        {
            return Ok(_orderService.GetAdminOrders(adminId));
        }

        [HttpPost("get-seller-orders")]
        public IActionResult GetSellerOrders([FromBody]long sellerId)
        {
            return Ok(_orderService.GetSellerOrders(sellerId));
        }

        [HttpPost("get-buyer-orders")]
        public IActionResult GetBuyerOrders([FromBody]long buyerId)
        {
            return Ok(_orderService.GetBuyerOrders(buyerId));
        }
    }
}
