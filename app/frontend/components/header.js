import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Header(params) {
    const {isAuth} = params
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6"
                            component="div" sx={{ flexGrow: 1 }}>
                    Task Management System
                </Typography>
                {isAuth &&
                    <a href={"/"} onClick={()=>{localStorage.clear()}} style={{"textDecoration":"none","color":"white"}}>Sign Out</a>
                }
                { !isAuth &&
                    <a href={"/login"} style={{"textDecoration":"none","color":"white"}}>Login</a>
                }

            </Toolbar>
        </AppBar>
    );
}