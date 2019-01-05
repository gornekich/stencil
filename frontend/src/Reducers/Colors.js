import { CHANGE_CURRENT_COLOR, ADD_COLOR } from 'Actions/AppActionCreators';

const initialState = {
  currentColor: { r: 241, g: 201, b: 255, a: 1 },
  selectedColors: []
};

export const colors = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_CURRENT_COLOR:
      return {
        ...state,
        currentColor: payload
      };

    case ADD_COLOR:
      const jsonSelectedColors = state.selectedColors.map(color => JSON.stringify(color));
      const selectedColors = [...state.selectedColors];
      if (!jsonSelectedColors.includes(JSON.stringify(payload))) {
        selectedColors.push(payload);
      }
      return {
        currentColor: state.currentColor,
        selectedColors
      };
    
    default:
      return state;
  }
};
