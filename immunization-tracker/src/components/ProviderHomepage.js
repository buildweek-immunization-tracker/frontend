import React from "react";

const ParentHomepage = () => {
  const userId = JSON.parse(localStorage.getItem("user ID"));

  return (
    <div className="provider-wrapper">
      <br />
      <br />
      <div>Provider Home Page for {userId}</div>
    </div>
  );
};

export default ParentHomepage;
