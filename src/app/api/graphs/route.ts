import { NextResponse } from 'next/server';
import { graphs } from '../graphsList';

export async function GET() {
  return NextResponse.json(graphs);
}

export async function PATCH(
  // request: Request,
  // { params }: { params: { id: string } },
) {
  // const data = await request.json();
  // Add this graph in the list of graphs in DB
  return NextResponse.json(
    { message: 'Graph deleted successfully', graphId: `grph_${graphs.length + 1}` },
    { status: 200 },
  );
}
