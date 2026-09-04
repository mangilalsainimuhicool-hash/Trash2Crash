import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Recycle,
  Mail,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useApp();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};

    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const result = login(email.trim(), password, rememberMe);

    if (result) {
      navigate('/dashboard');
    } else {
      setErrors({
        general: 'Invalid email or password. Please check your details.'
      });
    }
  };

  return (
    <div className="page-wrapper auth-page">
      <div className="auth-card-container">
        <div className="auth-card">

          {/* Brand Header */}
          <div className="auth-header text-center">
            <Link to="/" className="auth-logo-link">
              <span className="brand-icon-wrapper">
                <Recycle size={28} className="brand-icon" />
              </span>
            </Link>

            <h1 className="auth-title">
              Welcome back
            </h1>

            <p className="auth-subtitle">
              Log in to manage your pickups, recycling activity and earnings.
            </p>
          </div>

          {/* Login Error */}
          {errors.general && (
            <div className="error-msg auth-general-error">
              {errors.general}
            </div>
          )}

          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="auth-form"
            noValidate
          >

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                Email Address
              </label>

              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-input ${
                    errors.email ? 'input-error' : ''
                  }`}
                  autoComplete="email"
                />
              </div>

              {errors.email && (
                <p className="error-msg">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="label-with-addon">
                <label className="form-label">
                  Password
                </label>
              </div>

              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`form-input ${
                    errors.password ? 'input-error' : ''
                  }`}
                  autoComplete="current-password"
                />
              </div>

              {errors.password && (
                <p className="error-msg">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="form-remember-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                <span>
                  Remember me
                </span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn-primary w-full auth-submit-btn"
            >
              <span>Log In</span>
              <ArrowRight size={18} />
            </button>

          </form>

          {/* Create Account */}
          <p className="auth-footer-prompt">
            Don't have an account yet?{' '}

            <Link
              to="/signup"
              className="auth-link-bold"
            >
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;