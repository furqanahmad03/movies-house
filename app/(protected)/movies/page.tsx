import MovieFilter from '../../../components/MovieFilter';

export const revalidate = 5;

async function getMoviesData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const [moviesRes, genresRes, directorsRes] = await Promise.all([
      fetch(`${baseUrl}/api/data/movies`),
      fetch(`${baseUrl}/api/data/genres`),
      fetch(`${baseUrl}/api/data/directors`)
    ]);

    const movies = await moviesRes.json();
    const genres = await genresRes.json();
    const directors = await directorsRes.json();

    return { movies, genres, directors };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { movies: [], genres: [], directors: [] };
  }
}

export default async function Page() {
  const data = await getMoviesData();

  return (
    <>
      <MovieFilter
        initialMovies={data.movies}
        genres={data.genres}
        directors={data.directors}
      />
    </>
  );
} 