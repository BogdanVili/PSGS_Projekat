import OrderDto from '../../dto/OrderDto'
import ProductDto from '../../dto/ProductDto';
import { GetSellerOrdersRequest } from '../../services/OrderService';
import { useState, useEffect } from 'react';

const OrdersSeller = () => {
    const [orders, setOrders] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
        GetSellerOrdersRequest(userData.id)
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    

    return ( 
        <div className="ordersSellerShow">
            <div className="orderSellerPreview" key={0}>
                <p>Date of Delivery</p>
                <p>Address</p>
                <p>Description</p>
            </div>
            {orders.map((order) => {return (
                <div className="orderSellerPreview" key={order.id}>
                    <p>{JSON.stringify(order.deliveryTime)}</p>
                    <p>{order.deliveryAddress}</p>
                    <p>{order.deliveryDescription}</p>
                    <div className="orderProductSellerPreview" key={0}>
                        <p>Name</p>
                        <p>Price</p>
                        <p>Selected Amount</p>
                    </div>
                    {order.orderProductAmountsDto  && order.orderProductAmountsDto.length > 0 ?
                        order.orderProductAmountsDto.map((orderProductAmount) => {
                            console.log(orderProductAmount);
                            return(
                            <div className='orderProductSellerPreview' key={orderProductAmount.id}>
                                <p>{orderProductAmount.productDto.name}</p>
                                <p>{orderProductAmount.productDto.price}</p>
                                <p>{orderProductAmount.selectedAmount}</p>
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
