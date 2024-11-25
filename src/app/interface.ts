export type Nodes = {
  id: string;
  label: string;
  group: number;
};

export type Edges = {
  source: string;
  target: string;
};

export type Graphs = {
  id: string;
  name: string;
  data: {
    nodes: Nodes[];
    edges: Edges[];
  };
};
