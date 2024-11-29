import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
const Home = () => <h1>Home Page</h1>;

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
