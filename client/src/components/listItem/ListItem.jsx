import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import { axiosInstance } from "../../config";
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import "./listItem.scss";

function ListItem({index,item}) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie,setMovie] = useState({});
  useEffect(()=>{
    const getMovie = async()=>{
      try {
        const res = await axiosInstance.get("/movies/find/"+item,{
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem('user')).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    getMovie();
    return () => {
    };
  },[item])

  return (
    <Link to={{pathname:"/watch",movie:movie}}>
    <div
      className="listItem"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      style={{left:isHovered && index * 225 - 50 + index*3.5}}
    >
      <img
        src={movie.img}
        alt=""
      />
      {isHovered && (
        <>
      <video src={movie.trailer} autoPlay={true} loop/>
      <div className="itemInfo">
        <div className="icons">
          <PlayArrow className="icon"/>
          <Add className="icon"/>
          <ThumbUpAltOutlined className="icon"/>
          <ThumbDownOutlined className="icon"/>
        </div>
        <div className="itemInfoTop">
          <span>{movie.duration}</span>
          <span className="limit">+15</span>
          <span>2002</span>
        </div>
        <div className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          modi dolores accusamus laudantium perferendi.
        </div>
        <div className="genre">{movie.genre}</div>
      </div>
      </>
      )}
    </div>
    </Link>
  );
}

export default ListItem;
