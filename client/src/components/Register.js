const Register = () => {
    return (
    <form className="registerForm">
        <label>Username:</label>
        <input type="text"></input>
        <br/>
        <label>Password:</label>
        <input type="text"></input>
        <br/>
        <label>Email:</label>
        <input type="email"></input>
        <br/>
        <label>First and Last Name:</label>
        <input type="text"></input>
        <br/>
        <label>Date of Birth:</label>
        <input type="date"></input>
        <br/>
        <label>Address:</label>
        <input type="text"></input>
        <br/>
        <label>Type of User:</label>
        <select>
            <option value="admin">Administrator</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
        </select>
        <label>Image:</label>
        <input type="file"></input>
        <br/>
        <button>Register</button>
    </form>
      );
}
 
export default Register;