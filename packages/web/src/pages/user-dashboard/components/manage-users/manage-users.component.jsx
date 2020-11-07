import React,{useState,useEffect} from 'react';
import { Box, Collapse, Grid, IconButton, Input, InputAdornment, makeStyles, Typography,TableContainer,Paper, CircularProgress  } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {getUsersStart} from '../../../../redux/admin/admin.actions';
import { selectUsers } from '../../../../redux/admin/admin.selectors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@material-ui/core';
import {useStyles} from './manage-users.styles';
import apiController from '../../../../api/apiController';


const ManageUsers = ({getUsers,users}) => {
    const classes = useStyles();

    useEffect(()=>{
          getUsers();
      },[]);

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
            <Row key={user.name} user={user} getUsers={getUsers}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </Grid>
            
        </Grid>
    )
}



function Row({user,getUsers}) {
  const classes = useStyles();
    const [isExpanded, setExpand] = useState(false);
    const [editState, setEditState] = useState({
      isOpen:false,
      isFetching:false
    });
    const [deleteState, setDeleteState] = useState({
      isOpen:false,
      isFetching:false
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
          <TableCell align="right">{user.role? (
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
              editState={editState}            
              classes={classes}
              user={user}
              setEditState={setEditState}
              getUsers={getUsers}
            
            />

            <DeleteDialog 
              deleteState={deleteState}
              classes={classes}
              user={user}
              setDeleteState={setDeleteState}
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


function EditDialog({editState,classes,user,setEditState,getUsers}){

  const handleClickOpen =  () => {
    setEditState({
      ...editState,
      isOpen:true
    });
    
  };


  const handleClose = () => {
    setEditState({
      ...editState,
      isOpen:false
    });
  };



  return (
    <React.Fragment>

    <IconButton className={`${classes.editIcon} ${classes.iconButton}`} onClick={handleClickOpen}>
    <EditIcon />
  </IconButton>
  <Dialog
    disableBackdropClick={editState.isFetching}
    open={editState.isOpen}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" >
      <Typography variant="subtitle" className={classes.editDialog}>
      Edit
      <Typography 
        variant="subtitle2"
        className={classes.userEmailDialog}>
          {user.email}
      </Typography> account ?
      </Typography>
   </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <Typography variant="subtitle2" color="primary">All user data will be erased</Typography>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary" disabled={editState.isFetching} >
        Cancel
      </Button>
      <Button onClick={()=>handleClickOpen} color="primary" autoFocus className={classes.editIcon} disabled={editState.isFetching}>
{!editState.isFetching?'Edit':(<CircularProgress size={16} />)}
      </Button> 
    </DialogActions>
</Dialog>
</React.Fragment>
  )
}



function DeleteDialog({deleteState,classes,user,setDeleteState,getUsers}){
  const handleDeleting =  async (email)=>{
    try {
      setDeleteState({
        ...deleteState,
        isFetching:true
      });
      await apiController.deleteUser(email);
      setDeleteState({
        ...deleteState,
        isOpen:false
      });
      getUsers();
    }catch (error){
      setDeleteState({
        ...deleteState,
        isOpen:false
      });
    }
  }


  const handleClickOpen =  () => {
    setDeleteState({
      ...deleteState,
      isOpen:true
    });
    
  };


  const handleClose = () => {
     setDeleteState({
      ...deleteState,
      isOpen:false
    });
  };

  return (
    <React.Fragment>
    <IconButton className={`${classes.deleteIcon} ${classes.iconButton}`} onClick={handleClickOpen}>
    <DeleteIcon />
  </IconButton>
  
    <Dialog
    disableBackdropClick={deleteState.isFetching}
    open={deleteState.isOpen}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" >
      <Typography variant="subtitle" className={classes.editDialog}>
      Delete
      <Typography 
        variant="subtitle2"
        className={classes.userEmailDialog}>
          {user.email}
      </Typography> account ?
      </Typography>
   </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <Typography variant="subtitle2" color="primary">All user data will be erased</Typography>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary" disabled={deleteState.isFetching} >
        Cancel
      </Button>
      <Button onClick={()=>handleDeleting(user.email)} color="primary" autoFocus className={classes.deleteIcon} disabled={deleteState.isFetching}>
{!deleteState.isFetching?'Delete':(<CircularProgress size={16} />)}
      </Button> 
    </DialogActions>
</Dialog>
</React.Fragment>
  )
};


const mapStateToProps = createStructuredSelector({
    users:selectUsers, 
});
const mapDispatchToProps = dispatch =>({
    getUsers:()=>dispatch(getUsersStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(ManageUsers);












