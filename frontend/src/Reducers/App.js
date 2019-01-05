import { SET_ID, SET_IMAGE } from 'Actions/AppActionCreators';

const initialState = {
  id: null,
  image: null
};

export const app = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ID:
      return {
        ...state,
        id: payload
      }

    case SET_IMAGE:
      return {
        ...state,
        image: payload
      }

    default:
      return state;
  }
}
