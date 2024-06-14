import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { useNavigate} from "react-router-dom"
import { useFormik } from "formik"
import { editUser, getAllUsers, reset, UserBlock } from "../../features/adminauth/adminAuthSlice"

const initialValues = {
    name: "",
    email: "",
    userId: "", 
  };

const Userlist = () => {

    const onSubmit = (values) => {
        console.log(values, "123");
        dispatch(editUser(values));
        setShowModal(false);
      };
    
      const formik = useFormik({
        initialValues,
        onSubmit,
      });
    
      // const navigate = useNavigate();
      const dispatch = useDispatch();
      const [showModal, setShowModal] = React.useState(false);
      const users = useSelector((state) => state.adminAuth.users);
      const isLoading = useSelector((state) => state.adminAuth.isLoading);
    
      useEffect(() => {
        dispatch(getAllUsers());
    
        return () => {
          dispatch(reset());
        };
      }, [dispatch]);
    
      const handleBlock = (userId, block) => {
        if (
          window.confirm(
            `Are you sure want to ${block ? " Block" : "Unblock"} the user?`
          )
        ) {
          dispatch(UserBlock(userId));
        }
      };
    
      const handleEdit = (userId, name, email) => {
        const userToEdit = users.find((user) => user._id === userId);
    
        formik.setValues({
          name: userToEdit.name,
          email: userToEdit.email,
          userId: userToEdit._id,
        });
    
        setShowModal(true);
      }

  return (
    <div className="user-list" style={{ padding: "20px" }}>
      {isLoading && <p>Loading...</p>}
      {users && users.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", padding: "10px 0", textAlign: "left" }}>Sl No</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "10px 0", textAlign: "left" }}>Photo</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "10px 0", textAlign: "left" }}>Name</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "10px 0", textAlign: "left" }}>Email</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "10px 0", textAlign: "left" }}>Status</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "10px 0", textAlign: "left" }}>Action</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "10px 0", textAlign: "left" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>{index + 1}</td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
                  <img
                    src={user?.profileUrl || "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"}
                    alt="profile"
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  />
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>{user.name}</td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>{user.email}</td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>{user.is_blocked ? "Unblocked" : "Blocked"}</td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
                  <div style={{ display: "flex" }}>
                    <button
                      onClick={() => handleBlock(user._id, user.is_blocked)}
                      style={{ marginRight: "5px", padding: "6px 10px", borderRadius: "5px", background: "#f44336", color: "#fff", cursor: "pointer" }}
                    >
                      {user.is_blocked ? "Block" : "Unblock"}
                    </button>
                    <button
                      onClick={() => handleEdit(user._id, user.name, user.email)}
                      style={{ padding: "6px 10px", borderRadius: "5px", background: "#007bff", color: "#fff", cursor: "pointer" }}
                    >
                      Edit
                    </button>
                  </div>
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available</p>
      )}

      {showModal && (
        <>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div style={{ maxWidth: "600px", width: "100%", padding: "20px", backgroundColor: "#fff", borderRadius: "10px", position: "relative" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Edit</h3>
              <button
                style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer", border: "none", background: "none", fontSize: "24px", color: "#000", opacity: 0.5 }}
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
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
                    style={{ marginBottom: "10px", width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  />
                  {formik.touched.name && formik.errors.name && <div style={{ color: "red", marginLeft: "4px" }}>{formik.errors.name}</div>}
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
                    style={{ marginBottom: "10px", width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  />
                  {formik.touched.email && formik.errors.email && <div style={{ color: "red", marginLeft: "4px" }}>{formik.errors.email}</div>}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{ marginRight: "10px", padding: "10px 20px", border: "none", background: "#fff", color: "#333", cursor: "pointer" }}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    style={{ padding: "10px 20px", borderRadius: "5px", background: "#007bff", color: "#fff", cursor: "pointer" }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 40, backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>
        </>
      )}
    </div>
  );
};

export default Userlist
