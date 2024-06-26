import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import DayWiseCoverageDetailsCellRenderer from './DayWiseCoverageDetailsCellRenderer';

describe('DayWise Coverage Details Cell Renderer', () => {
    it('renders without crashing', () => {
        let data = {
            data: {
                children: []
            }
        }
        render(<DayWiseCoverageDetailsCellRenderer {...data} />);
    });
})