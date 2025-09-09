import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const quakeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -24]
});

const EarthquakeMap = ({ quakes, darkMode }) => {
  const center = [20, 0];
  const mapTiles = darkMode
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <div style={{ height: "60vh", width: "100%" }}>
      <MapContainer center={center} zoom={2} style={{ height: "100%", width: "100%" }} preferCanvas={true}>
        <TileLayer url={mapTiles} />
        {quakes.map((q) => {
          const coords = q.geometry?.coordinates || [];
          const lon = coords[0];
          const lat = coords[1];
          const mag = q.properties?.mag ?? "N/A";
          const place = q.properties?.place ?? "Unknown";

          if (!lat || !lon) return null;

          return (
            <Marker key={q.id} position={[lat, lon]} icon={quakeIcon}>
              <Popup>
                <div className="text-sm">
                  <strong>Magnitude:</strong> {mag}
                  <br />
                  <strong>Location:</strong> {place}
                  <br />
                  <a className="text-blue-600 underline text-xs" href={q.properties?.url} target="_blank" rel="noreferrer">More info</a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default EarthquakeMap;
