import Select, { components, OptionProps } from 'react-select'
import Checkbox from '../../../../../../components/VectorFLOW/commons/MTO/Checkbox';
// import Radio from '../../../../../components/VectorFLOW/commons/MTO/Radio';
// import { Checkbox } from '../../../../../components';

const SelectDropDown = ({ selected, onChange, placeholder, options, width, optionsWidth, theme }: any) => {
    const Option = (props: OptionProps<any>) => {
        return (
            <components.Option {...props}>
                <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                    {/* <Radio theme={theme} defaultChecked={props.isSelected}/> */}
                    <Checkbox theme={theme} name="Select" defaultChecked={props.isSelected} checked={selected.value} onChange={() => onChange()} />
                    {props.data.label}
                </div>
            </components.Option>
        );
    };
    return (
        <Select
            isSearchable={false}
            components={{ Option, IndicatorSeparator: () => null }}
            value={selected?.value}
            // menuIsOpen={true}
            styles={{
                placeholder: (provided) => ({
                    ...provided,
                    color: 'black',
                    fontWeight: 500,
                    fontSize: '14px', 
                }),
                container: (base) => ({
                    ...base,
                    width: width || "max-content"
                }),
                control: (base: any, state: any) => ({
                    ...base,
                    border: "1px solid hsl(0, 0%, 80%)",
                    // This line disable the blue border
                    boxShadow: state.isFocused ? 0 : 0,
                    '&:hover': {
                        border: "1px solid hsl(0, 0%, 80%)"
                    }
                }),
                menu: (base) => ({
                    ...base,
                    width: "max-content",
                    minWidth: optionsWidth || "150px",
                    right: 0,
                }),
                option: (base) => ({
                    ...base,
                    background: "white",
                    color: "black",
                    "&:hover": {
                        background: "white"
                    }
                })
            }}
            placeholder={placeholder || ''}
            options={options}

        />
    )
}

export default SelectDropDown;