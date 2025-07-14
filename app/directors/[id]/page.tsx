import React from 'react'
import data from "../../../data.json";
import Link from "next/link";
import Navbar from '@/components/Navbar';

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

type Params = {
  params: {
    id: string;
  };
};

const page = ({ params }: Params) => {
  const director = data.directors.find((d) => d.id === params.id);

  if (!director) {
    return (
      <>
        <Navbar />
        <div>Director not found</div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
        <Link href="/" style={{ display: "inline-block", marginBottom: "16px", color: "black" }}>
          ← Back
        </Link>
        <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>
          {director.name}
        </h1>
        <p style={{ margin: "12px 0" }}><strong>Biography:</strong> {director.biography}</p>
      </div>
    </>
  )
}

export default page;