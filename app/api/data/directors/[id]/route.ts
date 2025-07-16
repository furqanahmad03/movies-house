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
      return NextResponse.json({ message: 'Invalid director ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    
    const director = await db.collection('directors').findOne({ _id: new ObjectId(id) });
    
    if (!director) {
      return NextResponse.json({ message: 'Director not found' }, { status: 404 });
    }

    return NextResponse.json(director);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching director', error }, { status: 500 });
  }
} 