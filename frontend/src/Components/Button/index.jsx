import React from 'react';
import { noop } from 'lodash';

import thematize from 'Lib/thematize';
import styles from './Button.module.scss';
const theme = thematize(styles);

const Button = ({ content, onClick=noop, containerClassName='', contentClassName='', disabled, success }) =>
  <div className={`${theme('container', { disabled, success })} ${containerClassName}`} onClick={onClick}>
    <div className={`${theme('content')} ${contentClassName}`}>
      {content}
    </div>
  </div>

export default Button;