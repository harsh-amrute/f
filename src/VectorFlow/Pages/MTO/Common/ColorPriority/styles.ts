import styled from "styled-components";
interface ColorValues {
    B?: number;
    R?: number;
    Y?: number;
    G?: number;
}

export const ColorPriorityCellRenderer = styled.div<ColorValues>`
    position: relative;
    height: 20px;
    width: 70px;
    background: #000000 0% 0% no-repeat padding-box;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background: ${(props) => {
        const { B = 0, R = 0, Y = 0, G = 0 } = props;

        const colorStops: string[] = [];
        if (B > 0) colorStops.push(`#000000 0% ${B}%`);
        if (R > 0) colorStops.push(`#E53F3F ${B}% ${B + R}%`);
        if (Y > 0) colorStops.push(`#EBBF2C ${B + R}% ${B + R + Y}%`);
        if (G > 0) colorStops.push(`#4CAF50 ${B + R + Y}% 100%`);

        if (colorStops.length === 0) {
            // If no colors are provided, default to black
            colorStops.push('#FFFFFF 0% 100%');
        }

        return `linear-gradient(to right, ${colorStops.join(', ')})`;
    }};
    }
`;

export const ColorPriorityCellRendererWrapper = styled.div`
    height:100%;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`