import { render } from '@testing-library/react';
import ProcPlanningAnalytics from './index';

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: any) => key,
    }),
}));

// Mock the useProcPlanning hook
jest.mock('../../../../VectorFlow/Pages/MTO/Procurement/Planning/useProcPlanning', () => ({
    __esModule: true,
    default: () => ({
        fetchData: jest.fn(), // Add a mock function for fetchData
        date: "2024-06-13", // Mock a date for testing
        counts: {
            short: 0,
            complete: 0,
            total: 0,
        },
    }),
}));

describe('ProcPlanningAnalytics Component', () => {
    it('renders with correct data', () => {
        render(
            <ProcPlanningAnalytics
                themeUi="NOIRFUSION"
            />
        );
    });
});
