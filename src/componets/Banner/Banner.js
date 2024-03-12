import React, {useState, useEffect} from "react";
import axios from "axios";
import requests from "../../request";
import "./Banner.css";
const Banner = () => {
  const [movies, setmovies] = useState([]);
  const baseURL = "https://api.themoviedb.org/3";
  console.log(Math.floor(Math.random() * 20));
  const url = `${baseURL + requests.orginals}`;
  useEffect(() => {
    async function data() {
      const request = await axios.get(url);

      // setmovies();
      setmovies(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }

    data();
  }, []);
  const many = (str) => {
    return str?.length > 90 ? str.substring(0, 150) + "..." : str;
  };
  return (
    <div className="w-full">
      <div className="w-full h-[80vh]">
        <div
          className="bg"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movies?.backdrop_path})`,
          }}>
          <div className="name">{movies?.name}</div>
          <p className="over">{many(movies?.overview)}</p>
          <div className="butt">
            <div className="play">Play</div>
            <div className="play">List</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
