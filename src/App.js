import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import Hero from "./components/hero";
import Products from "./components/product";




function App() {
  return (
    <div>
        <Hero></Hero>
        <Products></Products>
    </div>
  );
}

export default App;
