import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Books({ searchTerm, user }) {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('https://proiect-biblioteca.onrender.com/api/carti')
            .then(res => setBooks(res.data))
            .catch(err => console.error('Error loading books:', err));
    }, []);

    const normalizedSearch = (searchTerm || '').toLowerCase();

    const filteredBooks = books.filter(book =>
        (book.titlu || '').toLowerCase().includes(normalizedSearch) ||
        (book.autor || '').toLowerCase().includes(normalizedSearch)
    );

    const handleBorrowClick = (book) => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (!book.nrExemplare || book.nrExemplare <= 0) {
            alert('Ne pare rău, nu mai sunt exemplare disponibile pentru această carte.');
            return;
        }

        borrow(book, user);
    };

    const borrow = async (book, user) => {
        const today = new Date();
        const dataImprumut = today.toISOString().slice(0, 10);
        const due = new Date();
        due.setDate(today.getDate() + 14);
        const dataScadenta = due.toISOString().slice(0, 10);

        const payload = {
            book: { id: book.id },
            member: { id: user.id },
            dataImprumut,
            dataScadenta
        };

        try {
            const res = await axios.post('https://proiect-biblioteca.onrender.com/api/imprumuturi', payload);
            if (res.status === 200 || res.status === 201) {
                alert('Împrumut realizat cu succes!');
                setBooks(prev => prev.map(b => b.id === book.id ? { ...b, nrExemplare: (b.nrExemplare || 0) - 1 } : b));
            } else {
                console.error('Unexpected response:', res);
                alert('Eroare la înregistrarea împrumutului.');
            }
        } catch (error) {
            console.error('There was an error borrowing the book!', error);
            alert('A apărut o eroare la împrumutarea cărții. Vă rugăm să încercați din nou.');
        }
    };

    return (
        <div className="books-grid">
            {filteredBooks.map(book => (
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
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400'; }}
                    />
                    <h3>{book.titlu}</h3>
                    <p>{book.autor}</p>
                    <button className="borrow-btn" onClick={() => handleBorrowClick(book)}>Împrumută</button>
                </div>
            ))}
        </div>
    );
}

export default Books;
