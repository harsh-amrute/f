import { type ChangeEvent } from 'react'
import { searchText, input as inputClass, iconLocation } from './styles.css';

interface InputSearchListProps {
  placeholder: string
  searchText: string
  srcIcon: string
  handleChangeText: (event: ChangeEvent<HTMLInputElement>) => void
}
const InputSearchList = ({
  placeholder,
  searchText: value,
  srcIcon,
  handleChangeText,
}: InputSearchListProps) => {
  return (
    <>
      <img className={iconLocation} src={srcIcon} alt="" />
      <div className={searchText}>
        <input
          className={inputClass}
          placeholder={placeholder}
          aria-label="Search components"
          id={`search-${placeholder}`}
          value={value}
          type="text"
          onChange={handleChangeText}
        />
      </div>
    </>
  );
};

export default InputSearchList;
