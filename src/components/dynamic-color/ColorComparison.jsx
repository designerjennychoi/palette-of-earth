/**
 * ColorComparison 컴포넌트
 *
 * 다른 지역에서 같은 톤이 나타나는 현상을 나란히 비교하는 섹션.
 * 같은 톤의 칩 사이를 SVG 연결선으로 이어 시각적 연결을 강조한다.
 *
 * Props:
 * @param {Array} pairs - 비교 쌍 배열 [Required]
 *   각 pair: { label, items: [{ regionId, colorIndex, label }] }
 *
 * Example usage:
 * <ColorComparison pairs={comparisonPairs} />
 */

import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ColorChip from './ColorChip.jsx';
import ColorToast from '../overlay-feedback/ColorToast.jsx';
import regions from '../../data/regions.js';

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 같은 지역의 비교 칩 카드 */
function CompareCard({ regionId, colorIndex, label, onCopy }) {
  const region = regions.find((r) => r.id === regionId);
  if (!region) return null;
  const color = region.palette[colorIndex] || region.palette[0];

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="overline"
        sx={{ display: 'block', color: 'text.secondary', mb: 1, letterSpacing: '0.12em' }}
      >
        {region.nameEn}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.8125rem' }}>
        {label || region.element}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <ColorChip color={color} name={`${region.name} — ${label}`} onCopy={onCopy} size="md" />
      </Box>
      <Typography
        sx={{
          fontFamily: '"Lexend", "Pretendard", system-ui, sans-serif',
          fontSize: '0.625rem',
          color: 'text.disabled',
          letterSpacing: '0.04em',
        }}
      >
        {color.replace('#', '').toUpperCase()}
      </Typography>
    </Box>
  );
}

/** 연결선 SVG */
function ConnectorLine({ inView, prefersReducedMotion }) {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 80px',
      }}
    >
      <svg width="80" height="2" viewBox="0 0 80 2" fill="none">
        <motion.line
          x1="0" y1="1" x2="80" y2="1"
          stroke="#2E2C28"
          strokeWidth="1"
          strokeDasharray="80"
          initial={{ strokeDashoffset: (REDUCED_MOTION || prefersReducedMotion) ? 0 : 80 }}
          animate={(REDUCED_MOTION || prefersReducedMotion || inView) ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
        />
      </svg>
    </Box>
  );
}

function ColorComparison({ pairs = [] }) {
  const sectionRef = useRef(null);
  const [inView, setInView]     = useState(false);
  const prefersReducedMotion    = useReducedMotion();
  const [toastColor, setToastColor] = useState('');
  const [toastOpen, setToastOpen]   = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCopy = (color) => {
    setToastColor(color);
    setToastOpen(true);
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="comparison"
      sx={{
        px: { xs: 3, md: 8, lg: 12 },
        py: { xs: 10, md: 16 },
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* 헤더 */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 12 }}
        animate={(prefersReducedMotion || inView) ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        sx={{ mb: { xs: 8, md: 12 } }}
      >
        <Typography
          variant="overline"
          sx={{ display: 'block', color: 'text.secondary', mb: 2, letterSpacing: '0.16em' }}
        >
          Color Resonance
        </Typography>
        <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
          같은 색, 다른 땅
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', maxWidth: 480, lineHeight: 1.7 }}
        >
          지구 반대편의 자연이 같은 톤을 만들어낸다.
          지역이 달라도 흙과 물과 암석이 빚는 색의 언어는 닮아 있다.
        </Typography>
      </Box>

      {/* 비교 쌍들 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 10, md: 14 } }}>
        {pairs.map((pair, pairIdx) => (
          <Box
            key={pairIdx}
            component={motion.div}
            initial={{ opacity: 0, y: 16 }}
            animate={(prefersReducedMotion || inView) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: pairIdx * 0.15 }}
          >
            {/* 쌍 레이블 */}
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                color: 'text.disabled',
                letterSpacing: '0.1em',
                mb: 4,
                fontFamily: '"Lexend", "Pretendard", system-ui, sans-serif',
              }}
            >
              {pair.label}
            </Typography>

            {/* 칩 + 연결선 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 4, md: 0 },
                flexWrap: { xs: 'wrap', md: 'nowrap' },
              }}
            >
              {pair.items.map((item, itemIdx) => (
                <Box
                  key={itemIdx}
                  sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, md: 0 } }}
                >
                  <CompareCard {...item} onCopy={handleCopy} />
                  {itemIdx < pair.items.length - 1 && (
                    <ConnectorLine inView={inView} prefersReducedMotion={prefersReducedMotion} />
                  )}
                </Box>
              ))}
            </Box>

            {/* 설명 */}
            {pair.description && (
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textAlign: 'center',
                  mt: 4,
                  fontStyle: 'italic',
                  maxWidth: 400,
                  mx: 'auto',
                }}
              >
                {pair.description}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      <ColorToast color={toastColor} isOpen={toastOpen} onClose={() => setToastOpen(false)} />
    </Box>
  );
}

export default ColorComparison;
