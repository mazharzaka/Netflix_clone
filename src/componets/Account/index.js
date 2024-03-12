import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {TbHeartBroken} from "react-icons/tb";
import {db} from "../../config/firebase";
import {useSelector} from "react-redux";
import {ToastContainer, toast} from "react-toastify";
import {FaHeartCrack} from "react-icons/fa6";
import {Link} from "react-router-dom";
function Account() {
  const [data, setData] = useState([]);
  const email = useSelector((state) => state.auth.email);

  const fetchPost = async () => {
    await getDocs(collection(db, "users")).then((e) => {
      const newData = e.docs.map((doc) => ({...doc.data(), email: doc.id}));
      const array = newData.find((e) => e.email === email);

      setData(array?.tvshows);
    });
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const heart = (e) => {
    e.target.getAttribute("id") === "coverfav"
      ? e.target.childNodes[0].classList.remove("hidden")
      : e.target.parentElement.childNodes[0].classList.remove("hidden");
  };
  const Lheart = (e) => {
    e.target.getAttribute("id") === "coverfav"
      ? e.target.childNodes[0].classList.add("hidden")
      : e.target.parentElement.childNodes[0].classList.add("hidden");
  };
  const Delete = async (e, el) => {
    const newdata = data.filter((e) => e.id !== el);
    try {
      await updateDoc(doc(db, "users", email), {
        tvshows: newdata,
      });
      toast.error("Delete the movie to favorites");
      setData(newdata);
    } catch (e) {
      console.error("Error adding document: ", e);
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
      <div class="bg-contain h bg-center ">
        <img
          className="md:h-96 h-72 w-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/32c47234-8398-4a4f-a6b5-6803881d38bf/c29435a3-418d-47a5-99f4-4cd2093856ad/EG-en-20240122-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        />

        <div className="h-96 bg-black/60 fixed top-0 left-0 w-full"> </div>
        <div className="absolute md:top-56 top-40 p-6">
          <h2 className="text-2xl md:text-4xl md:ml-16 text-white  font-bold">
            My WishList
          </h2>
        </div>
      </div>
      <div className="bg-black   z-2 w-full ">
        <div className="flex flex-wrap md:justify-start justify-center">
          {data.length !== 0 ? (
            data.map((e) => (
              <div className="m-3">
                {" "}
                <div className="relative md:max-h-32 max-h-24 w-36 md:w-52   isolate  overflow-hidden rounded-2xl px-8  pt-24 max-w-sm ">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original" + e.backdrop_path
                    }
                    className="absolute w-full h-full  inset-0  object-cover "
                    alt="test"
                  />
                  <div
                    class="absolute inset-0 md:max-h-32 max-h-24   rounded-md"
                    id="coverfav"
                    onMouseOver={heart}
                    onMouseLeave={Lheart}>
                    <div className="cover hidden">
                      <TbHeartBroken
                        onClick={(el) => Delete(el, e.id)}
                        className="absolute m-4 text-xl cursor-pointer text-white z-10"
                      />
                    </div>
                    <h2
                      className="relative mt-12 text-base text-white "
                      id="tit-film">
                      {e.title ? e.title : e.name}
                    </h2>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="m-3 w-full relative flex-col font-bold flex justify-center items-center text-white text-2xl font-blod text-center">
              There are no movies in the watch list.
              <FaHeartCrack
                className="text-[10rem]
               text-gray-400"
              />
            </div>
          )}
        </div>
      </div>
      <Link
        className="w-full text-center mt-2 text-white underline cursor-pointer"
        to="/">
        Back to home
      </Link>
    </>
  );
}

export default Account;
