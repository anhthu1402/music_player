import React from "react";
import { SearchBar } from "./SearchBar";

function Header() {
  return (
    <div>
      <div
        className="searchBar"
        style={{
          margin: `20px`,
          paddingLeft: `30px`,
          backgroundColor: `#FFE1E8`,
          width: `400px`,
          border: `1px solid transparent`,
          borderRadius: `30px`,
        }}
      >
        <SearchBar />
      </div>
    </div>
  );
}

export default Header;
