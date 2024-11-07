import React, { useState } from 'react';
import './BucketTransfer.css'; // Import the CSS file
import Bucket from './Bucket'; // Import the Bucket component

const BucketTransfer = () => {
  const [bucket1, setBucket1] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 5']);
  const [bucket2, setBucket2] = useState(['Item 4', 'Item 6']);
  const [selectedItemsBucket1, setSelectedItemsBucket1] = useState(new Set());
  const [selectedItemsBucket2, setSelectedItemsBucket2] = useState(new Set());

  const handleSelectBucket1 = (item) => {
    const newSelectedItems = new Set(selectedItemsBucket1);
    if (newSelectedItems.has(item)) {
      newSelectedItems.delete(item);
    } else {
      newSelectedItems.add(item);
    }
    setSelectedItemsBucket1(newSelectedItems);
  };

  const handleSelectBucket2 = (item) => {
    const newSelectedItems = new Set(selectedItemsBucket2);
    if (newSelectedItems.has(item)) {
      newSelectedItems.delete(item);
    } else {
      newSelectedItems.add(item);
    }
    setSelectedItemsBucket2(newSelectedItems);
  };

  const addSelectedToBucket2 = () => {
    const itemsToAdd = [...selectedItemsBucket1];
    setBucket1(bucket1.filter(item => !itemsToAdd.includes(item)));
    setBucket2([...bucket2, ...itemsToAdd]);
    setSelectedItemsBucket1(new Set());
  };

  const removeSelectedFromBucket2 = () => {
    const itemsToRemove = [...selectedItemsBucket2];
    setBucket2(bucket2.filter(item => !itemsToRemove.includes(item)));
    setBucket1([...bucket1, ...itemsToRemove]);
    setSelectedItemsBucket2(new Set());
  };

  const addAllToBucket2 = () => {
    setBucket2([...bucket2, ...bucket1]);
    setBucket1([]);
  };

  const removeAllFromBucket2 = () => {
    setBucket1([...bucket1, ...bucket2]);
    setBucket2([]);
  };

  return (
    <div className="bucket-transfer-container">
      <Bucket
        title="Bucket 1"
        items={bucket1}
        selectedItems={selectedItemsBucket1}
        onSelectItem={handleSelectBucket1}
      />

      <div className="button-container">
        <button onClick={addSelectedToBucket2} disabled={selectedItemsBucket1.size === 0}>Add</button>
        <button onClick={removeSelectedFromBucket2} disabled={selectedItemsBucket2.size === 0}>Remove</button>
        <button onClick={addAllToBucket2} disabled={bucket1.length === 0}>Add All</button>
        <button onClick={removeAllFromBucket2} disabled={bucket2.length === 0}>Remove All</button>
      </div>

      <Bucket
        title="Bucket 2"
        items={bucket2}
        selectedItems={selectedItemsBucket2}
        onSelectItem={handleSelectBucket2}
      />
    </div>
  );
};

export default BucketTransfer;
