import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import DayWiseCoverage from '.';
import DayWiseCoverageHeader from './DayWiseCoverageHeader';

describe('DayWiseCoverage', () => {
    it('renders without crashing', () => {
        render(<DayWiseCoverage />);
    });

    it('updates date range when setDateRange is called', async () => {
        render(<DayWiseCoverage />);
        screen.logTestingPlaygroundURL()
        const startDateInput = screen.getAllByTestId("calender")[0] as HTMLInputElement;
        const endDateInput = screen.getAllByTestId("calender")[0] as HTMLInputElement;

        fireEvent.click(screen.getByText("Submit"))
    });


});
