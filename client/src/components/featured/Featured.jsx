import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import { axiosInstance } from "../../config";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./featured.scss";

function Featured({ type ,setGenre}) {
  const [content,setContent] = React.useState({});
  const movie = {
    video:"https://firebasestorage.googleapis.com/v0/b/netflix-1097f.appspot.com/o/items%2FRick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up%20(Official%20Music%20Video).webm?alt=media&token=51f96cc3-f179-40c3-8a7f-e8de82255803"
  }
  useEffect(()=>{
    const getRandomContent = async()=>{
      try {
        const res = await axiosInstance.get(`movies/random?type=${type}`,{
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem('user')).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
    return () => {
    };
  },[type]);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          {/* <select name="genre" id="genre" onChange={e=>setGenre(e.target.value)}>
            <option value={null}>Genre</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Historical">Historical</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select> */}
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente rem cumque porro praesentium est, quae similique, voluptatem eaque quo eum molestias ipsa nihil asperiores.
        </span>
        <div className="buttons">
        <Link to={{pathname:"/watch",movie:movie}}> 
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          </Link>
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
