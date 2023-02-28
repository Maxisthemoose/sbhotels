import React from "react";
import "./InfoPopup.css";

export default class InfoPopup extends React.Component {
  /**
   * 
   * @param {{data: {}}} props 
   */
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="backdrop">
        <div className="popup-container">

          <h3 className="title">
            {this.props.data.properties.title}
          </h3>

        </div>
      </div>
    )
  }

}