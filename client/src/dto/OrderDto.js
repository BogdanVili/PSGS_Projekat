export default class OrderDto{
    constructor(id, deliveryTime, buyerDto)
    {
        this.Id = id;
        this.DeliveryTime = deliveryTime;
        this.BuyerDto = buyerDto;
    }
}