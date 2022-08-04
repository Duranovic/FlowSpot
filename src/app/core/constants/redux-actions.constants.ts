export const ACTION_STATUS_SUCCESS = {
  error: null,
  loaded: true,
  loading: false,
};

export const ACTION_STATUS_START = (state: any) => ({
  ...state,
  status: {
    ...state.status,
    loading: true,
  },
});

export const ACTION_STATUS_FAILURE = (err: string) => ({
  error: err,
  loaded: false,
  loading: false,
});
