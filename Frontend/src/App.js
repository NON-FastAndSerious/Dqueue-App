/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Scanner from "./components/Scanner";
import StoreForm from "./components/StoreForm";
import BarcodeScanner from "./components/BarcodeScanner";
import Summary from "./components/Summary";



const Barcode = () => {
  
  return <h1>agraj</h1>;
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storescan" element={<Scanner />} />
        <Route path="/storeform" element={<StoreForm />} />
        <Route path="/barCodeScanner" element={<BarcodeScanner />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
};

export default App;
