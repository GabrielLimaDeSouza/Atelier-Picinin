import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App'
import Home from './pages/Home';
import CadastrarProduto from './pages/CadastrarProduto';
import CadastrarInsumo from './pages/CadastrarInsumo';

import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route element={<App />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/cadastrarProduto" element={<CadastrarProduto />} />
          <Route path="/cadastrarInsumo" element={<CadastrarInsumo />} />
        </Route>
        
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
