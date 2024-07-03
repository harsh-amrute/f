import React, { useState, useRef, CSSProperties } from 'react';
import Portal from '../../../../../components/VectorFLOW/layouts/Portal';
import { TooltipContainer, TooltipTarget } from './styles';

const Tooltip = ({ children, content }: any) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [toolTipPosition, setoolTipPosition] = useState<CSSProperties | null>();
    const tooltipRef = useRef<HTMLDivElement>(null);

    const onMouseIn = (e: any) => {

        e.stopPropagation();
        setShowTooltip(true)
        //add delay so that tooltip component is rendered
        setTimeout(() => {
            if (tooltipRef.current) {

                const tooltipRect = tooltipRef.current.getBoundingClientRect();
                const { top, left, width } = e.target.getBoundingClientRect();
                let tooltipLeft = left + (width / 2) - (tooltipRect.width / 2);

                // Adjust if tooltip goes outside the viewport
                const viewportWidth = window.innerWidth * 1 / 0.75 - 20;
                if (tooltipLeft < 0) {
                    tooltipLeft = 0 + 10;
                } else if (tooltipLeft + tooltipRect.width >= viewportWidth) {
                    tooltipLeft = viewportWidth - tooltipRect.width;
                }
                setoolTipPosition({
                    top: top - tooltipRect.height - 15,
                    left: tooltipLeft
                })
            }
        }, 0)


    }

    const onMouseOut = () => setShowTooltip(false);

    return (
        <TooltipTarget
            onMouseEnter={onMouseIn}
            onMouseLeave={onMouseOut}
        >
            {children}
            {showTooltip && (
                //use portal here
                <Portal wrapperId="tooltip">
                    <TooltipContainer data-testid="tooltip" style={{ top: toolTipPosition?.top, left: toolTipPosition?.left }} ref={tooltipRef}>
                        {content}
                    </TooltipContainer>
                </Portal>

            )}
        </TooltipTarget>
    );
};

export default Tooltip;
