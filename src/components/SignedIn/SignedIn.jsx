import React from "react";

const SignedIn = ({signOut}) => {
  return (
    <div>
      <div className="nav-item dropdown navbar-nav">
        <img
          src="https://avatars.githubusercontent.com/u/58063753?v=4"
          className="nav-link dropdown-toggle img-fluid cursor-pointer rounded-circle"
          alt="User Avatar"
          role="button"
          data-bs-toggle="dropdown"
          style={{ maxWidth: "60px" }} // Adjust the max width and add border-radius
        />
        <div className="dropdown-menu" style={{ marginTop: "7px" }}>
          <a href="#" className="dropdown-item">
            Bilgilerim
          </a>
          <a onClick={signOut} href="#" className="dropdown-item">
            Çıkış Yap
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignedIn;
