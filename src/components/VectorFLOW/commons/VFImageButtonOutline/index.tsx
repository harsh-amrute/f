import { SCButtonOutline } from "./styles"
import React, { CSSProperties, ReactNode } from 'react';

interface VFImageButtonOutlineProps {
    onClick: () => void,
    themeUi: string,
    disabled?: boolean,
    width?: number,
    color?: string,
    onHoverChild?: ReactNode
    children: React.ReactNode
    style?: CSSProperties
    image?: string
    //isHoverDisabled?:boolean

}

const VFImageButtonOutline = (props: VFImageButtonOutlineProps) => {


    const {
        onClick,
        themeUi,
        disabled,
        width,
        children,
        color,
        onHoverChild,
        style,
        image

    } = props

    //const [hoverState,setHoverState] = useState(false);
    const hoverState = false;

    const getChildren = () => {
        if (onHoverChild) {
            if (hoverState) {
                return onHoverChild
            }
        }
        return (
            <>
                {image && <img src={image} alt="Button Icon" style={{ marginRight: '8px' }} />}
                {children}
            </>
        );
    }

    return (
        <SCButtonOutline color={color}
            onClick={onClick}
            themeUi={themeUi}
            isDisabled={disabled}
            customWidth={width}
            hoverState={hoverState}
            style={style}
            // onMouseOver={props.isHoverDisabled ? undefined : () => setHoverState(true)}
            //onMouseOut={props.isHoverDisabled ? undefined : () => setHoverState(false)} 
            data-testid="vf-button-outline">
            {getChildren()}
        </SCButtonOutline>
    )
}

export default VFImageButtonOutline;

