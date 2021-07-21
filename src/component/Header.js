import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { FirebaseContext } from "../firebase";

function Header() {
  const { user, firebase } = React.useContext(FirebaseContext);
  return (
    <div className="header">
      <div className="flex">
        <img src="/logo.png" alt="logo" className="logo" />
        <NavLink to="/" className="header-title">
          Hooks news
        </NavLink>
        <NavLink to="/" className="header-link">
          news
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/top" className="header-link">
          top
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/search" className="header-link">
          search
        </NavLink>
        {user && (
          <>
            <div className="divider">|</div>
            <NavLink to="/create" className="header-link">
              submit
            </NavLink>
          </>
        )}
      </div>
      <div className="flex">
        {user ? (
          <>
            <div className="header-name">{user.displayName}</div>
            <div className="divider">|</div>
            <div className="" onClick={() => firebase.logout()}>
              logout
            </div>
          </>
        ) : (
          <NavLink to="/login" className="header-link">
            login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default withRouter(Header);
