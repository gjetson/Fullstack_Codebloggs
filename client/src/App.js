
import Login from "./components/Login"
import Register from "./components/Register"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Bloggs from "./components/Bloggs"
import Network from "./components/Network"
import WithoutNav from "./components/WithoutNav"
import WithNav from "./components/WithNav"
import PrivateOutlet from "./components/PrivateOutlet"
import PrivateAdminOutlet from "./components/PrivateAdminOutlet"
import Admin from "./components/Admin"
import UserManager from "./components/UserManager"
import UserBloggs from "./components/UserBloggs"
import EditUser from "./components/EditUser"
import ContentManager from "./components/ContentManager"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<WithNav />}>
          <Route path='/' element={<PrivateOutlet />} >
            <Route path='' element={<UserBloggs />} />
          </Route>
          <Route path='/admin' element={<PrivateAdminOutlet />} >
            <Route path='' element={<Admin />} />
          </Route>
          <Route path='/users' element={<PrivateAdminOutlet />} >
            <Route path='' element={<UserManager />} />
          </Route>
          <Route path='/edit/user/:id' element={<PrivateAdminOutlet />} >
            <Route path='' element={<EditUser />} />
          </Route>
          <Route path='/content' element={<PrivateAdminOutlet />} >
            <Route path='' element={<ContentManager />} />
          </Route>
          <Route path='/bloggs' element={<PrivateOutlet />} >
            <Route path='' element={<Bloggs />} />
          </Route>
          <Route path='/network' element={<PrivateOutlet />} >
            <Route path='' element={<Network />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
