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
      boxSizing: "border-box",
      boxShadow: "none",
      width: "100%", 
      minWidth: "250px", 
      maxWidth: "360px",
      overflow: "hidden", 
      "&:hover": {
        borderColor: isFocused 
          ? (theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80") 
          : "#c7c0c0ff",
      },
    }),
    menu: (baseStyles: any) => ({
      ...baseStyles,
      zIndex: 9999,
      position: "absolute",
      width: "100%",
      minWidth: "250px",
      maxWidth: "360px",
    }),
    menuList: (baseStyles: any) => ({
      ...baseStyles,
      maxHeight: "none",
      overflowY: "visible",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    }),
    option: (baseStyles: any, { isSelected }: any) => ({
      ...baseStyles,
      backgroundColor: isSelected
        ? (theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80")
        : "white",
      fontSize: "14px",
      cursor: "pointer",
      minHeight: "40px",
      display: "flex",
      alignItems: "center",
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
      flexShrink: 0,
      minWidth: "fit-content",
      maxWidth: "120px", // Reduce tag width
    }),
    multiValueLabel: (baseStyles: any) => ({
      ...baseStyles,
      color: theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80",
      fontSize: "14px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100px", // Reduce label width
    }),
    multiValueRemove: (baseStyles: any) => ({
      ...baseStyles,
      color: theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80",
      flexShrink: 0,
      "&:hover": {
        backgroundColor: theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80",
        color: "white",
      },
    }),
    valueContainer: (baseStyles: any) => ({
      ...baseStyles,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap', 
      overflowX: 'auto',
      overflowY: 'hidden',
      width: "calc(100% - 40px)", // Account for indicators
      maxWidth: "calc(100% - 40px)",
      minWidth: "0",
      flex: "1 1 auto", // Allow to shrink
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
      gap: "4px",
      padding: "2px 8px",
    }),
    input: (baseStyles: any) => ({
      ...baseStyles,
      fontSize: "14px",
      fontFamily: "Roboto, sans-serif",
      margin: 0,
      padding: 0,
      width: "0px", // Zero width
      minWidth: "0px", 
      maxWidth: "0px", 
      border: "none",
      outline: "none",
      background: "transparent",
      opacity: 0, // Make completely invisible
    }),
    indicatorsContainer: (baseStyles: any) => ({
      ...baseStyles,
      flexShrink: 0, // Prevent indicators from shrinking
    }),
  };

  return styles; 
};

export const useColorOptionStyles = () => {
  const { user } = useUserData();
  const theme_ui = user.user.theme_ui;
  const themeColor = theme_ui === "REGALBLAZE" ? "#FCA311" : "#BC3D80";

  return {
    checkbox: {
      width: "16px",
      height: "16px",
      accentColor: themeColor,
      cursor: "pointer",
      flexShrink: 0,
    },
    colorPanel: {
      width: "20px",
      height: "20px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      flexShrink: 0,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      order: 2,
    },
    colorName: {
      fontSize: "14px",
      fontFamily: "Roboto, sans-serif",
      fontWeight: "400",
      color: "#333",
      flex: 1,
      textAlign: "left" as const,
      order: 1,
    },
    optionContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      width: "100%",
      padding: "4px 0",
    }
  };
};