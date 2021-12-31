import React from "react";

import { useNavigate } from "react-router-dom";
import {AppBar, IconButton, Toolbar} from "@mui/material";
import Logo from '../../images/pencil_logo.png';
import LoadCard from "../load_card";
import {styles} from "../../styles/styles";

const NavBar = ({setErrMsg, cardList, courseList, refreshCardList}) => {
    const navigate = useNavigate();

    const handleLogoClick = e => {
        e.preventDefault();
        setErrMsg('');
        navigate('/');
    }

    return (
        <AppBar position={'relative'} style={{borderRadius: 40}}>
            <Toolbar>
                <IconButton onClick={handleLogoClick} style={styles.iconBtn}>
                    <img alt={"Scorecard App Logo"} src={Logo}/>
                </IconButton>
                <LoadCard setErrMsg={setErrMsg}
                          navigate={navigate}
                          cardList={cardList}
                          courseList={courseList}
                          refreshCardList={refreshCardList}
                />
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;