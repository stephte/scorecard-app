import React from "react";

import { ThemeProvider } from '@mui/material/styles';

import AppRouter from "./app_router";
import {theme} from "./styles/theme";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppRouter/>
        </ThemeProvider>
    )
}

export default App;