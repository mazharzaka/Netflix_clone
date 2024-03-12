import React from "react";
import Banner from "../Banner/Banner";

import Row from "../Row/Row";
import requests from "../../request";

function Home() {
  return (
    <>
      <Banner />
      <Row title="Orginals" URL={requests.orginals} Large={true} />{" "}
      <Row title="Top Rated" URL={requests.toprated} />
      <Row title="Trending" URL={requests.trending} />
      <Row title="Action Movies" URL={requests.action} />
      <Row title="Comedy Movies" URL={requests.comedy} />
      <Row title="Horro Movies" URL={requests.horro} />
      <Row title="Romance Movies" URL={requests.romance} />
      <Row title="Docmitrey Movies" URL={requests.docmitrey} />
    </>
  );
}

export default Home;
