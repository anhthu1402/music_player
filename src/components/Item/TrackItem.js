import React from "react";
import { Link } from "react-router-dom";

function TrackItem({ item, key }) {
  return (
    <div className="item">
      <div className="songImg">
        <img src={require(`../../assets/${item.image}`)} alt={item.name} />
      </div>

      <div className="songDetail">
        <div>{item.title}</div>
        <div className="artist">
          {item.artist.map((child, index) => (
            <span key={index} item={child}>
              <Link to={`/artist/${child.name}`} state={child}>
                {child.name}
              </Link>
            </span>
          ))}
        </div>
        <div>Hôm nay</div>
      </div>
    </div>
  );
}

export default TrackItem;
