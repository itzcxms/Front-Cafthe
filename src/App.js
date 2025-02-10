import './styles/App.css';
import Layout from './layout/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
      <Router>
        <Routes>
            <Route path={"/"} element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="produit/:id" element={<ProductDetails />}/>
            </Route>
        </Routes>
      </Router>
  );
}

export default App;
