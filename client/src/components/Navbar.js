import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Shoppingholic</h1>
            <div className="links">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/productsBuyer">Products Buyer</Link>
                <Link to="/productsSeller">Products Seller</Link>
                <Link to="/approveSellers">Approve Sellers</Link>
                <Link to="/cart">Cart</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;