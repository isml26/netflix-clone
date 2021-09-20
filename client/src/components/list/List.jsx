import React from "react";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import ListItem from "../listItem/ListItem";
import "./list.scss";

function List({list}) {
  const [slideNumber, setSlideNumber] = React.useState(0);
  const [isMoved,setIsMoved] = React.useState(false);
  const listRef = React.useRef();
  
  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber >0) {
        setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${232 + distance}px)`;
    }
    if (direction === "right" && slideNumber <list.content.length- 6) {
        setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-232 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => {
            handleClick("left");
          }}
          style={{display:(!isMoved) && "none"}}
        />
        <div className="container" ref={listRef}>
        {list.content.map((item,i)=>
          <ListItem index={i} item={item} key={i}/>
        )}
          
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => {
            handleClick("right");
          }}
        />
      </div>
    </div>
  );
}

export default List;
