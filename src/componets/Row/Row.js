import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import YouTube from "react-youtube";
import {Navigation} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {CiHeart} from "react-icons/ci";
import {TbHeartBroken} from "react-icons/tb";
import React, {useEffect, useState} from "react";
import "./Row.css";
import movieTrailer from "movie-trailer";
import {db} from "../../config/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {useSelector} from "react-redux";
import {ToastContainer, toast} from "react-toastify";
const path = "https://image.tmdb.org/t/p/original";
const Row = ({title, URL, Large}) => {
  const [movies, setmovies] = useState([]);
  const [trailer, settrailer] = useState("");
  const [docs, setDocs] = useState([]);
  const [video, setvideo] = useState([]);
  const [ids, setIds] = useState([]);
  const email = useSelector((state) => state.auth.email);
  const fetchPost = async () => {
    await getDocs(collection(db, "users")).then((e) => {
      const newData = e.docs.map((doc) => ({...doc.data(), email: doc.id}));
      const array = newData.find((e) => e.email === email);

      setIds(array?.tvshows.map((e) => e.id));
      setDocs(array?.tvshows);
    });
  };
  useEffect(() => {
    const baseURL = "https://api.themoviedb.org/3";
    const url = `${baseURL}${URL}`;
    fetchPost();
    async function data() {
      const request = await axios.get(url);
      setmovies(request.data.results);
      return request;
    }
    data();
  }, []);
  // console.log(movies);

  const hidden = (e, el) => {
    setvideo(el);
    const img =
      e.target.parentElement.parentElement.parentElement.parentElement.querySelector(
        ".hidden"
      );
    console.log(el.first_air_date);
    const videos = document.querySelectorAll("#vid");
    videos.forEach((e) => e.classList.remove("flex"));
    try {
      movieTrailer(el.name || el.title || el.original_name || "").then(
        (res) => {
          img.classList.remove("hidden");
          img.classList.add("flex");
          console.log(res?.split("v=")[1]);

          settrailer(res ? res.split("v=")[1] : "EC9EFoot_a0");
        }
      );
    } catch {
      console.log(e);
    }
  };
  const Close = (e) => {
    const remove = e.target.parentElement.parentElement;
    remove.classList.remove("flex");
    remove.classList.add("hidden");
  };
  const opts = {
    height: "390",
    width: "100%",
    // host: "https://www.youtube.com",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
    },
  };
  const heart = async (e, el) => {
    const add = e.target.parentElement.classList.toggle("active");
    if (add) {
      try {
        await updateDoc(doc(db, "users", email), {
          tvshows: arrayUnion(el),
        });
        toast.success("Add the movie to favorites");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      const docu = docs.filter((e) => e.id !== el);
      console.log(docu);
      try {
        await updateDoc(doc(db, "users", email), {
          tvshows: docu,
        });
        toast.error("Delete the movie to favorites");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />

      <div className="row">
        <h2 className="title"> {title}</h2> ={" "}
        <div
          className="w-full h-full fixed z-10 top-0 left-0 items-center justify-center hidden bg-black/45"
          id="vid">
          <div className="w-[300px] md:w-[500px] h-[28rem] bg-black  shadow-lg relative">
            <YouTube
              className="w-full h-2/3"
              id="youtube"
              videoId={trailer}
              opts={opts}
            />
            <div
              onClick={Close}
              className="absolute cursor-pointer right-3 top-3 w-8 h-8  flex justify-center items-center rounded-full  text-white bg-gray-800">
              X
            </div>
            <div className="flex m-2 mt-4">
              <div
                className={
                  video.vote_average > 8.0
                    ? "text-green-500"
                    : video.vote_average > 6.0
                    ? "text-yellow-400"
                    : "text-red-500"
                }>
                {Math.round(video.vote_average * 10)}% Match
              </div>
              <div className="text-white ml-2">
                {video.first_air_date
                  ? video.first_air_date
                  : video.release_date}
              </div>
              <div className="text-white flex justify-center items-center font-bold text-xs font-serif italic border ml-3 gray-100">
                HD
              </div>
            </div>
            <div className="m-2 flex  ">
              <div className="text-white text-xs overflow-auto h-24 flex-initial w-80">
                {" "}
                {video.overview}
              </div>
              <div className="text-white ml-2">
                <div className="text-xs">
                  <span className="text-gray-500 text-xs">Title:</span>
                  {video.title ? video.title : video.name}
                </div>
                <div className="text-xs mt-1">
                  <span className="text-gray-500 text-xs">
                    OriginalLanguage:
                  </span>
                  {video.original_language}
                </div>
                <div className="text-xs mt-1">
                  <span className="text-gray-500 text-xs">adult</span>
                  {video.adult ? (
                    <span className="text-green-500">+18</span>
                  ) : (
                    <span className="text-red-500">-18</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Swiper
          spaceBetween={10}
          slidesPerView={window.screen.availWidth > 414 ? 5 : 3}
          // navigation={fa}
          modules={[Navigation]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}>
          <div className="poster">
            {movies.map((e) => {
              return (
                <>
                  <ToastContainer />
                  <SwiperSlide className="swipp">
                    <div
                      className={
                        ids?.includes(e.id) ? "cover active" : "cover"
                      }>
                      <CiHeart
                        className="heart"
                        onClick={(el) => heart(el, e)}
                      />
                      <TbHeartBroken
                        className="heartb"
                        onClick={(el) => heart(el, e.id)}
                      />
                    </div>
                    <img
                      src={
                        Large ? path + e.poster_path : path + e.backdrop_path
                      }
                      className={
                        Large
                          ? "pic cursor-pointer"
                          : "pic_large cursor-pointer"
                      }
                      alt={e.original_name}
                      onClick={(el) => hidden(el, e)}
                    />
                  </SwiperSlide>
                </>
              );
            })}
          </div>
        </Swiper>{" "}
      </div>
    </>
  );
};
export default Row;
