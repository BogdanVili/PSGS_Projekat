import {useEffect, useState} from 'react';
import OrderDto from '../../dto/OrderDto';
import { useNavigate } from 'react-router-dom';
import { AddOrderRequest } from '../../services/OrderService';

const Cart = () => {
    const navigate = useNavigate();
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryDescription, setDeliveryDescription] = useState('');

    const [orderProductAmounts, setOrderProductAmounts] = useState([]);

    useEffect(() => {
        const orderProductAmountsString = localStorage.getItem('cartOPAs');
        
        if(orderProductAmountsString)
        {
            setOrderProductAmounts(JSON.parse(orderProductAmountsString));
        }
      }, []);

    const OrderClick = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));

        const orderDto = new OrderDto(0, new Date(), new Date(), deliveryAddress, deliveryDescription, userData, orderProductAmounts);
        
        AddOrderRequest(orderDto)            
            .then(data => {
                localStorage.removeItem('cartOPAs');
                navigate('/orders-buyer');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const deleteProductClick = (productId) => {
        const updatedOrderProductAmountList = orderProductAmounts.filter(({ ProductDto }) => ProductDto.Id !== productId);
        setOrderProductAmounts(updatedOrderProductAmountList);
        localStorage.setItem('cartOPAs', updatedOrderProductAmountList);
    }

    
    if(orderProductAmounts.length === 0)
    {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <h1>Cart is empty</h1>
            </div>
          );
    }

    return ( 
        <div className="productsCartShow">
            <div className="productCartPreview">
                <p>Name</p>
                <p>Price</p>
                <p>Selected Amount</p>
                <p>Description</p>
                <p>Image</p>
                <p></p>
            </div>
            {orderProductAmounts.map((orderProductAmount) => (
                <div className="productCartPreview" key={orderProductAmount.ProductDto.Id}>
                    <h2>{orderProductAmount.ProductDto.Name}</h2>
                    <p>{orderProductAmount.ProductDto.Price}</p>
                    <p>{orderProductAmount.SelectedAmount}</p>
                    <p>{orderProductAmount.ProductDto.Description}</p>
                    <img src={orderProductAmount.ProductDto.Image} alt='img' height={100} width={100}></img>
                    <button onClick={() => deleteProductClick(orderProductAmount.ProductDto.Id)}>Delete</button>
                </div>
            ))}  
            <div className='productCartPreview'>
            <p>Address</p>
            <input required type='text' value={deliveryAddress} onChange={(event) => setDeliveryAddress(event.target.value)}/>
            </div>
            
            <div className='productCartPreview'>
            <p>Comment</p>
            <input required type='text' value={deliveryDescription} onChange={(event) => setDeliveryDescription(event.target.value)}/>
            </div>
            

            <button className='orderButton' onClick={OrderClick}>Order</button>
        </div>
     );
}
 
export default Cart;