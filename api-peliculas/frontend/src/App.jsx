import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { MediaView } from './views/MediaView';
import { GeneroView } from './views/GeneroView';
import { DirectorView } from './views/DirectorView';
import { ProductoraView } from './views/ProductoraView';
import { TipoView } from './views/TipoView';

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MediaView />} />
        <Route path="/generos" element={<GeneroView />} />
        <Route path="/directores" element={<DirectorView />} />
        <Route path="/productoras" element={<ProductoraView />} />
        <Route path="/tipos" element={<TipoView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
