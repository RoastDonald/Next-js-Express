import React,{useState,useEffect} from 'react';
import { Box, Collapse, Grid, IconButton, Input, InputAdornment, makeStyles, Typography,TableContainer,Paper } from '@material-ui/core';
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


const useStyles = makeStyles((theme)=>({
    root:{
        display:'flex',
        flexDirection:'column',
        margin:'0 auto'
    },
    topBar:{
        display:'flex', 
        justifyContent:'space-between',
        alignItems:'center'
    },
    searchField:{
        color:'#fff ',
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#4a4a4a'
    },
    tableContainer:{
        borderRadius: 20, 
        marginTop:20,
        border:'none',
        backgroundColor: '#dedede',
        fontSize:18,
        "& .MuiTableRow-root":{
            borderBottom:'none'
        },
        "& .MuiSvgIcon-root": {
            fill:'#191919'
        }
    }
}));


const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  ];
  

const ManageUsers = ({getUsers,users}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        getUsers();
    },[]);
    return (
        <Grid container className={classes.root}>
            <Grid item className={classes.topBar}>
                <Typography variant="h1">
                    Manage Users
                </Typography>
                <Grid item>
                <Input
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
            </Grid>


        <Grid>
        <TableContainer component={Paper} className={classes.tableContainer}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Full Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Updated At</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </Grid>
            
        </Grid>
    )
}


function createData(name, calories, fat, carbs, protein, price) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        { date: '2020-01-05', customerId: '11091700', amount: 3 },
        { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
      ],
    };
  }


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow >
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
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
                    {row.history.map((historyRow) => (
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
                    ))}
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
    users:selectUsers    
});
const mapDispatchToProps = dispatch =>({
    getUsers:()=>dispatch(getUsersStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(ManageUsers);












