import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/AuthContext";

function Login() {
  const { setIsLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // get users from local storage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // find user by email
    const user = users.find((u) => u.email === formData.email);

    if (!user) {
      setAlert({
        show: true,
        message: "User not found! Please register first.",
        type: "danger",
      });
      return;
    }

    // check password
    if (user.password === formData.password) {
      // set current user
      localStorage.setItem("currentUser", JSON.stringify(user));
      setIsLoggedIn(true);
      setAlert({
        show: true,
        message: "Login successful! Redirecting...",
        type: "success",
      });

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } else {
      setAlert({
        show: true,
        message: "Incorrect password! Please try again.",
        type: "danger",
      });
    }
  };

  return (
    <div className="container-fluid min-vh-90 d-flex align-items-center py-5">
      <div className="row justify-content-center w-100">
        <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-4">
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
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-start w-100">Email*</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-start w-100">
                    Password*
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
                <div className="text-center mt-4">
                  <Link to="/register" className="text-decoration-none">
                    Don't have an account? Register here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
