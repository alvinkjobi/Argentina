import AFAlogo from "./assets/AFAlogo.png";
import "./Header.css";
import { useState } from "react";

function Header({ isSignInPage = false }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleMerchClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1800);
  };

  // Smooth scroll to section by id
  const handleSectionScroll = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="afa-header">
      <div className="afa-header-container" style={{ position: "relative" }}>
        <img src={AFAlogo} alt="AFA Logo" className="afa-logo" />
        <div className="header-title-layer">
          <span className="Title">
            <a
                href="/"
                className="afa-nav-link"
                
              >
            Argentina FC
            </a>
          </span>
        </div>
        <nav className="afa-nav">
          {!isSignInPage && (
            <>
              <a
                href="#news-section"
                className="afa-nav-link"
                onClick={e => handleSectionScroll(e, "news-section")}
              >
                News
              </a>
              <a
                href="#Trophy-section"
                className="afa-nav-link"
                onClick={e => handleSectionScroll(e, "Trophy-section")}
              >
                Trophy
              </a>
              <a
                href="#players-section"
                className="afa-nav-link"
                onClick={e => handleSectionScroll(e, "players-section")}
              >
                Gallery
              </a>
              
              <a
                href="/signin"
                className="afa-nav-link"
                onClick={handleMerchClick}
              >
                Match Tickets & Merchandise
              </a>
              {showPopup && (
                <span
                  style={{
                    position: "absolute",
                    top: "80px",
                    right: "10px",
                    background: "#0033a0",
                    color: "#fff",
                    padding: "0.7rem 1.2rem",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    zIndex: 9999,
                  }}
                >
                  Sign in for Merchandise
                </span>
              )}
            </>
            
          )}
          <a href="/signin" className="afa-nav-link">Sign-In</a>

          {isSignInPage && (
            <>
              <a
                href="/"
                className="afa-nav-link"
                data-signout="1"
                onClick={e => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('afa-signout'));
                  // Do not pushState here; Router will handle redirect
                }}
              >
                Sign-Out
              </a>
            </>
            
          )}
          
        </nav>
      </div>
    </header>
  );
}

export default Header;
