import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, UserPlus } from "lucide-react";
import { useApp } from "../context/AppContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, showToast } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const user = signup({
      fullName: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: password,
    });

    if (user) {
      if (showToast) {
        showToast("Account created successfully!", "success");
      }

      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">

          <div className="auth-header">
            <div className="auth-icon">
              <UserPlus size={28} />
            </div>

            <h1>Create your account</h1>

            <p>
              Create your account to manage your
              recycling pickups and earnings.
            </p>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              <span>Create Account</span>
              <ArrowRight size={18} />
            </button>

          </form>

          <p className="auth-footer-prompt">
            Already have an account?{" "}

            <Link
              to="/login"
              className="auth-link-bold"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;