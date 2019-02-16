import { post } from 'Lib/query';

export const CHANGE_CURRENT_COLOR = 'CHANGE_CURRENT_COLOR';
export const changeCurrentColor = (r, g, b, a) => {
  return dispatch => {
    dispatch({
      type: CHANGE_CURRENT_COLOR,
      payload: { r, g, b, a }
    });
  };
};

export const ADD_COLOR = 'ADD_COLOR';
export const addColor = (r, g, b, a) => {
  return dispatch => {
    dispatch({
      type: ADD_COLOR,
      payload: { r, g, b, a }
    });
  };
};

export const SET_USER_ID = 'SET_USER_ID';
export const setUserId = id => {
  return dispatch => {
    dispatch({
      type: SET_USER_ID,
      payload: id
    });
  };
};

export const SET_TASK_ID = 'SET_TASK_ID';
export const setTaskId = id => {
  return dispatch => {
    dispatch({
      type: SET_TASK_ID,
      payload: id
    });
  };
};

export const PROCESSING_IMAGE = 'PROCESSING_IMAGE';
export const PROCESSING_IMAGE_SUCCESS = 'PROCESSING_IMAGE_SUCCESS';
export const PROCESSING_IMAGE_ERROR = 'PROCESSING_IMAGE_ERROR';
export const pingServer = () => {
  return (dispatch, getState) => {
    const userId = getState().app.userId;
    const taskId = getState().app.taskId;
    post(`/result/${userId}/`, JSON.stringify({ task_id: taskId }))
      .then(res => res.text())
      .then(res => {
        console.log(res);
        if (res === '1') {
          window.location = `http://localhost:8000/result/${userId}`;
        }
      })
  };
};

export const UPLOAD_IMAGE_AND_COLORS = 'UPLOAD_IMAGE';
export const UPLOAD_IMAGE_AND_COLORS_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_AND_COLORS_ERROR = 'UPLOAD_IMAGE_ERROR';
export const uploadImageAndColors = data => {
  return dispatch => {
    dispatch({
      type: UPLOAD_IMAGE_AND_COLORS
    });
    post('/process/', data)
      .then(response => response.json())
      .then(response => {
        dispatch(setUserId(response.stencil_id));
        dispatch(setTaskId(response.task_id));
        dispatch({
          type: UPLOAD_IMAGE_AND_COLORS_SUCCESS
        });
        setInterval(() => dispatch(pingServer()), 3000);
      })
      .catch(error => {
        dispatch({
          type: UPLOAD_IMAGE_AND_COLORS_ERROR,
          payload: error
        });
      });
  };
};

export const SET_IMAGE = 'SET_IMAGE';
export const setImage = image => {
  return dispatch => {
    dispatch({
      type: SET_IMAGE,
      payload: image
    });
  };
};
