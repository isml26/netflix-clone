import "./home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";

function Home({ type }) {
  const [lists, setLits] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDBiZWViYzM4MTU0M2Q1NTJjZWY4NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTY0Njg3OSwiZXhwIjoxNjMyMDc4ODc5fQ.IdYiAwVsC0ns3r08p9M2dgYqruDdaiuSj8KP9yg_MbM",
            },
          }
        );
        setLits(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list,i)=>
        <List list={list} key={i} />
    )}
    </div>
  );
}

export default Home;
