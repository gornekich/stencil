import React, { Component } from 'react';
import { connect } from 'react-redux';

import thematize from 'Lib/thematize';
import { setImage } from 'Actions/AppActionCreators';
import styles from './ImageLoader.module.scss';

const theme = thematize(styles);

const mapDispatchToProps = dispatch => {
  return {
    setImage: image => {
      dispatch(setImage(image));
    }
  };
};

class ImageLoader extends Component {
  state = {
    imageUrl: null
  };

  handleChange = event => {
    this.setState({
      imageUrl: URL.createObjectURL(event.target.files[0])
    });
    this.props.setImage(event.target.files[0]);
  };

  handleUpload = () => {
    const formData = new FormData();
    formData.append('image', this.state.image);
    this.props.uploadImage(formData).then(() => {
      this.props.uploadColors();
    });
  };

  render() {
    return (
      <div>
        <input
          type="file"
          accept="image/*"
          id="imageLoader"
          onChange={this.handleChange}
          className={theme('input-hidden')}
        />
        <div className={theme('container')}>
          <label htmlFor="imageLoader" className={theme('label')}>
            Choose image
          </label>
          {this.state.imageUrl && (
            <div className={theme('image-container')}>
              <img
                src={this.state.imageUrl}
                alt="failed to load"
                className={theme('image')}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ImageLoader);
