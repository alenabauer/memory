import React from "react";
import { withRouter, useParams } from "react-router-dom";
import "../App.css";

function Game() {

    const {category, level} = useParams();

    return (
        <div>
            <p>This is the game page for category {category} and level {level}.</p>
        </div>
    )
}

export default withRouter(Game);