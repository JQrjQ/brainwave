import React, { useState } from 'react';

const WaitlistForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [queuePosition, setQueuePosition] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Gather form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      // Fetch current count
      const response = await fetch('/.netlify/functions/get-waitlist-count');
      if (!response.ok) {
        throw new Error('Failed to fetch current count');
      }
      const result = await response.json();
      const currentCount = result.count;

      // Calculate new position in the queue
      const newPosition = currentCount + 1;
      setQueuePosition(newPosition);

      // Send form data to Netlify function
      const submissionResponse = await fetch('/.netlify/functions/notify-slack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!submissionResponse.ok) {
        throw new Error('Failed to submit form');
      }

      // Send form data to Netlify Forms using AJAX
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error:', error);
    }
  };

  return (
    <section className="bg-n-8 py-16" id="waitlistForm">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-n-1 mb-8">Join the Clipii Waitlist</h2>
        <div className="flex justify-center">
          <form
            name="waitlist"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-n-8 border border-n-6 rounded-2xl p-6 space-y-6"
          >
            <input type="hidden" name="form-name" value="waitlist" />
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>
            <div>
              <label className="block text-n-2 mb-2" htmlFor="name">Name</label>
              <input
                className="w-full px-4 py-2 bg-n-7 border border-n-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1"
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div>
              <label className="block text-n-2 mb-2" htmlFor="email">Email</label>
              <input
                className="w-full px-4 py-2 bg-n-7 border border-n-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div>
              <button
                className="w-full py-3 bg-color-1 text-n-1 font-bold rounded-lg hover:bg-color-2 transition-colors"
                type="submit"
              >
                Join Waitlist
              </button>
            </div>
          </form>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-center mt-4">
            <p>Error: {errorMessage}</p>
          </div>
        )}
      </div>

      {isSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-n-8 border border-n-6 rounded-2xl p-6 space-y-4 max-w-sm mx-auto">
            <h3 className="text-2xl font-bold text-n-1">Thank You!</h3>
            <p className="text-n-2">You&apos;re number {queuePosition} in the queue. Thanks for joining our waitlist. You'll hear from us soon!</p>
            <button
              className="w-full py-3 bg-color-1 text-n-1 font-bold rounded-lg hover:bg-color-2 transition-colors"
              onClick={() => setIsSubmitted(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default WaitlistForm;






