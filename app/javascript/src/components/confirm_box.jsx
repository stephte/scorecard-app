import React from "react";
import {Dialog, Grid} from "@mui/material";
import {styles} from "../styles/styles";
import AppButton from "./button";

const ConfirmBox = ({isOpen,handleClose,handleAction,text}) => {

    const displayText = text.split('\n');

    return (
        <Dialog open={isOpen} onBackdropClick={handleClose} onClose={handleClose}>
            <Grid>
                <Grid item style={styles.confirmText}>
                    {displayText.map((str, ndx) => <span key={ndx}>{str}<br/></span>)}
                </Grid>
                <Grid item style={styles.confirmBtnsGrid}>
                    <AppButton onClick={handleClose} text={'Close'} style={styles.confirmCloseBtn}/>
                    <AppButton onClick={handleAction} text={'Confirm'} style={styles.confirmActionBtn}/>
                </Grid>
            </Grid>
        </Dialog>
    );
}

export default ConfirmBox;