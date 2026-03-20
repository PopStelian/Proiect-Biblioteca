import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function Login({ setAuth, onLogin }) {
    const [email, setEmail] = useState("");
    const [parola, setParola] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const credentials = { email, parola };

        axios.post("http://localhost:8080/api/membri/login", credentials)
            .then(res => {
                setAuth(true);
                onLogin(res.data);
                navigate("/cont");
            })
            .catch(err => {
                alert("Email sau parolă incorectă!");
                console.error(err);
            });
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2>Autentificare</h2>
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Parolă"
                        value={parola}
                        onChange={(e) => setParola(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-btn">Intră în cont</button>
                <p>Nu ai cont? <Link to="/register">Înregistrează-te aici</Link></p>
            </form>
        </div>
    );
}

export default Login;