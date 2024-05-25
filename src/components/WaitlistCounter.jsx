import React, { useEffect, useState } from 'react';

const WaitlistCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-waitlist-count');
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error('Error fetching waitlist count:', error);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="waitlist-counter">
      <h3>Current Waitlist: {count} people</h3>
    </div>
  );
};

export default WaitlistCounter;
