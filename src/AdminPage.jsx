import Header from './Header';
import Footer from './Footer';
import './SignIn.css';
import './AdminPage.css';
import { useState, useEffect, useRef } from 'react';

// Utility function to convert file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target.result;
      // Remove the data URL prefix if present
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };
    reader.onerror = e => reject(e);
    reader.readAsDataURL(file);
  });
}

function AdminPage() {
  // State for Gallery
  const [galleryUrl, setGalleryUrl] = useState('');
  const [galleryMsg, setGalleryMsg] = useState('');

  // State for Match Tickets
  const [ticket, setTicket] = useState({ title: '', price: '', image: '' });
  const [ticketMsg, setTicketMsg] = useState('');

  // State for Merchandise
  const [merch, setMerch] = useState({ title: '', price: '', image: '' });
  const [merchMsg, setMerchMsg] = useState('');

  // State for displaying existing data
  const [galleryList, setGalleryList] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  const [merchList, setMerchList] = useState([]);

  // Add delete message states
  const [galleryDeleteMsg, setGalleryDeleteMsg] = useState('');
  const [ticketDeleteMsg, setTicketDeleteMsg] = useState('');
  const [merchDeleteMsg, setMerchDeleteMsg] = useState('');

  // File input refs
  const galleryFileRef = useRef(null);
  const ticketFileRef = useRef(null);
  const merchFileRef = useRef(null);

  // Fetch all data on mount and after add/delete
  const fetchAll = async () => {
    const [g, t, m] = await Promise.all([
      fetch('http://localhost:5000/api/gallery').then(r => r.json()).catch(() => []),
      fetch('http://localhost:5000/api/matchtickets').then(r => r.json()).catch(() => []),
      fetch('http://localhost:5000/api/merchandise').then(r => r.json()).catch(() => []),
    ]);
    setGalleryList(Array.isArray(g) ? g : []);
    setTicketList(Array.isArray(t) ? t : []);
    setMerchList(Array.isArray(m) ? m : []);
  };

  useEffect(() => { fetchAll(); }, []);

  // After add, refresh list
  useEffect(() => { if (galleryMsg.includes('added')) fetchAll(); }, [galleryMsg]);
  useEffect(() => { if (ticketMsg.includes('added')) fetchAll(); }, [ticketMsg]);
  useEffect(() => { if (merchMsg.includes('added')) fetchAll(); }, [merchMsg]);

  // Clear delete messages after 1 second
  useEffect(() => {
    if (galleryDeleteMsg) {
      const t = setTimeout(() => setGalleryDeleteMsg(''), 1000);
      return () => clearTimeout(t);
    }
  }, [galleryDeleteMsg]);
  useEffect(() => {
    if (ticketDeleteMsg) {
      const t = setTimeout(() => setTicketDeleteMsg(''), 1000);
      return () => clearTimeout(t);
    }
  }, [ticketDeleteMsg]);
  useEffect(() => {
    if (merchDeleteMsg) {
      const t = setTimeout(() => setMerchDeleteMsg(''), 1000);
      return () => clearTimeout(t);
    }
  }, [merchDeleteMsg]);

  // Clear add messages after 1 second
  useEffect(() => {
    if (galleryMsg) {
      const t = setTimeout(() => setGalleryMsg(''), 1000);
      return () => clearTimeout(t);
    }
  }, [galleryMsg]);
  useEffect(() => {
    if (ticketMsg) {
      const t = setTimeout(() => setTicketMsg(''), 1000);
      return () => clearTimeout(t);
    }
  }, [ticketMsg]);
  useEffect(() => {
    if (merchMsg) {
      const t = setTimeout(() => setMerchMsg(''), 1000);
      return () => clearTimeout(t);
    }
  }, [merchMsg]);

  // Handlers
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    setGalleryMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: galleryUrl }),
      });
      const data = await res.json();
      if (res.ok) {
        setGalleryMsg('Gallery image added!');
        setGalleryUrl('');
        if (galleryFileRef.current) galleryFileRef.current.value = "";
      } else {
        setGalleryMsg(data.error || 'Failed to add image');
      }
    } catch {
      setGalleryMsg('Network error');
    }
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    setTicketMsg('');
    // Require image for ticket
    if (!ticket.image) {
      setTicketMsg('Image is required');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/admin/matchtickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket),
      });
      const data = await res.json();
      if (res.ok) {
        setTicketMsg('Match ticket added!');
        setTicket({ title: '', price: '', image: '' });
        if (ticketFileRef.current) ticketFileRef.current.value = "";
      } else {
        setTicketMsg(data.error || 'Failed to add ticket');
      }
    } catch {
      setTicketMsg('Network error');
    }
  };

  const handleMerchSubmit = async (e) => {
    e.preventDefault();
    setMerchMsg('');
    // Require image for merch
    if (!merch.image) {
      setMerchMsg('Image is required');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/admin/merchandise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merch),
      });
      const data = await res.json();
      if (res.ok) {
        setMerchMsg('Merchandise added!');
        setMerch({ title: '', price: '', image: '' });
        if (merchFileRef.current) merchFileRef.current.value = "";
      } else {
        setMerchMsg(data.error || 'Failed to add merchandise');
      }
    } catch {
      setMerchMsg('Network error');
    }
  };

  // Delete handlers
  const handleDeleteGallery = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setGalleryDeleteMsg('Image deleted!');
      }
      fetchAll();
    } catch {
      setGalleryDeleteMsg('Failed to delete image');
    }
  };
  const handleDeleteTicket = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/matchtickets/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTicketDeleteMsg('Image deleted!');
      }
      fetchAll();
    } catch {
      setTicketDeleteMsg('Failed to delete image');
    }
  };
  const handleDeleteMerch = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/merchandise/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMerchDeleteMsg('Image deleted!');
      }
      fetchAll();
    } catch {
      setMerchDeleteMsg('Failed to delete image');
    }
  };

  // Handler for gallery image file upload
  const handleGalleryFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setGalleryUrl(base64);
    }
  };

  // Handler for ticket image file upload
  const handleTicketFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setTicket(t => ({ ...t, image: base64 }));
    }
  };

  // Handler for merch image file upload
  const handleMerchFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setMerch(m => ({ ...m, image: base64 }));
    }
  };

  return (
    <div className="signin-bg admin-bg">
      <Header isSignInPage={true} />
      <div className="admin-content">
        <h2 className="admin-title">Admin Dashboard</h2>
        <div className="admin-forms">
          {/* Gallery Form */}
          <form onSubmit={handleGallerySubmit} className="admin-form">
            <h3 className="admin-form-title">Add Gallery Image</h3>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleGalleryFile}
              style={{ marginBottom: 12 }}
              ref={galleryFileRef}
            />
            <button type="submit" className="signin-btn">Add</button>
            {galleryMsg && <div className={`admin-msg ${galleryMsg.includes('added') ? 'admin-success' : 'admin-error'}`}>{galleryMsg}</div>}
          </form>
          {/* Match Ticket Form */}
          <form onSubmit={handleTicketSubmit} className="admin-form">
            <h3 className="admin-form-title">Add Match Ticket</h3>
            <input
              type="text"
              placeholder="Title"
              value={ticket.title}
              onChange={e => setTicket({ ...ticket, title: e.target.value })}
              className="signin-input"
              required
            />
            <input
              type="text"
              placeholder="Price"
              value={ticket.price}
              onChange={e => setTicket({ ...ticket, price: e.target.value })}
              className="signin-input"
              required
            />
            
            <input
              type="file"
              accept="image/*"
              onChange={handleTicketFile}
              style={{ marginBottom: 12 }}
              ref={ticketFileRef}
            />
            <button type="submit" className="signin-btn">Add</button>
            {ticketMsg && <div className={`admin-msg ${ticketMsg.includes('added') ? 'admin-success' : 'admin-error'}`}>{ticketMsg}</div>}
          </form>
          {/* Merchandise Form */}
          <form onSubmit={handleMerchSubmit} className="admin-form">
            <h3 className="admin-form-title">Add Merchandise</h3>
            <input
              type="text"
              placeholder="Title"
              value={merch.title}
              onChange={e => setMerch({ ...merch, title: e.target.value })}
              className="signin-input"
              required
            />
            <input
              type="text"
              placeholder="Price"
              value={merch.price}
              onChange={e => setMerch({ ...merch, price: e.target.value })}
              className="signin-input"
              required
            />
            
            <input
              type="file"
              accept="image/*"
              onChange={handleMerchFile}
              style={{ marginBottom: 12 }}
              ref={merchFileRef}
            />
            <button type="submit" className="signin-btn">Add</button>
            {merchMsg && <div className={`admin-msg ${merchMsg.includes('added') ? 'admin-success' : 'admin-error'}`}>{merchMsg}</div>}
          </form>
        </div>
        {/* List and delete section */}
        <div className="admin-lists">
          <div className="admin-list-section">
            <h3 className="admin-list-title">Gallery Images</h3>
            {/* Show gallery delete message only here */}
            {galleryDeleteMsg && (
              <div
                className={`admin-msg ${galleryDeleteMsg.includes('deleted') ? 'admin-success' : 'admin-error'}`}
                style={{ marginBottom: 12, fontSize: '1.04rem', fontWeight: 600 }}
              >
                {galleryDeleteMsg}
              </div>
            )}
            <ul className="admin-list">
              {galleryList.map((img, idx) => (
                <li key={img._id} className="admin-list-item">
                  <span style={{ flex: 1 }}>Gallery Image {idx + 1}</span>
                  <button className="admin-delete-btn" onClick={() => handleDeleteGallery(img._id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="admin-list-section">
            <h3 className="admin-list-title">Match Tickets</h3>
            {/* Show ticket delete message only here */}
            {ticketDeleteMsg && (
              <div
                className={`admin-msg ${ticketDeleteMsg.includes('deleted') ? 'admin-success' : 'admin-error'}`}
                style={{ marginBottom: 12, fontSize: '1.04rem', fontWeight: 600 }}
              >
                {ticketDeleteMsg}
              </div>
            )}
            <ul className="admin-list">
              {ticketList.map(ticket => (
                <li key={ticket._id} className="admin-list-item">
                  <span style={{ flex: 1 }}>{ticket.title} - {ticket.price}</span>
                  <button className="admin-delete-btn" onClick={() => handleDeleteTicket(ticket._id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="admin-list-section">
            <h3 className="admin-list-title">Merchandise</h3>
            {/* Show merch delete message only here */}
            {merchDeleteMsg && (
              <div
                className={`admin-msg ${merchDeleteMsg.includes('deleted') ? 'admin-success' : 'admin-error'}`}
                style={{ marginBottom: 12, fontSize: '1.04rem', fontWeight: 600 }}
              >
                {merchDeleteMsg}
              </div>
            )}
            <ul className="admin-list">
              {merchList.map(item => (
                <li key={item._id} className="admin-list-item">
                  <span style={{ flex: 1 }}>{item.title} - {item.price}</span>
                  <button className="admin-delete-btn" onClick={() => handleDeleteMerch(item._id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;