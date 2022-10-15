import React, { useEffect, useState } from 'react';
import './App.css';
import { AlbumsContext, AlbumsContextProvider } from './components/AlbumsContext';
import { AlbumsTree } from './components/AlbumsTree';

function App() {
  return (
    <AlbumsContextProvider>
      <AlbumsTree />
    </AlbumsContextProvider>
  );
}

export default App;
