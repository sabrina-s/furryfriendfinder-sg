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
import axios from "axios";
import { sortBy } from "lodash";
import { DOGS_API } from "../../constants/api";
import DogModal from "./DogModal";

const useStyles = makeStyles({
  table: {
    width: "90%",
    margin: "25px auto",
  },
});

const DogTable = () => {
  const classes = useStyles();
  const [dogs, setDogs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dogId, setDogId] = useState();

  useEffect(() => {
    axios
      .get(DOGS_API)
      .then((response) => {
        const dogs = response.data;
        const sortedDogs = sortBy(dogs, [(dog) => !dog.available]);
        setDogs(sortedDogs);
      })
      .catch(console.error);
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
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="right">HDB Approved?</TableCell>
              <TableCell align="right">Available?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dogs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dog) => (
                <TableRow
                  key={dog._id}
                  onClick={() => displayDogModal(dog._id)}
                >
                  <TableCell component="th" scope="row">
                    {dog.name}
                  </TableCell>
                  <TableCell align="left">{dog.gender}</TableCell>
                  <TableCell>{dog.description}</TableCell>
                  <TableCell>{dog.image}</TableCell>
                  <TableCell align="right">
                    {dog.hdbApproved ? "✔️" : ""}
                  </TableCell>
                  <TableCell align="right">
                    {dog.available ? "✔️" : ""}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>

      <DogModal id={dogId} />
    </React.Fragment>
  );
};

export default DogTable;
