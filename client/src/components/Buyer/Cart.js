import {useEffect, useState} from 'react';
import OrderDto from '../../dto/OrderDto';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryDescription, setDeliveryDescription] = useState('');

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsString = localStorage.getItem('cartProducts');
        
        if(productsString)
        {
            setProducts(JSON.parse(productsString));
        }
      }, []);

    const OrderClick = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const orderDto = new OrderDto(null, null, deliveryAddress, deliveryDescription, userData, products);
        localStorage.removeItem('currentOrder');
        localStorage.removeItem('cartProducts');
    }

    const deleteProductClick = (productId) => {
        const updatedProductList = products.filter(({ Id }) => Id !== productId);
        setProducts(updatedProductList);
        localStorage.setItem('cartProducts', updatedProductList);
    }

    
    if(products.length === 0)
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
                <p>Amount</p>
                <p>Description</p>
                <p>Image</p>
                <p></p>
            </div>
            {products.map((product) => (
                <div className="productCartPreview" key={product.Id}>
                    <h2>{product.Name}</h2>
                    <p>{product.Price}</p>
                    <p>{product.Amount}</p>
                    <p>{product.Description}</p>
                    <img src={product.Image} alt='img' height={100} width={100}></img>
                    <button onClick={() => deleteProductClick(product.Id)}>Delete</button>
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