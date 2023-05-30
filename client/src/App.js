import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ProductsBuyer from './components/Buyer/ProductsBuyer';
import ApproveSellers from './components/Admin/ApproveSellers';
import ProductsSeller from './components/Seller/ProductsSeller';
import EditProfile from './components/EditProfile';
import AddProduct from './components/Seller/AddProduct';
import Cart from './components/Buyer/Cart';
import { LoggedIn, UserTypeIsSame } from './services/AccountService';
import Unauthorized from './components/Unauthorized';
import { useState, useEffect } from 'react';
import eventBus from './services/EventBus';
import EditProduct from './components/Seller/EditProduct';
import ApprovalPage from './components/Seller/Approval';
import OrdersSeller from './components/Seller/OrdersSeller';
import OrdersBuyer from './components/Buyer/OrdersBuyer';
import OrdersAdmin from './components/Admin/OrdersAdmin'


function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(LoggedIn());

  const [adminLoggedIn, setAdminLoggedIn] = useState(UserTypeIsSame("ADMIN"));
  const [sellerLoggedIn, setSellerLoggedIn] = useState(UserTypeIsSame("SELLER"));
  const [buyerLoggedIn, setBuyerLoggedIn] = useState(UserTypeIsSame("BUYER"));

  useEffect(() => {
    const handleLoggedInChange = (newLoggedIn) => {
      setLoggedIn(newLoggedIn);
    };

    const handleTypeChange = () => {
      if(UserTypeIsSame("ADMIN"))
      {
        setAdminLoggedIn(true);
        setSellerLoggedIn(false);
        setBuyerLoggedIn(false);
      }

      if(UserTypeIsSame("SELLER"))
      {
        setAdminLoggedIn(false);
        setSellerLoggedIn(true);
        setBuyerLoggedIn(false);
      }

      if(UserTypeIsSame("BUYER"))
      {
        setAdminLoggedIn(false);
        setSellerLoggedIn(false);
        setBuyerLoggedIn(true);
      }
    };

    eventBus.on('loggedInChange', handleLoggedInChange);
    eventBus.on('userTypeChange', handleTypeChange);

    return () => {
      eventBus.off('loggedInChange', handleLoggedInChange);
      eventBus.off('userTypeChange', handleTypeChange);
    };
  }, []);

  const getSellerElement = (element) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
  
    if (!sellerLoggedIn || userData === null) {
      return <Unauthorized />;
    }
  
    if (userData.approval !== null && userData.approval === true) {
      return element;
    } else {
      return <ApprovalPage />;
    }
  };

  const getRootElement = () => {
    if(!loggedIn)
    {
      return <Login/>;
    }

    if(UserTypeIsSame("ADMIN"))
    {
      return <ApproveSellers/>;
    }

    if(UserTypeIsSame("SELLER"))
    {
      return getSellerElement(<ProductsSeller />);
    }

    if(UserTypeIsSame("BUYER"))
    {
      return <ProductsBuyer/>;
    }
  }

  return (  
      <div className="App">
        <Navbar/>
        <div className="app-content">
          <Routes>
            <Route exact path="/" element={getRootElement()}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="/edit-profile" element={loggedIn ? <EditProfile/> : <Unauthorized/>}/>

            <Route path="/approve-sellers" element={adminLoggedIn ? <ApproveSellers/> : <Unauthorized/>}/>
            <Route path="/orders-admin" element={adminLoggedIn ? <OrdersAdmin/> : <Unauthorized/>}/>

            <Route path="/products-seller" element={getSellerElement(<ProductsSeller />)} />
            <Route path="/add-product" element={getSellerElement(<AddProduct/>)}/>
            <Route path="/edit-product" element={getSellerElement(<EditProduct/>)}/>
            <Route path="/orders-seller" element={getSellerElement(<OrdersSeller/>)}/>

            <Route path="/products-buyer" element={buyerLoggedIn ? <ProductsBuyer/> : <Unauthorized/>}/>
            <Route path="/cart" element={buyerLoggedIn ? <Cart/> : <Unauthorized/>}/>
            <Route path="/orders-buyer" element={buyerLoggedIn ? <OrdersBuyer/> : <Unauthorized/>}/>
          </Routes>
        </div>
      </div>
  );
}

export default App;
