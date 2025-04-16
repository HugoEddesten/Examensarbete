import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './features/home/Home'
import Layout from './layouts/main'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
