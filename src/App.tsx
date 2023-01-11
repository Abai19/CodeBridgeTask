import React from 'react';
import './App.scss';
import MainPage from "./pages/MainPage";
import {Routes,Route} from "react-router-dom";
import SinglePage from "./pages/SinglePage";

function App() {
  return (
    <div className="container">
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/:id" element={<SinglePage/>}/>
        </Routes>
    </div>
  );
}

export default App;
