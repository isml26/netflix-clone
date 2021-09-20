import { InfoOutlined, Movie, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect } from "react";
import "./featured.scss";

function Featured({ type }) {
  const [content,setContent] = React.useState({});

  useEffect(()=>{
    const getRandomContent = async()=>{
      try {
        const res = await axios.get(`/movies/random?type=${type}`,{
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDBiZWViYzM4MTU0M2Q1NTJjZWY4NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMjEyNTk5OSwiZXhwIjoxNjMyNTU3OTk5fQ.5Bd_cGbfL1hUHERLx1dJTffJOtiJyzbI2F0wzogo9ok",
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent()
  },[type]);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        src={content.img}
        alt=""
      />
      <div className="info">
        {/* <img
          src={content.imgTitle}
          alt=""
        /> */}
        <span className="title">
          {content.imgTitle}
        </span>
        <span className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente rem cumque porro praesentium est, quae similique, voluptatem eaque quo eum molestias ipsa nihil asperiores iusto eligendi iure expedita, necessitatibus tempora.
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
