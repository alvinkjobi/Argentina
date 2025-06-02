import Footer from './Footer';
import Header from './Header';
import './SignIn.css';
import SignInContainer from './SignInContainer';

function SignIn() {
  return (
    <div className="signin-bg" style={{ minHeight: "100vh" }}>
      <Header isSignInPage={true} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>
        <SignInContainer />
        <Footer />
      </div>
    </div>
  );
}

export default SignIn;