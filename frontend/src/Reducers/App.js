import { SET_USER_ID, SET_TASK_ID, SET_IMAGE } from 'Actions/AppActionCreators';

const initialState = {
  userId: null,
  image: null,
  taskId: null
};

export const app = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_ID:
      return {
        ...state,
        userId: payload
      }

    case SET_TASK_ID:
      return {
        ...state,
        taskId: payload
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
