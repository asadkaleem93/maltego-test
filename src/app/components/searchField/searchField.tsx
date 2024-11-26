import { Button, Input } from 'antd';

import './style.css';
import { CloseCircleOutlined } from '@ant-design/icons';

export const SearchField = ({
  id,
  searchButtonId,
  value,
  onChange,
  onSearch,
  placeholder,
  onCancelSearch,
}: {
  id: string;
  searchButtonId: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: any;
  placeholder: string;
  onCancelSearch: () => void;
}) => {
  return (
    <div className="search-container">
      <div className="search-field">
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          allowClear={{
            clearIcon: <CloseCircleOutlined id="cancel-graphs-search-button" />,
          }}
          onClear={onCancelSearch}
        />
        <Button type="primary" onClick={onSearch} id={searchButtonId}>
          Search
        </Button>
      </div>
    </div>
  );
};
