"use client";
import Link from "next/link";
import React, { useState } from "react";

type Movie = {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  directorId: string;
  genreId: string;
};

type Director = {
  id: string;
  name: string;
  biography: string;
};

type Genre = {
  id: string;
  name: string;
};


type Props = {
  movies: Movie[];
  genres: Genre[];
  directors: Director[];
};

const MovieGrid = ({ movies, genres, directors }: Props) => {
  const [type, setType] = useState<"Movies" | "Gneres" | "Directors">("Movies");

  const getDirectorName = (id: string) =>
    directors.find((d) => d.id === id)?.name ?? "Unknown";

  const getGenreName = (id: string) =>
    genres.find((g) => g.id === id)?.name ?? "Unknown";

  return (
    <div className="movie-grid-container">
      {movies.map((movie) => (
        <Link className="card-decoration" href={`/movies/${movie.id}`} key={movie.id}>
          <div className="movie-card-grid">
            <h2 className="movie-title">
              {movie.title} <span className="year">({movie.releaseYear})</span>
            </h2>

            <div className="movie-grid">
              <div><strong>Director:</strong></div>
              <div>{getDirectorName(movie.directorId)}</div>

              <div><strong>Genre:</strong></div>
              <div>{getGenreName(movie.genreId)}</div>

              <div><strong>Description:</strong></div>
              <div>{movie.description}</div>

              <div><strong>Rating:</strong></div>
              <div>⭐ {movie.rating}/10</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieGrid