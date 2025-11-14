'use client'
import React, { useState } from 'react';
import Image from 'next/image'
import { Input, Button, DatePicker } from '../../../components'
import { createPortal } from 'react-dom';
import { useAppState } from '../../../State/AppState';


const MemoizedDraw = React.memo(Draw);
function checkDocumentBody() {
  return typeof document !== "undefined" && document?.body;
}

export default function Drawer({ closeDrawer, isActive }) {

  if (typeof window === 'undefined') {
    return null; // Return null on the server to avoid calling createPortal
  }

  return (
    createPortal(
      <MemoizedDraw closeDrawer={ closeDrawer } isActive={isActive} />,
      checkDocumentBody()
    )
  )
}


function Draw({ closeDrawer, isActive }) {
  const { state: { filterFormDataType, filterFormDataStatus, transactions  }, dispatch } = useAppState();
  const transactionTypes = Array.isArray(transactions) ? [...new Set(transactions.map(tranx => tranx?.metadata?.type))] : [];
  const status = [
    "successful",
    "pending",
    "failed"
  ];

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const isFormData = filterFormDataType.length > 0 && filterFormDataStatus.length > 0

  function toDateObject(v) {
    if (!v) return null
    if (typeof v === 'object' && v.year && v.month && v.day) {
      return new Date(v.year, v.month - 1, v.day)
    }
    const d = new Date(v)
    return Number.isNaN(d.getTime()) ? null : d
  }

  const handleApply = () => {
    if (!isFormData) return

    const start = toDateObject(startDate)
    const end = toDateObject(endDate)

    // filter transactions by selected types, statuses and optional date range
    const filtered = Array.isArray(transactions) ? transactions.filter(tranx => {
      const tType = tranx?.metadata?.type
      const tStatus = tranx?.status

      if (!filterFormDataType.includes(tType)) return false
      if (!filterFormDataStatus.includes(tStatus)) return false

      if ((start || end) && tranx?.date) {
        const tx = new Date(tranx.date)
        if (start && tx < start) return false
        if (end && tx > end) return false
      }

      return true
    }) : []

    dispatch({ type: 'APPLY_FILTER', payload: filtered })
    if (typeof closeDrawer === 'function') closeDrawer()
  }

  const handleClear = () => {
    dispatch({ type: 'CLEAR_FILTERS' })
  }

  return (
    <div className={`ease-out duration-500 transition-all  w-full z-20 bg h-full fixed ${!isActive && 'hidden' }`}>
      <div className='float-right relative ease-out transition-all w-[25rem] h-[96%] rounded-xl shadow-md bg-white z-50 px-5 py-5 m-4'>
        <div className='flex justify-between'>
          <h5 className='font-bold text-1xl'>Filter</h5>
          <span  onClick={closeDrawer} className='transparent hover:bg-gray-200 w-8 h-8 p-2 text-center rounded-full cursor-pointer'>
            <Image src={'../assets/close.svg'} alt='Close' width={20} height={20} />
          </span>
        </div>

        <div className='flex space-x-1 py-8'>
          <Button label='Today' type='outlined' className='px-3 py-2 whitespace-nowrap text-xs font-normal' />
          <Button label='Last 7 days' type='outlined' className='px-3 py-2 whitespace-nowrap text-xs font-normal' />
          <Button label='This month' type='outlined' className='px-3 py-2 whitespace-nowrap text-xs font-normal' />
          <Button label='Last 3 months' type='outlined' className='px-3 py-2 whitespace-nowrap text-xs font-normal' />
        </div>

        <div>
          <div className='pb-3'>
            <h5 className='text-sm text-left text-grey-solid font-degular font-bold py-1'>Date Range</h5>
            <div className='flex space-x-2'>
              <DatePicker value={startDate} onChange={setStartDate} />
              <DatePicker value={endDate} onChange={setEndDate} />
            </div>
          </div>
          <Input header='Transaction Type' labels={transactionTypes} type='type' />
          <Input header='Transaction Status' labels={status} type='status' />
          <div className='flex justify-between px-5 absolute inset-x-0 bottom-5'>
            <Button onClick={handleClear} label='Clear' type='outlined' className={`px-16 py-3 ${isFormData ? 'cursor-pointer' : 'cursor-not-allowed  opacity-50' } `}  />
            <Button onClick={handleApply} label='Apply' type='solid' className={`px-16 py-3 ${isFormData ? 'cursor-pointer !text-white' : 'cursor-not-allowed opacity-50' } `}   />
          </div>
        </div>      
      </div> 
    </div>
  )
};