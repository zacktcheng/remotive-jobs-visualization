import React from "react";
import Content from "./component/compound/Content";

const App = () => {

  React.useEffect(() => {
    sessionStorage.clear();
  }, []);

  return <Content />;
};

export default App;
