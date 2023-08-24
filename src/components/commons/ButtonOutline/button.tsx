import { SCImgOutline, SCButtonOutlineNoIcon } from './styles'
interface ButtonOutline {
  onChange: () => void
  text: string
  icon: string
  status: boolean
}

const ButtonOutlineStatus = ({
  onChange,
  text,
  icon,
  status
}: ButtonOutline) => {
  return (
    <SCButtonOutlineNoIcon status={status} onClick={onChange}>
      {icon ? <SCImgOutline src={`../assets/img/forced/${icon}.svg`} /> : ''}{' '}
      {text}
    </SCButtonOutlineNoIcon>
  )
}

export default ButtonOutlineStatus
