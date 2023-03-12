import React, { useEffect, useState } from "react";
import "./LocationDropdown.css";
import { data as Restaurants } from "../../landmarks/restaurants";
import { data as Attractions } from "../../landmarks/attractions";
import { data as Activities } from "../../landmarks/activities";

import { ReactComponent as DropdownArrow } from "../../icons/dropdown.svg";
import { Button } from "react-bootstrap";
import { ReactComponent as FilterIcon } from "../../icons/filterIcon.svg";
import InfoPopup from "../InfoPopup/InfoPopup";
/** 
 * @param {{ type: "Restaurants" | "Attractions" | "Activities"}} props
 */
export default function LocationDropdown(props) {

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [text_filter, setTextFilter] = useState("");
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    setData(
      props.type === "Restaurants" ? Restaurants : props.type === "Attractions" ? Attractions : Activities,
    );
  }, []);

  // state = {
  //   data: this.props.type === "Restaurants" ? Restaurants : this.props.type === "Attractions" ? Attractions : Activities,
  //   open: false,
  //   text_filter: "",
  //   popupData: null,
  // };

  // setOpen = () => {
  //   this.setState(state => ({
  //     data: state.data,
  //     text_filter: "",
  //     // other_filters: state.other_filters,
  //     open: !state.open,
  //   }));
  // }

  // setTextFilter = (text) => {
  //   this.setState(state => ({
  //     open: state.open,
  //     data: state.data,
  //     // other_filters: state.other_filters,
  //     text_filter: text,
  //   }));
  // }


  return (
    <div className="dropdown-parent">

      <div className="dropdown-header">
        <h3 className="location-title title">{props.type}</h3>
        {open ? (
          <div className="search-items">
            <input onInput={(ev) => setTextFilter(ev.target.value)} type="text" placeholder={`Search for ${props.type}`} />
            <FilterIcon className="filter-icon" />
          </div>
        ) : ""}

        <DropdownArrow className={`dropdown-arrow ${open ? "open" : "closed"}`} onClick={() => setOpen((prev) => !prev)} />
      </div>

      {
        open ?
          (
            <div className="dropdown-content-container">
              {
                // Assume GEOJSON format for data
                data.filter(v => v.properties.title.toLowerCase().includes(text_filter.toLowerCase())).map(location => (
                  <div className="location-container">
                    <h4 className="title">{location.properties.title}</h4>

                    <Button onClick={() => {
                      setOpen(false);
                      props.directions.setOrigin("223 Castillo Blvd, Santa Barbara, California");
                      props.directions.setDestination(location.properties.address + ", Santa Barbara, California");
                    }} className="directions-button text">Directions</Button>

                    <Button onClick={() => setPopupData(location)} className="info-button text">Info</Button>
                  </div>
                ))
              }
            </div>
          )
          : <></>
      }

      {
        popupData !== null ?
          <InfoPopup data={popupData} close={setPopupData} />
          : <></>
      }

    </div>
  );

}