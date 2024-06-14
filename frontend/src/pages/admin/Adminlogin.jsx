import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { adminLogin, reset } from "../../features/adminauth/adminAuthSlice"
import Spinner from "../../components/Spinner"

const Adminlogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const { email, password } = formData;
      const navigate = useNavigate();
      const dispatch = useDispatch();
    
      const { admin, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.adminAuth
      );
      useEffect(() => {
        if (isError) {
          toast.error(message);
          console.log("error");
        }
        if (isSuccess || admin) {
          navigate("/admin/dashboard");
        }else{
          navigate('/admin')
        }
        dispatch(reset());
      }, [admin, isError, isSuccess, message, navigate, dispatch]);
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      const onSubmit = (e) => {
        e.preventDefault();
        const adminData = {
          email,
          password,
        };
        dispatch(adminLogin(adminData));
      };
      if (isLoading) {
        return <Spinner />;
      }
    
  return (
    <div className="adminLogin-card">
    <section className="heading">
      <h1 className="text-center">Admin Login</h1>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Login
          </button>
        </div>
      </form>
    </section>
  </div>
)
}


export default Adminlogin
