import React, { useState, useEffect, useCallback } from 'react';
import ItemList from './ItemList';
import Loader from './Loader';
import './InfiniteScroll.css';

const InfiniteScroll = () => {
  const [items, setItems] = useState(new Set());  // Use Set to store unique items
  const [loading, setLoading] = useState(false);  // Loading state
  const [page, setPage] = useState(1);  // Current page

  // Function to load content based on the page number
  const loadContent = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      const newItems = [];

      for (let i = 1; i <= 10; i++) {  // 10 items per page
        newItems.push(`Item ${(page - 1) * 10 + i}`);
      }

      // Add new items to the Set to remove duplicates
      setItems((prev) => {
        const updatedSet = new Set(prev);  // Create a copy of the previous Set
        newItems.forEach(item => updatedSet.add(item));  // Add new items
        return updatedSet;  // Return the updated Set
      });

      setLoading(false);
    }, 1000);
  }, [page]);

  // Throttle handleScroll to avoid rapid calls
  const handleScroll = useCallback(() => {
    if (loading) return;
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const threshold = document.documentElement.offsetHeight - 100;  // Load when 100px from bottom

    if (scrollPosition >= threshold) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  // Load content whenever page changes
  useEffect(() => {
    loadContent();
  }, [page, loadContent]);

  // Attach throttled scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="content-container">
      <ItemList items={[...items]} />  {/* Convert Set to Array for rendering */}
      {loading && <Loader />}
    </div>
  );
};

export default InfiniteScroll;
