import React, { useEffect, useState } from "react";
import SignedOutHeader from "../../lib/Headers/Common/SignedOut";
import SignedInHeader from "../../lib/Headers/Common/SignedIn";
import LoadingScreen from "react-loading-screen";
import checkAuth from "../../services/auth";
import ViewBooks from "../../lib/Books/ViewBooks";
import Footer from "../../lib/Footers";

function GenreSearch({
  match: {
    params: { genre },
  },
}) {
  document.title =
    genre === "all"
      ? "Top Rated Books - Reader Giant"
      : "Best " + genre + " books - Reader Giant";
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    async function auth() {
      const res = await checkAuth();
      setSignedIn(res.signedIn);
      if (res.signedIn) setToken(res.token);
      setTimeout(() => {
        setLoading(res.loading);
      }, [1000]);
    }
    auth();
  }, []);

  return (
    <>
      <LoadingScreen
        loading={loading}
        bgColor="#f1f1f1"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        logoSrc="/assets/img/logo.png"
        text=""
      >
        <></>
      </LoadingScreen>
      {signedIn ? <SignedInHeader /> : <SignedOutHeader />}
      <ViewBooks genre={genre} signedIn={signedIn} token={token} />
      <Footer />
    </>
  );
}

export default GenreSearch;
