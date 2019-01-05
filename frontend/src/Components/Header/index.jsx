import React from 'react';

import thematize from 'Lib/thematize';
import styles from './Header.module.scss';

const theme = thematize(styles);

const Header = ({ title }) => (
  <div className={styles.container}>
    <div className={theme('title')}>{title}</div>
  </div>
);

export default Header;
