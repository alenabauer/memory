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
            <form className="welcome-form" onSubmit={handleSubmit}>

                <p>Выбери категорию:</p>
                <div className="category-choice">
                <input type="radio" id="cat1" name="category" value="cat1" required />
                <label for="cat1">Стороны света</label>
                <input type="radio" id="cat2" name="category" value="cat2" />
                <label for="cat2">Напитки</label>
                <input type="radio" id="cat3" name="category" value="cat3" />
                <label for="cat3">Овощи</label>
                <input type="radio" id="cat4" name="category" value="cat4" />
                <label for="cat4">Фрукты</label>
                <input type="radio" id="cat5" name="category" value="cat5" />
                <label for="cat5">Вкусы</label>
                <input type="radio" id="cat6" name="category" value="cat6" />
                <label for="cat6">Местоположения</label>
                </div>

                <p>Выбери уровень сложности:</p>
                <div className="level-choice">
                <input type="radio" id="lev1" name="level" value="lev1" required />
                <label for="lev1">Легкий</label>
                <input type="radio" id="lev2" name="level" value="lev2" />
                <label for="lev2">Средний</label>
                <input type="radio" id="lev3" name="level" value="lev3" />
                <label for="lev3">Сложный</label>
                </div>
                <button className="btn" type="submit">Начать игру!</button>
            </form>
        </div>
    )
}

export default withRouter(Main);