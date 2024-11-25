import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SearchField } from '../searchField';

describe('Component', () => {
  it('Renders a heading', () => {
    render(
      <SearchField
        id="search-nodes"
        value={'node'}
        onChange={(v: string) => {}}
        onCancelSearch={() => {}}
        onSearch={() => {}}
        placeholder="Node label"
      />,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('node');
  });
});
