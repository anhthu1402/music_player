import React, { useState, useEffect, useContext } from 'react';
import TrackItem from './Item/TrackItem';
import { SongData } from './Data/SongData';
import MusicPlayerContext from '../MusicPlayerContext';
import "../styles/NewSongRank.css";
import { Link } from 'react-router-dom'

function NewSongRank() {
    const tracks = SongData;
    const song = useContext(MusicPlayerContext);
    useEffect(() => {
        const handleWindowResize = () => {
            let box = document.querySelector('.trackList');
            let item = box.querySelectorAll('.item');
            let width = box.clientWidth;
            if(width > 970){
                for (let i = 0; i < item.length; i++) 
                    item[i].style.width = (width-30)/3 - 20 + "px";
            }
            else if(width <= 970 && width > 645){
                for (let i = 0; i < item.length; i++) 
                    item[i].style.width = (width-30)/2 - 15 + "px";
            }
            else if (width <= 645 && width >= 300) {
                for (let i = 0; i < item.length; i++) 
                    item[i].style.width = width - 30 + "px";
            }
            else {
                for (let i = 0; i < item.length; i++) 
                    item[i].style.width = "300px";
            }
        };
        window.addEventListener('resize', handleWindowResize);
        handleWindowResize();
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });
    const btnPrev = () => {
        let box = document.querySelector('.trackList');
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft - width;
    }
    let count = 0;
    const btnNext = () => {
        let box = document.querySelector('.trackList');
        let width = box.clientWidth;

        if (width >= 300) {
            box.scrollLeft = box.scrollLeft + width;
        }
        else box.scrollLeft = box.scrollLeft + 330;
        count += 1;
        if(width > 970){
            if (count > 4) {
                box.scrollLeft -= width*3;
                count = 0;
            }
        }
        else if(width <= 970 && width > 645){
            if (count > 6) {
                box.scrollLeft -= width*5;
                count = 0;
            }
        }
        else if (width <= 645 && width >= 300) {
            if (count > 10) {
                box.scrollLeft -= width*9;
                count = 0;
            }
        }
        else {
            if (count > 10) {
                box.scrollLeft -= 300*9;
                count = 0;
            }
        }
    }
    useEffect(() => {
        let carousel = document.querySelector('.newSongRankContainer');
        const btnForw = document.querySelector('.btnForw');

        const slideTiming = 4000;
        let interval;

        const slideInterval = () => interval = setInterval(() => btnForw.click(), slideTiming)
        
        carousel.addEventListener('mouseover', () => clearInterval(interval));
        carousel.addEventListener('mouseleave', slideInterval);
        slideInterval();
    }, []);

    return (
        <div className='newSongRankContainer'>
            <button className='btnBack' onClick={btnPrev}>{`<`}</button>
            <button className='btnForw' onClick={btnNext}>{`>`}</button>
            <div class='trackList'>
                {SongData.map((item, key) => key < 8 && 
                    <div className='song shadowDiv'>
                        <TrackItem 
                            item={item} 
                            key={key} 
                            tracks={tracks}
                            song={song}
                            index={key}/>
                        <div className='ordinalNum'>#{key+1}</div>
                    </div>
                )}
                <div className='song shadowDiv'>
                    <div className='item'>
                        <div className='center'>
                            <p><Link to={'/charts'}>Xem tất cả »</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewSongRank
