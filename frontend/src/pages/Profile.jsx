import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editUser, reset } from "../features/adminauth/adminAuthSlice";
import { toast } from "react-toastify";

const Profile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        image: "",
        userId: ""
    })

    const [error, setError] = useState({
        name: "",
        email: "",
        image: ""
    })

    const [image, setImage] = useState("")

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(!user){
            navigate('/login')
        }else{
            setUserData({
                userId: user._id,
                name: user.name,
                email: user.email,
                image: user.image ||""
            })
        }
        dispatch(reset())
    }, [user, isError, isSuccess, dispatch, message, navigate])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserData({
          ...userData,
          [name]: value,
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setError({}); // Reset error state

        const { userId, name, email, image } = userData
        dispatch(editUser({ userId, name, email, image })).then(() => {
        toast.success("Update successful");
        })
    }

    const uploadImage = (e) => {
        e.preventDefault();
    
        if (!image) {
          toast.error("Please upload a file");
    
          return;
        }
    
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "eys3nf4g");
        data.append("cloud_name", "dgkfbywof");
    
        fetch("https://api.cloudinary.com/v1_1/dgkfbywof/image/upload", {
          method: "post",
          body: data,
        })
          .then((resp) => resp.json())
          .then((data) => {
            setUserData({ ...userData, image: data.url })
          })
          .catch((err) => console.log(err))
      }
    
  return (
    <>

<div className="cont">
        <form action="" encType="multipart/form-data">
          <div className="profile-wrap">
            <div className="profile-left">
              <div className="profile-right">
                <div className="content">
                  <div className="profile-image">
                    <img
                      src={
                        userData?.image
                          ? userData.image
                          : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
                      }
                      alt="profile"
                    />
                  </div>

                  <div className="profile-card">
                    <div className="profile-buttons">
                      <div className="upload-button">
                        <div className="custom-file-upload">
                          <label htmlFor="profile" className="custom-button">
                            Choose File
                          </label>
                          <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            name="profile"
                            id="profile"
                            className="hidden-input"
                          />
                        </div>
                        {error.image && (
                          <p className="text-red-600">{error.image}</p>
                        )}
                        <button className="btn-111" onClick={uploadImage}>
                          Upload!
                        </button>
                      </div>
                      <input
                        name="userId"
                        type="hidden"
                        className="border-2 border-gray-500 rounded-full p-3 w-full"
                        value={userData.userId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div className="user-email">
              <label htmlFor="user_name" className="ms-5 ">
                User Name
              </label>
              <div>
                <input
                  name="name"
                  type="text"
                  className="border-2 border-gray-500 rounded-full p-3 w-full"
                  value={userData.name}
                  onChange={handleInputChange}
                />
                {error.name && <p className="text-red-600">{error.name}</p>}
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Email</label>
              <div>
                <input
                  name="email"
                  type="email"
                  className="border-2 border-gray-500 rounded-full p-3 w-full"
                  value={userData.email}
                  onChange={handleInputChange}
                />
                {error.email && <p className="text-red-600">{error.email}</p>}
              </div>
            </div>
          </div>
        </form>
        <br></br>
        <button
                type="submit"
                className="btn-111"
                onClick={handleSubmit}
              >
                Submit
              </button>

      </div>
      <button className="btn-111" onClick={() => {
        navigate("/")
      }}>Back</button>
      
    </>

    
  );
}

export default Profile
