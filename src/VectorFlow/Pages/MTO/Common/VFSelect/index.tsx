import React from 'react';
import Select, { StylesConfig } from 'react-select';
import { chooseThemeColor } from '../../../../../styles/global';

export type OptionType = { value: string; label: string };
interface VFSelectProps {
    options: OptionType[];
    themeUi: string;
    placeholder?: string;
    value: OptionType | null; // Controlled value for the dropdown
    onActionChange?: (selectedValue: OptionType) => void; // Callback for selection change
    [key: string]: any;
    
}
const VFSelect: React.FC<VFSelectProps> = ({
    options,
    themeUi,
    placeholder,
    value,
    onActionChange,
    ...rest
}) => {
    const customStyles: StylesConfig<OptionType, false> = {
        container: (base) => ({
            ...base,
            width: placeholder === 'Select Action' ? 170 : '100%',
        }),
        control: (base, state) => ({
            ...base,
            minHeight: '25px',
            minWidth: '80px',
            boxShadow: state.isFocused ? '0' : '0',
            border: '1px solid hsl(0, 0%, 80%)',
            '&:hover': {
                border: '1px solid hsl(0, 0%, 80%)',
            },
        }),
        menu: (base) => ({
            ...base,
            zIndex: 100000000,
            minWidth: '100%',
            width: 'max-content',
        }),
        menuList: (base) => ({
            ...base,
            maxHeight: '120px',
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: 'grey',
            padding: '0',
        }),
        clearIndicator: (base) => ({
            ...base,
            color: 'grey',
            padding: '0',
        }),
        indicatorsContainer: (base) => ({
            ...base,
            padding: '0 8px',
        }),
    };

    // Handle Dropdown Change
    const handleChange = (selectedOption: OptionType | null) => {
        if (onActionChange && selectedOption) {
            onActionChange(selectedOption);
        }
    };

    return (
        <Select<OptionType>
            isSearchable={true}
            components={{
                IndicatorSeparator: () => null,
            }}
            menuPortalTarget={document.body}    
            menuPlacement="auto"
            styles={customStyles}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary50: chooseThemeColor[themeUi].color4,
                    primary25: chooseThemeColor[themeUi].color4 + '4A',
                    primary: chooseThemeColor[themeUi].color4,
                },
            })}
            placeholder={placeholder || 'Select Action'}
            options={options}
            value={value}
            onChange={handleChange}
            {...rest}
        />
    );
};

export default VFSelect;
