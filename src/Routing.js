/* eslint-disable */

import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.js'
import Upload from './Upload.js';

function Routing() {
  return(
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/upload' element={<Upload />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default Routing;
