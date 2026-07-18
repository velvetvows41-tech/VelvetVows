import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function Login() {
  const { login, loginError } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasShook, setHasShook] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setIsSubmitting(true);
    // Simulate minor visual loading delay for premium feel
    await new Promise(r => setTimeout(r, 600));

    const success = await login(username, password);
    setIsSubmitting(false);

    if (!success) {
      setHasShook(true);
      setTimeout(() => setHasShook(false), 600);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg" aria-hidden="true">
        <div className="login-bg-circle login-bg-circle--1"></div>
        <div className="login-bg-circle login-bg-circle--2"></div>
      </div>

      <div className={`login-card ${hasShook ? 'login-card--shake' : ''}`} role="main">
        <div className="login-logo-wrap">
          <img src="/images/logo.jpg" alt="Velvet Vows Logo" className="login-logo" />
        </div>
        <h1 className="login-title">ADMIN PANEL</h1>
        <p className="login-subtitle">Velvet Vows Wedding Planner</p>
        <div className="login-divider"></div>

        {loginError && (
          <div className="login-error" role="alert" aria-live="polite">
            <span aria-hidden="true">⚠</span> {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate aria-label="Admin login">
          <div className="login-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              required
              aria-required="true"
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <div className="pass-wrap">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                aria-required="true"
              />
              <button
                type="button"
                className="pass-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="login-spinner" aria-hidden="true"></span> Signing in…
              </>
            ) : (
              '✦ Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
