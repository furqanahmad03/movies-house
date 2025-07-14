import React from 'react'
import data from "../../../data.json";
import Link from "next/link";
import Navbar from '@/components/Navbar';

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

type Params = {
  params: {
    id: string;
  };
};

const page = ({ params }: Params) => {
  const movie = data.movies.find((m) => m.id === params.id);
  const director = data.directors.find((d) => d.id === movie?.directorId);
  const genre = data.genres.find((g) => g.id === movie?.genreId);

  if (!movie) {
    return (
      <>
        <Navbar />
        <div>Movie not found</div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
        <Link href="/" style={{ display: "inline-block", marginBottom: "16px", color: "black" }}>
          ← Back
        </Link>
        <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>
          {movie.title} ({movie.releaseYear})
        </h1>
        <p style={{ margin: "12px 0" }}><strong>Genre:</strong> {genre?.name || "Unknown"}</p>
        <p><strong>Director:</strong> {director?.name || "Unknown"}</p>
        <p style={{ margin: "12px 0" }}><strong>Description:</strong> {movie.description}</p>
        <p><strong>Rating:</strong> ⭐ {movie.rating}/10</p>
      </div>
    </>
  )
}

export default page;