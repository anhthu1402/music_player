import React, { useState } from "react";
import Carousel from "react-simply-carousel";
import "../styles/BannerPlaylist.css";
import { PlaylistData } from "./Data/PlaylistData";
import { Link } from "react-router-dom";

function BannerPlaylist() {
  const [activeSlide, setActiveSlide] = useState(0);
  function getPlaylistImgUrl(url) {
    return require("../assets/" + url);
  }
  return (
    <div className="slider_wrapper">
      <Carousel
        containerProps={{
          style: {
            width: "100%",
            justifyContent: "center",
            userSelect: "none",
          },
        }}
        preventScrollOnSwipe
        swipeTreshold={60}
        activeSlideIndex={activeSlide}
        onRequestChange={setActiveSlide}
        forwardBtnProps={{
          show: false,
        }}
        backwardBtnProps={{
          show: false,
        }}
        dotsNav={{
          show: true,
          itemBtnProps: {
            style: {
              height: 16,
              width: 16,
              borderRadius: "50%",
              border: 0,
              background: "#dedede",
              margin: "10px 5px",
              cursor: "pointer"
            },
          },
          activeItemBtnProps: {
            style: {
              height: 16,
              width: 16,
              borderRadius: "50%",
              border: 0,
              background: "#ff7394",
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
              margin: "10px 5px",
            },
          },
        }}
        itemsToShow={3}
        itemsToScroll={1}
        speed={600}
        autoplay={true}
        autoplayDelay={4500}
        minWidth={1096}
        responsiveProps={[
          {
            itemsToShow: 2,
            itemsToScroll: 1,
            minWidth: 1096,
            maxWidth: 1469,
          },
          {
            itemsToShow: 1,
            itemsToScroll: 1,
            minWidth: 350,
            maxWidth: 1095,
          },
        ]}
      >
        {PlaylistData.map((item, index) => (
          <div className="slider">
            <Link to={`/playlistDetail/${item.playlistName}`} state={item}>
              <img
                key={index}
                title={item.playlistName}
                src={getPlaylistImgUrl(`${item.playlistImg}`)}
                className="image"
                alt={item.playlistName}
              />
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default BannerPlaylist;
