import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function Register() {
    const [nume, setNume] = useState("");
    const [email, setEmail] = useState("");
    const [parola, setParola] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const dateMembru = {
            nume: nume,
            email: email,
            parola: parola
        };

        axios.post("https://proiect-biblioteca.onrender.com/api/membri", dateMembru)
            .then(res => {
                navigate("/login");
            })
            .catch(err => {
                alert("A apărut o eroare la înregistrare.");
            });
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleRegister}>
                <h2>Creează un cont nou</h2>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Nume complet"
                        value={nume}
                        onChange={(e) => setNume(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Adresa de email"
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
                <button type="submit" className="auth-btn">Înregistrare</button>
                <p>Ai deja cont? <Link to="/login">Loghează-te aici</Link></p>
            </form>
        </div>
    );
}

export default Register;