import React from "react";
import ShotsTableP from "./ProviderRecordPage/ShotsTableP";

const ParentHomepage = () => {
  const userId = JSON.parse(localStorage.getItem("user ID"));

  return (
    <div className="provider-wrapper">
      <br />
      <br />
      <div>Provider Home Page for {userId}</div>
      <ShotsTableP id="1"/>
    </div>
  );
};

export default ParentHomepage;
