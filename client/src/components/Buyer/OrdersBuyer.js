import { useEffect, useState } from "react";
import { CanDeleteOrderRequest, DeleteOrderRequest, GetBuyerOrdersRequest } from "../../services/OrderService";
import moment from 'moment-timezone';

const OrdersBuyer = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    const [orders, setOrders] = useState([]);
    const [deleteButtonsDisabled, setDeleteButtonsDisabled] = useState([]);

    useEffect(() => {
        GetBuyerOrdersRequest(userData.id)
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const updatedDeleteButtonsDisabled = await Promise.all(
                orders.map(async (order) => {
                  try {
                    const data = await CanDeleteOrderRequest(order.id);
                    return !data;
                  } catch (error) {
                    console.error('Error:', error);
                  }
                })
              );
        
              setDeleteButtonsDisabled(updatedDeleteButtonsDisabled);
            } catch (error) {
              console.error('Error:', error);
            }
          };
        
          fetchData();
    }, [orders]);

    const HandleDelete = (order) => {
        DeleteOrderRequest(order.id, userData.id)
            .then(() => {
                GetBuyerOrdersRequest(userData.id)
                .then(data => {
                    setOrders(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return ( 
        <div className="ordersBuyerShow">
            {orders.map((order, index) => {return (
                <div>
                <div className="orderBuyerPreview" key={0}>
                    <p>Date of Delivery</p>
                    <p>Address</p>
                    <p>Description</p>
                </div>
                <div className="orderBuyerPreview" key={order.id}>
                    <p>{moment(order.deliveryTime).utcOffset('+0400').format('hh:mm DD-MM-YYYY')}</p>
                    <p>{order.deliveryAddress}</p>
                    <p>{order.deliveryDescription}</p>
                    <div className="orderProductBuyerPreview" key={0}>
                        <p>Name</p>
                        <p>Total Price</p>
                        <p>Selected Amount</p>
                        <p>Seller</p>
                        <p>Image</p>
                    </div>
                    {order.orderProductAmountsDto  && order.orderProductAmountsDto.length > 0 ?
                        order.orderProductAmountsDto.map((orderProductAmount) => {
                            return(
                            <div className='orderProductBuyerPreview' key={orderProductAmount.id}>
                                <p>{orderProductAmount.productDto.name}</p>
                                <p>{orderProductAmount.productDto.price * orderProductAmount.selectedAmount}</p>
                                <p>{orderProductAmount.selectedAmount}</p>
                                <p>{orderProductAmount.productDto.sellerDto.firstAndLastName}</p>
                                <img src={orderProductAmount.productDto.image} alt='img' height={100} width={100}></img>
                            </div>
                        )}) : null
                    }
                </div>
                <div className="orderBuyerPreviewButton">
                    <button onClick={() => HandleDelete(order)} disabled={deleteButtonsDisabled[index]}>Cancel</button>
                </div>  
                </div>
            )}) 
            }

        </div>
     );
}
 
export default OrdersBuyer;