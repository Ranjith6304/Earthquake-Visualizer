import React, { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const EarthquakeTimeline = ({ quakes }) => {
  const data = useMemo(() => {
    const hourly = Array.from({ length: 24 }, (_, i) => ({ hour: `${i}:00`, count: 0 }));
    quakes.forEach((q) => {
      const t = q.properties?.time;
      if (!t) return;
      const hr = new Date(t).getUTCHours();
      hourly[hr].count++;
    });
    return hourly;
  }, [quakes]);

  return (
    <div className="p-4 border border-black">
      <h3 className="font-semibold mb-2 bg-red-600 rounded p-2 text-white">Earthquakes by Hour (UTC)</h3>
      <div style={{ width: "100%", height: 240 }}  className=" border border-black">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" interval={2} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarthquakeTimeline;
