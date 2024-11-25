import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import GraphsList from '../../../containers/graphList/graphList';
import { PageHeader } from '../pageHeader';

describe('Component', () => {
  it('Renders a heading', () => {
    render(
      <PageHeader
        heading={'Graphs List'}
        RightContent={() => <div>Right side content</div>}
      />,
    );

    const heading = screen.getByRole('heading', { level: 1 });
    const div = screen.getAllByText('Right side content');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Graphs List');
    expect(div[0]).toHaveTextContent('Right side content');
  });
});
