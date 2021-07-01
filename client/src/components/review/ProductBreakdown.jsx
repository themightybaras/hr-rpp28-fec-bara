import React from 'react';
import Track from '../../Track.jsx';


class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 0,
      comfort: 0,
      fit: 0

    };
    this.getCharacteristicPointers = this.getCharacteristicPointers.bind(this);
  }


  componentDidMount() {
    this.getCharacteristicPointers();
  }

  getCharacteristicPointers() {
    // get pointer positions for each characteristic
  }

  render() {
    return (
      <div>
        <br/>
        <span>CATEGORY</span>
        <div className='slidecontainer'>
          <input type="range" min="1" max="100" defaultValue="50" className="slider" id="myRange" />
        </div>
        <span>  LOW   MIDDLE   HIGH</span>
      </div>
    );
  }
}

export default ProductBreakdown;