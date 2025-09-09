import React, { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const EarthquakeChart = ({ quakes }) => {
  const data = useMemo(() => {
    const counts = { small: 0, medium: 0, large: 0 };
    quakes.forEach((q) => {
      const m = q.properties?.mag ?? 0;
      if (m < 3) counts.small++;
      else if (m >= 3 && m < 5) counts.medium++;
      else counts.large++;
    });
    return [
      { name: "Small (<3)", count: counts.small },
      { name: "Medium (3–5)", count: counts.medium },
      { name: "Large (≥5)", count: counts.large }
    ];
  }, [quakes]);

  return (
    <div className="p-4 border border-black">
      <h3 className="font-semibold mb-2 bg-yellow-600 rounded p-2 text-white">Magnitude Distribution Chart</h3>
      <div style={{ width: "100%", height: 240 }} className=" border border-black">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarthquakeChart;
