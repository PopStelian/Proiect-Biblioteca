// File: `biblioteca_react/src/components/Navbar.jsx`
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

function Navbar({ searchTerm, setSearchTerm, isLoggedIn }) {
    const location = useLocation();

    return (
        <header className="navbar">
            <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span className="icon">📖</span>
                <h1>Biblioteca online</h1>
            </Link>

            {location.pathname === '/carti' && (
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Cauta o carte sau un autor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            <nav className="nav-links">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Acasă</Link>
                <Link to="/carti" className={location.pathname === '/carti' ? 'active' : ''}>Cărți</Link>
                <Link to="/categorii" className={location.pathname === '/categorii' ? 'active' : ''}>Categorii</Link>
                {isLoggedIn ? (
                    <Link to="/cont" className={`user-profile ${location.pathname === '/cont' ? 'active' : ''}`}>
                        Profilul meu
                    </Link>
                ) : (
                    <div className="auth-links">
                        <Link to="/login" className="login-btn">Autentificare</Link>
                        <Link to="/register" className="register-btn">Cont nou</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Navbar;
