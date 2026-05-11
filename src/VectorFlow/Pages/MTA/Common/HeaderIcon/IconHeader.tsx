const IconHeader = ({
  iconSrc,
  tooltip,
}: {
  iconSrc: string;
  tooltip: string;
}) => (
  <div
    title={tooltip}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",  
    }}
  >
    <img src={iconSrc} alt={tooltip} style={{ width: 18, height: 18 }} />
  </div>
);

export default IconHeader;
