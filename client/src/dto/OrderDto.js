export default class OrderDto{
    constructor(id = null, deliveryTime = null, deliveryAddress = null, deliveryDescription = null, buyerDto = null, orderProductAmountDto = null)
    {
        this.Id = id;
        this.DeliveryTime = deliveryTime;
        this.DeliveryAddress = deliveryAddress;
        this.DeliveryDescription = deliveryDescription;
        this.BuyerDto = buyerDto;
        this.OrderProductAmountDto = orderProductAmountDto;
    }

    AddProduct(orderProductAmountDto) {
        if (!this.OrderProductAmountDto) {
            this.OrderProductAmountDto = [];
        }
        
        this.OrderProductAmountDto.push(orderProductAmountDto);
    }
}