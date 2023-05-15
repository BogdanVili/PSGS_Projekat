namespace server.Models
{
    public class Buyer : User
    {
        public List<Order> Orders { get; set; }
    }
}
