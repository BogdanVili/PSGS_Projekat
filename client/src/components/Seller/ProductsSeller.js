import {useState} from 'react';
import { CanDeleteProductRequest, DeleteProductRequest, GetSellerProducts } from '../../services/ProductService';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductsSeller = () => {
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem("userData"));

    const [products, setProducts] = useState([]);
    const [deleteButtonsDisabled, setDeleteButtonsDisabled] = useState([]);

    useEffect(() => {
        GetSellerProducts(userData.id)
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }, []);

    const HandleUpdate = (product) => {
        navigate('/edit-product', { state: product });
    };

    const HandleDelete = (product) => {
        DeleteProductRequest(product.id, userData.id)
            .then((data) => {
                GetSellerProducts(userData.id)
                .then(data => {
                    setProducts(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
              const updatedAddToCartButtonsDisabled = await Promise.all(
                products.map(async (product) => {
                  try {
                    const data = await CanDeleteProductRequest(product.id);
                    return !data;
                  } catch (error) {
                    console.error('Error:', error);
                  }
                })
              );
        
              setDeleteButtonsDisabled(updatedAddToCartButtonsDisabled);
            } catch (error) {
              console.error('Error:', error);
            }
          };
        
          fetchData();
    }, [products]);

    return (  
        <div className="productsSellerShow">
            <div className="productSellerPreview">
                <p>Name</p>
                <p>Price</p>
                <p>Total Amount</p>
                <p>Description</p>
                <p>Image</p>
                <p></p>
                <p></p>
            </div>
            {products.map((product, index) => (
                <div className="productSellerPreview" key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                    <p>{product.amount}</p>
                    <p>{product.description}</p>
                    <img src={product.image} alt='img' height={100} width={100}></img>
                    <button onClick={() => HandleUpdate(product)}>Update</button>
                    <button onClick={() => HandleDelete(product)} disabled={deleteButtonsDisabled[index]}>Delete</button>
                </div>
            ))}  
        </div>
    );
}
 
export default ProductsSeller;