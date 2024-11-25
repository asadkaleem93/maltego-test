import { Button, Input } from 'antd';

import './style.css';

export const SearchField = ({
  id,
  value,
  onChange,
  onSearch,
  placeholder,
  onCancelSearch,
}: {
  id: string;
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
        />
        <Button type="primary" onClick={onSearch}>
          Search
        </Button>
        <Button type="primary" onClick={onCancelSearch}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
