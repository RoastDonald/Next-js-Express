import { Box, Button, CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Input, InputAdornment, Paper, TableContainer, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import API_CONTROLLER from '../../../../api/controller.api';
import { getUsersStart } from '../../../../redux/admin/admin.actions';
import { selectUsers } from '../../../../redux/admin/admin.selectors';
import { useStyles } from './manage-users.styles';
import EditDialog from './edit-dialog.component';
import DeleteDialog from './delete-dialog.component';





const ManageUsers = ({ getUsers, users }) => {
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.searchWrapper}>
        <Input
          placeholder={'Enter username or email'}
          disableUnderline={true}
          className={classes.searchField}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Grid>


      <Grid>
        <TableContainer component={Paper} className={classes.tableContainer} >
          <Table aria-label="collapsible table" dense>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Full Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="center">Actions</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <Row key={user.name} user={user} getUsers={getUsers} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

    </Grid>
  )
}



function Row({ user, getUsers }) {
  const classes = useStyles();
  const [isExpanded, setExpand] = useState(false);

  const [deleteState, setDeleteState] = useState({
    isOpen: false,
    isFetching: false
  });



  return (
    <React.Fragment>
      <TableRow >
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setExpand(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {user.name + " " + user.surname}
        </TableCell>
        <TableCell align="right">{user.email}</TableCell>
        <TableCell align="right">{user.role ? (
          <Typography variant="subtitle2">
            <span className={classes.adminRoleText}>admin</span>
          </Typography>
        ) : (
            <Typography variant="subtitle2" >
              <span className={classes.userRoleText}>user</span>
            </Typography>
          )}</TableCell>
        <TableCell align="center" className={classes.actionsContainer}>

          <EditDialog
            classes={classes}
            user={user}
            getUsers={getUsers}

          />

          <DeleteDialog
            classes={classes}
            user={user}
            getUsers={getUsers}
          />

        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
                </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
});
const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsersStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);












