'use client';
import * as d3 from 'd3';
import { Edges, Nodes } from '../../interface';
import { NodeWithIndex } from '../../graph/[id]/page';
import { regularNodeSize } from '@/constants';

// interface D3NodeProperties extends Nodes {
//   index: number;
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
// }

// interface D3Nodes {
//   index: number;
//   source: D3NodeProperties;
//   target: D3NodeProperties;
// }

// interface NodesWithSimulation extends d3.SimulationNodeDatum, Nodes {}

export const GraphChart = (
  data: { nodes: Nodes[]; edges: Edges[] },
  onNodeClick: (clickedNode: NodeWithIndex) => void,
) => {
  const oldSvg = d3.select('#force-chart');
  if (oldSvg) {
    oldSvg.selectAll('*').remove();
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // The force simulation mutates edges and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  const edges = data.edges.map((d) => ({ ...d }));
  const nodes = data.nodes.map((d) => ({ ...d }));
  const simulation = d3
    //@ts-expect-error
    .forceSimulation(nodes)
    .force(
      'link',
      d3
        .forceLink(edges)
        .id((d: any) => d.id)
        .distance(() => 100 + Math.sqrt(2.8) * 30),
    )
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))
    .on('tick', ticked);

  const svg = d3
    .select(`#force-chart`)
    .append('svg')
    .attr('id', 'graph-svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto;');

  const link = svg
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll()
    .data(edges)
    .join('line')
    .attr('stroke-width', () => 2.8);

  const node = svg
    .append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll()
    .data(nodes)
    .join('circle')
    .attr('r', regularNodeSize)
    .attr('id', (d) => `node-${d.id}`)
    .attr('fill', (d) => color(d.group.toString()));

  node.call(
    //@ts-expect-error
    d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended),
  );

  const label = svg
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll()
    .data(nodes)
    .join('text');

  label
    .attr('font-size', '14px')
    .attr('fill', '#000')
    .text((d: any) => d.label)
    .attr('id', (d) => `label-${d.id}`);

  function ticked() {
    node
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y)
      .on('click', (d: any, data: any) => {
        onNodeClick({
          group: data.group,
          label: data.label,
          id: data.id,
          index: data.index,
        });
      });

    link
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y);

    label.attr('x', (d: any) => d.x - 20).attr('y', (d: any) => d.y - 20);
  }

  function dragstarted(event: any) {
    if (!event.active) simulation.alphaTarget(0.1).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event: any) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event: any) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
};
