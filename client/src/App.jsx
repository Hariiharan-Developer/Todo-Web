import Login from './component/Login'
import Navigation from './component/Navigation'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './component/Register'
import Profile from './component/Profile'
import ForgetPassword from './component/ForgetPassword'
import OtpVerify from './component/OtpVerify'
import ResetPassword from './component/ResetPassword'
import SecuritySettings from './component/Security'
import {Toaster} from 'react-hot-toast'
import ProtectRouter from './component/ProtectRouter'
import { LogOut } from 'lucide-react'
const App = () => {
  return (
    <div>
      <Toaster position='top-right'/>
      <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Navigation/>} />



        {/* PROTECTED ROUTE  */}
        <Route path='/profile' element={<ProtectRouter><Profile/></ProtectRouter>}/>
        <Route path='/forget-password' element={<ForgetPassword/>}/>
        <Route path='/Otp-verify' element={<OtpVerify/>}/>
        <Route path='/reset-password' element={<ProtectRouter><ResetPassword/></ProtectRouter>}/>
        <Route path='/security' element={<ProtectRouter><SecuritySettings/></ProtectRouter>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App