'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button, NavIcon, Avatar } from '../../../components'
import { usePathname } from 'next/navigation';
import { useAppState } from '../../../State/AppState'


const NavItem = [
  {
    name: 'Home',
    href: '/home',
    icon: 'home'
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: 'insert_chart'
  },
  {
    name: 'Revenue',
    href: '/',
    icon: 'revenue'
  },
  {
    name: 'CRM',
    href: '/crm',
    icon: 'group-user'
  },
  {
    name: 'Apps',
    href: '/apps',
    icon: 'widgets'
  },
]


export default function Navbar() {
  const [ openMenu, setOpenMenu ] = useState(false)
  const [ isScrolled, setIsScrolled ] = useState(false)
  const pathname = usePathname()
  const { state, refreshUser,  userLoading, userError } = useAppState();
  const { user } = state;

  const handleToggle = ( ) => setOpenMenu((prevState) => !prevState)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* full-width spacer under the navbar to cover moving content when scrolled */}
      <div className={`fixed top-0 left-0 right-0 h-20 pointer-events-none transition-colors duration-200 ${isScrolled ? 'bg-white/100 z-40' : 'bg-transparent z-0'}`} />

      <div className={`flex justify-between rounded-full w-[97.5%] fixed h-16 px-3 transition-all shadow-lg duration-200 ${isScrolled ? 'bg-white/95 shadow-lg z-50' : 'bg-transparent z-10'}`}>
        <div className='flex ml-3 align-middle w-10 h'>
          <Image src={'../assets/mainstack-logo.svg'} alt='brand_logo' width={40} height={40} />
        </div>

        <div className='flex space-x-12 align-middle items-center'>
          {NavItem.map((nav, index )=> ( <Button key={nav?.name + index} icon={nav?.icon} href={nav?.href} label={nav?.name} className={`hover:bg-gray-100 text-md px-4 py-1.5 text-center rounded-full  ${pathname === nav?.href && 'bg-grey-solid hover:bg-grey-solid !text-white'}`} />)) }
        </div>

        <div className='flex space-x-5 align-middle items-center'>
          <NavIcon icon={'notifications'} className='px-2  ' />
          <NavIcon icon={'chat'} className='mx-4' />
          <div onClick={handleToggle} className='flex align-middle justify-between px-1 pr-2 space-x-1 items-center w-[] h-10 bg-grey-light rounded-full' > 
            <Avatar size={8} />
            <NavIcon icon={'menu'} />
          </div>
          {/* { openMenu && <Menu userData={user} /> } */}
        </div>
      </div>
    </>
  )
}


const menuData = [
  {
    name: 'Settings',
    icon: 'settings',
  },
  {
    name: 'Purchase history',
    icon: 'purchase',
  },
  {
    name: 'Refer and Earn',
    icon: 'refer',
  },
  {
    name: 'Settings',
    icon: 'settings',
  },
  {
    name: 'Integrations',
    icon: 'integration',
  },
  {
    name: 'Report Bug',
    icon: 'report',
  },
  {
    name: 'Sign out',
    icon: 'sign_out',
  }
]
const Menu = ({userData}) => {
  return (
    <div className='w-20 rounded-md shadow-md bg-white'>
      <div className='flex space-x-3'>
        <div className='w-12 h-12 bg-green-soft rounded-full text-center'>
          <Avatar size={8} />
        </div>
        <div className='lex flex-col text-left align-middle items-center'>
          <h6 className='font-normal text-sm'>{`${userData?.first_name} ${userData?.last_name}`}</h6>
          <p className='text-grey-soft text-xs'>{userData?.email}</p>
        </div>
      </div>
      {
        menuData?.map((item, index) => (
          <div key={index} className='flex align-middle space-x-3 px-1 pr-2 items-left' > 
            <NavIcon icon={item?.icon} />
            <p className='align-baseline font-normal text-grey-solid'>{item?.name}</p>
          </div>
        ))
      }
    </div>
  )
}


