import clientPromise from '../../../util/mongoClient';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid genre ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    
    const genre = await db.collection('genres').findOne({ _id: new ObjectId(id) });
    
    if (!genre) {
      return NextResponse.json({ message: 'Genre not found' }, { status: 404 });
    }

    return NextResponse.json(genre);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching genre', error }, { status: 500 });
  }
} 