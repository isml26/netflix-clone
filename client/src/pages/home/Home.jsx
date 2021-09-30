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
                "Bearer "+JSON.parse(localStorage.getItem('user')).accessToken,
            },
          }
        );
        setLits(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
    return () => {
    };
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list,i)=>
        <List list={list} key={i} />
    )}
    </div>
  );
}

export default Home;
