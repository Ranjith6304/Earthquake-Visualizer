import React from "react";

const EarthquakeList = ({ quakes }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 bg-red-400 rounded p-1 text-white">Recent Earthquakes</h2>
      <ul className="space-y-3">
        {quakes.slice(0, 50).map((q) => {
          const { mag, place, time, url } = q.properties;
          return (
            <li key={q.id} className="bg-white dark:bg-slate-700 p-3 rounded shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">Magnitude {mag ?? "—"}</div>
                  <div className="text-sm opacity-80">{place}</div>
                </div>
                <div className="text-right text-xs text-gray-500">
                  {new Date(time).toLocaleString()}
                </div>
              </div>
              <div className="mt-2">
                <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
                  View on USGS
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EarthquakeList;
