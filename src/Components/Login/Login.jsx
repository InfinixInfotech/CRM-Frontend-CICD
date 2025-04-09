import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import Logo from "../../assests/Infinix3.png"
import { forgetPassUrl, loginUrl, staticToken } from "../../Redux/Services/apiServer/ApiServer";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [empCode, setEmpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState(null);
  const navigate = useNavigate();

  const finalLoginUrl = loginUrl;
  const finalForgetnUrl = forgetPassUrl;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(finalLoginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: name, password: password }),
      });

      const data = await response.json();

      if (data.response.success) {
        localStorage.setItem("authToken", data.response.token);
        localStorage.setItem("empCode", data.response.employeeCode);
        localStorage.setItem("userName", data.response.userName);
        localStorage.setItem("groupName", data.response.groupName);
        localStorage.setItem("emailId", data.response.emailId);


        // staticToken =localStorage.getItem("authToken")
        window.location.replace("/salesdashboard");
        // window.location.reload();
      } else {
        setError(data.response.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!empCode || !newPassword) {
      setForgotPasswordError("");
      return;
    }

    if (newPassword !== confirmPassword) {
      setForgotPasswordError("Passwords do not match.");
      return;
    }

    // Construct the URL with query parameters
    const queryUrl = `${finalForgetnUrl}?empCode=${encodeURIComponent(empCode)}&newPassword=${encodeURIComponent(newPassword)}`;

    try {
      const response = await fetch(queryUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Password reset successfully. You can now log in.");
        setEmpCode("");
        setNewPassword("");
        setConfirmPassword("");
        setForgotPasswordError(null);
        setIsForgotPassword(false); // Automatically return to login page
      } else {
        setForgotPasswordError(data.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setForgotPasswordError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-75 ">
      <div className="col-md-6 d-flex flex-column align-items-center mx-auto login-container">
        <div className="text-center p-0">
          <div className="mb-0 welcome-banner" >
            {/* <i className="bi bi-person-circle" style={{ fontSize: "60px", color: "teal" }}></i> */}
            <img src={Logo} style={{ height: "72px", width: "72px" }} />
          </div>
          <h4 className="text-teal fw-bold mb-2" style={{ fontSize: "20px" }}>INFINIX INFOTECH PVT. LTD.</h4>
        </div>
        <div className="card shadow-lg" style={{ width: "400px", backgroundColor: "white", opacity: 0.9 }}>
          <div className="card-body">
            {isForgotPassword ? (
              <>
                <h4 className="text-center mb-3">Forgot Password</h4>
                <form onSubmit={handleForgotPassword}>
                  <div className="mb-3">
                    <label className="form-label">Employee Code</label>
                    <input
                      type="text"
                      className="form-control input-box"
                      value={empCode}
                      placeholder="Enter your Employee Code"
                      onChange={(e) => setEmpCode(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <div className="input-group">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="form-control input-box"
                        value={newPassword}
                        placeholder="Enter New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        <i className={`bi ${showNewPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control input-box"
                        value={confirmPassword}
                        placeholder="Confirm New Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>
                    </div>
                  </div>
                  {forgotPasswordError && <div className="text-danger">{forgotPasswordError}</div>}
                  <button type="submit" className="btn btn-dark w-100">Reset Password</button>
                  <button type="button" className="btn btn-link w-100 mt-3" onClick={() => setIsForgotPassword(false)}>
                    Back to Login
                  </button>
                </form>
              </>
            ) : (
              <>
                <h4 className="text-center mb-3 fs-5">Login</h4>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">User ID</label>
                    <input
                      type="text"
                      className="form-control input-box"
                      value={name}
                      placeholder="User ID"
                      onChange={(e) => setName(e.target.value.toUpperCase().trim())}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control input-box"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value.trim())}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>
                    </div>
                  </div>
                  {error && <div className="text-danger">{error}</div>}
                  <center>
                    <button type="submit" className="btn btn-dark button-login  border-0 w-50">Login</button>
                  </center>
                  {/* <button
                  type="button"
                  className="btn btn-link w-100 mt-3"
                  onClick={() => {
                    setIsForgotPassword(true);
                    setForgotPasswordError(null);
                  }}
                >
                  Forgot Password?
                </button> */}
                  <center >
                    <br />
                    <p>Copyright <i class="bi bi-c-circle"></i> 2024 Infinix Infotech
                    </p>
                  </center>
                </form>
              </>
            )}
          </div>
        </div>
        {/* <div className="mt-3">
        New to us? <a href="#" className="text-teal">Sign Up</a>
      </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
