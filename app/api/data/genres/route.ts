import clientPromise from '../../util/mongoClient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const genres = await db.collection('genres').find({}).toArray();
    return NextResponse.json(genres);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching genres', error }, { status: 500 });
  }
} 