import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

        // Check if the current path is an admin path
        const isAdminPath = location.pathname.startsWith('/admin');

        // Do not render the header for admin paths
        if (isAdminPath) {
            return null;
        }
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Goal Setter</Link>
        </div>
        <ul>

            { user ? (
                <>
                <li>
                    <button className='btn' onClick={onLogout}>
                     <FaSignOutAlt />Logout
                     </button>
                </li>

                <li>
            <Link to="/profile">
              <FaUser /> Profile
            </Link>
            </li>
                </>
            ) : (
                <>
            <li>
                <Link to='/login'><FaSignInAlt />Login</Link>
            </li>
            <li>
                <Link to='/register'><FaUser />register</Link>
            </li>
                </>
            ) }
            
        </ul>
    </header>
  )
}

export default Header
