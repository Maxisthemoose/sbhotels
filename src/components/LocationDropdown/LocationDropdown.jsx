import React from "react";
import "./LocationDropdown.css";
import { data as Restaurants } from "../../landmarks/restaurants";
import { data as Attractions } from "../../landmarks/attractions";
import { data as Landmarks } from "../../landmarks/landmarks";

import { ReactComponent as DropdownArrow } from "../../icons/dropdown.svg";
import { Button } from "react-bootstrap";
import { ReactComponent as FilterIcon } from "../../icons/filterIcon.svg";

export default class LocationDropdown extends React.Component {

  /**
   * 
   * @param {{ type: "Restaurants" | "Attractions" | "Landmarks"}} props
   */
  constructor(props) {
    // this.props = props;
    super(props);

  }

  state = {
    data: this.props.type === "Restaurants" ? Restaurants : this.props.type === "Attractions" ? Attractions : Landmarks,
    open: false,
  };

  setOpen = () => {
    this.setState(state => ({
      data: state.data,
      open: !state.open,
    }));
  }

  render() {
    return (
      <div className="dropdown-parent">

        <div className="dropdown-header">
          <h3 className="location-title">{this.props.type}</h3>
          {this.state.open ? (
            <div className="search-items">
              <input type="text" placeholder={`Search for ${this.props.type}`} />
              <FilterIcon className="filter-icon" />
            </div>
          ) : ""}

          <DropdownArrow className={`dropdown-arrow ${this.state.open ? "open" : "closed"}`} onClick={this.setOpen} />
        </div>

        {
          this.state.open ?
            (
              <div className="dropdown-content-container">
                {
                  // Assume GEOJSON format for data
                  this.state.data.map(location => (
                    <div className="location-container">
                      <h4>{location.properties.title.length > 25 ? location.properties.title.slice(0, 25) : location.properties.title}</h4>
                      <Button className="directions-button">Get Directions</Button>
                      <Button className="info-button">More Info</Button>
                    </div>
                  ))
                }
              </div>
            )
            : ""
        }
      </div>
    );
  }
}