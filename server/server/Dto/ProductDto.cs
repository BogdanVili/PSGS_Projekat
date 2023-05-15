namespace server.Dto
{
    public class ProductDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public SellerDto SellerDto { get; set; }
    }
}
