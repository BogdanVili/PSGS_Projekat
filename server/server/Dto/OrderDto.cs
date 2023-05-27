namespace server.Dto
{
    public class OrderDto
    {
        public long Id { get; set; }
        public DateTime DeliveryTime { get; set; }
        public string DeliveryAddress { get; set; }
        public string DeliveryDescription { get; set; }
        public BuyerDto BuyerDto { get; set; }
        public List<ProductDto> ProductsDto { get; set; }
    }
}
