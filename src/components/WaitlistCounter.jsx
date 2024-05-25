// src/components/WaitlistCounter.jsx
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
    <section className="bg-n-8 py-16" id="waitlistCounter">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-n-8 border border-n-6 rounded-2xl p-6 space-y-6 text-center">
            <h3 className="text-4xl font-bold text-n-1">Current Waitlist</h3>
            <p className="text-2xl text-n-1">{count} Barbers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistCounter;

