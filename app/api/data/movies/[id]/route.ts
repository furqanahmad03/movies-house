import clientPromise from '../../../util/mongoClient';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('Fetching movie data');
    const { id } = await params;
    
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid movie ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });
    
    if (!movie) {
      return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching movie', error }, { status: 500 });
  }
} 