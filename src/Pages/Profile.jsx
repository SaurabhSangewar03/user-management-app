import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const navigate = useNavigate();

  useEffect(() => {
    // get current user from local storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/");
      return;
    }
    console.log(currentUser);
    setUserData(currentUser);
  }, [navigate]);

  //   console.log(userData);

  const handleSubmit = (e) => {
    e.preventDefault();

    // update all users in local storage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user) =>
      user.id === userData.id ? userData : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(userData));

    setAlert({
      show: true,
      message: "Profile updated successfully!",
      type: "success",
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          {alert.show && (
            <div
              className={`alert alert-${alert.type} alert-dismissible fade show`}
              role="alert"
            >
              {alert.message}
              <button
                type="button"
                className="btn-close"
                onClick={() => setAlert({ ...alert, show: false })}
              ></button>
            </div>
          )}
          <div className="card shadow border-0">
            <div className="card-body">
              <h2 className="text-center mb-4">Profile</h2>
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-start w-100">Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-start w-100">
                      Email*
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-start w-100">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary me-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div>
                  <p>
                    <strong>Name:</strong> {userData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {userData.phone || "Not given"}
                  </p>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
