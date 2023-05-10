import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ProductsBuyer from './components/Buyer/ProductsBuyer';
import ApproveSellers from './components/Admin/ApproveSellers';
import ProductsSeller from './components/Seller/ProductsSeller';
import Cart from './components/Buyer/Cart';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="app-content">
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/productsBuyer" element={<ProductsBuyer/>}/>
            <Route path="/approveSellers" element={<ApproveSellers/>}/>
            <Route path="/productsSeller" element={<ProductsSeller/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
