namespace server.Models
{
    public class Order
    {
        public long Id { get; set; }
        public DateTime DeliveryTime { get; set; }
        public string DeliveryAddress { get; set; }
        public string DeliveryDescription { get; set; }
        public long BuyerId { get; set; }
        public Buyer Buyer { get; set; }
        public List<Product> Products { get; set; }
    }
}
