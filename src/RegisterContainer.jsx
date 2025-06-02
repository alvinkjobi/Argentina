import './SignIn.css';

function RegisterContainer() {
  const handleRegister = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/?merch=1');
    window.dispatchEvent(new PopStateEvent('popstate'));
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
          />

          <label htmlFor="email" className="signin-label">Email</label>
          <input
            type="email"
            id="email"
            className="signin-input"
            placeholder="Enter your email"
            required
            autoComplete="username"
          />

          <label htmlFor="password" className="signin-label">Password</label>
          <input
            type="password"
            id="password"
            className="signin-input"
            placeholder="Create a password"
            required
            autoComplete="new-password"
          />

          <label htmlFor="confirm-password" className="signin-label">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            className="signin-input"
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
          />

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
