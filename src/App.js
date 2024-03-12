import {Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./componets/Home";
import Signin from "./componets/Signin";
import Nav from "./componets/Nav/Nav";
import Signup from "./componets/Signup";
import Auth from "./componets/Auth";
import Account from "./componets/Account";
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route element={<Auth />}>
          <Route path="/" element={<Home />} />
          <Route path="/myaccount" element={<Account />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
