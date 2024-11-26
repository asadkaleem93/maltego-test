import { NextResponse } from 'next/server';
import { graphs } from '../graphsList';

// GENERALY WE HAVE ERROR STATES BUT SINCE THERE IS NO QUERY AND WE ARE USING STATIC DATA SO THERE IS NO ERROR STATE CREATED
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
    // SINCE WE ARE NOT ACTUALLY CREATING A NODE ON BE SO I AM JUST SEND LENGTH + 1, EVEN THOUGH IT IS NOT BEING USED
    // IN REALITY THIS SHOULD BE USED
    { message: 'Graph deleted successfully', graphId: `grph_${graphs.length + 1}` },
    { status: 200 },
  );
}
