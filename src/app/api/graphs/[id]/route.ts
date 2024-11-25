import { NextResponse } from 'next/server';
import { graphs } from '../../graphsList';

export async function GET(
  request: Request,
  { params },
) {
  const { id } = params;

  const graph = graphs.find((graph) => graph.id === id);

  if (graph) {
    return NextResponse.json(graph);
  } else {
    return NextResponse.json({ message: 'Graph not found' }, { status: 404 });
  }
}

export async function DELETE(
  // request: Request,
  // { params }: { params: { id: string } },
) {
  // const { id } = params;
  // const selectedGraph = graphs.find((graph) => graph.id === id);

  // This works in case DB is connected and you always have updated graphs when accessed.
  // Right now we don't have DB so we don't have updated data always, so we below peice of code
  // does not work well when you delete the newly added graph. 
  // if (!selectedGraph) {
  //   return NextResponse.json({ message: 'Graph not found' }, { status: 404 });
  // }

  // const updatedGraphs = graphs.filter((graph) => graph.id !== id);

  return NextResponse.json(
    { message: 'Graph deleted successfully' },
    { status: 200 },
  );
}
