export default class OrderDto{
    constructor(id = null, deliveryTime = null, deliveryAddress = null, deliveryDescription = null, buyerDto = null, productsDto = null)
    {
        this.Id = id;
        this.DeliveryTime = deliveryTime;
        this.DeliveryAddress = deliveryAddress;
        this.DeliveryDescription = deliveryDescription;
        this.BuyerDto = buyerDto;
        this.ProductsDto = productsDto;
    }

    AddProduct(productDto) {
        if (!this.ProductsDto) {
            this.ProductsDto = [];
        }
        
        this.ProductsDto.push(productDto);
    }
}