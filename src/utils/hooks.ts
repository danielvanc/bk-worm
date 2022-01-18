import * as React from "react";

type State = typeof defaultInitialState;

const actionTypes = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const defaultInitialState: initialStateType = {
  status: actionTypes.IDLE,
  data: [],
  error: false,
};

const pendingState: State = {
  status: actionTypes.IDLE,
  data: [],
  error: false,
};

function queryReducer(state: State, action: Action): State {
  switch (action.type) {
    case actionTypes.PENDING:
      return pendingState;
    case actionTypes.RESOLVED:
      return {
        status: actionTypes.RESOLVED,
        data: action.data,
        error: false,
      };
    case actionTypes.REJECTED:
      return {
        status: actionTypes.REJECTED,
        data: action.data,
        error: true,
      };
    default: {
      throw new Error(`Unhandled action type ${action.type}`);
    }
  }
}

export function useAsync(initialState = {}) {
  const [{ status, data, error }, dispatch] = React.useReducer(queryReducer, {
    ...defaultInitialState,
    ...initialState,
  });

  const run = React.useCallback((promise) => {
    dispatch({ type: "pending" });
    promise.then(
      (data: []) => dispatch({ type: "resolved", data }),
      (error: boolean) => dispatch({ type: "rejected", error })
    );
  }, []);

  return {
    isIdle: status === actionTypes.IDLE,
    isLoading: status === actionTypes.PENDING,
    isError: status === actionTypes.REJECTED,
    isSuccess: status === actionTypes.RESOLVED,
    error,
    status,
    data,
    run,
  };
}
