import Header from './Header';
import Footer from './Footer';
import './SignIn.css';

function AdminPage() {
  return (
    <div className="signin-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header isSignInPage={true} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2 style={{ color: "#0033a0", marginTop: "120px" }}>Admin Dashboard</h2>
        {/* Add admin controls/components here */}
        <p style={{ color: "#0033a0", marginTop: "1rem" }}>Welcome, Admin! (Add your admin features here.)</p>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;
