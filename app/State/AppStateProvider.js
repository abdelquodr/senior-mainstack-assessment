import React, { createContext, useContext, useReducer, useCallback } from 'react'
import * as api from '../utils/api'

// Define an initial state
const initialState = {
  filterFormDataType: [],
  filterFormDataStatus: [],
  user: null,
  wallet: null,
  transactions: [],
  loading: {
    user: false,
    wallet: false,
    transactions: false,
  },
  error: {
    user: null,
    wallet: null,
    transactions: null,
  },
}

// Create a context
const AppStateContext = createContext({ state: initialState, dispatch: () => {} })

// Define a reducer function to handle state updates
function appStateReducer(state, action) {
  switch (action.type) {
    case 'ADD_FILTERFORM_TYPE':
      return { ...state, filterFormDataType: [...state.filterFormDataType, action.value] }
    case 'REMOVE_FILTERFORM_TYPE':
      return { ...state, filterFormDataType: state.filterFormDataType.filter(text => text !== action.value) }
    case 'ADD_FILTERFORM_STATUS':
      return { ...state, filterFormDataStatus: [...state.filterFormDataStatus, action.value] }
    case 'REMOVE_FILTERFORM_STATUS':
      return { ...state, filterFormDataStatus: state.filterFormDataStatus.filter(text => text !== action.value) }

    // User fetch lifecycle
    case 'FETCH_USER_REQUEST':
      return { ...state, loading: { ...state.loading, user: true }, error: { ...state.error, user: null } }
    case 'FETCH_USER_SUCCESS':
      return { ...state, loading: { ...state.loading, user: false }, user: action.value }
    case 'FETCH_USER_FAILURE':
      return { ...state, loading: { ...state.loading, user: false }, error: { ...state.error, user: action.error } }

    // Wallet fetch lifecycle
    case 'FETCH_WALLET_REQUEST':
      return { ...state, loading: { ...state.loading, wallet: true }, error: { ...state.error, wallet: null } }
    case 'FETCH_WALLET_SUCCESS':
      return { ...state, loading: { ...state.loading, wallet: false }, wallet: action.value }
    case 'FETCH_WALLET_FAILURE':
      return { ...state, loading: { ...state.loading, wallet: false }, error: { ...state.error, wallet: action.error } }

    // Transactions fetch lifecycle
    case 'FETCH_TRANSACTIONS_REQUEST':
      return { ...state, loading: { ...state.loading, transactions: true }, error: { ...state.error, transactions: null } }
    case 'FETCH_TRANSACTIONS_SUCCESS':
      return { ...state, loading: { ...state.loading, transactions: false }, transactions: action.value }
    case 'FETCH_TRANSACTIONS_FAILURE':
      return { ...state, loading: { ...state.loading, transactions: false }, error: { ...state.error, transactions: action.error } }

    default:
      return state
  }
}

// Create a provider to wrap your entire application
function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appStateReducer, initialState)

  // Fetch helpers exposed via context
  const fetchUser = useCallback(async (options) => {
    dispatch({ type: 'FETCH_USER_REQUEST' })
    try {
      const data = await api.getUser(options)
      dispatch({ type: 'FETCH_USER_SUCCESS', value: data })
      return data
    } catch (error) {
      dispatch({ type: 'FETCH_USER_FAILURE', error })
      throw error
    }
  }, [])

  const fetchWallet = useCallback(async (options) => {
    dispatch({ type: 'FETCH_WALLET_REQUEST' })
    try {
      const data = await api.getWallet(options)
      dispatch({ type: 'FETCH_WALLET_SUCCESS', value: data })
      return data
    } catch (error) {
      dispatch({ type: 'FETCH_WALLET_FAILURE', error })
      throw error
    }
  }, [])

  const fetchTransactions = useCallback(async (options) => {
    dispatch({ type: 'FETCH_TRANSACTIONS_REQUEST' })
    try {
      const data = await api.getTransactions(options)
      dispatch({ type: 'FETCH_TRANSACTIONS_SUCCESS', value: data })
      return data
    } catch (error) {
      dispatch({ type: 'FETCH_TRANSACTIONS_FAILURE', error })
      throw error
    }
  }, [])

  return (
    <AppStateContext.Provider value={{ state, dispatch, fetchUser, fetchWallet, fetchTransactions }}>
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
