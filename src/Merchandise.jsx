import Header from './Header';
import Footer from './Footer';
import './SignIn.css';
import './Merchandise.css';

function Merchandise() {
  return (
    <div className="signin-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header isSignInPage={true} />
      <div className="merch-container">
        <h2 className="merch-title">Argentina FC Match Tickets</h2>
        <p className="merch-desc">
          Welcome! Here you can browse and purchase official Argentina FC match tickets.
        </p>
        {/* Example merchandise items */}
        <div className="merch-items">
          <div className="merch-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Argentina_home_jersey_2022.png" alt="Jersey" className="merch-img" />
            <div className="merch-item-title">Official Jersey</div>
            <div className="merch-item-price">$89.99</div>
            <button className="merch-btn">Buy Now</button>
          </div>
          <div className="merch-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Argentina_Flag.png" alt="Flag" className="merch-img" />
            <div className="merch-item-title">Team Flag</div>
            <div className="merch-item-price">$19.99</div>
            <button className="merch-btn">Buy Now</button>
          </div>
          <div className="merch-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Soccerball.svg" alt="Football" className="merch-img" />
            <div className="merch-item-title">Football</div>
            <div className="merch-item-price">$39.99</div>
            <button className="merch-btn">Buy Now</button>
          </div>
          <div className="merch-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Soccerball.svg" alt="Football" className="merch-img" />
            <div className="merch-item-title">Football</div>
            <div className="merch-item-price">$39.99</div>
            <button className="merch-btn">Buy Now</button>
          </div>
        </div>
      </div>
      <div className="merch-container">
        <h2 className="merch-title">Argentina FC Merchandise</h2>
        <p className="merch-desc">
          Welcome! Here you can browse and purchase official Argentina FC merchandise.
        </p>
        {/* Example merchandise items */}
        <div className="merch-items">
          <div className="merch-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Argentina_home_jersey_2022.png" alt="Jersey" className="merch-img" />
            <div className="merch-item-title">Official Jersey</div>
            <div className="merch-item-price">$89.99</div>
            <button className="merch-btn">Buy Now</button>
          </div>
          <div className="merch-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Argentina_Flag.png" alt="Flag" className="merch-img" />
            <div className="merch-item-title">Team Flag</div>
            <div className="merch-item-price">$19.99</div>
            <button className="merch-btn">Buy Now</button>
          </div>
          <div className="merch-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Soccerball.svg" alt="Football" className="merch-img" />
            <div className="merch-item-title">Football</div>
            <div className="merch-item-price">$39.99</div>
            <button className="merch-btn">Buy Now</button>
          </div>
          <div className="merch-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Soccerball.svg" alt="Football" className="merch-img" />
            <div className="merch-item-title">Football</div>
            <div className="merch-item-price">$39.99</div>
            <button className="merch-btn">Buy Now</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Merchandise;
