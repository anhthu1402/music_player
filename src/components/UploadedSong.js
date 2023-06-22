import React from "react";
import UploadPicture from "../assets/upload.png";
import UploadedSongItem from "./Item/UploadedSongItem";
import { useContext, useEffect, useState } from "react";
import MusicPlayerContext from "../MusicPlayerContext";
import NotificationContext from "../NotificationContext";
import "../styles/UploadedSong.css";
import axios from "axios";
import { Box } from "@mui/material";
import { showNotification, uploadSong } from "../service";

function UploadedSong() {
  const cloudName = "dpwehcnso"; //vi
  // const cloudName = "dvmxvwqev";
  const player = useContext(MusicPlayerContext);
  const notification = useContext(NotificationContext);
  // const uploadSong = () => {
  //   notification.setIsUploaded(true);
  //   localStorage.setItem("isUploaded", true);
  // };

  //userId tạm thời
  const userId = 1;

  const [audioUrl, setAudioUrl] = useState("");
  const [timeLimit, setTimeLimit] = useState();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [src, setSrc] = useState();
  const [loadImage, setLoadImage] = useState(false);
  const [loadAudio, setLoadAudio] = useState(false);
  const processFileAudio = async (e) => {
    showNotification(notification, "Đang tải bài hát lên");
    setLoadImage(false);
    setLoadAudio(false);
    var file = e.target.files[0];
    var jsmediatags = window.jsmediatags;
    jsmediatags.read(file, {
      onSuccess: function (tag) {
        console.log(tag);
        if (Object.hasOwn(tag.tags, "artist") === false) {
          setArtist("Various Artists");
        } else {
          setArtist(tag.tags.artist);
        }
        if (Object.hasOwn(tag.tags, "title") === false) {
          setTitle(file.name.slice(0, -4));
        } else {
          setTitle(tag.tags.title);
        }
        if (Object.hasOwn(tag.tags, "picture") === false) {
          setSrc(
            "https://static.vecteezy.com/system/resources/previews/000/546/041/original/music-notes-vector-icon.jpg"
          );
          setLoadImage(true);
        } else {
          const { data } = tag.tags.picture;
          const format = tag.tags.picture.format;
          let base64String = "";
          for (var i = 0; i < data.length; i++) {
            base64String += String.fromCharCode(data[i]);
          }
          setSrc(`data:${format};base64,${window.btoa(base64String)}`);
          processFileImage(
            `data:${format};base64,${window.btoa(base64String)}`
          );
        }

        //setSrc(`data:${format};base64,${window.btoa(base64String)}`);
        // https://wallpaperaccess.com/full/1792301.png
      },
      onError: function (error) {
        console.log(error);
      },
    });

    var POST_URL = "https://api.cloudinary.com/v1_1/" + cloudName + "/upload";
    processFile();
    var uniqueId;

    function processFile(e) {
      console.log("changed");
      uniqueId = cloudName + new Date().getTime();
      var size = file.size;
      var sliceSize = 10 * 1000000;
      var start = 0;

      setTimeout(loop, 500);

      function loop() {
        console.log("looping");
        var end = start + sliceSize;

        if (end > size) {
          end = size;
        }
        var s = file.slice(start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 500);
        }
      }
    }

    async function send(piece, start, end, size) {
      var formdata = new FormData();

      formdata.append("file", piece);
      formdata.append("cloud_name", cloudName);
      formdata.append("upload_preset", "musicplayer_audio");

      const headers = {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
      };
      headers["X-Unique-Upload-Id"] = uniqueId;
      headers["X-Requested-With"] = "XMLHttpRequest";
      headers["Content-Range"] = "bytes " + start + "-" + end + "/" + size;
      const requestConfig = {
        url: POST_URL,
        method: "POST",
        data: formdata,
        headers,
      };
      const response = await axios(requestConfig);
      if (response?.data?.asset_id) {
        //Here i am trying to print the output of the response after the video is posted in cloudinary
        console.log(response, "response");
        setAudioUrl(response.data.url);
        setTimeLimit(formatDuration(response.data.duration));
        setLoadAudio(true);
      }
    }
  };
  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }
  const processFileImage = async (src) => {
    var file = DataURIToBlob(src);

    var POST_URL = "https://api.cloudinary.com/v1_1/" + cloudName + "/upload";
    processFile();
    var uniqueId;

    function processFile(e) {
      console.log("changed");
      uniqueId = cloudName + new Date().getTime();
      var size = file.size;
      var sliceSize = 10 * 1000000;
      var start = 0;

      setTimeout(loop, 500);

      function loop() {
        console.log("looping");
        var end = start + sliceSize;

        if (end > size) {
          end = size;
        }
        var s = file.slice(start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 500);
        }
      }
    }

    async function send(piece, start, end, size) {
      // console.log("end", end);

      var formdata = new FormData();

      formdata.append("file", piece);
      formdata.append("cloud_name", cloudName);
      formdata.append("upload_preset", "musicplayer_image");

      const headers = {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
      };
      headers["X-Unique-Upload-Id"] = uniqueId;
      headers["X-Requested-With"] = "XMLHttpRequest";
      headers["Content-Range"] = "bytes " + start + "-" + end + "/" + size;
      const requestConfig = {
        url: POST_URL,
        method: "POST",
        data: formdata,
        headers,
      };
      const response = await axios(requestConfig);
      if (response?.data?.asset_id) {
        //Here i am trying to print the output of the response after the video is posted in cloudinary
        console.log(response.data.url, "response");
        setSrc(response.data.url);
        setLoadImage(true);
      }
    }
  };
  function formatDuration(value) {
    value = Math.ceil(value);
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  const [isUploaded, setIsUploaded] = useState(false);
  window.onload = function () {
    setIsUploaded(false);
  };
  useEffect(() => {
    if (loadAudio && loadImage) {
      //cập nhật bài hát vào csdl
      uploadSong(title, audioUrl, artist, src, timeLimit, userId);
      showNotification(notification, "Một file đã được tải lên");
      setLoadAudio(false);
      setLoadImage(false);
      setIsUploaded(true);
    }
  }, [
    artist,
    audioUrl,
    loadAudio,
    loadImage,
    notification,
    src,
    timeLimit,
    title,
    isUploaded,
  ]);
  return (
    <div>
      <div className="uploadedSong">
        {isUploaded ? (
          <div></div>
        ) : (
          <div className="empty">
            <img src={UploadPicture} alt="" />
            <label>Chưa có bài hát tải lên trong thư viện</label>
          </div>
        )}
        <label class="label">
          <input type="file" required onChange={processFileAudio} />
          <span>Tải bài hát lên</span>
        </label>
      </div>
      {isUploaded ? (
        <div className="song shadowDiv">
          <UploadedSongItem
            songName={title}
            songLink={audioUrl}
            representation={artist}
            songImage={src}
            timeLimit={timeLimit}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default UploadedSong;
