"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="navbar">
      <Link href='/' className="main-heading">Movie House</Link>
      <div className="nav-buttons">
        <button onClick={() => router.push("/movies")}>Movies</button>
        <button onClick={() => router.push("/genres")}>Genres</button>
        <button onClick={() => router.push("/directors")}>Directors</button>
      </div>
    </nav>
  )
}

export default Navbar