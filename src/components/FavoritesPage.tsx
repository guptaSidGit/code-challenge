import React from 'react';
import { Link } from 'react-router-dom';

interface Album {
    id: number;
    title: string;
    cover_image: string;
}

interface FavoritesPageProps {
    favorites: Album[];
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites }) => {
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

export default FavoritesPage; 