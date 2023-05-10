const Register = () => {
    return (
    <form className="registerForm">
        <label>Username:</label>
        <input type="text" required></input>
        <br/>
        <label>Password:</label>
        <input type="text" required></input>
        <br/>
        <label>Email:</label>
        <input type="email" required></input>
        <br/>
        <label>First and Last Name:</label>
        <input type="text" required></input>
        <br/>
        <label>Date of Birth:</label>
        <input type="date" required></input>
        <br/>
        <label>Address:</label>
        <input type="text" required></input>
        <br/>
        <label>Type of User:</label>
        <select required>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
        </select>
        <br/>
        <label required>Image:</label>
            <input type="file"></input>
        <br/>
        <button>Register</button>
    </form>
      );
}
 
export default Register;