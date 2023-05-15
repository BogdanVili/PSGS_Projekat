namespace server.Dto
{
    public class OrderDto
    {
        public long Id { get; set; }
        public DateTime DeliveryTime { get; set; }
        public BuyerDto BuyerDto { get; set; }
    }
}
