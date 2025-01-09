import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom'; // Added Navigate for redirection
import './App.css'; // Import your CSS for styling

interface Album {
    id: number;
    title: string;
    cover_image: string;
}

const App = () => {
    const [albums, setAlbums] = useState([] as Album[]);
    const [favorites, setFavorites] = useState([] as Album[]);
    const [filterYear, setFilterYear] = useState(2024);
    const [filterGenre, setFilterGenre] = useState('');
    const [filterArtist, setFilterArtist] = useState('');
    const [filterCountry, setFilterCountry] = useState('Canada');

    useEffect(() => {
        fetchAlbums();
    }, [filterYear, filterGenre, filterArtist, filterCountry]);

    const fetchAlbums = async (): Promise<void> => {
        const response = await axios.get(`https://api.discogs.com/database/search`, {
            params: {
                year: filterYear,
                genre: filterGenre,
                artist: filterArtist,
                country: filterCountry
            },
            headers: {
                'Authorization': `Discogs key=${process.env.REACT_APP_DISCOGS_API_KEY}, secret=${process.env.REACT_APP_DISCOGS_API_SECRET}`
            }
        });

        setAlbums(response.data.results);
    };

    const toggleFavorite = (album: Album): void => {
        if (favorites.includes(album)) {
            setFavorites(favorites.filter((fav: Album) => fav !== album));
        } else {
            setFavorites([...favorites, album]);
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div className="app-container">
                        <h1>Song Discovery App</h1>
                        <div className="favorites-link">
                            <Link to="/favorites">View Favorites</Link>
                        </div>
                        <div className="filter-container">
                            <label>Filter by Year:</label>
                            <input type="number" value={filterYear} onChange={(e) => setFilterYear(Number(e.target.value))} />
                            <label>Filter by Genre:</label>
                            <input type="text" value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)} />
                            
                            <div>
                                <label>Filter by Artist:</label>
                                <input type="text" value={filterArtist} onChange={(e) => setFilterArtist(e.target.value)} />
                            </div>
                            
                            <label>Filter by Country:</label>
                            <input type="text" value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} />
                            <button onClick={fetchAlbums}>Apply Filters</button>
                        </div>
                        <div className="album-list">
                            {albums.map(album => (
                                <div key={album.id} className="album-item">
                                    <h2>{album.title}</h2>
                                    <img src={album.cover_image} alt={album.title} />
                                    <button onClick={() => toggleFavorite(album)}>
                                        {favorites.includes(album) ? 'Remove from Favorites' : 'Add to Favorites'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                } />
                <Route path="/favorites" element={<FavoritesPage favorites={favorites} />} />
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown routes to main page */}
            </Routes>
        </Router>
    );
}

const FavoritesPage = ({ favorites }: { favorites: Album[] }) => {
    return (
        <div className="favorites-container">
            <Link to="/" className="favorites-link">Back to Main Page</Link>
            <h2>Favorites</h2>
            {favorites.length > 0 ? (
                <div className="album-list">
                    {favorites.map(favorite => (
                        <div key={favorite.id} className="album-item">
                            <h3>{favorite.title}</h3>
                            <img src={favorite.cover_image} alt={favorite.title} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No favorites added yet.</p>
            )}
        </div>
    );
}

export default App; 