import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

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

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getData() {
  const filePath = path.join(process.cwd(), "public/data.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContents);
}

export async function generateStaticParams() {
  const data = await getData();
  return data.movies.map((movie: Movie) => ({
    id: movie.id.toString(),
  }));
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const data = await getData();
  
  const movie = data.movies.find((m: Movie) => m.id === id);
  if (!movie) return notFound();

  const director = data.directors.find((d: Director) => d.id === movie.directorId);
  const genre = data.genres.find((g: Genre) => g.id === movie.genreId);

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <Link href="/movies" style={{ display: "inline-block", marginBottom: "16px", color: "black" }}>
        ← Back to Movies
      </Link>
      <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>
        {movie.title} ({movie.releaseYear})
      </h1>
      <p style={{ margin: "12px 0" }}><strong>Genre:</strong> {genre?.name || "Unknown"}</p>
      <p><strong>Director:</strong> {director?.name || "Unknown"}</p>
      <p style={{ margin: "12px 0" }}><strong>Description:</strong> {movie.description}</p>
      <p><strong>Rating:</strong> ⭐ {movie.rating}/10</p>
    </div>
  );
}

export const dynamicParams = false;