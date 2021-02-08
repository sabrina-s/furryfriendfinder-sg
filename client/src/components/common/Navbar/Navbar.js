import React from "react";
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

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
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar} data-testid="navbar">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">
          <Link className={classes.title} to="/">
            FurryFriendFinder
          </Link>
        </Typography>

        <div className="navLinks">
          <Link className={classes.navLinks} to="/login">
            Login
          </Link>
          <Link className={classes.navLinks} to="/register">
            Register
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
