import React, { Component } from 'react';

/*const ImageLoader = () => {
  const handleSelectFile = event => {
    console.log(event.target.files[0]);
  };
  return (
    <div>
      <input type="file" name="" id="" onChange={handleSelectFile} />
      <button>Upload</button>
    </div>
  );
};*/

class ImageLoader extends Component {
  state = {
    image: null
  };

  handleChange = (event) => {
    this.setState({
      image: URL.createObjectURL(event.target.files[0])
    });
  }

  render() {
    return(
      <div>
        <input type="file" accept="image/*" onChange={this.handleChange} />
        {this.state.image && <img src={this.state.image} />}
      </div>
    )
  }
}

export default ImageLoader;
