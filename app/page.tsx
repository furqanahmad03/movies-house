'use client'

import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const moviesData = await fetch('/api/data/movies');
      const moviesParsedData = await moviesData.json();
      setMovies(moviesParsedData.sort((a: any, b: any) => b.rating - a.rating).slice(0, 3));
      const genresData = await fetch('/api/data/genres');
      const genresParsedData = await genresData.json();
      setGenres(genresParsedData);
      const directorsData = await fetch('/api/data/directors');
      const directorsParsedData = await directorsData.json();
      setDirectors(directorsParsedData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-3xl text-center !mt-10">Top Rated Movies</h1>
      <div className="movie-grid-container">
        <MovieGrid movies={movies} genres={genres} directors={directors} />
      </div>
    </div>
  );
}
