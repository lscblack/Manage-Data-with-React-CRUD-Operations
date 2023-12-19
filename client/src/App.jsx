import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewTables from './components/ViewTables'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ViewTables/>}></Route>
          <Route path='/view' element={<ViewTables/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
