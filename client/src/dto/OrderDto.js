export default class OrderDto{
    constructor(id = null, deliveryTime = null, orderTime = null, deliveryAddress = null, deliveryDescription = null, buyerDto = null, orderProductAmountsDto = null)
    {
        this.Id = id;
        this.DeliveryTime = deliveryTime;
        this.OrderTime = orderTime;
        this.DeliveryAddress = deliveryAddress;
        this.DeliveryDescription = deliveryDescription;
        this.BuyerDto = buyerDto;
        this.OrderProductAmountsDto = orderProductAmountsDto;
    }

    AddProduct(orderProductAmountDto) {
        if (!this.OrderProductAmountDto) {
            this.OrderProductAmountDto = [];
        }
        
        this.OrderProductAmountDto.push(orderProductAmountDto);
    }
}