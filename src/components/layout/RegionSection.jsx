/**
 * RegionSection 컴포넌트
 *
 * 지역별 섹션 래퍼. Intersection Observer로 뷰포트 진입을 감지해
 * 배경색 오버레이 전환을 트리거하고 RegionContext를 업데이트한다.
 * ImageBlend와 ColorPalette를 조합해 블렌드 완료 후 팔레트를 순차 등장시킨다.
 *
 * Props:
 * @param {object}  region  - regions.js 지역 데이터 객체 [Required]
 * @param {number}  index   - 섹션 인덱스 (홀짝 레이아웃 반전) [Required]
 *
 * Example usage:
 * <RegionSection region={regions[0]} index={0} />
 */

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ImageBlend from '../media/ImageBlend.jsx';
import ColorPalette from '../dynamic-color/ColorPalette.jsx';
import { useRegion } from '../../pages/PaletteOfEarth.jsx';

function RegionSection({ region, index }) {
  const sectionRef = useRef(null);
  const { setActiveRegion } = useRegion();
  const [paletteVisible, setPaletteVisible] = useState(false);
  const [inView, setInView] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isEven = index % 2 === 0;

  // 섹션이 50% 이상 진입하면 activeRegion 업데이트
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveRegion(region.id);
          setInView(true);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [region.id, setActiveRegion]);

  const handleReveal = useCallback(() => {
    setPaletteVisible(true);
  }, []);

  // 배경 오버레이 색: 팔레트 첫 번째(가장 어두운) 색, 매우 투명하게
  const overlayColor = region.palette[0];

  return (
    <Box
      ref={sectionRef}
      component="section"
      id={region.id}
      sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}
    >
      {/* 배경 오버레이 (inView 시 서서히 등장) */}
      <Box
        component={motion.div}
        animate={{ opacity: (prefersReducedMotion || inView) ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: overlayColor,
          opacity: 0.07,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Grid
        container
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          px: { xs: 3, md: 0 },
          py: { xs: 10, md: 0 },
          alignItems: { xs: 'flex-start', md: 'stretch' },
          flexDirection: { xs: 'column', md: isEven ? 'row' : 'row-reverse' },
        }}
      >
        {/* 텍스트 영역 — 40% */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: { md: 8, lg: 12 },
            pb: { xs: 5, md: 0 },
          }}
        >
          {/* 지역 코드 */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 8 }}
            animate={(prefersReducedMotion || inView) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography
              variant="overline"
              sx={{
                display: 'block',
                color: 'text.secondary',
                letterSpacing: '0.16em',
                mb: 2,
              }}
            >
              {region.nameEn}
            </Typography>
          </Box>

          {/* 지역명 */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 12 }}
            animate={(prefersReducedMotion || inView) ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography variant="h2" component="h2" sx={{ mb: 0.5 }}>
              {region.name}
            </Typography>
          </Box>

          {/* 자연 요소 */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 12 }}
            animate={(prefersReducedMotion || inView) ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography
              variant="h3"
              component="p"
              sx={{
                color: 'text.secondary',
                fontWeight: 400,
                fontFamily: 'inherit',
                mb: 4,
              }}
            >
              {region.element}
            </Typography>
          </Box>

          {/* 설명 */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 8 }}
            animate={(prefersReducedMotion || inView) ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', mb: 6, maxWidth: 360, lineHeight: 1.7 }}
            >
              {region.description}
            </Typography>
          </Box>

          {/* 팔레트 */}
          <ColorPalette colors={region.palette} isVisible={paletteVisible} />
        </Grid>

        {/* 이미지 영역 — 60%, 섹션 전체 높이 채움 */}
        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Box sx={{
            flex: 1,
            minHeight: { xs: '60vw', md: 0 },
            '& > div': { height: '100%', aspectRatio: 'unset' },
          }}>
            <ImageBlend
              layer1={region.images.layer1}
              layer2={region.images.layer2}
              alt={`${region.name} — ${region.element}`}
              onReveal={handleReveal}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegionSection;
