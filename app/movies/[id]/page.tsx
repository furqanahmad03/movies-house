import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

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

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getMovieData(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Fetch movie data
    const movieRes = await fetch(`${baseUrl}/api/data/movies/${id}`);
    if (!movieRes.ok) {
      if (movieRes.status === 404) return null;
      throw new Error('Failed to fetch movie');
    }
    const movie = await movieRes.json();

    // Fetch director and genre data
    const [directorRes, genreRes] = await Promise.all([
      fetch(`${baseUrl}/api/data/directors/${movie.directorId}`),
      fetch(`${baseUrl}/api/data/genres/${movie.genreId}`)
    ]);

    const director = directorRes.ok ? await directorRes.json() : null;
    const genre = genreRes.ok ? await genreRes.json() : null;

    return { movie, director, genre };
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return null;
  }
}

// Static Site Generation: Pre-generate pages for all movies
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const moviesRes = await fetch(`${baseUrl}/api/data/movies`);
    if (!moviesRes.ok) {
      console.error('Failed to fetch movies for static generation');
      return [];
    }
    
    const movies = await moviesRes.json();
    
    return movies.map((movie: Movie) => ({
      id: movie._id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const data = await getMovieData(id);
  
  if (!data || !data.movie) return notFound();
  
  const { movie, director, genre } = data;

  return (
    <div className="flex justify-center items-start min-h-[70vh] !py-10 px-2">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-gray-200 shadow-md rounded-2xl !py-6 !px-8">
        <CardHeader className="pb-2">
          <Link href="/movies" className="text-primary underline hover:text-primary/80 text-sm mb-2 inline-block">← Back to Movies</Link>
          <CardTitle className="text-2xl font-bold mb-2 flex items-center gap-2">
            {movie.title}
            <span className="text-base font-normal text-gray-400">({movie.releaseYear})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="flex flex-wrap gap-4 items-center">
            <span className="bg-blue-100 text-blue-700 border border-blue-200 rounded-full !px-3 !py-1 text-xs font-medium">
              {genre?.name || "Unknown Genre"}
            </span>
            <span className="bg-green-100 text-green-700 border border-green-200 rounded-full !px-3 !py-1 text-xs font-medium">
              <span className="font-semibold">Director:</span>{' '}
              {director ? (
                <Link href={`/directors/${director._id}`} className="underline hover:text-green-800 transition">
                  {director.name}
                </Link>
              ) : (
                "Unknown"
              )}
            </span>
            <span className="bg-yellow-100 text-yellow-700 border border-yellow-200 rounded-full !px-3 !py-1 text-xs font-medium">
              ⭐ {movie.rating}/10
            </span>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-1 !mt-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{movie.description}</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}

export const dynamicParams = false;