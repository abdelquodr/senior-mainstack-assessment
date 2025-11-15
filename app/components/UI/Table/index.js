import { TableHeader, TableData } from '../../../components'
import { useAppState } from '../../../State/AppState'
import { NavIcon } from '../../../components';

export default function Table({openDrawer}) {
  const { state } = useAppState();
  const { transactions, filteredTransactions, filterFormDataStatus, transactionsLoading, filterFormDataType } = state;
  const displayTransactions = Array.isArray(filteredTransactions) ? filteredTransactions : transactions;

  return (
    <div className='pt-8'>
    <TableHeader openDrawer={ openDrawer } transactions={displayTransactions.length} desc='Your transactions for the last 7 days' />
      { transactionsLoading && (
          <div className='text-center mt-20'>
            <h3 className='text-center mt-4 text-gray-500'>Loading transactions…</h3>
          </div>
        )}
      {displayTransactions.length === 0 ? (
          <div className='w-full min-h-[12rem] flex items-center justify-center py-12'>
            <div className='w-full max-w-1/4 text-left'>
              <NavIcon icon='receipt' alt='loading' size={40} className='mx-auto p-2 py-3 rounded-lg bg-gray-200' />
              <h3 className='mt-4 text-2xl text-black'>No matching transaction found for the selected filter</h3>
              <p className='text-gray-500 text-sm py-3'>Change your filters to see more results, or add a new product</p>
            </div>
          </div>
        ) :
        displayTransactions.map((tranx, index) => (<TableData key={index} data={tranx} />))
      }    
    </div>
  )
}
