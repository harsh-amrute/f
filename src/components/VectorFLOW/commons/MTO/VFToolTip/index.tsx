import "./style.css"

interface VFToolTipProps {
    text: any;
    left?: number;
    bottom?: number;
  }
  
  const VFToolTip: React.FC<VFToolTipProps> = ({
    text,
    left ,
    bottom,
  }) => {
    return (
    <span className='hover-text' style={{left: left ?? undefined, bottom: bottom ?? undefined}}>
        {text}
    </span>
    );
  };
  
  export default VFToolTip;
  