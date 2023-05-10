import {useState} from 'react';
import image from '../../test_img/image1.jpg'

const ProductsBuyer = () => {
    const [products, setProducts] = useState([
        {id: 1, name: 'product1', price: 100, amount: 5, description: 'desc1longer'},
        {id: 2, name: 'product2', price: 100, amount: 5, description: 'desc2'},
        {id: 3, name: 'product3', price: 100, amount: 5, description: 'desc3'},
    ])

    return (  
        <div className="productsBuyerShow">
            {products.map((product) => (
                <div className="productBuyerPreview" key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                    <p>{product.amount}</p>
                    <p>{product.description}</p>
                    <img src={image} alt='img' height={100} width={100}></img>
                    <input type='number'></input>
                    <button>Buy</button>
                </div>
            ))}  
        </div>
    );
}
 
export default ProductsBuyer;