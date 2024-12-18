import React from 'react'
import Select from 'react-select';
import { chooseThemeColor } from '../../../../../styles/global';


const VFSelect = ({ options, themeUi, icon, placeholder, ...rest }: any) => {

    
    return (
        <Select
            isSearchable={true}
            components={{
                IndicatorSeparator: () => null
            }}
            menuPlacement={"auto"}
            placeholder="select action"
            width='200px'
            // menuIsOpen={true}
            styles={{
                container: (base) => ({
                    ...base,
                    width: placeholder == "Select Action" ? 270 : "100%"
                }),
                control: (base: any, state: any) => ({
                    ...base,
                    minHeight: "25px",
                    minWidth: "80px",
                    boxShadow: state.isFocused ? 0 : 0,
                    border: "1px solid hsl(0, 0%, 80%) !important",
                    '&:hover': {
                        border: "1px solid hsl(0, 0%, 80%)"
                    }
                }),
                menu: (base) => ({
                    ...base,
                    zIndex: "100000000",
                    minWidth: "100%",
                    width: "max-content"
                }),
                menuList: (base) => ({
                    ...base,
                    maxHeight: "120px"
                }),
                dropdownIndicator: (base) => ({
                    ...base,
                    color: "grey",
                    padding: "0"
                }),
                clearIndicator: (base) => ({
                    ...base,
                    color: "grey",
                    padding: "0"
                }),
                indicatorsContainer: (base) => ({
                    ...base,
                    padding: "0 8px"
                })
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary50: chooseThemeColor[themeUi].color4,
                    primary25: chooseThemeColor[themeUi].color4 + "4A",
                    primary: chooseThemeColor[themeUi].color4,
                },
            })}
            // menuIsOpen
            options={options}
            {...rest}

        />
    )
}

export default VFSelect