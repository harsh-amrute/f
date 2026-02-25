import {
  VFMasterCardContainer,
  VFMasterCardHeader,
  VFMasterCardListContainer,
  VFMasterCardListItem,
  VFMasterCardCheckBox,
} from "./styles.css";
import { type Master, type Field } from "../../../../VectorFlow/types/MDM";

interface VFMasterCardProps {
  data: Master;
  selectedFields: string[];
  isSelected: boolean;
  onSelectCheckbox: any;
  isCheckBoxDisabled: boolean;
  themeUi: string;
}

const VFMasterCard = (props: VFMasterCardProps) => {
  // const [checked,setChecked] = useState(false)
  //     const handleOnChange = () => {
  //         setChecked(!checked)
  //     }

  const {
    data,
    selectedFields,
    isSelected,
    onSelectCheckbox,
    isCheckBoxDisabled,
    themeUi,
  } = props;

  return (
    <div className={VFMasterCardContainer} data-testid="master-card">
      <div className={VFMasterCardHeader}>
        {data.name}

        {!isCheckBoxDisabled && (
          <input
            className={VFMasterCardCheckBox}
            data-theme={themeUi}
            type="checkbox"
            data-testid="check-box"
            checked={isSelected}
            onChange={onSelectCheckbox}
          />
        )}
      </div>

      <div className={VFMasterCardListContainer} data-testid="list-container">
        {data.fields.map((title, index) =>
          title.visible ? (
            <div
              key={index}
              className={VFMasterCardListItem}
              data-theme={themeUi}
              data-selected={selectedFields.includes(title.displayName)}
            >
              {title.displayName}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default VFMasterCard;
