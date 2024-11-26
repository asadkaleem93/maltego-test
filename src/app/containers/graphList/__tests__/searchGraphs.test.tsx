import { searchGraphsFromNodes } from '../helper';

import '@testing-library/jest-dom';

describe('searchGraphsFromNodes', () => {
  const sampleGraphs = [
    {
      id: 'grph_1',
      name: 'Graph 1',
      data: {
        nodes: [
          {
            id: 'nd_1',
            label: 'Node 1',
            group: 1,
          },
          {
            id: 'nd_2',
            label: 'Node 2',
            group: 2,
          },
          {
            id: 'nd_3',
            label: 'Node 3',
            group: 3,
          },
          {
            id: 'nd_4',
            label: 'Node 4',
            group: 4,
          },
          {
            id: 'nd_5',
            label: 'Node 5',
            group: 5,
          },
          {
            id: 'nd_6',
            label: 'Node 6',
            group: 6,
          },
          {
            id: 'nd_7',
            label: 'Node 7',
            group: 7,
          },
          {
            id: 'nd_8',
            label: 'Node 8',
            group: 8,
          },
          {
            id: 'nd_9',
            label: 'Node 9',
            group: 9,
          },
          {
            id: 'nd_10',
            label: 'Node 10',
            group: 10,
          },
          {
            id: 'nd_11',
            label: 'Node 11',
            group: 11,
          },
          {
            id: 'nd_12',
            label: 'Node 12',
            group: 12,
          },
        ],
        edges: [
          {
            source: 'nd_1',
            target: 'nd_2',
          },
          {
            source: 'nd_1',
            target: 'nd_3',
          },
          {
            source: 'nd_1',
            target: 'nd_4',
          },
          {
            source: 'nd_2',
            target: 'nd_12',
          },
          {
            source: 'nd_3',
            target: 'nd_11',
          },
          {
            source: 'nd_4',
            target: 'nd_10',
          },
          {
            source: 'nd_5',
            target: 'nd_9',
          },
          {
            source: 'nd_6',
            target: 'nd_8',
          },
          {
            source: 'nd_7',
            target: 'nd_4',
          },
        ],
      },
    },
    {
      id: 'grph_2',
      name: 'Graph 2',
      data: {
        nodes: [
          {
            id: 'nd_1',
            label: 'Node 1',
            group: 1,
          },
          {
            id: 'nd_2',
            label: 'Node 2',
            group: 2,
          },
        ],
        edges: [
          {
            source: 'nd_1',
            target: 'nd_2',
          },
        ],
      },
    },
    {
      id: 'grph_3',
      name: 'Graph 3',
      data: {
        nodes: [
          {
            id: 'nd_1',
            label: 'Node 1',
            group: 1,
          },
          {
            id: 'nd_2',
            label: 'Node 2',
            group: 2,
          },
          {
            id: 'nd_3',
            label: 'Node 3',
            group: 3,
          },
          {
            id: 'nd_4',
            label: 'Node 4',
            group: 4,
          },
          {
            id: 'nd_5',
            label: 'Node 5',
            group: 5,
          },
          {
            id: 'nd_6',
            label: 'Node 6',
            group: 6,
          },
        ],
        edges: [
          {
            source: 'nd_1',
            target: 'nd_2',
          },
          {
            source: 'nd_1',
            target: 'nd_3',
          },
          {
            source: 'nd_1',
            target: 'nd_4',
          },
          {
            source: 'nd_1',
            target: 'nd_5',
          },
        ],
      },
    },
  ];

  it('should return multiple graphs if multiple graphs match the search term', () => {
    const result = searchGraphsFromNodes(sampleGraphs, 'Node 6');
    // SAMPLE GRAPH [1] DOES NOT HAVE NODE 6
    expect(result).toHaveLength(2);
    expect(result).toContain(sampleGraphs[0]);
    expect(result).toContain(sampleGraphs[2]);
  });

  it('should return empty array if no nodes match the search term', () => {
    const result = searchGraphsFromNodes(sampleGraphs, 'Non-existent Node');
    expect(result).toHaveLength(0);
  });

  it('should be case insensitive when matching the search term', () => {
    const result = searchGraphsFromNodes(sampleGraphs, 'node 1');

    expect(result).toHaveLength(3);
    expect(result).toContain(sampleGraphs[0]);
    expect(result).toContain(sampleGraphs[1]);
    expect(result).toContain(sampleGraphs[2]);
  });

  it('should return an empty array if the input data is empty', () => {
    const result = searchGraphsFromNodes([], 'Node 1');

    expect(result).toHaveLength(0);
  });
});
