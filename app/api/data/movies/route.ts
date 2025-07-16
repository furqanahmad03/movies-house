import clientPromise from '../../util/mongoClient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const movies = await db.collection('movies').find({}).toArray();
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching movies', error }, { status: 500 });
  }
} 