import React from "react";
import ReactSearchBox from "react-search-box";
import { SearchBarData } from "./Data/SearchBarData";
import SearchIcon from "@mui/icons-material/SearchRounded";

export function SearchBar() {
  return (
    <div className="searchBar">
      <ReactSearchBox
        className="searchbox"
        placeholder="Tìm kiếm tên bài hát, nghệ sĩ, ..."
        data={SearchBarData}
        onSelect={(record) => console.log(record)}
        onFocus={() => {
          console.log("This function is called when is focussed");
        }}
        onChange={(value) => console.log(value)}
        leftIcon={
          <>
            <SearchIcon sx={{ fontSize: "1.5vw" }} />
          </>
        }
        inputFontSize="1vw"
        inputBorderColor="transparent"
        inputBackgroundColor="#FFE1E8"
        inputHeight="2.7vw"
        iconBoxSize="50px"
        dropdownHoverColor="#FEE9EF"
      />
    </div>
  );
}
