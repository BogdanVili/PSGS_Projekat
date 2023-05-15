namespace server.Models
{
    public class Seller : User
    {
        public bool? Approval { get; set; }
        public List<Product> Products { get; set; }
        public List<Order> Orders { get; set; }
    }
}
