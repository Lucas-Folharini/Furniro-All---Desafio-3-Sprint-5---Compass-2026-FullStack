import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Cart } from "./pages/Cart";
import { ProductDetail } from "./pages/ProductDetail";

import { Login } from "./pages/Login";
import { Register } from "@pages/Register";
// import { Checkout } from './pages/Checkout';
import { Contact } from "./pages/Contact";

import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <>

    <Toaster position="top-right" />

      <Header />

      <main className="min-h-screen">
        <Routes>
          {/* ROTAS PÚBLICAS */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetail />} />{" "}
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ROTAS PROTEGIDAS */}
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/checkout" element={<Checkout />} /> */}
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </>
  );
}
