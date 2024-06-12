import { render, screen } from '@testing-library/react';
import ColorCellRenderer from './ColorCellRenderer';

describe('Test ColorCellRenderer Component', () => {
    it('renders cell with correct text and color for Green', () => {
        const cellData = {
            data: {
                cp: 'Green',
            },
        };

        render(<ColorCellRenderer {...cellData} />);

        const cellElement = screen.getByText('Green');
        expect(cellElement).toHaveTextContent('Green');
        expect(cellElement).toHaveStyle({ backgroundColor: 'rgb(65, 141, 24)', color: 'rgb(255, 255, 255)' });
    });

    it('renders cell with correct text and color for Red', () => {
        const cellData = {
            data: {
                cp: 'Red',
            },
        };

        render(<ColorCellRenderer {...cellData} />);

        const cellElement = screen.getByText('Red');
        expect(cellElement).toHaveTextContent('Red');
        expect(cellElement).toHaveStyle({ backgroundColor: 'rgb(240, 77, 77)', color: 'rgb(255, 255, 255)' });
    });

    it('renders cell with correct text and color for Black', () => {
        const cellData = {
            data: {
                cp: 'Black',
            },
        };

        render(<ColorCellRenderer {...cellData} />);

        const cellElement = screen.getByText('Black');
        expect(cellElement).toHaveTextContent('Black');
        expect(cellElement).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)' });
    });

    it('renders cell with correct text and color for Yellow', () => {
        const cellData = {
            data: {
                cp: 'Yellow',
            },
        };

        render(<ColorCellRenderer {...cellData} />);

        const cellElement = screen.getByText('Yellow');
        expect(cellElement).toHaveTextContent('Yellow');
        expect(cellElement).toHaveStyle({ backgroundColor: 'rgb(235, 191, 43)', color: 'rgb(255, 255, 255)' });
    });
});
