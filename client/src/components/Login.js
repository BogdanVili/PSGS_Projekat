import {useState} from "react"
import {redirect, useNavigate} from 'react-router-dom'
import {GetUserAccount} from '../services/AccountService'
import LoginDto from "../dto/LoginDto"

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
                        //console.log(JSON.parse(localStorage.getItem("userData")));
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