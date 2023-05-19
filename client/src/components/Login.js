import {useContext, useState} from "react"
import {redirect, useNavigate} from 'react-router-dom'
import {GetUserAccount, LoggedInUseStateContext} from '../services/AccountService'
import LoginDto from "../dto/LoginDto"
import eventBus from "../services/EventBus"

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const loginData = new LoginDto(username, password);

    const LoginClick = (e) => 
    {
        e.preventDefault();
        GetUserAccount(loginData)
                    .then(data => {
                        localStorage.setItem("userData", JSON.stringify(data));
                        localStorage.setItem("userType", JSON.stringify(data.type));
                        eventBus.emit('loggedInChange', true);
                        eventBus.emit('userTypeChange', JSON.stringify(data.type));

                        navigate('/register');
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });

        
    }

    return ( 
        <form className="loginForm" onSubmit={LoginClick}> 
            <label>Username:</label>
            <input type="text" 
                   required
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
            />
            <br/>
            <label>Password:</label>
            <input type="password" 
                   required
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
            />
            <br/>
            <br/>
            <button>Login</button>
        </form>
     );
}
 
export default Login;