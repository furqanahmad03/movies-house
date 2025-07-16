'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';

type Director = {
  _id: string;
  name: string;
  biography: string;
};

type Movie = {
  _id: string;
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
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const [directorsRes, moviesRes] = await Promise.all([
          fetch(`${baseUrl}/api/data/directors`),
          fetch(`${baseUrl}/api/data/movies`)
        ]);
        
        if (!directorsRes.ok || !moviesRes.ok) throw new Error('Failed to fetch data');
        
        const directorsData = await directorsRes.json();
        const moviesData = await moviesRes.json();
        
        setDirectors(directorsData);
        setMovies(moviesData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="movie-grid-container !p-4 min-h-[70vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {directors.map((director) => (
        <Card key={director._id} className="transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-gray-200 rounded-2xl shadow-md overflow-hidden !p-4">
          <Link href={`/directors/${director._id}`} className="no-underline text-inherit">
            <CardHeader className="!p-2 border-b rounded-md border-gray-200 bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {director.name}
              </CardTitle>
              <CardDescription className="mt-2 text-gray-500 line-clamp-2">
                {director.biography}
              </CardDescription>
            </CardHeader>
          </Link>
          <CardContent className="py-4 px-2">
            <div className="font-semibold text-gray-700 !mb-2">Movies:</div>
            <div className="flex flex-wrap gap-2">
              {movies
                .filter((movie) => movie.directorId.toString() === director._id.toString())
                .map((movie) => (
                  <Link key={movie._id} href={`/movies/${movie._id}`} className="movie-slug-link">
                    <span className="bg-blue-100 text-blue-700 border border-blue-200 rounded-full !px-3 !py-1 text-xs font-medium hover:bg-blue-200 transition">
                      {movie.title}
                    </span>
                  </Link>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 