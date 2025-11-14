import { NavIcon } from '../../components'

export default function Button(props) {

  const {icon=null, label='', className='', type='', children, ...rest} = props
  if (icon === null && label === null) {
    throw new Error('Both icon and label cannot be null');
  }

  const buttonClassName = `
    text-grey-soft font-degular font-normal hover:bg-grey-light
    ${ type === 'solid' ? 'bg-grey-solid text-white font-semibold py-2 rounded-full' : 
      (type === 'outlined' ? 'border border-grey-light font-semibold text-grey-solid rounded-full' : 
      (type === 'default' ? 'bg-grey-light text-grey-solid font-semibold px-5 py-2 rounded-full' : ''))
    }

    ${className}
  `;

  return (
    <button {...rest} className={buttonClassName}>
      {children}
      {icon && <NavIcon icon={icon} className='pt-1 ' /> }
      <span className='align-baseline text-sm pt-1'>{ label }</span>
    </button>
  )
}
