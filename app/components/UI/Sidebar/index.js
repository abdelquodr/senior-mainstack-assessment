import React from 'react'
import { ReactiveImage, MainTooltip } from '../../../components'
import Image from 'next/image'


const sidebarItems = [
    {
      icon: 'Product-1',
      desc: 'Link in Bio',
      size: 6
    },
    {
      icon: 'folder-2',
      desc: 'Store',
      size: 6
    },
    {
      icon: 'folder-1',
      desc: 'Media kit',
      size: 6
    },
    {
      icon: 'Product-2',
      desc: 'Invoicing',
      size: 6
    }
  ]




// export default function Sidebar(){
//   function SidebarItem({
//     icon,
//     tooltip,
//     size
//   }) {
//     return (
//       <div className="group relative flex items-center justify-center w-max p-2 max-h-[50px] rounded-full hover:bg-gray-100 cursor-pointer">
//         <MainTooltip title={tooltip}>
//           <Image
//             src={`/assets/${icon}.svg`}
//             alt={tooltip ? tooltip : ''}
//             width={10}
//             height={10}
//             className={`my-3 grayscale group-hover:grayscale-0 h-${size} w-${size} `}
//           />
//         </MainTooltip>
//       </div>
//     );
//   }
//   return (
//     <div className="fixed left-4 top-56 flex flex-col gap-1 shadow-md w-max p-1 rounded-full">
//       {sidebarItems.map((item, idx) => (
//         <SidebarItem
//           key={idx}
//           icon={item.icon}
//           tooltip={item.desc}
//           size={item.size}
//         />
//       ))}
//     </div>
//   );
// };


export default function Sidebar() {
  return (
    <div className='fixed w-13 rounded-full h-49 bg-white shadow-lg left-5 top-60 ' >
    {
      sidebarItems?.map((item, index) => <ReactiveImage key={index} icon={item?.icon} desc={item?.desc} size={36} /> )
    }
    </div>
  )
}
