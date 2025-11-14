import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { getUser, getWallet, getTransactions } from '../utils/api'

// Define an initial state with API data slices
const initialState = {
  filterFormDataType: [],
  filterFormDataStatus: [],

  // API slices
  user: null,
  userLoading: false,
  userError: null,

  wallet: null,
  walletLoading: false,
  walletError: null,

  transactions: [],
  transactionsLoading: false,
  transactionsError: null,
  filteredTransactions: null,
};

// Create a context
const AppStateContext = createContext({ state: initialState, dispatch: () => {} })

// Reducer with API-related action handling
function appStateReducer(state, action) {
  switch (action.type) {
    case 'ADD_FILTERFORM_TYPE':
      return { ...state, filterFormDataType: [...(state.filterFormDataType || []), action.value] }
    case 'REMOVE_FILTERFORM_TYPE':
      return { ...state, filterFormDataType: (state.filterFormDataType || []).filter(text => text !== action.value) }
    case 'ADD_FILTERFORM_STATUS':
      return { ...state, filterFormDataStatus: [...(state.filterFormDataStatus || []), action.value] }
    case 'REMOVE_FILTERFORM_STATUS':
      return { ...state, filterFormDataStatus: (state.filterFormDataStatus || []).filter(text => text !== action.value) }

    // User fetch actions
    case 'FETCH_USER_START':
      return { ...state, userLoading: true, userError: null }
    case 'FETCH_USER_SUCCESS':
      return { ...state, userLoading: false, user: action.payload }
    case 'FETCH_USER_ERROR':
      return { ...state, userLoading: false, userError: action.error }

    // Wallet fetch actions
    case 'FETCH_WALLET_START':
      return { ...state, walletLoading: true, walletError: null }
    case 'FETCH_WALLET_SUCCESS':
      return { ...state, walletLoading: false, wallet: action.payload }
    case 'FETCH_WALLET_ERROR':
      return { ...state, walletLoading: false, walletError: action.error }

    // Transactions fetch actions
    case 'FETCH_TRANSACTIONS_START':
      return { ...state, transactionsLoading: true, transactionsError: null }
    case 'FETCH_TRANSACTIONS_SUCCESS':
      return { ...state, transactionsLoading: false, transactions: action.payload, filteredTransactions: null }
    case 'FETCH_TRANSACTIONS_ERROR':
      return { ...state, transactionsLoading: false, transactionsError: action.error }

    // Filtered transactions
    case 'APPLY_FILTER':
      return { ...state, filteredTransactions: action.payload }

    case 'CLEAR_FILTERS':
      return { ...state, filterFormDataType: [], filterFormDataStatus: [], filteredTransactions: null }

    default:
      return state
  }
}

// Create a provider to wrap your entire application and fetch data on mount
function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appStateReducer, initialState)

  const fetchUser = useCallback(async (signal) => {
    dispatch({ type: 'FETCH_USER_START' })
    try {
      const data = await getUser({ signal })
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: data })
      return data
    } catch (error) {
      dispatch({ type: 'FETCH_USER_ERROR', error })
      throw error
    }
  }, [])

  const fetchWallet = useCallback(async (signal) => {
    dispatch({ type: 'FETCH_WALLET_START' })
    try {
      const data = await getWallet({ signal })
      dispatch({ type: 'FETCH_WALLET_SUCCESS', payload: data })
      return data
    } catch (error) {
      dispatch({ type: 'FETCH_WALLET_ERROR', error })
      throw error
    }
  }, [])

  const fetchTransactions = useCallback(async (signal) => {
    dispatch({ type: 'FETCH_TRANSACTIONS_START' })
    try {
      const data = await getTransactions({ signal })
      dispatch({ type: 'FETCH_TRANSACTIONS_SUCCESS', payload: data })
      return data
    } catch (error) {
      dispatch({ type: 'FETCH_TRANSACTIONS_ERROR', error })
      throw error
    }
  }, [])

  // Fetch all on mount
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    // fire-and-forget; errors are stored in state
    fetchUser(signal).catch(() => {})
    fetchWallet(signal).catch(() => {})
    fetchTransactions(signal).catch(() => {})

    return () => controller.abort()
  }, [fetchUser, fetchWallet, fetchTransactions])

  // Expose refresh helpers so components can re-load specific slices
  const refreshUser = (signal) => fetchUser(signal)
  const refreshWallet = (signal) => fetchWallet(signal)
  const refreshTransactions = (signal) => fetchTransactions(signal)

  return (
    <AppStateContext.Provider value={{ state, dispatch, refreshUser, refreshWallet, refreshTransactions }}>
      {children}
    </AppStateContext.Provider>
  )
}

// Create a custom hook to access the context
function useAppState() {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return context
}


console.log("AppStateProvider loaded", initialState);
export { AppStateProvider, appStateReducer, useAppState, AppStateContext }