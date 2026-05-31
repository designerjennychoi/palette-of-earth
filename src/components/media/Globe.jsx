/**
 * Globe 컴포넌트
 *
 * Three.js 기반 인터랙티브 지구본. 지역 핀 hover/click 인터랙션,
 * 자동 회전, 모바일 SVG fallback 포함.
 *
 * Props:
 * @param {object[]} regions    - regions.js 데이터 배열 [Required]
 * @param {string}   activeId   - 현재 활성 지역 id [Optional]
 * @param {function} onRegionClick - 지역 클릭 시 호출 (region.id 전달) [Optional]
 * @param {number}   size       - Canvas 크기(px), 기본값: 480 [Optional]
 *
 * Example usage:
 * <Globe regions={regions} onRegionClick={(id) => scrollTo(id)} />
 */

import { useRef, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** 위도·경도 → 구체 표면 3D 좌표 */
function latLngToVec3(lat, lng, r = 1.02) {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
     (r * Math.cos(phi)),
     (r * Math.sin(phi) * Math.sin(theta))
  );
}

// ─── 구체 본체 ────────────────────────────────────────────────
function GlobeMesh({ activeColor }) {
  const meshRef  = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      {/* 메인 구체 — 어두운 표면 */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#1A1917"
          roughness={0.85}
          metalness={0.1}
          emissive={activeColor ? new THREE.Color(activeColor) : new THREE.Color('#000000')}
          emissiveIntensity={activeColor ? 0.06 : 0}
        />
      </Sphere>

      {/* 와이어프레임 격자 — 매우 서브틀 */}
      <Sphere args={[1.001, 24, 16]}>
        <meshBasicMaterial
          color="#2E2C28"
          wireframe
          transparent
          opacity={0.25}
        />
      </Sphere>
    </group>
  );
}

// ─── 지역 핀 ─────────────────────────────────────────────────
function RegionPin({ region, isActive, isHovered, onClick, onHover }) {
  const pos      = latLngToVec3(region.coords.lat, region.coords.lng);
  const pinColor = region.palette[2] || '#F0EBE3';
  const scale    = isActive || isHovered ? 1.8 : 1;

  return (
    <group position={pos}>
      {/* 핀 구체 */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(region.id); }}
        onPointerEnter={(e) => { e.stopPropagation(); onHover(region.id); document.body.style.cursor = 'pointer'; }}
        onPointerLeave={(e) => { e.stopPropagation(); onHover(null); document.body.style.cursor = 'default'; }}
        scale={[scale, scale, scale]}
      >
        <sphereGeometry args={[0.032, 12, 12]} />
        <meshStandardMaterial
          color={pinColor}
          emissive={new THREE.Color(pinColor)}
          emissiveIntensity={isActive || isHovered ? 0.8 : 0.3}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* 활성/호버 시 지역명 라벨 */}
      {(isActive || isHovered) && (
        <Html distanceFactor={3} center>
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              bgcolor: 'rgba(26,25,23,0.9)',
              border: '1px solid #2E2C28',
              borderRadius: '4px',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.6875rem',
                color: '#F0EBE3',
                letterSpacing: '0.06em',
              }}
            >
              {region.nameEn}
            </Typography>
          </Box>
        </Html>
      )}
    </group>
  );
}

// ─── 조명 ─────────────────────────────────────────────────────
function GlobeLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} color="#F0EBE3" />
      <directionalLight position={[-3, -1, -2]} intensity={0.2} color="#3B5E6E" />
    </>
  );
}

// ─── 카메라 셋업 ──────────────────────────────────────────────
function CameraSetup() {
  const { camera } = useThree();
  camera.position.set(0, 0, 2.6);
  return null;
}

// ─── 3D 씬 내부 ───────────────────────────────────────────────
function GlobeScene({ regions, activeId, onRegionClick }) {
  const [hoveredId, setHoveredId] = useState(null);

  const activeRegion  = regions.find((r) => r.id === activeId);
  const activeColor   = activeRegion?.palette[2] || null;

  const handleClick = useCallback((id) => {
    onRegionClick?.(id);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [onRegionClick]);

  return (
    <>
      <CameraSetup />
      <GlobeLights />
      <GlobeMesh activeColor={activeColor} />
      {regions.map((region) => (
        <RegionPin
          key={region.id}
          region={region}
          isActive={region.id === activeId}
          isHovered={region.id === hoveredId}
          onClick={handleClick}
          onHover={setHoveredId}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        autoRotate={false}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
      />
    </>
  );
}

// ─── 모바일 SVG 폴백 ─────────────────────────────────────────
function GlobeFallback({ regions, activeId, onRegionClick }) {
  const cx = 100;
  const cy = 100;
  const r  = 88;

  const pinPos = (lat, lng) => ({
    x: cx + (lng / 180) * r * Math.cos((lat * Math.PI) / 180),
    y: cy - (lat / 90) * r,
  });

  return (
    <Box sx={{ width: '100%', maxWidth: 320, mx: 'auto' }}>
      <svg viewBox="0 0 200 200" style={{ width: '100%', height: 'auto' }}>
        <circle cx={cx} cy={cy} r={r} fill="#1A1917" stroke="#2E2C28" strokeWidth="0.8" />
        {[-120, -60, 0, 60, 120].map((lng) => {
          const x = cx + (lng / 180) * r;
          return <line key={lng} x1={x} y1={cy - r} x2={x} y2={cy + r} stroke="#2E2C28" strokeWidth="0.4" />;
        })}
        {[-45, 0, 45].map((lat) => {
          const y   = cy - (lat / 90) * r;
          const rr  = r * Math.cos((lat * Math.PI) / 180);
          return <ellipse key={lat} cx={cx} cy={y} rx={rr} ry={rr * 0.15} fill="none" stroke="#2E2C28" strokeWidth="0.4" />;
        })}
        {regions.map((region) => {
          const { x, y }  = pinPos(region.coords.lat, region.coords.lng);
          const isActive  = region.id === activeId;
          const pinColor  = region.palette[2] || '#F0EBE3';
          return (
            <g
              key={region.id}
              onClick={() => {
                onRegionClick?.(region.id);
                document.getElementById(region.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ cursor: 'pointer' }}
            >
              {isActive && <circle cx={x} cy={y} r={8} fill={pinColor} opacity="0.2" />}
              <circle cx={x} cy={y} r={isActive ? 5 : 3.5} fill={pinColor} opacity={isActive ? 1 : 0.7} />
              <text x={x + 7} y={y + 3} fontSize="6" fill="#8A8278" fontFamily="DM Sans, sans-serif">
                {region.nameEn}
              </text>
            </g>
          );
        })}
      </svg>
    </Box>
  );
}

// ─── Globe (루트) ─────────────────────────────────────────────
function Globe({ regions = [], activeId, onRegionClick, size = 480 }) {
  return (
    <>
      {/* 데스크톱: Three.js Canvas */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, width: size, height: size }}>
        <Canvas
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <GlobeScene
              regions={regions}
              activeId={activeId}
              onRegionClick={onRegionClick}
            />
          </Suspense>
        </Canvas>
      </Box>

      {/* 모바일: SVG 폴백 */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, width: '100%' }}>
        <GlobeFallback
          regions={regions}
          activeId={activeId}
          onRegionClick={onRegionClick}
        />
      </Box>
    </>
  );
}

export default Globe;
