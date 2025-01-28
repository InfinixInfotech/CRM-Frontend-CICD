import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { forgetPassUrl, loginUrl } from "../../Redux/Services/apiServer/ApiServer";

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
        body: JSON.stringify({ userName: name, password }),
      });

      const data = await response.json();

      if (data.response.success) {
        localStorage.setItem("authToken", data.response.token);
        localStorage.setItem("empCode", data.response.employeeCode);
        localStorage.setItem("userName", data.response.userName);
        navigate("/salesdashboard");
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
    <div className="Login-Container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="login-page">
        <div className="welcome-banner">
          <h1>INFINIX INFOTECH PVT. LTD. MAIL BOX</h1>
        </div>
        <div className="login-container">
          {isForgotPassword ? (
            <>
              <h2>Forgot Password</h2>
              <form onSubmit={handleForgotPassword}>
                <div className="form-group">
                  <label>Employee Code</label>
                  <input
                    type="text"
                    value={empCode}
                    placeholder="Enter your Employee Code"
                    onChange={(e) => setEmpCode(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      placeholder="Enter New Password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      <i className={`bi ${showNewPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      placeholder="Confirm New Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>
                {forgotPasswordError && <div className="error-message">{forgotPasswordError}</div>}
                <button type="submit" className="login-btn">Reset Password</button>
                <button
                  style={{ marginTop: "24px" }}
                  type="button"
                  className="toggle-btn"
                  onClick={() => setIsForgotPassword(false)}
                >
                  Back to Login
                </button>
              </form>
            </>
          ) : (
            <>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>User ID</label>
                  <input
                    type="text"
                    value={name}
                    placeholder="User ID"
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="login-btn">Login</button>
                <button
                  style={{ marginTop: "24px" }}
                  type="button"
                  className="toggle-btn"
                  onClick={() => {
                    setIsForgotPassword(true);
                    setForgotPasswordError(null);
                  }}
                >
                  Forgot Password?
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
