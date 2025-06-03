import Header from './Header';
import Footer from './Footer';
import './SignIn.css';
import './Merchandise.css';
import { useEffect, useState } from 'react';

function Merchandise() {
  const [tickets, setTickets] = useState([]);
  const [merchandise, setMerchandise] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/matchtickets')
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(() => setTickets([]));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/merchandise')
      .then(res => res.json())
      .then(data => setMerchandise(data))
      .catch(() => setMerchandise([]));
  }, []);

  return (
    <div className="signin-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header isSignInPage={true} />
      <div className="ticket-container">
        <h2 className="merch-title">Argentina FC Match Tickets</h2>
        <p className="ticket-desc">
          Welcome! Here you can browse and purchase official Argentina FC match tickets.
        </p>
        <div className="merch-items">
          {/* Dynamically render all match tickets from DB */}
          {tickets.map((ticket, idx) => (
            <div className="merch-item" key={idx}>
              <img
                src={
                  ticket.image && !ticket.image.startsWith('http')
                    ? `data:image/jpeg;base64,${ticket.image}`
                    : ticket.image
                }
                alt={ticket.title || 'Ticket'}
                className="merch-img"
              />  
              <div className="merch-item-title">{ticket.title}</div>
              <div className="merch-item-price">{ticket.price}</div>
              <button className="merch-btn">Buy Now</button>
            </div>
          ))}
        </div>
      </div>
      <div className="merch-container-alt">
        <h2 className="merch-title-alt">Argentina FC Merchandise</h2>
        <p className="merch-desc-alt">
          Welcome! Here you can browse and purchase official Argentina FC merchandise.
        </p>
        <div className="merch-items-alt">
          {/* Dynamically render all merchandise from DB */}
          {merchandise && merchandise.length > 0 ? (
            merchandise.map((item, idx) => (
              <div className="merch-item-alt" key={idx}>
                <img
                  src={
                    item.image && !item.image.startsWith('http')
                      ? `data:image/jpeg;base64,${item.image}`
                      : item.image
                  }
                  alt={item.title || 'Merchandise'}
                  className="merch-img-alt"
                />
                <div className="merch-item-title-alt">{item.title}</div>
                <div className="merch-item-price-alt">{item.price}</div>
                <button className="merch-btn-alt">Buy Now</button>
              </div>
            ))
          ) : (
            <div style={{ color: "#0033a0", fontWeight: 500, textAlign: "center", width: "100%" }}>
              No merchandise available.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Merchandise;
