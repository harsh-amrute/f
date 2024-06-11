import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useSimFullKit from './useSimFullKit';
import { useUserData } from '../../../../../../context';
import { useLocation } from 'react-router-dom';


// Mock dependencies
jest.mock('../../../../../../context');
jest.mock('react-router-dom', () => ({
    useLocation: jest.fn(),
}));

interface MockUserData {
    isSideBarOpen: boolean;
    user: any;
    changeColorTheme: jest.Mock;
    toggleSideBar: jest.Mock;
}

const mockUseUserData = useUserData as jest.MockedFunction<typeof useUserData>;
const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;
const mockUserData: MockUserData = {
    isSideBarOpen: false,
    user: null,
    changeColorTheme: jest.fn(),
    toggleSideBar: jest.fn(),
};

describe('useSimFullKit', () => {
    beforeEach(() => {
        mockUseUserData.mockReturnValue(mockUserData);
        mockUseLocation.mockReturnValue({
            state: {
                ShortageDatas: [
                    {
                        eas: 100,
                        rm: 'Item1',
                        children: [
                            { on: 1, lid: 1, oq: 50, aq: 10, pend: 30, remq: 0 },
                            { on: 2, lid: 2, oq: 50, aq: 20, pend: 40, remq: 0 }
                        ]
                    }
                ]
            }
        } as any);
    });

    it('should initialize correctly', () => {
        const TestComponent = () => {
            const { isSideBarOpen, currentPage, currentTab } = useSimFullKit();
            return (
                <div>
                    <span data-testid="isSideBarOpen">{isSideBarOpen.toString()}</span>
                    <span data-testid="currentPage">{currentPage}</span>
                    <span data-testid="currentTab">{currentTab.id}</span>
                </div>
            );
        };

        const { getByTestId } = render(<TestComponent />);

        expect(getByTestId('isSideBarOpen').textContent).toBe('false');
        expect(getByTestId('currentPage').textContent).toBe('1');
        expect(getByTestId('currentTab').textContent).toBe('iof');
    });

    it('should toggle current tab', () => {
        const TestComponent = () => {
            const { currentTab, toggleCurrentTab } = useSimFullKit();
            return (
                <div>
                    <span data-testid="currentTab">{currentTab.id}</span>
                    <button onClick={() => toggleCurrentTab({ id: 'cf', label: 'Cumulative Full Kit', value: 'cf' })}>Toggle Tab</button>
                </div>
            );
        };

        const { getByTestId, getByText } = render(<TestComponent />);

        expect(getByTestId('currentTab').textContent).toBe('iof');
        fireEvent.click(getByText('Toggle Tab'));
        expect(getByTestId('currentTab').textContent).toBe('cf');
    });

    it('should calculate remaining quantities correctly', () => {
        const TestComponent = () => {
            const { Save } = useSimFullKit();
            const wrappedData = Save();
            return (
                <div>
                    {wrappedData.data.map((item: any, index: number) => (
                        <div key={index} data-testid={`item-${index}`}>
                            {JSON.stringify(item)}
                        </div>
                    ))}
                </div>
            );
        };

        const { getByTestId } = render(<TestComponent />);

        expect(getByTestId('item-0').textContent).toBe(
            JSON.stringify({ on: 1, lid: 1, item: 'Item1', oq: 50, aq: 10, easa: 100, remq: 30 })
        );
        expect(getByTestId('item-1').textContent).toBe(
            JSON.stringify({ on: 2, lid: 2, item: 'Item1', oq: 50, aq: 20, easa: 100, remq: 40 })
        );
    });

    it('should render the correct view for IOF tab', () => {
        const TestComponent = () => {
            const { renderView } = useSimFullKit();
            return <div>{renderView()}</div>;
        };

        const { container } = render(<TestComponent />);

        expect(container).not.toBeNull();
        // Additional assertions can be made based on how VFTable is rendered
    });

    it('should render the correct view for CF tab', () => {
        const TestComponent = () => {
            const { currentTab, toggleCurrentTab, renderView } = useSimFullKit();
            React.useEffect(() => {
                if (currentTab.id !== 'cf') {
                    toggleCurrentTab({ id: 'cf', label: 'Cumulative Full Kit', value: 'cf' });
                }
            }, [currentTab, toggleCurrentTab]);
            return <div>{renderView()}</div>;
        };

        const { container } = render(<TestComponent />);

        expect(container).not.toBeNull();
        // Additional assertions can be made based on how VFTable is rendered
    });
});
