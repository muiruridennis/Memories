import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import useStyles from "./styles";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memories from '../../images/memories.png';

function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();// returns a new location when an url is changed


    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const logOut = () => {
        dispatch({ type: 'LOGOUT' });
        history.push("/");
        setUser(null);
    };
    useEffect(() => {
        const token = user?.token;
        // cheking if the token has expired
        //jwt
        if (token){
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location])


    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='./' className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>{
                user ? (<div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                        {user.result.name.charAt(0)}
                    </Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>logout</Button>

                </div>) : (
                    <Button component={Link} to={"./Auth"} variant="contained" color="primary">Sign Up</Button>
                )
            }


            </Toolbar>

        </AppBar>
    )
}

export default Navbar
