import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppRouter from './components/AppRouter';
import './App.css';

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
        <AppRouter
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
    );
}

export default App; 