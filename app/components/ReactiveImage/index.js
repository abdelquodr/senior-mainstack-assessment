import { useState, useCallback } from 'react'
import { NavIcon } from '../../components'

export default function ReactiveImage({icon, desc, size = 28}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div className="relative group mx-1"  >
      <div data-testid="hovered-div" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`text-center py-1.5 grayscale hover:grayscale-0 hover:bg-gray-100 w-${size + 1} h-${size + 1} rounded-full`}>
        <NavIcon icon={icon} size={size} />
      </div>
      {isHovered && (
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 flex items-center">
          <div className="h-0 w-0 border-y-8 border-y-transparent border-r-[6px] border-r-grey-solid pointer-events-none"></div>
          <div className="text-xs whitespace-nowrap bg-grey-solid text-white px-3 py-2 rounded-md ">
            {desc}
          </div>
        </div>
      )}
    </div>  
  )
}
