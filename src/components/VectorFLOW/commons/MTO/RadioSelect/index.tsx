import React, { useRef, useState } from 'react'
import Select, { components, OptionProps } from 'react-select';
import Radio from '../Radio';

const RadioSelect = ({selected, options ,theme, color="white", ...rest}: any) => {
    const Option = (props: OptionProps<any>) => {
        return (
            <components.Option {...props}>
                <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                    <Radio theme={theme} defaultChecked={props.isSelected}/>
                    {props.data.label}
                </div>
            </components.Option>
        );
    }
  return (
        <Select
            isSearchable={false}
            components={{ Option, IndicatorSeparator: () => null }}
            value={selected}
            menuPlacement={"auto"}
            menuPosition={"fixed"}
            // menuIsOpen={true}
            styles={{
                container: (base) => ({
                    ...base,
                    width: "max-content"
                }),
                control: (base: any, state: any) => ({
                    ...base,
                    background: color,
                    borderRadius:0,
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
                    zIndex:"100000000"
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight:"120px"  
                }),
                option: (base) => ({
                    ...base,
                    background: "white",
                    color: "black",
                    "&:hover": {
                        background: "white"
                    }
                }),
                dropdownIndicator:(base) => ({
                    ...base,
                    color: "grey"
                }),
            }}
            // menuIsOpen
            placeholder={""}
            options={options}
            {...rest}

        />
  )
}

export default RadioSelect