import React, { useState } from 'react';
import './BoxSplit.css';

const Box = ({ size }) => {
  const [isSplit, setIsSplit] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent clicks from propagating to parent boxes
    setIsSplit(true);
  };

  return (
    <div
      className="box"
      style={{
        width: size,
        height: size,
      }}
      onClick={handleClick}
    >
      {isSplit ? (
        <>
          <Box size={size / 2} />
          <Box size={size / 2} />
          <Box size={size / 2} />
          <Box size={size / 2} />
        </>
      ) : null}
    </div>
  );
};

const BoxSplitApp = () => {
  const initialSize = 200;

  return (
    <div className="container">
      <Box size={initialSize} />
    </div>
  );
};

export default BoxSplitApp;
