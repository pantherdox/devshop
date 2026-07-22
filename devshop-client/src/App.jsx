import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./page/Home";
import ProductDetail from "./page/ProductDetail";
// import ContextDemo from "./ContextDemo";

function App() {
  return (
    // <ContextDemo />
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/products/:id" element= {<ProductDetail/>}/>
      </Routes>
    </div>
  )
}

export default App;
