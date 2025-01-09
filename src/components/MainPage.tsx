import React from 'react';
import { Link } from 'react-router-dom';

interface Album {
    id: number;
    title: string;
    cover_image: string;
}

interface MainPageProps {
    albums: Album[];
    favorites: Album[];
    filterYear: number;
    filterGenre: string;
    filterArtist: string;
    filterCountry: string;
    setFilterYear: (year: number) => void;
    setFilterGenre: (genre: string) => void;
    setFilterArtist: (artist: string) => void;
    setFilterCountry: (country: string) => void;
    fetchAlbums: () => void;
    toggleFavorite: (album: Album) => void;
}

const MainPage: React.FC<MainPageProps> = ({
    albums,
    favorites,
    filterYear,
    filterGenre,
    filterArtist,
    filterCountry,
    setFilterYear,
    setFilterGenre,
    setFilterArtist,
    setFilterCountry,
    fetchAlbums,
    toggleFavorite
}) => {
    return (
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
    );
}

export default MainPage; 