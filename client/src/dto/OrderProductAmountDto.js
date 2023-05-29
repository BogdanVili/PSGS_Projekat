export default class OrderProductAmountDto{
    constructor(productDto = null, selectedAmount = null)
    {
        this.ProductDto = productDto;
        this.SelectedAmount = selectedAmount;
    }
}