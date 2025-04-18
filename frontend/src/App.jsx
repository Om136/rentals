import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Browse } from "./pages/Browse";
import { ProductDetails } from "./pages/Product";
import { ListItem } from "./pages/ListItem";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/Sign-up";
import { useState } from "react";
import { ManageItems } from "./pages/ProductManage";
import { EditItem } from "./pages/EditItem";

function App() {
  
  const [selected, setSelected] = useState("All");
  const [searchValue, setSearchValue] = useState(""); // State for search value
  const [selectedCategory, setSelectedCategory] = useState("all"); // State for selected category

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setSelected={setSelected}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/browse"
          element={
            <Browse
              selected={selected}
              setSelected={setSelected}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
        <Route path="/browse/:id" element={<ProductDetails />} />
        <Route path="/list-item" element={<ListItem />} />
        <Route path="/manage" element={<ManageItems />} />
        <Route path="/item/edit/:id" element={<EditItem />} />
      </Routes>
    </Router>
  );
}

export default App;
