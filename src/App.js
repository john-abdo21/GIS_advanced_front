import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Test from './components/Test';
import AllDataView from "./components/AllDataView";

import { Container} from 'react-bootstrap';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="main-layout">
    {/* <NavBar /> */}
    <div className="content">
    <Container fluid className="main-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/allData" element={<AllDataView />} />
      </Routes>
    </Container>
    </div>
  </div>
  );
  
}

export default App;
