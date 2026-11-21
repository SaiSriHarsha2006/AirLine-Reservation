/**
 * SkyPulse · Live Flight Radar & Airspace Boarding Control
 * Next-Generation Flight Telemetry, Real-Time Tracking & Gate Manifest System
 */

'use strict';

/* ==========================================================================
   Airports & Aviation Navigation Waypoint Database
   ========================================================================== */
const AIRPORTS = {
  DEL: { code: 'DEL', name: 'Indira Gandhi Intl', city: 'Delhi', country: 'India', lat: 28.5562, lng: 77.1000, elevation: 777, metar: { temp: 24, wind: '290/08KT', vis: '6000m', qnh: 1014, cond: 'Clear' } },
  BOM: { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj', city: 'Mumbai', country: 'India', lat: 19.0896, lng: 72.8656, elevation: 39, metar: { temp: 29, wind: '250/12KT', vis: '8000m', qnh: 1011, cond: 'Hazy' } },
  BLR: { code: 'BLR', name: 'Kempegowda Intl', city: 'Bengaluru', country: 'India', lat: 13.1986, lng: 77.7066, elevation: 3000, metar: { temp: 22, wind: '080/06KT', vis: '9999m', qnh: 1016, cond: 'Few Clouds' } },
  HYD: { code: 'HYD', name: 'Rajiv Gandhi Intl', city: 'Hyderabad', country: 'India', lat: 17.2403, lng: 78.4294, elevation: 2024, metar: { temp: 26, wind: '110/07KT', vis: '9000m', qnh: 1013, cond: 'Scattered' } },
  MAA: { code: 'MAA', name: 'Chennai Intl', city: 'Chennai', country: 'India', lat: 12.9941, lng: 80.1709, elevation: 52, metar: { temp: 30, wind: '130/14KT', vis: '8000m', qnh: 1010, cond: 'Humid' } },
  CCU: { code: 'CCU', name: 'Netaji Subhash Chandra Bose', city: 'Kolkata', country: 'India', lat: 22.6547, lng: 88.4467, elevation: 16, metar: { temp: 27, wind: '170/05KT', vis: '5000m', qnh: 1012, cond: 'Mist' } },
  GOI: { code: 'GOI', name: 'Dabolim Airport', city: 'Goa', country: 'India', lat: 15.3800, lng: 73.8314, elevation: 184, metar: { temp: 28, wind: '240/10KT', vis: '9999m', qnh: 1011, cond: 'Clear Sky' } },
  DXB: { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE', lat: 25.2532, lng: 55.3657, elevation: 62, metar: { temp: 32, wind: '340/11KT', vis: '9999m', qnh: 1015, cond: 'Sunny' } },
  SIN: { code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore', lat: 1.3644, lng: 103.9915, elevation: 22, metar: { temp: 28, wind: '040/09KT', vis: '9999m', qnh: 1010, cond: 'Showers' } },
  LHR: { code: 'LHR', name: 'London Heathrow', city: 'London', country: 'UK', lat: 51.4700, lng: -0.4543, elevation: 83, metar: { temp: 14, wind: '220/15KT', vis: '9999m', qnh: 1021, cond: 'Overcast' } },
  DOH: { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar', lat: 25.2731, lng: 51.6081, elevation: 13, metar: { temp: 31, wind: '010/08KT', vis: '9999m', qnh: 1014, cond: 'Sunny' } },
  JFK: { code: 'JFK', name: 'John F Kennedy Intl', city: 'New York', country: 'USA', lat: 40.6413, lng: -73.7781, elevation: 13, metar: { temp: 16, wind: '310/14KT', vis: '9999m', qnh: 1018, cond: 'Scattered' } }
};

/* ==========================================================================
   Airspace Flights Roster
   ========================================================================== */
const INITIAL_FLIGHTS = [
  {
    flightId: 101,
    flightNo: 'AI-102',
    airline: 'Air India',
    airlineCode: 'AI',
    color: '#00e5ff',
    model: 'Boeing 787-9 Dreamliner',
    reg: 'VT-EXB',
    squawk: '4721',
    source: 'DEL',
    destination: 'BOM',
    status: 'airborne',
    phase: 'Cruising FL360',
    progress: 0.52,
    altitude: 36000,
    speed: 485,
    mach: 0.82,
    vertSpeed: 0,
    heading: 205,
    pitch: 1.2,
    roll: -0.5,
    depTime: new Date(Date.now() - 52 * 60000).toISOString(),
    arrTime: new Date(Date.now() + 48 * 60000).toISOString(),
    gate: '12A',
    terminal: 'T3',
    carousel: 'B5',
    totalSeats: 256,
    boardedCount: 248
  },
  {
    flightId: 102,
    flightNo: '6E-204',
    airline: 'IndiGo',
    airlineCode: '6E',
    color: '#38bdf8',
    model: 'Airbus A321neo',
    reg: 'VT-IMD',
    squawk: '2105',
    source: 'BLR',
    destination: 'DEL',
    status: 'airborne',
    phase: 'Cruising FL380',
    progress: 0.68,
    altitude: 38000,
    speed: 462,
    mach: 0.78,
    vertSpeed: 0,
    heading: 355,
    pitch: 0.8,
    roll: 1.1,
    depTime: new Date(Date.now() - 75 * 60000).toISOString(),
    arrTime: new Date(Date.now() + 35 * 60000).toISOString(),
    gate: '04B',
    terminal: 'T2',
    carousel: 'C2',
    totalSeats: 222,
    boardedCount: 215
  },
  {
    flightId: 103,
    flightNo: 'EK-501',
    airline: 'Emirates',
    airlineCode: 'EK',
    color: '#ef4444',
    model: 'Airbus A380-800',
    reg: 'A6-EVK',
    squawk: '3514',
    source: 'DXB',
    destination: 'BOM',
    status: 'descending',
    phase: 'Approach FL140',
    progress: 0.86,
    altitude: 14200,
    speed: 310,
    mach: 0.62,
    vertSpeed: -1600,
    heading: 108,
    pitch: -2.1,
    roll: 2.4,
    depTime: new Date(Date.now() - 145 * 60000).toISOString(),
    arrTime: new Date(Date.now() + 25 * 60000).toISOString(),
    gate: 'T2-44',
    terminal: 'T2',
    carousel: 'A1',
    totalSeats: 489,
    boardedCount: 472
  },
  {
    flightId: 104,
    flightNo: 'BA-142',
    airline: 'British Airways',
    airlineCode: 'BA',
    color: '#60a5fa',
    model: 'Boeing 777-300ER',
    reg: 'G-STBA',
    squawk: '7112',
    source: 'DEL',
    destination: 'CCU',
    status: 'airborne',
    phase: 'Cruising FL370',
    progress: 0.65,
    altitude: 37000,
    speed: 495,
    mach: 0.82,
    vertSpeed: 0,
    heading: 118,
    pitch: 1.0,
    roll: 0.0,
    depTime: new Date(Date.now() - 55 * 60000).toISOString(),
    arrTime: new Date(Date.now() + 65 * 60000).toISOString(),
    gate: 'T3-18',
    terminal: 'T3',
    carousel: 'D7',
    totalSeats: 336,
    boardedCount: 320
  },
  {
    flightId: 105,
    flightNo: 'SQ-406',
    airline: 'Singapore Airlines',
    airlineCode: 'SQ',
    color: '#f59e0b',
    model: 'Airbus A350-900',
    reg: '9V-SMA',
    squawk: '1446',
    source: 'BLR',
    destination: 'MAA',
    status: 'airborne',
    phase: 'Cruising FL240',
    progress: 0.45,
    altitude: 24000,
    speed: 390,
    mach: 0.70,
    vertSpeed: 0,
    heading: 96,
    pitch: 1.1,
    roll: -0.8,
    depTime: new Date(Date.now() - 25 * 60000).toISOString(),
    arrTime: new Date(Date.now() + 30 * 60000).toISOString(),
    gate: 'Gate 22',
    terminal: 'T2',
    carousel: 'B3',
    totalSeats: 303,
    boardedCount: 290
  },
  {
    flightId: 106,
    flightNo: '6E-551',
    airline: 'IndiGo',
    airlineCode: '6E',
    color: '#38bdf8',
    model: 'Airbus A320neo',
    reg: 'VT-IZY',
    squawk: '5224',
    source: 'BOM',
    destination: 'GOI',
    status: 'climbing',
    phase: 'Climbing FL220',
    progress: 0.32,
    altitude: 22000,
    speed: 410,
    mach: 0.72,
    vertSpeed: 2100,
    heading: 162,
    pitch: 5.4,
    roll: 1.2,
    depTime: new Date(Date.now() - 14 * 60000).toISOString(),
    arrTime: new Date(Date.now() + 36 * 60000).toISOString(),
    gate: '07A',
    terminal: 'T1',
    carousel: 'G1',
    totalSeats: 186,
    boardedCount: 184
  },
  {
    flightId: 107,
    flightNo: 'AI-803',
    airline: 'Air India',
    airlineCode: 'AI',
    color: '#00e5ff',
    model: 'Airbus A320neo',
    reg: 'VT-EXC',
    squawk: '3601',
    source: 'DEL',
    destination: 'HYD',
    status: 'airborne',
    phase: 'Cruising FL340',
    progress: 0.58,
    altitude: 34000,
    speed: 468,
    mach: 0.79,
    vertSpeed: 0,
    heading: 174,
    pitch: 0.9,
    roll: -0.2,
    depTime: new Date(Date.now() - 65 * 60000).toISOString(),
    arrTime: new Date(Date.now() + 45 * 60000).toISOString(),
    gate: '14C',
    terminal: 'T3',
    carousel: 'H2',
    totalSeats: 180,
    boardedCount: 175
  },
  {
    flightId: 108,
    flightNo: 'UK-993',
    airline: 'Vistara',
    airlineCode: 'UK',
    color: '#a855f7',
    model: 'Airbus A321neo',
    reg: 'VT-TVB',
    squawk: '1200',
    source: 'DEL',
    destination: 'BLR',
    status: 'boarding',
    phase: 'Gate Boarding (Zone 2)',
    progress: 0.0,
    altitude: 777,
    speed: 0,
    mach: 0.0,
    vertSpeed: 0,
    heading: 185,
    pitch: 0,
    roll: 0,
    depTime: new Date(Date.now() + 18 * 60000).toISOString(),
    arrTime: new Date(Date.now() + 160 * 60000).toISOString(),
    gate: 'Gate 29',
    terminal: 'T3',
    carousel: 'B4',
    totalSeats: 188,
    boardedCount: 132
  },
  {
    flightId: 109,
    flightNo: 'QR-556',
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    color: '#f43f5e',
    model: 'Boeing 787-8 Dreamliner',
    reg: 'A7-BCA',
    squawk: '6241',
    source: 'HYD',
    destination: 'BOM',
    status: 'airborne',
    phase: 'Cruising FL320',
    progress: 0.48,
    altitude: 32000,
    speed: 460,
    mach: 0.78,
    vertSpeed: 0,
    heading: 278,
    pitch: 1.0,
    roll: 0.3,
    depTime: new Date(Date.now() - 40 * 60000).toISOString(),
    arrTime: new Date(Date.now() + 50 * 60000).toISOString(),
    gate: 'T1-09',
    terminal: 'T1',
    carousel: 'C5',
    totalSeats: 254,
    boardedCount: 242
  },
  {
    flightId: 110,
    flightNo: 'SG-8169',
    airline: 'SpiceJet',
    airlineCode: 'SG',
    color: '#f97316',
    model: 'Boeing 737-800',
    reg: 'VT-SZJ',
    squawk: '0420',
    source: 'CCU',
    destination: 'DEL',
    status: 'landed',
    phase: 'Taxiing to Gate 15',
    progress: 1.0,
    altitude: 777,
    speed: 18,
    mach: 0.02,
    vertSpeed: 0,
    heading: 280,
    pitch: 0,
    roll: 0,
    depTime: new Date(Date.now() - 130 * 60000).toISOString(),
    arrTime: new Date(Date.now() - 5 * 60000).toISOString(),
    gate: 'Gate 15',
    terminal: 'T1D',
    carousel: 'A4',
    totalSeats: 189,
    boardedCount: 186
  }
];

const SAMPLE_PASSENGERS = [
  { TicketID: 1, Name: 'Rahul Sharma', SeatNo: '12A', PNR: '7KJ89X', ClassType: 'Economy', BoardingStatus: 'Boarded', BoardedAt: new Date(Date.now() - 25 * 60000).toISOString(), Zone: 2 },
  { TicketID: 2, Name: 'Priya Patel', SeatNo: '02B', PNR: '9LM34Q', ClassType: 'Business', BoardingStatus: 'Boarded', BoardedAt: new Date(Date.now() - 32 * 60000).toISOString(), Zone: 1 },
  { TicketID: 3, Name: 'Vikram Malhotra', SeatNo: '14C', PNR: '2BN76Y', ClassType: 'Economy', BoardingStatus: 'Checked In', BoardedAt: null, Zone: 3 },
  { TicketID: 4, Name: 'Ananya Deshmukh', SeatNo: '01A', PNR: '4TR11Z', ClassType: 'Business', BoardingStatus: 'Boarded', BoardedAt: new Date(Date.now() - 38 * 60000).toISOString(), Zone: 1 },
  { TicketID: 5, Name: 'Arjun Sen', SeatNo: '18D', PNR: '8WE55P', ClassType: 'Economy', BoardingStatus: 'Not Checked In', BoardedAt: null, Zone: 3 },
  { TicketID: 6, Name: 'Deepa Krishnan', SeatNo: '21F', PNR: '6YT90K', ClassType: 'Economy', BoardingStatus: 'No Show', BoardedAt: null, Zone: 4 },
  { TicketID: 7, Name: 'Rohan Mehta', SeatNo: '15A', PNR: '3KL88M', ClassType: 'Economy', BoardingStatus: 'Boarded', BoardedAt: new Date(Date.now() - 18 * 60000).toISOString(), Zone: 2 },
  { TicketID: 8, Name: 'Kavita Nair', SeatNo: '03D', PNR: '5OP23R', ClassType: 'Business', BoardingStatus: 'Boarded', BoardedAt: new Date(Date.now() - 29 * 60000).toISOString(), Zone: 1 }
];

/* ==========================================================================
   Navigation Calculations
   ========================================================================== */
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

function haversineDistance(c1, c2) {
  const dLat = (c2[0] - c1[0]) * DEG_TO_RAD;
  const dLng = (c2[1] - c1[1]) * DEG_TO_RAD;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(c1[0] * DEG_TO_RAD) * Math.cos(c2[0] * DEG_TO_RAD) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const km = 6371 * c;
  return { km: Math.round(km), nm: Math.round(km * 0.539957) };
}

function calculateBearing(startLat, startLng, destLat, destLng) {
  const y = Math.sin((destLng - startLng) * DEG_TO_RAD) * Math.cos(destLat * DEG_TO_RAD);
  const x = Math.cos(startLat * DEG_TO_RAD) * Math.sin(destLat * DEG_TO_RAD) -
            Math.sin(startLat * DEG_TO_RAD) * Math.cos(destLat * DEG_TO_RAD) * Math.cos((destLng - startLng) * DEG_TO_RAD);
  return Math.round((Math.atan2(y, x) * RAD_TO_DEG + 360) % 360);
}

function interpolateGreatCircle(c1, c2, fraction) {
  if (fraction <= 0) return [c1[0], c1[1]];
  if (fraction >= 1) return [c2[0], c2[1]];

  const lat1 = c1[0] * DEG_TO_RAD, lon1 = c1[1] * DEG_TO_RAD;
  const lat2 = c2[0] * DEG_TO_RAD, lon2 = c2[1] * DEG_TO_RAD;
  const d = 2 * Math.asin(Math.sqrt(
    Math.sin((lat2 - lat1) / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2
  ));
  if (d === 0 || isNaN(d)) return [c1[0], c1[1]];
  const A = Math.sin((1 - fraction) * d) / Math.sin(d);
  const B = Math.sin(fraction * d) / Math.sin(d);
  const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
  const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
  const z = A * Math.sin(lat1) + B * Math.sin(lat2);
  const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
  const lon = Math.atan2(y, x);
  const resLat = lat * RAD_TO_DEG;
  const resLng = lon * RAD_TO_DEG;
  if (isNaN(resLat) || isNaN(resLng)) return [c1[0], c1[1]];
  return [resLat, resLng];
}

/* ==========================================================================
   Web Audio Synthesizer
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.08) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch { /* audio ignored */ }
}

const AudioSFX = {
  scanOk: () => { playTone(880, 'sine', 0.09, 0.1); setTimeout(() => playTone(1320, 'sine', 0.14, 0.08), 75); },
  click: () => playTone(600, 'triangle', 0.04, 0.04),
  radarPing: () => playTone(440, 'sine', 0.35, 0.03),
  error: () => { playTone(300, 'sawtooth', 0.12, 0.08); setTimeout(() => playTone(220, 'sawtooth', 0.18, 0.08), 80); }
};

/* ==========================================================================
   Application State
   ========================================================================== */
const state = {
  currentTab: 'tracking',
  role: sessionStorage.getItem('role') || 'guest',
  userName: sessionStorage.getItem('userName') || 'Aviation Explorer',
  userPNR: '7KJ89X',
  theme: localStorage.getItem('skypulse_theme') || 'dark',

  flights: JSON.parse(JSON.stringify(INITIAL_FLIGHTS)),
  selectedFlightId: 101,
  flightFilter: 'all',
  flightSearchTerm: '',
  simSpeed: 1,

  activeManifestFlightId: 101,
  passengers: JSON.parse(JSON.stringify(SAMPLE_PASSENGERS)),
  manifestFilter: 'all',
  manifestSearch: '',

  simTimer: null,
  clockTimer: null,
  activeModal: null,

  radarCenter: { lat: 21.0, lng: 78.5 },
  radarZoom: 1.0,
  radarSweepAngle: 0,
  hoveredFlightId: null
};

/* ==========================================================================
   DOM Helper Functions
   ========================================================================== */
function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat()) {
    if (kid != null) el.append(kid.nodeType ? kid : document.createTextNode(kid));
  }
  return el;
}

function toast(msg, type = 'ok') {
  const toastEl = document.getElementById('toast');
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.className = `toast show ${type}`;
  clearTimeout(toast.t);
  toast.t = setTimeout(() => {
    toastEl.className = 'toast';
  }, 3500);
}

const fmtTime = (d) => new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
const fmtTimeShort = (d) => new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

/* ==========================================================================
   Real-Time Aircraft Simulation Engine
   ========================================================================== */
function startSimulation() {
  if (state.simTimer) clearInterval(state.simTimer);
  state.simTimer = setInterval(() => {
    if (state.simSpeed === 0) return;
    
    for (const f of state.flights) {
      if (f.status === 'boarding') continue;

      const orig = AIRPORTS[f.source];
      const dest = AIRPORTS[f.destination];
      if (!orig || !dest) continue;

      const baseIncrement = 0.00045;
      f.progress += baseIncrement * state.simSpeed;

      if (f.progress >= 1.0) {
        f.progress = 0.0;
        const temp = f.source;
        f.source = f.destination;
        f.destination = temp;
        f.status = 'climbing';
        f.phase = `Departing ${f.source}`;
        f.depTime = new Date().toISOString();
        f.arrTime = new Date(Date.now() + 105 * 60000).toISOString();
        continue;
      }

      const currentPos = interpolateGreatCircle([orig.lat, orig.lng], [dest.lat, dest.lng], f.progress);
      const nextPos = interpolateGreatCircle([orig.lat, orig.lng], [dest.lat, dest.lng], Math.min(1.0, f.progress + 0.02));
      f.heading = calculateBearing(currentPos[0], currentPos[1], nextPos[0], nextPos[1]);

      if (f.progress < 0.12) {
        f.status = 'climbing';
        const climbPct = f.progress / 0.12;
        f.altitude = Math.round(orig.elevation + climbPct * (36000 - orig.elevation));
        f.vertSpeed = 2200;
        f.speed = Math.round(180 + climbPct * 290);
        f.phase = `Climbing to FL360 (${Math.round(f.altitude)} ft)`;
        f.pitch = 4.8;
        f.roll = (Math.sin(Date.now() / 2000) * 1.5);
      } else if (f.progress > 0.85) {
        f.status = 'descending';
        const descPct = (f.progress - 0.85) / 0.15;
        f.altitude = Math.round(36000 - descPct * (36000 - dest.elevation));
        f.vertSpeed = -1800;
        f.speed = Math.round(470 - descPct * 300);
        f.phase = `Approach ${f.destination} (${Math.round(f.altitude)} ft)`;
        f.pitch = -2.2;
        f.roll = (Math.cos(Date.now() / 2200) * 2.0);
      } else {
        f.status = 'airborne';
        f.altitude = 36000 + Math.round(Math.sin(Date.now() / 5000) * 80);
        f.vertSpeed = 0;
        f.speed = 480 + Math.round(Math.sin(Date.now() / 4000) * 10);
        f.phase = `Cruising FL360`;
        f.pitch = 0.8;
        f.roll = (Math.sin(Date.now() / 3500) * 0.8);
      }
      f.mach = Number((f.speed / 590).toFixed(2));
    }

    if (state.activeModal === 'telemetry') {
      updateTelemetryModalLiveValues();
    }

    updateSideFeedWidgets();
  }, 1000);
}

/* ==========================================================================
   Tactical ATC Canvas Radar Engine (Universal 60FPS Fallback-Safe)
   ========================================================================== */
let radarCanvasEl = null;
let radarAnimFrameId = null;

function initTacticalRadarCanvas(canvasId = 'tactical-radar-canvas') {
  radarCanvasEl = document.getElementById(canvasId);
  if (!radarCanvasEl) return;

  const ctx = radarCanvasEl.getContext('2d');
  let isDragging = false;
  let dragLast = { x: 0, y: 0 };

  radarCanvasEl.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragLast = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mousemove', (e) => {
    if (!radarCanvasEl) return;
    const w = radarCanvasEl.width;
    const h = radarCanvasEl.height;
    const scale = (h / 24) * state.radarZoom;

    if (isDragging) {
      const dx = e.clientX - dragLast.x;
      const dy = e.clientY - dragLast.y;
      dragLast = { x: e.clientX, y: e.clientY };

      const cosLat = Math.cos(state.radarCenter.lat * DEG_TO_RAD) || 1;
      state.radarCenter.lng -= dx / (scale * cosLat);
      state.radarCenter.lat += dy / scale;
      return;
    }

    const rect = radarCanvasEl.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let hit = null;
    for (const f of state.flights) {
      const orig = AIRPORTS[f.source];
      const dest = AIRPORTS[f.destination];
      if (!orig || !dest) continue;
      const pos = interpolateGreatCircle([orig.lat, orig.lng], [dest.lat, dest.lng], f.progress);
      const pt = geoToRadarCanvas(pos[0], pos[1], w, h);
      const dist = Math.hypot(pt.x - mx, pt.y - my);
      if (dist < 26) {
        hit = f.flightId;
        break;
      }
    }
    state.hoveredFlightId = hit;
    radarCanvasEl.style.cursor = hit ? 'pointer' : (isDragging ? 'grabbing' : 'crosshair');
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  radarCanvasEl.addEventListener('wheel', (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.88;
    state.radarZoom = Math.max(0.4, Math.min(5.0, state.radarZoom * factor));
  }, { passive: false });

  radarCanvasEl.addEventListener('click', () => {
    if (state.hoveredFlightId) {
      selectFlight(state.hoveredFlightId);
      AudioSFX.click();
    }
  });

  if (radarAnimFrameId) cancelAnimationFrame(radarAnimFrameId);

  function renderRadarLoop() {
    if (!radarCanvasEl || state.currentTab !== 'tracking') {
      radarAnimFrameId = requestAnimationFrame(renderRadarLoop);
      return;
    }

    try {
      const curW = radarCanvasEl.clientWidth || 800;
      const curH = radarCanvasEl.clientHeight || 600;
      if (radarCanvasEl.width !== curW || radarCanvasEl.height !== curH) {
        radarCanvasEl.width = curW;
        radarCanvasEl.height = curH;
      }

      const w = radarCanvasEl.width;
      const h = radarCanvasEl.height;

      // Dark Cockpit Grid Canvas Background
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Rotate sweep angle
      state.radarSweepAngle = (state.radarSweepAngle + 0.02) % (Math.PI * 2);

      // Range Rings
      const ringSpacing = 70 * state.radarZoom;
      const ringDistances = ['50 NM', '100 NM', '150 NM', '200 NM', '300 NM', '400 NM'];

      for (let i = 1; i <= 6; i++) {
        const r = ringSpacing * i;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = (i === 2 || i === 4) ? 'rgba(0, 229, 255, 0.25)' : 'rgba(0, 229, 255, 0.09)';
        ctx.lineWidth = 1;
        ctx.setLineDash(i % 2 === 0 ? [] : [4, 6]);
        ctx.stroke();

        ctx.fillStyle = 'rgba(0, 229, 255, 0.45)';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(ringDistances[i - 1] || `${i * 50} NM`, cx + 6, cy - r + 12);
      }
      ctx.setLineDash([]);

      // Cardinal Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.12)';
      ctx.stroke();

      // Bearing Labels
      ctx.fillStyle = 'rgba(0, 229, 255, 0.7)';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('000° N', cx, 22);
      ctx.fillText('180° S', cx, h - 14);
      ctx.textAlign = 'left';
      ctx.fillText('090° E', w - 50, cy - 6);
      ctx.textAlign = 'right';
      ctx.fillText('270° W', 50, cy - 6);

      // Universal Fading Radar Sweep Arc (100% Robust Standard 2D Arcs)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(state.radarSweepAngle);
      const sweepRadius = Math.max(w, h);
      const sweepSteps = 14;
      const sweepArc = Math.PI * 0.35;
      for (let s = 0; s < sweepSteps; s++) {
        const a1 = -sweepArc * (s / sweepSteps);
        const a2 = -sweepArc * ((s + 1) / sweepSteps);
        const alpha = 0.22 * (1 - s / sweepSteps);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, sweepRadius, a2, a1);
        ctx.closePath();
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.fill();
      }
      // Leading bright radar sweep ray
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(sweepRadius, 0);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.85)';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();

      // Draw Flight Route Corridors
      for (const f of state.flights) {
        const orig = AIRPORTS[f.source];
        const dest = AIRPORTS[f.destination];
        if (!orig || !dest) continue;

        const isSelected = f.flightId === state.selectedFlightId;

        ctx.beginPath();
        for (let i = 0; i <= 20; i++) {
          const coord = interpolateGreatCircle([orig.lat, orig.lng], [dest.lat, dest.lng], i / 20);
          const pt = geoToRadarCanvas(coord[0], coord[1], w, h);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = isSelected ? (f.color || '#00e5ff') : 'rgba(0, 229, 255, 0.2)';
        ctx.lineWidth = isSelected ? 2.5 : 1;
        ctx.setLineDash(isSelected ? [6, 4] : [3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Airport Waypoint Nodes
      for (const [code, apt] of Object.entries(AIRPORTS)) {
        const pt = geoToRadarCanvas(apt.lat, apt.lng, w, h);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00e5ff';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 11px Outfit, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(code, pt.x + 8, pt.y - 2);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
        ctx.font = '9px Inter, sans-serif';
        ctx.fillText(apt.city, pt.x + 8, pt.y + 9);
      }

      // Draw Active Aircraft Targets & ATC Tags
      for (const f of state.flights) {
        const orig = AIRPORTS[f.source];
        const dest = AIRPORTS[f.destination];
        if (!orig || !dest) continue;

        const pos = interpolateGreatCircle([orig.lat, orig.lng], [dest.lat, dest.lng], f.progress);
        const pt = geoToRadarCanvas(pos[0], pos[1], w, h);
        const isSelected = f.flightId === state.selectedFlightId;
        const isHovered = f.flightId === state.hoveredFlightId;

        ctx.save();
        ctx.translate(pt.x, pt.y);

        // Selection Pulse Halo
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(0, 0, 16, 0, Math.PI * 2);
          ctx.strokeStyle = isSelected ? '#00e5ff' : '#f59e0b';
          ctx.lineWidth = 1.8;
          ctx.setLineDash([4, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.rotate((f.heading - 90) * DEG_TO_RAD);

        // Heading Speed Vector
        const vectorLen = Math.max(16, (f.speed / 40) * state.radarZoom);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(vectorLen, 0);
        ctx.strokeStyle = isSelected ? '#00e5ff' : 'rgba(0, 229, 255, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Airliner Silhouette
        ctx.beginPath();
        ctx.moveTo(9, 0);
        ctx.lineTo(-6, -7);
        ctx.lineTo(-4, -1);
        ctx.lineTo(-9, -1);
        ctx.lineTo(-9, 1);
        ctx.lineTo(-4, 1);
        ctx.lineTo(-6, 7);
        ctx.closePath();
        ctx.fillStyle = isSelected ? '#00e5ff' : (f.color || '#38bdf8');
        ctx.fill();

        ctx.restore();

        // ATC Flight Data Block Tag
        ctx.save();
        const tagX = pt.x + 14;
        const tagY = pt.y - 12;

        ctx.fillStyle = isSelected ? 'rgba(0, 229, 255, 0.18)' : 'rgba(12, 19, 34, 0.85)';
        ctx.strokeStyle = isSelected ? '#00e5ff' : 'rgba(255, 255, 255, 0.16)';
        ctx.lineWidth = 1;
        ctx.strokeRect(tagX - 4, tagY - 11, 78, 26);
        ctx.fillRect(tagX - 4, tagY - 11, 78, 26);

        ctx.fillStyle = isSelected ? '#00e5ff' : '#f1f5f9';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.textAlign = 'left';
        ctx.fillText(f.flightNo, tagX, tagY);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillText(`FL${Math.round(f.altitude / 1000) * 10} ${f.speed}K`, tagX, tagY + 11);

        ctx.restore();
      }

      // Top Right Telemetry Status Box
      ctx.save();
      ctx.fillStyle = 'rgba(12, 19, 34, 0.85)';
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
      ctx.strokeRect(w - 180, 14, 166, 68);
      ctx.fillRect(w - 180, 14, 166, 68);

      ctx.fillStyle = '#00e5ff';
      ctx.font = 'bold 10px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText('ATC RADAR · AIRSPACE', w - 170, 28);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillText('FREQ: 134.250 MHz', w - 170, 42);
      ctx.fillText(`TRACKED: ${state.flights.length} TARGETS`, w - 170, 56);
      ctx.fillText('MODE S / ADS-B ACTIVE', w - 170, 70);
      ctx.restore();
    } catch (err) {
      console.error('Radar canvas draw error:', err);
    }

    radarAnimFrameId = requestAnimationFrame(renderRadarLoop);
  }

  radarAnimFrameId = requestAnimationFrame(renderRadarLoop);
}

function geoToRadarCanvas(lat, lng, w, h) {
  const scale = (h / 24) * state.radarZoom;
  const cosLat = Math.cos(state.radarCenter.lat * DEG_TO_RAD) || 1;
  const x = w / 2 + (lng - state.radarCenter.lng) * scale * cosLat;
  const y = h / 2 - (lat - state.radarCenter.lat) * scale;
  return { x, y };
}

function selectFlight(flightId) {
  state.selectedFlightId = flightId;
  const f = state.flights.find((x) => x.flightId === flightId);
  if (!f) return;

  const orig = AIRPORTS[f.source];
  const dest = AIRPORTS[f.destination];
  if (orig && dest) {
    const pos = interpolateGreatCircle([orig.lat, orig.lng], [dest.lat, dest.lng], f.progress);
    if (!isNaN(pos[0]) && !isNaN(pos[1])) {
      state.radarCenter.lat = pos[0];
      state.radarCenter.lng = pos[1];
    }
  }

  const allCards = document.querySelectorAll('.flight-card');
  allCards.forEach((c) => {
    c.classList.toggle('active', c.dataset.flightId === String(flightId));
  });
}

window.inspectFlightTelemetry = function(flightId) {
  selectFlight(flightId);
  openTelemetryModal(flightId);
};

/* ==========================================================================
   Telemetry HUD Modal & Cockpit Deck
   ========================================================================== */
function openTelemetryModal(flightId) {
  state.activeModal = 'telemetry';
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const f = state.flights.find((x) => x.flightId === flightId);
  if (!f) return;
  const orig = AIRPORTS[f.source];
  const dest = AIRPORTS[f.destination];
  const dist = haversineDistance([orig.lat, orig.lng], [dest.lat, dest.lng]);
  const covered = Math.round(dist.nm * f.progress);
  const remaining = dist.nm - covered;

  modalContainer.replaceChildren(
    h('div', { class: 'modal-backdrop', onclick: (e) => { if (e.target === e.currentTarget) closeModal(); } },
      h('div', { class: 'avionics-modal' },
        h('div', { class: 'avionics-modal-header' },
          h('div', { class: 'avionics-flight-info' },
            h('div', { class: 'airline-logo-box', style: `color: ${f.color}` }, f.airlineCode),
            h('div', {},
              h('div', { class: 'avionics-flight-title' }, `${f.flightNo} · ${f.airline}`),
              h('div', { class: 'text-muted font-mono' }, `${f.model} · Registration ${f.reg} · Squawk ${f.squawk}`))),
          h('div', { style: 'display: flex; gap: 8px; align-items: center;' },
            h('span', { class: `status-pill ${f.status}` }, f.phase),
            h('button', { class: 'icon-btn', onclick: closeModal, 'aria-label': 'Close' }, '✕'))),

        h('div', { class: 'avionics-modal-body' },
          h('div', { class: 'card', style: 'padding: 16px; background: var(--bg-surface-elevated);' },
            h('div', { class: 'route-row' },
              h('div', { class: 'airport-col' },
                h('span', { class: 'airport-code text-cyan' }, f.source),
                h('span', { class: 'airport-city' }, orig.name),
                h('span', { class: 'airport-time font-mono' }, `Departed: ${fmtTimeShort(f.depTime)} (Gate ${f.gate})`)),
              h('div', { class: 'route-progress-wrap' },
                h('div', { class: 'route-progress-track' },
                  h('div', { id: 'modal-route-bar', class: 'route-progress-bar', style: `width: ${Math.round(f.progress * 100)}%` },
                    h('span', { class: 'plane-progress-indicator' }, '✈'))),
                h('span', { id: 'modal-route-dist', class: 'route-duration-text font-mono' },
                  `${covered} NM covered · ${remaining} NM to go (${Math.round(f.progress * 100)}%)`)),
              h('div', { class: 'airport-col dest' },
                h('span', { class: 'airport-code text-cyan' }, f.destination),
                h('span', { class: 'airport-city' }, dest.name),
                h('span', { class: 'airport-time font-mono' }, `ETA: ${fmtTimeShort(f.arrTime)} (Carousel ${f.carousel})`)))),

          h('div', { class: 'cockpit-deck' },
            h('div', { class: 'instrument-card' },
              h('span', { class: 'instrument-label' }, 'Attitude Indicator'),
              h('div', { class: 'attitude-indicator-wrap' },
                h('div', { id: 'modal-horizon-line', class: 'horizon-line', style: `transform: rotate(${f.roll}deg) translateY(${f.pitch * 3}px);` }),
                h('div', { class: 'attitude-aircraft-symbol' })),
              h('span', { id: 'modal-pitch-roll', class: 'instrument-unit' }, `PITCH: ${f.pitch.toFixed(1)}° · ROLL: ${f.roll.toFixed(1)}°`)),

            h('div', { class: 'instrument-card' },
              h('span', { class: 'instrument-label' }, 'Altitude'),
              h('div', { id: 'modal-altimeter-val', class: 'instrument-value' }, f.altitude.toLocaleString()),
              h('span', { class: 'instrument-unit' }, 'FEET (MSL) · BARO 1013 hPa'),
              h('span', { id: 'modal-vs-val', class: 'font-mono text-muted', style: 'font-size: 0.72rem; margin-top: 4px;' },
                `V/S: ${f.vertSpeed > 0 ? '+' : ''}${f.vertSpeed} FPM`)),

            h('div', { class: 'instrument-card' },
              h('span', { class: 'instrument-label' }, 'Ground Speed'),
              h('div', { id: 'modal-speed-val', class: 'instrument-value' }, String(f.speed)),
              h('span', { class: 'instrument-unit' }, 'KNOTS (KTAS)'),
              h('span', { id: 'modal-mach-val', class: 'font-mono text-cyan', style: 'font-size: 0.72rem; margin-top: 4px;' },
                `MACH ${f.mach} · ${Math.round(f.speed * 1.852)} KM/H`)),

            h('div', { class: 'instrument-card' },
              h('span', { class: 'instrument-label' }, 'Magnetic Track'),
              h('div', { id: 'modal-heading-val', class: 'instrument-value' }, `${f.heading}°`),
              h('span', { class: 'instrument-unit' }, 'COMPASS HEADING'),
              h('span', { class: 'font-mono text-muted', style: 'font-size: 0.72rem; margin-top: 4px;' }, 'GPS TRACK SYNCHRONIZED'))),

          h('div', { class: 'altitude-chart-card' },
            h('div', { style: 'display: flex; justify-content: space-between; align-items: center;' },
              h('h4', {}, 'Flight Vertical Profile (Climb ➔ Cruise ➔ Descent)'),
              h('span', { class: 'font-mono text-muted', style: 'font-size: 0.75rem;' }, 'Cruising Ceiling: FL360')),
            h('svg', { class: 'altitude-svg-chart', viewBox: '0 0 500 100' },
              h('line', { x1: '0', y1: '20', x2: '500', y2: '20', stroke: 'rgba(255,255,255,0.08)', 'stroke-dasharray': '3,3' }),
              h('line', { x1: '0', y1: '60', x2: '500', y2: '60', stroke: 'rgba(255,255,255,0.08)', 'stroke-dasharray': '3,3' }),
              h('path', {
                d: 'M 10 90 Q 60 20, 100 20 L 400 20 Q 450 20, 490 90',
                fill: 'none',
                stroke: 'rgba(0, 229, 255, 0.4)',
                'stroke-width': '2.5'
              }),
              h('circle', {
                id: 'modal-chart-pin',
                cx: String(10 + f.progress * 480),
                cy: f.progress < 0.15 ? String(90 - (f.progress / 0.15) * 70) : (f.progress > 0.85 ? String(20 + ((f.progress - 0.85) / 0.15) * 70) : '20'),
                r: '6',
                fill: '#00e5ff',
                stroke: '#ffffff',
                'stroke-width': '2'
              }))),

          h('div', { class: 'weather-split-card' },
            h('div', { class: 'weather-box' },
              h('div', { style: 'font-weight: 700; color: var(--neon-cyan);' }, `Origin METAR · ${orig.code}`),
              h('div', { class: 'font-mono', style: 'font-size: 0.82rem;' },
                `Temp: ${orig.metar.temp}°C | Wind: ${orig.metar.wind}`),
              h('div', { class: 'text-muted', style: 'font-size: 0.75rem;' },
                `Visibility: ${orig.metar.vis} | Conditions: ${orig.metar.cond}`)),
            h('div', { class: 'weather-box' },
              h('div', { style: 'font-weight: 700; color: var(--neon-cyan);' }, `Destination METAR · ${dest.code}`),
              h('div', { class: 'font-mono', style: 'font-size: 0.82rem;' },
                `Temp: ${dest.metar.temp}°C | Wind: ${dest.metar.wind}`),
              h('div', { class: 'text-muted', style: 'font-size: 0.75rem;' },
                `Visibility: ${dest.metar.vis} | Conditions: ${dest.metar.cond}`))),

          h('div', { style: 'display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end;' },
            h('button', {
              class: 'btn',
              onclick: () => {
                f.progress = Math.min(0.92, f.progress + 0.15);
                toast(`Accelerated flight ${f.flightNo} by +15% route distance`);
              }
            }, '⏩ Fast Forward (+15%)'),
            h('button', {
              class: 'btn primary',
              onclick: () => {
                closeModal();
                state.currentTab = 'tracking';
                render();
                selectFlight(f.flightId);
              }
            }, '📡 View on Live Radar Map'))))));
}

function updateTelemetryModalLiveValues() {
  const f = state.flights.find((x) => x.flightId === state.selectedFlightId);
  if (!f) return;
  const orig = AIRPORTS[f.source];
  const dest = AIRPORTS[f.destination];
  if (!orig || !dest) return;

  const dist = haversineDistance([orig.lat, orig.lng], [dest.lat, dest.lng]);
  const covered = Math.round(dist.nm * f.progress);
  const remaining = dist.nm - covered;

  const routeBar = document.getElementById('modal-route-bar');
  if (routeBar) routeBar.style.width = `${Math.round(f.progress * 100)}%`;

  const routeDist = document.getElementById('modal-route-dist');
  if (routeDist) routeDist.textContent = `${covered} NM covered · ${remaining} NM to go (${Math.round(f.progress * 100)}%)`;

  const altVal = document.getElementById('modal-altimeter-val');
  if (altVal) altVal.textContent = f.altitude.toLocaleString();

  const vsVal = document.getElementById('modal-vs-val');
  if (vsVal) vsVal.textContent = `V/S: ${f.vertSpeed > 0 ? '+' : ''}${f.vertSpeed} FPM`;

  const spdVal = document.getElementById('modal-speed-val');
  if (spdVal) spdVal.textContent = String(f.speed);

  const machVal = document.getElementById('modal-mach-val');
  if (machVal) machVal.textContent = `MACH ${f.mach} · ${Math.round(f.speed * 1.852)} KM/H`;

  const hdgVal = document.getElementById('modal-heading-val');
  if (hdgVal) hdgVal.textContent = `${f.heading}°`;

  const horizonLine = document.getElementById('modal-horizon-line');
  if (horizonLine) horizonLine.style.transform = `rotate(${f.roll}deg) translateY(${f.pitch * 3}px)`;

  const pitchRoll = document.getElementById('modal-pitch-roll');
  if (pitchRoll) pitchRoll.textContent = `PITCH: ${f.pitch.toFixed(1)}° · ROLL: ${f.roll.toFixed(1)}°`;

  const chartPin = document.getElementById('modal-chart-pin');
  if (chartPin) {
    chartPin.setAttribute('cx', String(10 + f.progress * 480));
    const cy = f.progress < 0.15 ? (90 - (f.progress / 0.15) * 70) : (f.progress > 0.85 ? (20 + ((f.progress - 0.85) / 0.15) * 70) : 20);
    chartPin.setAttribute('cy', String(cy));
  }
}

function updateSideFeedWidgets() {
  for (const f of state.flights) {
    const card = document.querySelector(`.flight-card[data-flight-id="${f.flightId}"]`);
    if (card) {
      const altElem = card.querySelector('.live-alt-val');
      if (altElem) altElem.textContent = `${f.altitude.toLocaleString()} ft`;
      const spdElem = card.querySelector('.live-spd-val');
      if (spdElem) spdElem.textContent = `${f.speed} kts`;
      const pBar = card.querySelector('.route-progress-bar');
      if (pBar) pBar.style.width = `${Math.round(f.progress * 100)}%`;
      const statusPill = card.querySelector('.status-pill');
      if (statusPill) {
        statusPill.className = `status-pill ${f.status}`;
        statusPill.textContent = f.phase;
      }
    }
  }
}

function closeModal() {
  state.activeModal = null;
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) modalContainer.replaceChildren();
}

/* ==========================================================================
   Navigation Header Component
   ========================================================================== */
function renderHeader() {
  const activeCount = state.flights.filter((f) => f.status === 'airborne' || f.status === 'climbing' || f.status === 'descending').length;

  const now = new Date();
  const clockUtc = h('span', { class: 'clock-utc' }, 'UTC ' + now.toUTCString().slice(17, 25));
  const clockLocal = h('span', { class: 'clock-local' }, 'LOCAL ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  if (!state.clockTimer) {
    state.clockTimer = setInterval(() => {
      const cur = new Date();
      clockUtc.textContent = 'UTC ' + cur.toUTCString().slice(17, 25);
      clockLocal.textContent = 'LOCAL ' + cur.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }, 1000);
  }

  const tabs = [
    { id: 'tracking', label: 'Live Airspace Radar', icon: '📡', badge: `${activeCount} Active` },
    { id: 'manifest', label: 'Gate & Boarding', icon: '📋', badge: 'Gate 12' },
    { id: 'trips', label: 'My Trips & Pass', icon: '🎫', badge: null },
    { id: 'search', label: 'Search Flights', icon: '🔍', badge: null }
  ];

  return h('header', { class: 'skypulse-nav' },
    h('a', { class: 'brand-section', href: '#', onclick: (e) => { e.preventDefault(); state.currentTab = 'tracking'; render(); } },
      h('div', { class: 'brand-logo-wrap' },
        h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
          h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' }))),
      h('div', { class: 'brand-title' },
        h('h1', {}, 'SkyPulse'),
        h('span', { class: 'brand-sub' },
          h('span', { class: 'pulse-dot' }),
          'Live Flight Tracking System'))),

    h('nav', { class: 'nav-tabs' },
      tabs.map((tab) =>
        h('button', {
          class: `nav-tab-btn ${state.currentTab === tab.id ? 'active' : ''}`,
          onclick: () => { state.currentTab = tab.id; AudioSFX.click(); render(); }
        },
          h('span', {}, tab.icon),
          h('span', {}, tab.label),
          tab.badge ? h('span', { class: 'nav-badge' }, tab.badge) : null))),

    h('div', { class: 'nav-actions' },
      h('div', { class: 'clock-widget' }, clockUtc, clockLocal),

      h('button', {
        class: 'icon-btn',
        title: soundEnabled ? 'Mute Audio' : 'Enable Audio',
        onclick: () => {
          soundEnabled = !soundEnabled;
          toast(soundEnabled ? 'Cockpit Audio Enabled' : 'Audio Muted');
          render();
        }
      }, soundEnabled ? '🔊' : '🔇'),

      h('button', {
        class: 'icon-btn',
        title: 'Toggle Dark / Light Theme',
        onclick: () => {
          state.theme = state.theme === 'dark' ? 'light' : 'dark';
          document.body.className = `theme-${state.theme}`;
          localStorage.setItem('skypulse_theme', state.theme);
          toast(`Switched to ${state.theme === 'dark' ? 'Cockpit Dark' : 'Daylight Terminal'} theme`);
          render();
        }
      }, state.theme === 'dark' ? '🌙' : '☀️'),

      h('div', { style: 'position: relative;' },
        h('button', {
          class: 'role-badge-btn',
          onclick: () => cycleRolePreset()
        },
          h('span', { class: `role-pill ${state.role}` }, state.role),
          h('span', { style: 'font-weight: 500;' }, state.userName),
          h('span', { style: 'font-size: 0.7rem; opacity: 0.6;' }, '⇄')))));
}

function cycleRolePreset() {
  const roles = [
    { role: 'guest', name: 'Aviation Explorer' },
    { role: 'passenger', name: 'Rahul Sharma (Passenger)' },
    { role: 'staff', name: 'Officer Priya (Gate Staff)' },
    { role: 'admin', name: 'Ops Controller (Admin)' }
  ];
  const idx = roles.findIndex((r) => r.role === state.role);
  const next = roles[(idx + 1) % roles.length];
  state.role = next.role;
  state.userName = next.name;
  sessionStorage.setItem('role', next.role);
  sessionStorage.setItem('userName', next.name);
  AudioSFX.click();
  toast(`Switched Role: ${next.name}`);
  render();
}

/* ==========================================================================
   View 1: Live Airspace & Flight Radar Tracking
   ========================================================================== */
function renderTrackingView() {
  const container = h('div', { class: 'tracking-view-container' });

  // Map Column with Canvas Radar
  const mapWrapper = h('div', { class: 'radar-map-wrapper' },
    h('canvas', { id: 'tactical-radar-canvas' }),

    // Top Search HUD
    h('div', { class: 'map-hud-bar' },
      h('span', { class: 'hud-search-icon' }, '🔍'),
      h('input', {
        class: 'hud-search-input',
        type: 'search',
        placeholder: 'Search flight, route (DEL➔BOM)...',
        value: state.flightSearchTerm,
        oninput: (e) => {
          state.flightSearchTerm = e.target.value.toLowerCase();
          renderFlightCardsList();
        }
      }),
      h('button', {
        class: 'btn sm',
        onclick: () => {
          state.radarCenter = { lat: 21.0, lng: 78.5 };
          state.radarZoom = 1.0;
        }
      }, 'Reset View')),

    // Bottom Simulation Speed Controls
    h('div', { class: 'sim-speed-control' },
      h('span', { class: 'font-mono text-muted', style: 'font-size: 0.72rem; margin-right: 4px;' }, 'SIM SPEED:'),
      [
        { label: '⏸ Pause', val: 0 },
        { label: '1x Live', val: 1 },
        { label: '5x Fast', val: 5 },
        { label: '15x Warp', val: 15 }
      ].map((btn) =>
        h('button', {
          class: `sim-speed-btn ${state.simSpeed === btn.val ? 'active' : ''}`,
          onclick: () => {
            state.simSpeed = btn.val;
            AudioSFX.click();
            toast(`Simulation Speed: ${btn.label}`);
            render();
          }
        }, btn.label))));

  // Side Panel: Present Flights List
  const sidePanel = h('div', { class: 'flights-side-panel' });
  const panelHeader = h('div', { class: 'panel-header' },
    h('div', { class: 'panel-title-row' },
      h('h2', {}, '✈ Present Flights in Airspace'),
      h('span', { class: 'nav-badge' }, `${state.flights.length} Tracked`)),
    h('div', { class: 'filter-chip-group' },
      [
        { id: 'all', label: 'All Flights' },
        { id: 'airborne', label: '🟢 Cruising' },
        { id: 'climbing', label: '🟡 Climbing' },
        { id: 'descending', label: '🟣 Approaching' },
        { id: 'boarding', label: '🟠 At Gate' }
      ].map((f) =>
        h('button', {
          class: `filter-chip ${state.flightFilter === f.id ? 'active' : ''}`,
          onclick: () => {
            state.flightFilter = f.id;
            AudioSFX.click();
            renderFlightCardsList();
          }
        }, f.label))));

  const listScroll = h('div', { class: 'flights-list-scroll' });

  function renderFlightCardsList() {
    listScroll.replaceChildren();
    const term = state.flightSearchTerm.trim().toLowerCase();
    const filtered = state.flights.filter((f) => {
      const matchFilter = (state.flightFilter === 'all') || (f.status === state.flightFilter);
      const matchTerm = !term ||
        f.flightNo.toLowerCase().includes(term) ||
        f.source.toLowerCase().includes(term) ||
        f.destination.toLowerCase().includes(term) ||
        f.airline.toLowerCase().includes(term) ||
        f.model.toLowerCase().includes(term);
      return matchFilter && matchTerm;
    });

    if (!filtered.length) {
      listScroll.append(h('div', { class: 'card text-muted', style: 'padding: 24px; text-align: center;' },
        'No flights found matching criteria.'));
      return;
    }

    for (const f of filtered) {
      const orig = AIRPORTS[f.source];
      const dest = AIRPORTS[f.destination];
      const card = h('div', {
        class: `flight-card ${f.flightId === state.selectedFlightId ? 'active' : ''}`,
        'data-flight-id': String(f.flightId),
        onclick: () => {
          selectFlight(f.flightId);
          AudioSFX.click();
        }
      },
        h('div', { class: 'flight-card-head' },
          h('div', { class: 'airline-badge' },
            h('div', { class: 'airline-logo-box', style: `color: ${f.color}` }, f.airlineCode),
            h('div', {},
              h('div', { class: 'flight-num' }, f.flightNo),
              h('div', { class: 'aircraft-type' }, f.model))),
          h('span', { class: `status-pill ${f.status}` }, f.phase)),

        h('div', { class: 'route-row' },
          h('div', { class: 'airport-col' },
            h('span', { class: 'airport-code' }, f.source),
            h('span', { class: 'airport-city' }, orig?.city || f.source),
            h('span', { class: 'airport-time' }, fmtTimeShort(f.depTime))),
          h('div', { class: 'route-progress-wrap' },
            h('div', { class: 'route-progress-track' },
              h('div', { class: 'route-progress-bar', style: `width: ${Math.round(f.progress * 100)}%` },
                h('span', { class: 'plane-progress-indicator' }, '✈'))),
            h('span', { class: 'route-duration-text' }, `${Math.round(f.progress * 100)}% Completed`)),
          h('div', { class: 'airport-col dest' },
            h('span', { class: 'airport-code' }, f.destination),
            h('span', { class: 'airport-city' }, dest?.city || f.destination),
            h('span', { class: 'airport-time' }, fmtTimeShort(f.arrTime)))),

        h('div', { class: 'telemetry-mini-grid' },
          h('div', { class: 'telem-cell' },
            h('span', { class: 'telem-label' }, 'Altitude'),
            h('span', { class: 'telem-val live-alt-val text-cyan' }, `${f.altitude.toLocaleString()} ft`)),
          h('div', { class: 'telem-cell' },
            h('span', { class: 'telem-label' }, 'Speed'),
            h('span', { class: 'telem-val live-spd-val' }, `${f.speed} kts`)),
          h('div', { class: 'telem-cell' },
            h('span', { class: 'telem-label' }, 'Heading'),
            h('span', { class: 'telem-val' }, `${f.heading}°`))),

        h('div', { style: 'display: flex; gap: 8px; margin-top: 4px;' },
          h('button', {
            class: 'btn sm primary',
            style: 'flex: 1;',
            onclick: (e) => {
              e.stopPropagation();
              inspectFlightTelemetry(f.flightId);
            }
          }, '⚡ Cockpit Telemetry HUD')));

      listScroll.append(card);
    }
  }

  sidePanel.append(panelHeader, listScroll);
  container.append(mapWrapper, sidePanel);

  renderFlightCardsList();

  setTimeout(() => initTacticalRadarCanvas('tactical-radar-canvas'), 30);

  return container;
}

/* ==========================================================================
   View 2: Staff Boarding Gate Manifest & PNR Scanner
   ========================================================================== */
function renderManifestView() {
  const activeFlight = state.flights.find((f) => f.flightId === state.activeManifestFlightId) || state.flights[0];
  const orig = AIRPORTS[activeFlight.source];
  const dest = AIRPORTS[activeFlight.destination];

  const total = state.passengers.length;
  const count = (s) => state.passengers.filter((p) => p.BoardingStatus === s).length;
  const boarded = count('Boarded');
  const checkedIn = count('Checked In');
  const notChecked = count('Not Checked In');
  const noShow = count('No Show');
  const pct = total ? Math.round((boarded / total) * 100) : 0;

  const container = h('div', { class: 'content-container' });

  const gateBanner = h('div', { class: 'card gate-control-card' },
    h('div', { style: 'display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;' },
      h('div', {},
        h('div', { style: 'display: flex; align-items: center; gap: 10px;' },
          h('h2', { class: 'font-brand', style: 'font-size: 1.6rem; font-weight: 800;' },
            `${activeFlight.flightNo} · Gate ${activeFlight.gate}`),
          h('span', { class: `status-pill ${activeFlight.status}` }, activeFlight.phase)),
        h('p', { class: 'text-muted font-mono' },
          `${orig.name} (${activeFlight.source}) ➔ ${dest.name} (${activeFlight.destination}) · Departure ${fmtTimeShort(activeFlight.depTime)}`)),
      h('div', { style: 'display: flex; gap: 10px; align-items: center;' },
        h('select', {
          class: 'input-field',
          style: 'width: auto; min-width: 180px;',
          onchange: (e) => {
            state.activeManifestFlightId = Number(e.target.value);
            render();
          }
        },
          state.flights.map((fl) =>
            h('option', { value: fl.flightId, selected: fl.flightId === activeFlight.flightId },
              `${fl.flightNo} · ${fl.source}➔${fl.destination} (Gate ${fl.gate})`))),
        h('button', {
          class: 'btn primary',
          onclick: () => {
            state.selectedFlightId = activeFlight.flightId;
            state.currentTab = 'tracking';
            render();
          }
        }, '📡 Track in Live Airspace'))),

    h('div', { class: 'gate-stats-grid' },
      h('div', { class: 'gate-stat-box' },
        h('span', { class: 'text-muted' }, 'Total Booked'),
        h('span', { class: 'gate-stat-num text-cyan' }, String(total))),
      h('div', { class: 'gate-stat-box' },
        h('span', { class: 'text-muted' }, 'Boarded'),
        h('span', { class: 'gate-stat-num text-green' }, String(boarded))),
      h('div', { class: 'gate-stat-box' },
        h('span', { class: 'text-muted' }, 'Checked In'),
        h('span', { class: 'gate-stat-num' }, String(checkedIn))),
      h('div', { class: 'gate-stat-box' },
        h('span', { class: 'text-muted' }, 'Not Checked In'),
        h('span', { class: 'gate-stat-num text-muted' }, String(notChecked))),
      h('div', { class: 'gate-stat-box' },
        h('span', { class: 'text-muted' }, 'No Show'),
        h('span', { class: 'gate-stat-num text-red' }, String(noShow)))),

    h('div', { style: 'margin-top: 18px;' },
      h('div', { style: 'display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 6px;' },
        h('span', {}, `Boarding Completion: ${pct}%`),
        h('span', { class: 'text-muted' }, `${boarded} of ${total} passengers onboard`)),
      h('div', { class: 'route-progress-track', style: 'height: 8px;' },
        h('div', { class: 'route-progress-bar', style: `width: ${pct}%` }))));

  const pnrInput = h('input', {
    class: 'scanner-input',
    maxlength: '6',
    placeholder: 'SCAN / ENTER PNR (E.G. 7KJ89X)',
    autocomplete: 'off',
    autofocus: true
  });

  const scannerBox = h('div', { class: 'scanner-box' },
    h('h3', { class: 'font-brand', style: 'font-size: 1.1rem; margin-bottom: 8px;' }, '⚡ Fast Gate Boarding Scanner'),
    h('p', { class: 'text-muted', style: 'font-size: 0.85rem; margin-bottom: 12px;' },
      'Scan passenger boarding pass barcode or type 6-character PNR to instantly mark boarded.'),
    h('form', {
      style: 'display: flex; gap: 10px;',
      onsubmit: (e) => {
        e.preventDefault();
        const code = pnrInput.value.trim().toUpperCase();
        if (!code) return;
        const pass = state.passengers.find((p) => p.PNR.toUpperCase() === code);
        if (pass) {
          pass.BoardingStatus = 'Boarded';
          pass.BoardedAt = new Date().toISOString();
          AudioSFX.scanOk();
          toast(`✔ ${pass.Name} boarded successfully · Seat ${pass.SeatNo}`);
          pnrInput.value = '';
          renderManifestTable();
        } else {
          AudioSFX.error();
          toast(`PNR "${code}" not found on manifest`, 'err');
          pnrInput.select();
        }
      }
    },
      pnrInput,
      h('button', { class: 'btn primary', type: 'submit' }, 'Board Passenger')),
    h('div', { style: 'display: flex; gap: 8px; margin-top: 10px; align-items: center;' },
      h('span', { class: 'text-muted', style: 'font-size: 0.75rem;' }, 'Quick Test PNRs:'),
      state.passengers.slice(0, 4).map((p) =>
        h('button', {
          class: 'btn sm',
          type: 'button',
          onclick: () => {
            pnrInput.value = p.PNR;
            pnrInput.focus();
          }
        }, `${p.PNR} (${p.Name.split(' ')[0]})`))));

  const tableCard = h('div', { class: 'manifest-table-card' });
  const filterChips = h('div', { class: 'filter-chip-group', style: 'margin-bottom: 14px;' },
    ['all', 'Not Checked In', 'Checked In', 'Boarded', 'No Show'].map((fl) =>
      h('button', {
        class: `filter-chip ${state.manifestFilter === fl ? 'active' : ''}`,
        onclick: () => {
          state.manifestFilter = fl;
          AudioSFX.click();
          renderManifestTable();
        }
      }, fl === 'all' ? 'All Passengers' : fl)));

  const searchInput = h('input', {
    class: 'input-field',
    placeholder: 'Search name, seat, or PNR...',
    value: state.manifestSearch,
    oninput: (e) => {
      state.manifestSearch = e.target.value.toLowerCase();
      renderManifestTable();
    }
  });

  const tableBody = h('tbody');

  function renderManifestTable() {
    tableBody.replaceChildren();
    const term = state.manifestSearch.trim().toLowerCase();
    const rows = state.passengers.filter((p) => {
      const matchFilter = state.manifestFilter === 'all' || p.BoardingStatus === state.manifestFilter;
      const matchTerm = !term || `${p.Name} ${p.PNR} ${p.SeatNo}`.toLowerCase().includes(term);
      return matchFilter && matchTerm;
    });

    if (!rows.length) {
      tableBody.append(h('tr', {},
        h('td', { colspan: '7', style: 'text-align: center; padding: 24px;', class: 'text-muted' },
          'No passengers found matching filter.')));
      return;
    }

    for (const p of rows) {
      const tr = h('tr', {},
        h('td', { class: 'seat-cell' }, p.SeatNo),
        h('td', {},
          h('div', { style: 'font-weight: 600;' }, p.Name),
          h('span', { class: 'text-muted', style: 'font-size: 0.75rem;' }, `Zone ${p.Zone}`)),
        h('td', { class: 'pnr-cell text-cyan' }, p.PNR),
        h('td', {}, p.ClassType),
        h('td', {},
          h('span', {
            class: `status-pill ${p.BoardingStatus === 'Boarded' ? 'airborne' : (p.BoardingStatus === 'Checked In' ? 'climbing' : (p.BoardingStatus === 'No Show' ? 'landed' : 'boarding'))}`
          }, p.BoardingStatus),
          p.BoardedAt ? h('div', { class: 'text-muted font-mono', style: 'font-size: 0.72rem;' }, fmtTime(p.BoardedAt)) : null),
        h('td', { style: 'display: flex; gap: 6px;' },
          p.BoardingStatus !== 'Boarded' ? h('button', {
            class: 'btn sm primary',
            onclick: () => {
              p.BoardingStatus = 'Boarded';
              p.BoardedAt = new Date().toISOString();
              AudioSFX.scanOk();
              toast(`✔ Boarded ${p.Name}`);
              render();
            }
          }, 'Board') : null,
          p.BoardingStatus === 'Not Checked In' ? h('button', {
            class: 'btn sm',
            onclick: () => {
              p.BoardingStatus = 'Checked In';
              AudioSFX.click();
              toast(`Checked in ${p.Name}`);
              render();
            }
          }, 'Check In') : null,
          p.BoardingStatus === 'Boarded' ? h('button', {
            class: 'btn sm',
            onclick: () => {
              p.BoardingStatus = 'Checked In';
              p.BoardedAt = null;
              AudioSFX.click();
              toast(`Reverted boarding for ${p.Name}`);
              render();
            }
          }, 'Undo') : null,
          p.BoardingStatus !== 'No Show' ? h('button', {
            class: 'btn sm',
            onclick: () => {
              p.BoardingStatus = 'No Show';
              AudioSFX.click();
              toast(`Marked ${p.Name} as No Show`);
              render();
            }
          }, 'No Show') : null));
      tableBody.append(tr);
    }
  }

  tableCard.append(
    h('div', { style: 'display: flex; justify-content: space-between; gap: 12px; margin-bottom: 12px; flex-wrap: wrap;' },
      filterChips, searchInput),
    h('div', { class: 'table-responsive' },
      h('table', { class: 'modern-table' },
        h('thead', {},
          h('tr', {},
            ['Seat', 'Passenger', 'PNR', 'Class', 'Status', 'Actions'].map((th) => h('th', {}, th)))),
        tableBody)));

  renderManifestTable();
  container.append(gateBanner, scannerBox, tableCard);
  return container;
}

/* ==========================================================================
   View 3: Passenger Digital Boarding Pass & Live Flight Tracking
   ========================================================================== */
function renderTripsView() {
  const flight = state.flights.find((f) => f.flightNo === 'AI-102') || state.flights[0];
  const orig = AIRPORTS[flight.source];
  const dest = AIRPORTS[flight.destination];

  const container = h('div', { class: 'content-container' });

  const pass = h('div', { class: 'boarding-pass-card' },
    h('div', { class: 'boarding-pass-header' },
      h('div', {},
        h('div', { style: 'font-weight: 800; font-size: 1.2rem; font-family: var(--font-brand);' }, flight.airline),
        h('div', { class: 'font-mono text-cyan', style: 'font-size: 0.85rem;' }, `${flight.flightNo} · Electronic Boarding Pass`)),
      h('span', { class: 'status-pill airborne' }, flight.status === 'airborne' ? '🟢 EN ROUTE' : flight.phase)),

    h('div', { class: 'boarding-pass-body' },
      h('div', { class: 'route-row' },
        h('div', { class: 'airport-col' },
          h('span', { class: 'airport-code text-cyan' }, flight.source),
          h('span', { class: 'airport-city' }, orig.city),
          h('span', { class: 'airport-time font-mono' }, fmtTimeShort(flight.depTime))),
        h('div', { class: 'route-progress-wrap' },
          h('div', { class: 'route-progress-track' },
            h('div', { class: 'route-progress-bar', style: `width: ${Math.round(flight.progress * 100)}%` },
              h('span', { class: 'plane-progress-indicator' }, '✈'))),
          h('span', { class: 'route-duration-text font-mono' }, `${Math.round(flight.progress * 100)}% Journey Completed`)),
        h('div', { class: 'airport-col dest' },
          h('span', { class: 'airport-code text-cyan' }, flight.destination),
          h('span', { class: 'airport-city' }, dest.city),
          h('span', { class: 'airport-time font-mono' }, fmtTimeShort(flight.arrTime)))),

      h('div', { style: 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 10px;' },
        h('div', { class: 'telem-cell' },
          h('span', { class: 'telem-label' }, 'Passenger'),
          h('span', { class: 'telem-val' }, 'Rahul Sharma')),
        h('div', { class: 'telem-cell' },
          h('span', { class: 'telem-label' }, 'Seat'),
          h('span', { class: 'telem-val text-cyan' }, '12A')),
        h('div', { class: 'telem-cell' },
          h('span', { class: 'telem-label' }, 'Gate'),
          h('span', { class: 'telem-val' }, flight.gate)),
        h('div', { class: 'telem-cell' },
          h('span', { class: 'telem-label' }, 'Group'),
          h('span', { class: 'telem-val' }, 'Zone 2')))),

    h('div', { class: 'pass-notch-row' },
      h('div', { class: 'pass-dashed-line' })),

    h('div', { class: 'boarding-pass-body' },
      h('div', { style: 'display: flex; justify-content: space-between; align-items: center;' },
        h('div', {},
          h('span', { class: 'text-muted font-mono', style: 'font-size: 0.75rem;' }, 'BOOKING REFERENCE (PNR)'),
          h('div', { class: 'font-mono text-cyan', style: 'font-size: 1.4rem; font-weight: 700; letter-spacing: 0.1em;' }, state.userPNR)),
        h('div', { style: 'text-align: right;' },
          h('span', { class: 'text-muted font-mono', style: 'font-size: 0.75rem;' }, 'CURRENT ALTITUDE'),
          h('div', { class: 'font-mono', style: 'font-size: 1.1rem; font-weight: 600;' }, `${flight.altitude.toLocaleString()} FT`))),

      h('div', { class: 'barcode-strip' }),

      h('div', { style: 'display: flex; gap: 10px; margin-top: 10px;' },
        h('button', {
          class: 'btn primary',
          style: 'flex: 1;',
          onclick: () => {
            state.selectedFlightId = flight.flightId;
            state.currentTab = 'tracking';
            render();
          }
        }, '📡 Track Flight Live on Radar'),
        h('button', {
          class: 'btn',
          onclick: () => inspectFlightTelemetry(flight.flightId)
        }, '⚡ Avionics HUD'))));

  container.append(pass);
  return container;
}

/* ==========================================================================
   View 4: Route Finder & Flight Search
   ========================================================================== */
function renderSearchView() {
  const container = h('div', { class: 'content-container' });

  const searchCard = h('div', { class: 'card', style: 'padding: 24px;' },
    h('h2', { class: 'font-brand', style: 'font-size: 1.5rem; margin-bottom: 16px;' }, '🔍 Search Global Flights & Routes'),
    h('div', { style: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 16px;' },
      h('div', {},
        h('label', { class: 'text-muted', style: 'font-size: 0.8rem; display: block; margin-bottom: 4px;' }, 'Origin Airport'),
        h('select', { id: 'search-origin', class: 'input-field' },
          Object.values(AIRPORTS).map((a) => h('option', { value: a.code }, `${a.city} (${a.code})`)))),
      h('div', {},
        h('label', { class: 'text-muted', style: 'font-size: 0.8rem; display: block; margin-bottom: 4px;' }, 'Destination Airport'),
        h('select', { id: 'search-dest', class: 'input-field' },
          Object.values(AIRPORTS).map((a, i) => h('option', { value: a.code, selected: i === 1 }, `${a.city} (${a.code})`)))),
      h('div', {},
        h('label', { class: 'text-muted', style: 'font-size: 0.8rem; display: block; margin-bottom: 4px;' }, 'Flight Date'),
        h('input', { type: 'date', class: 'input-field', value: new Date().toISOString().slice(0, 10) }))),
    h('button', {
      class: 'btn primary',
      onclick: () => {
        const from = document.getElementById('search-origin').value;
        const to = document.getElementById('search-dest').value;
        if (from === to) return toast('Origin and Destination must differ', 'err');
        state.flightSearchTerm = `${from}➔${to}`;
        state.currentTab = 'tracking';
        render();
        toast(`Filtering live flights from ${from} to ${to}`);
      }
    }, 'Search Active Routes'));

  container.append(searchCard);
  return container;
}

/* ==========================================================================
   Master Render & Router
   ========================================================================== */
function render() {
  const app = document.getElementById('app');
  if (!app) return;

  app.replaceChildren();
  app.append(renderHeader());

  const viewport = h('main', { class: 'main-viewport' });

  if (state.currentTab === 'tracking') {
    viewport.append(renderTrackingView());
  } else if (state.currentTab === 'manifest') {
    viewport.append(renderManifestView());
  } else if (state.currentTab === 'trips') {
    viewport.append(renderTripsView());
  } else if (state.currentTab === 'search') {
    viewport.append(renderSearchView());
  }

  app.append(viewport);
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.className = `theme-${state.theme}`;
  startSimulation();
  render();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  document.body.className = `theme-${state.theme}`;
  startSimulation();
  render();
}
