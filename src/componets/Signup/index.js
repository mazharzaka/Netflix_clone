import {createUserWithEmailAndPassword} from "firebase/auth";
import {useFormik} from "formik";
import React from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import {auth, db} from "../../config/firebase";
import {useNavigate} from "react-router-dom";
import {doc, setDoc} from "firebase/firestore";
function Signup() {
  const nagigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter an email")
        .required("This not email"),
      password: Yup.string()
        .required("Please enter a password")
        .min(8, "Password must have at least 8 characters")
        .matches(/[0-9]/, "The password must not be numbers only"),
      // .matches(/[a-z]/, "The password must not be captil letters only")
      // .matches(/[A-Z]/, "The password must not be small letters only")
      confirmPassword: Yup.string()
        .required("Please re-type your password")

        .oneOf([Yup.ref("password")], "Passwords does not match"),
    }),
    onSubmit: (values) => {
      console.log(formik.values);
    },
  });
  const get = () => {
    // console.log(formik.errors);
    if (formik.errors.email === "Please enter an email") {
      toast.warn("This isn't email");
    } else if (formik.errors.email === "This not email") {
      toast.error("Input is empty");
    } else {
      document.getElementById("em").classList.add("hidden");
      document.getElementById("pass").classList.remove("hidden");
      document.getElementById("pra").classList.remove("sm:mt-44");
    }
  };
  const sub = () => {
    if (Object.keys(formik.errors).length !== 0) {
      for (const prop in formik.errors) {
        // console.log(`obj.${prop} = ${obj[prop]}`);
        toast.warn(formik.errors[prop]);
      }
    } else {
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then((response) => {
          const userid = response.user.uid;
          console.log(userid);
          try {
            setDoc(doc(db, "users", formik.values.email), {
              tvshows: [],
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          toast.success("User is registered");
          nagigate("/signin");
          // ...
        })
        .catch((err) => {
          console.log(err.code);
          console.log(err.message);
        });
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
      <div class="bg-contain bg-center" id="bglog"></div>
      <div
        id="opc"
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div
          id="pra"
          className="mt-20 w-full sm:mx-auto transition-all sm:mt-44 sm:w-full ">
          <p class="text-4xl text-white text-center font-bold">
            Unlimited movies, TV shows, and more
          </p>
          <p className="text-xl font-normal text-white mt-3">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-lg font-light text-slate-200 mt-3">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <form
            id="em"
            class="transition delay-150 w-full flex flex-wrap  justify-center "
            onSubmit={formik.handleSubmit}>
            <input
              class="appearance-none h-10 mt-5 bg-slate-800 focus:bg-slate-700 block w-80  bg-gray-200 text-gray-700  focus:border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none   focus:border-gray-500 focus:border focus:text-white text-white"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email"
            />
            <button
              id="get"
              type="submit"
              onClick={get}
              class="rounded-none text-white font-medium mt-5 ml-2 w-48 h-10">
              Get Started
            </button>
          </form>
          <form
            id="pass"
            class="w-full flex flex-wrap flex-col items-center hidden"
            onSubmit={formik.handleSubmit}>
            <input
              class="appearance-none h-10 mt-5 bg-slate-800 focus:bg-slate-700 block w-80  bg-gray-200 text-gray-700  focus:border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none   focus:border-gray-500 focus:border focus:text-white text-white"
              id="password"
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              placeholder="Password"
            />
            <input
              class="appearance-none h-10 mt-5 bg-slate-800 focus:bg-slate-700 block w-80  bg-gray-200 text-gray-700  focus:border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none   focus:border-gray-500 focus:border focus:text-white text-white"
              id="confirmPassword"
              onChange={formik.handleChange}
              type="password"
              value={formik.values.confirmPassword}
              placeholder="confirm Password"
            />
            <button
              id="get"
              type="submit"
              onClick={sub}
              class="rounded-none text-white font-medium mt-5 ml-2 w-48 h-10">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
