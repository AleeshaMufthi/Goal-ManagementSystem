import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"
import { useFormik } from 'formik'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { addUser, reset } from "../../features/adminauth/adminAuthSlice"
import Spinner from "../../components/Spinner"

const initialValues = {
    name: "",
    email: "",
    password: "",
    isAdmin: 0,
  }

const Adduser = () => {
    const onSubmit = (values) => {
        console.log(values, "123");
        dispatch(addUser(values))
          .then(() => {
            toast.success("user added successfully");
          })
          .catch((err) => {
            toast.error("invaild user");
          });
      };
    
      const navigate = useNavigate();
      const dispatch = useDispatch();
    
      const { admin, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.adminAuth
      );
      const formik = useFormik({
        initialValues,
        onSubmit,
      
      });
    
      useEffect(() => {
        if (isError) {
          toast.error(message);
        }
        if (!admin) {
          navigate("/admin/dashboard");
        }
    
        dispatch(reset());
      }, [navigate]);
    
      if (isLoading) {
        return <Spinner />;
      }
  return (
    <div className="adduser-card">
            <button
        className="btn m-3"
        onClick={() => {
          navigate("/admin/dashboard");
        }}
      >
        back
      </button>
      <section className="heading">
        <h1>
          <FaUser /> Add New User
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 ms-4">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 ms-4">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 ms-4">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="form-group">
            <Link to="/admin/dashboard" className="btn btn-block">
              Go Back
            </Link>
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Adduser
