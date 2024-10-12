// import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from './pages/Nav'
import NoPage from './pages/NoPage'
import Learn from './pages/Learn'
import Registration from './pages/Registration';
import Homing from './pages/Homing';
import Login from './pages/Login';
import Todo from './pages/Todo';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Nav/>} >
          <Route index element={<Homing/>} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

    
  )
}

export default App
