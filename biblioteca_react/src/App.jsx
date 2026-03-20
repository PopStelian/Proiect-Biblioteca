// File: `biblioteca_react/src/App.jsx`
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Books from './pages/Books.jsx';
import Categories from './pages/Categories.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <Router>
            <div className="app-container">
                <Navbar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    isLoggedIn={isLoggedIn}
                />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/carti" element={<Books searchTerm={searchTerm} user={user}/>} />
                        <Route path="/categorii" element={<Categories />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login setAuth={setIsLoggedIn} onLogin={setUser} />} />
                        <Route
                            path="/cont"
                            element={
                                isLoggedIn
                                    ? <Profile user={user} />
                                    : <Login setAuth={setIsLoggedIn} onLogin={setUser} />
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
export default App;
