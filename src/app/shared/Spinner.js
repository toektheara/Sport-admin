import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div>
        <div className="spinner-wrapper" style={{ width: '100vw' }}>
          <div className="donut"></div>
        </div>
      </div>
    )
  }
}

export default Spinner
