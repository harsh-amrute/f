import Select, { components } from "react-select";
import { selectStyles, styleMoreSelect } from "./style";
import { useUserData } from "../../../context";
import { chooseThemeColor } from "../../../styles/global";

interface SelectSearchMultipleProps {
  value: any;
  setValue: any;
  options: any;
  placeholder: string;
  handleListChild: (e: object) => void;
  disabled: any;
  icon?:any;
  maxToShow?:number;
  backgroundColor?:string;
}

const SearchInputMultiple = ({
  value,
  setValue,
  options,
  placeholder,
  handleListChild,
  disabled,
  icon,
  maxToShow = 1,
  backgroundColor = '#F2F2F2'
}: SelectSearchMultipleProps) => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const handleSelect = (e: any) => {
    setValue(e);
    handleListChild(e);
  };

  return (
    <Select
      closeMenuOnSelect={false}
      tabSelectsValue={false}
      hideSelectedOptions={false}
      isMulti
      components={{ 
        IndicatorSeparator: null, MultiValue:(props)=>(
          <MultiValue maxToShow={maxToShow} {...props}/>
        ),
        DropdownIndicator:icon
       }}
      menuPosition="fixed"
      isDisabled={disabled}
      options={options}
      value={value}
      styles={selectStyles(backgroundColor)}
      placeholder={placeholder}
      onChange={(e) => {
        handleSelect(e);
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "#F2F2F2",
          primary: chooseThemeColor[themeUi].color5,
        },
      })}
    />
  );
};

const MultiValue = ({ index, getValue,maxToShow, ...props }: any) => {
  const overflow = getValue()
    .slice(maxToShow)
    .map((x: any) => x.label);

  return index < maxToShow ? (
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};

const MoreSelectedBadge = ({ items }: any) => {
  const title = items.join(", ");
  const length = items.length;
  const label = `+${length} More`;

  return (
    <div style={styleMoreSelect} title={title}>
      {label}
    </div>
  );
};

export default SearchInputMultiple;
