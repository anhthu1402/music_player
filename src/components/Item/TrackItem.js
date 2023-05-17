import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { isEqualDate } from '@progress/kendo-date-math';

function TrackItem({ item, key }) {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const endDate = new Date(2023, 4, 13);
  // const releaseDate = new Date(item.releaseDate);
  // const endDate = new Date(date);
  const calcDate = isEqualDate(endDate, current);
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
        <div>{ calcDate ? `Hôm nay` : item.releaseDate }</div>
      </div>
    </div>
  );
}

export default TrackItem;
