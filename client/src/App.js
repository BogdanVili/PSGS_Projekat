import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
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


function App() {
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
      }

      if(UserTypeIsSame("SELLER"))
      {
        setSellerLoggedIn(true);
      }

      if(UserTypeIsSame("BUYER"))
      {
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

  return (  
      <div className="App">
        <Navbar/>
        <div className="app-content">
          <Routes>
            <Route exact path="/" element={LoggedIn() ? <Login/> : () => {
              if(UserTypeIsSame("ADMIN"))
              {
                <ApproveSellers/>
              }

              if(UserTypeIsSame("SELLER"))
              {
                <ProductsSeller/>
              }

              if(UserTypeIsSame("BUYER"))
              {
                <ProductsBuyer/>
              }
            }}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="/editProfile" element={loggedIn ? <EditProfile/> : <Unauthorized/>}/>

            <Route path="/approveSellers" element={adminLoggedIn ? <ApproveSellers/> : <Unauthorized/>}/>
            

            <Route path="/productsSeller" element={sellerLoggedIn ? <ProductsSeller/> : <Unauthorized/>}/>
            <Route path="/addProduct" element={sellerLoggedIn ? <AddProduct/> : <Unauthorized/>} />
            <Route path="/editProduct" element={sellerLoggedIn ? <EditProduct/> : <Unauthorized/>} />

            <Route path="/productsBuyer" element={buyerLoggedIn ? <ProductsBuyer/> : <Unauthorized/>} />
            <Route path="/cart" element={buyerLoggedIn ? <Cart/> : <Unauthorized/>}/>

          </Routes>
        </div>
      </div>
  );
}

export default App;
