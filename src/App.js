import './styles/App.css';
import Layout from './layout/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageProduit from "./pages/PageProduit";
import Login from "./pages/Login";
import { AuthProvider} from "./context/AuthContext";
import "./styles/fonts.css";
import AllProducts from "./pages/AllProducts";

function App() {
  return (
      <AuthProvider>
          <Router>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="produit/:id" element={<PageProduit />}/>
                    <Route path="connexion" element={<Login />} />
                    <Route path="produits" element={<AllProducts />} />
                </Route>
            </Routes>
          </Router>
      </AuthProvider>
  );
}

export default App;
