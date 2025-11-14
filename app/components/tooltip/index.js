import { Tooltip } from 'react-tippy'

export const MainTooltip = ({ title, children, ...props }) => {
  return (
    <Tooltip
      {...props}
      disabled={props.disabled || !title}
      html={<span className="text-sm text-white">{title}</span>}
    >
      {children}
    </Tooltip>
  )
}

MainTooltip.defaultProps = {
  arrow: true,
  position: 'right',
}
