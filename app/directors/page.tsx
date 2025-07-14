import React from 'react'
import Navbar from '../../components/Navbar'
import data from "../../data.json";
import Link from 'next/link';

const page = () => {
  const directors = data.directors;
  return (
    <>
      <Navbar />
      <div className="movie-grid-container">
        {directors.map((director) => (
          <Link href={`directors/${director.id}`} key={director.id} style={{color: "black", textDecoration: "none"}}>
            <div className="movie-card-grid">
            <h2 className="movie-title">
              {director.name}
            </h2>
            <div>{director.biography}</div>
          </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default page