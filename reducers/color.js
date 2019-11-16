import produce from 'immer';

import {
  LOAD_COLOR_START,
  LOAD_COLOR_SUCCESS,
  LOAD_COLOR_FAILURE,
} from '../actions/color';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null
};

export default color = (state = INITIAL_STATE, action) => {

  return produce(state, draft => {
    switch (action.type) {
      case LOAD_COLOR_START:
        console.log('LOAD_COLOR_START', LOAD_COLOR_START);
        draft.loading = true;
        break;
      case LOAD_COLOR_SUCCESS:
        console.log('LOAD_COLOR_SUCCESS', LOAD_COLOR_SUCCESS);
        draft.loading = false;
        draft.data = action.payload;
        break;
      case LOAD_COLOR_FAILURE:
        console.log('LOAD_COLOR_FAILURE', LOAD_COLOR_FAILURE);
        draft.loading = false;
        draft.error = action.payload;
        break;
      default:
    }
  });
}
