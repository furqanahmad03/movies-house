'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type Director = {
  id: string;
  name: string;
  biography: string;
};

type Movie = {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  directorId: string;
  genreId: string;
};

export default function Page() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/data.json');
      const data = await res.json();
      setDirectors(data.directors);
      setMovies(data.movies);
    };

    fetchData();
  }, []);

  return (
    <div className="movie-grid-container">
      {directors.map((director) => (
        <div key={director.id} className="movie-card-grid" style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
          <Link href={`/directors/${director.id}`} style={{ color: 'black', textDecoration: 'none' }}>
            <h2 className="movie-title">{director.name}</h2>
            <div>{director.biography}</div>
          </Link>

          <div className='director-movies-list' style={{ marginTop: '12px' }}>
            {movies
              .filter((movie) => movie.directorId === director.id)
              .map((movie) => (
                <Link key={movie.id} href={`/movies/${movie.id}`} className='movie-slug-link'>
                  <div className="director-movie-slug">{movie.title}</div>
                </Link>
              ))}
          </div>
        </div>

      ))}
    </div>
  );
}
