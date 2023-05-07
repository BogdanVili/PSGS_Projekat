const Login = () => {
    return ( 
        <form className="loginForm">
            <label>Username:</label>
            <input type="text"></input>
            <br/>
            <label>Password:</label>
            <input type="password"></input>
            <br/>
            <br/>
            <button>Login</button>
        </form>
     );
}
 
export default Login;