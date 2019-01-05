import React from 'react';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color'

import thematize from 'Lib/thematize';
import { changeCurrentColor, addColor } from 'Actions/AppActionCreators';
import Button from 'Components/Button';
import styles from './ColorPicker.module.scss';

const theme = thematize(styles);

const mapStateToProps = ({ colors }) => {
  return {
    currentColor: colors.currentColor,
    colors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentColor: ({ r, g, b, a }) => {
      dispatch(changeCurrentColor(r, g, b, a));
    },
    addColor: ({ r, g, b, a }) => {
      dispatch(addColor(r, g, b, a));
    }
  };
};

const ColorPicker = ({ currentColor, changeCurrentColor, addColor, colors }) => {
  const onColorChange = color => {
    changeCurrentColor(color.rgb);
  };
  const onAddColorClick = () => {
    addColor(currentColor);
  };

  const backgroundColor = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b},
    ${currentColor.a})`;
  return (
    <div className={theme('container')}>
      <div>
        <ChromePicker color={currentColor} onChange={onColorChange} />
      </div>
      <div className={theme('color-sample')} style={{ backgroundColor: backgroundColor }} />
      <div>
        <Button content={'Add color'} onClick={onAddColorClick} />
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorPicker);
