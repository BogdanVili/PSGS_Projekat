import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUserType, RegisterBuyer, RegisterSeller } from "../services/AccountService";
import SellerDto from "../dto/SellerDto";
import BuyerDto from "../dto/BuyerDto";
import eventBus from "../services/EventBus"

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstAndLastName, setFirstAndLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [address, setAddress] = useState('');
    const [userType, setUserType] = useState('SELLER');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePreview(reader.result); 
            const base64Image = reader.result;

            setImage(base64Image);
        }
    };

    const RegisterClick = (event) => {
        event.preventDefault();

        if(userType === "SELLER")
        {
            const sellerDto = new SellerDto(0, username, password, email, firstAndLastName, dateOfBirth, address, GetUserType(userType), image, null);
            RegisterSeller(sellerDto)
                        .then(data => {
                            localStorage.setItem("userData", JSON.stringify(data));
                            localStorage.setItem("userType", JSON.stringify(data.type));
                            eventBus.emit('loggedInChange', true);
                            eventBus.emit('userTypeChange', JSON.stringify(data.type));
                            
                            navigate('/productsSeller');
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
        }

        if(userType === "BUYER")
        {
            const buyerDto = new BuyerDto(0, username, password, email, firstAndLastName, dateOfBirth, address, GetUserType(userType), image);
            RegisterBuyer(buyerDto)
                .then(data => {
                    localStorage.setItem("userData", JSON.stringify(data));
                    localStorage.setItem("userType", JSON.stringify(data.type));
                    eventBus.emit('loggedInChange', true);
                    eventBus.emit('userTypeChange', JSON.stringify(data.type));

                    navigate('/productsBuyer');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    return (
    <form className="registerForm" onSubmit={RegisterClick}>
            <label>Username:</label>
            <input type="text" 
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}></input>
        <br/>
            <label>Password:</label>
            <input type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}></input>
        <br/>
            <label>Email:</label>
            <input type="email" 
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}></input>
        <br/>
            <label>First and Last Name:</label>
            <input type="text" 
                required
                value={firstAndLastName}
                onChange={(event) => setFirstAndLastName(event.target.value)}></input>
        <br/>
            <label>Date of Birth:</label>
            <input type="date" 
                required
                value={dateOfBirth}
                onChange={(event) => setDateOfBirth(event.target.value)}></input>
        <br/>
            <label>Address:</label>
            <input type="text" 
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}></input>
        <br/>
            <label>Type of User:</label>
            <select required
                    value={userType}
                    onChange={(event) => setUserType(event.target.value)}>
                <option value="SELLER">Seller</option>
                <option value="BUYER">Buyer</option>
            </select>
        <br/>
            <label >Image:</label>
            <input type="file" required accept="image/png, image/jpg, image/jpeg" onChange={handleImageUpload}></input>
            {imagePreview && <img src={imagePreview} alt='imgPreview' height={100} width={100}></img>}
        <br/>

        <button>Register</button>
    </form>
    );
}
 
export default Register;