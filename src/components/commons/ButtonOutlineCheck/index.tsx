import { buttonOutline } from './styles.css'
interface ButtonOutlineCheckProps {
  onChange: () => void
  text: string
  icon?: string
  styles?: React.CSSProperties
}

const ButtonOutlineCheck = ({
  onChange,
  text,
  icon,
  styles
}: ButtonOutlineCheckProps) => {
  const variant = icon === 'accept' ? 'withIcon' : 'withoutIcon'

  return (
    <button
      className={buttonOutline[variant]}
      style={styles}
      onClick={onChange}
    >
      {icon && (
        <img
          style={{ paddingRight: 10 }}
          src={`/assets/img/check/${icon}.svg`}
          alt={icon}
        />
      )}
      {text}
    </button>
  )
}

export default ButtonOutlineCheck
