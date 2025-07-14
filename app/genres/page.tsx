import React from 'react'
import data from '../../data.json';
import Navbar from '../../components/Navbar';

const page = () => {
  const genres = data.genres;
  return (
    <>
      <Navbar />
      <div className="movie-grid-container">
        {genres.map((genre) => (
          <div className="movie-card-grid" key={genre.id}>
            <h2 className="movie-title">
              {genre.name}
            </h2>
          </div>
        ))}
      </div>
    </>
  )
}

export default page