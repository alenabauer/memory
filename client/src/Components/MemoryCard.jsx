import React from "react";
import classnames from "classnames";

const MemoryCard = ({ onClick, classes, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames(classes, {
        "is-flipped": isFlipped,
        "is-inactive": isInactive
      })}
      onClick={handleClick}
    >
        <img className="front-face" src={card.image} alt="front-img" />
        <img className="back-face" src="/imgs/backface.png" alt="back-img" />
=    </div>
  );
};

export default MemoryCard;