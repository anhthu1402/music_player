import React, { Component } from "react";
import ReactSearchBox from "react-search-box";
import { SearchBarData } from "./SearchBarData";
import SearchIcon from "@mui/icons-material/SearchRounded";

export class SearchBar extends Component {
  render() {
    return (
      <ReactSearchBox
        placeholder="Tìm kiếm tên bài hát, nghệ sĩ, ..."
        inputBorderColor="transparent"
        leftIcon={<SearchIcon style={{ marginRight: `30px` }} />}
        inputBackgroundColor="transparent"
        inputHeight="2.7rem"
        data={SearchBarData}
        value="Doe"
        callback={(record) => console.log(record)}
      />
    );
  }
}
