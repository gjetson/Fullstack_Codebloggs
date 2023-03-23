
import Sidebar from "./components/Sidebar"
import LoginSubmit from "./components/Login"
import RegisterSubmit from "./components/Register"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AboutUs, OurAim, OurVision } from "./tmp/pages/AboutUs"
import { Services } from "./tmp/pages/Services"


function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/login" element={<LoginSubmit />} />
        <Route path="/register" element={<RegisterSubmit />} />
        <Route path='/' element={<AboutUs />} />
        <Route path='/bloggs' element={<OurAim />} />
        <Route path='/network' element={<OurVision />} />
        <Route path='/services' element={<Services />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
