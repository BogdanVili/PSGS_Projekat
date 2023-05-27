import { Link, useNavigate } from "react-router-dom";
import { LoggedIn, GetUserType, UserTypeIsSame } from "../services/AccountService";
import { useState, useEffect } from "react";
import eventBus from "../services/EventBus"

const Navbar = () => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(LoggedIn());
    const [userType, setUserType] = useState(localStorage.getItem('userType'));

    useEffect(() => {
        const handleLoggedInChange = (newLoggedIn) => {
            setLoggedIn(newLoggedIn);
        };

        const handleUserTypeChange = (newUserType) => {
          setUserType(JSON.parse(newUserType));
        };

        eventBus.on('loggedInChange', handleLoggedInChange);
        eventBus.on('userTypeChange', handleUserTypeChange);
    
        return () => {
          eventBus.off('loggedInChange', handleLoggedInChange);
          eventBus.off('userTypeChange', handleUserTypeChange);
        };
      }, []);

    const LogOut = () => {
        if(LoggedIn())
        {
            localStorage.setItem('userData', null);
            localStorage.setItem("userType", null);
            setLoggedIn(false);
            navigate('/login');
        }
    };



    if(loggedIn === false)
    {
        return (
            <nav className="navbar">
                <h1>Shoppingholic</h1>
                <div className="links">
                    { loggedIn === false ? <Link to="/login">Login</Link> : null}
                    { loggedIn === false ? <Link to="/register">Register</Link> : null}
                </div>
            </nav>
        )
    }

    return ( 
        <nav className="navbar">
            <h1>Shoppingholic</h1>
            <div className="links">
                { UserTypeIsSame("ADMIN") ? <Link to="/approve-sellers">Approve Sellers</Link> : null } 

                { UserTypeIsSame("SELLER") ? <Link to="/products-seller">My Products</Link> : null }
                { UserTypeIsSame("SELLER") ? <Link to="/add-product">Add Product</Link> : null }

                { UserTypeIsSame("BUYER") ? <Link to="/products-buyer">Products Buyer</Link> : null }
                { UserTypeIsSame("BUYER") ? <Link to="/cart">Cart</Link> : null }

                <Link to="/edit-profile">Edit Profile</Link>
                { loggedIn === true ? <a href="#" onClick={() => LogOut()}>Log Out</a> : null }
            </div>
        </nav>
     );
}
 
export default Navbar;