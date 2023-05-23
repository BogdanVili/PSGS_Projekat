import {useState, useEffect} from 'react';
import { GetAllProducts } from '../../services/ProductService';

const ProductsBuyer = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        GetAllProducts()
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }, []);

    return (  
        <div className="productsBuyerShow">
            <div className="productBuyerPreview">
                <p>Name</p>
                <p>Price</p>
                <p>Total Amount</p>
                <p>Description</p>
                <p>Image</p>
                <p>Order Amount</p>
                <p></p>
            </div>
            {products.map((product) => (
                <div className="productBuyerPreview" key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                    <p>{product.amount}</p>
                    <p>{product.description}</p>
                    <img src={product.image} alt='img' height={100} width={100}></img>
                    <input type='number' placeholder='amount'></input>
                    <button>Buy</button>
                </div>
            ))}  
        </div>
    );
}
 
export default ProductsBuyer;