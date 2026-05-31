/**
 * ImageBlend 컴포넌트
 *
 * 두 자연 이미지를 겹쳐 색이 발굴되는 5단계 시퀀스 애니메이션.
 * Intersection Observer로 뷰포트 진입 시 1회 트리거.
 *
 * 시퀀스:
 *   0s      레이어1 보이지 않음
 *   0→0.8s  레이어1(토양/자연물) fade-in
 *   0.8→1.6s 레이어2(물/식생) overlay fade-in (mix-blend-mode: multiply)
 *   1.6→2.4s 안정화 → 팔레트 등장 신호 발생
 *
 * Props:
 * @param {string}   layer1     - 첫 번째 이미지 src (토양·암석 계열) [Required]
 * @param {string}   layer2     - 두 번째 이미지 src (물·식생 계열) [Required]
 * @param {string}   alt        - 이미지 대체 텍스트 [Optional]
 * @param {function} onReveal   - 블렌드 완료 후 호출 (팔레트 등장 트리거) [Optional]
 * @param {string}   blendMode  - CSS mix-blend-mode 값 [Optional, 기본값: 'multiply']
 *
 * Example usage:
 * <ImageBlend layer1="/images/jeju-basalt.jpg" layer2="/images/jeju-sea.jpg" onReveal={() => setVisible(true)} />
 */

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ImageBlend({
  layer1,
  layer2,
  alt = '',
  onReveal,
  blendMode = 'multiply',
}) {
  const containerRef = useRef(null);
  const [played, setPlayed] = useState(false);
  const [layer1Error, setLayer1Error] = useState(false);
  const [layer2Error, setLayer2Error] = useState(false);

  const layer1Controls = useAnimation();
  const layer2Controls = useAnimation();

  const runSequence = useCallback(async () => {
    if (played) return;
    setPlayed(true);

    if (REDUCED_MOTION) {
      await layer1Controls.set({ opacity: 1 });
      await layer2Controls.set({ opacity: 0.75 });
      onReveal?.();
      return;
    }

    // 단계 1: 레이어1 fade-in
    await layer1Controls.start({
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    });

    // 단계 2: 레이어2 fade-in (blend)
    await layer2Controls.start({
      opacity: 0.75,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    });

    // 단계 3: 안정화 후 팔레트 등장 신호
    setTimeout(() => onReveal?.(), 200);
  }, [played, layer1Controls, layer2Controls, onReveal]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runSequence();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [runSequence]);

  const hasBothImages = layer1 && layer2 && !layer1Error && !layer2Error;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/3',
        overflow: 'hidden',
        bgcolor: '#1A1917',
      }}
    >
      {hasBothImages ? (
        <>
          {/* 레이어 1 — 토양·암석 */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={layer1Controls}
            sx={{ position: 'absolute', inset: 0 }}
          >
            <Box
              component="img"
              src={layer1}
              alt={alt}
              loading="lazy"
              onError={() => setLayer1Error(true)}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>

          {/* 레이어 2 — 물·식생 (blend) */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={layer2Controls}
            sx={{
              position: 'absolute',
              inset: 0,
              mixBlendMode: blendMode,
            }}
          >
            <Box
              component="img"
              src={layer2}
              alt=""
              aria-hidden="true"
              loading="lazy"
              onError={() => setLayer2Error(true)}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>
        </>
      ) : (
        /* 이미지 없을 때 fallback */
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #2E2C28',
          }}
        >
          <Typography variant="caption" sx={{ color: '#504D49' }}>
            이미지를 불러올 수 없습니다
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ImageBlend;
