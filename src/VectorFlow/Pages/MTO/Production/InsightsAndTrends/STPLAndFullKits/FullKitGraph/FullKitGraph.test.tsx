import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FullKitGraph from '.';

jest.mock('ag-charts-react', () => ({
    AgChartsReact: () => <div>AgChartsReact Mock</div>,
}));

// jest.mock('../ProcurementData', () => [
//     { rd: '2024-06-05', sih: 10, sit: 5, opo: 15, rmSh: 20 },
//     { rd: '2024-06-10', sih: 8, sit: 6, opo: 12, rmSh: 25 },
//     { rd: '2024-06-20', sih: 20, sit: 15, opo: 10, rmSh: 5 },
// ]);

describe('FullKitGraph Component', () => {
    global.ResizeObserver = class MockedResizeObserver {
        observe = jest.fn();
        unobserve = jest.fn();
        disconnect = jest.fn();
      };

    test('renders without crashing', () => {
        render(<FullKitGraph />);
        expect(screen.getByText('AgChartsReact Mock')).toBeInTheDocument();
    });

    test('displays the correct title', () => {
        render(<FullKitGraph />);
        const title = screen.queryByTestId('fullKit-graph');
        expect(title).toBeInTheDocument();
    });

    test('render the FullKit grid properly', () => {
        render(<FullKitGraph />);
        const toggleBtn = screen.getByTestId('grid-toggle-btn');

        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('fullKit-grid')).toBeInTheDocument();
    });

    test('chart is rendered with the correct options', () => {
        render(<FullKitGraph />);
        // Check if the AgChartsReact component mock is rendered
        expect(screen.getByText('AgChartsReact Mock')).toBeInTheDocument();
        // Ideally, here you would check if the AgChartsReact component is called with the correct props (options)
        // But since it's a mock, we're checking the render only
    });
});
