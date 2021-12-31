import React from "react";

import {Button} from "@mui/material";

const AppButton = ({text, onClick, disabled=false, style={}, value=null}) => {
    return (
        <Button
            variant="contained"
            size="small"
            color={"secondary"}
            style={style}
            onClick={onClick}
            disabled={disabled}
            value={value}
        >
            {text}
        </Button>
    );
}

export default AppButton;