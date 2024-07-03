import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RMPMOrderwiseCoverage from './index';


jest.mock('./GridView/GridView', () => ({
    __esModule: true,
    default: () => <div>GridView Mock</div>,
}));

jest.mock('./GraphView/GraphView', () => ({
    __esModule: true,
    default: () => <div>GraphView Mock</div>,
}));

describe('RMPM Component', () => {
    test('renders GraphView by default', () => {
        render(<RMPMOrderwiseCoverage />);
        expect(screen.getByText('GraphView Mock')).toBeInTheDocument();
    });

    test('switches to GridView when the Grid View button is clicked', () => {
        render(<RMPMOrderwiseCoverage />);
        fireEvent.click(screen.getByText('Grid View'));
        expect(screen.getByText('GridView Mock')).toBeInTheDocument();
    });
}
);

