import { useUserData } from '../context';

export const useThemeStyles = () => {
  const { user } = useUserData();
  const theme_ui = user.user.theme_ui;

  const styles = {
    option: (baseStyles: any, { isSelected }: any) => ({
      ...baseStyles,
      backgroundColor: isSelected
        ? theme_ui === "REGALBLAZE"
          ? "#FCA311"
          : "#BC3D80"
        : "white",
      fontSize: "14px",
      "&:hover": {
        color: "black",
        backgroundColor:
          theme_ui === "REGALBLAZE"
            ? "rgb(252, 163, 17,0.3) "
            : "#bc3d814d",
      },
    }),
    control: (baseStyles: any, { isFocused }: any) => ({
      ...baseStyles,
      borderColor: isFocused ? theme_ui === "REGALBLAZE"
        ? "#FCA311"
        : "#BC3D80" : "#c7c0c0ff",
      borderWidth: isFocused ? "2px" : "1px",
      borderRadius: "10px",
      fontSize: "14px",
      boxShadow: "none",
      minHeight: "40px",
      "&:hover": {
        borderColor: isFocused ? theme_ui === "REGALBLAZE"
          ? "#FCA311"
          : "#BC3D80" : "#c7c0c0ff",
      },
    }),
    input: (baseStyles: any) => ({
      ...baseStyles,
      fontSize: "14px", // Set input font size here
      fontFamily: "Roboto, sans-serif",
      margin: 0,
      padding: 0,
    }),
    menu: (baseStyles: any) => ({
      ...baseStyles,
      zIndex: 9999,
      position: "absolute",
      maxHeight: "none",
      overflow: "visible",
    }),
    menuList: (baseStyles: any) => ({
      ...baseStyles,
      maxHeight: "none",
      overflow: "visible",
    }),
    placeholder: (baseStyles: any) => ({
      ...baseStyles,
      fontSize: "14px",
      color: "#757575",
    }),
    singleValue: (baseStyles: any) => ({
      ...baseStyles,
      fontSize: "14px",
      color: "black",
    }),
  };

  return styles;
}

export const useColorThemeStyles = () => {
  const { user } = useUserData();
  const theme_ui = user.user.theme_ui;

  const styles = {
    control: (baseStyles: any, { isFocused }: any) => ({
      ...baseStyles,
      borderColor: isFocused 
        ? (theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80") 
        : "#c7c0c0ff",
      borderWidth: isFocused ? "2px" : "1px",
      borderRadius: "10px",
      fontSize: "14px",
      minHeight: "40px",
      boxShadow: "none",
      "&:hover": {
        borderColor: isFocused 
          ? (theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80") 
          : "#c7c0c0ff",
      },
    }),
    option: (baseStyles: any, { isSelected }: any) => ({
      ...baseStyles,
      backgroundColor: isSelected
        ? (theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80")
        : "white",
      fontSize: "14px",
      cursor: "pointer",
      "&:hover": {
        color: "black",
        backgroundColor: theme_ui === "REGALBLAZE"
          ? "rgb(252, 163, 17,0.3)"
          : "#bc3d814d",
      },
    }),
    placeholder: (baseStyles: any) => ({
      ...baseStyles,
      fontSize: "14px",
      color: "#757575",
    }),
    multiValue: (baseStyles: any) => ({
      ...baseStyles,
      borderRadius: "6px",
      padding: "2px",
      backgroundColor: theme_ui === "REGALBLAZE" 
        ? "rgb(252, 163, 17,0.1)" 
        : "rgba(188, 61, 128, 0.1)",
    }),
    multiValueLabel: (baseStyles: any) => ({
      ...baseStyles,
      color: theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80",
      fontSize: "14px",
    }),
    multiValueRemove: (baseStyles: any) => ({
      ...baseStyles,
      color: theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80",
      "&:hover": {
        backgroundColor: theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80",
        color: "white",
      },
    }),
  };

  return styles; // Fixed: was returning 'colourStyles' instead of 'styles'
};