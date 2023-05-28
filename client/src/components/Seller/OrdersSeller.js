import OrderDto from '../../dto/OrderDto'
import ProductDto from '../../dto/ProductDto';
import image from "../../test_img/image1.jpg"

const OrdersSeller = () => {
    const products = [];
    products.push(new ProductDto(1, "product1", 10, 10, "description1", image, null));
    products.push(new ProductDto(2, "product2", 10, 10, "description2", image, null));
    const order1 = new OrderDto(1, new Date(1999, 1, 1), "Address 10", "description 1", null, products);
    const order2 = new OrderDto(2, new Date(1998, 1, 1), "Address 20", "description 2", null, null);
    const orders = [];
    orders.push(order1);
    orders.push(order2);

    return ( 
        <div className="ordersSellerShow">
            <div className="orderSellerPreview">
                <p>Date of Delivery</p>
                <p>Address</p>
                <p>Description</p>
            </div>
            {orders.map((order) => {return (
                <div className="orderSellerPreview" key={order.Id}>
                    <p>{JSON.stringify(order.DeliveryTime)}</p>
                    <p>{order.DeliveryAddress}</p>
                    <p>{order.DeliveryDescription}</p>
                    <div className="orderProductSellerPreview">
                        <p>Name</p>
                        <p>Amount</p>
                    </div>
                    {order.ProductsDto  && order.ProductsDto.length > 0 ?
                        order.ProductsDto.map((product) => {
                            console.log(product);
                            return(
                            <div className='orderProductSellerPreview' key={product.Id}>
                                <p>{product.Name}</p>
                                <p>{product.Amount}</p>
                            </div>
                        )}) : null
                    }
                </div>
            )})
            }
        </div>
     );
}
 
export default OrdersSeller;
