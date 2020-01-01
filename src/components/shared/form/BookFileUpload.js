import React from 'react';
import ReactCrop from 'react-image-crop';
import {toast} from 'react-toastify';
import * as actions from 'store/actions';

export class BookFileUpload extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedFile: null,
      croppedImageBlob: {},
      pending: false,
      status: 'INIT',
      src: null,
      src_prew: null,
      crop: {
       x: 200,
       y: 200,
      unit: '%',
      width: 380,
      height: 380,
      aspect: 1,
      },
    }
    this.onSelectFile = this.onSelectFile.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onCropComplete = this.onCropComplete.bind(this);
    this.makeClientCrop = this.makeClientCrop.bind(this)
    this.getCroppedImg = this.getCroppedImg.bind(this);
    this.onCropChange = this.onCropChange.bind(this);
  }

  resetToDefaultState(status) {
    this.setState({
      selectedFile: null,
      croppedImageBlob: {},
      pending: false,
      status,
      src: null,
      src_prew: null,
    });
  }

  onSelectFile(e) {
    /* Assing selected file to a variable
      on load read file and set state to src,
      readAsDataURL to display it on page
    */
    const selectedFile = e.target.files[0];
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.setState({
          src: reader.result,
          selectedFile
         });
      });
      reader.readAsDataURL(selectedFile);
    }
  }

  onImageLoaded(image){
    /* onImageLoaded
      when the image is loaded. Passes the image DOM element.
    */
    if (image.naturalWidth < 650 && image.naturalHeight < 420) {
      this.resetToDefaultState('INIT');
      toast.error("Minimum width of image is 650px and height 420px");
    }
    this.imageRef = image;

    this.setState({
      crop: {
        x: 10,
        y: 10,
        aspect: 4/3,
        width: 50}
      }
    );
    //return false;
  };

  onCropComplete(crop, percentCrop) {
    //console.log('onCropComplete', crop, percentCrop);
    const { selectedFile } = this.state;

    if( selectedFile ) {
      // fire function for cropping image
      this.makeClientCrop(crop);
    }
  };

  onCropChange(crop, percentCrop){
    // console.log('onCropChange', crop, percentCrop);
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  onError(error) {
    this.setState({pending: false, status: 'FAIL'});
  }

  onSuccess(uploadedImage) {
    const {onChange} = this.props.input || this.props;
    this.resetToDefaultState('OK');
    //this.setState({pending: false, status: 'OK'});
    onChange(uploadedImage);
  }

  async uploadImage() {
    const { croppedImageBlob } = this.state;

    if(croppedImageBlob) {
      this.setState({pending: true, status: 'INIT'});

      actions.uploadImage(croppedImageBlob).then(
        (uploadedImage) => { this.onSuccess(uploadedImage)},
        (error) => {this.onError(error)}
      )
    }
  }

  renderSpinner() {
    const { pending } = this.state;

    if (pending) {
      return <div className="lds-dual-ring"></div>
    }
  }

  renderImageStatus() {
    const { status } = this.state;

    if (status === 'OK') {
      return <div className="alert alert-success">Image Uploaded Successfully</div>
    }

    if (status === 'FAIL') {
      return <div className="alert alert-danger">Image Upload Failed!</div>
    }
  }

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageBlob = await this.getCroppedImg(this.imageRef, crop, 'newFile.jpeg');
      this.setState({croppedImageBlob});

      /* convert cropped Blob to File so we can get src_prew to display croped image as preview to user */
      var file = new File([croppedImageBlob], "my_image.png",{type:"image/png", lastModified:new Date()});
       var reader  = new FileReader();
       reader.addEventListener('load', () => {
         this.setState({
           src_prew: reader.result,
           file
          });
       });
       reader.readAsDataURL(file);
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg', 1);
    });
  }

  render() {
    const { selectedFile, croppedImageBlob, src, src_prew } = this.state;

    return(
      <div className="image-upload-container">
          <label className="img-upload btn btn-primary">
            <span> Select Image </span>
            <input type="file"
                   accept=".jpg, .png, .jpeg"
                   onChange={this.onSelectFile}
                   style={{display: 'none'}}
                   />
          </label>
            { selectedFile &&
              <button
                className="btn btn-success"
                type="button"
                disabled={!selectedFile}
                onClick={() => this.uploadImage()}>
                  Upload Image
              </button>
            }

            { croppedImageBlob &&
              <ReactCrop src={src}
                         crop={this.state.crop}
                         onImageLoaded={this.onImageLoaded}
                         onComplete={this.onCropComplete}
                         onChange={this.onCropChange} />
            }
            { src_prew &&
              <div className="img-preview-container d-flex justify-content-center">
                <div id="preview" className="img-preview"
                     style={{'backgroundImage': 'url(' + src_prew + ')'}}>
                { this.renderSpinner() }
                </div>
              </div>
            }
            { this.renderImageStatus() }
      </div>
    )
  }
}
