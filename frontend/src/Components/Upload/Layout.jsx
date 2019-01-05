import React from 'react';
import { connect } from 'react-redux';
import { noop } from 'lodash';

import thematize from 'Lib/thematize';
import { uploadImage, uploadColors } from 'Actions/AppActionCreators';
import Header from 'Components/Header';
import Button from 'Components/Button';
import ImageLoader from 'Components/ImageLoader';
import ColorPicker from 'Components/ColorPicker';
import SelectedColors from 'Components/SelectedColors';
import styles from './Layout.module.scss';

const theme = thematize(styles);

const mapStateToProps = ({ colors, app }) => {
  return {
    colors,
    app
  };
}

const mapDispatchToProps = dispatch => {
  return {
    uploadImage: (image) => { return dispatch(uploadImage(image)); },
    uploadColors: () => { dispatch(uploadColors()); },
  }
}

const Layout = ({ colors, app, uploadImage, uploadColors }) => {
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', app.image);

    uploadImage(formData)
      .then(() => {
        uploadColors();
      })
  }
  const isUploadButtonDisabled = !(colors.selectedColors.length > 1 && app.image);
  return (
    <div>
      <Header title={'Awesome Stencil'} />
      <div className={theme('body')}>
        <div className={theme('image-loader')}>
          <ImageLoader />
        </div>
        <div className={theme('selected-colors')}>
          <SelectedColors />
        </div>
        <div className={theme('color-picker')}>
          <ColorPicker />
        </div>
        <div className={theme('upload-button')}>
          <Button
            content={'upload'}
            onClick={isUploadButtonDisabled ? noop : handleUpload}
            disabled={isUploadButtonDisabled}
            success={!isUploadButtonDisabled}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);