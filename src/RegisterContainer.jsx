import './SignIn.css';
import { useState } from 'react';

function RegisterContainer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password.trim(),
          admin: "No", // Default to "No" for new users
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Show specific error if user already exists
        if (res.status === 409 && data.error) {
          setError(data.error);
        } else {
          setError(data.error || 'Registration failed');
        }
        return;
      }
      setSuccess('Registration successful! Redirecting to sign in...');
      setTimeout(() => {
        window.history.pushState({}, '', '/signin');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, 1200);
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div
      className="signin-container register-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "auto",
        width: "100%",
        maxWidth: "430px",
        margin: "110px auto 2rem auto",
        padding: "2.7rem 2.2rem 2.2rem 2.2rem",
        boxSizing: "border-box"
      }}
    >
      <div style={{ width: "100%" }}>
        <h2 className="signin-title" style={{ color: "#0033a0", letterSpacing: "1px" }}>Create Your Account</h2>
        <form className="signin-form" onSubmit={handleRegister}>
          <label htmlFor="name" className="signin-label">Name</label>
          <input
            type="text"
            id="name"
            className="signin-input"
            placeholder="Enter your name"
            required
            autoComplete="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <label htmlFor="email" className="signin-label">Email</label>
          <input
            type="email"
            id="email"
            className="signin-input"
            placeholder="Enter your email"
            required
            autoComplete="username"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="signin-label">Password</label>
          <input
            type="password"
            id="password"
            className="signin-input"
            placeholder="Create a password"
            required
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <label htmlFor="confirm-password" className="signin-label">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            className="signin-input"
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />

          {error && <div className="signin-error" style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
          {success && <div className="signin-success" style={{ color: 'green', marginBottom: 8 }}>{success}</div>}

          <button type="submit" className="signin-btn" style={{ marginTop: "1.2rem", fontSize: "1.15rem" }}>
            Register
          </button>
        </form>
        <div className="signin-footer" style={{ marginTop: "2rem" }}>
          <span>Already have an account?</span>{" "}
          <a
            href="/signin"
            style={{ color: "#0033a0", fontWeight: "bold" }}
            onClick={e => {
              e.preventDefault();
              window.history.pushState({}, '', '/signin');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterContainer;
