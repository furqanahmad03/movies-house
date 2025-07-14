import Image from "next/image";
import MovieGrid from "../components/MovieGrid";
import data from "../data.json";
import Navbar from "../components/Navbar";

export default function Home() {
  const movies = data["movies"].sort((a, b) => b.rating - a.rating).slice(0, 3);
  return (
    <div>
      <Navbar />
      <h1 className="top-rated-heading">Top Rated Movies</h1>
      <div className="movie-grid-container">
        <MovieGrid movies={movies} genres={data.genres} directors={data.directors} />
      </div>
    </div>
  );
}
