import React from "react";
import { CssBaseline, useScrollTrigger } from "@mui/material";
import AppBar from "./AppBar";
import Header from "./Header";
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 1 : 0,
  });
}

function AppAppBar(props) {
  return (
    <div className="appBarHeader" style={{ marginBottom: "70px" }}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          className="appBar"
          position="fixed"
          style={{
            width: `calc(100% - 17vw)`,
            padding: `1.2vw`,
            backgroundColor: "white",
            zIndex: 8,
          }}
        >
          <Header className="header" />
        </AppBar>
      </ElevationScroll>
    </div>
  );
}

export default AppAppBar;
