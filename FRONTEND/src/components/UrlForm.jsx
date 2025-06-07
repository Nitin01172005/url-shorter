import React, { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {

    const Shorturl = await createShortUrl(url);
    setShortUrl(Shorturl); 
  };
 


  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    // Reset copied state after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter your long URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onInput={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => handleSubmit(event)}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {" "}
          Submit
        </button>
      </div>
      {/*       
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      */}
      {shortUrl && (
        <div className="mt-4 p-4 bg-green-50 rounded-md">
          <p className="text-sm text-gray-700 mb-1">Your shortened URL:</p>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
            />
            <button
              onClick={handleCopy}
              className={`p-2 ${
                copied ? "bg-green-500 text-white" : "bg-gray-200"
              } rounded-md hover:bg-gray-300 transition-colors duration-200`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
