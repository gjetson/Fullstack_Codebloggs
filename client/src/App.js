
import Sidebar from "./components/Sidebar"
import LoginSubmit from "./components/Login"
import RegisterSubmit from "./components/Register"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { AboutUs, OurAim, OurVision } from "./tmp/pages/AboutUs"
import { Services, ServicesOne, ServicesTwo, ServicesThree, } from "./tmp/pages/Services"
import { Events, EventsOne, EventsTwo } from "./tmp/pages/Events"
import Contact from "./tmp/pages/ContactUs"
import Support from "./tmp/pages/Support"

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/login" element={<LoginSubmit />} />
        <Route path="/register" element={<RegisterSubmit />} />
        <Route path='/home' element={<AboutUs />} />
        <Route path='/bloggs' element={<Services />} />
        <Route path='/network' element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}




export default App
