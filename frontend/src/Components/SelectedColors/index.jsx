import React from 'react';
import { connect } from 'react-redux';

import thematize from 'Lib/thematize';
import styles from './SelectedColors.module.scss';

const theme = thematize(styles);

const mapStateToProps = ({ colors }) => {
  return {
    selectedColors: colors.selectedColors
  };
};

const SelectedColors = ({ selectedColors }) => (
  <div className={theme('container')}>
    {selectedColors.map((color, index) => {
      const backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b},
        ${color.a})`;
      return <div className={theme('color-sample')} style={{ backgroundColor }} key={index} />;
    })}
  </div>
);

export default connect(mapStateToProps)(SelectedColors);
