import React from "react";

const ParentHomepage = () => {
  const userId = JSON.parse(localStorage.getItem("user ID"));

  return <div>Provider Home Page for {userId}</div>;
};

export default ParentHomepage;
