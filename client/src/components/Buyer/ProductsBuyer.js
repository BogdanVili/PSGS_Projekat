import {useState, useEffect} from 'react';
import { GetAllProducts } from '../../services/ProductService';
import ProductDto from '../../dto/ProductDto';
import OrderDto from '../../dto/OrderDto';
import OrderProductAmountDto from '../../dto/OrderProductAmountDto';

const ProductsBuyer = () => {
    const [products, setProducts] = useState([]);
    const [selectedAmounts, setSelectedAmounts] = useState([]);
    const [cartProductIds, setCartProductIds] = useState([]);
    const [addToCartButtonsDisabled, setAddToCartButtonsDisabled] = useState([]);
    const [productErrorMessages, setProductErrorMessages] = useState([]);
    
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

    const addToCartClick = (product, selectedAmount, index) => {
        if(selectedAmount <= 0)
        {
            return;
        }

        if(selectedAmount > product.amount)
        {
            const updatedProductErrorMessages = [...productErrorMessages];
            updatedProductErrorMessages[index] = "Selected amount is not available";
            setProductErrorMessages(updatedProductErrorMessages);
            return;
        }

        const updatedProductErrorMessages = [...productErrorMessages];
        updatedProductErrorMessages[index] = "";
        setProductErrorMessages(updatedProductErrorMessages);

        const productDto = new ProductDto(product.id, product.name, product.price, product.amount, product.description, product.image, product.sellerDto);
        const orderProductAmountDto = new OrderProductAmountDto(productDto, selectedAmount);
        let cartOPAs = [];

        const cartOPAsString = localStorage.getItem("cartOPAs");
        if(cartOPAsString)
        {
            cartOPAs = JSON.parse(cartOPAsString);
        }

        cartOPAs.push(orderProductAmountDto);

        localStorage.setItem("cartOPAs", JSON.stringify(cartOPAs));

        let updatedCartProductIds = [];

        cartOPAs.forEach(orderProductAmount => {
            updatedCartProductIds.push(orderProductAmount.ProductDto.Id);
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
                return(
                <div>
                <p className='productBuyerPreviewError'>{productErrorMessages[index]}</p>
                <div className="productBuyerPreview" key={product.id}>
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

                    <button onClick={() => addToCartClick(product, selectedAmounts[index], index)} disabled={addToCartButtonsDisabled[index]}>Add to Cart</button>
                </div>
                </div>)
                }
            )}  
        </div>
    );
}
 
export default ProductsBuyer;