import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Box from '@mui/material/Box';

/**
 * GlobeD3 컴포넌트
 *
 * d3-geo 정사영(orthographic) 기반 SVG 지구본. 천천히 자동 회전하며,
 * 드래그로 직접 돌릴 수 있다. 각 마커는 자연에서 비롯된 대표 색으로 칠해지고,
 * 마커에 hover하면 해당 색상 칩이 표시된다. (3D 의존성 없이 d3-geo만 사용)
 *
 * Props:
 * @param {object[]} countries     - 마커 데이터 배열 (id, name, note, color, lat, lng) [Optional, 기본값: COUNTRIES]
 * @param {number}   size          - 렌더링 크기(px), 정사각형 [Optional, 기본값: 480]
 * @param {function} onHoverCountry - 마커 hover 시 호출 (country 객체 전달, leave 시 null) [Optional]
 *
 * Example usage:
 * <GlobeD3 size={480} onHoverCountry={(c) => setBg(c)} />
 */

const COUNTRIES = [
  { id: 'jp', name: 'Japan', note: 'Cherry blossom', color: '#F4B8C8', lat: 36, lng: 138 },
  { id: 'is', name: 'Iceland', note: 'Glacial blue', color: '#A6D3E0', lat: 65, lng: -18 },
  { id: 'eg', name: 'Egypt', note: 'Desert sand', color: '#E2C290', lat: 26, lng: 30 },
  { id: 'br', name: 'Brazil', note: 'Rainforest', color: '#2F8F5B', lat: -10, lng: -52 },
  { id: 'ma', name: 'Morocco', note: 'Atlas clay', color: '#C96B45', lat: 31, lng: -7 },
  { id: 'gr', name: 'Greece', note: 'Aegean', color: '#2E79C9', lat: 39, lng: 22 },
  { id: 'ke', name: 'Kenya', note: 'Savanna', color: '#D9A441', lat: 0, lng: 38 },
  { id: 'no', name: 'Norway', note: 'Fjord', color: '#3E6E80', lat: 62, lng: 9 },
  { id: 'in', name: 'India', note: 'Marigold', color: '#F2A00C', lat: 22, lng: 79 },
  { id: 'au', name: 'Australia', note: 'Red centre', color: '#C0492F', lat: -25, lng: 133 },
  { id: 'ca', name: 'Canada', note: 'Autumn maple', color: '#C0392B', lat: 56, lng: -106 },
  { id: 'th', name: 'Thailand', note: 'Jade', color: '#1FA37A', lat: 15, lng: 101 },
  { id: 'pe', name: 'Peru', note: 'Andean ochre', color: '#C77B2B', lat: -10, lng: -76 },
  { id: 'it', name: 'Italy', note: 'Tuscan olive', color: '#8A9A4E', lat: 42, lng: 13 },
  { id: 'ch', name: 'Switzerland', note: 'Alpine ice', color: '#CFE0E8', lat: 47, lng: 8 },
  { id: 'za', name: 'South Africa', note: 'Canyon green', color: '#5A8040', lat: -29, lng: 24 },
  { id: 'id', name: 'Indonesia', note: 'Volcanic teal', color: '#15897A', lat: -2, lng: 118 },
  { id: 'mx', name: 'Mexico', note: 'Agave', color: '#6FA07A', lat: 23, lng: -102 },
  { id: 'cn', name: 'China', note: 'Loess earth', color: '#D6B05E', lat: 35, lng: 103 },
  { id: 'nz', name: 'New Zealand', note: 'Fern', color: '#2F7B43', lat: -42, lng: 172 },
  { id: 'us', name: 'United States', note: 'Canyon', color: '#CE6B3E', lat: 39, lng: -98 },
  { id: 'es', name: 'Spain', note: 'Saffron', color: '#D79A22', lat: 40, lng: -4 },
  { id: 'fr', name: 'France', note: 'Lavender', color: '#9A86C4', lat: 47, lng: 2 },
  { id: 'fi', name: 'Finland', note: 'Aurora', color: '#4FC79A', lat: 64, lng: 26 },
  { id: 'cl', name: 'Chile', note: 'Atacama copper', color: '#B5651D', lat: -30, lng: -71 },
  { id: 'mg', name: 'Madagascar', note: 'Baobab', color: '#A0522D', lat: -19, lng: 47 },
  { id: 'vn', name: 'Vietnam', note: 'Rice paddy', color: '#7DAA52', lat: 16, lng: 106 },
  { id: 'tr', name: 'Türkiye', note: 'Turquoise', color: '#19A0A0', lat: 39, lng: 35 },
  { id: 'ar', name: 'Argentina', note: 'Pampas wheat', color: '#D2B877', lat: -34, lng: -64 },
  { id: 'tz', name: 'Tanzania', note: 'Serengeti', color: '#CB9A4E', lat: -6, lng: 35 },
  { id: 'np', name: 'Nepal', note: 'Himalaya snow', color: '#BFD7E0', lat: 28, lng: 84 },
  { id: 'pt', name: 'Portugal', note: 'Azulejo', color: '#2E6FB0', lat: 39, lng: -8 },
  { id: 'ie', name: 'Ireland', note: 'Emerald', color: '#2E8B57', lat: 53, lng: -8 },
  { id: 'mn', name: 'Mongolia', note: 'Steppe', color: '#C4A35A', lat: 46, lng: 105 },
  { id: 'co', name: 'Colombia', note: 'Coffee & emerald', color: '#4E7D3A', lat: 4, lng: -73 },
  { id: 'ph', name: 'Philippines', note: 'Coral sea', color: '#1E8299', lat: 13, lng: 122 },
  { id: 'gb', name: 'United Kingdom', note: 'Scottish Highlands', color: '#7A9E7E', lat: 54, lng: -2 },
  { id: 'de', name: 'Germany', note: 'Black Forest', color: '#5C7A4E', lat: 51, lng: 10 },
  { id: 'kr', name: 'South Korea', note: 'Autumn maple', color: '#C4825A', lat: 36, lng: 128 },
  { id: 'my', name: 'Malaysia', note: 'Jungle green', color: '#2D7A3A', lat: 4, lng: 109 },
  { id: 'se', name: 'Sweden', note: 'Nordic forest', color: '#A8C5D0', lat: 62, lng: 16 },
  { id: 'at', name: 'Austria', note: 'Alpine meadow', color: '#A8C5DA', lat: 47, lng: 14 },
  { id: 'hr', name: 'Croatia', note: 'Adriatic coast', color: '#3A8FA8', lat: 45, lng: 16 },
  { id: 'et', name: 'Ethiopia', note: 'Danakil earth', color: '#C4813B', lat: 9, lng: 40 },
  { id: 'na', name: 'Namibia', note: 'Namib sand', color: '#D4A86A', lat: -22, lng: 18 },
  { id: 'ae', name: 'UAE', note: 'Desert dunes', color: '#D4B483', lat: 24, lng: 54 },
  { id: 'ir', name: 'Iran', note: 'Persian clay', color: '#C07840', lat: 32, lng: 53 },
  { id: 'kz', name: 'Kazakhstan', note: 'Golden steppe', color: '#C4B06A', lat: 48, lng: 68 },
  { id: 've', name: 'Venezuela', note: 'Angel Falls', color: '#3A9E6A', lat: 8, lng: -66 },
  { id: 'ec', name: 'Ecuador', note: 'Andean green', color: '#4A9E7A', lat: -2, lng: -78 },
  { id: 'cr', name: 'Costa Rica', note: 'Volcanic forest', color: '#3A8C4A', lat: 10, lng: -84 },
  { id: 'cu', name: 'Cuba', note: 'Tropical valley', color: '#4AAF7C', lat: 22, lng: -79 },
  { id: 'ug', name: 'Uganda', note: 'Gorilla highlands', color: '#4A8C4A', lat: 1, lng: 32 },
  { id: 'gh', name: 'Ghana', note: 'West African coast', color: '#C4824A', lat: 8, lng: -1 },
  { id: 'ru', name: 'Russia', note: 'Taiga & Baikal', color: '#8B9E7A', lat: 61, lng: 105 },
  { id: 'sa', name: 'Saudi Arabia', note: 'AlUla desert', color: '#C9A87A', lat: 24, lng: 45 },
];

const W = 760;
const CX = W / 2;
const CY = W / 2;
const R = 300;


/** 경도를 -180~180 범위로 정규화 */
function normLng(d) {
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

function GlobeD3({ countries = COUNTRIES, size = 480, onHoverCountry }) {
  const rotation = useRef([0, -12]); // [lambda, phi]
  const target = useRef(null);       // [lambda, phi] | null
  const dragging = useRef(false);
  const last = useRef([0, 0]);
  const hoverId = useRef(null);
  const reducedMotion = useRef(false);
  const [view, setView] = useState([0, -12]); // 렌더에 반영되는 회전값 [lambda, phi]
  const [grabbing, setGrabbing] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    let raf;
    let prev = performance.now();
    const loop = (t) => {
      const dt = Math.min(t - prev, 48);
      prev = t;
      if (target.current) {
        const [tl, tp] = target.current;
        let [l, p] = rotation.current;
        const dl = normLng(tl - l);
        l += dl * 0.12;
        p += (tp - p) * 0.12;
        rotation.current = [l, p];
        if (Math.abs(dl) < 0.3 && Math.abs(tp - p) < 0.3) {
          rotation.current = [tl, tp];
          target.current = null;
        }
      } else if (!dragging.current && hoverId.current == null && !reducedMotion.current) {
        rotation.current = [rotation.current[0] + dt * 0.004, rotation.current[1]];
      }
      setView(rotation.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const projection = d3
    .geoOrthographic()
    .scale(R)
    .translate([CX, CY])
    .rotate(view)
    .clipAngle(90);
  const path = d3.geoPath(projection);
  const center = [-view[0], -view[1]];

  const placed = countries.map((c) => {
    const xy = projection([c.lng, c.lat]);
    const dist = d3.geoDistance([c.lng, c.lat], center);
    return { ...c, x: xy ? xy[0] : null, y: xy ? xy[1] : null, visible: dist < Math.PI / 2 - 0.02 };
  });

  // pointer drag
  const onDown = (e) => {
    dragging.current = true;
    setGrabbing(true);
    target.current = null;
    last.current = [e.clientX, e.clientY];
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current[0];
    const dy = e.clientY - last.current[1];
    last.current = [e.clientX, e.clientY];
    let [l, p] = rotation.current;
    l += dx * 0.32;
    p = Math.max(-82, Math.min(82, p - dy * 0.32));
    rotation.current = [l, p];
  };
  const onUp = () => { dragging.current = false; setGrabbing(false); };

  const enter = (c) => { hoverId.current = c.id; setHovered(c.id); onHoverCountry?.(c); };
  const leave = () => { hoverId.current = null; setHovered(null); onHoverCountry?.(null); };


  return (
    <Box sx={{ width: size, maxWidth: '100%', mx: 'auto' }}>
      <svg
        viewBox={`0 0 ${W} ${W}`}
        style={{ width: '100%', height: 'auto', cursor: grabbing ? 'grabbing' : 'grab', touchAction: 'none' }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        {/* sphere — 솔리드 면 */}
        <circle cx={CX} cy={CY} r={R} fill="#141414" />

        {/* graticule + 외곽 — 선 */}
        <path d={path(d3.geoGraticule10())} fill="none" stroke="#3a3a3a" strokeWidth={0.6} />
        <path d={path({ type: 'Sphere' })} fill="none" stroke="#e8e8e8" strokeWidth={0.6} />

        {/* markers — 선 + 솔리드 면 */}
        {placed.filter((c) => c.visible).map((c) => {
          const isHov = c.id === hovered;
          return (
            <g key={c.id}>
              {isHov && (
                <circle cx={c.x} cy={c.y} r={12} fill="none" stroke="#FFFFFF" strokeWidth={1.4} />
              )}
              <circle cx={c.x} cy={c.y} r={isHov ? 6.2 : 4.6} fill={isHov ? '#FFFFFF' : '#E8E8E8'} stroke="#000000" strokeWidth={0.8} />
              {/* generous transparent hit area */}
              <circle
                cx={c.x} cy={c.y} r={15} fill="transparent" style={{ cursor: 'pointer' }}
                onPointerEnter={() => enter(c)} onPointerLeave={leave}
              />
            </g>
          );
        })}

      </svg>
    </Box>
  );
}

export default GlobeD3;
