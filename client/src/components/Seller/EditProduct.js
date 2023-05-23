import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductDto from "../../dto/ProductDto"
import SellerDto from "../../dto/SellerDto";
import { EditProductRequest } from "../../services/ProductService";

const EditProduct = () => {
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem("userData"));
    const sellerDto = new SellerDto(userData.id,
                                    userData.username,
                                    userData.password,
                                    userData.email,
                                    userData.firstAndLastName,
                                    userData.dateOfBirth,
                                    userData.address,
                                    userData.type,
                                    userData.image,
                                    userData.approval);
    
    const location = useLocation();
    const product = location.state;

    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [amount, setAmount] = useState(product.amount);
    const [description, setDescription] = useState(product.description);
    const [image, setImage] = useState(product.image);
    const [imagePreview, setImagePreview] = useState(product.image);

    const HandleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePreview(reader.result); 
            const base64Image = reader.result;

            setImage(base64Image);
        }
    };

    const AddProductClick = (event) => {
        event.preventDefault();

        const productDto = new ProductDto(0,
                                          name,
                                          price,
                                          amount,
                                          description,
                                          image,
                                          sellerDto);

        EditProductRequest(productDto)
        .then(data => {            
            navigate('/productsSeller');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return ( 
        <form className="addProductForm" onSubmit={AddProductClick}>
            <label>Name:</label>
            <input type="text"
                   required
                   value={name}
                   onChange={(event) => setName(event.target.value)}></input>
            <br/>
            <label>Price:</label>
            <input type="number"
                   required
                   value={price}
                   onChange={(event) => setPrice(event.target.value)}></input>
            <br/>
            <label>Amount:</label>
            <input type="number"
                   required
                   value={amount}
                   onChange={(event) => setAmount(event.target.value)}></input>
            <br/>
            <label>Description:</label>
            <input type="text"
                   required
                   value={description}
                   onChange={(event) => setDescription(event.target.value)}></input>
            <br/>
            <label>Image:</label>
            <input type="file" required accept="image/png, image/jpg, image/jpeg" onChange={HandleImageUpload}></input>
            {imagePreview && <img src={imagePreview} alt='imgPreview' height={100} width={100}></img>}
            <br/>
            <button>Add</button>
        </form>
     );
}
 
export default EditProduct;