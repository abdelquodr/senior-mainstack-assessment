import React, { useCallback, useState} from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Button } from '../../../components'
import Image from 'next/image'
import { useAppState } from '../../../State/AppState'
import formatWalletSummary from '../../../utils/formatWallet'


export default function Chart () {
  const { state } = useAppState();
  const { wallet, walletLoading, walletError, transactions, transactionsLoading, transactionsError } = state;

  const chartData = Array.isArray(transactions) ? [...transactions].reverse() : [];
  const chartDataKey = 'amount';
  const computedEndDate = (Array.isArray(transactions) && transactions.length > 0 && transactions[0].date) ? new Date(transactions[0].date) : new Date();
  const computedStartDate = (Array.isArray(transactions) && transactions.length > 0 && transactions[transactions.length - 1].date) ? new Date(transactions[transactions.length - 1].date) : new Date();


  return (
    <div className='flex justify-between space-x-48'>
      <div className='w-3/4 flex flex-col'>
        <div className=''>
          <div className='text-left align-middle items-center'>
            <p className='text-grey-soft leading-1 tracking-wider text-sm'>Availabale Balance</p>
            <div className='flex space-x-8 items-end'>
              <h3 className='font-bold text-3xl text-grey-solid'>USD 120,500.00</h3>
              <Button label='withdraw' type='solid' className='text-md py-4 px-16 !text-white' />
            </div>
          </div>
        </div>


        <div className="mt-auto w-full">
          <ResponsiveContainer width="100%" height={250} minWidth="100%" minHeight={100}>
            <AreaChart width={728} height={500} data={chartData}>
              <Area type="monotone" dataKey={chartDataKey} stroke="#FF5403" fill="none" />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>

          <div className="w-full">
            <div className="flex items-center justify-center mt-3">
              <div className="flex items-center justify-center grow-0 shrink-0 w-[6px] h-[6px] bg-gray-100 rounded-full"></div>
              <div className="h-[1px] bg-gray-100 w-full"></div>
              <div className="flex items-center justify-center grow-0 shrink-0 w-[6px] h-[6px] bg-gray-100 rounded-full"></div>
            </div>
            <div className="flex justify-between font-degular text-sm font-medium mt-3 leading-[px] tracking-[-0.1px] text-gray-400">
              <span>{computedStartDate ? computedStartDate.toDateString() : ''}</span>
              <span>{computedEndDate ? computedEndDate.toDateString() : ''}</span>
            </div>
          </div>
        </div>
      </div>  

      <div className='w-1/5 mt-0'>
        {
          // `wallet` from state may be an object; convert to rows for display
          (() => {
            if (!wallet || typeof wallet !== 'object') return null
            const rows = formatWalletSummary(wallet, { formatCurrency: true, currency: 'USD' })
            return rows.map((row, index) => (
              <div key={index} className='py-4'>
                <div className='flex justify-between'>
                  <p className='text-grey-soft text-sm tracking-wider py-1'>{row.name}</p>
                  <Image src={'../assets/info.svg'} alt='info' width={14} height={14} />
                </div>
                <h3 className='font-bold text-2xl text-grey-solid'>{row.value}</h3>
              </div>
            ))
          })()
        }
      </div>
    </div>
    
  )
}
