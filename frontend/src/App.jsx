import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

const demoAircraft = [
  ["UAL879", "United States", 47.86, -71.45, 10972],
  ["TVF40QU", "France", 46.05, 1.37, 11887],
  ["LPE2380", "Chile", -14.01, -76.74, 8663],
  ["CGVJE", "Canada", 45.64, -74.35, 76],
  ["RTY484", "United States", 40.59, -105.01, 2057],
  ["N136LM", "United States", 33.66, -85.17, 579],
  ["TVF43MN", "France", 38.94, -3.24, 11277],
  ["TVF56MG", "France", 54.92, 5.91, 11894],
  ["TVF42VD", "France", 38.66, 20.39, 11879],
  ["ADS237", "Canada", 38.49, -117.95, 11887],
  ["FJMIV", "France", 48.54, 4.44, 1333],
  ["UAL421", "United States", 35.67, -80.12, 10300],
  ["BAW218", "United Kingdom", 51.2, -20.45, 11000],
  ["DLH410", "Germany", 52.1, 9.8, 9800],
  ["QFA12", "Australia", -28.2, 135.5, 11500],
  ["SIA317", "Singapore", 12.4, 78.2, 10700],
  ["EK203", "United Arab Emirates", 25.4, 48.7, 11200],
  ["JAL45", "Japan", 36.1, 138.2, 10400],
  ["AF276", "France", 43.5, 15.3, 9900],
  ["KLM602", "Netherlands", 52.3, 18.5, 10100],
];

const demoShips = [
  ["MAERSK ALTAIR", "Denmark", 51.9, 3.8],
  ["MSC OCEAN", "Panama", 31.2, -45.3],
  ["PACIFIC TRADER", "Liberia", 8.5, -79.2],
  ["NORDIC STAR", "Norway", 60.2, 5.1],
  ["ATLANTIC HOPE", "Malta", 35.8, -18.4],
  ["OCEAN SPIRIT", "Singapore", 1.5, 103.7],
  ["BLUE HORIZON", "Marshall Islands", 22.4, 121.8],
  ["GLOBAL MERCHANT", "Bahamas", -32.1, 18.2],
];

function App() {
  const [aircraft, setAircraft] = useState([]);
  const [ships, setShips] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [selected, setSelected] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    const initialAircraft = demoAircraft.map((plane, index) => ({
      id: `air-${index}`,
      type: "AIRCRAFT",
      callsign: plane[0],
      country: plane[1],
      latitude: plane[2],
      longitude: plane[3],
      altitude: plane[4],
      speed: 450 + Math.random() * 300,
      heading: Math.floor(Math.random() * 360),
      trail: [[plane[2], plane[3]]],
    }));

    const initialShips = demoShips.map((ship, index) => ({
      id: `ship-${index}`,
      type: "SHIP",
      callsign: ship[0],
      country: ship[1],
      latitude: ship[2],
      longitude: ship[3],
      speed: 10 + Math.random() * 12,
      heading: Math.floor(Math.random() * 360),
      trail: [[ship[2], ship[3]]],
    }));

    setAircraft(initialAircraft);
    setShips(initialShips);

    const interval = setInterval(() => {
      setAircraft((current) =>
        current.map((plane) => {
          const radians = (plane.heading * Math.PI) / 180;

          const newLatitude =
            plane.latitude + Math.cos(radians) * 0.025;

          const newLongitude =
            plane.longitude + Math.sin(radians) * 0.025;

          const newTrail = [
            ...plane.trail,
            [newLatitude, newLongitude],
          ].slice(-10);

          return {
            ...plane,
            latitude: newLatitude,
            longitude: newLongitude,
            trail: newTrail,
          };
        })
      );

      setShips((current) =>
        current.map((ship) => {
          const radians = (ship.heading * Math.PI) / 180;

          const newLatitude =
            ship.latitude + Math.cos(radians) * 0.007;

          const newLongitude =
            ship.longitude + Math.sin(radians) * 0.007;

          const newTrail = [
            ...ship.trail,
            [newLatitude, newLongitude],
          ].slice(-10);

          return {
            ...ship,
            latitude: newLatitude,
            longitude: newLongitude,
            trail: newTrail,
          };
        })
      );

      setLastUpdate(new Date());
      setUpdateCount((count) => count + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const objects =
    filter === "AIRCRAFT"
      ? aircraft
      : filter === "SHIPS"
        ? ships
        : [...aircraft, ...ships];

  const handleSelect = (object) => {
    setSelected(object);
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="topbar">
        <div className="brand">
          <h1>SKYTRACE</h1>
          <span>GLOBAL OPEN-SOURCE MONITORING</span>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          SIMULATION MODE
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>GLOBAL MONITOR</h2>

        <div className="stat">
          <span>Aircraft</span>
          <strong>{aircraft.length}</strong>
        </div>

        <div className="stat">
          <span>Ships</span>
          <strong>{ships.length}</strong>
        </div>

        <div className="stat">
          <span>Total Objects</span>
          <strong>{objects.length}</strong>
        </div>

        <div className="stat">
          <span>System Updates</span>
          <strong>{updateCount}</strong>
        </div>

        <div className="stat">
          <span>Last Update</span>
          <strong>{lastUpdate.toLocaleTimeString()}</strong>
        </div>

        <hr />

        {/* LAYERS */}
        <h2>LAYERS</h2>

        <div className="filters">
          <button
            className={filter === "ALL" ? "active" : ""}
            onClick={() => setFilter("ALL")}
          >
            <span>◉</span>
            ALL
          </button>

          <button
            className={filter === "AIRCRAFT" ? "active" : ""}
            onClick={() => setFilter("AIRCRAFT")}
          >
            <span>✈</span>
            AIRCRAFT
          </button>

          <button
            className={filter === "SHIPS" ? "active" : ""}
            onClick={() => setFilter("SHIPS")}
          >
            <span>◆</span>
            SHIPS
          </button>
        </div>

        <hr />

        {/* SYSTEM */}
        <h2>SYSTEM</h2>

        <div className="system-status">
          <div>
            <span className="small-dot"></span>
            TRACKING ENGINE
          </div>

          <strong>ONLINE</strong>
        </div>

        <div className="system-status">
          <div>
            <span className="small-dot"></span>
            MAP SERVICE
          </div>

          <strong>ONLINE</strong>
        </div>

        <div className="system-status">
          <div>
            <span className="small-dot"></span>
            DATA FEED
          </div>

          <strong>DEMO</strong>
        </div>

        <hr />

        <h2>DATA</h2>

        <p>
          SKYTRACE visualizes aircraft and maritime traffic
          on a global interactive monitoring interface.
        </p>
      </aside>

      {/* MAP */}
      <main className="map-area">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          minZoom={2}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* MOVEMENT TRAILS */}
          {objects.map((object) => (
            <Polyline
              key={`trail-${object.id}`}
              positions={object.trail}
              pathOptions={{
                color:
                  object.type === "AIRCRAFT"
                    ? "#3b82f6"
                    : "#f59e0b",
                weight: 2,
                opacity: 0.35,
              }}
            />
          ))}

          {/* OBJECT MARKERS */}
          {objects.map((object) => (
            <CircleMarker
              key={object.id}
              center={[
                object.latitude,
                object.longitude,
              ]}
              radius={
                object.type === "AIRCRAFT"
                  ? 5
                  : 7
              }
              pathOptions={{
                color:
                  object.type === "AIRCRAFT"
                    ? "#3b82f6"
                    : "#f59e0b",
                fillColor:
                  object.type === "AIRCRAFT"
                    ? "#3b82f6"
                    : "#f59e0b",
                fillOpacity: 0.85,
                weight: 2,
              }}
              eventHandlers={{
                click: () => handleSelect(object),
              }}
            >
              <Popup>
                <div>
                  <strong>
                    {object.type === "AIRCRAFT"
                      ? "✈ "
                      : "◆ "}
                    {object.callsign}
                  </strong>

                  <br />

                  Type: {object.type}

                  <br />

                  Country: {object.country}

                  <br />

                  Latitude:{" "}
                  {object.latitude.toFixed(4)}

                  <br />

                  Longitude:{" "}
                  {object.longitude.toFixed(4)}

                  <br />

                  Speed:{" "}
                  {Math.round(object.speed)} kn

                  <br />

                  Heading:{" "}
                  {Math.round(object.heading)}°

                  {object.altitude && (
                    <>
                      <br />
                      Altitude:{" "}
                      {Math.round(object.altitude)} m
                    </>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* MAP LABEL */}
        <div className="map-label">
          GLOBAL MONITOR · {objects.length} OBJECTS
        </div>

        {/* MAP STATUS */}
        <div className="map-status">
          <span className="status-dot"></span>
          TRACKING ACTIVE
        </div>

        {/* SELECTED OBJECT PANEL */}
        {selected && (
          <div className="details-panel">
            <div className="details-header">
              <span>OBJECT DETAILS</span>

              <button
                onClick={() => setSelected(null)}
              >
                ×
              </button>
            </div>

            <div className="object-title">
              <span className="object-icon">
                {selected.type === "AIRCRAFT"
                  ? "✈"
                  : "◆"}
              </span>

              <div>
                <h2>{selected.callsign}</h2>
                <span>{selected.type}</span>
              </div>
            </div>

            <div className="detail-row">
              <span>COUNTRY</span>
              <strong>{selected.country}</strong>
            </div>

            <div className="detail-row">
              <span>LATITUDE</span>
              <strong>
                {selected.latitude.toFixed(4)}
              </strong>
            </div>

            <div className="detail-row">
              <span>LONGITUDE</span>
              <strong>
                {selected.longitude.toFixed(4)}
              </strong>
            </div>

            <div className="detail-row">
              <span>SPEED</span>
              <strong>
                {Math.round(selected.speed)} kn
              </strong>
            </div>

            <div className="detail-row">
              <span>HEADING</span>
              <strong>
                {Math.round(selected.heading)}°
              </strong>
            </div>

            {selected.altitude && (
              <div className="detail-row">
                <span>ALTITUDE</span>
                <strong>
                  {Math.round(selected.altitude)} m
                </strong>
              </div>
            )}

            <div className="tracking-indicator">
              <span className="small-dot"></span>
              LIVE SIMULATION TRACK
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;