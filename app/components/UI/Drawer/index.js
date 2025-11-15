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

  function dateToPickerObj(d) {
    if (!d) return null
    const dt = d instanceof Date ? d : new Date(d)
    if (Number.isNaN(dt.getTime())) return null
    return { year: dt.getFullYear(), month: dt.getMonth() + 1, day: dt.getDate() }
  }

  function setPresetRange(preset) {
    const today = new Date()
    let start = null
    let end = null

    switch (preset) {
      case 'today':
        start = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        end = start
        break
      case 'last7':
        end = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        start = new Date(end)
        start.setDate(end.getDate() - 6) // last 7 days inclusive
        break
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1)
        end = new Date(today.getFullYear(), today.getMonth(), new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate())
        break
      case 'last3months':
        end = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        start = new Date(end)
        start.setMonth(end.getMonth() - 3)
        break
      default:
        return
    }

    setStartDate(dateToPickerObj(start))
    setEndDate(dateToPickerObj(end))
  }

  const handleApply = () => {
    if (!isFormData) return

    const start = toDateObject(startDate)
    const end = toDateObject(endDate)

    // filter transactions by selected types, statuses and optional date range
    const filtered = Array.isArray(transactions) ? transactions.filter(tranx => {
      const tType = tranx?.metadata?.type
      const tStatus = tranx?.status


      //cfilter with array list of types
      if (filterFormDataType.length > 0 && !filterFormDataType.includes(tType)) return false
      if (filterFormDataStatus.length > 0 && !filterFormDataStatus.includes(tStatus)) return false
      
      // filter for date range if provided ==> handle formats like "2022-03-02", timestamps, or date objects
      if ((start || end) && tranx?.date) {
        const txDateObj = toDateObject(tranx.date)
        if (!txDateObj) return false

        // normalize to date-only (midnight) to avoid timezone/time-of-day mismatches
        const tx = new Date(txDateObj.getFullYear(), txDateObj.getMonth(), txDateObj.getDate())
        const startNorm = start ? new Date(start.getFullYear(), start.getMonth(), start.getDate()) : null
        const endNorm = end ? new Date(end.getFullYear(), end.getMonth(), end.getDate()) : null

        if (startNorm && tx < startNorm) return false
        if (endNorm && tx > endNorm) return false
      }

      return true
    }) : []

    dispatch({ type: 'APPLY_FILTER', payload: filtered })
    if (typeof closeDrawer === 'function') closeDrawer()
  }

  const handleClear = () => {
    dispatch({ type: 'CLEAR_FILTERS' })
    // reset local date pickers
    setStartDate(null)
    setEndDate(null)
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
          <Button onClick={() => setPresetRange('today')} label='Today' type='outlined' className='px-3 py-2 whitespace-nowrap text-xs font-normal' />
          <Button onClick={() => setPresetRange('last7')} label='Last 7 days' type='outlined' className='px-3 py-2 whitespace-nowrap text-xs font-normal' />
          <Button onClick={() => setPresetRange('thisMonth')} label='This month' type='outlined' className='px-3 py-2 whitespace-nowrap text-xs font-normal' />
          <Button onClick={() => setPresetRange('last3months')} label='Last 3 months' type='outlined' className='px-3 py-2 whitespace-nowrap text-xs font-normal' />
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