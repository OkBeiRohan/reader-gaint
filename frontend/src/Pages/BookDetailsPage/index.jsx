import React, { useEffect, useState } from "react";
import SignedOutHeader from "../../lib/Headers/Common/SignedOut";
import SignedInHeader from "../../lib/Headers/Common/SignedIn";
import LoadingScreen from "react-loading-screen";
import checkAuth from "../../services/auth";
import BookDetails from "../../lib/Books/BookDetails";
import Footer from "../../lib/Footers";

function BookDetailsPage({
  match: {
    params: { isbn },
  },
}) {
  document.title = "Book - Reader Giant";
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    async function auth() {
      const res = await checkAuth();
      setSignedIn(res.signedIn);
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
      <BookDetails isbn={isbn} />
      <Footer />
    </>
  );
}

export default BookDetailsPage;
