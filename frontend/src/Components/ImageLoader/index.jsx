import React, { Component } from 'react';
import Cookies from 'js-cookie';

import thematize from 'Lib/thematize';
import Button from 'Components/Button';
import styles from './ImageLoader.module.scss';

const theme = thematize(styles);

class ImageLoader extends Component {
  state = {
    image: null,
    imageUrl: null
  };

  handleChange = event => {
    this.setState({
      imageUrl: URL.createObjectURL(event.target.files[0]),
      image: event.target.files[0]
    });
  };

  handleUpload = () => {
    const formData = new FormData();

    formData.append('avatar', this.state.image);
    fetch('/core/process/?param=file', {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: formData
    })
      .then(res => res.text())
      .then(id => {
        fetch('/core/process/?param=colors', {
          method: 'POST',
          headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
          },
          body: JSON.stringify({
            id: id,
            colors: [
              [242, 242, 242],
              [102, 204, 255],
              [0, 102, 153],
              [255, 148, 77],
              [255, 77, 77],
              [13, 13, 13]
            ]
          })
        });
      })
      .catch(err => console.log(err));
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
          {this.state.image && (
            <div className={theme('image-container')}>
              <img
                src={this.state.imageUrl}
                alt="failed to render image"
                className={theme('image')}
              />
            </div>
          )}
          {this.state.image && (
            <Button
              content="Upload"
              onClick={this.handleUpload}
              disabled={this.state.image ? false : true}
              success
            />
          )}
        </div>
      </div>
    );
  }
}

export default ImageLoader;
