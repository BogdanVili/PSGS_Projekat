import OrderDto from '../../dto/OrderDto'
import ProductDto from '../../dto/ProductDto';
import { GetSellerOrdersRequest } from '../../services/OrderService';
import { useState, useEffect } from 'react';
import moment from 'moment-timezone';

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

            {orders.map((order) => {return (
                <div>
                <div className="orderSellerPreview" key={0}>
                    <p>Date of Delivery</p>
                    <p>Address</p>
                    <p>Description</p>
                    <p>Buyer</p>
                </div>
                <div className="orderSellerPreview" key={order.id}>
                    <p>{moment(order.deliveryTime).utcOffset('+0400').format('hh:mm DD-MM-YYYY')}</p>
                    <p>{order.deliveryAddress}</p>
                    <p>{order.deliveryDescription}</p>
                    <p>{order.buyerDto.firstAndLastName}</p>
                    <div className="orderProductSellerPreview" key={0}>
                        <p>Name</p>
                        <p>Total Price</p>
                        <p>Selected Amount</p>
                        <p>Image</p>
                    </div>
                    {order.orderProductAmountsDto  && order.orderProductAmountsDto.length > 0 ?
                        order.orderProductAmountsDto.map((orderProductAmount) => {
                            return(
                            <div className='orderProductSellerPreview' key={orderProductAmount.id}>
                                <p>{orderProductAmount.productDto.name}</p>
                                <p>{orderProductAmount.productDto.price * orderProductAmount.selectedAmount}</p>
                                <p>{orderProductAmount.selectedAmount}</p>
                                <img src={orderProductAmount.productDto.image} alt='img' height={100} width={100}></img>
                            </div>
                        )}) : null
                    }
                </div>
                </div>
            )})
            }
        </div>
     );
}
 
export default OrdersSeller;
