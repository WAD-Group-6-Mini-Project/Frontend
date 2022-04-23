import { React } from "react";

const LocationSvg = (props) => {
  return (
    <div>
      <img src={props.path} style={{ width: "60%" }} alt={props.location}></img>
    </div>
  );
};

export default LocationSvg;
