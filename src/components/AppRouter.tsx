import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './MainPage';
import FavoritesPage from './FavoritesPage';

interface Album {
    id: number;
    title: string;
    cover_image: string;
}

interface AppRouterProps {
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

const AppRouter: React.FC<AppRouterProps> = ({
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
        <Router>
            <Routes>
                <Route path="/" element={
                    <MainPage
                        albums={albums}
                        favorites={favorites}
                        filterYear={filterYear}
                        filterGenre={filterGenre}
                        filterArtist={filterArtist}
                        filterCountry={filterCountry}
                        setFilterYear={setFilterYear}
                        setFilterGenre={setFilterGenre}
                        setFilterArtist={setFilterArtist}
                        setFilterCountry={setFilterCountry}
                        fetchAlbums={fetchAlbums}
                        toggleFavorite={toggleFavorite}
                    />
                } />
                <Route path="/favorites" element={<FavoritesPage favorites={favorites} />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default AppRouter; 