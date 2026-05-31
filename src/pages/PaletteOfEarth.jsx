import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import paletteOfEarthTheme from '../styles/themes/palette-of-earth.js';
import regions from '../data/regions.js';

/** hex → [h, s, l] */
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

/** [h, s, l] → hex */
function hslToHex(h, s, l) {
  const ll = l / 100;
  const a = (s * Math.min(ll, 1 - ll)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const c = ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/** 단일 hex에서 4단계 자연 팔레트 생성 (밝은→원색→어두운→깊은) */
function buildPalette(hex) {
  try {
    const [h, s, l] = hexToHsl(hex);
    return [
      hslToHex(h, Math.min(s * 0.55, 100), Math.min(l + 28, 88)),
      hslToHex(h, Math.min(s * 0.80, 100), Math.min(l + 12, 78)),
      hex,
      hslToHex(h, Math.min(s * 1.05, 100), Math.max(l - 22, 8)),
    ];
  } catch {
    return [hex, hex, hex, hex];
  }
}
import GlobeD3 from '../components/media/GlobeD3.jsx';

/**
 * 글로브 국가 id → 보유 자연 사진(layer1) 매핑.
 * regions.js에서 이름으로 끌어와 동기화 유지. 매핑 없는 국가는 대표색 워시로 폴백.
 */
const regionByName = Object.fromEntries(regions.map((r) => [r.nameEn, r]));
const COUNTRY_IMAGE = {
  // regions.js 보유 사진 (2장 블렌드 중 layer1 사용)
  no: regionByName['Norway']?.images.layer1,
  ma: regionByName['Morocco']?.images.layer1,
  nz: regionByName['New Zealand']?.images.layer1,
  is: regionByName['Iceland']?.images.layer1,
  // Unsplash 자연 사진 (36개국 전체)
  jp: '/images/regions/jp-nature.jpg',
  eg: '/images/regions/eg-nature.jpg',
  br: '/images/regions/br-nature.jpg',
  gr: '/images/regions/gr-nature.jpg',
  ke: '/images/regions/ke-nature.jpg',
  in: '/images/regions/in-nature.jpg',
  au: '/images/regions/au-nature.jpg',
  ca: '/images/regions/ca-nature.jpg',
  th: '/images/regions/th-nature.jpg',
  pe: '/images/regions/pe-nature.jpg',
  it: '/images/regions/it-nature.jpg',
  ch: '/images/regions/ch-nature.jpg',
  za: '/images/regions/za-nature.jpg',
  id: '/images/regions/id-nature.jpg',
  mx: '/images/regions/mx-nature.jpg',
  cn: '/images/regions/cn-nature.jpg',
  us: '/images/regions/us-nature.jpg',
  es: '/images/regions/es-nature.jpg',
  fr: '/images/regions/fr-nature.jpg',
  fi: '/images/regions/fi-nature.jpg',
  cl: '/images/regions/cl-nature.jpg',
  mg: '/images/regions/mg-nature.jpg',
  vn: '/images/regions/vn-nature.jpg',
  tr: '/images/regions/tr-nature.jpg',
  ar: '/images/regions/ar-nature.jpg',
  tz: '/images/regions/tz-nature.jpg',
  np: '/images/regions/np-nature.jpg',
  pt: '/images/regions/pt-nature.jpg',
  ie: '/images/regions/ie-nature.jpg',
  mn: '/images/regions/mn-nature.jpg',
  co: '/images/regions/co-nature.jpg',
  ph: '/images/regions/ph-nature.jpg',
};

function HeroSection() {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // 보유 사진 프리로드 (첫 hover 시 깜빡임 방지)
  useEffect(() => {
    Object.values(COUNTRY_IMAGE).forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        px: { xs: 3, md: 8, lg: 12 },
        py: { xs: 10, md: 0 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* hover 풀스크린 — 자연 이미지 + 국가명(52px) + 컬러칩 4개(44×44px) */}
      {/* pointer-events:none → hover 이벤트가 아래 마커로 통과해 깜빡임 없이 유지됨 */}
      <AnimatePresence>
        {hoveredCountry && (
          <Box
            key={hoveredCountry.id}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            sx={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}
          >
            {/* 배경 이미지 또는 대표색 */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                ...(COUNTRY_IMAGE[hoveredCountry.id]
                  ? {
                      backgroundImage: `url(${COUNTRY_IMAGE[hoveredCountry.id]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : { backgroundColor: hoveredCountry.color }),
              }}
            />

            {/* 하단 가독성 스크림 */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 45%, transparent 100%)',
              }}
            />

            {/* 국가명 + 컬러칩 + HEX — 화면 중앙 */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Typography
                variant="h1"
                component="p"
                sx={{
                  fontSize: '92px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  textAlign: 'center',
                  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                }}
              >
                {hoveredCountry.name}
              </Typography>

              {/* 컬러칩 4개 + HEX */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                {buildPalette(hoveredCountry.color).map((color, i) => (
                  <Box
                    key={i}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}
                  >
                    <Box sx={{ width: 44, height: 44, backgroundColor: color, flexShrink: 0 }} />
                    <Typography
                      sx={{
                        fontSize: '10px',
                        color: '#FFFFFF',
                        fontFamily: '"Lexend", sans-serif',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                      }}
                    >
                      {color.toUpperCase()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </AnimatePresence>

      {/* 워드마크 — top-left, 20pt */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        sx={{
          position: 'absolute',
          top: { xs: 3, md: 5 },
          left: { xs: 3, md: 8, lg: 12 },
          zIndex: 2,
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontSize: '20pt', fontStyle: 'normal', lineHeight: 1.2, letterSpacing: '-0.01em', m: 0 }}
        >
          Palette of Earth
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1.5, maxWidth: 300, fontSize: '11pt', color: 'text.secondary', lineHeight: 1.5 }}
        >
          Explore the colors shaped by nature across different regions of the world.
          Hover a pin on the globe, or scroll to begin.
        </Typography>
      </Box>

      {/* 풀블리드 자이언트 글로브 — 뷰포트 세로 중앙, top·bottom·right 잘림 */}
      {/* 정렬 박스(중앙 정렬 transform)와 애니메이션 박스(scale/fade)를 분리해 transform 충돌 방지 */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: { xs: '-95%', sm: '-60%', md: '-35%', lg: '-25%' },
          transform: 'translateY(-50%)',
          width: 1440,
          maxWidth: 'none',
          zIndex: 1,
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlobeD3 size={1440} onHoverCountry={setHoveredCountry} />
        </Box>
      </Box>
    </Box>
  );
}

function PaletteInner() {
  return (
    <Box component="main" sx={{ bgcolor: 'background.default', minHeight: '100vh', overflowX: 'hidden' }}>
      <HeroSection />
    </Box>
  );
}

function PaletteOfEarth() {
  return (
    <ThemeProvider theme={paletteOfEarthTheme}>
      <CssBaseline />
      <PaletteInner />
    </ThemeProvider>
  );
}

export default PaletteOfEarth;
