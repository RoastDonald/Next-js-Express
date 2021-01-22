import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';



const url = 'https://images.fineartamerica.com/images-medium-large-5/kurt-cobain-2-paul-meijering.jpg';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    art: {
        padding: 10,
        width: '100%',
        height: '100%',
        userSelect: 'none',
        '-webkit-user-drag': 'none',
    },
    imageTextContainer: {
        position: 'absolute',
        left: '5%',
        top: '5%',
        width: '55%'
    },
    imageText: {
        display: 'inline-block',
        marginTop: 10,
        padding: '5px 15px',
        textTransform: 'uppercase',
        fontSize: 24,
        fontWeight: 800,
        color: '#fff',
        backgroundColor: '#2d2d2d',
    }
}));

const Overview = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.imageTextContainer}>
                <Typography className={classes.imageText}>Welcome to</Typography>
                <Typography className={classes.imageText}>Your account</Typography>
            </div>
            <img src={url} alt='' className={classes.art} />

        </div>
    )
}

export default Overview;
