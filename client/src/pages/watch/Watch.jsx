import React from 'react';
import { ArrowBackIosOutlined } from '@material-ui/icons';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './watch.scss';

function Watch() {
    const location = useLocation();
    const movie = location.movie;

    return (
        <div className="watch">
            <Link to = "/">
            <div className="back">
                <ArrowBackIosOutlined/>
                Home
            </div>
            </Link>
            <video src={movie.video} className="video" autoPlay onProgress={true} controls></video>
        </div>
    )
}

export default Watch
