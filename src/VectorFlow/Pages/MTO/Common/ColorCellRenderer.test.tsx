
import { render, screen } from '@testing-library/react';
import ColorCellRenderer from './ColorCellRenderer';

describe('Test ColorCellRenderer Component', () => {
    it('renders cell with correct text and color', () => {
        const cellData = {
            data: {
                cp: 'Green',
            },
        };

        render(<ColorCellRenderer {...cellData} />);

        const cellElement = screen.getByText('Green')
        expect(cellElement).toHaveTextContent('Green');
        expect(cellElement).toHaveStyle({ backgroundColor: '#418D18', color: 'white' });
    });
    it('renders cell with correct text and color', () => {
        const cellData = {
            data: {
                cp: 'Red',
            },
        };

        render(<ColorCellRenderer {...cellData} />);

        const cellElement = screen.getByText('Red')
        expect(cellElement).toHaveTextContent('Red');
        expect(cellElement).toHaveStyle({ backgroundColor: '#F04D4D', color: 'white' });
    });
    it('renders cell with correct text and color', () => {
        const cellData = {
            data: {
                cp: 'Black',
            },
        };

        render(<ColorCellRenderer {...cellData} />);

        const cellElement = screen.getByText('Black')
        expect(cellElement).toHaveTextContent('Black');
        expect(cellElement).toHaveStyle({ backgroundColor: '#000000', color: 'white' });
    });
    it('renders cell with correct text and color', () => {
        const cellData = {
            data: {
                cp: 'Yellow',
            },
        };

        render(<ColorCellRenderer {...cellData} />);

        const cellElement = screen.getByText('Yellow')
        expect(cellElement).toHaveTextContent('Yellow');
        expect(cellElement).toHaveStyle({ backgroundColor: '#EBBF2B', color: 'white' });
    });

});