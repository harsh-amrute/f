import { renderHook, act } from '@testing-library/react-hooks';
import useSimFullKit from './useSimFullKit';
import { useUserData } from '../../../../../../context';
import { useLocation } from 'react-router-dom';
import GetSimulateFullKitHeader from './GetSimulateFullKitHeader.json';
import GetSimulateFullKitData from './GetSimulateFullKitData.json';

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
        const { result } = renderHook(() => useSimFullKit());

        expect(result.current.isSideBarOpen).toBe(false);
        expect(result.current.currentPage).toBe(1);
        expect(result.current.currentTab.id).toBe('iof');
    });

    it('should toggle current tab', () => {
        const { result } = renderHook(() => useSimFullKit());
        act(() => {
            result.current.toggleCurrentTab({ id: 'cf', label: 'Cumulative Full Kit', value: 'cf' });
        });

        expect(result.current.currentTab.id).toBe('cf');
    });

    it('should calculate remaining quantities correctly', () => {
        const { result } = renderHook(() => useSimFullKit());
        const wrappedData = result.current.Save();

        expect(wrappedData.data).toEqual([
            { on: 1, lid: 1, item: 'Item1', oq: 50, aq: 10, easa: 100, remq: 30 },
            { on: 2, lid: 2, item: 'Item1', oq: 50, aq: 20, easa: 100, remq: 40 },
        ]);
    });

    it('should render the correct view for IOF tab', () => {
        const { result } = renderHook(() => useSimFullKit());

        const renderedView = result.current.renderView();

        expect(renderedView).not.toBeNull();
        // Additional assertions can be made based on how VFTable is rendered
    });

    it('should render the correct view for CF tab', () => {
        const { result } = renderHook(() => useSimFullKit());

        act(() => {
            result.current.toggleCurrentTab({ id: 'cf', label: 'Cumulative Full Kit', value: 'cf' });
        });

        const renderedView = result.current.renderView();

        expect(renderedView).not.toBeNull();
        // Additional assertions can be made based on how VFTable is rendered
    });
});
