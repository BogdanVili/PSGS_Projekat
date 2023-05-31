import { useEffect, useState } from "react";
import { CanDeleteOrderRequest, DeleteOrderRequest, GetBuyerOrdersRequest } from "../../services/OrderService";

const OrdersBuyer = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    const [orders, setOrders] = useState([]);
    const [deleteButtonsDisabled, setDeleteButtonsDisabled] = useState([]);

    useEffect(() => {
        GetBuyerOrdersRequest(userData.id)
            .then(data => {
                setOrders(data);
                console.log(orders);
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
    }, []);

    const HandleDelete = (order) => {
        DeleteOrderRequest(order.id, userData.id)
            .then(() => {
                GetBuyerOrdersRequest(userData.id)
                .then(data => {
                    setOrders(data);
                    console.log(orders);
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
            <div className="orderBuyerPreview" key={0}>
                <p>Date of Delivery</p>
                <p>Address</p>
                <p>Description</p>
            </div>
            {orders.map((order, index) => {return (
                <div>
                <div className="orderBuyerPreview" key={order.id}>
                    <p>{JSON.stringify(order.deliveryTime)}</p>
                    <p>{order.deliveryAddress}</p>
                    <p>{order.deliveryDescription}</p>
                    <div className="orderProductBuyerPreview" key={0}>
                        <p>Name</p>
                        <p>Price</p>
                        <p>Selected Amount</p>
                        <p>Seller</p>
                    </div>
                    {order.orderProductAmountsDto  && order.orderProductAmountsDto.length > 0 ?
                        order.orderProductAmountsDto.map((orderProductAmount) => {
                            console.log(orderProductAmount);
                            return(
                            <div className='orderProductBuyerPreview' key={orderProductAmount.id}>
                                <p>{orderProductAmount.productDto.name}</p>
                                <p>{orderProductAmount.productDto.price}</p>
                                <p>{orderProductAmount.selectedAmount}</p>
                                <p>{orderProductAmount.productDto.sellerDto.firstAndLastName}</p>
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