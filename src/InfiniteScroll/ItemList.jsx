import React from 'react';
import './ItemList.css';

const ItemList = ({ items }) => {
  return (
    <div className="item-list">
      {items.map((item, index) => (
        <div key={index} className="item">
          {item}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
