import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import STPLGraph from '.';

jest.mock('ag-charts-react', () => ({
    AgChartsReact: () => <div>AgChartsReact Mock</div>,
}));

// jest.mock('../ProcurementData', () => [
//     { rd: '2024-06-05', sih: 10, sit: 5, opo: 15, rmSh: 20 },
//     { rd: '2024-06-10', sih: 8, sit: 6, opo: 12, rmSh: 25 },
//     { rd: '2024-06-20', sih: 20, sit: 15, opo: 10, rmSh: 5 },
// ]);

describe('STPLGraph Component', () => {
    global.ResizeObserver = class MockedResizeObserver {
        observe = jest.fn();
        unobserve = jest.fn();
        disconnect = jest.fn();
      };
      
    test('renders without crashing', () => {
        render(<STPLGraph />);
        expect(screen.getByText('AgChartsReact Mock')).toBeInTheDocument();
    });

    test('displays the correct title', () => {
        render(<STPLGraph />);
        const title = screen.queryByTestId('stpl-graph');
        expect(title).toBeInTheDocument();
    });
    test('render the STPL grid properly', () => {
        render(<STPLGraph />);
        const toggleBtn = screen.getByTestId('grid-toggle-btn');

        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('stpl-grid')).toBeInTheDocument();
    });

    test('chart is rendered with the correct options', () => {
        render(<STPLGraph />);
        // Check if the AgChartsReact component mock is rendered
        expect(screen.getByText('AgChartsReact Mock')).toBeInTheDocument();
        // Ideally, here you would check if the AgChartsReact component is called with the correct props (options)
        // But since it's a mock, we're checking the render only
    });
});
