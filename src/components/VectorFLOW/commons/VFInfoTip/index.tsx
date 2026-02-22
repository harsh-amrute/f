import {
  InfoWrapper,
  IconTextContainer,
  InfoIcon,
  Infotext,
} from "./styles.css";

interface VFInfoTipProps {
  text: Array<string>;
}

const VFInfoTip = (props: VFInfoTipProps) => {
  const { text } = props;
  const gapVariant = text.length > 1 ? "loose" : "tight";

  return (
    <div className={InfoWrapper}>
      <div className={IconTextContainer[gapVariant]}>
        <div className={InfoIcon}>
          <img src="/assets/img/VectorFLOW/BPR/bulb.svg" alt="Info" />
        </div>

        <div className={Infotext}>
          {text.length > 1 ? (
            <ul style={{ margin: "0 0 5px 0", padding: 0 }}>
              {text.map((t, i) => (
                <li key={`${t}-${i}`} style={{ listStyle: "outside" }}>
                  <b>{t}</b>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <b>{text[0]}</b>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default VFInfoTip;
