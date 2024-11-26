'use client';

import { Button, Empty, Modal, Popconfirm, Select } from 'antd';
import Input from 'antd/es/input/Input';
import * as d3 from 'd3';
import { useEffect, useState, use } from 'react';
import './style.css';

import { GraphChart } from '@/app/components/graphChart/graphChart';
import { Edges, Node } from '@/app/interface';
import { LoadingOutlined } from '@ant-design/icons';
import { PageHeader } from '@/app/components/pageHeader/pageHeader';
import { SearchField } from '@/app/components/searchField/searchField';
import { regularNodeSize, searchedNodeSize } from '@/constants';
import { generateRandomString } from '@/helpers';
import { fetchSingleGraphs } from '@/apiUrls';

export interface NodeWithIndex extends Node {
  index: number;
}

const changeTheSizeOfNode = (
  node: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
  label: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
  size: number,
) => {
  node.transition().duration(500).ease(d3.easeCubicInOut).attr('r', size);
  label.style('display', size === searchedNodeSize ? 'none' : 'unset');
};

const Graph = ({ params }) => {
  const resolvedParams = use(params) as { id: string };
  const graphId = resolvedParams?.id || '';
  const [data, setData] = useState<{
    nodes: Node[];
    edges: Edges[];
    name: string;
  }>({
    nodes: [],
    edges: [],
    name: '',
  });

  const [searchedLabel, setSearchedLabel] = useState('');
  // IF USER SEARCHES THE NODES THROUGH SEARCH BAR BY CLICKING ON IT
  const [searchedNodes, setSearchedNodes] = useState<Node[]>([]);
  // IF USER SELECTS THE NODE BY CLICKING ON IT
  const [selectedNode, setSelectedNode] = useState<NodeWithIndex | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isAddNodeModalOpen, setIsAddNodeModalOpen] = useState(false);
  const [isEditNodeModalOpen, setIsEditNodeModalOpen] = useState(false);

  const [isAddNodeFieldEmpty, setIsAddGraphFieldEmpty] = useState(false);
  const [isEditNodeFieldEmpty, setIsEditNodeFieldEmpty] = useState(false);

  const [newNodeName, setNewNodeName] = useState<string>('');
  const [toBeConnectedNode, setToBeConnectedNode] = useState<string>('nd_1');
  const [editedNodeName, setEditNodeName] = useState<string>('');

  useEffect(() => {
    fetch(fetchSingleGraphs(graphId))
      .then((res) => res.json())
      .then(({ data, name }) => {
        if (data.nodes.length)
          GraphChart({ nodes: data.nodes, edges: data.edges }, onNodeClick);
        setData({ nodes: data.nodes, edges: data.edges, name: name });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    return () => {
      const element = document.getElementById('force-chart');
      if (element) element.remove();
    };
  }, [graphId]);

  // TO UPDATE THE GRAPGH ON UPDATING THE GRAPH NODES
  useEffect(() => {
    if (data.nodes.length)
      GraphChart({ nodes: data.nodes, edges: data.edges }, onNodeClick);
  }, [data]);

  const onNodeClick = (clickedNode: NodeWithIndex) => {
    const filteredNode = data.nodes.find((node) => node.id === clickedNode.id);
    if (filteredNode) {
      const node = d3.select(`#node-${filteredNode.id}`);
      const label = d3.select(`#label-${filteredNode.id}`);
      if (!node.empty()) {
        changeTheSizeOfNode(node, label, searchedNodeSize);
      }
      // SAVING THE INDEX SO THAT I DON'T HAVE TO FIND THE NODE AND MAKE CHANGE IN IT
      // RATHER DIRECTLY MUTATE THE INDEX
      setSelectedNode({ ...filteredNode, index: clickedNode.index });
      setEditNodeName(filteredNode?.label);
      setIsEditNodeModalOpen(true);
    }
  };

  const updateGraph = () => {
    const nodeId = selectedNode?.id;
    const nodes = data.nodes.filter((node) => node.id !== nodeId);
    const edges = data.edges.filter((edge) => {
      return edge.source !== nodeId && edge.target !== nodeId;
    });
    // MAKE AN API CALL TO BACKEND TO DELETE NODE FROM DB
    // SINCE I HAVE NO DATABASE SO NOT MAKING AN API CALL
    setData((prev) => ({ ...prev, nodes, edges }));
    setSelectedNode(null);
    setToBeConnectedNode('nd_1');
  };

  const createNode = () => {
    if (newNodeName.length === 0) setIsAddGraphFieldEmpty(true);
    else {
      const randomId = generateRandomString();
      setIsAddGraphFieldEmpty(false);
      // MAKE AN API CALL TO BACKEND TO CREATE NODE IN DB
      // SINCE I HAVE NO DATABASE SO NOT MAKING AN API CALL
      setData((prev) => {
        return {
          ...prev,
          nodes: [
            ...prev.nodes,
            {
              id: randomId,
              label: newNodeName,
              group: prev.nodes.length + 1,
            },
          ],
          edges: [
            ...prev.edges,
            { source: randomId, target: toBeConnectedNode },
          ],
        };
      });

      setSelectedNode(null);
      setSearchedNodes([]);
      setSearchedLabel('');
      setNewNodeName('');
      setIsAddNodeModalOpen(false);
      setToBeConnectedNode('nd_1');
    }
  };

  const EditNode = () => {
    if (editedNodeName.length === 0) setIsEditNodeFieldEmpty(true);
    else {
      if (selectedNode) {
        const nodeTitle = d3.select(`#label-${selectedNode.id}`);
        if (!nodeTitle.empty()) {
          nodeTitle.text(editedNodeName);
          const newNodes = [...data.nodes];
          newNodes[selectedNode.index] = {
            id: selectedNode.id,
            label: editedNodeName,
            group: selectedNode.group,
          };
          // MAKE AN API CALL TO BACKEND TO UPDATE DATA IN DB
          // SINCE I HAVE NO DATABASE SO NOT MAKING AN API CALL
          setData((prev) => ({ ...prev, nodes: newNodes }));
          setSelectedNode(null);
          setSearchedNodes([]);
          setSearchedLabel('');
        }
      }
      setIsEditNodeModalOpen(false);
    }
  };

  const changeSizeOfNodeOnSearch = (nodes: Node[], sizeToMove: number) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = d3.select(`#node-${nodes[i].id}`);
      const label = d3.select(`#label-${nodes[i].id}`);
      if (!node.empty()) {
        changeTheSizeOfNode(node, label, sizeToMove);
      }
    }
  };

  const onCancelSearch = () => {
    if (searchedNodes.length) {
      changeSizeOfNodeOnSearch(searchedNodes, regularNodeSize);
    }
    setSearchedNodes([]);
    setSearchedLabel('');
  };

  const onSearchNode = () => {
    if (searchedLabel.length) {
      const filteredNodes = data.nodes.filter((node) => {
        return node.label
          .toLowerCase()
          .includes(searchedLabel.trim().toLowerCase());
      });
      if (filteredNodes.length) {
        changeSizeOfNodeOnSearch(filteredNodes, searchedNodeSize);
        setSearchedNodes(filteredNodes);
      }
    }
  };

  const onCancelDeleteNode = () => {
    setIsEditNodeModalOpen(false);
    setEditNodeName('');
    const node = d3.select(`#node-${selectedNode?.id}`);
    const label = d3.select(`#label-${selectedNode?.id}`);
    if (!node.empty()) {
      changeTheSizeOfNode(node, label, regularNodeSize);
    }
  };

  const onConfirmDeleteNode = () => {
    setIsEditNodeModalOpen(false);
    setEditNodeName('');
    setSearchedNodes([]);
    setSearchedLabel('');

    updateGraph();
  };

  if (isLoading) {
    return <LoadingOutlined />;
  }

  if (!data.nodes.length) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  const nodesToConnect = data.nodes.map((node) => ({
    value: node.id,
    label: <span>{node.label}</span>,
  }));

  return (
    <>
      <PageHeader
        heading={data.name}
        RightContent={() => (
          <Button
            type="primary"
            onClick={() => setIsAddNodeModalOpen(true)}
            id="add-node-button"
          >
            Add Node
          </Button>
        )}
      />

      <SearchField
        id="search-nodes"
        searchButtonId="search-node-button"
        value={searchedLabel}
        onChange={(v: string) => {
          onCancelSearch();
          setSearchedLabel(v);
        }}
        onCancelSearch={onCancelSearch}
        onSearch={onSearchNode}
        placeholder="Node label"
      />

      <Modal
        title="Add Graph"
        open={isAddNodeModalOpen}
        onOk={createNode}
        onCancel={() => {
          setIsAddNodeModalOpen(false);
          setNewNodeName('');
        }}
        okButtonProps={{ id: 'add-node-submit-button' }}
      >
        <div className="add-node-modal-container">
          <Input
            id="add-node-input-field"
            placeholder="Node Name"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            status={isAddNodeFieldEmpty ? 'error' : ''}
          />
          <Select
            id="other-nodes"
            options={nodesToConnect}
            style={{ width: '100%' }}
            onChange={(v: string) => setToBeConnectedNode(v)}
            placeholder="Select node to connect the added node"
          />
        </div>
      </Modal>

      <Modal
        title={selectedNode?.label}
        open={isEditNodeModalOpen}
        onCancel={onCancelDeleteNode}
        footer={[
          <Button key="back" onClick={EditNode} id="edit-node-button">
            Edit
          </Button>,
          <Popconfirm
            key="delete-node"
            title="Delete Node"
            description="Are you sure to delete this Node?"
            okText="Yes"
            cancelText="No"
            onCancel={onCancelDeleteNode}
            onConfirm={onConfirmDeleteNode}
          >
            <Button key="submit" type="primary" onClick={() => {}}>
              Delete
            </Button>
          </Popconfirm>,
        ]}
      >
        <Input
          id="edit-node-label-field"
          placeholder="Node Name"
          value={editedNodeName}
          onChange={(e) => setEditNodeName(e.target.value)}
          status={isEditNodeFieldEmpty ? 'error' : ''}
        />
      </Modal>

      <div id="force-chart" />
    </>
  );
};

export default Graph;