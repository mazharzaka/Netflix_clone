import React, {useState} from "react";
import {auth} from "../../config/firebase";
import {useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";
import {login} from "../../features/AuthSlice";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Login = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
    try {
      // const user = userCredential.user;
      dispatch(login(email));
      console.log("Singed in user: ");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("An error occured: ", errorCode, errorMessage);
    }
  };
  return (
    <>
      <div class="bg-contain bg-center" id="bglog"></div>
      <div
        id="opc"
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 p-10 sm:mx-auto sm:w-full sm:max-w-sm" id="form">
          <form className="space-y-6" onSubmit={Login} action="#">
            <h2 className="text-white text-center text-2xl">Sign In</h2>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6  text-left text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="appearance-none h-10 mt-5 'bg-slate-800' bg-slate-800 focus:bg-slate-700 block w-full ' bg-gray-200' 'text-gray-700'  'focus:border-gray-200' rounded py-3 px-4 leading-tight focus:outline-none   focus:border-gray-500 focus:border focus:text-white text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="appearance-none h-10 mt-5 'bg-slate-800' bg-slate-800 focus:bg-slate-700 block w-full   'text-gray-700'  'focus:border-gray-200' rounded py-3 px-4 leading-tight focus:outline-none   focus:border-gray-500 focus:border focus:text-white text-white"
                />
              </div>
            </div>

            <div className="flex w-full justify-center">
              <button
                type="submit"
                id="btn-log"
                onSubmit={Login}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
