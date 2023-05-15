namespace server.Models
{
    public class Product
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public long SellerId { get; set; }
        public Seller Seller { get; set; }
        public List<Order> Orders { get; set; }
    }
}
