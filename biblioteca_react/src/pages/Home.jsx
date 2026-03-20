import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/carti")
            .then(response => setBooks(response.data))
            .catch(error => console.error("Eroare la încărcarea paginii principale:", error));
    }, []);

    return (
        <div className="home-container">
            <section className="hero-section">
                <h2>Bun venit la Biblioteca Ta Online</h2>
                <p>Descoperă cele mai noi titluri adăugate în colecția noastră.</p>
            </section>

            <div className="books-grid">
                {books.length === 0 ? (
                    <p>Se încarcă noutățile...</p>
                ) : (
                    books.map(book => (
                        <div key={book.id} className="book-card">
                            <img
                                src={book.imagineUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400'}
                                alt={book.titlu}
                                className="book-cover"
                                style={{
                                    width: '90%',
                                    height: '400px',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    borderRadius: '8px 8px 0 0'
                                }}
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400';
                                }}
                            />
                            <h3>{book.titlu}</h3>
                            <p>{book.autor}</p>
                            <button className="borrow-btn">Vezi Detalii</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;