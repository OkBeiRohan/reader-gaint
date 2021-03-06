import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import checkAuth from "./services/auth";
import DiscoverPage from "./Pages/DiscoverPage";
import ErrorPage from "./Pages/ErrorPage";
import LandingPage from "./Pages/LandingPage";
import UserPage from "./Pages/UserPage";
import LoadingScreen from "react-loading-screen";
import GenreSearch from "./Pages/GenreSearch";
import BookDetailsPage from "./Pages/BookDetailsPage";
import BookSearchPage from "./Pages/BookSearchPage";
import AddBookPage from "./Pages/AddBookPage";
import MyReviewsPage from "./Pages/MyReviewsPage";
import MyBooksPage from "./Pages/MyBooksPage";

function PrivateRoute({ component: Component, ...rest }) {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    checkAuth().then((res) => {
      setSignedIn(res.signedIn);
      setTimeout(() => {
        setLoading(res.loading);
      }, [500]);
    });
  }, []);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loading ? (
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
        ) : signedIn ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/discover" component={DiscoverPage} />
        <Route exact path="/genres/:genre" component={GenreSearch} />
        <Route exact path="/user/:id" component={UserPage} />
        <Route exact path="/book/:isbn" component={BookDetailsPage} />
        <Route exact path="/search/:query" component={BookSearchPage} />
        <PrivateRoute exact path="/addbook" component={AddBookPage} />
        <PrivateRoute exact path="/myreviews" component={MyReviewsPage} />
        <PrivateRoute exact path="/mybooks" component={MyBooksPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}
