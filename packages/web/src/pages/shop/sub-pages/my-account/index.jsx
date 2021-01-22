import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom';
import Spinner from '@/components/spinner/spinner.component';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/header/header.component';

import Panel from './components/panel/panel.component';



const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 30,
        margin: '0 auto',
        flexGrow: 1,
        width: '70%',
        [`${theme.breakpoints.down("xs")} `]: {
            width: '90%'
        },
    },
    wrapper: {
        marginTop: 25,
        display: 'flex',
        width: 'calc(100% - 20px)',
        justifyContent: 'space-between'
    },
    leftSide: {
        width: '30%'
    },
    rightSide: {
        width: 'calc(70% - 30px)',
        backgroundColor: '#fff',

        borderRadius: 6
    }

}));

const MyAccount = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header />
            <div className={classes.wrapper}>
                <Panel className={classes.leftSide} />
                <div className={classes.rightSide}>
                    <Suspense fallback={<Spinner />}>
                        <Outlet />

                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default MyAccount
