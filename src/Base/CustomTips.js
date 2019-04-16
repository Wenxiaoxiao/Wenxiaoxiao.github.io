import React, { Component } from 'react';
import loading from './loading_.gif'

class CustomTips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <div>
          <div id="MyLoading_Modal" style={{display:this.props.loading === true ? 'block':'none'}}>
              <div><img src={loading}/></div>
          </div>
      </div>
    );
    
  }
}

export default CustomTips;