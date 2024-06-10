import { render, fireEvent, screen } from '@testing-library/react';
import VFImageButtonOutline from './index';

describe('VFButtonImage Component', () => {
    it('renders the button with the provided text', () => {
        const buttonText = 'Click Me';
        render(<VFImageButtonOutline onClick={() => { console.log("test") }} themeUi="NOIRFUSION">{buttonText}</VFImageButtonOutline>);
        const button = screen.getByText(buttonText);
        expect(button).toBeInTheDocument();
    });

    it('calls the onClick function when the button is clicked', () => {
        const onClickMock = jest.fn();
        render(<VFImageButtonOutline onClick={onClickMock} themeUi="NOIRFUSION">Click Me</VFImageButtonOutline>);
        const button = screen.getByText('Click Me');
        fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalled();
    });

    it('applies the custom width to the button', () => {
        const customWidth = 200;
        render(<VFImageButtonOutline onClick={() => { console.log("test") }} themeUi="NOIRFUSION" width={customWidth}>Click Me</VFImageButtonOutline>);
        const button = screen.getByText('Click Me');
        expect(button).toHaveStyle(`width: ${customWidth}px`);
    });

    it('renders with default width(130px) when not supplied ', () => {
        render(<VFImageButtonOutline onClick={() => { console.log("test") }} themeUi="NOIRFUSION">Click Me</VFImageButtonOutline>);
        const button = screen.getByText('Click Me');
        expect(button).toHaveStyle(`width: 130px`);
    });

    it('disables the button when disabled prop is true', () => {
        render(<VFImageButtonOutline onClick={() => { console.log("test") }} themeUi="NOIRFUSION" disabled={true}>Click Me</VFImageButtonOutline>);
        const button = screen.getByText('Click Me');
        expect(button).toHaveStyle(`pointer-events:none`);
        expect(button).toHaveStyle(`color:#9A9A9A`);
        expect(button).toHaveStyle(`border:1px solid #9A9A9A`);
    });

    it('applies the specified theme', () => {
        render(<VFImageButtonOutline onClick={() => { console.log("test") }} themeUi="REGALBLAZE">Click Me</VFImageButtonOutline>);
        const button = screen.getByText('Click Me');
        expect(button).toHaveStyle(`color:#C7810E`);
        expect(button).toHaveStyle(`border:1px solid #C7810E`);
    });

    it("applies the specified color given", () => {
        render(<VFImageButtonOutline onClick={() => { console.log("test") }} themeUi="REGALBLAZE" color={"#3342FF"}>Hello</VFImageButtonOutline>);
        const button = screen.getByText("Hello");
        expect(button).toHaveStyle(`color:#3342FF`);
    })

    it("onHoverChild on Hover", () => {
        render(<VFImageButtonOutline onClick={() => { console.log("test") }} themeUi="REGALBLAZE" color={"#3342FF"} onHoverChild={<p>Helo</p>}>Hello</VFImageButtonOutline>);
        const button = screen.getByText("Hello");
        fireEvent.mouseOver(button);
        fireEvent.mouseOut(button);
    })
});
