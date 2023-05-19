export default class ProductDto{
    constructor(id, name, price, amount, description, image, sellerDto)
    {
        this.Id = id;
        this.Name = name;
        this.Price = price;
        this.Amount = amount;
        this.Description = description;
        this.Image = image;
        this.SellerDto = sellerDto;
    }
}