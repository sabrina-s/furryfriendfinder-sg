import React, { useContext } from "react";
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/User";
import { AccountCircle } from "@material-ui/icons";

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
  navLinks: {
    textDecoration: "none",
    color: "unset",
    marginLeft: "20px",
    textTransform: "uppercase",
    fontSize: "0.9em",
    fontWeight: "600",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: "5px",
  },
}));

const Navbar = () => {
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
          <div className="fff__flex">
            <div className="current-user fff__flex">
              <AccountCircle className={classes.icon} />
              <div>{currentUser.username}</div>
            </div>
          </div>
        )}

        {!currentUser && (
          <div className="nav-links">
            <Link className={classes.navLinks} to="/login">
              Login
            </Link>
            <Link className={classes.navLinks} to="/register">
              Register
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
