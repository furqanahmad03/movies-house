"use client";
import React, { useEffect, useState } from 'react';
import MovieGrid from './MovieGrid';

type Movie = {
  _id: string;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  directorId: string;
  genreId: string;
};

type Genre = {
  _id: string;
  name: string;
};

type Director = {
  _id: string;
  name: string;
  biography: string;
};

type Props = {
  initialMovies: Movie[];
  genres: Genre[];
  directors: Director[];
};


const MovieFilter = ({ initialMovies, genres, directors }: Props) => {
  const [movies, setMovies] = useState(initialMovies);
  const [userInput, setUserInput] = useState('');
  const [genre, setGenre] = useState('');
  const [minRating, setMinRating] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    let filtered = [...initialMovies];

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

    const start = parseInt(startYear);
    const end = parseInt(endYear);
    if (!isNaN(start)) filtered = filtered.filter((movie) => movie.releaseYear >= start);
    if (!isNaN(end)) filtered = filtered.filter((movie) => movie.releaseYear <= end);

    setMovies(filtered);
  }, [userInput, genre, minRating, startYear, endYear, initialMovies]);

  return (
    <div>
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
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g._id} value={g._id}>{g.name}</option>
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
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '120px' }}
        />

        <input
          type="number"
          placeholder="Start year"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '120px' }}
        />

        <input
          type="number"
          placeholder="End year"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '120px' }}
        />
      </div>

      <div className="movie-grid-container">
        <MovieGrid movies={movies} genres={genres} directors={directors} />
      </div>
    </div>
  );
}


export default MovieFilter;