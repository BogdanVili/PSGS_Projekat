import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="app-content">
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/products" element={<Products/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
