import React from "react";

const ParentHomepage = props => {
  console.log(props);
  return <div>Provider Home Page for {props.match.params.id}</div>;
};

export default ParentHomepage;
