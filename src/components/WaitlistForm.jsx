// WaitlistForm.jsx
import React, { useState } from 'react';

const WaitlistForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Gather form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Send form data to Netlify function
    fetch('/.netlify/functions/notify-slack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(() => setIsSubmitted(true))
      .catch((error) => alert(error));
  };

  return (
    <section className="bg-n-8 py-16" id="waitlist">
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
      </div>

      {isSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-n-8 border border-n-6 rounded-2xl p-6 space-y-4 max-w-sm mx-auto">
            <h3 className="text-2xl font-bold text-n-1">Thank You!</h3>
            <p className="text-n-2">Thank you for joining our waitlist. You'll hear from us soon!</p>
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





