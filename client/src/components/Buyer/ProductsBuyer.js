import {useState, useEffect} from 'react';
import { GetAllProducts } from '../../services/ProductService';
import ProductDto from '../../dto/ProductDto';
import OrderDto from '../../dto/OrderDto';

const ProductsBuyer = () => {
    const [products, setProducts] = useState([]);
    const [selectedAmounts, setSelectedAmounts] = useState([]);
    const [cartProductIds, setCartProductIds] = useState([]);
    const [addToCartButtonsDisabled, setAddToCartButtonsDisabled] = useState([]);

    useEffect(() => {
        GetAllProducts()
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }, []);

    useEffect(() => {
        let cartProducts = [];

        const cartProductsString = localStorage.getItem("cartProducts");
        if(cartProductsString)
        {
            cartProducts = JSON.parse(cartProductsString);
        }

        let updatedCartProductIds = [];
        if(cartProductsString)
        {
            cartProducts.forEach(product => {
                updatedCartProductIds.push(product.Id);
            });
        }
        setCartProductIds(updatedCartProductIds);
    }, [products]);

    useEffect(() => {
    const updatedAddToCartButtonsDisabled = products.map(product =>
        cartProductIds.includes(product.id)
    );
    setAddToCartButtonsDisabled(updatedAddToCartButtonsDisabled);
    }, [cartProductIds]);

    const addToCartClick = (product, selectedAmount) => {
        if(selectedAmount <= 0)
        {
            return;
        }

        const productDto = new ProductDto(product.id, product.name, product.price, selectedAmount, product.description, product.image, product.sellerDto);

        let cartProducts = [];

        const cartProductsString = localStorage.getItem("cartProducts");
        if(cartProductsString)
        {
            cartProducts = JSON.parse(cartProductsString);
        }

        cartProducts.push(productDto);

        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

        let updatedCartProductIds = [];

        cartProducts.forEach(product => {
            updatedCartProductIds.push(product.Id);
        });
        
        setCartProductIds(updatedCartProductIds);
    }

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
            {products.map((product, index) => 
                {
                return(<div className="productBuyerPreview" key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                    <p>{product.amount}</p>
                    <p>{product.description}</p>
                    <img src={product.image} alt='img' height={100} width={100}></img>
                    <input type='number' placeholder='amount' 
                           value={selectedAmounts[index] || 0} 
                           onChange={(event) => {
                                const updatedAmounts = [...selectedAmounts];
                                updatedAmounts[index] = event.target.value;
                                setSelectedAmounts(updatedAmounts);
                           }}>
                    </input>

                    <button onClick={() => addToCartClick(product, selectedAmounts[index])} disabled={addToCartButtonsDisabled[index]}>Add to Cart</button>
                </div>)
                }
            )}  
        </div>
    );
}
 
export default ProductsBuyer;