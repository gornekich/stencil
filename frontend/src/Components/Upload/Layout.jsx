import React from 'react';

import thematize from 'Lib/thematize';
import Header from 'Components/Header';
import ImageLoader from 'Components/ImageLoader';
import styles from './Layout.module.scss';

const theme = thematize(styles);

const Layout = () => 
  <div>
    <Header title={'Awesome Stencil'} />
    <div className={theme('body')}>
      <ImageLoader />
    </div>
  </div>

export default Layout;