import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignIn from './SignIn.jsx'
import Register from './Register.jsx'
import Merchandise from './Merchandise.jsx'


// Simple SPA router using state and popstate event
function Router() {
  const [path, setPath] = useState(window.location.pathname.toLowerCase());
  const [search, setSearch] = useState(window.location.search);

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname.toLowerCase());
      setSearch(window.location.search);
    };

    // Intercept anchor clicks for SPA navigation
    const onClick = (e) => {
      const anchor = e.target.closest('a');
      if (
        anchor &&
        anchor.href &&
        anchor.origin === window.location.origin
      ) {
        const pathname = anchor.pathname.toLowerCase();
        if (
          pathname === '/signin' ||
          pathname === '/register' ||
          pathname === '/' ||
          pathname === '/merchandise'
        ) {
          e.preventDefault();
          window.history.pushState({}, '', anchor.href);
          setPath(pathname);
          setSearch(window.location.search);
        }
      }
    };

    window.addEventListener('popstate', onPopState);
    document.body.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('popstate', onPopState);
      document.body.removeEventListener('click', onClick);
    };
  }, []);

  if (path === '/signin') return <SignIn />;
  if (path === '/register') return <Register />;
  if (path === '/merchandise') return <Merchandise />;
  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
