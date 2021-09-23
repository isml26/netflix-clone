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
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDBiZWViYzM4MTU0M2Q1NTJjZWY4NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMjEyNTk5OSwiZXhwIjoxNjMyNTU3OTk5fQ.5Bd_cGbfL1hUHERLx1dJTffJOtiJyzbI2F0wzogo9ok",
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
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list,i)=>
        <List list={list} key={i} />
    )}
    </div>
  );
}

export default Home;
