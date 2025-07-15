import MovieGrid from "../components/MovieGrid";
import data from '@/public/data.json';

export default function Home() {
  const movies = data["movies"].sort((a, b) => b.rating - a.rating).slice(0, 3);
  return (
    <div>
      <h1 className="top-rated-heading">Top Rated Movies</h1>
      <div className="movie-grid-container">
        <MovieGrid movies={movies} genres={data.genres} directors={data.directors} />
      </div>
    </div>
  );
}
