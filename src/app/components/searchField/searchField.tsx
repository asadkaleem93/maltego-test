import { Button, Input } from 'antd';

import './style.css';

export const SearchField = ({
  value,
  onChange,
  onSearch,
  placeholder,
  onCancelSearch,
}: {
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
