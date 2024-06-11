import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FutureCov from './FutureCov';

describe("FutureCoverage Component", () => {
    test("Div present on the screen", () => {
        const handleToggleComponentMock = jest.fn();
        render(<FutureCov handleToggleComponent={handleToggleComponentMock}/>)
        const navigate = screen.getByTestId("btn_navigate")
        expect(navigate).toBeInTheDocument();
        fireEvent.click(navigate);
    })

})

