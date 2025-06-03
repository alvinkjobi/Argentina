import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignIn from './SignIn.jsx'
import Register from './Register.jsx'
import Merchandise from './Merchandise.jsx'
import AdminPage from './AdminPage.jsx'


// Add a global auth state
function Router() {
  const [path, setPath] = useState(window.location.pathname.toLowerCase());
  const [search, setSearch] = useState(window.location.search);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Track redirect path after sign-out
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    const onSignIn = () => setIsSignedIn(true);
    const onSignOut = () => {
      setIsSignedIn(false);
      setRedirectToHome(true);
    };

    window.addEventListener('afa-signin', onSignIn);
    window.addEventListener('afa-signout', onSignOut);

    return () => {
      window.removeEventListener('afa-signin', onSignIn);
      window.removeEventListener('afa-signout', onSignOut);
    };
  }, []);

  useEffect(() => {
    if (redirectToHome) {
      window.history.pushState({}, '', '/');
      setRedirectToHome(false);
      setPath('/');
      setSearch('');
    }
  }, [redirectToHome]);

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
        // Handle sign-out link
        if (anchor.getAttribute('data-signout') === '1') {
          window.dispatchEvent(new CustomEvent('afa-signout'));
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

  // Only allow access to /merchandise if signed in
  if (path === '/signin') return <SignIn onSignIn={() => setIsSignedIn(true)} />;
  if (path === '/register') return <Register />;
  if (path === '/merchandise') {
    if (!isSignedIn) {
      // Redirect to sign-in if not authenticated
      window.history.replaceState({}, '', '/signin');
      setPath('/signin');
      return <SignIn onSignIn={() => setIsSignedIn(true)} />;
    }
    return <Merchandise />;
  }
  if (path === '/admin') return <AdminPage />;
  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
