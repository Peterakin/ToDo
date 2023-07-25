import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login/>}/>
    <Route path="/app" element={<App />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);  
