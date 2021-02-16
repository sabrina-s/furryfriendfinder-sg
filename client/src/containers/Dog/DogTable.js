import {
  makeStyles,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import FFFModal from "../../components/common/FFFModal";
import UpdateDog from "./UpdateDog";
import { Edit } from "@material-ui/icons";
import { getAllDogsSuccess, getAllDogs } from "../../redux/actions";
import { connect } from "react-redux";

const useStyles = makeStyles({
  table: {
    width: "90%",
    margin: "25px auto",
  },
  editIcon: {
    cursor: "pointer",
    color: "#383838",
  },
});

const DogTable = (props) => {
  const classes = useStyles();

  const { dogs } = props.dogs;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dogId, setDogId] = useState();
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    props.getAllDogsSuccess();
    props.getAllDogs();
  }, []);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayDogModal = (id) => {
    setDogId(id);
    setDisplayModal(true);
  };

  const handleClose = () => {
    setDisplayModal(false);
  };

  return (
    <React.Fragment>
      <h2 className="fff__text_center">Manage dogs</h2>

      <TableContainer className={classes.table} component={Paper}>
        <Table data-testid="dog-table">
          <colgroup>
            <col width="15%" />
            <col width="10%" />
            <col width="40%" />
            <col width="15%" />
            <col width="6%" />
            <col width="6%" />
            <col width="8%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>HDB Approved?</TableCell>
              <TableCell>Available?</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dogs &&
              dogs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((dog) => (
                  <TableRow key={dog._id}>
                    <TableCell component="th" scope="row">
                      {dog.name}
                    </TableCell>
                    <TableCell align="left">{dog.gender}</TableCell>
                    <TableCell>{dog.description}</TableCell>
                    <TableCell>{dog.image}</TableCell>
                    <TableCell>{dog.hdbApproved ? "✔️" : ""}</TableCell>
                    <TableCell>{dog.available ? "✔️" : ""}</TableCell>
                    <TableCell
                      align="right"
                      onClick={() => displayDogModal(dog._id)}
                    >
                      <Edit className={classes.editIcon} />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {dogs && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dogs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>

      <FFFModal isOpen={displayModal}>
        <UpdateDog id={dogId} handleClose={handleClose} />
      </FFFModal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs,
  };
};

const mapDispatchToProps = {
  getAllDogsSuccess,
  getAllDogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(DogTable);
