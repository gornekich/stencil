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

export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_ERROR = 'UPLOAD_IMAGE_ERROR';
export const uploadImage = image => {
  return dispatch => {
    dispatch({
      type: UPLOAD_IMAGE
    });

    return post('/core/process/?param=file', image)
      .then(response => response.text())
      .then(id => {
        dispatch(setId(id));
        dispatch({
          type: UPLOAD_IMAGE_SUCCESS
        });
        return null;
      })
      .catch(error => {
        console.log('error');
        dispatch({
          type: UPLOAD_IMAGE_ERROR,
          payload: error
        });
      });
  };
};

export const UPLOAD_COLORS = 'UPLOAD_COLORS';
export const UPLOAD_COLORS_SUCCESS = 'UPLOAD_COLORS_SUCCESS';
export const UPLOAD_COLORS_ERROR = 'UPLOAD_COLORS_ERROR';
export const uploadColors = () => {
  return (dispatch, getState) => {
    dispatch({
      type: UPLOAD_COLORS
    });

    if (!getState().id) {
      dispatch({
        type: UPLOAD_COLORS_ERROR
      });
      return;
    }
    const colorsAndId = JSON.stringify({
      id: getState().id,
      colors: getState().colors.selectedColors
    });

    post('/core/process/?param=colors', colorsAndId)
      .then(response => {
        if (response.status == 200) {
          dispatch({
            type: UPLOAD_COLORS_SUCCESS
          });
        } else {
          dispatch({
            type: UPLOAD_COLORS_ERROR
          });
        }
      })
      .catch(error => {
        dispatch({
          type: UPLOAD_COLORS_ERROR,
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
