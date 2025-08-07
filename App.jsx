import React, { useContext } from 'react'
import { Navigate, Route, Routes, } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/loginpage'
import ProfilePage  from './pages/profilePage'
import {Toaster} from "react-hot-toast"
import { AuthContext } from '../context/AuthContext'



const App = () => {

  const { authUser} = useContext(AuthContext)



  return (
   <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
    <Toaster />
    
    
<Routes>
  <Route path='/' element= { authUser ? <HomePage /> : <Navigate to="/LoginPage" /> }/>
  <Route path= '/LoginPage' element={ !authUser ? <LoginPage/> : <Navigate to="/" /> } />
  <Route path= '/ProfilePage' element={ authUser ? <ProfilePage/> : <Navigate to="/LoginPage" /> } />

</Routes>
     
    </div>
  )
}

export default App