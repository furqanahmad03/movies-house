import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';

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

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getDirectorData(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const directorRes = await fetch(`${baseUrl}/api/data/directors/${id}`);
    if (!directorRes.ok) {
      if (directorRes.status === 404) return null;
      throw new Error('Failed to fetch director');
    }
    const director = await directorRes.json();

    const moviesRes = await fetch(`${baseUrl}/api/data/movies`);
    if (!moviesRes.ok) {
      throw new Error('Failed to fetch movies');
    }
    const allMovies = await moviesRes.json();
    
    const movies = allMovies.filter((movie: Movie) => movie.directorId.toString() === director._id.toString());

    return { director, movies };
  } catch (error) {
    console.error('Error fetching director data:', error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const directorsRes = await fetch(`${baseUrl}/api/data/directors`);
    if (!directorsRes.ok) {
      console.error('Failed to fetch directors for static generation');
      return [];
    }
    
    const directors = await directorsRes.json();
    
    return directors.map((director: Director) => ({
      id: director._id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const data = await getDirectorData(id);
  
  if (!data || !data.director) return notFound();
  
  const { director, movies } = data;

  return (
    <div className="flex justify-center items-start min-h-[70vh] !py-10 !px-2">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-gray-200 shadow-md rounded-2xl !py-6 !px-8">
        <CardHeader className="pb-2">
          <Link href="/directors" className="text-primary underline hover:text-primary/80 text-sm mb-2 inline-block">← Back to Directors</Link>
          <CardTitle className="text-2xl font-bold mb-2">{director.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-1">Biography</h2>
            <p className="text-gray-700 leading-relaxed">{director.biography}</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-1">Movies by {director.name}</h2>
            {movies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {movies.map((movie: Movie) => (
                  <Link key={movie._id} href={`/movies/${movie._id}`} className="movie-slug-link">
                    <span className="bg-blue-100 text-blue-700 border border-blue-200 rounded-full !px-3 !py-1 text-xs font-medium hover:bg-blue-200 transition">
                      {movie.title}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <span className="text-xs text-gray-400">No movies found for this director.</span>
            )}
          </section>
        </CardContent>
      </Card>
    </div>
  );
}

export const dynamicParams = false; 