import React from "react";

import {styles} from "../styles/styles";

const Home = () => {
    return (
        <div style={styles.homePage}>
            <h1>Welcome!</h1>
            <p>Here is my sample Scorecard App!</p>
            <p>To get started, select a card to load or create a new one.</p>
        </div>
    )
}

export default Home;