import {useState} from "react"
import axios from "axios"
import {GetUserAccount} from '../services/AccountService.js'

const Login = () => {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');

    const LoginClick = async () => 
    {
        const resp = await axios.post(`http://localhost:7168/account/login`, {username: username, password: password}, { headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}); 
    }

    return ( 
        <form className="loginForm">
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
            <button onClick={() => LoginClick()}>Login</button>
        </form>
     );
}
 
export default Login;