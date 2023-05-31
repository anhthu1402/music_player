import React from "react";
import { Grid, Card, Typography } from "@mui/material";
import PlaylistItem from "./Item/PlaylistItem";
import "../styles/MyPlaylist.css";
import { getAllPlaylists } from "./API/getAllPlaylists";
import CreateNewPlaylist from "./CreateNewPlaylist";
import { AddCircleRounded } from "@mui/icons-material";
import { useRef } from "react";

function AllPlaylist() {
  const createRef = useRef();
  const closeCreatePlaylist = () => createRef.current.close();
  const openCreatePlaylist = () => createRef.current.open();
  return (
    <div>
      <Grid
        container
        className="myPlaylist"
        rowSpacing={1}
        columnSpacing={{ sm: 2, xs: 1 }}
      >
        <Grid item sm={3} xs={4}>
          <Card
            className="createNew"
            sx={{
              width: "19vw",
              height: "21vw",
              backgroundColor: "#FEE9EF",
              borderRadius: "15px",
              marginRight: 0,
            }}
          >
            <AddCircleRounded
              onClick={() => openCreatePlaylist()}
              sx={{
                fontSize: "5vw",
                color: "#FF9EB6",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            />
            <CreateNewPlaylist
              createRef={createRef}
              closeCreatePlaylist={closeCreatePlaylist}
            />
            <Typography variant="h6" sx={{ fontSize: "1.4vw" }}>
              Tạo playlist mới
            </Typography>
          </Card>
          <CreateNewPlaylist />
        </Grid>
        {getAllPlaylists.map((item, index) => (
          <Grid item sm={3} xs={4}>
            <PlaylistItem item={item} key={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default AllPlaylist;
