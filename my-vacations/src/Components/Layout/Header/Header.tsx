import { AppBar, Button, IconButton, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { HouseboatOutlined } from "@mui/icons-material";
import { theme } from "../Register/Register"
import "./Header.css";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import React from "react";

function Header(): JSX.Element {
    const navigate = useNavigate()
    return (
        <ThemeProvider theme={theme}>
        <div className="Header">
			<AppBar color="primary" style={{display:'flex', flexDirection:'row'}}>
                <Toolbar style={{flexGrow:1}}>
                    {/* <IconButton size="large" edge="start" color="inherit" aria-label="logo"> */}
                    <HouseboatOutlined/>
                    {/* </IconButton> */}
                    <Typography variant="h4" component='div'>Vacationly</Typography>
                <Stack direction='row' spacing={2} margin='auto'>
                    <Button size='large' color='inherit' onClick={()=>navigate("/vacationList")}>Explore</Button>
                    <Button size='large' color='inherit'>Saved Vacations</Button>
                </Stack>
                </Toolbar>
                <Stack direction='row' justifyContent='flex-end' alignItems='center' marginRight='2rem'>
                    <Button variant="text" sx={{height:'2rem',}} color='inherit' onClick={()=>navigate("/login")}>Login</Button>
                    <Button size='large' sx={{height:'2rem'}} color='inherit'onClick={()=>navigate("/register")}>Register</Button>
                </Stack>
            </AppBar>
        </div>
        </ThemeProvider>
    );
}

export default Header;
