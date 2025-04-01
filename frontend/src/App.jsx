import { Navbar } from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Browse } from "./pages/Browse";
import { ProductDetails } from "./pages/Product";
import { ListItem } from "./pages/ListItem";

function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/browse" element={<Browse/>} />
        <Route path="/browse/:id" element={<ProductDetails/>} />
        <Route path="/list-item" element={<ListItem/>} />

      </Routes>
    </Router>
  );
}

export default App
