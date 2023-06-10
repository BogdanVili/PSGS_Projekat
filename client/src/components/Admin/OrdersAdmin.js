import { useEffect, useState } from "react";
import { GetAdminOrdersRequest } from "../../services/OrderService";
import Moment from 'moment';

const OrdersAdmin = () => {
    const [orders, setOrders] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
        GetAdminOrdersRequest(userData.id)
            .then(data => {
                setOrders(data);
                console.log(orders);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return ( 
        <div className="ordersAdminShow">

            {orders.map((order) => {return (
                <div>
                <div className="orderAdminPreview" key={0}>
                    <p>Date of Delivery</p>
                    <p>Address</p>
                    <p>Description</p>
                    <p>Buyer</p>
                </div>
                <div className="orderAdminPreview" key={order.id}>
                    <p>{Moment(order.deliveryTime).format('hh:mm DD-MM-YYYY') }</p>
                    <p>{order.deliveryAddress}</p>
                    <p>{order.deliveryDescription}</p>
                    <p>{order.buyerDto.firstAndLastName}</p>
                    <div className="orderProductAdminPreview" key={0}>
                        <p>Name</p>
                        <p>Total Price</p>
                        <p>Selected Amount</p>
                        <p>Seller</p>
                        <p>Image</p>
                    </div>
                    {order.orderProductAmountsDto  && order.orderProductAmountsDto.length > 0 ?
                        order.orderProductAmountsDto.map((orderProductAmount) => {
                            console.log(orderProductAmount);
                            return(
                            <div className='orderProductAdminPreview' key={orderProductAmount.id}>
                                <p>{orderProductAmount.productDto.name}</p>
                                <p>{orderProductAmount.productDto.price * orderProductAmount.selectedAmount}</p>
                                <p>{orderProductAmount.selectedAmount}</p>
                                <p>{orderProductAmount.productDto.sellerDto.firstAndLastName}</p>
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
 
export default OrdersAdmin;