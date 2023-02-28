import React from "react";
import "./LocationDropdown.css";
import { data as Restaurants } from "../../landmarks/restaurants";
import { data as Attractions } from "../../landmarks/attractions";
import { data as Landmarks } from "../../landmarks/landmarks";

import { ReactComponent as DropdownArrow } from "../../icons/dropdown.svg";
import { Button } from "react-bootstrap";
import { ReactComponent as FilterIcon } from "../../icons/filterIcon.svg";
import InfoPopup from "../InfoPopup/InfoPopup";

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
    text_filter: "",
    popupData: null,
  };

  setOpen = () => {
    this.setState(state => ({
      data: state.data,
      text_filter: "",
      // other_filters: state.other_filters,
      open: !state.open,
    }));
  }

  setTextFilter = (text) => {
    this.setState(state => ({
      open: state.open,
      data: state.data,
      // other_filters: state.other_filters,
      text_filter: text,
    }));
  }

  render() {
    return (
      <div className="dropdown-parent">

        <div className="dropdown-header">
          <h3 className="location-title title">{this.props.type}</h3>
          {this.state.open ? (
            <div className="search-items">
              <input onInput={(ev) => this.setTextFilter(ev.target.value)} type="text" placeholder={`Search for ${this.props.type}`} />
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
                  this.state.data.filter(v => v.properties.title.toLowerCase().includes(this.state.text_filter.toLowerCase())).map(location => (
                    <div className="location-container">
                      <h4 className="title">{location.properties.title}</h4>

                      <Button onClick={() => {
                        this.setOpen();
                        this.props.directions.setOrigin("223 Castillo Blvd, Santa Barbara, California");
                        this.props.directions.setDestination(location.properties.address + ", Santa Barbara, California");
                      }} className="directions-button text">Directions</Button>

                      <Button onClick={() => this.setState(state => ({
                        ...state,
                        popupData: location,
                      }))} className="info-button text">Info</Button>
                    </div>
                  ))
                }
              </div>
            )
            : ""
        }

        {
          this.state.popupData !== null ?
            <InfoPopup data={this.state.popupData} />
            : <></>
        }

      </div>
    );
  }
}