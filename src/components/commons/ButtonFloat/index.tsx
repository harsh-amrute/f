import { SCButtonFloat, SCImg } from './style'
import { useUserData } from "../../../context";

interface ButtonFloatProps {
  onClick: () => void
  text: string
  icon: string
}

const ButtonFloat = ({ onClick, text, icon }: ButtonFloatProps) => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  return (
    <>
      <SCButtonFloat onClick={onClick} themeUi={themeUi}>
        {icon ? <SCImg src={icon} /> : ''}
        {text.toString().replace(',', ' | ')}
      </SCButtonFloat>
    </>
  )
}

export default ButtonFloat
