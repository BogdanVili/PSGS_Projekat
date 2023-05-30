import { useEffect, useState } from "react";
import { GetAdminOrdersRequest } from "../../services/OrderService";

const OrdersAdmin = () => {
    const [orders, setOrders] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
        GetAdminOrdersRequest(userData.id)
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return ( 
        <div className="ordersAdminShow">
            <div className="orderAdminPreview" key={0}>
                <p>Date of Delivery</p>
                <p>Address</p>
                <p>Description</p>
            </div>
            {orders.map((order) => {return (
                <div className="orderAdminPreview" key={order.id}>
                    <p>{JSON.stringify(order.deliveryTime)}</p>
                    <p>{order.deliveryAddress}</p>
                    <p>{order.deliveryDescription}</p>
                    <div className="orderProductAdminPreview" key={0}>
                        <p>Name</p>
                        <p>Price</p>
                        <p>Selected Amount</p>
                        <p>Seller</p>
                    </div>
                    {order.orderProductAmountsDto  && order.orderProductAmountsDto.length > 0 ?
                        order.orderProductAmountsDto.map((orderProductAmount) => {
                            console.log(orderProductAmount);
                            return(
                            <div className='orderProductAdminPreview' key={orderProductAmount.id}>
                                <p>{orderProductAmount.productDto.name}</p>
                                <p>{orderProductAmount.productDto.price}</p>
                                <p>{orderProductAmount.selectedAmount}</p>
                                <p>{orderProductAmount.productDto.sellerDto.firstAndLastName}</p>
                            </div>
                        )}) : null
                    }
                </div>
            )})
            }
        </div>
     );
}
 
export default OrdersAdmin;