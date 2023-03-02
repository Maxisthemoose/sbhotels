import React from "react";
import "./InfoPopup.css";
import { Navbar } from "react-bootstrap";
import { ReactComponent as Close } from "../../icons/close.svg";

export default class InfoPopup extends React.Component {
  /**
   * 
   * @param {{data: {}, close: Function}} props 
   */
  constructor(props) {
    super(props);
    this.setState.bind(this);
  }


  render() {
    return (
      <div className="backdrop">
        <div className="popup-container">
          <nav className="popup-navbar">

            <div className="close-button" onClick={() => {
              if (document.getElementsByTagName("body").item(0).style.overflow === "hidden")
                document.getElementsByTagName("body").item(0).style.overflow = "";
              this.props.close(() => ({ popupData: null }))
            }
            }>
              <Close className="close-icon" />
              <p className="icon">CLOSE</p>
            </div>

            <h2 className="title location-name">
              {this.props.data.properties.title}
            </h2>
          </nav>

          <div className="location-content">
            <img className="location-preview" src="https://via.placeholder.com/600x600" alt={`${this.props.data.properties.title}`} />
            {/* REPLACE --rating VALUE WITH ACTUAL VARIABLE */}
            <div className="review-container" style={{ "--rating": "4.8" }}>
              <p className="review text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora omnis nobis illo distinctio officia alias totam nostrum</p>
            </div>
            <div className="content-block">
              <br />

              {this.props.data.properties.style !== undefined ?
                <div className="style">
                  <p>{this.props.data.properties.title} includes; <strong>{this.props.data.properties.style.split(")").join("")} Foods</strong></p>
                </div>
                : <></>}

              <div className="hours">
                <p>{this.props.data.properties.hours}</p>
              </div>

              <div className="address">
                <p>{this.props.data.properties.address}</p>
              </div>

              <div className="website">
                <p>{this.props.data.properties.website}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }

}