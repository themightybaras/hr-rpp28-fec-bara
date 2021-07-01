import React from 'react';

// review list will take in props from reviewWidget
// review list will need to map over the props and pass them to individual review as props
class ReviewImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifiedImageUrls: [],
    };
    this.modifyImageUrl = this.modifyImageUrl.bind(this);
  }


  modifyImageUrl() {
    let photos = [];
    this.props.photos.map((photoObj) => {
      photos.push(photoObj.url.slice(0, photoObj.url.indexOf('fit=crop') + 8) + '&w=100&q=80');
    });
    this.setState({modifiedImageUrls: photos});
  }

  componentDidMount() {
    this.modifyImageUrl();
  }

  render() {
    return (
      <div className = 'reviewImages'>
        {this.state.modifiedImageUrls.map((photo, index) =>
          <img src = {photo} key = {index} className= 'reviewImage'/>
        )}
      </div>
    );
  }
}

export default ReviewImages;