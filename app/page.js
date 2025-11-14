"use client"

import { useState, useEffect, useCallback } from 'react';
import { Navbar, Table, Chart, Drawer, Sidebar } from './components/UI'
import { AppStateProvider } from './State/AppState';
import 'react-tippy/dist/tippy.css';
import './globals.css'

export default function Home() {
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [isNotDesktop, setIisNotDesktop] = useState(false);

  useEffect(() => {
    function handleResize() {
      // Check screen width
      if (window.innerWidth < 1240) {
        setIisNotDesktop(true);
      } else {
        setIisNotDesktop(false);
      }
    }

    // Add an event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const OpenDrawerHandler =  useCallback(() => {
    setIsDrawerActive(true)   
  }, []); 

  const closeDrawerHandler =  useCallback(() => {
    setIsDrawerActive(false)    
  }, []); 

  return (
    <AppStateProvider  >
      {
        isNotDesktop ?  <div className="flex items-center justify-center h-screen">
          <p className='m-auto font-bold text-3xl'>Only responsive on desktop</p>
        </div> : 
        <main className={`p-5 relative ${isDrawerActive && 'bg_effect'}`}>
          <Navbar />
          <div className='px-32 mt-36 z-0 relative'>
            <Sidebar />
            <Chart  />
            <Table  openDrawer={OpenDrawerHandler} />
            <Drawer isActive={isDrawerActive} closeDrawer={closeDrawerHandler} />
          </div>
        </main>
      }
    </AppStateProvider>

  )
}
