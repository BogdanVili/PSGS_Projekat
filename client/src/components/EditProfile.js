import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { GetUserType, EditAdmin, EditSeller, EditBuyer, GetUserTypeFromNumber } from '../services/AccountService';
import AdministratorDto from '../dto/AdministratorDto';
import SellerDto from "../dto/SellerDto";
import BuyerDto from "../dto/BuyerDto";

const EditProfile = () => {
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem("userData"))

    const [username, setUsername] = useState(userData.username);
    const [password, setPassword] = useState(userData.password);
    const [email, setEmail] = useState(userData.email);
    const [firstAndLastName, setFirstAndLastName] = useState(userData.firstAndLastName);
    const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth.substring(0, 10));
    const [address, setAddress] = useState(userData.address);
    const [userType, setUserType] = useState(GetUserTypeFromNumber(userData.type));
    const [image, setImage] = useState(userData.image);
    const [imagePreview, setImagePreview] = useState(userData.image);

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

    const EditClick = (event) => {
        event.preventDefault();
        
        if(userType === "ADMIN")
        {
            const adminDto = new AdministratorDto(userData.id, 
                                                  username, 
                                                  password, 
                                                  email, 
                                                  firstAndLastName, 
                                                  dateOfBirth, 
                                                  address, 
                                                  GetUserType(userType), 
                                                  image);

            EditAdmin(adminDto)
            .then(data => {
                localStorage.setItem("userData", JSON.stringify(data));

                navigate('/approveSellers');
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        if(userType === "SELLER")
        {
            const sellerDto = new SellerDto(userData.id, 
                                            username, 
                                            password, 
                                            email, 
                                            firstAndLastName, 
                                            dateOfBirth, 
                                            address, 
                                            GetUserType(userType), 
                                            image, 
                                            userData.Approval);

            EditSeller(sellerDto)
            .then(data => {
                localStorage.setItem("userData", JSON.stringify(data));

                navigate('/productsSeller');
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        if(userType === "BUYER")
        {
            const buyerDto = new BuyerDto(userData.id, 
                                          username, 
                                          password, 
                                          email, 
                                          firstAndLastName, 
                                          dateOfBirth, 
                                          address, 
                                          GetUserType(userType), 
                                          image);

            EditBuyer(buyerDto)
            .then(data => {
                localStorage.setItem("userData", JSON.stringify(data));

                navigate('/productsBuyer');
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }

    return (
    <form className="editForm" onSubmit={EditClick}>
            <label>Username:</label>
            <input type="text" 
                   required
                   disabled
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
                    disabled
                    value={userType}
                    onChange={(event) => setUserType(event.target.value)}>
                <option value="SELLER">Seller</option>
                <option value="BUYER">Buyer</option>
            </select>
        <br/>
            <label >Image:</label>
            <input type="file" 
                   accept="image/png, image/jpg, image/jpeg" 
                   onChange={handleImageUpload}></input>
            {imagePreview && <img src={imagePreview} alt='imgPreview' height={100} width={100}></img>}
        <br/>

        <button>Edit</button>
    </form>
    );
}
 
export default EditProfile;