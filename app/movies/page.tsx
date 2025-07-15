import fs from 'fs/promises';
import path from 'path';
import MovieFilter from '@/components/MovieFilter';

export const revalidate = 5;

async function getMoviesData() {
  const filePath = path.join(process.cwd(), 'public/data.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContents);
}

export default async function Page() {
  const data = await getMoviesData();

  return (
    <>
      <p>Page generated at: {new Date().toLocaleTimeString()}</p>
      <MovieFilter
        initialMovies={data.movies}
        genres={data.genres}
        directors={data.directors}
      />
    </>
  );
}
