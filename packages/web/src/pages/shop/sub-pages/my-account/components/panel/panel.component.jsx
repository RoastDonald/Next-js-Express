import React from 'react'
import { links } from './panel-links';
import { makeStyles } from '@material-ui/core/styles';
import NavItem from '../nav-item/nav-item.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '@/redux/user/user.selectors';
import { List, Typography, Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
    },
    userBlock: {
        display: 'flex',
        alignItems: 'center',
        height: 148,
        backgroundColor: '#fff',
    },
    userAvatar: {
        borderRadius: '50%',
        display: 'flex',
        verticalAlign: 'middle',
        height: 88,
        margin: '0 0 0 -10px',
        minWidth: 88,
        width: 88,
        backgroundColor: '#2d2d2d',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        border: '4px solid #f1f1f1',
    },
    userAvatarSign: {
        display: 'inline-flex',
        textTransform: 'uppercase',
        fontSize: 24,
        letterSpacing: 4,
        fontWeight: 900,
    },
    userBox: {
        marginLeft: 10,
        overflow: 'hidden',
        width: '100%'
    },
    welcome: {
        marginLeft: 8,

    },
    username: {
        marginLeft: 8,
        fontWeight: 'bold',
        wordSpacing: 2,
        wordWrap: 'break-word',
        maxWidth: '90%',
        "&:not(:first-child)": {
            // marginLeft: 8
        }
    }
}));

const Panel = ({ currentUser, className }) => {
    console.log(currentUser);
    const classes = useStyles();
    const userAvatarSign = `${currentUser.name ? currentUser.name.charAt(0) : ''}${currentUser.surname ? currentUser.surname.charAt(0) : ''}`;
    const renderLinks = () => {
        return (
            <List>
                {links.items.map((item) => (
                    <NavItem
                        className={classes.iconWrapper}
                        href={item.link}
                        key={item.link}
                        title={item.title}
                        icon={item.icon}
                        isBtn={item.isBtn}
                    />
                ))}

            </List>
        );
    };

    let overflowText = null;
    const temp = currentUser.name.concat(currentUser.surname);
    if (temp.length > 48) {
        overflowText = temp.slice(0, 47).concat('...');
    }
    return (
        <div className={className || classes.root}>
            <div className={classes.userBlock}>
                <Typography className={classes.userAvatar}>
                    <span className={classes.userAvatarSign}>{userAvatarSign}</span>
                </Typography>
                <div className={classes.userBox}>
                    <Typography className={classes.welcome}>Hi,</Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap', width: '90%' }}>
                        {overflowText ? (
                            <Typography className={classes.username}>{overflowText}</Typography>
                        ) : (
                                <>
                                    <Typography className={classes.username}>{currentUser.name}</Typography>
                                    <Typography className={classes.username}>{currentUser.surname}</Typography>
                                </>
                            )}
                    </div>
                </div>
            </div>
            {renderLinks()}

        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Panel);
