import { React, useEffect, useState, useRef } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import "../App.css";
import MemoryCard from "./MemoryCard";
import fruitCards1 from "../Data/fruits/fruitCards1";
import fruitCards2 from "../Data/fruits/fruitCards2";
import fruitCards3 from "../Data/fruits/fruitCards3";
import vegCards1 from "../Data/vegetables/vegCards1";
import vegCards2 from "../Data/vegetables/vegCards2";
import vegCards3 from "../Data/vegetables/vegCards3";
import placeCards1 from "../Data/places/placeCards1";
import placeCards2 from "../Data/places/placeCards2";
import placeCards3 from "../Data/places/placeCards3";

function Game() {

    let userCards = [];

    const {category, level} = useParams();

    const curGame = category + level;

    switch(curGame) {
        case "cat3lev1":
            userCards = vegCards1;
            break;
        case "cat3lev2":
            userCards = vegCards2;
            break;
        case "cat3lev3":
            userCards = vegCards3;
            break;
        case "cat4lev1":
            userCards = fruitCards1;
            break;
        case "cat4lev2":
            userCards = fruitCards2;
            break;
        case "cat4lev3":
            userCards = fruitCards3;
            break;
        case "cat6lev1":
            userCards = placeCards1;
            break;
        case "cat6lev2":
            userCards = placeCards2;
            break;
        case "cat6lev3":
            userCards = placeCards3;
            break;
        default:
            userCards = fruitCards1;
    };

    const history = useHistory();

    // Fisher Yates Shuffle
    function swap(array, i, j) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    function shuffleCards(array) {
        const length = array.length;
        for (let i = length; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * i);
            const currIndex = i - 1;
            swap(array, currIndex, randomIndex)
        }
    return array;
    }

    const [cards, setCards] = useState(
        () => shuffleCards(userCards)
    );

    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState({});
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
    const [moves, setMoves] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [bestScore, setBestScore] = useState(
        JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
    );
 
    const timeout = useRef(null);

    const disable = () => {
        setShouldDisableAllCards(true);
    };
    const enable = () => {
        setShouldDisableAllCards(false);
    };

    const checkCompletion = () => {
        if (Object.keys(clearedCards).length === (userCards.length * 2)) {
          setShowModal(true);
          const highScore = Math.min(moves, bestScore);
          setBestScore(highScore);
          localStorage.setItem("bestScore", highScore);
        }
    };

    const evaluate = () => {
        const [first, second] = openCards;
        enable();
        if (cards[first].type === cards[second].type) {
            setTimeout(() => {
                setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
            }, 500);
            setTimeout(() => {
                setOpenCards([]);
              }, 1000);
            return;
        }
        // This is to flip the cards back after 500ms duration
        timeout.current = setTimeout(() => {
          setOpenCards([]);
        }, 500);
    };

    const handleCardClick = (index) => {
        if (openCards.length === 1) {
          setOpenCards((prev) => [...prev, index]);
          setMoves((moves) => moves + 1);
          disable();
        } else {
          clearTimeout(timeout.current);
          setOpenCards([index]);
        }
    };

    useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) {
          timeout = setTimeout(evaluate, 300);
        }
        return () => {
          clearTimeout(timeout);
        };
      }, [openCards]);
    
      useEffect(() => {
        checkCompletion();
      }, [clearedCards]);
      const checkIsFlipped = (index) => {
        return openCards.includes(index);
      };
    
      const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.type]);
      };

      const handleRestart = () => {
        setClearedCards({});
        setOpenCards([]);
        setShowModal(false);
        setMoves(0);
        setShouldDisableAllCards(false);
        // set a shuffled deck of cards
        setCards(shuffleCards(userCards));
      };
    

    return (
        <div className="wrap-container">
            <div id="header">
                <div className="score">
                    <div className="moves">
                        <span className="bold">Количество ходов:</span> {moves}
                    </div>
                    {localStorage.getItem("bestScore") && (
                    <div className="high-score">
                        <span className="bold">Лучший счет:</span> {bestScore}
                    </div>
                    )}
                </div>
                <div className="buttons">
                <div className="restart">
                    <button className="btn small-btn" onClick={handleRestart}>Начать заново</button>
                </div>
                <div className="mainMenu">
                    <button className="btn small-btn" onClick={() => {history.push("/")}}>Главное меню</button>
                </div>
                </div>
            </div>
            <div className="memory-game">
                {cards.map((card, index) => {
                    return (
                        <MemoryCard
                            key={index}
                            card={card}
                            index={index}
                            isDisabled={shouldDisableAllCards}
                            isInactive={checkIsInactive(card)}
                            isFlipped={checkIsFlipped(index)}
                            onClick={handleCardClick}
                            classes={level === "lev3" ? "memory-card small" : "memory-card"}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default withRouter(Game);