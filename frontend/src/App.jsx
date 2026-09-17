import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";

const aircraftIcon = L.divIcon({
  className: "aircraft-marker",
  html: "✈️",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function App() {
  return (
    <div className="app">

      {/* Top Navigation */}
      <header className="topbar">
        <div className="logo">
          SKY<span>TRACE</span>
        </div>

        <nav>
          <a href="#">Live Map</a>
          <a href="#">Aircraft</a>
          <a href="#">Weather</a>
          <a href="#">About</a>
        </nav>

        <div className="live-status">
          <span className="status-dot"></span>
          LIVE
        </div>
      </header>

      {/* Global Overview */}
      <aside className="overview-panel">
        <div className="panel-title">GLOBAL OVERVIEW</div>

        <div className="stat-card">
          <div className="stat-label">AIRCRAFT TRACKED</div>
          <div className="stat-value">12,483</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">REGIONS</div>
          <div className="stat-value">6</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">DATA STATUS</div>
          <div className="stat-value live-text">LIVE</div>
        </div>
      </aside>

      {/* Aircraft Details */}
      <aside className="aircraft-panel">
        <div className="panel-title">AIRCRAFT DETAILS</div>

        <div className="aircraft-heading">
          <div className="aircraft-name">AIC129</div>
          <div className="aircraft-status">ACTIVE</div>
        </div>

        <div className="aircraft-info">

          <div className="info-row">
            <span>ICAO</span>
            <strong>800123</strong>
          </div>

          <div className="info-row">
            <span>ALTITUDE</span>
            <strong>35,000 ft</strong>
          </div>

          <div className="info-row">
            <span>SPEED</span>
            <strong>450 km/h</strong>
          </div>

          <div className="info-row">
            <span>HEADING</span>
            <strong>275°</strong>
          </div>

          <div className="info-row">
            <span>LATITUDE</span>
            <strong>28.6000°</strong>
          </div>

          <div className="info-row">
            <span>LONGITUDE</span>
            <strong>77.2000°</strong>
          </div>

        </div>

        <button className="track-button">
          TRACK AIRCRAFT
        </button>

        <button className="trail-button">
          SHOW TRAIL
        </button>
      </aside>

      {/* Map */}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="map"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[28.6, 77.2]}
          icon={aircraftIcon}
        >
          <Popup>
            <strong>SKYTRACE TEST AIRCRAFT</strong>
            <br />
            Callsign: AIC129
            <br />
            Altitude: 35,000 ft
            <br />
            Speed: 450 km/h
          </Popup>
        </Marker>
      </MapContainer>

    </div>
  );
}

export default App;