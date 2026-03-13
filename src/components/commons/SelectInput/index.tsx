import {
  selectOption,
  selectIcon,
  selectBase,
  selectWithTargetIcon,
  selectPlainNoIcon,
  selectWithOtherIcon,
} from "./styles.css";

interface SelectOptionProps {
  name: string;
  handleChange: (e: any) => void;
  value: any;
  items: any[];
  icon: string;
}

const SelectInput = ({
  name,
  value,
  handleChange,
  items,
  icon,
}: SelectOptionProps) => {
  // flags replicate original props:
  const hasTargetIcon = icon === 'target';  // -> icons
  const isPlainNoIcon = !icon;              // -> icon

  const selectClass = [
    selectBase,
    hasTargetIcon
      ? selectWithTargetIcon
      : isPlainNoIcon
      ? selectPlainNoIcon
      : selectWithOtherIcon,
  ].join(' ');

  return (
    <div className={selectOption}>
      {icon ? <img className={selectIcon} src={`/assets/img/ist/${icon}.svg`} alt="" /> : ''}
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={selectClass}
      >
        {items?.map((item: any) => (
          <option
            style={{ color: 'black', width: 20 }}
            key={JSON.stringify(item)}
            value={item}
          >
            {`${item}ㅤ`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;

