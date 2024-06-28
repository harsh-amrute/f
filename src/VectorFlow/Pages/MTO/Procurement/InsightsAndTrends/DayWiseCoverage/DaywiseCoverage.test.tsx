import { render, fireEvent, screen } from '@testing-library/react';
import DayWiseCoverage from '.';

describe('DayWiseCoverage', () => {
    it('renders without crashing', () => {
        render(<DayWiseCoverage />);
    });

    it('updates date range when setDateRange is called', async () => {
        render(<DayWiseCoverage />);
        screen.logTestingPlaygroundURL()
        fireEvent.click(screen.getByText("Submit"))
    });


});
