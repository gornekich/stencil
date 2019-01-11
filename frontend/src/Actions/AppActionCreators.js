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

export const SET_ID = 'SET_ID';
export const setId = id => {
  return dispatch => {
    dispatch({
      type: SET_ID,
      payload: id
    });
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

    post('/core/process/?param=file', data)
      .then(response => response.text())
      .then(id => {
        dispatch(setId(id));
        dispatch({
          type: UPLOAD_IMAGE_AND_COLORS_SUCCESS
        });
      })
      .catch(error => {
        console.log('error');
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
