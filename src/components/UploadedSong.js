import React from "react";
import UploadPicture from "../assets/upload.png";

function UploadedSong() {
  return (
    <div>
      <div className="empty">
        <img src={UploadPicture} alt="" width="150px" height="150px" />
        <label>Chưa có bài hát tải lên trong thư viện</label>
        <button>Tải lên ngay</button>
      </div>
    </div>
  );
}

export default UploadedSong;
