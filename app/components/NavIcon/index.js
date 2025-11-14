import Image from 'next/image'

export default function NavIcon({icon, size = 25, className=''}) {
    return (
      <span className={`m-auto ${className}`}>
        <Image className='inline pr-1 align-middle pb-1' src={`../assets/${icon}.svg`} width={ size } height={size} alt={`${icon}`} />
      </span>
    )
  }
  