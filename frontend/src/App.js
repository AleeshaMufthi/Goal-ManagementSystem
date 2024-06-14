import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

import Header from './components/Header'

import Adminlogin from './pages/admin/Adminlogin'
import Admindashboard from './pages/admin/Admindashboard'
import Adduser from './pages/admin/Adduser'
import Profile from './pages/Profile'

function App() {
  return (
  <>

    <Router>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<Adminlogin />} />
          <Route path='/admin/dashboard' element={<Admindashboard />} />
          <Route path='/admin/adduser' element={<Adduser />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />

  </>
  )
}

export default App;
