import {Routes,Route} from 'react-router-dom'
import Login from "./component/Login"
import Register from "./component/Register"
import Navigation from "./component/Navigation"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigation/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default App