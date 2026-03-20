import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Categories() {
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/carti")
            .then(response => {
                setBooks(response.data);
                // Setăm automat prima categorie ca fiind selectată la început
                if (response.data.length > 0) {
                    const firstCat = response.data[0].categorie || 'General';
                    setSelectedCategory(firstCat);
                }
            })
            .catch(error => console.error(error));
    }, []);

    const categories = [...new Set(books.map(b => b.categorie || 'General'))].sort();

    const filteredBooks = books.filter(b => (b.categorie || 'General') === selectedCategory);

    return (
        <div className="split-screen-container">
            <aside className="categories-sidebar">
                <h3>Genuri Literare</h3>
                <ul>
                    {categories.map(cat => (
                        <li
                            key={cat}
                            className={selectedCategory === cat ? 'active-cat' : ''}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                            <span className="cat-count">
                                {books.filter(b => (b.categorie || 'General') === cat).length}
                            </span>
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="category-content">
                <div className="content-header">
                    <h2>{selectedCategory}</h2>
                    <p>Au fost găsite {filteredBooks.length} titluri</p>
                </div>

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
                            />
                            <div className="book-card-details">
                                <h3>{book.titlu}</h3>
                                <p>{book.autor}</p>
                                <button className="view-btn">Vezi detalii</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Categories;