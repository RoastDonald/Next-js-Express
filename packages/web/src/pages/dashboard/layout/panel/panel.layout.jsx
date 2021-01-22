import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import useStyles from './panel.styles';


const items = [
    { name: 'dashbaord', label: 'Dashboard', to: '/dashboard' },
    {
        name: 'manageOrders',
        label: 'Manage Orders',
        to: '/dashboard/orders',
        items: [
            { name: 'productsList', label: 'Products List', to: '/dashboard/products' },
            { name: 'addProduct ', label: 'Add Product', to: '/dashboard/add-product' },
            { name: 'addCategori ', label: 'Add Categories', to: '/dashboard/add-categori' },

        ],
    },
    {
        name: 'users',
        label: 'Users',
        to: '/dashboard/users'
    },
]


const Panel = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button style={{
                color: '#fff',
                padding: '5px 25px',
                fontSize: '16px',
                background: ' #713BDB',
                borderRadius: 10,
                letterSpacing: 1,
                textTransform: 'capitalize',
                marginTop: 30
            }}>
                <Typography>Register user</Typography>
            </Button>
            <List disablePadding dense className={classes.listContainer}>
                {items.map(({ label, name, items: subItems, to, ...rest }) => {
                    return (
                        <React.Fragment key={name}>
                            <ListItem style={{ paddingLeft: 18 }} button {...rest}>
                                <ListItemText>
                                    <Link to={to}>
                                        {label}
                                    </Link>
                                </ListItemText>
                            </ListItem>
                            {Array.isArray(subItems) ? (
                                <List disablePadding dense>
                                    {subItems.map((subItem) => {
                                        return (
                                            <ListItem
                                                key={subItem.name}
                                                style={{ paddingLeft: 36 }}
                                                button
                                                dense
                                            >
                                                <ListItemText>
                                                    <Link to={subItem.to} className="sidebar-subitem-text">
                                                        {subItem.label}
                                                    </Link>
                                                </ListItemText>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            ) : null}
                        </React.Fragment>
                    )
                })}
            </List>
        </div>
    )
}

export default Panel
