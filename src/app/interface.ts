export type Node = {
  id: string;
  label: string;
  group: number;
};

export type Edges = {
  source: string;
  target: string;
};

export type Graph = {
  id: string;
  name: string;
  data: {
    nodes: Node[];
    edges: Edges[];
  };
};
