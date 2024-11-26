import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SearchField } from '../searchField';

describe('Component', () => {
  it('Renders a heading', () => {
    render(
      <SearchField
        id="search-nodes"
        searchButtonId="search-node-button"
        value={'node'}
        onChange={() => {}}
        onCancelSearch={() => {}}
        onSearch={() => {}}
        placeholder="Node label"
      />,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('node');
  });
});
