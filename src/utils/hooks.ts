const defaultInitialData = {status: 'idle', data: null, error: null}
const pendingState = {status: 'idle', data: null, error: null}

function queryReducer(state, action) {
  switch (action.type) {
    case 'pending':
      return pendingState
    case 'resolved':
      return {status: 'resolved', data: action.data, error: null}
    case 'rejected':
      return {status: 'rejected', data: action.data, error: action.error}
    default:
      throw new Error(`Unhandled action type ${action.type}`)
  }
}

export function useAsyncQuery(initialData) {
  const [state, dispatch] = React.useReducer(queryReducer, {...defaultInitialData, ...initialData})

  dispatch({ type: "pending" });

  const run = React.useCallback(promse => {
    promse.then(
      data => { type: "resolved", data }
      error => { type: "rejected", error }
    )
  }, [])

  return {
    ...state,
    run,
  }
}

