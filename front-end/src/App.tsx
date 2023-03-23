import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './router/template/main/Main';
import Template from './router/template/Template';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<Main />} />
      </Route>
    </Routes>
  );
}

export default App;
