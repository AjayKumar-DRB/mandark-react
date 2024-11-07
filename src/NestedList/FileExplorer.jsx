import React, { useState } from 'react';
import data from './data.json'
import './FileExplorer.css';

const FileExplorer = () => {
  const [breadcrumbs, setBreadcrumbs] = useState([data]); // Track the path of selected items
  const [selectedItems, setSelectedItems] = useState([]); // Track selected items for each level

  // Handle item click and set breadcrumb trail
  const handleItemClick = (item, children, levelIndex) => {
    if (children) {
      // Replace entries from the current level onwards
      const newBreadcrumbs = breadcrumbs.slice(0, levelIndex + 1);
      setBreadcrumbs([...newBreadcrumbs, children]);

      // Update selected items, keeping only up to the current level
      const newSelectedItems = selectedItems.slice(0, levelIndex);
      setSelectedItems([...newSelectedItems, item.name]);
    }
  };

  return (
    <div className="horizontal-explorer-container">
      {breadcrumbs.map((level, index) => (
        <div className="horizontal-explorer-column" key={index}>
          {level.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={`horizontal-explorer-item ${selectedItems[index] === item.name ? 'selected' : ''}`}
              onClick={() => handleItemClick(item, item.children, index)}
            >
              {item.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FileExplorer;
