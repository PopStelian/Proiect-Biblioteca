import '../App.css';
import { useState, useEffect } from "react";
import axios from "axios";

function Profile({ user }) {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const url = `http://localhost:8080/api/imprumuturi/membru/${user.id}`;
        axios.get(url)
            .then(res => setLoans(res.data || []))
            .catch(() => setLoans([]));
    }, [user]);

    if (!user) {
        return (
            <div className="profile-wrapper">
                <p>User not loaded. Please log in.</p>
            </div>
        );
    }

    const initial = user.nume ? user.nume.charAt(0) : '';
    const registered = user.dataInregistrare || '—';

    return (
        <div className="profile-wrapper">
            <div className="profile-card">
                <div className="user-avatar">{initial}</div>
                <div className="user-details">
                    <h1>{user.nume}</h1>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Membru din:</strong> {registered}</p>
                    <button className="logout-btn">Deconectare</button>
                </div>
            </div>

            <div className="borrowed-books-container">
                <h2>Cărțile mele împrumutate</h2>
                {loans.length > 0 ? (
                    <div className="borrowed-grid">
                        {loans.map(loan => (
                            <div key={loan.id} className="borrowed-card">
                                <div className="book-mini-info">
                                    <h3>{loan.book?.titlu || 'Titlu necunoscut'}</h3>
                                    <p>{loan.book?.autor ?? '—'}</p>
                                </div>
                                <div className="return-date">
                                    <span>Termen limită:</span>
                                    <p>{loan.dataScadenta || loan.dataReturnare || '—'}</p>
                                </div>
                                <button className="return-action-btn">Returnează</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-books">Nu ai nicio carte împrumutată momentan.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
