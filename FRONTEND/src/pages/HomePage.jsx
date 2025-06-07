import React from 'react'
import UrlForm from '../components/UrlForm';

const HomePage = () => {
  return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg items-center shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">URL Shortener</h2>
          <UrlForm />
      </div>

  );
}

export default HomePage