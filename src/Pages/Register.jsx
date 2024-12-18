import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setAlert({
          show: true,
          message: "All fields are required",
          type: "danger",
        });
        return;
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setAlert({
          show: true,
          message: "Please enter a valid email address",
          type: "danger",
        });
        return;
      }
  
      // Password validation
      if (formData.password.length < 6) {
        setAlert({
          show: true,
          message: "Password must be at least 6 characters long",
          type: "danger",
        });
        return;
      }
  
      // Confirm password validation
      if (formData.password !== formData.confirmPassword) {
        setAlert({
          show: true,
          message: "Passwords do not match",
          type: "danger",
        });
        return;
      }

    // get existing users from local storage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // check if email is already registered
    if (existingUsers.some((user) => user.email === formData.email)) {
      setAlert({
        show: true,
        message: "This email is already registered!",
        type: "danger",
      });
      return;
    }

    // add new user
    const newUser = {
      id: Date.now(), // unique id for each user
      name: formData.name,
      email: formData.email,
      password: formData.password, // note: password should be hashed in production
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setAlert({
      show: true,
      message: "Registration successful! Redirecting to login...",
      type: "success",
    });

    console.log("Registration successful:", newUser);

    // redirect to login page after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
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
              <h2 className="text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-start w-100">Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
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
                <div className="mb-3">
                  <label className="form-label text-start w-100">
                    Confirm Password*
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
