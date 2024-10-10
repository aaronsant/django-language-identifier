import React, {useState, useEffect, useContext} from "react"
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Header from "./components/Header"
import './styles/App.css'
import Account from "./pages/Account"
import api from "./api"
import { AuthContext } from "./Contexts/AuthContext"
import { ACCESS_TOKEN } from "./constants"

function Logout() {
  const { setUser } = useContext(AuthContext)
  localStorage.clear()
  setUser(null)
  return <Login />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}
function App() {

  /*
  const [user, setUser] = useState(null)

  useEffect(()=> {
    getUser()
  }, [])

  const getUser = async (e) => {
    try {
      const res = await api.get("/user-profile/");
      console.log('user found')
      console.log(res.data)
    } catch (error) {
      console.log('user not found')
      console.log(error)
    }
  }
  */

  const { login } = useContext(AuthContext)

  useEffect(()=>{
    if(localStorage.getItem(ACCESS_TOKEN)){
      login()
    }
  }, [])

  return (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<RegisterAndLogout />} />
      <Route 
        path="/account" 
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>  
        } 
      />
      <Route path="*" element={<NotFound />} />

    </Routes>
  </BrowserRouter>
  )
}

export default App
