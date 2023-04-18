import React from "react";
import "../styles/Song.css";

function Song() {
  return (
    <div className="librarySong">
      <hr style={{ border: `0.1px solid rgba(128, 128, 128, 0.356)` }}></hr>
      <hr
        style={{
          width: `70px`,
          border: `1.6px solid #FF9EB6`,
        }}
      ></hr>
    </div>
  );
}

export default Song;
