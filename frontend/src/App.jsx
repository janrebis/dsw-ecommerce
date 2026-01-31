import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Delivery from "./pages/Delivery";
import Summary from "./pages/Summary";
import UserDashboard from "./pages/UserDashboard";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />  
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/user_dashboard" element={<UserDashboard />} />
        </Routes>
    );
}

