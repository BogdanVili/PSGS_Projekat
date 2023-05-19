import { Link, useNavigate } from "react-router-dom";
import { LoggedIn, GetUserType } from "../services/AccountService";
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
          setUserType(newUserType);
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
                { GetUserType("ADMIN") === "0" ? <Link to="/productsBuyer">Products Buyer</Link> : null}
                { GetUserType("ADMIN") === "0" ? <Link to="/productsSeller">Products Seller</Link> : null}
                { GetUserType("ADMIN") === "0" ? <Link to="/approveSellers">Approve Sellers</Link> : null}
                { GetUserType("ADMIN") === "0" ? <Link to="/cart">Cart</Link> : null}

                { loggedIn === true ? <a href="#" onClick={() => LogOut()}>Log Out</a> : null }
            </div>
        </nav>
     );
}
 
export default Navbar;