import { render, screen } from '@testing-library/react';
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
        GetCount: {
            short: 5,
            complete: 10,
            total: 15,
        },
    }),
}));

describe('ProcPlanningAnalytics Component', () => {
    it('renders with correct data', () => {
        // Mock globalStyles
        // const mockGlobalStyles = {
        //     chooseThemeColor: {
        //         NOIRFUSION: {
        //             backGroundParticular: '#ffffff',
        //         },

        //     },
        // };

        render(
            <ProcPlanningAnalytics
                themeUi="NOIRFUSION"
            />
        );

        // Check for the list title
        expect(screen.getByText('ProcPlanning.Analytics')).toBeInTheDocument();

        // Check for the list data
        expect(screen.getByText('ProcPlanning.cntshort')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();

        expect(screen.getByText('ProcPlanning.cntfa')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();

        // Check for the total data
        expect(screen.getByText('ProcPlanning.total')).toBeInTheDocument();
        expect(screen.getByText('15')).toBeInTheDocument();
    });
});
