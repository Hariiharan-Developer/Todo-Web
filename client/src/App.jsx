import Login from './component/Login'
import Navigation from './component/Navigation'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './component/Register'
import Profile from './component/Profile'
import ForgetPassword from './component/ForgetPassword'
import OtpVerify from './component/OtpVerify'
import ResetPassword from './component/ResetPassword'
import Dashboard from './component/Dashboard'
import SecuritySettings from './component/Security'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/forget-password' element={<ForgetPassword/>}/>
        <Route path='/Otp-verify' element={<OtpVerify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/security' element={<SecuritySettings/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App