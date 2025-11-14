import { TableHeader, TableData } from '../../../components'
import { useAppState } from '../../../State/AppState'
import { NavIcon } from '../../../components';

export default function Table({openDrawer}) {
  const { state } = useAppState();
  const { transactions, filteredTransactions, transactionsLoading, transactionsError } = state;
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
          <div className='text-center mt-20'>
            <NavIcon icon='receipt' alt='loading' size={40} className='!text-left p-2 py-3 rounded-lg bg-gray-200' />
            <h3 className='text-center mt-4 text-2xl text-gray-500'>No matching transaction found for the selected filter</h3>
            <p>Change your filters to see more result, or add a new product</p>
          </div>
        ) :
        displayTransactions.map((tranx, index) => (<TableData key={index} data={tranx} />))
      }    
    </div>
  )
}
