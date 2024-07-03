import { render } from '@testing-library/react';
import DayWiseCoverageDetailsCellRenderer from './DayWiseCoverageDetailsCellRenderer';

describe('DayWise Coverage Details Cell Renderer', () => {
    it('renders without crashing', () => {
        const data = {
            data: {
                children: []
            }
        }
        render(<DayWiseCoverageDetailsCellRenderer {...data} />);
    });
})