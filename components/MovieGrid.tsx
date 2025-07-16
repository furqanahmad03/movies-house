"use client";
import Link from "next/link";
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "app/components/ui/card";

type Movie = {
  _id: string;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  directorId: string;
  genreId: string;
};

type Director = {
  _id: string;
  name: string;
  biography: string;
};

type Genre = {
  _id: string;
  name: string;
};


type Props = {
  movies: Movie[];
  genres: Genre[];
  directors: Director[];
};

const MovieGrid = ({ movies, genres, directors }: Props) => {

  const getDirectorName = (id: string) =>
    directors.find((d) => d._id === id)?.name ?? "Unknown";

  const getGenreName = (id: string) =>
    genres.find((g) => g._id === id)?.name ?? "Unknown";

  return (
    <div className="movie-grid-container !p-4 min-h-[70vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <Link className="card-decoration" href={`/movies/${movie._id}`} key={movie._id}>
          <Card className="transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-gray-200 rounded-2xl shadow-md overflow-hidden !p-4">
            <CardHeader className="!p-2 border-b rounded-md border-gray-200 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center justify-between">
                <CardTitle className="text-md font-bold text-gray-900 flex items-center gap-2">
                  {movie.title}
                  <span className="year text-gray-400 text-base font-normal">({movie.releaseYear})</span>
                </CardTitle>
                <span className="!px-2 !py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 ml-2">
                  {getGenreName(movie.genreId)}
                </span>
              </div>
              <CardDescription className="mt-2 text-gray-500 line-clamp-2">
                {movie.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="py-4 px-2 grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="font-bold text-gray-700">Director:</div>
              <div className="truncate italic">{getDirectorName(movie.directorId)}</div>
            </CardContent>
            <CardFooter className="flex justify-end items-center px-2 pb-3 pt-0">
              <span className="text-yellow-500 font-semibold text-lg">⭐ {movie.rating}/10</span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default MovieGrid