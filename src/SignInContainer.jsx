import './SignIn.css';
import { useState } from 'react';

function SignInContainer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Sign in failed');
        return;
      }
      // On success, redirect
      window.history.pushState({}, '', '/merchandise');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign In</h2>
      <form className="signin-form" onSubmit={handleSignIn}>
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
          placeholder="Enter your password"
          required
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <div className="signin-error" style={{ color: 'red', marginBottom: 8 }}>{error}</div>}

        <button type="submit" className="signin-btn">Sign In</button>
      </form>
      <div className="signin-footer">
        <span>Don't have an account?</span>{" "}
        <a
          href="/register"
          onClick={e => {
            e.preventDefault();
            window.history.pushState({}, '', '/register');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
        >
          Register
        </a>
      </div>
    </div>
  );
}

export default SignInContainer;
