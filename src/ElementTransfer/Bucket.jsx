import React from 'react';

const Bucket = ({ title, items, selectedItems, onSelectItem }) => {
  return (
    <div className='bucket-wrapper'>
        <h3>{title}</h3>
        <div className="bucket">        
            <ul>
                {items.map(item => (
                <li key={item}>
                    <button
                    className={`item-button ${selectedItems.has(item) ? 'selected' : ''}`}
                    onClick={() => onSelectItem(item)}
                    >
                    {item}
                    </button>
                </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default Bucket;
