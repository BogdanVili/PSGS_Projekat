namespace server.Dto
{
    public class OrderProductAmountDto
    {
        public OrderDto OrderDto { get; set; }
        public ProductDto ProductDto { get; set; }
        public int SelectedAmount { get; set; }
    }
}
