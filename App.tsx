import React, { useState } from "react";
import Particles from "react-tsparticles";
import { Log } from "./Log";
import { ISourceOptions } from "react-tsparticles";
import "./App.css";

const particlesOptions: ISourceOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  particles: {
    number: { value: 50 },
    size: { value: 3 },
    opacity: { value: 0.5 },
    links: { enable: true, distance: 150, opacity: 0.4 },
    move: { enable: true, speed: 1, direction: "none", outModes: { default: "out" } },
  },
  interactivity: {
    events: { onClick: { enable: true, mode: "push" } },
    modes: { push: { quantity: 4 } },
  },
};

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!url) {
      setError("Please enter a URL.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.ok) {
        setShortUrl(data.result.full_short_link);
        await Log("App.tsx", "INFO", "URLShortener", `URL shortened: ${url} → ${data.result.full_short_link}`);
      } else {
        setError("Failed to shorten URL. Ensure it's a valid URL.");
        await Log("App.tsx", "ERROR", "URLShortener", `Failed to shorten URL: ${url}`);
      }
    } catch (err: any) {
      setError("Error occurred while shortening URL.");
      await Log("App.tsx", "ERROR", "URLShortener", `Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Particles options={particlesOptions} />
      <div className="content">
        <h1>React URL Shortener</h1>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="url-input"
        />
        <button onClick={handleShorten} disabled={loading} className="shorten-button">
          {loading ? "Shortening..." : "Shorten"}
        </button>

        {error && <div className="error-text">{error}</div>}

        {shortUrl && (
          <div className="short-url">
            Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
