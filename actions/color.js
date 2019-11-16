export const LOAD_COLOR_START = 'LOAD_COLOR_START';
export const LOAD_COLOR_SUCCESS = 'LOAD_COLOR_SUCCESS';
export const LOAD_COLOR_FAILURE = 'LOAD_COLOR_FAILURE';

export const loadColorStart = () => {
  return {
    type: LOAD_COLOR_START,
  }
}

export const loadColorSuccess = (payload) => {
  return {
    type: LOAD_COLOR_SUCCESS,
    payload
  }
}

export const loadColorFailure = (payload) => {
  return {
    type: LOAD_COLOR_FAILURE,
    payload
  }
}
