import React from 'react';
import Track from '../../Track.jsx';
import CharacteristicBar from './CharacteristicBar.jsx';


class ProductBreakdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Size: 0,
      Width: 0,
      Comfort: 0,
      Quality: 0,
      Length: 0,
      Fit: 0
    };
    this.getCharacteristicPointers = this.getCharacteristicPointers.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.reviewMetaData) !== JSON.stringify(this.props.reviewMetaData)) {
      this.getCharacteristicPointers(this.props.reviewMetaData);
    }
  }


  getCharacteristicPointers(reviewMetaDataObj) {
    var characteristicObj = reviewMetaDataObj.characteristics;
    for ( var charName in characteristicObj) {
      this.setState({[charName]: characteristicObj[charName].value}, () => {
        console.log(this.state);
      });
    }
  }

  render() {
    return (

      <div className='productBreakdownContainer'>

        {this.state.Size !== 0
          ?
          <div className='slidecontainer'>
            <br/>
            <span className= 'charName'>Size</span>
            <br/>
            <CharacteristicBar pointerValue = {this.state.Size}/>
            <div className= 'characteristicScaleContainer'>
              <span className = 'scaleLow'>Small</span>
              <span className = 'scaleMid'>Perfect</span>
              <span className= 'scaleHigh'>Big</span>
            </div>
          </div>
          :
          null
        }

        {this.state.Comfort !== 0
          ?
          <div className='slidecontainer'>
            <br/>
            <span className= 'charName'>Comfort</span>
            <br/>
            <CharacteristicBar pointerValue = {this.state.Comfort}/>
            <div className= 'characteristicScaleContainer'>
              <span className = 'scaleLow'>Uncomfortable</span>
              <span className = 'scaleMid'>OK</span>
              <span className= 'scaleHigh'>Perfect</span>
            </div>
          </div>
          :
          null
        }

        {this.state.Width !== 0
          ?
          <div className='slidecontainer'>
            <br/>
            <span className= 'charName'>Width</span>
            <br/>
            <CharacteristicBar pointerValue = {this.state.Width}/>
            <div className= 'characteristicScaleContainer'>
              <span className = 'scaleLow'>Narrow</span>
              <span className = 'scaleMid'>Perfect</span>
              <span className= 'scaleHigh'>Wide</span>
            </div>
          </div>
          :
          null
        }

        {this.state.Quality !== 0
          ?
          <div className='slidecontainer'>
            <br/>
            <span className= 'charName'>Quality</span>
            <br/>
            <CharacteristicBar pointerValue = {this.state.Quality}/>
            <div className= 'characteristicScaleContainer'>
              <span className = 'scaleLow'>Poor</span>
              <span className = 'scaleMid'>As Expected</span>
              <span className= 'scaleHigh'>Perfect</span>
            </div>
          </div>
          :
          null
        }

        {this.state.Length !== 0
          ?
          <div className='slidecontainer'>
            <br/>
            <span className= 'charName'>Length</span>
            <br/>
            <CharacteristicBar pointerValue = {this.state.Length}/>
            <div className= 'characteristicScaleContainer'>
              <span className = 'scaleLow'>Short</span>
              <span className = 'scaleMid'>Perfect</span>
              <span className= 'scaleHigh'>Long</span>
            </div>
          </div>
          :
          null
        }

        {this.state.Fit !== 0
          ?
          <div className='slidecontainer'>
            <br/>
            <span className= 'charName'>Fit</span>
            <br/>
            <CharacteristicBar pointerValue = {this.state.Fit}/>
            <div className= 'characteristicScaleContainer'>
              <span className = 'scaleLow'>Tight</span>
              <span className = 'scaleMid'>Perfect</span>
              <span className= 'scaleHigh'>Loose</span>
            </div>
          </div>
          :
          null
        }

      </div>
    );
  }
}

export default ProductBreakdown;