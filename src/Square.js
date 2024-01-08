import React from 'react';

const Square = ({onClick, value, isWinnerSquare}) => {
  const cl = "square" + ((value==='X')?' red':' white') + ((isWinnerSquare)?' win':'');
  return (
    <button className={cl} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;