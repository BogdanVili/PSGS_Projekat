namespace server.Models
{
    public class OrderProductAmount
    {
        public long OrderId { get; set; }
        public Order Order { get; set; }
        public long ProductId { get; set; }
        public Product Product { get; set; }
        public int SelectedAmount { get; set; }
    }
}
