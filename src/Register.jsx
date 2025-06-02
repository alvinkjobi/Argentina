import Footer from './Footer';
import Header from './Header';
import './SignIn.css';
import RegisterContainer from './RegisterContainer';

function Register() {
  return (
    <div className="signin-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header isSignInPage={true} />
      <RegisterContainer />

      <Footer />
    </div>
  );
}

export default Register;
