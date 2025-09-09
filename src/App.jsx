

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Loader from "./components/Loader";
import EarthquakeMap from "./components/EarthquakeMap";
import EarthquakeList from "./components/EarthquakeList";
import EarthquakeChart from "./components/EarthquakeChart";
import EarthquakeTimeline from "./components/EarthquakeTimeline";

const API_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export default function App() {
  const [quakes, setQuakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [magnitudeFilter, setMagnitudeFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        if (!cancelled) setQuakes(res.data.features || []);
      } catch (err) {
        if (!cancelled) setError("Failed to load earthquake data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 1000 * 60 * 2); 
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const filteredQuakes = quakes.filter((q) => {
    const mag = q.properties?.mag ?? 0;
    if (magnitudeFilter === "small") return mag < 3;
    if (magnitudeFilter === "medium") return mag >= 3 && mag < 5;
    if (magnitudeFilter === "large") return mag >= 5;
    return true;
  });

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="app-root bg-white dark:bg-slate-900 dark:text-gray-200">
        <Header
          magnitudeFilter={magnitudeFilter}
          setMagnitudeFilter={setMagnitudeFilter}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0" style={{ minHeight: "calc(100vh - 96px)" }}>
            <div className="md:col-span-2 flex flex-col">
              <div className="flex-1">
                <EarthquakeMap quakes={filteredQuakes} darkMode={darkMode} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <EarthquakeChart quakes={filteredQuakes} />
                <EarthquakeTimeline quakes={filteredQuakes} />
              </div>
            </div>

            <aside className="bg-gray-100 dark:bg-slate-800 overflow-auto p-4">
              <EarthquakeList quakes={filteredQuakes} />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

