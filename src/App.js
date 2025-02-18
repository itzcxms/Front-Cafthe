import './styles/App.css';
import Layout from './layout/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import { AuthProvider} from "./context/AuthContext";
import "./styles/fonts.css";

function App() {
  return (
      <AuthProvider>
          <Router>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="produit/:id" element={<ProductDetails />}/>
                    <Route path="connexion" element={<Login />} />
                </Route>
            </Routes>
          </Router>
      </AuthProvider>
  );
}

export default App;
