import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import "../App.css";

function Main() {

    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        const cat = e.target.category.value;
        const lev = e.target.level.value;
        history.push("/memory/" + cat + "/" + lev);
    };

    return (
        <div className="welcome-container">
            <h1>Мемори</h1>
            <form onSubmit={handleSubmit}>

                <p>Выбери категорию:</p>
                <input type="radio" id="cat1" name="category" value="cat1" />
                <label for="cat1">Категория 1</label>
                <input type="radio" id="cat2" name="category" value="cat2" />
                <label for="cat2">Категория 2</label>
                <input type="radio" id="cat3" name="category" value="cat3" />
                <label for="cat3">Категория 3</label>
                <input type="radio" id="cat4" name="category" value="cat4" />
                <label for="cat4">Категория 4</label>
                <input type="radio" id="cat5" name="category" value="cat5" />
                <label for="cat5">Категория 5</label>
                <input type="radio" id="cat6" name="category" value="cat6" />
                <label for="cat6">Категория 6</label>

                <p>Выбери уровень сложности:</p>
                <input type="radio" id="lev1" name="level" value="lev1" />
                <label for="lev1">уровень 1</label>
                <input type="radio" id="lev2" name="level" value="lev2" />
                <label for="lev2">уровень 2</label>
                <input type="radio" id="lev3" name="level" value="lev3" />
                <label for="lev3">уровень 3</label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default withRouter(Main);