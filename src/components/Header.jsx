import React from "react";

const Header = ({ magnitudeFilter, setMagnitudeFilter, darkMode, setDarkMode }) => {
  return (
    <header className="bg-green-600 rounded dark:bg-red-800 text-white p-4 flex flex-col md:flex-row items-center justify-between gap-3 m-2">
      <div>
        <h1 className="text-xl font-bold">🌍 Earthquake Visualizer</h1>
        <p className="text-sm opacity-90">Live data from USGS • Last 24 hours</p>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={magnitudeFilter}
          onChange={(e) => setMagnitudeFilter(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="all">All magnitudes</option>
          <option value="small">Small (&lt; 3)</option>
          <option value="medium">Medium (3–5)</option>
          <option value="large">Large (≥ 5)</option>
        </select>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded bg-white/20 hover:bg-white/30"
        >
          Theme{darkMode ? " Light" : " Dark"}
        </button>
      </div>
    </header>
  );
};

export default Header;
