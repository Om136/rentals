import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Browse } from "./pages/Browse";
import BrowseEnhanced from "./pages/BrowseEnhanced";
import { ProductDetails } from "./pages/Product";
import { ListItem } from "./pages/ListItem";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/Sign-up";
import { HowItWorks } from "./pages/HowItWorks";
import { useState } from "react";
import { ManageItems } from "./pages/ProductManage";
import { EditItem } from "./pages/EditItem";

function App() {
  const [searchValue, setSearchValue] = useState(""); // State for search value (used by Home page)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home setSearchValue={setSearchValue} searchValue={searchValue} />
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/working" element={<HowItWorks />} />
        <Route path="/browse" element={<BrowseEnhanced />} />
        <Route path="/browse/:id" element={<ProductDetails />} />
        <Route path="/list-item" element={<ListItem />} />
        <Route path="/manage" element={<ManageItems />} />
        <Route path="/item/edit/:id" element={<EditItem />} />
      </Routes>
    </Router>
  );
}

export default App;
