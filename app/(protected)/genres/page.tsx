'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

type Genre = {
  _id: string;
  name: string;
};

type Movie = {
  _id: string;
  title: string;
  genreId: string;
};

const Page = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const [genresRes, moviesRes] = await Promise.all([
          fetch(`${baseUrl}/api/data/genres`),
          fetch(`${baseUrl}/api/data/movies`)
        ]);
        
        if (!genresRes.ok || !moviesRes.ok) throw new Error('Failed to fetch data');
        
        const genresData = await genresRes.json();
        const moviesData = await moviesRes.json();
        
        setGenres(genresData);
        setMovies(moviesData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="!p-4 min-h-[70vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {genres.map((genre) => {
        const genreMovies = movies.filter((movie) => movie.genreId.toString() === genre._id.toString());
        return (
          <Card key={genre._id} className="transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col items-center justify-center !p-4">
            <CardHeader className="flex flex-col items-center gap-2 !p-2 border-b rounded-md border-gray-200 bg-gradient-to-r from-primary/5 to-transparent w-full">
              <BookOpen className="text-blue-400 mb-1" size={32} />
              <CardTitle className="text-lg font-bold text-gray-900 text-center">
                {genre.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-4 px-2 w-full">
              {genreMovies.length > 0 ? (
                <div className="flex flex-wrap gap-2 justify-center">
                  {genreMovies.map((movie) => (
                    <Link key={movie._id} href={`/movies/${movie._id}`} className="movie-slug-link">
                      <span className="bg-blue-100 text-blue-700 border border-blue-200 rounded-full !px-3 !py-1 text-xs font-medium hover:bg-blue-200 transition">
                        {movie.title}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-gray-400">No movies in this genre.</span>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Page; 