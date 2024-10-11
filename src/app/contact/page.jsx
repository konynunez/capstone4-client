"use client";
import React, { useState } from 'react';
import axios from 'axios';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:4000/api/contact', {
        name,
        email,
        phone,
        details,
      });
      console.log('Response from server:', response.data);
      setSuccess('Message sent successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setDetails('');
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="max-w-sm w-full p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className="w-full p-2 border border-emerald-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
              className="w-full p-2 border border-emerald-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your Phone (optional)"
              className="w-full p-2 border border-emerald-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="mb-3">
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Additional Details (optional)"
              className="w-full p-2 border border-emerald-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              rows="3"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 text-white bg-emerald-600 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-500'}`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          {error && <p className="mt-2 text-red-500">{error}</p>}
          {success && <p className="mt-2 text-green-500">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
