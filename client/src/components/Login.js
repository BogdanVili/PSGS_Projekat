import {useContext, useState} from "react"
import {redirect, useNavigate} from 'react-router-dom'
import {GetUserAccount, GetUserType} from '../services/AccountService'
import LoginDto from "../dto/LoginDto"
import eventBus from "../services/EventBus"

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const loginData = new LoginDto(username, password);

    const [errorMessage, setErrorMessage] = useState("");

    const LoginClick = (event) => 
    {
        event.preventDefault();
        GetUserAccount(loginData)
                    .then(data => {
                        localStorage.setItem("userData", JSON.stringify(data));
                        localStorage.setItem("userType", JSON.stringify(data.type));
                        eventBus.emit('loggedInChange', true);
                        eventBus.emit('userTypeChange', JSON.stringify(data.type));
                        
                        if(data.type === GetUserType("ADMIN"))
                        {
                            navigate('/approve-sellers');
                        }

                        if(data.type === GetUserType("SELLER"))
                        {
                            navigate('/products-seller');
                        }

                        if(data.type === GetUserType("BUYER"))
                        {
                            navigate('/products-buyer');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        setErrorMessage("Wrong username or password");
                    });
    }

    return ( 
        <form className="loginForm" onSubmit={LoginClick}> 
            <label>Username:</label>
            <input type="text" 
                   required
                   value={username}
                   onChange={(event) => setUsername(event.target.value)}
            />
            <br/>
            <label>Password:</label>
            <input type="password" 
                   required
                   value={password}
                   onChange={(event) => setPassword(event.target.value)}
            />
            <br/>
            <p className="loginError">{errorMessage}</p>
            
            <button>Login</button>
        </form>
     );
}
 
export default Login;