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
      fontSize: "12px",
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
      borderColor: isFocused ? "#BC3D80" : "none",
      borderWidth: isFocused ? "2px" : "1px",
      borderRadius: "10px",
      fontSize: "12px",
      boxShadow: "none",
      "&:hover": {
        borderColor: isFocused ? "#BC3D80" : "none",
      },
    }),
    menu: (baseStyles: any) => ({
      ...baseStyles,
      zIndex: 9999,
      position: "absolute",
    }),
  };

  return styles;
}