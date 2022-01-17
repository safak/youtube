import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import About from './components/pages/about';
import Shop from './components/pages/shop';

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/shop" element={<Shop/>}/>
    </Routes>
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);