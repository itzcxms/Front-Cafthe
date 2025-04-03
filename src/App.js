import './styles/App.css';
import Layout from './layout/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageProduit from "./pages/PageProduit";
import Login from "./pages/Login";
import { AuthProvider} from "./context/AuthContext";
import "./styles/fonts.css";
import AllProducts from "./pages/AllProducts";
import MonCompte from "./components/MonCompte";
import Register from "./pages/Register";
import {CartProvider} from "./context/CartContext";
import Checkout from "./pages/Checkout";
import Erreur404 from "./pages/Erreur404";
import CGU from "./pages/CGU";
import CGV from "./pages/CGV";
import MentionsLegales from "./pages/MentionsLegales";


function App() {
  return (
      <AuthProvider>
          <CartProvider>
              <Router>
                <Routes>
                    <Route path={"/"} element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="produit/:id" element={<PageProduit />}/>
                        <Route path="connexion" element={<Login />} />
                        <Route path="inscription" element={<Register />} />
                        <Route path="produits" element={<AllProducts />} />
                        <Route path="monCompte" element={<MonCompte />} />
                        <Route path="commander" element={<Checkout />} />

                        <Route path="cgu" element={<CGU />} />
                        <Route path="cgv" element={<CGV />} />
                        <Route path="mentions-legales" element={<MentionsLegales />} />
                        <Route path="*" element={<Erreur404 />} />
                    </Route>
                </Routes>
              </Router>
          </CartProvider>
      </AuthProvider>
  );
}

export default App;
