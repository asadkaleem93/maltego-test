'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, Table } from 'antd';

import { Graphs } from '@/app/interface';
import './style.css';
import Column from 'antd/es/table/Column';
import Link from 'next/link';
import Modal from 'antd/es/modal/Modal';
import {
  DeleteOutlined,
  LoadingOutlined,
  MergeFilled,
} from '@ant-design/icons';
import { deleteGraphs, getOrUpdateGraphs } from '@/apiUrls';
import { PageHeader } from '@/app/components/pageHeader/pageHeader';
import { SearchField } from '@/app/components/searchField/searchField';
import { searchGraphsFromNodes } from './helper';

let originalData: Graphs[] = [];

const GraphsList: React.FC = () => {
  // SETTING FILTERED GRAPHS IN STATE IS BECAUSE I DON'T WANT TO FILTER THE GRAPHS BEFORE RENDERING
  const [graphs, setGraphs] = useState<Graphs[]>([]);
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
        heading="Graphs List"
        RightContent={() => (
          <Button type="primary" onClick={() => setIsAddGraphModalOpen(true)}>
            Add Graph
          </Button>
        )}
      />
      <SearchField
        id="search-graphs"
        value={searchFileText}
        onChange={(v: string) => setSearchFileText(v)}
        onSearch={searchGraphs}
        placeholder="Search Graph"
        onCancelSearch={onCancelSearch}
      />
      <Table<Graphs> dataSource={graphs} pagination={false}>
        <Column title="Graph Id" dataIndex="id" key="id" />
        <Column title="Graph Name" dataIndex="name" key="name" />
        <Column
          title="Actions"
          dataIndex=""
          key="x"
          render={(row) => (
            <>
              <DeleteOutlined
                onClick={() => deleteGraph(row.id)}
                className="delete-icon"
              />

              <Link
                href={`/graph/${row.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MergeFilled className="graph-icon" />
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
      >
        <Input
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
