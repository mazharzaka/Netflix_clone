import React from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
function Auth() {
  // const [Token, setToken] = useState(false);
  const Auth = useSelector((state) => state.auth.value);
  let auth = {token: Auth};
  return auth.token ? <Outlet /> : <Navigate to="/signin" />;
}

export default Auth;
