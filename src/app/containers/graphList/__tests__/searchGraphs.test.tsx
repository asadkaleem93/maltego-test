import { searchGraphsFromNodes } from '../helper';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GraphsList from '../graphList';

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ data: [] }),
//   }),
// );

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

// describe('Graphs List - E2E Test', () => {
//   it('submits the form and shows an error when invalid credentials are entered', async () => {
//     render(<GraphsList />);

//     // Check that fetch was called
//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(fetch).toHaveBeenCalledWith('/api/graphs'); // Change to your actual API call

//     // Optionally, assert the result after fetch completes
//     // For example, if you expect data to render, check for that as well
//     await waitFor(() => screen.getByText('Some text from the fetch response'));

//     // await waitFor(() => screen.getByText(/Graphs List/i));
//     // const heading = screen.getByRole('heading', { level: 1 });
//     // expect(heading).toBeInTheDocument();

//     // // Find the input fields and buttons
//     // const usernameInput = screen.getByLabelText(/username/i);  // Assuming label is "Username"
//     // const passwordInput = screen.getByLabelText(/password/i);  // Assuming label is "Password"
//     // const submitButton = screen.getByRole('button', { name: /login/i });

//     // // Simulate typing into the input fields
//     // fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
//     // fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

//     // // Simulate form submission
//     // fireEvent.click(submitButton);

//     // // Wait for the error message to appear after submission
//     // await waitFor(() => screen.getByText(/invalid credentials/i));

//     // // Assert that the error message appears on the screen
//     // expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
//   });

//   // it('submits the form and redirects to the dashboard when valid credentials are entered', async () => {
//   //     // Render the LoginForm component (assuming login succeeds)
//   //     render(<LoginForm />);

//   //     // Find the input fields and buttons
//   //     const usernameInput = screen.getByLabelText(/username/i);
//   //     const passwordInput = screen.getByLabelText(/password/i);
//   //     const submitButton = screen.getByRole('button', { name: /login/i });

//   //     // Simulate typing into the input fields
//   //     fireEvent.change(usernameInput, { target: { value: 'correctuser' } });
//   //     fireEvent.change(passwordInput, { target: { value: 'correctpassword' } });

//   //     // Simulate form submission
//   //     fireEvent.click(submitButton);

//   //     // Wait for the redirect (or some other effect like showing a success message)
//   //     await waitFor(() => screen.getByText(/welcome to your dashboard/i));

//   //     // Assert that the user is redirected or the success message appears
//   //     expect(screen.getByText(/welcome to your dashboard/i)).toBeInTheDocument();
//   // });
// });
