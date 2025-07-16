import clientPromise from '../../util/mongoClient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const directors = await db.collection('directors').find({}).toArray();
    return NextResponse.json(directors);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching directors', error }, { status: 500 });
  }
} 