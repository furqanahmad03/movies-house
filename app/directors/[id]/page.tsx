"use client";

import React from 'react'
import data from "@/public/data.json";
import Link from "next/link";
import { useParams } from 'next/navigation';


const Page = () => {
  // const { id } = await params;
  const params = useParams();
  const director = data.directors.find((d) => d.id === params.id);

  if (!director) {
    return (
      <>
        <div>Director not found</div>
      </>
    )
  }

  return (
    <>
      <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
        <Link href="/directors" style={{ display: "inline-block", marginBottom: "16px", color: "black" }}>
          ← Back to Directors
        </Link>
        <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>
          {director.name}
        </h1>
        <p style={{ margin: "12px 0" }}><strong>Biography:</strong> {director.biography}</p>
      </div>
    </>
  )
}

export default Page;