import React from 'react';

const Contact = () => {
  return (
    <div
      name="contact"
      className="w-full min-h-screen bg-[#0a192f] flex justify-center items-center p-4"
    >
      <form
        method="POST"
        action="https://getform.io/f/apjjrvda"
        className="flex flex-col max-w-[600px] w-full bg-gray-800 p-8 rounded-lg shadow-lg"
        data-aos="fade-in"
      >
        {/* Header */}
        <div className="pb-8 text-center">
          <p className="text-4xl font-bold inline border-b-4 border-pink-600 text-gray-300">
            Contact
          </p>
          <p className="text-gray-400 py-4 text-lg">
            // Submit the form below to get in touch.
          </p>
        </div>

        {/* Name Field */}
        <input
          className="bg-gray-700 text-white p-4 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
          type="text"
          placeholder="Your Name"
          name="name"
          required
        />

        {/* Email Field */}
        <input
          className="bg-gray-700 text-white p-4 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
          type="email"
          placeholder="Your Email"
          name="email"
          required
        />

        {/* Message Field */}
        <textarea
          className="bg-gray-700 text-white p-4 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
          name="message"
          rows="6"
          placeholder="Your Message"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-500 transition-all duration-300 mx-auto"
        >
          Let's Collaborate
        </button>
      </form>
    </div>
  );
};

export default Contact;
