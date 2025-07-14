"use client";
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import data from "../../data.json";
import MovieGrid from '@/components/MovieGrid';

const Page = () => {
  const [movies, setMovies] = useState(data["movies"]);
  const [userInput, setUserInput] = useState<string>('');
  const [genre, setGenre] = useState('');
  const [minRating, setMinRating] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    let filtered = [...data.movies];

    if (userInput.trim()) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(userInput.toLowerCase())
      );
    }

    if (genre) {
      filtered = filtered.filter((movie) => movie.genreId === genre);
    }

    const ratingNum = parseFloat(minRating);
    if (!isNaN(ratingNum)) {
      filtered = filtered.filter((movie) => movie.rating >= ratingNum);
    }

    // Year range
    const start = parseInt(startYear);
    const end = parseInt(endYear);

    if (!isNaN(start)) {
      filtered = filtered.filter((movie) => movie.releaseYear >= start);
    }
    if (!isNaN(end)) {
      filtered = filtered.filter((movie) => movie.releaseYear <= end);
    }

    setMovies(filtered);
  }, [userInput, genre, minRating, startYear, endYear]);

  return (
    <div>
      <Navbar />

      <div className="input-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', margin: '24px' }}>
        <input
          type="text"
          onChange={handleInput}
          value={userInput}
          placeholder="Search movies..."
          className="search-input"
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', flex: '1' }}
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="filter-select"
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          <option value="">All Genres</option>
          {data.genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          min={0}
          max={10}
          step="0.1"
          className="filter-rating"
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '120px' }}
        />

        <input
          type="number"
          placeholder="Start year"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          className="filter-year"
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '120px' }}
        />
        <input
          type="number"
          placeholder="End year"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
          className="filter-year"
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '120px' }}
        />
      </div>

      <div className="movie-grid-container">
        <MovieGrid
          movies={movies}
          genres={data.genres}
          directors={data.directors}
        />
      </div>
    </div>
  );
};

export default Page;
