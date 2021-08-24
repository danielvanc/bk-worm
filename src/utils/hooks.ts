import * as React from 'react'

const actionTypes = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
}

const defaultInitialState = { status: actionTypes.IDLE, data: null, error: null }
const pendingState = {status: actionTypes.IDLE, data: null, error: null}

function queryReducer(state, action) {
  switch (action.type) {
    case actionTypes.PENDING:
      return pendingState
    case actionTypes.RESOLVED:
      return {
        status: actionTypes.RESOLVED, 
        data: action.data, 
        error: null
      }
    case actionTypes.REJECTED:
      return {
        status: actionTypes.REJECTED, 
        data: action.data, 
        error: action.error
      }
    default: {
      throw new Error(`Unhandled action type ${action.type}`)
    }
  }
}

export function useAsync(initialState = {}) {
  const [{ 
    status, 
    data, 
    error 
  }, dispatch] = React.useReducer(
    queryReducer, { ...defaultInitialState, ...initialState }
  )
  
  const run = React.useCallback(promise => {
    dispatch({ type: "pending" });
    promise.then(
      data => dispatch({ type: actionTypes.RESOLVED, data }),
      error => dispatch({ type: actionTypes.REJECTED, error })
    )
  }, [])

  return {
    isIdle: status === actionTypes.IDLE,
    isLoading: status === actionTypes.PENDING,
    isError: status === actionTypes.REJECTED,
    isSuccess: status === actionTypes.RESOLVED,
    error,
    status,
    data,
    run,
  }
}