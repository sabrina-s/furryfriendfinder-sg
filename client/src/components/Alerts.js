import React from "react";
import { connect } from "react-redux";
import FFFSnackbar from "./common/FFFSnackbar";

function Alerts(props) {
  const { message, severity } = props;

  return (
    <div>
      {message && <FFFSnackbar severity={severity}>{message}</FFFSnackbar>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.alertsReducer;
};

export default connect(mapStateToProps)(Alerts);
