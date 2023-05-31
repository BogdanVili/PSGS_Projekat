namespace server.Models
{
    public class Order
    {
        public long Id { get; set; }
        public DateTime DeliveryTime { get; set; }
        public DateTime OrderTime { get; set; }
        public string DeliveryAddress { get; set; }
        public string DeliveryDescription { get; set; }
        public long BuyerId { get; set; }
        public Buyer Buyer { get; set; }
        public List<OrderProductAmount> OrderProductAmounts { get; set; }
    }
}
