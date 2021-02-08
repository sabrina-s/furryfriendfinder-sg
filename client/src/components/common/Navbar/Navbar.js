import React, { useContext } from "react";
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/User";
import { AccountCircle } from "@material-ui/icons";
import Logout from "./Logout";
import "../../../stylesheets/buttons.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: "#6a3838",
    textDecoration: "none",
  },
  appBar: {
    background: "#d5b0b0",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: "5px",
  },
}));

const Navbar = ({ setCurrentUser }) => {
  const classes = useStyles();
  const currentUser = useContext(UserContext);

  return (
    <AppBar position="static" className={classes.appBar} data-testid="navbar">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">
          <Link className={classes.title} to="/">
            FurryFriendFinder
          </Link>
        </Typography>

        {currentUser && (
          <div className="fff__flex fff__center_align">
            <div className="current-user fff__flex fff__center_align">
              <AccountCircle className={classes.icon} />
              <div>{currentUser.username}</div>
            </div>
            <Logout setCurrentUser={setCurrentUser} />
          </div>
        )}

        {!currentUser && (
          <div className="nav-links">
            <Link className="btn__plain" to="/login">
              Login
            </Link>
            <Link className="btn__plain" to="/register">
              Register
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
