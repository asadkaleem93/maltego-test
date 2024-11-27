'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, Popconfirm, Table, Tooltip } from 'antd';

import { Graph } from '@/app/interface';
import './style.css';
import Column from 'antd/es/table/Column';
import Link from 'next/link';
import Modal from 'antd/es/modal/Modal';
import {
  DeleteOutlined,
  ExportOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { deleteGraphs, getOrUpdateGraphs } from '@/apiUrls';
import { PageHeader } from '@/app/components/pageHeader/pageHeader';
import { SearchField } from '@/app/components/searchField/searchField';
import { searchGraphsFromNodes } from './helper';

let originalData: Graph[] = [];

const GraphsList: React.FC = () => {
  // SETTING FILTERED GRAPHS IN STATE IS BECAUSE I DON'T WANT TO FILTER THE GRAPHS BEFORE RENDERING THAT IS WHY I KEPT ORIGINAL DATA
  const [graphs, setGraphs] = useState<Graph[]>([]);
  const [searchFileText, setSearchFileText] = useState<string>('');
  const [newGraphName, setNewGraphName] = useState<string>('');

  const [isAddGraphModalOpen, setIsAddGraphModalOpen] = useState(false);
  const [isAddGraphFieldEmpty, setIsAddGraphFieldEmpty] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(getOrUpdateGraphs)
      .then((res) => res.json())
      .then((data) => {
        setGraphs(data);
        originalData = data;
        setIsLoading(false);
      });
  }, []);

  const searchGraphs = () => {
    if (searchFileText.length === 0) setGraphs(originalData);

    const newGraphs = searchGraphsFromNodes(originalData, searchFileText);

    setGraphs(newGraphs);
  };

  const addGraph = () => {
    fetch(getOrUpdateGraphs, {
      method: 'PATCH',
      body: JSON.stringify({
        graphName: newGraphName,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        const newGraph = {
          id: `grph_${originalData.length + 1}`,
          name: newGraphName,
          data: {
            nodes: [],
            edges: [],
          },
        };
        setGraphs((prev) => [...prev, newGraph]);
        originalData = [...originalData, newGraph];
        clearSearchField();
        setNewGraphName('');
      });
  };

  const clearSearchField = () => {
    setGraphs(originalData);
    setSearchFileText('');
  };

  const deleteGraph = (graphId: string) => {
    fetch(deleteGraphs(graphId), {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        const filteredGraphs = originalData.filter(
          (graph) => graph.id !== graphId,
        );
        originalData = [...filteredGraphs];
        clearSearchField();
      });
  };

  const onCancelSearch = () => {
    if (searchFileText.length) clearSearchField();
  };

  const checkIfAddGraphFieldEmpty = () => {
    if (newGraphName.length === 0) setIsAddGraphFieldEmpty(true);
    else {
      setIsAddGraphFieldEmpty(false);
      addGraph();
      setIsAddGraphModalOpen(false);
    }
  };

  if (isLoading) {
    return <LoadingOutlined />;
  }

  return (
    <div>
      <PageHeader
        heading="Graph List"
        RightContent={() => (
          <Button
            type="primary"
            onClick={() => setIsAddGraphModalOpen(true)}
            id="add-graph-button"
          >
            Add Graph
          </Button>
        )}
      />
      <SearchField
        id="search-graphs"
        searchButtonId="search-graphs-button"
        value={searchFileText}
        onChange={(v: string) => setSearchFileText(v)}
        onSearch={searchGraphs}
        placeholder="Search Graph"
        onCancelSearch={onCancelSearch}
      />
      <Table<Graph> dataSource={graphs} pagination={false} id="graphs-table">
        <Column title="Graph Id" dataIndex="id" key="id" />
        <Column title="Graph Name" dataIndex="name" key="name" />
        <Column
          title="Actions"
          dataIndex=""
          key="x"
          render={(row, _, i) => (
            <>
              <Popconfirm
                title="Delete Graph"
                description="Are you sure to delete this Graph?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteGraph(row.id)}
                cancelButtonProps={{ id: 'delete-graph-cancel' }}
                okButtonProps={{ id: 'delete-graph-ok-confirm' }}
              >
                <Tooltip placement="top" title={'Delete Graph'}>
                  <DeleteOutlined
                    id={`delete-graph-${i}`}
                    className="delete-icon"
                  />
                </Tooltip>
              </Popconfirm>

              <Link
                href={`/graph/${row.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Tooltip placement="top" title={'Open Graph'}>
                  <ExportOutlined className="graph-icon" />
                </Tooltip>
              </Link>
            </>
          )}
        />
      </Table>
      <Modal
        title="Add Graph"
        open={isAddGraphModalOpen}
        onOk={checkIfAddGraphFieldEmpty}
        onCancel={() => {
          setIsAddGraphModalOpen(false);
          setNewGraphName('');
        }}
        okButtonProps={{ id: 'add-graph-form-submit-button' }}
      >
        <Input
          id="add-graph-input"
          placeholder="Graph Name"
          value={newGraphName}
          onChange={(e) => setNewGraphName(e.target.value)}
          status={isAddGraphFieldEmpty ? 'error' : ''}
        />
      </Modal>
    </div>
  );
};

export default GraphsList;
