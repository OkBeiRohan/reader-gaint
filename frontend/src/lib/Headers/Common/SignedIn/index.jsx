import React, { useState } from "react";
// import api from "../../../../services/api";

import "./styles.css";

function SignedInHeader() {
  const [search, setSearch] = useState("");

  function signout() {
    localStorage.removeItem("currentUser");
    window.location.reload();
  }

  return (
    <div id="signedInHeader">
      <div className="HeaderLogo">
        <img src="/assets/img/logo.png" alt="Reader Giants" />
      </div>
      <div className="NavButton">
        <a href="/">Home</a>
      </div>
      <div className="NavButton">
        <a href="/mybooks">My Books</a>
      </div>
      <div className="NavButton DropDownMenu">
        Browse
        <div className="NavContent">
          <a href="/genres/fiction">Fiction</a>
          <a href="/genres/action">Action</a>
        </div>
      </div>
      <form action={"/search/" + search} className="SearchBar">
        <input
          className="SearchBarInput"
          type="text"
          placeholder="Search your favorite books"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          minLength="3"
          required
        />
        <button
          type="submit"
          className="SearchBarIcon"
          style={{
            background: "url(/assets/img/icons/icn_nav_search.svg)",
          }}
        ></button>
      </form>

      <div className="NavButton">
        <a href="/addbook">Add Book</a>
      </div>
      <div className="NavButton">
        <a href="/myreviews">My Reviews</a>
      </div>
      <div className="NavButton DropDownMenu2">
        Profile
        <div className="NavContent_Profile">
          <a style={{ marginTop: "10px" }} href="/user">
            My Profile
          </a>
          <div style={{ marginTop: "10px" }} onClick={signout}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignedInHeader;
